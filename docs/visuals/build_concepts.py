"""Build the user-authorized concept visuals. No browser recordings are implied."""
from pathlib import Path
from html import escape
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[2] / 'public/projects'
FONT = Path('/usr/share/fonts/truetype/dejavu')


def r(x,y,w,h,color,rx=0,stroke=None):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{color}"' + (f' stroke="{stroke}"' if stroke else '') + '/>'


def t(x,y,label,size=18,color='#f5faff',bold=False):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{700 if bold else 400}">{escape(label)}</text>'


def save(name,parts,title,font='DejaVu Sans, sans-serif'):
    (OUT/name).write_text('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="780" viewBox="0 0 1200 780"><title>'+escape(title)+'</title><g font-family="'+font+'">'+''.join(parts)+'</g></svg>')


def framed():
    p=[r(0,0,1200,780,'#111718'),t(46,65,'Framed',29,'#edf5e1',True),t(833,62,'Arrange a gallery wall',18,'#a9bdbb'),r(42,106,289,627,'#05386b',8,'#379683'),r(365,106,793,627,'#e9e7df',8),t(67,150,'WALL & FRAMES',15,'#edf5e1',True)]
    for y,label,value,ratio in [(208,'Wall width','72 in',.76),(319,'Wall height','48 in',.5)]:
        p += [t(67,y,label,19,'#edf5e1',True),t(249,y,value,17,'#edf5e1'),r(68,y+24,234,5,'#a6b8b5',2),r(68,y+24,234*ratio,5,'#5cdb95',2),f'<circle cx="{68+234*ratio}" cy="{y+26.5}" r="7" fill="#5cdb95"/>']
    p += [t(67,429,'Background',19,'#edf5e1',True),r(67,449,236,42,'#082b50',4,'#379683'),t(82,477,'White wall',17,'#edf5e1'),t(67,543,'Add frame',19,'#edf5e1',True),r(67,561,236,42,'#082b50',4,'#379683'),t(82,590,'11 × 14 in',17,'#edf5e1'),r(67,650,105,39,'#edf5e1',4),t(89,676,'Create',17,'#05386b',True),r(186,650,116,39,'#082b50',4,'#379683'),t(219,676,'Reset',17,'#edf5e1')]
    # The original marker tooltip measures pointer/nail coordinates from all
    # four wall boundaries, not distances from the frame's outer rectangle.
    wall_x,wall_y,wall_w,wall_h=405,145,720,480
    pin_x,pin_y=725,245
    assert (pin_x-wall_x)/10==32 and (wall_x+wall_w-pin_x)/10==40
    assert (pin_y-wall_y)/10==10 and (wall_y+wall_h-pin_y)/10==38
    p += [r(365,106,793,627,'#e9e7df',8),t(405,129,'72 × 48 in wall',16,'#51615b'),r(wall_x,wall_y,wall_w,wall_h,'#f6f3e9',0,'#b8bbae')]
    for x,y,w,h in [(475,350,110,140),(915,315,160,200),(670,253,110,140)]:
        p += [r(x+3,y+5,w,h,'#d4d0c6'),r(x,y,w,h,'#3c1704'),r(x+9,y+9,w-18,h-18,'#65666c'),f'<circle cx="{x+w/2}" cy="{y-8}" r="4" fill="#203b38"/>']
    def horizontal(x1,x2,y,label):
        mid=(x1+x2)/2
        return [r(x1,y-1,x2-x1,2,'#27777a'),r(x1,y-7,2,14,'#27777a'),r(x2-2,y-7,2,14,'#27777a'),r(mid-32,y-16,64,30,'#f6f3e9',4),t(mid-23,y+5,label,16,'#174b50',True)]
    def vertical(x,y1,y2,label):
        mid=(y1+y2)/2
        return [r(x-1,y1,2,y2-y1,'#27777a'),r(x-7,y1,14,2,'#27777a'),r(x-7,y2-2,14,2,'#27777a'),r(x+8,mid-14,64,28,'#f6f3e9',4),t(x+14,mid+5,label,16,'#174b50',True)]
    p += horizontal(wall_x,pin_x,pin_y,'32 in')+horizontal(pin_x,wall_x+wall_w,pin_y,'40 in')
    p += vertical(pin_x,wall_y,pin_y,'10 in')+vertical(815,pin_y,wall_y+wall_h,'38 in')
    p += [r(pin_x,pin_y,90,1,'#27777a'),f'<circle cx="{pin_x}" cy="{pin_y}" r="9" fill="#a5dfdb" stroke="#174b50" stroke-width="2"/>',f'<circle cx="{pin_x}" cy="{pin_y}" r="3" fill="#174b50"/>',t(648,420,'11 × 14 in frame',16,'#51615b')]
    p += [t(405,665,'Selected hanging point',19,'#174b50',True)]
    for x,label,value in [(405,'LEFT','32 in'),(585,'RIGHT','40 in'),(765,'TOP','10 in'),(945,'BOTTOM','38 in')]:
        p += [t(x,693,label,11,'#51615b',True),t(x,720,value,22,'#174b50',True)]
    save('framed-measurements.svg',p,'Framed: selected hanging point measured from all four wall boundaries','DejaVu Serif, serif')


