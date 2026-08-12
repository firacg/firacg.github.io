from pathlib import Path
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "portfolio"
OUT = ROOT / "output" / "pdf"
OUT.mkdir(parents=True, exist_ok=True)
PDF_IMAGES = ROOT / "tmp" / "pdfs" / "images"
PDF_IMAGES.mkdir(parents=True, exist_ok=True)

INK = HexColor("#121212")
PAPER = HexColor("#F2EFE9")
PINK = HexColor("#FF0045")
MUTED = HexColor("#777277")


def cover_image(c, path, x, y, w, h, focus=0.5):
    im = Image.open(path)
    iw, ih = im.size
    scale = max(w / iw, h / ih)
    crop_w, crop_h = w / scale, h / scale
    left = max(0, min(iw - crop_w, (iw - crop_w) * focus))
    top = max(0, (ih - crop_h) / 2)
    box = (left, top, left + crop_w, top + crop_h)
    cropped = im.crop(box)
    max_px = 1800
    if max(cropped.size) > max_px:
        ratio = max_px / max(cropped.size)
        cropped = cropped.resize((int(cropped.width * ratio), int(cropped.height * ratio)), Image.Resampling.LANCZOS)
    cache = PDF_IMAGES / f"{Path(path).stem}-{abs(hash((x, y, w, h, focus))) % 100000}.jpg"
    cropped.convert("RGB").save(cache, "JPEG", quality=88, optimize=True)
    c.drawImage(str(cache), x, y, w, h, mask="auto")


def footer(c, page, width, light=False):
    color = white if light else INK
    c.setFillColor(color)
    c.setFont("Helvetica", 7)
    c.drawString(34, 22, "FIRA CG / DARIYA DOVHENKO")
    c.drawRightString(width - 34, 22, f"{page:02d}")


def cv_pdf():
    path = OUT / "Fira-CG-CV.pdf"
    c = canvas.Canvas(str(path), pagesize=A4)
    w, h = A4
    c.setFillColor(INK)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(PINK)
    c.rect(0, h - 16, w, 16, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 52)
    c.drawString(38, h - 94, "FIRA CG")
    c.setFont("Helvetica", 15)
    c.drawString(40, h - 122, "Dariya Dovhenko / Freelance 2D Artist & Visual Generalist")
    c.setFillColor(HexColor("#AAA5AA"))
    c.setFont("Helvetica", 10)
    c.drawString(40, h - 150, "Characters / Illustration / Props / Visual development")

    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(40, h - 202, "PROFILE")
    profile = (
        "Traditional painting training and eight years in game production. I take characters, "
        "creatures and props from rough composition to a polished, production-ready image."
    )
    c.setFont("Helvetica", 10)
    text = c.beginText(40, h - 224)
    text.setLeading(15)
    for line in [
        "Traditional painting training and eight years in game production.",
        "I take characters, creatures and props from rough composition to",
        "a polished, production-ready image.",
    ]:
        text.textLine(line)
    c.drawText(text)

    jobs = [
        ("2026 - NOW", "Freelance 2D Artist & Visual Generalist", "Independent / Tbilisi"),
        ("2024 - JUL 2026", "2D Artist", "GAMETEQ / production art & visual development"),
        ("2021 - 2023", "Lead 2D Artist", "DEFU Games / six shipped game projects"),
        ("2020 - 2021", "2D Artist", "DEFU Games / game art production"),
        ("2019 - 2020", "2D Artist, Freelance", "Illustration, portrait and icon commissions"),
        ("2018 - 2019", "2D Artist", "Nordcurrent / Murder by Choice"),
    ]
    y = h - 300
    c.setFont("Helvetica-Bold", 10)
    c.drawString(40, y, "EXPERIENCE")
    y -= 28
    for year, role, company in jobs:
        c.setFillColor(PINK)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(40, y, year)
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(150, y, role)
        c.setFillColor(HexColor("#AAA5AA"))
        c.setFont("Helvetica", 9)
        c.drawString(150, y - 15, company)
        y -= 55

    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(360, h - 202, "CONTACT")
    c.setFont("Helvetica", 9)
    for i, line in enumerate([
        "firacgi@gmail.com",
        "Tbilisi, Georgia",
        "artstation.com/maboroshi94",
        "instagram.com/fira_cg",
        "linkedin.com/in/firacg",
    ]):
        c.drawString(360, h - 225 - i * 18, line)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(360, h - 340, "SKILLS")
    c.setFont("Helvetica", 9)
    for i, line in enumerate(["Game art", "Character design", "Key art", "Props and items", "Concept development"]):
        c.drawString(360, h - 363 - i * 18, line)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(360, h - 485, "LANGUAGES")
    c.setFont("Helvetica", 9)
    c.drawString(360, h - 508, "English / Ukrainian / Russian")
    c.setFont("Helvetica-Bold", 10)
    c.drawString(360, h - 555, "EDUCATION")
    c.setFont("Helvetica", 8.5)
    education = [
        "Grekov Odesa Art College / Fine Art / 2016-2018",
        "International Humanitarian University / MA / 2016-2018",
        "IT Step Academy / Graphic Design / 2015-2016",
        "Odesa Polytechnic / Computer Technology / 2010-2015",
    ]
    for i, line in enumerate(education):
        c.drawString(360, h - 578 - i * 17, line)
    footer(c, 1, w, light=True)
    c.save()
    return path


