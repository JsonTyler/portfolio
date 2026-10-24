'use client';
import { useRef, useState, type ComponentRef } from 'react';
import styles from './TrailerPlayer.module.css';
export function TrailerPlayer({ id, title }: { id: string; title: string }) {
  const player=useRef<ComponentRef<'video'>>(null);
  const [started,setStarted]=useState(false);
  const [error,setError]=useState('');
  async function play() {
    if(!player.current)return;
    player.current.muted=false;player.current.volume=1;
    try { await player.current.play();setStarted(true);setError(''); }
    catch { setError('Playback could not start. Use the video controls to try again.');setStarted(true); }
  }
  return <div className={styles.player}>
    <video ref={player} controls={started} playsInline preload="none" poster={`/projects/${id}-dustr-trailer-poster.jpg?v=plush-story-2`} aria-label={`${title} animated concept story`} onPlay={()=>setStarted(true)}>
      <source src={`/projects/${id}-dustr-trailer.webm?v=plush-story-2`} type="video/webm" />
      <track kind="captions" src={`/projects/${id}-dustr-trailer.vtt?v=plush-story-2`} srcLang="en" label="English" />
      Read the transcript below if your browser cannot play this video.
    </video>
    {!started && <button className={`${styles.play} focus-ring`} type="button" onClick={play} aria-label={`Play ${title} trailer with sound`}>▶ Play with sound</button>}
    {error && <p role="status">{error}</p>}
  </div>;
}