def inbox():
    bg,panel,border,muted='#02030c','#070a1a','#2b426d','#d8e7fc'
    p=[r(0,0,1200,780,bg),r(0,0,1200,85,'#0d1025'),t(36,52,'Inbox Dustr',27,bold=True),t(249,52,'Demo · sample data',15,muted),t(911,52,'Data Dustr',19,'#93c5fd',True)]
    for x,label in [(36,'Overview'),(170,'Insights'),(287,'Organize'),(419,'Unsubscribe'),(594,'Activity')]:p +=[t(x,119,label,17,muted)]
    p += [r(30,139,1140,1,border)]
    for i,(label,count,color) in enumerate([('Newsletters','18','#818cf8'),('Promotions','12','#fbbf24'),('Receipts','3','#34d399'),('Personal','7','#a78bfa'),('Social','9','#38bdf8'),('Large Files','4','#fb7185')]):
        y=176+i*54
        if label=='Receipts':p +=[r(28,y,213,44,'#0c2b2c',10,'#23534c')]
        p +=[f'<circle cx="45" cy="{y+23}" r="4" fill="{color}"/>',t(60,y+29,label,16,muted),t(210,y+29,count,14,muted)]
    p +=[t(274,202,'Receipts',25,bold=True),t(968,201,'3 pending',16,muted),
        r(270,226,900,77,'#0c1b31',10,'#34547a'),t(292,256,'2 emails you may want to keep',19,'#bfdbfe',True),t(292,283,'Receipts · subscriptions · important documents',15,muted),r(1040,244,108,38,'#18355b',7,'#5279b0'),t(1063,269,'Review',16,'#dbeafe',True),
        r(270,320,900,132,panel,10,border),t(292,349,'Smart Auto-Tags',17,'#67e8f9',True),t(984,349,'Tags expanded',13,muted)]
    for x,label,w in [(292,'invoice · 2',137),(442,'subscription · 1',185),(640,'renewal · 1',143)]:p +=[r(x,366,w,30,'#122333',15,'#244b62'),t(x+12,387,label,14,'#a5e5f2')]
    p +=[t(292,427,'Keep tags',14,muted),r(405,405,104,28,'#20203a',14,'#41436b'),t(420,425,'invoice',14,'#c7d2fe'),r(523,405,116,28,'#20203a',14,'#41436b'),t(537,425,'contract',14,'#c7d2fe')]
    p +=[t(274,486,'Quick Clean',17,'#a5b4fc',True),r(415,462,236,36,panel,9,border),t(429,486,'Old Newsletters · 18',15,muted),r(665,462,218,36,panel,9,border),t(679,486,'Unread Promos · 12',15,muted)]
    for i,(sender,subject,protected) in enumerate([('Studio Billing','Your annual subscription receipt',True),('Workshop Team','Invoice for your design workshop',True),('Market Updates','Your shopping summary',False)]):
        y=519+i*72
        p +=[r(270,y,900,61,panel,9,border),r(290,y+22,17,17,bg,3,'#7891bd'),t(329,y+25,sender,16,bold=True),t(329,y+48,subject,15,muted)]
        if protected:p +=[r(1010,y+17,137,29,'#122c2b',14,'#2d5d56'),t(1025,y+37,'Keep suggested',13,'#a7f3d0',True)]
    save('inbox-smart.svg',p,'Inbox Dustr: Smart Keep, automatic tags and Quick Clean suggestions with synthetic messages')


