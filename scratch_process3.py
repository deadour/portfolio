import os
from PIL import Image

def process_image():
    img_path = 'C:/Users/sistema/.gemini/antigravity/brain/b0ffbbbb-c630-4f44-adb4-45e6a79c6435/.user_uploaded/media_1791342365877.jpg'
    out_dir = 'src/assets/hero-sketches'
    os.makedirs(out_dir, exist_ok=True)
    
    img = Image.open(img_path)
    cols = 6
    rows = 4
    cell_w = img.width / cols
    cell_h = img.height / rows
    
    for r in range(rows):
        for c in range(cols):
            x_start = int(c * cell_w)
            x_end = int((c + 1) * cell_w)
            y_start = int(r * cell_h)
            y_end = int((r + 1) * cell_h)
            
            box = (x_start, y_start, x_end, y_end)
            cropped = img.crop(box)
            
            gray = cropped.convert('L')
            out = Image.new('RGB', cropped.size, (255, 255, 255))
            
            lut = []
            for i in range(256):
                if i < 40: lut.append(0)
                else: lut.append(min(255, int((i - 40) * (255 / (255 - 40))) * 2))
                    
            alpha = gray.point(lut)
            out.putalpha(alpha)
            
            out_path = os.path.join(out_dir, f'sketch_r{r}_c{c}.webp')
            out.save(out_path, 'WEBP')

    # Join the wide ones
    def merge_images(img1_name, img2_name, out_name):
        img1_path = os.path.join(out_dir, img1_name)
        img2_path = os.path.join(out_dir, img2_name)
        out_path = os.path.join(out_dir, out_name)
        if not (os.path.exists(img1_path) and os.path.exists(img2_path)): return
        img1 = Image.open(img1_path)
        img2 = Image.open(img2_path)
        dst = Image.new('RGBA', (img1.width + img2.width, img1.height))
        dst.paste(img1, (0, 0))
        dst.paste(img2, (img1.width, 0))
        dst.save(out_path, 'WEBP')

    merge_images('sketch_r1_c3.webp', 'sketch_r1_c4.webp', 'sketch_solar_system_joined.webp')
    merge_images('sketch_r3_c2.webp', 'sketch_r3_c3.webp', 'sketch_python_joined.webp')
    merge_images('sketch_r3_c4.webp', 'sketch_r3_c5.webp', 'sketch_sql_joined.webp')

process_image()
