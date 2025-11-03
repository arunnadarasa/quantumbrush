export async function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export async function compositeStrokeResult(
  baseImageUrl: string,
  strokeResultUrl: string
): Promise<string> {
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

  return canvas.toDataURL('image/png');
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