def density_frame(progress):
    """Employee Maintenance composition informed by the user-supplied reference."""
    import math
    im=Image.new('RGB',(1200,780),'#f4f6fa');d=ImageDraw.Draw(im);text_boxes=[]
    def font(size,bold=False):return ImageFont.truetype(str(FONT/('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')),round(size))
    def label(x,y,s,size=14,color='#26364a',bold=False):
        face=font(size,bold);at=(round(x),round(y));text_boxes.append((d.textbbox(at,s,font=face),s));d.text(at,s,font=face,fill=color)
    def box(x,y,w,h,color,outline=None,radius=0):
        if w>0 and h>0:d.rounded_rectangle((round(x),round(y),round(x+w),round(y+h)),radius=radius,fill=color,outline=outline)
    def mix(a,b):return a+(b-a)*progress
    compact=progress>.5
    top=mix(66,46);rail=mix(94,65);title_h=mix(62,43);pad=mix(22,13);gap=mix(20,12)
    box(0,0,1200,top,'#10283e');label(22,mix(21,13),'Springbrook',mix(22,17),'#ffffff',True)
    label(205,mix(25,15),'Cirrus · employee workspace',mix(15,12),'#c1d5e3')
    # Compact mode belongs to an icon in the top application toolbar.
    cy=top/2;ix=1067
    box(ix-17,cy-17,34,34,'#dce5fa' if compact else '#234359',radius=4)
    ink='#44599a' if compact else '#d3e1ec'
    for sx,sy in [(-1,-1),(1,-1),(-1,1),(1,1)]:
        outer=(ix+sx*10,cy+sy*10);inner=(ix+sx*4,cy+sy*4)
        d.line((outer,inner),fill=ink,width=2)
        tip=inner if compact else outer
        d.line((tip,(tip[0]+sx*(4 if compact else -4),tip[1])),fill=ink,width=2)
        d.line((tip,(tip[0],tip[1]+sy*(4 if compact else -4))),fill=ink,width=2)
    d.ellipse((1111,cy-10,1131,cy+10),outline='#c1d5e3',width=1);label(1117,cy-8,'?',11,'#c1d5e3')
    d.ellipse((1160,cy-12,1184,cy+12),outline='#c1d5e3',width=1);d.ellipse((1168,cy-7,1176,cy+1),fill='#c1d5e3');d.arc((1164,cy,1180,cy+13),180,360,fill='#c1d5e3',width=3)
    box(0,top,1200,title_h,'#ffffff','#d8e0e8');label(20,top+mix(19,12),'Employee Maintenance / General',mix(23,18),bold=True)
    content_y=top+title_h
    box(0,content_y,rail,738-content_y,'#e9edf8')
    for i,name in enumerate(['General','Financial','Timecards','Timesheets','Taxes','Retirement','Deductions']):
        yy=content_y+15+i*mix(77,55)
        if yy+50>736:break
        if i==0:box(0,yy-5,rail,mix(68,47),'#dce5fa')
        iconx=rail/2;d.ellipse((iconx-6,yy+3,iconx+6,yy+15),outline='#5567ad',width=2)
        size=mix(11,9);f=font(size);tw=d.textlength(name,font=f);label(iconx-tw/2,yy+25,name,size,'#43517a')
    x=rail+pad;w=1200-x-pad;yy=content_y+pad;ch=mix(353,268)
    widths=[w*.31,w*.18,w*.20,w*.31-3*gap]
    positions=[];xx=x
    for width in widths:positions.append(xx);xx+=width+gap
    titles=['Employee Information','Employee Position','Emergency Contact','Accruals']
    for xx,width,title in zip(positions,widths,titles):
        box(xx,yy,width,ch,'#ffffff','#dbe1e9',3);label(xx+11,yy+12,title,mix(14,12),bold=True)
        d.line((xx+10,yy+mix(43,35),xx+width-10,yy+mix(43,35)),fill='#edf0f4')
    xx=positions[0];cw=widths[0]
    label(xx+12,yy+mix(60,46),'Jordan Demo (D104)',mix(16,13),'#315f9c',True)
    portrait_y=yy+mix(105,76)
    d.ellipse((xx+15,portrait_y,xx+75,portrait_y+60),fill='#e4ebf4',outline='#b7c9da');d.ellipse((xx+35,portrait_y+10,xx+55,portrait_y+30),fill='#b49279');d.ellipse((xx+26,portrait_y+29,xx+65,portrait_y+61),fill='#4d6789');d.arc((xx+33,portrait_y+8,xx+57,portrait_y+31),180,360,fill='#39434b',width=5)
    label(xx+91,portrait_y+3,'Email',10,'#6e7d8e');label(xx+91,portrait_y+23,'demo@example.test',mix(13,11),'#315f9c')
    fields=[('Address','100 Example Way'),('City / State','Example City'),('Postal code','00000'),('Phone','(000) 000-0000')]
    start=portrait_y+mix(82,74);step=mix(38,29)
    for i,(key,val) in enumerate(fields):
        label(xx+12,start+i*step,key,mix(11,9),'#758295');label(xx+12,start+i*step+mix(17,13),val,mix(14,11))
    for col,fields in [(1,[('Supervisor','Sample Manager'),('Position','Analyst'),('Location','Main Office'),('Union','Not assigned'),('Pay class','Regular')]),(2,[('Emergency contact','Sample Contact'),('Relationship','Family'),('Phone','(000) 000-0000'),('Tax status','Married'),('Filing status','Joint')])]:
        xx=positions[col]
        for i,(key,val) in enumerate(fields):
            fy=yy+mix(63,47)+i*mix(54,38)
            label(xx+11,fy,key,mix(11,9),'#758295');label(xx+11,fy+mix(19,14),val,mix(14,11))
    xx=positions[3];cw=widths[3]
    for i,(name,balance) in enumerate([('Vacation','30.0000'),('Sick leave','48.0000'),('Personal','12.0000')]):
        ay=yy+mix(63,47)+i*mix(89,62)
        label(xx+12,ay,name,mix(14,12),bold=True);label(xx+cw-72,ay,balance,mix(12,10),'#315f9c')
        label(xx+12,ay+mix(26,20),'Accrued',mix(10,9),'#758295');label(xx+cw-62,ay+mix(26,20),'Used',mix(10,9),'#758295')
        label(xx+12,ay+mix(43,34),'8.0000',mix(13,11));label(xx+cw-62,ay+mix(43,34),'0.0000',mix(13,11))
    bottom=yy+ch+gap;bh=733-bottom;leftw=(w-gap)*.58;rightx=x+leftw+gap;rightw=w-leftw-gap
    for bx,bw,title in [(x,leftw,'Pay History'),(rightx,rightw,'Deductions / Benefits')]:
        box(bx,bottom,bw,bh,'#ffffff','#dbe1e9',3);label(bx+12,bottom+13,title,mix(17,14),bold=True)
    rowh=mix(51,32);start=bottom+mix(66,59)
    label(x+12,start-20,'Check date',mix(11,9),'#758295');label(x+112,start-20,'Check #',mix(11,9),'#758295');label(x+202,start-20,'Hours',mix(11,9),'#758295')
    label(x+274,start-20,'Gross',mix(11,9),'#758295')
    for i in range(8):
        ry=start+i*rowh
        if ry+rowh>728:break
        label(x+12,ry+10,f'04/{24-i*2:02}/2026',mix(13,11));label(x+112,ry+10,str(1230-i),mix(13,11));label(x+202,ry+10,'80.00',mix(13,11));label(x+274,ry+10,'$4,000.00',mix(13,11))
        d.line((x+10,ry+rowh,x+leftw-155,ry+rowh),fill='#edf0f4')
    chartx=x+leftw-82;charty=bottom+min(bh/2+12,115);radius=min(54,bh*.25)
    if bh>145:
        for startangle,endangle,color in [(0,130,'#5bb9b8'),(130,235,'#f7b267'),(235,300,'#e56b85'),(300,360,'#9d8ec4')]:
            d.pieslice((chartx-radius,charty-radius,chartx+radius,charty+radius),startangle,endangle,fill=color)
        d.ellipse((chartx-radius*.57,charty-radius*.57,chartx+radius*.57,charty+radius*.57),fill='#ffffff')
        label(chartx-38,charty+radius+14,'Pay breakdown',9,'#758295')
    label(rightx+12,start-20,'Type',mix(11,9),'#758295');label(rightx+rightw-90,start-20,'Amount',mix(11,9),'#758295')
    deductions=['Direct deposit','Federal income tax','FICA Employee','Medical','Retirement','Dental','Vision','Other benefits']
    for i,name in enumerate(deductions):
        ry=start+i*rowh
        if ry+rowh>728:break
        label(rightx+12,ry+10,name,mix(13,11));label(rightx+rightw-90,ry+10,'100.00',mix(13,11))
        d.line((rightx+10,ry+rowh,rightx+rightw-10,ry+rowh),fill='#edf0f4')
    box(0,744,1200,36,'#10283e');label(20,755,('COMPACT' if compact else 'SPACIOUS')+'  /  Toolbar density icon · Employee Maintenance · sample data',13,'#ffffff',True)
    for bounds,word in text_boxes:
        assert bounds[2] <= 1195 and bounds[3] <= 778, ('Viewport overflow', word, bounds)
        if yy <= bounds[1] < yy+ch and bounds[0] >= positions[0]:
            column=max(index for index,left in enumerate(positions) if bounds[0]>=left)
            assert bounds[2] <= positions[column]+widths[column]-3 and bounds[3] <= yy+ch-3, ('Card overflow',word,bounds,progress)
    for index,(left,first) in enumerate(text_boxes):
        if not (yy <= left[1] < yy+ch and left[0] >= positions[0]):continue
        for right,second in text_boxes[index+1:]:
            if not (yy <= right[1] < yy+ch and right[0] >= positions[0]):continue
            overlap_x=min(left[2],right[2])-max(left[0],right[0])
            overlap_y=min(left[3],right[3])-max(left[1],right[1])
            assert overlap_x <= 1 or overlap_y <= 1, ('Overlapping text',first,second,progress)
    return im


