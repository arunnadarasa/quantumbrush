import { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, PencilBrush, FabricImage } from 'fabric';
import { Button } from '@/components/ui/button';
import { Upload, Eraser, ZoomIn, ZoomOut } from 'lucide-react';

interface DrawingCanvasProps {
  imageUrl: string | null;
  brushSize: number;
  onStrokeComplete: (path: [number, number][], clicks: [number, number][]) => void;
  isDrawingMode: boolean;
  onImageLoad: (canvas: FabricCanvas) => void;
}

export const DrawingCanvas = ({ 
  imageUrl, 
  brushSize, 
  onStrokeComplete, 
  isDrawingMode,
  onImageLoad 
}: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [clicks, setClicks] = useState<[number, number][]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });

    const brush = new PencilBrush(canvas);
    brush.color = '#FF0000';
    brush.width = brushSize;
    canvas.freeDrawingBrush = brush;

    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;
    fabricCanvas.isDrawingMode = isDrawingMode;
  }, [fabricCanvas, isDrawingMode]);

  useEffect(() => {
    if (!fabricCanvas) return;
    if (fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.width = brushSize;
    }
  }, [fabricCanvas, brushSize]);

  useEffect(() => {
    if (!fabricCanvas || !imageUrl) return;

    FabricImage.fromURL(imageUrl).then((img) => {
      if (img) {
        img.scaleToWidth(fabricCanvas.width!);
        img.scaleToHeight(fabricCanvas.height!);
        fabricCanvas.backgroundImage = img;
        fabricCanvas.renderAll();
        onImageLoad(fabricCanvas);
      }
    });
  }, [fabricCanvas, imageUrl, onImageLoad]);

  useEffect(() => {
    if (!fabricCanvas) return;

    const handleMouseDown = (e: any) => {
      if (isDrawingMode && e.absolutePointer) {
        const point: [number, number] = [
          Math.round(e.absolutePointer.y),
          Math.round(e.absolutePointer.x)
        ];
        setClicks(prev => [...prev, point]);
      }
    };

    const handlePathCreated = (e: any) => {
      const path = e.path;
      if (!path) return;

      const pathCoords: [number, number][] = [];
      
      if (path.path && Array.isArray(path.path)) {
        for (const segment of path.path) {
          if (segment[0] === 'M' || segment[0] === 'L') {
            const y = Math.round(segment[2]);
            const x = Math.round(segment[1]);
            pathCoords.push([y, x]);
          } else if (segment[0] === 'Q') {
            const y = Math.round(segment[4]);
            const x = Math.round(segment[3]);
            pathCoords.push([y, x]);
          }
        }
      }

      if (pathCoords.length > 0) {
        onStrokeComplete(pathCoords, clicks);
        setClicks([]);
      }

      fabricCanvas.remove(path);
    };

    fabricCanvas.on('mouse:down', handleMouseDown);
    fabricCanvas.on('path:created', handlePathCreated);

    return () => {
      fabricCanvas.off('mouse:down', handleMouseDown);
      fabricCanvas.off('path:created', handlePathCreated);
    };
  }, [fabricCanvas, isDrawingMode, clicks, onStrokeComplete]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && fabricCanvas) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgUrl = event.target?.result as string;
        FabricImage.fromURL(imgUrl).then((img) => {
          if (img) {
            img.scaleToWidth(fabricCanvas.width!);
            img.scaleToHeight(fabricCanvas.height!);
            fabricCanvas.backgroundImage = img;
            fabricCanvas.renderAll();
            onImageLoad(fabricCanvas);
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = '#ffffff';
    fabricCanvas.renderAll();
  };

  const handleZoomIn = () => {
    if (!fabricCanvas) return;
    const zoom = fabricCanvas.getZoom();
    fabricCanvas.setZoom(zoom * 1.1);
  };

  const handleZoomOut = () => {
    if (!fabricCanvas) return;
    const zoom = fabricCanvas.getZoom();
    fabricCanvas.setZoom(zoom / 1.1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          size="sm"
        >
          <Upload className="mr-2 h-4 w-4" />
          Load Image
        </Button>
        <Button onClick={handleClear} variant="outline" size="sm">
          <Eraser className="mr-2 h-4 w-4" />
          Clear
        </Button>
        <Button onClick={handleZoomIn} variant="outline" size="sm">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button onClick={handleZoomOut} variant="outline" size="sm">
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>
      <div className="border border-border rounded-lg overflow-hidden shadow-lg">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
