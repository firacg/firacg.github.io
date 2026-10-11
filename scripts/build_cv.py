from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader
import json

OUT=Path(__file__).resolve().parents[1] / 'public' / 'downloads'
OUT.mkdir(parents=True,exist_ok=True)
styles={
 'name':ParagraphStyle('name',fontName='Helvetica-Bold',fontSize=21,leading=25,spaceAfter=6,textColor=HexColor('#20324b')),
 'role':ParagraphStyle('role',fontName='Helvetica-Bold',fontSize=12,leading=16,spaceAfter=9),
 'body':ParagraphStyle('body',fontName='Helvetica',fontSize=10,leading=14,spaceAfter=6),
 'section':ParagraphStyle('section',fontName='Helvetica-Bold',fontSize=10,leading=15,spaceBefore=12,spaceAfter=6,textColor=HexColor('#20324b')),
 'job':ParagraphStyle('job',fontName='Helvetica-Bold',fontSize=10,leading=14,spaceBefore=6,spaceAfter=4),
 'bullet':ParagraphStyle('bullet',fontName='Helvetica',fontSize=10,leading=14,leftIndent=10,firstLineIndent=-8,spaceAfter=5),
}
education=[
 'Fine Art (specialised secondary qualification) - Grekov Odesa Art College | 2018',
 'Master\'s degree, Management of Organisations - International Humanitarian University, Odesa | 2018',
 'Bachelor\'s level, Engineer-Programmer - Odesa National Polytechnic University | 2015',
 'Computer Technology (specialised secondary qualification) - Odesa Polytechnic | 2015',
 'Graphic Design course - IT Step Academy | 2016',
]
variants = {'Senior_2D_Game_Artist': {
  'role':'Senior 2D Game Artist / Illustrator',
  'summary':'2D Game Artist and Illustrator with 8+ years in game production and previous experience as Lead 2D Artist. Delivered 250+ game and marketing illustrations at GAMETEQ and led a team of seven artists at DEFU Games. Creates characters, environments, props, UI graphics and finished illustrations, with a focus on realism and semi-realism and experience across casual/mobile projects.',
  'skills':[
   '2D production: sketches, thumbnails, design variations, character and environment art, turnarounds, prop sheets, isometry, icons and UI graphics.',
   'Production handoff: layered PSDs prepared for Spine animation, separated parts, animation overlaps and hidden-area painting.',
   'Art direction and leadership: style guides, brand identity, planning, hiring, mentoring, art reviews, paintovers and cross-team collaboration.',
   'Tools: Adobe Photoshop, Clip Studio Paint, Adobe Illustrator, Blender, Figma, Trello, Jira and Miro. Practical 3D modelling, blockouts, textures and shaders.',
   'Additional AI production: commercial use since late 2022; Stable Diffusion, FLUX, ComfyUI workflows and custom nodes, LoRA training, ControlNet, IP-Adapter and Photoshop finishing.',
  ],
  'projects':[
   ('Released game work','DEFU Games: Love Camp, Pulse of Love (Steam), Candy Puzzle, Puzzle Kingdom, Money Rush, Egg Wars and other released projects. Career credits include 10+ released hypercasual games and two semi-realistic projects.'),
   ('Art portfolio','https://firacg.github.io/'),
   ('Game projects on Behance','https://www.behance.net/maboroshi94'),
  ],
 }}

def para(text,style='body'):
 return Paragraph(escape(text),styles[style])
def link(url,label=None):
 return Paragraph('<link href="'+escape(url,{'"':'&quot;'})+'" color="#214b77">'+escape(label or url)+'</link>',styles['body'])
def add_section(story,title):story.append(para(title,'section'))
def add_job(story,title,date,items):
 story.append(KeepTogether([para(title,'job'),para(date)]+[para('- '+i,'bullet') for i in items]))
def footer(c,d):
 c.setFont('Helvetica',8);c.setFillColor(HexColor('#667085'));c.drawRightString(A4[0]-42,25,f'{d.page}')

