import importlib.util
from pathlib import Path
spec=importlib.util.spec_from_file_location('previews', Path('docs/visuals/build_previews.py'))
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
r,t=m.rect,m.text
# Website hero follows original CSS and copy, without testimonials or outcome claims.
p=[r(0,0,1200,780,'#0f0f0f'),r(28,28,1144,65,'#1a1a1a'),r(28,92,1144,1,'#be261b'),t(53,71,'DataDustr',28,'#ffffff',True),t(574,67,'Services    Process    About    Contact',15,'#ffffff'),r(971,43,175,34,'#951108',6),t(984,66,'Book a Free Consult',13,'#ffffff'),t(188,252,'We Clean Up Your',49,'#ffffff',True),t(247,318,'Digital Chaos.',49,'#ffffff',True),t(168,378,'Files, emails, and business data — organized into',23,'#d0d0d0'),t(278,413,'systems that actually make sense.',23,'#d0d0d0'),r(454,456,292,58,'#951108',6),t(486,493,'Book a Free Consult',21,'#ffffff',True),r(200,569,800,3,'#be261c'),t(179,637,'Your Data Should Work for You,',36,'#ffffff',True),t(392,684,'Not Against You.',36,'#ffffff',True)]
Path('public/projects/datadustr-website.svg').write_text(m.svg(p,'DataDustr service website — source-based hero illustration'))
print('Created service website visual.')
