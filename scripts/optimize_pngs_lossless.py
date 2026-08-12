"""Convert large portfolio PNGs to lossless WebP when that makes them smaller."""

from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "portfolio"
SOURCE_DIRS = [ROOT / "src"]
MIN_BYTES = 1_000_000


def replace_references(old_name: str, new_name: str) -> None:
    for source_dir in SOURCE_DIRS:
        for path in source_dir.rglob("*"):
            if path.suffix.lower() not in {".ts", ".tsx", ".css"}:
                continue
            text = path.read_text(encoding="utf-8")
            updated = text.replace(old_name, new_name)
            if updated != text:
                path.write_text(updated, encoding="utf-8", newline="\n")


def main() -> None:
    saved = 0
    converted = 0
    for png in sorted(PUBLIC.rglob("*.png")):
        original_size = png.stat().st_size
        if original_size < MIN_BYTES:
            continue

        webp = png.with_suffix(".webp")
        with Image.open(png) as image:
            image.save(webp, "WEBP", lossless=True, quality=100, method=3, exact=True)

        optimized_size = webp.stat().st_size
        if optimized_size >= original_size:
            webp.unlink()
            continue

        old_url = "/" + png.relative_to(ROOT / "public").as_posix()
        new_url = "/" + webp.relative_to(ROOT / "public").as_posix()
        replace_references(old_url, new_url)
        png.unlink()
        converted += 1
        saved += original_size - optimized_size
        print(
            f"{old_url}: {original_size / 1_000_000:.1f} -> {optimized_size / 1_000_000:.1f} MB",
            flush=True,
        )

    print(f"Converted {converted} files; saved {saved / 1_000_000:.1f} MB")


if __name__ == "__main__":
    main()
