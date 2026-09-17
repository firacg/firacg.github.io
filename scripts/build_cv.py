"""Build a simple, selectable-text CV for applicant tracking systems."""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.utils import simpleSplit
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "downloads" / "Fira-CG-CV.pdf"
FONT_DIR = Path("C:/Windows/Fonts")
pdfmetrics.registerFont(TTFont("BodyCV", str(FONT_DIR / "segoeui.ttf")))
pdfmetrics.registerFont(TTFont("BodyCV-Bold", str(FONT_DIR / "segoeuib.ttf")))
pdfmetrics.registerFont(TTFont("DisplayCV", str(FONT_DIR / "ariblk.ttf")))

PAGE_W, PAGE_H = 595.28, 841.89
LEFT, RIGHT = 49, 49
INK = colors.HexColor("#121212")
MUTED = colors.HexColor("#55565C")
ACCENT = colors.HexColor("#E00043")
PAPER = colors.HexColor("#F5F4F2")
SOFT = colors.HexColor("#F1F0EF")
SOFT_PINK = colors.HexColor("#FAF7F8")

c = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
c.setTitle("Dariya Dovhenko - 2D Game Artist & Illustrator - CV")
c.setAuthor("Dariya Dovhenko")
c.setFillColor(PAPER)
c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
y = PAGE_H - 49


def line(text, size=9.4, bold=False, color=INK, leading=13):
    global y
    font = "BodyCV-Bold" if bold else "BodyCV"
    c.setFont(font, size)
    c.setFillColor(color)
    for segment in simpleSplit(text, font, size, PAGE_W - LEFT - RIGHT):
        c.drawString(LEFT, y, segment)
        y -= leading


def section(title):
    global y
    y -= 21
    c.setLineWidth(.75)
    c.setStrokeColor(ACCENT)
    c.line(LEFT, y + 17, LEFT + 37, y + 17)
    c.setStrokeColor(colors.HexColor("#C8C8C8"))
    c.line(LEFT + 43, y + 17, PAGE_W - RIGHT, y + 17)
    line(title.upper(), 9.4, True, INK, 19)


