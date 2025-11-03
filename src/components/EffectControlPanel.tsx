import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { EffectParameters } from '@/types/stroke';
import { Brush, Hand } from 'lucide-react';

interface EffectControlPanelProps {
  effects: string[];
  selectedEffect: string;
  onEffectChange: (effect: string) => void;
  parameters: EffectParameters;
  onParametersChange: (params: EffectParameters) => void;
  isDrawingMode: boolean;
  onDrawingModeToggle: () => void;
}

export const EffectControlPanel = ({
  effects,
  selectedEffect,
  onEffectChange,
  parameters,
  onParametersChange,
  isDrawingMode,
  onDrawingModeToggle,
}: EffectControlPanelProps) => {
  return (
    <Card className="p-4 md:p-6 h-fit">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Effect Controls</h2>

      <div className="space-y-6">
        {/* Drawing Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isDrawingMode ? <Brush className="h-5 w-5" /> : <Hand className="h-5 w-5" />}
            <Label htmlFor="drawing-mode">
              {isDrawingMode ? 'Drawing Mode' : 'Select Mode'}
            </Label>
          </div>
          <Switch
            id="drawing-mode"
            checked={isDrawingMode}
            onCheckedChange={onDrawingModeToggle}
          />
        </div>

        {/* Effect Selection */}
        <div className="space-y-2">
          <Label htmlFor="effect-select">Quantum Effect</Label>
          <Select value={selectedEffect} onValueChange={onEffectChange}>
            <SelectTrigger id="effect-select">
              <SelectValue placeholder="Select effect" />
            </SelectTrigger>
            <SelectContent>
              {effects.map((effect) => (
                <SelectItem key={effect} value={effect}>
                  {effect}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Radius Parameter */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="radius-slider">Radius</Label>
            <span className="text-sm text-muted-foreground">{parameters.Radius}</span>
          </div>
          <Slider
            id="radius-slider"
            value={[parameters.Radius || 20]}
            onValueChange={([val]) => onParametersChange({ ...parameters, Radius: val })}
            min={1}
            max={100}
            step={1}
          />
        </div>

        {/* Strength Parameter */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="strength-slider">Strength</Label>
            <span className="text-sm text-muted-foreground">
              {(parameters.Strength || 0.8).toFixed(2)}
            </span>
          </div>
          <Slider
            id="strength-slider"
            value={[(parameters.Strength || 0.8) * 100]}
            onValueChange={([val]) => onParametersChange({ ...parameters, Strength: val / 100 })}
            min={0}
            max={100}
            step={1}
          />
        </div>

        {/* Lightness Parameter (for heisenbrush) */}
        {selectedEffect === 'heisenbrush' && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="lightness-slider">Lightness</Label>
                <span className="text-sm text-muted-foreground">
                  {(parameters.Lightness || 0.5).toFixed(2)}
                </span>
              </div>
              <Slider
                id="lightness-slider"
                value={[(parameters.Lightness || 0.5) * 100]}
                onValueChange={([val]) => onParametersChange({ ...parameters, Lightness: val / 100 })}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="saturation-slider">Saturation</Label>
                <span className="text-sm text-muted-foreground">
                  {(parameters.Saturation || 0.5).toFixed(2)}
                </span>
              </div>
              <Slider
                id="saturation-slider"
                value={[(parameters.Saturation || 0.5) * 100]}
                onValueChange={([val]) => onParametersChange({ ...parameters, Saturation: val / 100 })}
                min={0}
                max={100}
                step={1}
              />
            </div>
          </>
        )}

        {/* Effect Description */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {selectedEffect === 'heisenbrush' && 'Quantum-powered continuous brush with color uncertainty'}
            {selectedEffect === 'acrylic' && 'Acrylic paint effect with quantum blending'}
            {selectedEffect === 'qdrop' && 'Quantum droplet effect with wave interference'}
            {!['heisenbrush', 'acrylic', 'qdrop'].includes(selectedEffect) && 'Quantum effect - draw to apply'}
          </p>
        </div>
      </div>
    </Card>
  );
};
