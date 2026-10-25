from pathlib import Path
import json

GALLERIES = Path("galleries")
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

data = []

for folder in sorted(GALLERIES.iterdir()):
    if not folder.is_dir():
        continue

    photos = [
        str(file.as_posix())
        for file in sorted(folder.iterdir())
        if file.suffix.lower() in EXTENSIONS
    ]

    data.append({
        "id": folder.name,
        "title": folder.name.replace("-", " ").title(),
        "photos": photos
    })

Path("galleries.json").write_text(
    json.dumps(data, indent=2),
    encoding="utf-8"
)

print(f"Generated {len(data)} galleries.")

for gallery in data:
    print(f"{gallery['title']}: {len(gallery['photos'])} photos")