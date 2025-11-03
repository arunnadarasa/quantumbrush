export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Only set crossOrigin for external URLs, not blob or data URLs
    if (!url.startsWith('blob:') && !url.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    
    img.onload = () => resolve(img);
    img.onerror = (error) => {
      console.error('Failed to load image:', url.substring(0, 50), error);
      reject(new Error(`Failed to load image from ${url.substring(0, 50)}...`));
    };
    img.src = url;
  });
}

export async function compositeStrokeResult(
  baseImageUrl: string,
  strokeResultUrl: string
): Promise<string> {
  try {
    console.log('🎨 Compositing images:', {
      baseImageType: baseImageUrl.substring(0, 30),
      strokeResultType: strokeResultUrl.substring(0, 30),
    });
    
    const [baseImg, strokeImg] = await Promise.all([
      loadImage(baseImageUrl),
      loadImage(strokeResultUrl),
    ]);

    const canvas = document.createElement('canvas');
    canvas.width = baseImg.width;
    canvas.height = baseImg.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Failed to get canvas context');

    // Draw base image
    ctx.drawImage(baseImg, 0, 0);

    // Draw stroke result with alpha blending
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(strokeImg, 0, 0, canvas.width, canvas.height);

    console.log('✅ Composite successful');
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('❌ Composite failed:', error);
    throw error;
  }
}

export async function exportCompositeImage(
  baseImageUrl: string,
  strokeResults: string[]
): Promise<Blob> {
  let currentImage = baseImageUrl;

  for (const strokeUrl of strokeResults) {
    currentImage = await compositeStrokeResult(currentImage, strokeUrl);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob'));
        }
      }, 'image/png');
    };
    img.onerror = reject;
    img.src = currentImage;
  });
}

export function canvasToBase64(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/png');
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert blob to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