results=[]
for key,v in variants.items():
 story=[para('Daria Dovhenko','name'),para(v['role'],'role'),para('Tbilisi, Georgia | Fully remote; hybrid or on-site in Georgia'),para('Email: firacgi@gmail.com')]
 for url in (['https://firacg.github.io/ai-video/'] if key!='Senior_2D_Game_Artist' else [])+['https://firacg.github.io/','https://www.artstation.com/maboroshi94','https://www.behance.net/maboroshi94','https://www.linkedin.com/in/firacg/']:story.append(link(url))
 add_section(story,'PROFESSIONAL SUMMARY');story.append(para(v['summary']))
 add_section(story,'CORE SKILLS')
 for text in v['skills']:story.append(para(text))
 add_section(story,'PROFESSIONAL EXPERIENCE')
 add_job(story,'Freelance 2D Artist and Illustrator | Independent','Jul 2026 - Present',['Create character, illustration and game-art commissions, from concepts to finished artwork.'])
 add_job(story,'2D Artist | GAMETEQ | Tbilisi, Georgia','Jan 2024 - Jul 2026',[
  'Delivered 250+ game and marketing illustrations at GAMETEQ, from concept and composition to final artwork.',
  'Created realistic and semi-realistic in-game shop, marketing, social media, promotional and advertising artwork; adapted deliverables for formats and UI layouts.',
  'Combined art fundamentals and AI-assisted exploration with manual finishing; revised composition, anatomy, perspective and lighting to match project direction.',
 ])
 story.append(PageBreak())
 add_section(story,'PROFESSIONAL EXPERIENCE CONTINUED')
 add_job(story,'Lead 2D Artist | DEFU Games | Odesa, Ukraine','2021 - 2023',[
  'Led seven artists; hired and mentored team members, assigned tasks, planned deadlines and coordinated production in Trello and Jira.',
  'Developed project visual styles, style guides and brand identity, from UI graphics to finished illustrations; collaborated with programmers, game designers and art directors.',
  'Reviewed work, provided paintovers and final polish, created artist lessons and prepared layered PSD assets for Spine animation.',
 ])
 add_job(story,'2D Artist | DEFU Games | Odesa, Ukraine','2020 - 2021',['Created game artwork; subsequently promoted to Lead 2D Artist.'])
 add_job(story,'Freelance 2D Artist | Various Clients | Ukraine','2019 - 2020',['Created illustrations, portraits and icons for indie teams and international clients.'])
 add_job(story,'2D Artist | Nordcurrent | Odesa Region, Ukraine','2018 - 2019',['Created illustrations, environments, props and concepts for Murder by Choice: Mystery Game.'])
 add_section(story,'SELECTED PROJECTS')
 if key!='Senior_2D_Game_Artist':story.append(para('All public AI-video work is personal portfolio work. Client work is not currently available for public viewing.'))
 for title,text in v['projects']:
  if text.startswith('https://'):story.append(link(text,title))
  else:story.append(para(title+': '+text))
 add_section(story,'EDUCATION AND TRAINING')
 for e in education:story.append(para(e))
 add_section(story,'LANGUAGES');story.append(para('English: C1 | Ukrainian: C2 | Russian: native'))
 file=OUT/'Fira-CG-CV.pdf'
 SimpleDocTemplate(str(file),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=36,bottomMargin=40,title=f'Daria Dovhenko - {v["role"]}',author='Daria Dovhenko').build(story,onFirstPage=footer,onLaterPages=footer)
 reader=PdfReader(file);text='\n'.join(p.extract_text() for p in reader.pages)
 assert all(len(p.extract_text())>100 for p in reader.pages)
 assert '250+' in text and 'DreamBooth' not in text and 'Custom Diffusion' not in text
 assert ('plar' + 'ium') not in text.casefold()
 results.append({'file':str(file),'pages':len(reader.pages),'bytes':file.stat().st_size,'role':v['role']})
print(json.dumps(results,ensure_ascii=True))
