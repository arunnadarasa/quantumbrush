import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const RepositoryLinks = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard",
      duration: 2000,
    });
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <DialogContent className="max-w-[90vw] sm:max-w-2xl lg:max-w-3xl p-3 sm:p-6">
      <DialogHeader>
        <DialogTitle className="text-xl sm:text-2xl mb-1 sm:mb-0">Quantum Brush Resources</DialogTitle>
        <DialogDescription className="text-xs sm:text-base">
          Access the source code, research paper, and resources for contributors
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-2.5 sm:space-y-4 mt-2 sm:mt-4">
        {/* Backend Repo Card */}
        <div className="border border-l-4 border-l-accent-blue rounded-lg p-3 sm:p-4 bg-card transition-all hover:shadow-lg active:scale-[0.98]">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">🔧 Backend Repository</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-3 break-words hidden sm:block">
                Python FastAPI backend with custom brush effects and Fly.io deployment
              </p>
              <div className="flex items-center gap-2 bg-muted px-2 py-1.5 sm:px-3 sm:py-2 rounded-md">
                <span className="text-xs flex-1 min-w-0">
                  <span className="sm:hidden">github.com/.../quantum-brush-backend</span>
                  <span className="hidden sm:inline truncate">https://github.com/arunnadarasa/quantum-brush-backend</span>
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 flex-shrink-0 active:scale-95 transition-transform"
                  onClick={() => copyToClipboard('https://github.com/arunnadarasa/quantum-brush-backend')}
                >
                  {copiedUrl === 'https://github.com/arunnadarasa/quantum-brush-backend' ? (
                    <Check className="h-3.5 w-3.5 text-accent-blue" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
            <a 
              href="https://github.com/arunnadarasa/quantum-brush-backend" 
              target="_blank" 
              rel="noopener noreferrer"
              className="self-start sm:self-auto"
            >
              <Button size="sm" variant="outline" className="w-full sm:w-auto active:scale-95 transition-transform">
                <ExternalLink className="h-4 w-4 mr-2" />
                View
              </Button>
            </a>
          </div>
        </div>

        {/* Frontend Repo Card */}
        <div className="border border-l-4 border-l-accent-purple rounded-lg p-3 sm:p-4 bg-card transition-all hover:shadow-lg active:scale-[0.98]">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">🎨 Frontend Repository</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-3 break-words hidden sm:block">
                React + TypeScript frontend built with Lovable, featuring quantum brush UI and canvas integration
              </p>
              <div className="flex items-center gap-2 bg-muted px-2 py-1.5 sm:px-3 sm:py-2 rounded-md">
                <span className="text-xs flex-1 min-w-0">
                  <span className="sm:hidden">github.com/.../quantumbrush</span>
                  <span className="hidden sm:inline truncate">https://github.com/arunnadarasa/quantumbrush</span>
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 flex-shrink-0 active:scale-95 transition-transform"
                  onClick={() => copyToClipboard('https://github.com/arunnadarasa/quantumbrush')}
                >
                  {copiedUrl === 'https://github.com/arunnadarasa/quantumbrush' ? (
                    <Check className="h-3.5 w-3.5 text-accent-purple" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
            <a 
              href="https://github.com/arunnadarasa/quantumbrush" 
              target="_blank" 
              rel="noopener noreferrer"
              className="self-start sm:self-auto"
            >
              <Button size="sm" variant="outline" className="w-full sm:w-auto active:scale-95 transition-transform">
                <ExternalLink className="h-4 w-4 mr-2" />
                View
              </Button>
            </a>
          </div>
        </div>

        {/* Live Microservice Card */}
        <div className="border border-l-4 border-l-accent-green rounded-lg p-3 sm:p-4 bg-card transition-all hover:shadow-lg active:scale-[0.98]">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">🚀 Live Microservice</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-3 break-words hidden sm:block">
                Python microservice deployed on Fly.io for real-time brush effect processing
              </p>
              <div className="flex items-center gap-2 bg-muted px-2 py-1.5 sm:px-3 sm:py-2 rounded-md">
                <span className="text-xs flex-1 min-w-0">
                  <span className="sm:hidden">quantumbrush.fly.dev</span>
                  <span className="hidden sm:inline truncate">https://quantumbrush.fly.dev</span>
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 flex-shrink-0 active:scale-95 transition-transform"
                  onClick={() => copyToClipboard('https://quantumbrush.fly.dev')}
                >
                  {copiedUrl === 'https://quantumbrush.fly.dev' ? (
                    <Check className="h-3.5 w-3.5 text-accent-green" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
            <a 
              href="https://quantumbrush.fly.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="self-start sm:self-auto"
            >
              <Button size="sm" variant="outline" className="w-full sm:w-auto active:scale-95 transition-transform">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit
              </Button>
            </a>
          </div>
        </div>

        {/* Research Paper Card */}
        <div className="border border-l-4 border-l-orange-500 rounded-lg p-3 sm:p-4 bg-card transition-all hover:shadow-lg active:scale-[0.98]">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">📄 Research Paper</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-3 break-words hidden sm:block">
                Original research paper on arXiv - Learn about the quantum-inspired brush algorithms and methodology
              </p>
              <div className="flex items-center gap-2 bg-muted px-2 py-1.5 sm:px-3 sm:py-2 rounded-md">
                <span className="text-xs flex-1 min-w-0">
                  <span className="sm:hidden">arxiv.org/abs/2509.01442</span>
                  <span className="hidden sm:inline truncate">https://arxiv.org/abs/2509.01442</span>
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 flex-shrink-0 active:scale-95 transition-transform"
                  onClick={() => copyToClipboard('https://arxiv.org/abs/2509.01442')}
                >
                  {copiedUrl === 'https://arxiv.org/abs/2509.01442' ? (
                    <Check className="h-3.5 w-3.5 text-orange-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
            <a 
              href="https://arxiv.org/abs/2509.01442" 
              target="_blank" 
              rel="noopener noreferrer"
              className="self-start sm:self-auto"
            >
              <Button size="sm" variant="outline" className="w-full sm:w-auto active:scale-95 transition-transform">
                <ExternalLink className="h-4 w-4 mr-2" />
                Read Paper
              </Button>
            </a>
          </div>
        </div>

        {/* Original Repository Card */}
        <div className="border border-l-4 border-l-rose-500 rounded-lg p-3 sm:p-4 bg-card transition-all hover:shadow-lg active:scale-[0.98]">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">⭐ Original Repository</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-3 break-words hidden sm:block">
                The original Quantum Brush repository by moth-quantum - Contribute to the open-source project
              </p>
              <div className="flex items-center gap-2 bg-muted px-2 py-1.5 sm:px-3 sm:py-2 rounded-md">
                <span className="text-xs flex-1 min-w-0">
                  <span className="sm:hidden">github.com/moth-quantum/QuantumBrush</span>
                  <span className="hidden sm:inline truncate">https://github.com/moth-quantum/QuantumBrush</span>
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 flex-shrink-0 active:scale-95 transition-transform"
                  onClick={() => copyToClipboard('https://github.com/moth-quantum/QuantumBrush')}
                >
                  {copiedUrl === 'https://github.com/moth-quantum/QuantumBrush' ? (
                    <Check className="h-3.5 w-3.5 text-rose-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
            <a 
              href="https://github.com/moth-quantum/QuantumBrush" 
              target="_blank" 
              rel="noopener noreferrer"
              className="self-start sm:self-auto"
            >
              <Button size="sm" variant="outline" className="w-full sm:w-auto active:scale-95 transition-transform">
                <ExternalLink className="h-4 w-4 mr-2" />
                View & Contribute
              </Button>
            </a>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
