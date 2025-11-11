import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export const RepositoryLinks = () => {
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
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-2">🔧 Backend Repository</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 break-words">
                Python FastAPI backend with custom brush effects and Fly.io deployment
              </p>
              <div className="overflow-x-auto">
                <code className="text-xs bg-muted px-2 py-1 rounded block whitespace-nowrap">
                  https://github.com/arunnadarasa/quantum-brush-backend
                </code>
              </div>
            </div>
            <a 
              href="https://github.com/arunnadarasa/quantum-brush-backend" 
              target="_blank" 
              rel="noopener noreferrer"
              className="self-start sm:self-auto"
            >
              <Button size="sm" variant="outline" className="w-full sm:w-auto">
                <ExternalLink className="h-4 w-4 mr-2" />
                View
              </Button>
            </a>
          </div>
        </div>

        {/* Frontend Repo Card */}
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-2">🎨 Frontend Repository</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 break-words">
                React + TypeScript frontend built with Lovable, featuring quantum brush UI and canvas integration
              </p>
              <div className="overflow-x-auto">
                <code className="text-xs bg-muted px-2 py-1 rounded block whitespace-nowrap">
                  https://github.com/arunnadarasa/quantumbrush
                </code>
              </div>
            </div>
            <a 
              href="https://github.com/arunnadarasa/quantumbrush" 
              target="_blank" 
              rel="noopener noreferrer"
              className="self-start sm:self-auto"
            >
              <Button size="sm" variant="outline" className="w-full sm:w-auto">
                <ExternalLink className="h-4 w-4 mr-2" />
                View
              </Button>
            </a>
          </div>
        </div>

        {/* Live Microservice Card */}
        <div className="border rounded-lg p-4 bg-card">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-base sm:text-lg mb-2">🚀 Live Microservice</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 break-words">
                Python microservice deployed on Fly.io for real-time brush effect processing
              </p>
              <div className="overflow-x-auto">
                <code className="text-xs bg-muted px-2 py-1 rounded block whitespace-nowrap">
                  https://quantumbrush.fly.dev
                </code>
              </div>
            </div>
            <a 
              href="https://quantumbrush.fly.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="self-start sm:self-auto"
            >
              <Button size="sm" variant="outline" className="w-full sm:w-auto">
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
