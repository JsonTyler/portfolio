/* Original canvas edit and Web Audio score. No stock media, network or runtime dependency. */
async ({ frames, mascot, puzzled, product, accent, captions }) => {
  const width = 1280, height = 800, intro = 2.2, scene = 4, outro = 2.2;
  const duration = 22;
  const load = src => new Promise((resolve,reject) => {const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src;});
  const brain=await load(mascot), curious=await load(puzzled);
  const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;document.body.replaceChildren(canvas);document.body.style.margin='0';
  const c=canvas.getContext('2d'), ink='#213f2c',cream='#faf3e5',sage='#c2caaa',peach='#f3b295';
  const clamp=v=>Math.min(1,Math.max(0,v)),ease=v=>1-Math.pow(1-clamp(v),3),mix=(a,b,v)=>a+(b-a)*v;
  const label=(v,x,y,size=58,color=ink)=>{c.font=`600 ${size}px Georgia,serif`;c.fillStyle=color;c.fillText(v,x,y);};
  function box(x,y,w,h,color=cream,r=18){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
  function character(x,y,w,t,thinking=false){c.save();c.translate(x+w/2,y+w*.8);c.rotate(Math.sin(t*2)*.025);const pulse=1+Math.sin(t*3)*.012;c.scale(pulse,1/pulse);c.drawImage(thinking?curious:brain,-w/2,-w*.8,w,w*.84);c.restore();}
  function paper(x,y,w,angle=0,kind='mail',color=cream){c.save();c.translate(x,y);c.rotate(angle);c.shadowColor='#213f2c25';c.shadowBlur=18;c.shadowOffsetY=8;box(-w/2,-w*.32,w,w*.64,color,12);c.shadowColor='transparent';c.strokeStyle=ink;c.lineWidth=3;if(kind==='mail'){c.beginPath();c.moveTo(-w*.44,-w*.24);c.lineTo(0,w*.04);c.lineTo(w*.44,-w*.24);c.stroke();}else{c.fillStyle=kind==='photo'?sage:peach;c.fillRect(-w*.38,-w*.2,w*.2,w*.15);for(let i=0;i<3;i++){c.strokeStyle='#6d8062';c.lineWidth=5;c.beginPath();c.moveTo(-w*.1,-w*.15+i*19);c.lineTo(w*.33,-w*.15+i*19);c.stroke();}}c.restore();}
  function folder(x,y,name,t,color=sage){box(x,y,210,145,color,16);box(x+8,y-23,94,36,color,10);c.strokeStyle=ink;c.lineWidth=2;c.strokeRect(x+15,y+14,180,112);label(name,x+23,y+91,31);}
  function tap(x,y,t){if(t<0||t>1)return;c.strokeStyle=`rgba(211,139,94,${1-t})`;c.lineWidth=6;c.beginPath();c.arc(x,y,20+t*58,0,Math.PI*2);c.stroke();}
  const isFile=product.startsWith('File');
  function background(t,dark=false){c.fillStyle=dark?ink:cream;c.fillRect(0,0,width,height);c.fillStyle=dark?'#ffffff05':'#6d805008';for(let x=20;x<width;x+=40)for(let y=20;y<height;y+=40)c.fillRect(x,y,2,2);c.strokeStyle=dark?'#ffffff16':'#72855c28';c.lineWidth=2;c.beginPath();c.moveTo(-80,650);c.bezierCurveTo(320,430,630,910,1390,420);c.stroke();c.font='600 16px system-ui';c.fillStyle=dark?'#dce3ce':'#6d8062';c.fillText(`${product.toUpperCase()}  /  ANIMATED CONCEPT`,54,48);c.fillText('Fictional data · @AsILeftIt',54,765);}
  function draw(t){
    const act=t<4?0:t<8?1:t<13?2:t<17?3:4;
    const local=t-[0,4,8,13,17][act];background(t,act===2);
    if(act===0){
      label(isFile?'Downloads. Again.':'It keeps piling up.',66,151,76);
      character(448,300,390,t,true);
      for(let i=0;i<11;i++){const side=i%2?-1:1;const progress=ease((local-i*.14)/1.4);const x=mix(640+side*850,640+side*(240+(i%3)*70),progress);const y=mix(-250,330+(i%4)*83,progress);paper(x,y,155+(i%3)*18,side*(.12+i*.016)+Math.sin(t+i)*.025,isFile?(i%2?'doc':'photo'):'mail',i%3?sage:cream);}
    } else if(act===1){
      label(isFile?'A place for each thing.':'Keep what matters.',66,151,70);
      character(65,325,360,t);
      for(let i=0;i<3;i++)folder(495+i*240,505,isFile?['Photos','Documents','Review'][i]:['Keep','Review','Later'][i],t,i===0?peach:sage);
      for(let i=0;i<6;i++){const f=ease((local-i*.32)/1.8),target=i%3;paper(mix(420+i*95,600+target*240,f),mix(280,480,f)-Math.sin(f*Math.PI)*100,105,mix((i-3)*.2,0,f),isFile?'photo':'mail',cream);}
    } else if(act===2){
      label(isFile?'Preview. Then move.':'One small decision.',66,151,72,cream);
      character(20,340,355,t);
      const progress=ease(local/1.0);c.save();c.translate(0,(1-progress)*80);c.globalAlpha=progress;box(470,235,715,390,cream);label(isFile?'photo.jpg':'An important receipt',510,318,45);label(isFile?'Suggested: Photos':'Keep this one?',510,378,31,'#6d8062');box(510,465,250,83,sage);label(isFile?'Move sample':'Keep',540,520,35);label('You choose.',803,520,29);c.restore();
      const hit=clamp((local-1.5)/1.0),px=mix(1100,643,ease(hit)),py=mix(660,505,ease(hit));c.fillStyle=peach;c.strokeStyle=ink;c.lineWidth=3;c.beginPath();c.moveTo(px,py);c.lineTo(px+4,py+42);c.lineTo(px+18,py+29);c.lineTo(px+36,py+28);c.closePath();c.fill();c.stroke();tap(640,505,(local-2.6)/.9);
      if(local>3.2){const f=ease((local-3.2)/1.2);paper(mix(850,1090,f),mix(408,650,f)-Math.sin(f*Math.PI)*170,165,-f*.2,isFile?'photo':'mail',sage);}
    } else if(act===3){
      label('Changed your mind?',66,151,72);character(100,340,345,t,true);
      folder(905,510,isFile?'Photos':'Keep',t);box(710,251,270,90,sage);label('↶  Undo',747,309,41);tap(850,300,(local-.55)/.8);
      const f=ease((local-.7)/2.0);paper(mix(1010,625,f),mix(480,390,f)-Math.sin(f*Math.PI)*130,190,mix(-.1,.08,f),isFile?'photo':'mail');
      if(local>2.6)label('Back in your hands.',555,675,36,'#6d8062');
    } else {
      label(product,70,208,91);label('Room for the next thing.',74,293,47,'#627750');
      character(780,210,440,t);for(let i=0;i<3;i++){const f=ease((local-i*.18)/1.1);paper(mix(-120,195+i*173,f),485,135,0,isFile?'doc':'mail',i===1?peach:sage);}
      label('Explore the mock-data concept.',76,661,36);c.font='500 25px system-ui';c.fillStyle=ink;c.fillText('tools.datadustr.com',78,709);
    }
    if(act===0){box(40,76,1140,112,cream,12);label(isFile?'Downloads. Again.':'It keeps piling up.',66,151,76);}
    // A short paper-colored transition gives each new beat breathing room.
    if(act>0&&local<.16){c.globalAlpha=1-local/.16;c.fillStyle=cream;c.fillRect(0,70,width,660);c.globalAlpha=1;}
  }
  draw(1.6); const poster = canvas.toDataURL('image/jpeg', .9);
  const audio = new AudioContext({ sampleRate: 48000 }); await audio.resume();
  const destination = audio.createMediaStreamDestination();
  const master = audio.createGain(); master.gain.value = 1.4;
  const compressor = audio.createDynamicsCompressor(); compressor.threshold.value = -12; compressor.ratio.value = 3; master.connect(compressor); const output=audio.createGain();output.gain.value=2.5;compressor.connect(output);output.connect(destination);
  const stream = canvas.captureStream(24); destination.stream.getAudioTracks().forEach(track => stream.addTrack(track));
  if (stream.getAudioTracks().length !== 1) throw new Error('Missing score audio track');
  const type = 'video/webm;codecs=vp8,opus';
  if (!MediaRecorder.isTypeSupported(type)) throw new Error('VP8/Opus recording unavailable');
  const recorder = new MediaRecorder(stream, { mimeType: type, videoBitsPerSecond: 4500000, audioBitsPerSecond: 96000 });
  const chunks = []; recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
  const ended = new Promise(resolve => recorder.onstop = resolve); recorder.start(1000);
  const start = audio.currentTime + .08, beat = 60 / 104;
  function note(freq, at, length, level, type = 'sine', pan = 0) {
    const osc = audio.createOscillator(), gain = audio.createGain(), stereo = audio.createStereoPanner(); osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(.00001, start + at); gain.gain.exponentialRampToValueAtTime(level, start + at + .018); gain.gain.exponentialRampToValueAtTime(.00001, start + at + length);
    stereo.pan.value = pan; osc.connect(gain); gain.connect(stereo); stereo.connect(master); osc.start(start + at); osc.stop(start + at + length + .03);
  }
  // Original 104 BPM score: warm minor-seventh chords, plucked arpeggio and a soft pulse.
  const chords = [[220, 261.626, 329.628, 391.995], [174.614, 220, 261.626, 329.628], [195.998, 246.942, 293.665, 369.994], [164.814, 195.998, 246.942, 293.665]];
  for (let at = 0, step = 0; at < duration - .8; at += beat / 2, step++) {
    const chord = chords[Math.floor(step / 16) % chords.length];
    note(chord[step % 4] * (step % 8 > 3 ? 2 : 1), at, .52, .11, 'sine', step % 2 ? .28 : -.28);
    if (step % 4 === 0) note(chord[0] / 2, at, .65, .18, 'sine');
    if (step % 16 === 0) chord.forEach((freq, i) => note(freq / 2, at + i * .012, 3.5, .04, 'triangle', (i - 1.5) * .2));
    if (step % 2 === 0) { const kick = audio.createOscillator(), envelope = audio.createGain(); kick.frequency.setValueAtTime(100, start + at); kick.frequency.exponentialRampToValueAtTime(38, start + at + .12); envelope.gain.setValueAtTime(.09, start + at); envelope.gain.exponentialRampToValueAtTime(.00001, start + at + .18); kick.connect(envelope); envelope.connect(master); kick.start(start + at); kick.stop(start + at + .2); }
  }
  for (let i = 0; i <= frames.length; i++) { const at = intro + i * scene; if (at < duration) { note(880, at, .26, .045, 'sine', -.2); note(1318.51, at + .08, .3, .03, 'sine', .2); } }
  master.gain.setValueAtTime(1.4, start + duration - 1); master.gain.linearRampToValueAtTime(.00001, start + duration);
  await new Promise(resolve => { const begin = performance.now(); function frame(now) { const t = (now - begin) / 1000; draw(Math.min(t, duration - .001)); if (t < duration) requestAnimationFrame(frame); else resolve(); } requestAnimationFrame(frame); });
  recorder.stop(); await ended; stream.getTracks().forEach(track => track.stop()); await audio.close();
  const blob = new Blob(chunks, { type });
  const video = await new Promise(resolve => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsDataURL(blob); });
  const decoder=new OfflineAudioContext(2,48000,48000);const decoded=await decoder.decodeAudioData(await blob.arrayBuffer());let squares=0,peak=0;const pcm=decoded.getChannelData(0);for(let i=0;i<pcm.length;i++){squares+=pcm[i]*pcm[i];peak=Math.max(peak,Math.abs(pcm[i]));}const rms=Math.sqrt(squares/pcm.length);if(rms<.025)throw new Error('Exported soundtrack too quiet: '+rms);
  return { video, poster, duration, audioTracks: 1, decodedRms:rms, decodedPeak:peak };
}
