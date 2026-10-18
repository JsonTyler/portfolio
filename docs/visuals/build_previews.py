"""Experimental rejected reconstructions; do not publish as completed interaction demos.

Requires Python Pillow and ImageMagick. Run from any directory. Existing SVG
posters for Timely and Framed are the source artwork. No application is altered.
"""
from pathlib import Path
from html import escape
from tempfile import TemporaryDirectory
import subprocess
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public/projects'


def rect(x, y, w, h, color, radius=0, stroke=None):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{color}"' + (f' stroke="{stroke}"' if stroke else '') + '/>'


def text(x, y, label, size=16, color='#eef2fb', bold=False):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{700 if bold else 400}">{escape(label)}</text>'


def svg(parts, title):
    return '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="780" viewBox="0 0 1200 780"><title>' + escape(title) + '</title><g font-family="DejaVu Sans, sans-serif">' + ''.join(parts) + '</g></svg>'


def inbox(filtered=False, selected=False):
    # app/globals.css Midnight zinc tokens; EmailTab CleanupPanel structure.
    bg, panel, edge, muted = '#02030c', '#070a1a', '#2b426d', '#d8e7fc'
    p = ['<defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#17142e"/><stop offset=".4" stop-color="#070916"/><stop offset="1" stop-color="#02030c"/></linearGradient></defs>', rect(0, 0, 1200, 780, 'url(#sky)'), rect(28, 28, 1144, 724, 'none', 12, '#2b426d'),
         rect(28, 28, 1144, 67, panel), text(55, 70, 'Data Dustr', 22, bold=True),
         rect(242, 44, 134, 34, '#141a36', 8), text(258, 67, 'Inbox Dustr', 15, '#93c5fd', True),
         text(399, 67, 'File Dustr', 15, muted), text(988, 67, 'Web · Demo', 14, muted),
         rect(48, 115, 38, 38, '#1b1b49', 10, '#34316a'), '<rect x="56" y="126" width="22" height="15" rx="2" fill="none" stroke="#818cf8" stroke-width="2"/><path d="M56 127l11 8 11-8" fill="none" stroke="#818cf8" stroke-width="2"/>',
         text(100, 133, 'Inbox Dustr', 19, bold=True), text(100, 155, 'demo@example.test', 12, muted)]
    for x, label in [(55, 'Overview'), (178, 'Insights'), (284, 'Organize'), (409, 'Unsubscribe'), (569, 'Activity'), (678, 'Settings'), (795, 'Help')]:
        p += [text(x, 195, label, 15, '#c8d4ec')]
    p += [rect(48, 211, 1100, 1, edge)]
    for i, (label, color, count) in enumerate([('Newsletters', '#818cf8', 3), ('Promotions', '#fbbf24', 2), ('Receipts', '#34d399', 4), ('Personal', '#a78bfa', 2), ('Social', '#38bdf8', 3), ('Large Files', '#fb7185', 1), ('Old Threads', muted, 2)]):
        y = 238 + i * 49
        if i == 0:
            p += [rect(48, y, 213, 42, '#171735', 12, '#34316a')]
        p += [f'<circle cx="65" cy="{y+21}" r="4" fill="{color}"/>', text(80, y+26, label, 14, '#c8d4ec'), text(237, y+26, str(count), 12, muted)]
    p += [text(291, 261, 'Newsletters', 17, '#a5b4fc', True), text(448, 261, '3 pending · 0 cleared', 13, muted),
          text(291, 299, 'All   7d   30d   90d   6m   >1yr', 12, muted),
          text(587, 299, 'All   unread   attach.   >500KB   keep', 12, muted),
          rect(290, 323, 854, 38, panel, 8, '#141a36'), text(309, 348, 'studio' if filtered else 'Search emails…', 14, '#eef2fb' if filtered else muted),
          text(290, 390, '1 email' if filtered else '3 emails', 13, muted)]
    rows = [('Studio Dispatch', 'Your monthly design roundup', 'Oct 12'), ('Product Notes', 'This week in product thinking', 'Oct 10'), ('Weekend Reading', 'A few ideas worth saving', 'Oct 08')]
    if filtered:
        rows = rows[:1]
    for i, (sender, subject, date) in enumerate(rows):
        y = 408 + i * 91
        p += [rect(290, y, 854, 79, '#10112b' if selected else panel, 12, '#49467d' if selected else edge),
              rect(309, y+27, 17, 17, '#6366f1' if selected else panel, 4, '#7a8bb5'),
              text(348, y+29, sender, 15, bold=True), text(348, y+54, subject, 14, '#a5b4d2'),
              text(1045, y+29, date, 12, muted)]
        if selected:
            p += [text(310, y+41, '✓', 15, '#ffffff')]
    if selected:
        p += [rect(425, 656, 570, 58, '#141a36', 16, '#1c2448'), text(447, 691, '1 selected', 14, bold=True),
              rect(563, 668, 92, 32, '#34142a', 8), text(580, 690, 'Delete', 13, '#fb7185'),
              rect(668, 668, 98, 32, '#1c2448', 8), text(683, 690, 'Archive', 13),
              text(784, 690, 'Unsub + Delete', 13, '#a5b4fc')]
    return svg(p, 'Inbox Dustr — synthetic Midnight cleanup preview')