def reference_canvas(progress,title,nav):
    im=Image.new('RGB',(1200,780),'#f4f6fa');d=ImageDraw.Draw(im)
    def mix(a,b):return a+(b-a)*progress
    def font(size,bold=False):return ImageFont.truetype(str(FONT/('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')),round(size))
    def label(x,y,value,size=14,color='#26364a',bold=False,max_width=None):
        face=font(size,bold);limit=max_width or (1190-x)
        while d.textlength(value,font=face)>limit:value=value[:-2]+'…'
        d.text((round(x),round(y)),value,font=face,fill=color)
    def box(x,y,w,h,color,outline=None,radius=0):
        if w>0 and h>0:d.rounded_rectangle((round(x),round(y),round(x+w),round(y+h)),radius=radius,fill=color,outline=outline)
    top=mix(66,46);side=mix(205,155);pad=mix(24,14)
    box(0,0,1200,top,'#10283e');label(20,mix(21,13),'Springbrook',mix(22,17),'#ffffff',True);label(205,mix(25,15),'Cirrus · product workspace',mix(15,12),'#c1d5e3')
    cy=top/2;ix=1067;compact=progress>.5;box(ix-17,cy-17,34,34,'#dce5fa' if compact else '#234359',radius=4);ink='#44599a' if compact else '#d3e1ec'
    for sx,sy in [(-1,-1),(1,-1),(-1,1),(1,1)]:
        outer=(ix+sx*10,cy+sy*10);inner=(ix+sx*4,cy+sy*4);d.line((outer,inner),fill=ink,width=2);tip=inner if compact else outer;offset=4 if compact else -4
        d.line((tip,(tip[0]+sx*offset,tip[1])),fill=ink,width=2);d.line((tip,(tip[0],tip[1]+sy*offset)),fill=ink,width=2)
    box(0,top,side,678,'#edf1f8');label(15,top+18,nav[0],mix(16,13),bold=True,max_width=side-25)
    for i,name in enumerate(nav[1:]):
        ny=top+mix(80,60)+i*mix(45,31)
        if ny>705:break
        if i==0:box(7,ny-5,side-14,mix(36,27),'#dce5fa',radius=3)
        label(18,ny,name,mix(13,11),'#596b87',i==0,max_width=side-30)
    x=side+pad;w=1200-x-pad;y=top+pad
    label(x,y,title,mix(25,20),bold=True);y+=mix(57,43)
    box(0,744,1200,36,'#10283e');label(20,755,('COMPACT' if compact else 'SPACIOUS')+'  /  '+title+' · toolbar density icon · sample data',13,'#ffffff',True)
    return im,d,mix,label,box,x,y,w


