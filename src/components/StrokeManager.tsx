import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StrokeData } from '@/types/stroke';
import { Trash2, Play, Download, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface StrokeManagerProps {
  strokes: StrokeData[];
  onRunStroke: (strokeId: string) => void;
  onDeleteStroke: (strokeId: string) => void;
  onApplyStroke: (strokeId: string) => void;
  onRunAllStrokes: () => void;
}

export const StrokeManager = ({
  strokes,
  onRunStroke,
  onDeleteStroke,
  onApplyStroke,
  onRunAllStrokes,
}: StrokeManagerProps) => {
  const getStatusIcon = (status: StrokeData['status']) => {
    switch (status) {
      case 'created':
        return <Badge variant="secondary">Created</Badge>;
      case 'processing':
        return (
          <Badge variant="outline" className="gap-1">
            <Loader2 className="h-3 w-3 animate-spin" />
            Processing
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="default" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Error
          </Badge>
        );
    }
  };

  return (
    <Card className="p-4 md:p-6 h-fit">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Stroke Manager</h2>
        <Button
          onClick={onRunAllStrokes}
          disabled={strokes.length === 0}
          size="sm"
          variant="outline"
        >
          <Play className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Run All</span>
        </Button>
      </div>

      {strokes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No strokes yet</p>
          <p className="text-sm mt-2">Draw on the canvas to create strokes</p>
        </div>
      ) : (
        <ScrollArea className="h-[300px] lg:h-[600px] pr-4">
          <div className="space-y-4">
            {strokes.map((stroke) => (
              <Card key={stroke.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{stroke.effectName}</h3>
                      <p className="text-xs text-muted-foreground">
                        {new Date(stroke.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    {getStatusIcon(stroke.status)}
                  </div>

                  <div className="text-xs space-y-1">
                    <p>
                      <span className="font-medium">Radius:</span> {stroke.userInput.Radius}
                    </p>
                    <p>
                      <span className="font-medium">Strength:</span> {stroke.userInput.Strength?.toFixed(2)}
                    </p>
                    <p className="text-muted-foreground">
                      Path points: {stroke.path.length}
                    </p>
                  </div>

                  {stroke.status === 'error' && stroke.errorMessage && (
                    <p className="text-xs text-destructive">{stroke.errorMessage}</p>
                  )}

                  <div className="flex gap-2">
                    {stroke.status === 'created' && (
                      <Button
                        onClick={() => onRunStroke(stroke.id)}
                        size="sm"
                        className="flex-1"
                      >
                        <Play className="mr-2 h-3 w-3" />
                        Run
                      </Button>
                    )}
                    {stroke.status === 'completed' && (
                      <Button
                        onClick={() => onApplyStroke(stroke.id)}
                        size="sm"
                        className="flex-1"
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Apply
                      </Button>
                    )}
                    <Button
                      onClick={() => onDeleteStroke(stroke.id)}
                      size="sm"
                      variant="destructive"
                      disabled={stroke.status === 'processing'}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </Card>
  );
};
