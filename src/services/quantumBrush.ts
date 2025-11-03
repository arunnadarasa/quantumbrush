import { API_CONFIG } from '@/config/api';

export interface Effect {
  name: string;
}

export const quantumBrushAPI = {
  // Get list of available effects
  async getEffects(): Promise<string[]> {
    const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.effects}`);
    const data = await response.json();
    return data.effects;
  },

  // Apply effect to image
  async applyEffect(effectName: string, imageFile: File): Promise<Blob> {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(
      `${API_CONFIG.baseURL}${API_CONFIG.endpoints.render}/${effectName}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to apply effect: ${response.statusText}`);
    }

    return response.blob();
  },

  // Apply stroke-based effect
  async applyStrokeEffect(
    effectName: string,
    strokeData: {
      image: string; // base64 data URL
      path: [number, number][];
      clicks: [number, number][];
      userInput: Record<string, any>;
    }
  ): Promise<Blob> {
    const response = await fetch(
      `${API_CONFIG.baseURL}/render/${effectName}/stroke`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(strokeData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to apply stroke effect: ${response.statusText}`);
    }

    return response.blob();
  }
};
