import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const ResearchPaperLinks = () => {
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
        <DialogTitle className="text-xl sm:text-2xl mb-1 sm:mb-0">Research & Documentation</DialogTitle>
        <DialogDescription className="text-xs sm:text-base">
          Access the academic paper and comprehensive research documentation
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-2.5 sm:space-y-4 mt-2 sm:mt-4">
        {/* arXiv Paper Card */}
        <div className="border border-l-4 border-l-orange-500 rounded-lg p-3 sm:p-4 bg-card transition-all hover:shadow-lg active:scale-[0.98]">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">📄 arXiv Paper</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-3 break-words hidden sm:block">
                Original research paper on arXiv - Detailed methodology and quantum-inspired brush algorithms
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

        {/* Moth Quantum Research Card */}
        <div className="border border-l-4 border-l-violet-500 rounded-lg p-3 sm:p-4 bg-card transition-all hover:shadow-lg active:scale-[0.98]">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2">🔬 Research Documentation</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-3 break-words hidden sm:block">
                Comprehensive research page by Moth Quantum - Additional resources, examples, and context
              </p>
              <div className="flex items-center gap-2 bg-muted px-2 py-1.5 sm:px-3 sm:py-2 rounded-md">
                <span className="text-xs flex-1 min-w-0">
                  <span className="sm:hidden">mothquantum.com/research</span>
                  <span className="hidden sm:inline truncate">https://mothquantum.com/research</span>
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 flex-shrink-0 active:scale-95 transition-transform"
                  onClick={() => copyToClipboard('https://mothquantum.com/research')}
                >
                  {copiedUrl === 'https://mothquantum.com/research' ? (
                    <Check className="h-3.5 w-3.5 text-violet-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
            <a 
              href="https://mothquantum.com/research" 
              target="_blank" 
              rel="noopener noreferrer"
              className="self-start sm:self-auto"
            >
              <Button size="sm" variant="outline" className="w-full sm:w-auto active:scale-95 transition-transform">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Page
              </Button>
            </a>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
