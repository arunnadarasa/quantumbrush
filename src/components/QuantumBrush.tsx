import { useEffect, useState } from 'react';
import { Canvas as FabricCanvas, FabricImage } from 'fabric';
import { DrawingCanvas } from '@/components/DrawingCanvas';
import { EffectControlPanel } from '@/components/EffectControlPanel';
import { StrokeManager } from '@/components/StrokeManager';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { quantumBrushAPI } from '@/services/quantumBrush';
import { useToast } from '@/hooks/use-toast';
import { StrokeData, EffectParameters, DEFAULT_PARAMETERS } from '@/types/stroke';
import { compositeStrokeResult, exportCompositeImage } from '@/utils/imageComposition';
import quantumHero from '@/assets/quantum-hero.jpg';

const QuantumBrush = () => {
  const [effects, setEffects] = useState<string[]>([]);
  const [selectedEffect, setSelectedEffect] = useState<string>('heisenbrush');
  const [parameters, setParameters] = useState<EffectParameters>(DEFAULT_PARAMETERS.heisenbrush);
  const [strokes, setStrokes] = useState<StrokeData[]>([]);
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [baseImageUrl, setBaseImageUrl] = useState<string | null>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadEffects();
  }, []);

  useEffect(() => {
    // Update parameters when effect changes
    if (DEFAULT_PARAMETERS[selectedEffect]) {
      setParameters(DEFAULT_PARAMETERS[selectedEffect]);
    } else {
      setParameters({ Radius: 20, Strength: 0.8 });
    }
  }, [selectedEffect]);

  const loadEffects = async () => {
    try {
      const effectsList = await quantumBrushAPI.getEffects();
      setEffects(effectsList);
      if (effectsList.length > 0 && !effectsList.includes(selectedEffect)) {
        setSelectedEffect(effectsList[0]);
      }
    } catch (error) {
      toast({
        title: "Error loading effects",
        description: "Could not fetch available quantum effects",
        variant: "destructive",
      });
    }
  };

  const handleStrokeComplete = (path: [number, number][], clicks: [number, number][], fabricPath: any) => {
    if (!fabricCanvas) return;

    const newStroke: StrokeData = {
      id: `stroke-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      effectName: selectedEffect,
      path,
      clicks: clicks.length > 0 ? clicks : path.slice(0, 1),
      userInput: { ...parameters },
      status: 'created',
      timestamp: Date.now(),
      fabricPath,
    };

    setStrokes(prev => [...prev, newStroke]);
    
    toast({
      title: "Stroke created",
      description: `${selectedEffect} stroke ready to process (${path.length} points)`,
    });
  };

  const handleRunStroke = async (strokeId: string) => {
    if (!fabricCanvas) return;

    setStrokes(prev =>
      prev.map(s => (s.id === strokeId ? { ...s, status: 'processing' as const } : s))
    );

    try {
      const stroke = strokes.find(s => s.id === strokeId);
      if (!stroke) return;

      // Get canvas as base64
      const imageData = fabricCanvas.toDataURL({ format: 'png', multiplier: 1 });

      console.log('🎨 Processing stroke:', {
        strokeId,
        effect: stroke.effectName,
        pathLength: stroke.path.length,
        clicksLength: stroke.clicks.length,
        userInput: stroke.userInput,
        imageDataLength: imageData.length,
      });

      const startTime = Date.now();
      
      const resultBlob = await quantumBrushAPI.applyStrokeEffect(stroke.effectName, {
        image: imageData,
        path: stroke.path,
        clicks: stroke.clicks,
        userInput: stroke.userInput,
      });

      const processingTime = Date.now() - startTime;
      console.log('✅ Stroke processed successfully:', {
        strokeId,
        processingTime: `${processingTime}ms`,
        blobSize: resultBlob.size,
        blobType: resultBlob.type,
      });

      const resultUrl = URL.createObjectURL(resultBlob);

      setStrokes(prev =>
        prev.map(s =>
          s.id === strokeId ? { ...s, status: 'completed' as const, resultUrl } : s
        )
      );

      toast({
        title: "Stroke processed",
        description: `${stroke.effectName} effect applied in ${processingTime}ms`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
      console.error('❌ Stroke processing failed:', {
        strokeId,
        error: errorMessage,
        fullError: error,
      });
      
      setStrokes(prev =>
        prev.map(s =>
          s.id === strokeId
            ? { ...s, status: 'error' as const, errorMessage }
            : s
        )
      );

      toast({
        title: "Error processing stroke",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleApplyStroke = async (strokeId: string) => {
    if (!fabricCanvas) return;

    const stroke = strokes.find(s => s.id === strokeId);
    if (!stroke || !stroke.resultUrl) return;

    try {
      const currentImage = fabricCanvas.toDataURL({ format: 'png', multiplier: 1 });
      const compositeUrl = await compositeStrokeResult(currentImage, stroke.resultUrl);

      // Load composite back to canvas
      FabricImage.fromURL(compositeUrl).then((img) => {
        if (img) {
          img.scaleToWidth(fabricCanvas.width!);
          img.scaleToHeight(fabricCanvas.height!);
          fabricCanvas.backgroundImage = img;
          fabricCanvas.renderAll();
        }
      });

      toast({
        title: "Stroke applied",
        description: "Effect composited to canvas",
      });
    } catch (error) {
      toast({
        title: "Error applying stroke",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleDeleteStroke = (strokeId: string) => {
    const stroke = strokes.find(s => s.id === strokeId);
    
    // Remove the path from canvas if it exists
    if (stroke?.fabricPath && fabricCanvas) {
      fabricCanvas.remove(stroke.fabricPath);
      fabricCanvas.renderAll();
    }
    
    setStrokes(prev => prev.filter(s => s.id !== strokeId));
    toast({
      title: "Stroke deleted",
      description: "Stroke removed from manager",
    });
  };

  const handleRunAllStrokes = async () => {
    const pendingStrokes = strokes.filter(s => s.status === 'created');
    for (const stroke of pendingStrokes) {
      await handleRunStroke(stroke.id);
    }
  };

  const handleExportImage = async () => {
    if (!fabricCanvas) return;

    try {
      const completedStrokes = strokes.filter(s => s.status === 'completed' && s.resultUrl);
      const baseImage = fabricCanvas.toDataURL({ format: 'png', multiplier: 1 });
      
      const blob = await exportCompositeImage(
        baseImage,
        completedStrokes.map(s => s.resultUrl!)
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quantum-art-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Image exported",
        description: "Your quantum artwork has been downloaded",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleImageLoad = (canvas: FabricCanvas) => {
    setFabricCanvas(canvas);
    setBaseImageUrl(canvas.toDataURL({ format: 'png', multiplier: 1 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Hero Section */}
      <div 
        className="relative h-[30vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${quantumHero})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">QuantumBrush</h1>
          <p className="text-lg md:text-xl text-center max-w-2xl">
            Interactive quantum-powered drawing experience
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleExportImage}
            disabled={!fabricCanvas || strokes.length === 0}
            size="lg"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Image
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Effect Control Panel */}
          <div className="lg:col-span-3">
            <EffectControlPanel
              effects={effects}
              selectedEffect={selectedEffect}
              onEffectChange={setSelectedEffect}
              parameters={parameters}
              onParametersChange={setParameters}
              isDrawingMode={isDrawingMode}
              onDrawingModeToggle={() => setIsDrawingMode(!isDrawingMode)}
            />
          </div>

          {/* Center: Drawing Canvas */}
          <div className="lg:col-span-6">
            <DrawingCanvas
              imageUrl={baseImageUrl}
              brushSize={parameters.Radius || 20}
              onStrokeComplete={handleStrokeComplete}
              isDrawingMode={isDrawingMode}
              onImageLoad={handleImageLoad}
            />
          </div>

          {/* Right: Stroke Manager */}
          <div className="lg:col-span-3">
            <StrokeManager
              strokes={strokes}
              onRunStroke={handleRunStroke}
              onDeleteStroke={handleDeleteStroke}
              onApplyStroke={handleApplyStroke}
              onRunAllStrokes={handleRunAllStrokes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumBrush;
