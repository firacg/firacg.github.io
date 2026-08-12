import bpy
import json

scene = bpy.context.scene
data = {
    "file": bpy.data.filepath,
    "scene": scene.name,
    "frame_range": [scene.frame_start, scene.frame_end],
    "render_engine": scene.render.engine,
    "resolution": [scene.render.resolution_x, scene.render.resolution_y],
    "camera": scene.camera.name if scene.camera else None,
    "objects": [
        {
            "name": obj.name,
            "type": obj.type,
            "location": list(obj.location),
            "dimensions": list(obj.dimensions),
            "visible_render": not obj.hide_render,
        }
        for obj in scene.objects
    ],
    "materials": [material.name for material in bpy.data.materials],
    "images": [image.name for image in bpy.data.images],
    "actions": [action.name for action in bpy.data.actions],
}
print("BLEND_INSPECT=" + json.dumps(data, ensure_ascii=False))
