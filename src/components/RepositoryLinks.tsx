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
    <DialogContent className="max-w-[95vw] sm:max-w-2xl lg:max-w-3xl p-4 sm:p-6">
      <DialogHeader>
        <DialogTitle className="text-xl sm:text-2xl">Quantum Brush Resources</DialogTitle>
        <DialogDescription className="text-sm sm:text-base">
          Access the source code and live microservice
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 mt-4">
        {/* Backend Repo Card */}
        <div className="border border-l-4 border-l-accent-blue rounded-lg p-4 bg-card transition-all hover:shadow-lg active:scale-[0.98]">
          <div className="flex flex-col gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-2">🔧 Backend Repository</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 break-words">
                Python FastAPI backend with custom brush effects and Fly.io deployment
              </p>
              <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                <span className="text-xs truncate flex-1 min-w-0">
                  https://github.com/arunnadarasa/quantum-brush-backend
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
        <div className="border border-l-4 border-l-accent-purple rounded-lg p-4 bg-card transition-all hover:shadow-lg active:scale-[0.98]">
          <div className="flex flex-col gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-2">🎨 Frontend Repository</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 break-words">
                React + TypeScript frontend built with Lovable, featuring quantum brush UI and canvas integration
              </p>
              <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                <span className="text-xs truncate flex-1 min-w-0">
                  https://github.com/arunnadarasa/quantumbrush
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
        <div className="border border-l-4 border-l-accent-green rounded-lg p-4 bg-card transition-all hover:shadow-lg active:scale-[0.98]">
          <div className="flex flex-col gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-2">🚀 Live Microservice</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 break-words">
                Python microservice deployed on Fly.io for real-time brush effect processing
              </p>
              <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md">
                <span className="text-xs truncate flex-1 min-w-0">
                  https://quantumbrush.fly.dev
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
      </div>
    </DialogContent>
  );
};
