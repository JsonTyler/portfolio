"""Build a recruiter résumé: US Letter, one column, selectable text, no graphics.

Use current production Resume HTML as content: build first when copy changes.
Requires BeautifulSoup and WeasyPrint; preserves the legacy PDF.
"""
from pathlib import Path
from html import escape
import re
from bs4 import BeautifulSoup
from weasyprint import HTML

ROOT=Path(__file__).resolve().parents[2]
soup=BeautifulSoup((ROOT/'.next/server/app/resume.html').read_text(),'html.parser')
main=soup.find('main')
constants=(ROOT/'lib/constants.ts').read_text()
def value(name):return re.search(name+r": '([^']+)'",constants).group(1)
def text(node):return escape(node.get_text(' ',strip=True))
def card(title):return main.find('h2',string=title).parent
email,site=value('email'),value('siteUrl')
body=f'<header><h1>{escape(value("author"))}</h1><p class="headline">Senior Front-End Software Engineer · Team Lead · UX</p><p class="contact"><a href="mailto:{escape(email)}">{escape(email)}</a> · <a href="{escape(site)}">jasontylerrodriguez.com</a><br><a href="{escape(value("linkedin"))}">linkedin.com/in/jason-tyler-rodriguez</a> · <a href="{escape(value("github"))}">github.com/JsonTyler</a></p></header>'
body+='<section><h2>Professional summary</h2><p>'+text(card('Professional Summary').find('p'))+'</p></section>'
body+='<section><h2>Experience</h2>'
for heading in card('Experience').find_all('h3'):
    role=heading.parent
    body+='<article><h3>'+text(heading)+'</h3><p class="dates">'+text(role.find('p'))+'</p><ul>'
    for item in role.find_all('li'):body+='<li>'+text(item)+'</li>'
    body+='</ul></article>'
body+='</section><section><h2>Skills</h2>'
for label in card('Skills').find_all('p'):
    values=label.find_next_sibling('div')
    if values:
        badges=values.find_all('span',recursive=False)
        skills=', '.join(text(item) for item in badges) if badges else text(values)
        body+='<p class="skills"><strong>'+text(label)+':</strong> '+skills+'</p>'
body+='</section><section><h2>Education</h2><p>'+text(card('Education').find('p'))+'</p></section>'
style='''
@page { size: Letter; margin: 12mm 15mm; }
body { font-family: DejaVu Sans, sans-serif; color:#182c3e; font-size:10pt; line-height:1.32; }
h1 { margin:0 0 3pt; font-size:21pt; font-weight:700; }
.headline { font-size:10pt; font-weight:600; margin:0 0 4pt; }
.contact { font-size:8.3pt; line-height:1.5; margin:0 0 9pt; }
h2 { font-size:10.5pt; text-transform:uppercase; letter-spacing:.6pt; margin:10pt 0 4pt; padding-bottom:3pt; border-bottom:1px solid #9baebb; break-after:avoid; }
h3 { font-size:9.5pt; line-height:1.3; margin:7pt 0 1pt; break-after:avoid; }
p { margin:2pt 0 4pt; } .dates { color:#465d6b; font-size:8.5pt; margin:0 0 3pt; }
ul { margin:2pt 0 6pt; padding-left:13pt; } li { margin-bottom:1pt; }
article { break-inside:avoid; } .skills { margin:2pt 0; }
a { color:#1e526d; text-decoration:none; } strong { font-weight:700; }
'''
output=ROOT/'public/resume/Jason-Tyler-Rodriguez-Resume-2026.pdf'
document=HTML(string=f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Jason Tyler Rodriguez - Resume</title><style>{style}</style></head><body>{body}</body></html>').render()
document.write_pdf(output)
all_text=' '.join(box.text for page in document.pages for box in page._page_box.descendants() if hasattr(box,'text'))
assert 'Team Lead' in all_text and 'eight years' in all_text and '7+ years' not in all_text
assert 'Print / save' not in all_text and 'Open résumé' not in all_text
print(output);print(f'{len(document.pages)} page(s), US Letter, selectable text')
