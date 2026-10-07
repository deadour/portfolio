import os
from PIL import Image

def merge_images(img1_name, img2_name, out_name):
    base_dir = 'src/assets/hero-sketches'
    img1_path = os.path.join(base_dir, img1_name)
    img2_path = os.path.join(base_dir, img2_name)
    out_path = os.path.join(base_dir, out_name)
    
    if not (os.path.exists(img1_path) and os.path.exists(img2_path)):
        return

    img1 = Image.open(img1_path)
    img2 = Image.open(img2_path)
    
    # Create new image with double width
    dst = Image.new('RGBA', (img1.width + img2.width, img1.height))
    dst.paste(img1, (0, 0))
    dst.paste(img2, (img1.width, 0))
    
    dst.save(out_path, 'WEBP')
    print(f"Merged {out_name}")

# Solar System (r1_c3 + r1_c4)
merge_images('sketch_r1_c3.webp', 'sketch_r1_c4.webp', 'sketch_solar_system.webp')

# Python (r3_c2 + r3_c3)
merge_images('sketch_r3_c2.webp', 'sketch_r3_c3.webp', 'sketch_python.webp')

# SQL (r3_c4 + r3_c5? Wait, let's look at row 3)
# Row 3 cols:
# c0: Neural Network
# c1: ESP32
# c2: Python (left)
# c3: Python (right)
# c4: SQL (left)
# c5: SQL (right) ? Wait, what about Sigmoid (mathFunc)? Sigmoid was c5?
# If SQL is c3 and c4? 
