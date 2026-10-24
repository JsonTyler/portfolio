"""Render original scored tours from fictional local prototype captures. Dev-only Playwright."""
import argparse
import base64
import json
import struct
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[2]
CAPTIONS={
 'inbox':['Read the sample inbox overview.','Explore patterns in Insights.','Review organization and protected messages.','Browse recurring senders in Unsubscribe.'],
 'file':['See the fictional folder dashboard.','Inspect suggestions in the review queue.','Explore rules for the sample files.'],
}
FRAMES={'inbox':['overview','insights','organize','unsubscribe'],'file':['dashboard','review-queue','organize']}

def data(path):
 return 'data:image/'+('svg+xml' if path.suffix=='.svg' else 'png')+';base64,'+base64.b64encode(path.read_bytes()).decode()
def stamp(seconds):
 return f'00:{int(seconds)//60:02}:{seconds%60:06.3f}'
def with_duration(raw,seconds):
 # MediaRecorder omits duration. Add it to Segment/Info for a finite native timeline.
 def number(at,identifier=False):
  first=raw[at];size=next(n for n in range(1,9) if first & (1 << (8-n)))
  value=int.from_bytes(raw[at:at+size],'big')
  return (value if identifier else value & ((1 << (7*size))-1)),size
 def encoded(value):
  size=next(n for n in range(1,9) if value < (1 << (7*n))-1)
  return (value | (1 << (7*size))).to_bytes(size,'big')
 at=0
 while at<len(raw):
  tag,n=number(at,True);length,m=number(at+n);start=at+n+m
  if tag==0x18538067:
   child=start
   while child<len(raw):
    ident,a=number(child,True);count,b=number(child+a);body=child+a+b
    if ident==0x1549A966:
     payload=raw[body:body+count]+bytes.fromhex('448988')+struct.pack('>d',seconds*1000)
     return raw[:child+a]+encoded(len(payload))+payload+raw[body+count:]
    child=body+count
   break
  at=start+length
 raise ValueError('Recording has no WebM Segment/Info')

def main():
 parser=argparse.ArgumentParser();parser.add_argument('--captures',type=Path);parser.add_argument('--only',choices=['inbox','file']);args=parser.parse_args()
 with sync_playwright() as p:
  browser=p.chromium.launch(headless=True,args=['--disable-gpu','--renderer-process-limit=1','--autoplay-policy=no-user-gesture-required'])
  page=browser.new_page(viewport={'width':1280,'height':800});page.route('http://**/*',lambda route:route.abort());page.route('https://**/*',lambda route:route.abort());page.set_content('<!doctype html><html lang="en"><title>Local trailer renderer</title><body></body></html>')
  for product,views in FRAMES.items():
   if args.only and product != args.only:continue
   result=page.evaluate((ROOT/'docs/visuals/trailer_renderer.js').read_text(),{'frames':[],'mascot':data(ROOT/'public/brand/as-i-left-it/mascot/brain-happy-v2.png'),'puzzled':data(ROOT/'public/brand/as-i-left-it/mascot/brain-puzzled-v2.png'),'product':product.title()+' Dustr','accent':'#80e1c4' if product=='inbox' else '#ffc16b','captions':CAPTIONS[product]})
   prefix=ROOT/'public/projects'/f'{product}-dustr-trailer'
   raw=base64.b64decode(result['video'].rsplit(',',1)[1]);assert b'OpusHead' in raw and len(raw)>20000
   raw=with_duration(raw,result['duration'])
   prefix.with_suffix('.webm').write_bytes(raw);prefix.with_name(prefix.name+'-poster.jpg').write_bytes(base64.b64decode(result['poster'].rsplit(',',1)[1]))
   lines=['Downloads. Again.' if product=='file' else 'It keeps piling up.','A place for each thing.' if product=='file' else 'Keep what matters.','Preview. Then move.' if product=='file' else 'One small decision.','Changed your mind? Undo.','Room for the next thing. Explore the mock-data concept.']
   timings=[0,4,8,13,17,22]
   cues=[f'{stamp(timings[i])} --> {stamp(timings[i+1])}\n'+('[Original instrumental music] ' if i==0 else '')+line for i,line in enumerate(lines)]
   prefix.with_suffix('.vtt').write_text('WEBVTT\n\n'+'\n\n'.join(cues)+'\n')
   print(json.dumps({'product':product,'seconds':result['duration'],'bytes':len(raw),'audio_tracks':result['audioTracks'],'decoded_audio_rms':result['decodedRms'],'decoded_audio_peak':result['decodedPeak']}),flush=True)
  browser.close()
if __name__=='__main__':main()