def portfolio_pdf():
    path = OUT / "Fira-CG-Portfolio.pdf"
    size = landscape(A4)
    w, h = size
    c = canvas.Canvas(str(path), pagesize=size)
    pages = [
        ("KSOK", "Character illustration / 2026", ASSETS / "ksok2.png", 0.58),
        ("THERIZINA", "Creature illustration", ASSETS / "therizina-final.png", 0.5),
        ("RASPBERRY FAIRY", "Visual development / final", ASSETS / "raspberry-05-final.png", 0.5),
        ("GAME OBJECTS", "Props and item concepts", ASSETS / "potion-green.png", 0.5),
        ("PORTRAIT STUDIES", "Character observation", ASSETS / "furiosa-studies.png", 0.5),
        ("LINE ART", "Production drawing", ASSETS / "lineart" / "VKG_wolf-1.png", 0.5),
        ("BEYOND 2D", "Lighting and materials", ASSETS / "halloween-scene.png", 0.5),
    ]

    cover_image(c, ASSETS / "ksok2.png", 0, 0, w, h, 0.58)
    c.setFillColor(HexColor("#090909"))
    c.rect(0, 0, 410, h, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 58)
    c.drawString(42, 100, "FIRA CG")
    c.setFont("Helvetica", 13)
    c.drawString(45, 72, "SELECTED WORK / 2D ARTIST")
    footer(c, 1, w, light=True)
    c.showPage()

    for idx, (title, sub, image, focus) in enumerate(pages, start=2):
        c.setFillColor(INK)
        c.rect(0, 0, w, h, fill=1, stroke=0)
        cover_image(c, image, 290, 42, w - 332, h - 84, focus)
        c.setFillColor(PINK)
        c.rect(42, h - 64, 46, 6, fill=1, stroke=0)
        c.setFillColor(white)
        c.setFont("Helvetica-Bold", 25)
        c.drawString(42, h - 102, title)
        c.setFillColor(HexColor("#AAA5AA"))
        c.setFont("Helvetica", 9)
        c.drawString(42, h - 125, sub.upper())
        c.setFillColor(white)
        c.setFont("Helvetica", 11)
        copy = {
            "KSOK": "Expressive character storytelling through light, colour and gesture.",
            "THERIZINA": "A creature scene built around saturated colour and jungle atmosphere.",
            "RASPBERRY FAIRY": "Composition, values, volume, colour and final texture.",
            "GAME OBJECTS": "Readable silhouettes and material studies for fantasy inventories.",
            "PORTRAIT STUDIES": "Likeness, anatomy and value control through focused studies.",
            "LINE ART": "Clean production line with confident gesture and game-scale detail.",
            "BEYOND 2D": "Experiments with scenes, lighting, materials and environment mood.",
        }[title]
        text = c.beginText(42, h - 180)
        text.setLeading(17)
        words, line = copy.split(), ""
        for word in words:
            test = (line + " " + word).strip()
            if stringWidth(test, "Helvetica", 11) > 205:
                text.textLine(line)
                line = word
            else:
                line = test
        text.textLine(line)
        c.drawText(text)
        footer(c, idx, w, light=True)
        c.showPage()

    c.setFillColor(PINK)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 55)
    c.drawString(42, h - 110, "LET'S DRAW YOUR WORLD.")
    c.setFont("Helvetica", 16)
    c.drawString(45, h - 155, "firacgi@gmail.com")
    c.setFont("Helvetica", 10)
    c.drawString(45, 75, "ARTSTATION / INSTAGRAM / LINKEDIN / BEHANCE")
    footer(c, len(pages) + 2, w)
    c.save()
    return path


if __name__ == "__main__":
    print(cv_pdf())
    print(portfolio_pdf())
