export interface StrokeData {
  id: string;
  effectName: string;
  path: [number, number][]; // [[y,x], ...]
  clicks: [number, number][]; // [[y,x], ...]
  userInput: Record<string, any>; // effect parameters
  status: 'created' | 'processing' | 'completed' | 'error';
  resultUrl?: string;
  timestamp: number;
  errorMessage?: string;
}

export interface EffectParameters {
  Radius?: number;
  Strength?: number;
  Lightness?: number;
  Saturation?: number;
  [key: string]: any;
}

export const DEFAULT_PARAMETERS: Record<string, EffectParameters> = {
  heisenbrush: {
    Radius: 20,
    Strength: 0.8,
    Lightness: 0.5,
    Saturation: 0.5,
  },
  acrylic: {
    Radius: 30,
    Strength: 0.7,
  },
  qdrop: {
    Radius: 25,
    Strength: 0.9,
  },
};