def raster(source, folder, name):
    path = folder / f'{name}.svg'
    path.write_text(source)
    target = folder / f'{name}.png'
    subprocess.run(['magick', '-background', '#02030c', str(path), '-resize', '900x585', '-alpha', 'off', str(target)], check=True)
    return Image.open(target).convert('RGB')


def cursor(frame, x, y, click=False):
    frame = frame.copy()
    d = ImageDraw.Draw(frame)
    x, y = x*.75, y*.75
    if click:
        d.ellipse((x-13, y-13, x+13, y+13), outline='#93c5fd', width=3)
    d.polygon([(x, y), (x+2, y+21), (x+7, y+15), (x+13, y+23), (x+17, y+20), (x+11, y+12), (x+20, y+11)], fill='white', outline='#111827')
    return frame


def encode(name, frames):
    # One global palette keeps flat UI colors steady. No loop extension: once.
    palette = frames[0].quantize(colors=224)
    indexed = [f.quantize(palette=palette, dither=Image.Dither.NONE) for f in frames]
    rejected = ROOT / 'docs/visuals/rejected'
    rejected.mkdir(exist_ok=True)
    indexed[0].save(rejected / f'{name}.gif', save_all=True, append_images=indexed[1:], duration=100, optimize=True, disposal=1)


def main():
    with TemporaryDirectory() as temp:
        folder = Path(temp)
        (OUT / 'datadustr.svg').write_text(inbox())
        states = [raster(inbox(), folder, 'inbox'), raster(inbox(True), folder, 'filtered'), raster(inbox(True, True), folder, 'selected')]
        frames = []
        for i in range(80):
            state = 0 if i < 29 else 1 if i < 52 else 2
            if i < 20:
                t = i/19
                x, y = 1050-400*t, 600-260*t
            elif i < 42:
                x, y = 650, 340
            elif i < 52:
                t = (i-42)/9
                x, y = 650-335*t, 340+103*t
            else:
                x, y = 315, 443
            frames.append(cursor(states[state], x, y, i in (20, 51)))
        encode('datadustr', frames)
        timely = raster((OUT / 'timely.svg').read_text(), folder, 'timely')
        frames = []
        for i in range(80):
            t = min(1, max(0, (i-18)/32))
            shift = round(-75*(t*t*(3-2*t)))
            frame = timely.copy()
            d = ImageDraw.Draw(frame)
            for x,y,w in [(285,301,264),(374,386,353),(640,471,274)]:
                box = tuple(round(v*.75) for v in (x,y,x+w,y+43))
                item = timely.crop(box)
                d.rectangle((188,box[1],810,box[3]), fill=timely.getpixel((200,200)))
                for gx in [279,413,547,681,815,949]:
                    d.line((round(gx*.75),box[1],round(gx*.75),box[3]),fill=timely.getpixel((209,210)))
                frame.paste(item,(box[0]+shift,box[1]))
            frames.append(cursor(frame, 850+shift/.75, 400, i==18))
        encode('timely', frames)
        framed = raster((OUT / 'framed.svg').read_text(), folder, 'framed')
        # Drag the original frame, marker, and tooltip together on the wall.
        box = tuple(round(v*.75) for v in (846,368,970,536))
        item = framed.crop(box)
        frames = []
        for i in range(80):
            t = min(1,max(0,(i-18)/32))
            dx,dy=round(-56*t),round(-49*t)
            frame=framed.copy()
            ImageDraw.Draw(frame).rectangle(box,fill='#f2f0e9')
            frame.paste(item,(box[0]+dx,box[1]+dy))
            frames.append(cursor(frame,910+dx/.75,457+dy/.75,i==18))
        encode('framed',frames)
        (OUT / 'inbox-dustr-midnight.svg').write_text((OUT / 'datadustr.svg').read_text())
    print('Created three opaque 900×585 GIFs; 8 seconds each, play once.')


if __name__ == '__main__':
    main()