def service_frame(progress):
    im,d,mix,label,box,x,y,w=reference_canvas(progress,'Service Request Code Maintenance',['Utility Billing','Service Request Codes','Accounts','Service Requests','Meter Reading','Billing','Reports','Setup','Administration'])
    gap=mix(22,12);formw=mix(290,270);tablew=w-formw-gap;fx=x+tablew+gap
    box(x,y,tablew,730-y,'#ffffff','#dbe1e9',3);box(fx,y,formw,730-y,'#ffffff','#dbe1e9',3)
    label(x+14,y+16,'FILTERS   /   COLUMN OPTIONS',mix(12,10),'#596b87',True)
    head=y+mix(61,47);box(x+1,head,tablew-2,mix(37,29),'#f5f7fb')
    label(x+14,head+9,'Code',mix(13,11),'#596b87',True);label(x+125,head+9,'Description',mix(13,11),'#596b87',True)
    row=mix(49,29);start=head+mix(37,29)
    names=['Account review','Adjustment','Backflow inspection','Billing question','Check meter','Close account','Connection','Customer inquiry','Disconnect','Final bill','Leak inspection','Meter exchange','New service','Payment plan','Reconnect','Service change','Water quality','Work order']
    for i,name in enumerate(names):
        yy=start+i*row
        if yy+row>728:break
        if i==2:box(x+1,yy,tablew-2,row,'#dce5fa')
        label(x+14,yy+mix(14,8),f'SR-{i+101}',mix(14,11));label(x+125,yy+mix(14,8),name,mix(14,11),max_width=tablew-140)
        d.line((x+1,yy+row,x+tablew-1,yy+row),fill='#edf0f5')
    label(fx+14,y+16,'Edit Service Request Code',mix(17,14),bold=True,max_width=formw-26)
    fields=[('Code','SR-103'),('Description','Backflow inspection'),('Work order type','Inspection'),('Department','Utility services'),('Priority','Normal'),('Assigned group','Field team'),('Estimated duration','30 minutes')]
    row=mix(84,61)
    for i,(key,value) in enumerate(fields):
        yy=y+mix(68,54)+i*row
        if yy+48>678:break
        label(fx+14,yy,key,mix(12,10),'#758295');box(fx+14,yy+20,formw-28,mix(36,29),'#fbfcfe','#cbd5e1',3);label(fx+23,yy+mix(29,26),value,mix(13,11),max_width=formw-48)
    box(fx+formw-86,688,70,27,'#5467bd',radius=3);label(fx+formw-70,695,'SAVE',10,'#ffffff',True)
    return im