def role(title, organisation, dates, detail):
    global y
    c.setFillColor(SOFT_PINK)
    c.roundRect(LEFT - 6, y - 5, PAGE_W - LEFT - RIGHT + 12, 18, 3, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("BodyCV-Bold", 9.5)
    c.drawString(LEFT, y, f"{title} - {organisation}")
    c.setFillColor(ACCENT)
    c.setFont("BodyCV", 8.7)
    c.drawRightString(PAGE_W - RIGHT, y, dates)
    y -= 14
    if isinstance(detail, str):
        detail = [detail]
    for detail_line in detail:
        line(detail_line, 9.0, False, MUTED, 13)
    y -= 6


def skill_row(label, details, index):
    global y
    row_y = y
    if index % 2 == 1:
        c.setFillColor(SOFT)
        c.rect(LEFT - 4, row_y - 5, PAGE_W - LEFT - RIGHT + 8, 15, fill=1, stroke=0)
    # A tiny diamond is a restrained nod to game-interface visual language.
    c.setFillColor(ACCENT)
    p = c.beginPath()
    p.moveTo(LEFT + 4, row_y + 2.5)
    p.lineTo(LEFT + 7, row_y - .5)
    p.lineTo(LEFT + 4, row_y - 3.5)
    p.lineTo(LEFT + 1, row_y - .5)
    p.close()
    c.drawPath(p, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("BodyCV-Bold", 8.5)
    c.drawString(LEFT + 17, row_y, label)
    c.setFont("BodyCV", 8.45)
    if pdfmetrics.stringWidth(details, "BodyCV", 8.45) > PAGE_W - RIGHT - (LEFT + 129):
        raise RuntimeError(f"Skill row is too long: {label}")
    c.drawString(LEFT + 129, row_y, details)
    y -= 15


c.setFillColor(INK)
c.rect(34, 677, PAGE_W - 68, 137, fill=1, stroke=0)
c.setFillColor(ACCENT)
c.rect(34, 677, 6, 137, fill=1, stroke=0)
c.setFont("BodyCV-Bold", 8.5)
c.drawString(LEFT, 790, "FIRA CG  /  GAME ART CV")
c.setFillColor(PAPER)
c.setFont("DisplayCV", 26)
c.drawString(LEFT - 1, 751, "DARIYA DOVHENKO")
c.setFont("BodyCV-Bold", 10.2)
c.drawString(LEFT, 720, "2D GAME ARTIST  /  ILLUSTRATOR")
c.setFillColor(colors.HexColor("#C9C5CA"))
c.setFont("BodyCV", 9.1)
c.drawString(LEFT, 696, "Tbilisi, Georgia  |  Remote / hybrid  |  firacgi@gmail.com")

links = [
    ("Website", "https://firacg.github.io/", "globe.png"),
    ("ArtStation", "https://www.artstation.com/maboroshi94", "artstation.png"),
    ("LinkedIn", "https://www.linkedin.com/in/firacg/", "linkedin (1).png"),
    ("Instagram", "https://www.instagram.com/fira_cg/", "instagram.png"),
    ("Telegram", "https://t.me/FiraCG", "telegram.png"),
]
icon_sizes = {
    "Website": 13.5,
    "ArtStation": 13,
    "LinkedIn": 13,
    "Instagram": 12,
    "Telegram": 13,
}
icon_offsets = {
    "Website": (-1, 1),
    "ArtStation": (0, 1),
    "LinkedIn": (0, 1.5),
    "Instagram": (0, 0),
    "Telegram": (-2, 0),
}
for index, (label, url, icon_name) in enumerate(links):
    x = LEFT + index * 100
    button_width = 96.5
    c.setFillColor(colors.white)
    c.setStrokeColor(colors.HexColor("#D8D5D4"))
    c.setLineWidth(.6)
    c.roundRect(x, 640, button_width, 27, 4, fill=1, stroke=1)
    label_width = pdfmetrics.stringWidth(label, "BodyCV-Bold", 8.2)
    label_left = x + (button_width - label_width) / 2
    icon_center_x = (x + label_left) / 2
    icon_size = icon_sizes[label]
    icon_dx, icon_dy = icon_offsets[label]
    c.drawImage(
        ImageReader(ROOT / "icons" / icon_name),
        icon_center_x - icon_size / 2 + icon_dx,
        653.5 - icon_size / 2 + icon_dy,
        icon_size,
        icon_size,
        mask="auto",
    )
    c.setFillColor(INK)
    c.setFont("BodyCV-Bold", 8.2)
    c.drawCentredString(x + button_width / 2, 651, label)
    c.linkURL(url, (x, 640, x + button_width, 667), relative=0)
y = 629

section("Profile")
line("I began in traditional painting and moved into games in 2018. I have worked on characters, props and story-driven illustrations for studio teams, and have also led 2D art production. I enjoy shaping the first rough idea, then staying with it through the final details that make it work in a game.", 9.2, leading=13)

section("Professional experience")
role("Freelance 2D Artist & Illustrator", "Independent", "Jul 2026 - present", "Character, illustration and game-art commissions; concepts through final artwork.")
role("2D Artist", "GAMETEQ, Tbilisi", "Jan 2024 - Jul 2026", "Created 2D game art for Plarium's Throne: Kingdom at War and Vikings: War of Clans.")
role("Lead 2D Artist", "DEFU Games, Odesa", "2021 - 2023", [
    "Developed visual style and led 2D art production across six game projects.",
    "Love Camp, Pulse of Love, Candy Puzzle, Puzzle Kingdom, Money Rush and Egg Wars.",
])
role("2D Artist", "DEFU Games, Odesa", "2020 - 2021", "2D art production for game projects; subsequently moved into the lead role.")
role("Freelance 2D Artist", "Various clients, Ukraine", "2019 - 2020", "Illustrations, portraits and icons for indie teams and international clients.")
role("2D Artist", "Nordcurrent, Odesa region", "2018 - 2019", "Illustrations, locations, props and concepts for Murder by Choice: Mystery Game.")

section("Education")
line("Fine Art - Grekov Odesa Art College, 2016 - 2018", 9.1, leading=13)
line("Graphic Design - IT Step Academy, 2015 - 2016", 9.1, leading=13)
line("Specialist, Computer Technology - Odesa Polytechnic, 2010 - 2015", 9.1, leading=13)

section("Languages")
line("English | Ukrainian | Russian", 9.1, leading=13)

section("Core skills")
skill_row("Game art", "Characters, key art, props, concepts, visual storytelling", 0)
skill_row("Art fundamentals", "Composition, anatomy, perspective, color and light, value, form", 1)
skill_row("Creative software", "Photoshop, Clip Studio Paint, Blender 3D, Illustrator, Figma", 2)
skill_row("AI-assisted art", "Stable Diffusion, ComfyUI, LoRA, checkpoints, Midjourney, Gemini, Higgsfield", 3)
skill_row("Collaboration", "Jira, Miro, Trello", 4)

if y < 50:
    raise RuntimeError(f"CV overflows page: y={y}")
c.setStrokeColor(colors.HexColor("#C8C8C8"))
c.setLineWidth(.6)
c.line(LEFT, 50, PAGE_W - RIGHT, 50)
c.setFillColor(MUTED)
c.setFont("BodyCV", 8)
c.drawString(LEFT, 36, "Fira CG  /  Game art portfolio and CV")
c.drawRightString(PAGE_W - RIGHT, 36, "01")
c.save()
print(f"Created {OUTPUT} (last baseline {y:.1f} pt)")
