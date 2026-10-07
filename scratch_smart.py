import os
from PIL import Image
import scipy.ndimage as ndi
import numpy as np

def extract_smart():
    img_path = 'C:/Users/sistema/.gemini/antigravity/brain/b0ffbbbb-c630-4f44-adb4-45e6a79c6435/.user_uploaded/media_1791342365877.jpg'
    out_dir = 'src/assets/hero-sketches'
    os.makedirs(out_dir, exist_ok=True)
    
    img = Image.open(img_path)
    gray = img.convert('L')
    arr = np.array(gray)
    
    # 1. Threshold high to ignore faint grid lines (e.g. > 100)
    # The drawings are white/bright, grid lines are faint.
    mask = arr > 120
    
    # 2. Dilation to connect parts of the same drawing
    struct = ndi.generate_binary_structure(2, 2)
    dilated = ndi.binary_dilation(mask, structure=struct, iterations=15)
    
    # 3. Label connected components
    labels, num_features = ndi.label(dilated)
    
    # 4. Extract bounding boxes
    boxes = []
    for i in range(1, num_features + 1):
        ys, xs = np.where(labels == i)
        if len(ys) == 0: continue
        
        y_min, y_max = ys.min(), ys.max()
        x_min, x_max = xs.min(), xs.max()
        
        # Ignore tiny specks
        if (y_max - y_min) < 30 or (x_max - x_min) < 30:
            continue
            
        # Expand bounding box to include the faint grid lines that were ignored!
        pad = 25
        y_min = max(0, y_min - pad)
        y_max = min(arr.shape[0], y_max + pad)
        x_min = max(0, x_min - pad)
        x_max = min(arr.shape[1], x_max + pad)
        
        boxes.append((x_min, y_min, x_max, y_max))
        
    print(f"Found {len(boxes)} components!")
    
    # Generate the transparent images for these boxes
    # We will just save all found boxes.
    for idx, (x1, y1, x2, y2) in enumerate(boxes):
        cropped = img.crop((x1, y1, x2, y2))
        c_gray = cropped.convert('L')
        out = Image.new('RGB', cropped.size, (255, 255, 255))
        
        # Transparency logic (same as before)
        lut = []
        for i in range(256):
            if i < 30: lut.append(0)
            else: lut.append(min(255, int((i - 30) * (255 / (255 - 30))) * 2))
        
        alpha = c_gray.point(lut)
        out.putalpha(alpha)
        
        out_path = os.path.join(out_dir, f'smart_crop_{idx}.webp')
        out.save(out_path, 'WEBP')

extract_smart()
