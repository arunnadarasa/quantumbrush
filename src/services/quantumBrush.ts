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
    // Validate stroke data before sending
    if (!strokeData.image.startsWith('data:image/')) {
      throw new Error('Invalid image format - must be data URL');
    }
    if (strokeData.path.length === 0) {
      throw new Error('Path cannot be empty');
    }

    console.log('📤 Sending stroke request:', {
      url: `${API_CONFIG.baseURL}/render/${effectName}/stroke`,
      pathPoints: strokeData.path.length,
      clickPoints: strokeData.clicks.length,
      userInput: strokeData.userInput,
      imageDataPrefix: strokeData.image.substring(0, 50) + '...',
    });

    const response = await fetch(
      `${API_CONFIG.baseURL}/render/${effectName}/stroke`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(strokeData),
      }
    );

    // Check content type to determine if it's an error response
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      // API returned JSON (likely an error)
      const errorData = await response.json();
      console.error('❌ API returned JSON error:', errorData);
      throw new Error(
        errorData.error || 
        errorData.message || 
        `API returned JSON instead of image: ${JSON.stringify(errorData)}`
      );
    }

    if (!response.ok) {
      throw new Error(`Failed to apply stroke effect: ${response.statusText}`);
    }

    console.log('✅ Received image blob:', {
      type: response.headers.get('content-type'),
      size: response.headers.get('content-length')
    });

    return response.blob();
  }
};
