import bpy
import os

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.render.resolution_x = 540
scene.render.resolution_y = 960
scene.render.resolution_percentage = 50
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.render.film_transparent = True

output_dir = r"D:\Claude\Portfolio\github-merge-clean\tmp\holographic-preview"
os.makedirs(output_dir, exist_ok=True)

for frame in (1, 80, 160):
    scene.frame_set(frame)
    scene.render.filepath = os.path.join(output_dir, f"frame-{frame:03d}.png")
    bpy.ops.render.render(write_still=True)
