'use client';

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import styles from './ProjectViewport.module.css';
import { previewGeometry } from '@/lib/preview-geometry';

export function ProjectViewport({ children, embedded = false }: { children: ReactNode; embedded?: boolean }) {
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [fullSize, setFullSize] = useState(false);
  const [zoom, setZoom] = useState<number | null>(null);
  const [fit, setFit] = useState({ scale: 1, height: 0, width: 720, available: 400 });

  useEffect(() => {
    const element = content.current;
    const container = stage.current;
    const host = embedded ? viewport.current?.querySelector<HTMLElement>('[data-preview-canvas]') : null;
    if (!element || !container) return;
    let frame = 0;
    const measure = () => {
      globalThis.cancelAnimationFrame(frame);
      frame = globalThis.requestAnimationFrame(() => {
        const height = element.offsetHeight;
        const width = host ? Math.max(1, host.clientWidth - 20) : element.offsetWidth;
        const detail = container.closest('.case-visual');
        const top = detail ? container.getBoundingClientRect().top + globalThis.scrollY : 80;
        const available = host ? Math.max(1, host.clientHeight - 20) : Math.max(240, globalThis.innerHeight - top - 64);
        const widthScale = host ? Math.max(1, host.clientWidth - 20) / width : 1;
        const scale = (!embedded && globalThis.innerWidth < 768) || !height ? 1 : Math.min(1, available / height, widthScale);
        setFit(previous => {
          const nextScale = embedded && zoom !== null ? previous.scale : scale;
          return previous.scale === nextScale && previous.height === height && previous.width === width && previous.available === available ? previous : { scale: nextScale, height, width, available };
        });
      });
    };
    const observer = new globalThis.ResizeObserver(measure);
    observer.observe(element);
    if (host) observer.observe(host);
    globalThis.addEventListener('resize', measure);
    measure();
    return () => {
      observer.disconnect();
      globalThis.removeEventListener('resize', measure);
      globalThis.cancelAnimationFrame(frame);
    };
  }, [embedded, zoom]);

  const scale = embedded ? zoom ?? fit.scale : fullSize ? 1 : fit.scale;
  const geometry = previewGeometry(fit.width, fit.available, fit.height, scale, embedded && zoom !== null);
  if (embedded) return <div ref={viewport} className={styles.viewport} data-ready={fit.height > 0} data-embedded data-project-viewport data-fitted={zoom === null}>
    <div className={styles.canvas} data-preview-canvas tabIndex={0} aria-label="Interactive project preview. Zoom out to expand the workspace; zoom in for larger controls.">
      <div ref={stage} className={styles.scaledSurface} style={{ width: geometry.surfaceWidth, height: geometry.surfaceHeight }}>
        <div ref={content} className={styles.embeddedContent} style={{ width: geometry.layoutWidth, transform: `scale(${scale})`, '--embedded-preview-height': `${geometry.layoutHeight}px` } as CSSProperties}>{children}</div>
      </div>
    </div>
    <div className={styles.zoomControls} role="group" aria-label="Preview zoom">
      <button type="button" onClick={() => setZoom(Math.max(.15, scale - .15))} disabled={scale <= .15} aria-label="Zoom out">−</button>
      <output aria-live="polite" aria-label="Zoom level">{Math.round(scale * 100)}%</output>
      <button type="button" onClick={() => setZoom(Math.min(2, scale + .15))} disabled={scale >= 2} aria-label="Zoom in">+</button>
      <span className={styles.zoomDivider}/>
      <button type="button" onClick={() => setZoom(null)} aria-pressed={zoom === null}>Fit</button>
      <button type="button" onClick={() => setZoom(1)} aria-pressed={zoom === 1}>100%</button>
    </div>
  </div>;

  return <div ref={viewport} className={styles.viewport} data-project-viewport data-fitted={scale < 1}>
    <div ref={stage} className={styles.stage} style={scale < 1 ? { height: fit.height * scale } : undefined}>
      <div ref={content} className={styles.content} style={scale < 1 ? { position: 'absolute', transform: `scale(${scale})` } : undefined}>{children}</div>
    </div>
    {fit.scale < 1 && <div className={styles.controls}><button type="button" className="focus-ring" aria-pressed={fullSize} onClick={() => setFullSize(value => !value)}>{fullSize ? 'Fit to screen' : 'Full size'}</button></div>}
  </div>;
}
