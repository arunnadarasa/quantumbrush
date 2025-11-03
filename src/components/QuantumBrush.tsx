import { useState, useEffect, useRef } from 'react';
import { quantumBrushAPI } from '@/services/quantumBrush';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Sparkles, Loader2, Download } from 'lucide-react';
import heroImage from '@/assets/quantum-hero.jpg';

export default function QuantumBrush() {
  const [effects, setEffects] = useState<string[]>([]);
  const [selectedEffect, setSelectedEffect] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [resultUrl, setResultUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadEffects();
  }, []);

  const loadEffects = async () => {
    try {
      const effectsList = await quantumBrushAPI.getEffects();
      setEffects(effectsList);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load quantum effects',
        variant: 'destructive'
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultUrl('');
    }
  };

  const handleApplyEffect = async () => {
    if (!imageFile || !selectedEffect) {
      toast({
        title: 'Missing Information',
        description: 'Please select an image and effect',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const resultBlob = await quantumBrushAPI.applyEffect(selectedEffect, imageFile);
      const url = URL.createObjectURL(resultBlob);
      setResultUrl(url);
      toast({
        title: 'Success',
        description: 'Quantum effect applied successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to apply effect',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (resultUrl) {
      const a = document.createElement('a');
      a.href = resultUrl;
      a.download = `quantum-${selectedEffect}-${Date.now()}.png`;
      a.click();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-quantum" />
        
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="animate-float">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            QuantumBrush
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your images with quantum-powered effects
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Control Panel */}
          <Card className="p-6 bg-card shadow-card border-border">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Controls
            </h2>
            
            <div className="space-y-6">
              {/* Upload Image */}
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  Upload Image
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full h-32 border-2 border-dashed border-border hover:border-primary hover:bg-card transition-all"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8" />
                    <span>{imageFile ? imageFile.name : 'Choose an image'}</span>
                  </div>
                </Button>
              </div>

              {/* Select Effect */}
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  Select Quantum Effect
                </label>
                <select
                  value={selectedEffect}
                  onChange={(e) => setSelectedEffect(e.target.value)}
                  className="w-full p-3 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                >
                  <option value="">Choose an effect...</option>
                  {effects.map((effect) => (
                    <option key={effect} value={effect}>
                      {effect}
                    </option>
                  ))}
                </select>
              </div>

              {/* Apply Button */}
              <Button
                onClick={handleApplyEffect}
                disabled={loading || !imageFile || !selectedEffect}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all shadow-quantum"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Applying Effect...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Apply Quantum Effect
                  </>
                )}
              </Button>

              {resultUrl && (
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full h-12 border-primary text-primary hover:bg-primary/10"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Result
                </Button>
              )}
            </div>
          </Card>

          {/* Preview Panel */}
          <div className="space-y-6">
            {previewUrl && (
              <Card className="p-6 bg-card shadow-card border-border">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Original</h3>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={previewUrl} 
                    alt="Original" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </Card>
            )}

            {resultUrl && (
              <Card className="p-6 bg-card shadow-card border-border animate-glow-pulse">
                <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Quantum Result
                </h3>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={resultUrl} 
                    alt="Result" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </Card>
            )}

            {!previewUrl && !resultUrl && (
              <Card className="p-12 bg-card shadow-card border-border border-dashed">
                <div className="text-center text-muted-foreground">
                  <Upload className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Upload an image to get started</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
