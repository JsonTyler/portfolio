"""As I Left It social artwork, extending the established SVG brain. Dev-only Playwright."""
import html
import base64
from pathlib import Path
import re
import struct
import zipfile
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'public/brand/as-i-left-it'


def svg(width,height,body):
 return f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}"><defs><radialGradient id="halo"><stop stop-color="#e4e7d8"/><stop offset="1" stop-color="#faf4e7"/></radialGradient></defs>{body}</svg>'

def text(value,x,y,size,fill='#233f2d',family='Georgia,serif',weight=500):
 return f'<text x="{x}" y="{y}" font-family="{family}" font-weight="{weight}" font-size="{size}" fill="{fill}">{html.escape(value)}</text>'

def main():
 OUT.mkdir(parents=True,exist_ok=True)
 mascot_path=ROOT/'public/brand/as-i-left-it/mascot/brain-happy-v2.png'
 encoded=base64.b64encode(mascot_path.read_bytes()).decode()
 brain=f'<image href="data:image/png;base64,{encoded}" width="440" height="370" preserveAspectRatio="xMidYMid meet"/>'
 def mascot(x,y,scale=1):return f'<g transform="translate({x} {y}) scale({scale})">{brain}</g>'
 def star(x,y,size=20,color='#8d9f74'):
  return f'<path d="M{x} {y-size}q0 {size} {size} {size}q-{size} 0 -{size} {size}q0 -{size} -{size} -{size}q{size} 0 {size} -{size}" fill="{color}"/>'
 def decoration(w,h):
  return f'<rect width="{w}" height="{h}" fill="#faf4e7"/><ellipse cx="{w*.68}" cy="{h*.4}" rx="{w*.7}" ry="{h}" fill="url(#halo)"/><path d="M-80 {h*.75}C{w*.2} -70 {w*.35} {h*1.4} {w*.58} {h*.45}S{w*.9} -80 {w+100} {h*.6}" fill="none" stroke="#9cae87" stroke-width="2" stroke-dasharray="5 11" opacity=".5"/>'
 assets=[]
 for dark in [False,True]:
  bg='#203a2d' if dark else '#faf4e7'; halo='#38523c' if dark else '#e6e9db'
  body=f'<rect width="1080" height="1080" fill="{bg}"/><circle cx="540" cy="540" r="420" fill="{halo}"/><circle cx="540" cy="540" r="465" fill="none" stroke="#9cab82" stroke-width="3" stroke-dasharray="3 18"/>'+mascot(100,170,2)+star(230,250,35)+star(870,775,28,'#d59a77')
  assets.append((f'instagram-profile{"-dark" if dark else ""}',1080,1080,svg(1080,1080,body)))
 # Facebook exports at 2x Meta's 851x315 reference. Essential content stays central.
 body=decoration(1702,630)+mascot(330,140,1.05)+text('as i left it.',790,290,100)+text('A little context. A clear next move.',795,357,27,'#68795a')+text('@AsILeftIt',798,435,30,'#425e3d','system-ui,sans-serif',600)+star(1370,160,27)+star(700,410,18,'#d59a77')
 assets.append(('facebook-cover',1702,630,svg(1702,630,body)))
 body=decoration(1584,396)+mascot(380,51,.77)+text('as i left it.',760,171,76)+text('A little context. A clear next move.',765,231,23,'#68795a')+text('@AsILeftIt',767,292,23,'#425e3d','system-ui,sans-serif',600)+star(1400,80,20)
 assets.append(('linkedin-profile-banner',1584,396,svg(1584,396,body)))
 body=decoration(1128,191)+mascot(262,10,.47)+text('as i left it.',520,88,54)+text('A little context. A clear next move.  /  @AsILeftIt',523,135,21,'#425e3d','system-ui,sans-serif',500)+star(1025,57,15)
 assets.append(('linkedin-company-banner',1128,191,svg(1128,191,body)))
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,args=['--disable-gpu','--renderer-process-limit=1'])
  page=browser.new_page();page.route('http://**/*',lambda route:route.abort());page.route('https://**/*',lambda route:route.abort())
  for name,w,h,source in assets:
   (OUT/f'{name}.svg').write_text(source)
   page.set_viewport_size({'width':w,'height':h});page.set_content('<!doctype html><html lang="en"><title>As I Left It social artwork</title><style>*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden}svg{display:block}</style>'+source)
   page.screenshot(path=str(OUT/f'{name}.png'))
   raw=(OUT/f'{name}.png').read_bytes();assert struct.unpack('>II',raw[16:24])==(w,h)
  browser.close()
 cards=''.join(f'<article><h2>{html.escape(name.replace("-"," ").title())}</h2><p>{w} × {h} · <a href="{name}.png" download>PNG</a> · <a href="{name}.svg" download>Editable SVG</a></p><img src="{name}.png" alt="{html.escape(name)}" class="{"avatar" if w==h else "banner"}"></article>' for name,w,h,_ in assets)
 (OUT/'index.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>As I Left It — social kit</title><style>body{margin:0;background:#f3eee8;color:#233f2d;font:16px/1.6 system-ui,sans-serif}main{max-width:1080px;margin:auto;padding:32px 20px}h1{font:54px Georgia,serif}article{margin:32px 0;padding:24px;background:#fff;border:1px solid #d9cfdf;border-radius:20px}img{max-width:100%;height:auto}.avatar{width:260px;border-radius:50%}a{color:#425e3d}h2{font-size:20px}</style><main><p>@AsILeftIt / social artwork</p><h1>A little context.</h1><p>The approved plush brain mascot, with warm paper, sage and forest-green accents.</p><p><a href="as-i-left-it-social-kit.zip" download>Download the full kit</a></p>'+cards+'<p>PNG files are ready to upload. SVG files preserve editable layouts and live text; the plush character is an embedded PNG. Check the platform crop before saving; profile photos and responsive covers can overlap or crop differently. Nothing has been uploaded to social accounts.</p></main></html>')
 (OUT/'README.txt').write_text('AS I LEFT IT / @AsILeftIt\n\nStart with instagram-profile.png. The preview displays the square image in a circular crop. An alternate dark profile mark is included.\n\nFacebook: facebook-cover.png (1702 x 630, 2x851x315).\nLinkedIn personal profile: linkedin-profile-banner.png (1584 x 396).\nLinkedIn company page: linkedin-company-banner.png (1128 x 191).\n\nEditable SVG originals accompany each PNG. Typography remains live text and can vary slightly if re-rendered with different system fonts; the PNGs preserve the reviewed rendering. The plush brain is adapted from the owner-approved reference with the built-in image-generation tool. Its transparent PNG is embedded in the SVG layouts; typography and framing remain editable. No stock photos or third-party icons were added.\n\nAlways inspect the actual platform crop before saving; banners and profile overlays vary with device. No accounts were modified or assets published.\n\nReferences checked October 18, 2026:\nhttps://www.facebook.com/help/125379114252045\nhttps://www.linkedin.com/help/linkedin/answer/a568217\n')
 with zipfile.ZipFile(OUT/'as-i-left-it-social-kit.zip','w',zipfile.ZIP_DEFLATED) as archive:
  for file in sorted(OUT.iterdir()):
   if file.suffix in {'.png','.svg','.html','.txt'}:archive.write(file,file.name)
 print('Prepared social kit:',OUT)
if __name__=='__main__':main()
