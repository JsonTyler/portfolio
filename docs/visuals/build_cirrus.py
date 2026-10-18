"""Reference-layout mocks: supplied product images represent standard density.

Redraw their structure with synthetic data, then tighten the same structure.
No copied screenshot pixels, invented spacious layout, or production capture.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
OUT=Path(__file__).resolve().parents[2]/'public/projects'
FONT=Path('/usr/share/fonts/truetype/dejavu')

class Screen:
    def __init__(self,compact=False):
        self.compact=compact;self.im=Image.new('RGB',(1200,780),'#fafbfe');self.d=ImageDraw.Draw(self.im);self.top=42 if compact else 50;self.labels=[]
    def n(self,a,b):return b if self.compact else a
    def box(self,x,y,w,h,fill='#ffffff',stroke='#dfe5ed',radius=0):
        self.labels=[(bounds,label) for bounds,label in self.labels if not (x<=bounds[0] and y<=bounds[1] and x+w>=bounds[2] and y+h>=bounds[3])]
        self.d.rounded_rectangle((round(x),round(y),round(x+w),round(y+h)),radius=radius,fill=fill,outline=stroke)
    def text(self,x,y,value,size=12,color='#526075',bold=False,width=1180):
        f=ImageFont.truetype(str(FONT/('DejaVuSans-Bold.ttf' if bold else 'DejaVuSans.ttf')),round(size))
        limit=min(width,1192-x)
        while self.d.textlength(value,font=f)>limit:value=value[:-2]+'…'
        bounds=self.d.textbbox((round(x),round(y)),value,font=f)
        assert bounds[2]<=1196 and bounds[3]<=780,(value,bounds)
        self.labels.append((bounds,value))
        self.d.text((round(x),round(y)),value,font=f,fill=color)
    def line(self,x1,y1,x2,y2,color='#e1e7ee',width=1):self.d.line((x1,y1,x2,y2),fill=color,width=width)
    def icon(self,x,y):
        self.box(x-13,y-13,26,26,'#dce4f7' if self.compact else '#263f53',None,3)
        color='#5064a4' if self.compact else '#dce5ef'
        for sx,sy in [(-1,-1),(1,-1),(-1,1),(1,1)]:
            self.line(x+sx*8,y+sy*8,x+sx*3,y+sy*3,color,2)
            xx,yy=(x+sx*3,y+sy*3) if self.compact else (x+sx*8,y+sy*8)
            sign=1 if self.compact else -1
            self.line(xx,yy,xx+sx*4*sign,yy,color,2);self.line(xx,yy,xx,yy+sy*4*sign,color,2)
    def glyph(self,x,y,kind=0,color='#7787a2',size=16):
        # Draw real line icons instead of placeholder squares or font glyphs.
        d=self.d;u=size/16
        def ln(points):d.line([(x+a*u,y+b*u) for a,b in points],fill=color,width=max(1,round(u)))
        k=kind%7
        if k==0:
            d.ellipse((x+5*u,y,x+11*u,y+6*u),outline=color,width=1);ln([(2,15),(3,10),(8,8),(13,10),(14,15),(2,15)])
        elif k==1:
            ln([(1,4),(15,4),(15,13),(1,13),(1,4),(8,0),(15,4)]);ln([(4,7),(4,11)]);ln([(8,7),(8,11)]);ln([(12,7),(12,11)])
        elif k==2:
            d.ellipse((x+u,y+u,x+15*u,y+15*u),outline=color,width=1);ln([(8,3),(8,8),(12,10)])
        elif k==3:
            ln([(2,2),(14,2),(14,15),(2,15),(2,2)]);ln([(5,6),(11,6)]);ln([(5,9),(11,9)]);ln([(5,12),(9,12)])
        elif k==4:
            ln([(8,0),(14,3),(13,10),(8,15),(3,10),(2,3),(8,0)]);ln([(5,7),(7,10),(11,5)])
        elif k==5:
            ln([(1,7),(8,1),(15,7),(13,7),(13,15),(3,15),(3,7)]);ln([(6,15),(6,10),(10,10),(10,15)])
        else:
            ln([(1,4),(15,4),(15,13),(1,13),(1,4)]);d.ellipse((x+6*u,y+6*u,x+10*u,y+10*u),outline=color,width=1)

    def toolbar(self,white=False):
        self.box(0,0,1200,self.top,'#ffffff' if white else '#0c2034',None)
        fg='#43556b' if white else '#d2dce6'
        self.text(15,14,'☰',14,fg);self.text(48,12,'Springbrook',17,fg);self.text(208,16,'Demo Utility District',11,fg)
        self.icon(1068,self.top/2)
        for i,xx in enumerate([1117,1156,1183]):self.glyph(xx-7,self.top/2-7,i,fg,14)
    def footer(self,title):
        for i,(a,label) in enumerate(self.labels):
            for b,other in self.labels[i+1:]:
                if min(a[2],b[2])-max(a[0],b[0])>1 and min(a[3],b[3])-max(a[1],b[1])>1:
                    raise AssertionError(f'{title} text overlap: {label!r} / {other!r}: {a} / {b}')
        self.box(0,750,1200,30,'#112b40',None)
        self.text(16,758,('COMPACT' if self.compact else 'STANDARD')+'  /  '+title+' · sample data · toolbar density control',11,'#ffffff',True)
    def panel(self,x,y,w,h,title):
        self.text(x+2,y,title,self.n(13,12),'#3d4b60',True,width=w-4)
        self.box(x,y+24,w,h-24)
    def field(self,x,y,key,value,width=150):
        self.text(x,y,key,self.n(10,9),'#8793a4',width=width)
        self.text(x,y+self.n(15,13),value,self.n(12,11),'#536078',width=width)


def employee(compact):
    c=Screen(compact);c.toolbar();rail=c.n(84,70);page_y=c.top+10
    c.box(0,c.top,1200,10,'#e3e5e8',None);c.box(0,page_y,1200,c.n(42,34),'#ffffff',None)
    c.box(13,page_y+10,18,18,'#76a380',None,3);c.text(16,page_y+13,'PR',9,'#ffffff',True)
    c.text(47,page_y+10,'Employee Maintenance/General',c.n(20,18),'#354156',True)
    y=page_y+c.n(52,43);gap=c.n(14,10);x=rail+14;w=1200-x-14
    widths=[w*.29,w*.14,w*.20,w*.37-3*gap];xs=[x]
    for width in widths[:-1]:xs.append(xs[-1]+width+gap)
    height=c.n(318,248);base=y+24
    c.box(0,page_y+42,rail,698-page_y,'#f6f7fd',None)
    for i,name in enumerate(['General','Financial','Timecards','Timesheets','Taxes','Retirement','Deductions']):
        yy=y+5+i*c.n(80,66)
        if yy+40>738:break
        if i==0:c.box(0,yy-5,rail,65,'#ecebfc',None)
        c.glyph(rail/2-8,yy+5,i,['#8a80c0','#7baf94','#c6bc74'][i%3]);c.text(8,yy+33,name,c.n(10,9),width=rail-12)
    for xx,ww,title in zip(xs,widths,['Employee Information','Employee Position','Emergency Contact','Accruals']):
        if title!='Emergency Contact':c.panel(xx,y,ww,height,title)
    ex,ew=xs[0],widths[0]
    c.text(ex+12,base+12,'Jordan Demo (D104)',c.n(16,14),'#576ca5',width=ew-90)
    c.box(ex+ew-57,base+13,45,17,'#3b9565',None,8);c.text(ex+ew-50,base+16,'Active',9,'#ffffff')
    py=base+c.n(58,48);cx=ex+61
    c.d.ellipse((cx-39,py,cx+39,py+78),fill='#eef1f6',outline='#bdc9d8');c.d.ellipse((cx-12,py+12,cx+12,py+37),fill='#b8937b');c.d.ellipse((cx-27,py+38,cx+27,py+80),fill='#7891ab')
    c.text(cx-15,py+86,'EDIT',9,'#5a73ab',True)
    for i,(key,value) in enumerate([('Email','demo@example.test'),('Address 1','100 Example Way'),('Address 2','Suite 100')]):
        c.field(ex+123,py+i*c.n(45,37),key,value,ew-134)
    fy=py+c.n(150,108)
    for i,(key,value) in enumerate([('Home phone','(000) 000-0000'),('Cell phone','(000) 000-0000')]):c.field(ex+12,fy+i*c.n(44,30),key,value,ew*.49)
    for i,(key,value) in enumerate([('City / state','Example City'),('ZIP code','00000')]):c.field(ex+ew*.55,fy+i*c.n(44,30),key,value,ew*.42)
    for i,(key,value) in enumerate([('Supervisor','Demo Manager'),('Position','Analyst'),('Location','Main Office'),('Union','Not assigned'),('Pension','Yes')]):c.field(xs[1]+12,base+17+i*c.n(52,37),key,value,widths[1]-23)
    ch=c.n(178,132);c.panel(xs[2],y,widths[2],ch,'Emergency Contact')
    for i,(key,value) in enumerate([('Contact','Sample Contact'),('Phone','(000) 000-0000'),('Email','contact@example.test')]):c.field(xs[2]+12,base+17+i*c.n(45,32),key,value,widths[2]-22)
    tax_y=y+ch+10;c.panel(xs[2],tax_y,widths[2],height-ch-10,'Tax Status')
    c.field(xs[2]+12,tax_y+39,'Federal','M - Married',widths[2]-22);c.field(xs[2]+12,tax_y+c.n(85,80),'State','M - Married',widths[2]-22)
    ax,aw=xs[3],widths[3];item_h=(height-24)/2
    for i,name in enumerate(['Vacation','Sick leave']):
        yy=base+i*item_h
        for pos,key in [(12,'Code'),(91,'Description'),(aw-100,'Current balance')]:c.text(ax+pos,yy+10,key,9,'#8793a4',width=95)
        c.text(ax+12,yy+28,'⌄  comp'+str(i+1),11,width=80);c.text(ax+91,yy+28,name,11,width=aw-200);c.text(ax+aw-78,yy+28,'30.0000',11)
        for j,(key,value) in enumerate([('Date','04/12/2026'),('Accrued','8.0000'),('Used','0.0000')]):c.field(ax+14+j*(aw-24)/3,yy+c.n(64,55),key,value,(aw-35)/3)
        c.line(ax+8,yy+item_h-1,ax+aw-8,yy+item_h-1)
    by=y+height+c.n(16,10);left=w*.49;rx=x+left+gap;right=w-left-gap;bh=744-by
    c.panel(x,by,left,bh,'Pay History');c.panel(rx,by,right,bh,'Deductions/Benefits')
    ty=by+24;summary_h=c.n(44,36);details_h=c.n(170,120)
    for index in range(8):
        sy=ty if index==0 else ty+summary_h+details_h+(index-1)*summary_h
        if sy+summary_h>738:break
        c.box(x+8,sy+5,left-16,summary_h-8,'#f9fbfd','#e3e8ef')
        for offset,key,value in [(20,'Check date','04/12/2026'),(155,'Check #',str(123-index)),(248,'Hours','80.00'),(345,'Amount','$4,000.00')]:
            c.text(x+offset,sy+7,key,9,'#8a96a5',width=125);c.text(x+offset,sy+22,value,11,width=130)
    detail=ty+summary_h
    for col,(key,values) in enumerate([('Period Begin',['04/01/2026','Period End','04/12/2026']),('Federal Tax',['$1,009.44','FICA - SS','$108.40']),('State Tax',['$46.94','Medicare','$12.92'])]):
        xx=x+18+col*(left*.66)/3;c.text(xx,detail+14,key,9,'#8a96a5')
        for j,value in enumerate(values):c.text(xx,detail+34+j*c.n(27,22),value,11,'#5e6c81',width=left*.22-9)
    chartx=x+left*.85;charty=detail+details_h*.47;radius=c.n(46,38)
    for a,b,color in [(0,105,'#f4c57d'),(105,235,'#ef8b8e'),(235,360,'#6d8784')]:c.d.pieslice((chartx-radius,charty-radius,chartx+radius,charty+radius),a,b,fill=color)
    c.d.ellipse((chartx-radius*.58,charty-radius*.58,chartx+radius*.58,charty+radius*.58),fill='#ffffff')
    for off,key in [(14,'Type'),(right*.30,'Cycle'),(right*.43,'Description'),(right-83,'Amount')]:c.text(rx+off,ty+12,key,10,'#8a96a5',width=100)
    row=c.n(28,19)
    for i,name in enumerate(['Direct Deposit','Fed Income Tax','FICA Employee','FICA Employer','Medical','Retirement','Dental','Vision','Other Benefit','Insurance','HSA Contribution','Life Insurance','Pension','Union Dues','Transit','Savings','Supplemental']):
        yy=ty+36+i*row
        if yy+row>716:break
        c.text(rx+14,yy,name,11,width=right*.28-18);c.text(rx+right*.31,yy,str(i+1),11);c.text(rx+right*.43,yy,'Description',11);c.text(rx+right-83,yy,'100.00',11);c.line(rx+8,yy+row-3,rx+right-8,yy+row-3)
    c.text(rx+18,720,'‹    1    ›        25 items per page',10,'#72839d')
    c.footer('Employee Maintenance');return c.im


def service(compact):
    c=Screen(compact);top=c.n(38,32);side=c.n(162,145);c.top=top
    c.box(0,0,1200,top,'#ffffff',None);c.box(0,0,side,top,'#edf0f5',None);c.text(12,10,'Utility Billing',12,'#3f5064',True);c.text(side+24,10,'Service Request Code Maintenance',15,'#3d4b5b',True)
    c.icon(971,top/2);c.box(1003,7,180,24,'#6673cf',None,3);c.text(1015,13,'+ CREATE SERVICE REQUEST CODE',8,'#ffffff',True)
    c.box(0,top,side,712,'#f5f8fa',None)
    nav=['Customers','Meter Reading','Administration','Accounts','Account Types','Adjustment Types','Bill Types','Category','Class','Collection Status','Consumption Classes','Cycles','Deposit','Districts','Forms','Free Text','Groups','Locations','Misc Types','Periods','Routes','Service Request Codes','Service Types','Statements','Tax Groups','Work Groups']
    for i,name in enumerate(nav):
        yy=top+14+i*c.n(25,23)
        if yy+22>744:break
        if name=='Service Request Codes':c.box(5,yy-3,side-10,23,'#d9ddfa',None,3)
        c.glyph(9,yy+1,i,'#7a8994',11);c.text(28,yy,name,10,'#6a7b8e',name=='Service Request Codes',width=side-34)
    x=side+12;y=top+14;w=1200-x-12;form=c.n(260,250);gap=12;table=w-form-gap;fx=x+table+gap
    c.box(x,y,table,694);c.box(fx,y,form,694);c.text(x+14,y+14,'FILTERS     COLUMN OPTIONS     PER PAGE',10,'#7989aa');c.text(fx+14,y+14,'Edit Service Request Code',14,'#506075',width=form-22)
    head=y+c.n(55,45);c.text(x+14,head,'Request Code',10,'#8794a4');c.text(x+170,head,'Description',10,'#8794a4')
    names=['Account review','Adjustment','Amount correction','Application','Backflow inspection','Cancel request','Check meter','Close account','Connection','Customer inquiry','Disconnect','Final bill','Leak inspection','Meter exchange','New service','Payment plan','Reconnect','Service change','Water quality','Work order','Account transfer','Deposit review','Billing request','Meter repair','Inspection','Usage review','Field visit','Read request','Service inspection','Address update','Water pressure','Meter install','Transfer service','Close work order','Rate review','Leak adjustment','Usage alert']
    start=head+23;rh=c.n(23,18)
    for i,name in enumerate(names):
        yy=start+i*rh
        if yy+rh>709:break
        if i==4:c.box(x+1,yy-2,table-2,rh,'#dce0fc',None)
        c.text(x+14,yy,'SR'+str(100+i),11);c.text(x+170,yy,name.upper(),10,width=table-184);c.line(x+4,yy+rh-3,x+table-4,yy+rh-3,'#eef2f5')
    c.text(x+14,721,'‹   1   ›          25 items per page',10,'#7d8dad')
    fields=[('Request code','SR104'),('Description','Backflow inspection'),('Work order',''),('Type code',''),('Department','Utilities'),('Service class',''),('Service rate',''),('Status code','')]
    for i,(key,value) in enumerate(fields):
        yy=y+61+i*c.n(62,55)
        if yy+47>652:break
        c.text(fx+14,yy,key,10,'#8a96a7');c.box(fx+14,yy+18,form-28,30,'#ffffff','#bec9d7');c.text(fx+21,yy+26,value,11,width=form-43)
    c.text(fx+14,666,'☑  Emergency service',10);c.text(fx+14,690,'☑  Mark complete',10);c.text(fx+20,721,'CANCEL',9,'#8392a7');c.text(fx+form-48,721,'SAVE',9,'#6076b5',True)
    c.footer('Service Request Codes');return c.im


def account(compact):
    c=Screen(compact);c.top=c.n(44,38);c.toolbar(True);rail=c.n(72,62);x=rail+22;y=c.top+c.n(26,20);w=1200-x-20;gap=26;left=w*.42;rx=x+left+gap;right=w-left-gap
    c.box(0,0,1000,c.top,'#ffffff',None)
    c.text(22,13,'⌂  Account Overview',14,'#465467',True)
    c.box(0,c.top,rail,706,'#ffffff',None)
    for i,name in enumerate(['Account','Billing','Services','Usage','Activity','Documents','Payments','Notes']):
        yy=c.top+24+i*c.n(76,64);c.glyph(rail/2-7,yy-3,i,['#8382c2','#c6aa6f','#75a2a2'][i%3],14);c.text(8,yy+17,name,8,'#8391a2',width=rail-12)
    h=c.n(383,286)
    c.text(x,y,'Account',16,'#4e5c6c',True);c.text(rx,y,'Billing',16,'#4e5c6c',True)
    c.box(x+left*.22,y+39,left*.57,52,'#e7eafa',None,4);c.text(x+left*.26,y+50,'005100-104',24,'#526490')
    for i,(key,value) in enumerate([('Name','Demo Household'),('Service address','100 Example Way'),('Account status','Active'),('Account type','Residential'),('Billing cycle','Monthly'),('Current services','Water · Sewer · Electric')]):
        yy=y+c.n(118,105)+i*c.n(31,27);c.text(x+12,yy,key,10,'#7f8c9d');c.text(x+145,yy,value,11,width=left-160)
    c.text(rx+right-180,y,'MAKE A PAYMENT   ·   VIEW DETAILS',8,'#8b88bd',width=180)
    c.box(rx+right*.27,y+34,right*.47,57,'#e7eafa',None,3);c.text(rx+right*.31,y+45,'$1,240.00',27,'#44556b')
    colors=['#c5e6ef','#ecd4df','#ded9ee','#d6e4f1','#eee4bd','#d0e2c4','#e5c8b8','#ebd1af'];labels=['Water','Sewer','Electric','Refuse','Stormwater','Tax','Fees','Other'];amounts=['240','180','420','100','80','60','40','120'];cw=(right-24)/4
    for i,(label,color,amount) in enumerate(zip(labels,colors,amounts)):
        xx=rx+(i%4)*(cw+6);yy=y+c.n(111,104)+(i//4)*c.n(65,55)
        c.box(xx,yy,cw,c.n(58,48),color,None,3);c.text(xx+9,yy+8,label,10,'#65717b',width=cw-15);c.text(xx+9,yy+28,'$'+amount+'.00',15,'#4b5c68',width=cw-15)
    for i,(key,value,color) in enumerate([('Balance due','$1,240.00','#e7c9b1'),('Last payment','$140.00','#c6dece'),('Next reading','May 12','#d3daf0'),('Payment method','Direct debit','#e2d2e9')]):
        xx=rx+(i%2)*(right/2+4);yy=y+c.n(257,215)+(i//2)*c.n(40,34)
        c.box(xx,yy,right/2-6,27,color,None,13);c.text(xx+12,yy+8,key+'   '+value,10,'#667383',width=right/2-23)
    by=y+h+12;bh=744-by;c.line(x,by-9,1180,by-9)
    c.text(x,by,'Activity',15,'#4e5c6c',True);c.text(rx,by,'Usage history',15,'#4e5c6c',True)
    for col,title in enumerate(['Account Activity','Service Activity']):
        xx=x+col*(left/2);c.text(xx+8,by+37,title,11,'#77869c',True,width=left/2-16)
        for i,name in enumerate(['Account created','Service activated','Payment received','Meter reading','Document added','Account review','Balance updated','Notice generated']):
            yy=by+64+i*c.n(30,25)
            if yy+20>738:break
            c.text(xx+8,yy,name,10,'#7e89b7',width=left/2-60);c.text(xx+left/2-48,yy,'Apr 12',8,'#7d8da3')
    chart_left=rx+20;chart_right=1180;chart_top=by+58;chart_bottom=716
    for i in range(4):c.line(chart_left,chart_top+i*(chart_bottom-chart_top)/3,chart_right,chart_top+i*(chart_bottom-chart_top)/3)
    for vals,color in [([.8,.7,.75,.43,.49,.2,.3],'#6fa7b0'),([.9,.85,.7,.75,.6,.55,.6],'#9a7bb6'),([.55,.5,.6,.35,.4,.25,.35],'#80a787')]:
        pts=[(chart_left+i*(chart_right-chart_left)/6,chart_top+v*(chart_bottom-chart_top)) for i,v in enumerate(vals)];c.d.line(pts,fill=color,width=2)
    for i,month in enumerate(['Jan','Feb','Mar','Apr','May','Jun','Jul']):c.text(chart_left+i*(chart_right-chart_left)/6-6,721,month,8,'#7f8da2')
    c.footer('Account Overview');return c.im


def home(compact):
    c=Screen(compact);c.toolbar();side=c.n(302,270);gap=c.n(28,20);x=side+gap;w=1200-x-20;y=c.top+c.n(22,17)
    c.box(0,c.top,side,700,'#f7f9fd',None);c.box(0,c.top,side,37,'#e8edf7',None);c.text(14,c.top+12,'Human Resources',14,'#54677c',True);c.text(x,y,'HOME',11,'#9aa5b4')
    for i,name in enumerate(['⌂  Home','⌁  Recent','›  Employee Search','›  Reports']):c.text(20,c.top+65+i*c.n(30,26),name,11,'#6a7e95')
    yy=y+c.n(42,34);c.text(x,yy,'Tasks and Approvals',20,'#586575',True);top=yy+39;cw=(w-24)/2
    for xx,title in [(x,'Approvals'),(x+cw+24,'Tasks')]:
        c.box(xx,top,cw,c.n(86,70),'#ffffff','#e6ebf2',3);c.text(xx+16,top+14,title,12,'#798697');c.text(xx+16,top+39,'0',27,'#3f4c5a')
    gen=top+c.n(130,104);c.text(x,gen,'⌄  General',18,'#657487',True);items=['Employee Maintenance','Applicant Maintenance','Pay Codes','Employee Groups','Position Control','Payroll Processing','Time Entry','Reporting','Organization']
    tw=(w-24)/3;step=c.n(90,62)
    for i,name in enumerate(items):
        xx=x+(i%3)*(tw+8);ty=gen+54+(i//3)*step;c.glyph(xx+9,ty+2,i,['#96ac5f','#a3ad79','#b3bb72'][i%3],19);c.text(xx+40,ty+6,name,11,'#758397',width=tw-48)
    tax=gen+54+3*step+12;c.text(x,tax,'⌄  My Tax Reports',18,'#657487',True)
    for i,name in enumerate(['W-2 Report','Employee Tax Summary']):c.glyph(x+i*(tw+8)+9,tax+47,i+3,'#a8b271',19);c.text(x+i*(tw+8)+40,tax+51,name,11,width=tw-45)
    c.footer('Home');return c.im


def main():
    for name,render in [('employee',employee),('service',service),('account',account),('home',home)]:
        standard,compact=render(False),render(True)
        standard.save(OUT/f'cirrus-faithful-{name}-standard.png');compact.save(OUT/f'cirrus-faithful-{name}-compact.png')
        palette=Image.new('RGB',(1200,1560));palette.paste(standard);palette.paste(compact,(0,780));palette=palette.quantize(colors=256)
        first=standard.quantize(palette=palette,dither=Image.Dither.NONE);last=compact.quantize(palette=palette,dither=Image.Dither.NONE)
        first.save(OUT/f'cirrus-faithful-{name}.gif',save_all=True,append_images=[last],duration=[1600,2600],disposal=1)
    print('Four reference-layout mocks; standard is based on supplied screenshots. Per-view toggle GIFs: 4200ms, play once.')

if __name__=='__main__':main()
