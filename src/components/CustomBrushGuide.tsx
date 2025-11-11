import { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Copy, Check, ExternalLink, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

export const CustomBrushGuide = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock = ({ code, id, language = 'bash' }: { code: string; id: string; language?: string }) => (
    <div className="relative group w-full">
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 z-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-gray-800/90 sm:bg-transparent hover:bg-gray-700"
        onClick={() => copyToClipboard(code, id)}
      >
        {copiedCode === id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <div className="overflow-x-auto w-full">
        <pre className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg text-sm whitespace-pre">
          <code className="font-mono leading-relaxed">{code}</code>
        </pre>
      </div>
    </div>
  );

  return (
    <DialogContent className="max-w-[90vw] sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl max-h-[90vh] overflow-y-auto p-3 sm:p-6">
      <DialogHeader>
        <DialogTitle className="text-xl sm:text-2xl">Create Your Own Quantum Brush</DialogTitle>
        <DialogDescription className="text-sm sm:text-base">
          Step-by-step guide to building custom brush effects for Quantum Brush
        </DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="getting-started" className="flex flex-col">
        <TabsList className="flex flex-col sm:grid sm:grid-cols-4 gap-1 w-full sm:w-auto">
          <TabsTrigger value="getting-started" className="w-full sm:w-auto justify-start sm:justify-center px-3 sm:px-4">
            Getting Started
          </TabsTrigger>
          <TabsTrigger value="implementation" className="w-full sm:w-auto justify-start sm:justify-center px-3 sm:px-4">Implementation</TabsTrigger>
          <TabsTrigger value="integration" className="w-full sm:w-auto justify-start sm:justify-center px-3 sm:px-4">Integration</TabsTrigger>
          <TabsTrigger value="ideas" className="w-full sm:w-auto justify-start sm:justify-center px-3 sm:px-4">Ideas</TabsTrigger>
        </TabsList>

        <div className="mt-3 sm:mt-4">
          {/* Tab 1: Getting Started */}
          <TabsContent value="getting-started" className="space-y-3 sm:space-y-4 mt-0 pb-6 sm:pb-8">
            <Accordion type="single" collapsible defaultValue="step-1" className="w-full">
              <AccordionItem value="step-1" className="border rounded-lg px-3 sm:px-4 mb-2">
                <AccordionTrigger className="text-sm sm:text-base font-semibold hover:no-underline py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
                    <span>Understand the Structure</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-3 space-y-3">
                  <p className="text-sm text-muted-foreground break-words">
                    Your brush needs to be placed in: <code className="bg-muted px-2 py-1 rounded text-xs break-all">$HOME/QuantumBrush/effect/yourBrushName/</code>
                  </p>
                  <p className="text-sm text-muted-foreground break-words">It should contain:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 space-y-1">
                    <li><code className="bg-muted px-1 py-0.5 rounded text-xs break-all">yourBrushName.py</code> - Main brush logic</li>
                    <li><code className="bg-muted px-1 py-0.5 rounded text-xs break-all">yourBrushName_requirements.json</code> - Dependencies</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step-2" className="border rounded-lg px-3 sm:px-4 mb-2">
                <AccordionTrigger className="text-sm sm:text-base font-semibold hover:no-underline py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">2</span>
                    <span>Create the Brush Folder</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-3 space-y-3">
                  <p className="text-sm text-muted-foreground break-words">In WSL, run:</p>
                  <div className="flex flex-wrap items-center gap-2 mb-2 text-xs sm:text-sm text-muted-foreground">
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Don't have WSL? </span>
                    <a href="https://docs.microsoft.com/en-us/windows/wsl/install" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="inline-flex items-center hover:underline text-primary font-medium min-h-[44px] sm:min-h-0 -my-2 sm:my-0">
                      Install WSL
                    </a>
                  </div>
                  <CodeBlock
                    id="create-folder"
                    code={`mkdir -p ~/QuantumBrush/effect/myCustomBrush
cd ~/QuantumBrush/effect/myCustomBrush`}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step-3" className="border rounded-lg px-3 sm:px-4">
                <AccordionTrigger className="text-sm sm:text-base font-semibold hover:no-underline py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold">3</span>
                    <span>File Setup Basics</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-3">
                  <p className="text-sm text-muted-foreground break-words">
                    You'll create two main files that define your brush's behavior and parameters. The Python file contains the effect logic, while the JSON file specifies dependencies and user-adjustable parameters.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Tab 2: Implementation */}
          <TabsContent value="implementation" className="space-y-6 sm:space-y-8 mt-0 pb-8 sm:pb-16">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">Step 4: Create the Main Brush File</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 break-words">Create <code className="bg-muted px-1 py-0.5 rounded text-xs break-all">myCustomBrush.py</code>:</p>
                
                <div className="space-y-2">
                  {/* Mobile: Collapsible code */}
                  <div className="sm:hidden">
                    <details className="group">
                      <summary className="cursor-pointer list-none">
                        <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border">
                          <span className="text-sm font-medium">View Python Template Code</span>
                          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </div>
                      </summary>
                      <div className="mt-2">
                        <CodeBlock
                          id="main-brush"
                          language="python"
                          code={`import json
import base64
import io
from PIL import Image, ImageDraw, ImageFilter

def apply_effect(image_data, stroke_data, params):
    """
    Main brush effect function
    
    Args:
        image_data: base64 encoded image
        stroke_data: {path: [[y, x], ...], radius, strength, ...}
        params: userInput parameters from frontend
    
    Returns:
        base64 encoded output image
    """
    
    # Decode input image
    img_bytes = base64.b64decode(image_data.split(',')[1] if ',' in image_data else image_data)
    img = Image.open(io.BytesIO(img_bytes)).convert("RGBA")
    
    # Get parameters
    radius = int(params.get('Radius', 20))
    strength = float(params.get('Strength', 0.8))
    
    # Get stroke path (flip from [y, x] to (x, y))
    path = [(int(x), int(y)) for y, x in stroke_data.get('path', [])]
    
    if len(path) < 2:
        return None
    
    # Create a drawing layer
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # YOUR CUSTOM EFFECT GOES HERE
    # Example: Draw a simple brush stroke
    color = (255, 100, 50, int(255 * strength))  # Orange with transparency
    draw.line(path, fill=color, width=radius, joint="curve")
    
    # Composite onto original image
    result = Image.alpha_composite(img, overlay)
    
    # Encode output
    output = io.BytesIO()
    result.save(output, format="PNG")
    output_b64 = base64.b64encode(output.getvalue()).decode('utf-8')
    
    return f"data:image/png;base64,{output_b64}"

# Entry point for backend
if __name__ == "__main__":
    import sys
    import json
    
    data = json.loads(sys.stdin.read())
    result = apply_effect(data['image'], data['stroke'], data['params'])
    print(json.dumps({'success': True, 'image': result}))`}
                        />
                      </div>
                    </details>
                  </div>
                  
                  {/* Desktop: Show directly */}
                  <div className="hidden sm:block">
                    <CodeBlock
                      id="main-brush-desktop"
                      language="python"
                      code={`import json
import base64
import io
from PIL import Image, ImageDraw, ImageFilter

def apply_effect(image_data, stroke_data, params):
    """
    Main brush effect function
    
    Args:
        image_data: base64 encoded image
        stroke_data: {path: [[y, x], ...], radius, strength, ...}
        params: userInput parameters from frontend
    
    Returns:
        base64 encoded output image
    """
    
    # Decode input image
    img_bytes = base64.b64decode(image_data.split(',')[1] if ',' in image_data else image_data)
    img = Image.open(io.BytesIO(img_bytes)).convert("RGBA")
    
    # Get parameters
    radius = int(params.get('Radius', 20))
    strength = float(params.get('Strength', 0.8))
    
    # Get stroke path (flip from [y, x] to (x, y))
    path = [(int(x), int(y)) for y, x in stroke_data.get('path', [])]
    
    if len(path) < 2:
        return None
    
    # Create a drawing layer
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    
    # YOUR CUSTOM EFFECT GOES HERE
    # Example: Draw a simple brush stroke
    color = (255, 100, 50, int(255 * strength))  # Orange with transparency
    draw.line(path, fill=color, width=radius, joint="curve")
    
    # Composite onto original image
    result = Image.alpha_composite(img, overlay)
    
    # Encode output
    output = io.BytesIO()
    result.save(output, format="PNG")
    output_b64 = base64.b64encode(output.getvalue()).decode('utf-8')
    
    return f"data:image/png;base64,{output_b64}"

# Entry point for backend
if __name__ == "__main__":
    import sys
    import json
    
    data = json.loads(sys.stdin.read())
    result = apply_effect(data['image'], data['stroke'], data['params'])
    print(json.dumps({'success': True, 'image': result}))`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">Step 5: Create Requirements File</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 break-words">Create <code className="bg-muted px-1 py-0.5 rounded text-xs break-all">myCustomBrush_requirements.json</code>:</p>
                <CodeBlock
                  id="requirements"
                  language="json"
                  code={`{
  "dependencies": ["pillow>=9.0.0"],
  "description": "My Custom Quantum Brush Effect",
  "parameters": {
    "Radius": {
      "type": "slider",
      "min": 5,
      "max": 100,
      "default": 20,
      "label": "Brush Size"
    },
    "Strength": {
      "type": "slider",
      "min": 0.0,
      "max": 1.0,
      "default": 0.8,
      "label": "Opacity"
    }
  }
}`}
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">Test Your Brush Locally</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 break-words">Create a test script:</p>
                <CodeBlock
                  id="test-script"
                  code={`cat > ~/QuantumBrush/effect/myCustomBrush/test_brush.py << 'EOF'
import sys
sys.path.insert(0, '.')
from myCustomBrush import apply_effect
import base64
from PIL import Image
import io

# Create test image
test_img = Image.new("RGBA", (800, 600), (200, 200, 200, 255))
img_bytes = io.BytesIO()
test_img.save(img_bytes, format="PNG")
img_b64 = base64.b64encode(img_bytes.getvalue()).decode()

# Test stroke
stroke_data = {
    'path': [[100, 150], [150, 200], [200, 150], [250, 200]]
}

params = {'Radius': 20, 'Strength': 0.8}

result = apply_effect(img_b64, stroke_data, params)
print("✅ Brush works!" if result else "❌ Brush failed")
EOF

cd ~/QuantumBrush/effect/myCustomBrush
python test_brush.py`}
                />
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Integration */}
          <TabsContent value="integration" className="space-y-6 sm:space-y-8 mt-0 pb-8 sm:pb-16">
            <div className="space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">Step 6: Register in Backend</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 break-words">Update your <code className="bg-muted px-1 py-0.5 rounded text-xs break-all">main.py</code> to load custom brushes:</p>
                <CodeBlock
                  id="backend-register"
                  language="python"
                  code={`@app.post("/render/{effect_name}/stroke")
async def render_stroke(effect_name: str, data: StrokeData, request: Request):
    # Load custom brush if available
    brush_path = f"{EFFECTS_DIR}/{effect_name}/{effect_name}.py"
    
    if os.path.exists(brush_path):
        # Import and execute custom brush
        spec = importlib.util.spec_from_file_location(effect_name, brush_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        result = module.apply_effect(data.image, {...}, data.userInput)
        return Response(content=base64_decode(result), media_type="image/png")
    # ... existing code`}
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">Step 7: Deploy to Fly.io</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-3 break-words">Once tested, deploy your brush:</p>
                <div className="flex flex-wrap items-center gap-2 mb-3 text-xs sm:text-sm text-muted-foreground">
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>Don't have Fly.io CLI? </span>
                  <a href="https://fly.io/docs/hands-on/install-flyctl/" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="inline-flex items-center hover:underline text-primary font-medium min-h-[44px] sm:min-h-0 -my-2 sm:my-0">
                    Install flyctl
                  </a>
                </div>
                <CodeBlock
                  id="deploy"
                  code={`cd ~/QuantumBrush
git add effect/myCustomBrush/
git commit -m "Add myCustomBrush effect"
git push origin main
flyctl deploy`}
                />
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">File Structure Overview</h3>
                <CodeBlock
                  id="file-structure"
                  code={`effect/
├── myCustomBrush/
│   ├── myCustomBrush.py
│   ├── myCustomBrush_requirements.json
│   └── test_brush.py
├── heisenbrush/
├── acrylic/
└── clone/`}
                />
                <p className="text-sm text-muted-foreground mt-3">
                  🎨 Your brush will automatically appear in the frontend Effect dropdown!
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Tab 4: Ideas & Examples */}
          <TabsContent value="ideas" className="space-y-6 sm:space-y-8 mt-0 pb-8 sm:pb-16">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Custom Brush Ideas</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 break-words">
                  Here are five creative brush effects you can implement:
                </p>
              </div>

              <div className="space-y-6">
                <div className="border rounded-lg p-4 bg-card">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">🎮 Pixel Art Brush</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Creates retro pixel art effects by pixelating the stroke area with a limited color palette.
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Pixelate stroke area using resize operations</li>
                    <li>Apply limited color palette (e.g., 8-bit colors)</li>
                    <li>Add dithering for classic retro look</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4 bg-card">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">💧 Watercolor Brush</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Simulates realistic watercolor painting with transparency falloff and splatter effects.
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Gaussian blur with radial transparency gradient</li>
                    <li>Random splatter particles around stroke</li>
                    <li>Color bleeding effects between adjacent strokes</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4 bg-card">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">🎨 Oil Paint Brush</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Creates thick, textured strokes like traditional oil painting with visible brush marks.
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Apply bilateral filter for paint texture</li>
                    <li>Use edge detection for brush stroke definition</li>
                    <li>Add impasto effect with highlights and shadows</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4 bg-card">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">✨ Glow Brush</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Adds luminous, glowing effects with colorful halos around the stroke path.
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Radial gradient around stroke path</li>
                    <li>Multiple blur layers for depth</li>
                    <li>Color shifting based on distance from stroke</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4 bg-card">
                  <h4 className="font-semibold text-base sm:text-lg mb-2">⚡ Glitch Brush</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Creates digital distortion effects with RGB channel shifts and pixel displacement.
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Separate and shift RGB channels in different directions</li>
                    <li>Random pixel displacement for static effect</li>
                    <li>Scan line artifacts and color aberration</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm font-medium mb-2">💡 Pro Tips:</p>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Start with simple effects and gradually add complexity</li>
                  <li>Test with different stroke sizes and speeds</li>
                  <li>Use PIL's ImageFilter module for quick effects</li>
                  <li>Consider performance - complex effects may need optimization</li>
                  <li>Document your parameters clearly for users</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </DialogContent>
  );
};