def account_frame(progress):
    im,d,mix,label,box,x,y,w=reference_canvas(progress,'Account Overview',['Utility Billing','Account Overview','Billing','Services','Usage','Activity','Documents','Payments'])
    gap=mix(24,14);left=w*.39;right=w-left-gap;rx=x+left+gap;h=mix(345,253)
    box(x,y,left,h,'#ffffff','#dbe1e9',4);box(rx,y,right,h,'#ffffff','#dbe1e9',4)
    label(x+16,y+16,'Account',mix(18,15),bold=True);box(x+16,y+mix(56,43),left-32,mix(60,42),'#e7ebfb',radius=3);label(x+30,y+mix(72,53),'DEMO-104',mix(26,21),'#455684',True)
    for i,(key,value) in enumerate([('Name','Demo household'),('Service address','100 Example Way'),('Account type','Residential'),('Service status','Active'),('Billing cycle','Monthly')]):
        yy=y+mix(138,104)+i*mix(34,25);label(x+16,yy,key,mix(11,10),'#758295');label(x+135,yy,value,mix(13,11),max_width=left-150)
    label(rx+16,y+16,'Billing',mix(18,15),bold=True);label(rx+16,y+mix(53,41),'Current balance',mix(13,11),'#758295');label(rx+16,y+mix(76,59),'$1,240.00',mix(33,26),bold=True)
    colors=['#b9e8eb','#f1d4d8','#e9e0b4','#cbd9a9','#c8d6ef','#e5d6ee']
    labels=['Water','Sewer','Electric','Refuse','Tax','Other'];cw=(right-48)/3;chipheight=mix(69,45)
    for i,(name,color) in enumerate(zip(labels,colors)):
        xx=rx+16+(i%3)*(cw+8);yy=y+mix(138,104)+(i//3)*(chipheight+10)
        box(xx,yy,cw,chipheight,color,radius=3);label(xx+9,yy+9,name,mix(13,11),bold=True,max_width=cw-16);label(xx+9,yy+mix(36,25),'$120.00',mix(17,13),max_width=cw-16)
    bottom=y+h+gap;bh=730-bottom
    box(x,bottom,left,bh,'#ffffff','#dbe1e9',4);box(rx,bottom,right,bh,'#ffffff','#dbe1e9',4)
    label(x+16,bottom+14,'Activity',mix(18,15),bold=True);label(rx+16,bottom+14,'Usage history',mix(18,15),bold=True)
    row=mix(54,32)
    for i,name in enumerate(['Statement generated','Payment received','Meter reading','Service updated','Document added','Balance updated','Reminder sent','Account review']):
        yy=bottom+mix(59,46)+i*row
        if yy+row>725:break
        label(x+16,yy,name,mix(13,11),max_width=left-90);label(x+left-60,yy,'Apr 12',mix(11,9),'#758295');d.line((x+12,yy+row-8,x+left-12,yy+row-8),fill='#edf0f5')
    chart_top=bottom+58;chart_bottom=713;chart_left=rx+38;chart_right=rx+right-20
    if chart_bottom-chart_top>70:
        for n in range(4):
            gy=chart_top+n*(chart_bottom-chart_top)/3;d.line((chart_left,gy,chart_right,gy),fill='#dfe7ee')
        series=[[.8,.6,.7,.4,.45,.2,.3],[.9,.85,.7,.75,.6,.55,.6],[.55,.5,.6,.35,.4,.25,.35]]
        for values,color in zip(series,['#6db2b1','#8e83c1','#d8a16b']):
            pts=[(chart_left+i*(chart_right-chart_left)/6,chart_top+v*(chart_bottom-chart_top)) for i,v in enumerate(values)];d.line(pts,fill=color,width=2)
        label(chart_left,chart_bottom+3,'Jan     Feb     Mar     Apr     May     Jun',9,'#758295',max_width=right-55)
    return im


def home_frame(progress):
    im,d,mix,label,box,x,y,w=reference_canvas(progress,'Human Resources Home',['Human Resources','Home','Tasks and approvals','Employees','Reports','Setup'])
    gap=mix(25,13);cardw=(w-gap)/2;h=mix(125,81)
    for xx,title,value in [(x,'Tasks and Approvals','0 approvals'),(x+cardw+gap,'Tasks','3 open tasks')]:
        box(xx,y,cardw,h,'#ffffff','#dbe1e9',4);label(xx+20,y+18,title,mix(20,16),bold=True);label(xx+20,y+mix(68,45),value,mix(26,20),'#4e6681')
    by=y+h+gap;box(x,by,w,730-by,'#ffffff','#dbe1e9',4);label(x+18,by+18,'General',mix(22,17),bold=True)
    items=['Employee Maintenance','Applicant Maintenance','Pay Codes','Benefits','Position Control','Payroll Processing','Time Entry','Reporting','Organization','Documents','Settings','Year-end tasks']
    tileh=mix(76,47);tw=(w-64)/3
    for i,name in enumerate(items):
        xx=x+16+(i%3)*(tw+16);yy=by+mix(79,58)+(i//3)*(tileh+mix(24,14))
        if yy+tileh>658:break
        box(xx,yy,tw,tileh,'#f8fafc','#e1e7ee',3);box(xx+12,yy+12,24,24,['#7ba98e','#89a8bc','#aaa0c4'][i%3],radius=4);label(xx+46,yy+mix(28,17),name,mix(14,11),max_width=tw-57)
    if progress>.3:
        yy=min(by+mix(420,344),675)
        label(x+18,yy,'My Tax Reports',mix(18,15),bold=True);label(x+18,yy+30,'W-2 report    ·    Employee tax summary    ·    Year-end review',mix(12,11),'#61758c',max_width=w-36)
    return im


def cirrus():
    screens={'employee':density_frame,'service':service_frame,'account':account_frame,'home':home_frame}
    frames=[];durations=[];endpoints=[]
    for name,render in screens.items():
        spacious=render(0);compact=render(1);endpoints += [spacious,compact]
        spacious.save(OUT/f'cirrus-compact-{name}-spacious.png');compact.save(OUT/f'cirrus-compact-{name}-compact.png')
        frames.append(spacious);durations.append(1600)
        for n in range(1,13):
            p=n/12;frames.append(render(p*p*(3-2*p)));durations.append(80)
        frames.append(compact);durations.append(2600)
    strip=Image.new('RGB',(1200,780*len(endpoints)))
    for index,im in enumerate(endpoints):strip.paste(im,(0,index*780))
    palette=strip.quantize(colors=256)
    indexed=[im.quantize(palette=palette,dither=Image.Dither.NONE) for im in frames]
    indexed[0].save(OUT/'cirrus-compact-all.gif',save_all=True,append_images=indexed[1:],duration=durations,disposal=1,optimize=True)
    print('Four-screen compact-mode concept:',sum(durations),'ms;',len(frames),'layout states')


if __name__=='__main__':
    framed();inbox();cirrus()
