'use client';
import { useState } from 'react';
import styles from './AboutStory.module.css';
const details = {
  desk: 'Curious about the code. Particular about the details.',
  travel: 'New places, from the truck camper to trips abroad.',
  people: 'Good company, wherever the road takes us.',
  portrait: 'An engineer with a designer’s eye.',
  plant: 'A small detail makes a space feel like home.',
  cup: 'A pause between ideas.',
  mountains: 'Curiosity travels well.',
  tabby: 'The striped tabby.',
  siamese: 'The little Siamese.',
  fluffy: 'The fluffy dark cat, with a lioness’s mane.',
};
type Detail = keyof typeof details;
function Cat({ x, y, kind }: { x: number; y: number; kind: 'tabby' | 'siamese' | 'fluffy' }) {
  const siamese = kind === 'siamese', fluffy = kind === 'fluffy';
  const coat = siamese ? '#8b795e' : fluffy ? '#37302f' : '#918b76';
  const dark = siamese ? '#4f392d' : fluffy ? '#252729' : '#343b32';
  return <g transform={`translate(${x} ${y}) scale(${siamese ? .85 : 1.1})`} className={styles.cat} data-kind={kind}>
    <ellipse cx="0" cy="35" rx="32" ry="5" fill="#172a2d" opacity=".6"/>
    <path className={styles.tail} d="M-17 28C-53 41-57 9-43-1" fill="none" stroke={coat} strokeWidth={fluffy ? 13 : 8} strokeLinecap="round"/>
    <path d={fluffy ? 'M-24 31Q-30 26-25 19L-29 14-23 7-25 1-15-5Q0-16 15-5L25 1 23 7 29 14 25 19Q30 26 24 31Z' : 'M-21 30Q-25 16-14-5Q0-15 14-5Q25 16 21 30Z'} fill={coat}/>
    {siamese && <path d="M-12-1Q0 7 12-1L8 24H-8Z" fill="#e2ded0"/>}
    {fluffy && <path d="M-21 0L-16-12-7-9 0-17 8-9 19-12 23 0 14 13 0 19-14 13Z" fill="#59443a"/>}
    <g className={styles.catHead}>
      <path d="M-17-15L-19-34-7-27Q0-30 7-27L19-34 17-15Q16 1 0 5Q-16 1-17-15Z" fill={siamese ? dark : coat}/>
      <path d="M-15-28l6 5-6 2M15-28l-6 5 6 2" fill="#9e7f7a"/>
      {kind === 'tabby' && <path d="M-10-1Q0 4 10-1L6 7H-6Z" fill="#c9c5af"/>}
      {kind === 'tabby' && <g stroke={dark} strokeWidth="3" fill="none"><path d="M-10-26l5 10 5-7 5 7 5-10M-17-17l9 3M17-17l-9 3M-17-9l7 4M17-9l-7 4"/></g>}
      <ellipse cx="-8" cy="-12" rx="4" ry="3" fill={siamese ? '#9fc6d0' : '#c7cf70'}/><ellipse cx="8" cy="-12" rx="4" ry="3" fill={siamese ? '#9fc6d0' : '#c7cf70'}/>
      <path d="M-8-14v4M8-14v4" stroke="#1e292a" strokeWidth="2"/>
      <ellipse cx="-4" cy="-3" rx="5" ry="4" fill={siamese ? '#80644f' : fluffy ? '#595052' : '#d0c7aa'}/><ellipse cx="4" cy="-3" rx="5" ry="4" fill={siamese ? '#80644f' : fluffy ? '#595052' : '#d0c7aa'}/>
      <path d="M-3-6h6L0-2Z" fill="#aa8482"/><path d="M0-2v4m-9-4-17-3m17 7-17 1m35-5 17-3m-17 7 17 1" stroke="#b6b8b0" strokeWidth=".8"/>
    </g>
    {kind === 'tabby' && <g fill="none" stroke={dark} strokeWidth="4"><path d="M-19 5l11 6M19 5l-11 6M-22 15l13 4M22 15l-13 4M-22 25l12 2M22 25l-12 2"/></g>}
    <path d="M-12 21v12M12 21v12" stroke={siamese ? dark : coat} strokeWidth="10" strokeLinecap="round"/>
    {siamese && <path d="M-12 28v5M12 28v5" stroke="#e2ded0" strokeWidth="10" strokeLinecap="round"/>}
    <path d="M-15 34h6M9 34h6" stroke={dark} strokeWidth="1"/>
  </g>;
}
export function AboutStory() {
  const [active, setActive] = useState<Detail | null>(null);
  const hotspots: { key: Detail; label: string; left: number; top: number; width: number; height: number }[] = [
    { key: 'desk', label: 'Explore the interface on the monitor', left: 34, top: 30, width: 32, height: 34 },
    { key: 'travel', label: 'Explore travel and the truck camper', left: 61, top: 33, width: 26, height: 21 },
    { key: 'people', label: 'Meet Jason and his girlfriend', left: 76, top: 40, width: 11, height: 52 },
    { key: 'portrait', label: 'Meet Jason', left: 18, top: 38, width: 13, height: 23 },
    { key: 'plant', label: 'Explore the plant on the shelf', left: 15, top: 43, width: 7, height: 13 },
    { key: 'cup', label: 'Explore the cup on the desk', left: 65, top: 61, width: 7, height: 9 },
    { key: 'mountains', label: 'Explore the mountain view', left: 55, top: 8, width: 39, height: 24 },
    { key: 'tabby', label: 'Meet the striped tabby', left: 32, top: 77, width: 10, height: 16 },
    { key: 'siamese', label: 'Meet the small Siamese', left: 44, top: 80, width: 10, height: 14 },
    { key: 'fluffy', label: 'Meet the fluffy dark cat', left: 55, top: 77, width: 11, height: 16 },
  ];
  return <section className={styles.story} aria-label="An illustrated profile of Jason" data-active={active ?? 'idle'} onPointerLeave={() => setActive(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }} onKeyDown={event => { if (event.key === 'Escape') setActive(null); }}>
    <div className={styles.canvas}>
    <svg className={styles.scene} viewBox="0 0 900 600" role="img" aria-label="Jason, with a blue cap, dark beard and smile, shares a workspace with his curly-haired girlfriend and three cats: a striped tabby, a small Siamese with a white chest and paws, and a fluffy dark cat. A red truck camper and mountains are outside the window.">
      <rect width="900" height="600" rx="18" fill="#172a31"/>
      <path d="M0 437H900V600H0Z" fill="#23363b"/>
      <rect x="492" y="48" width="352" height="279" rx="8" fill="#8baeb7"/>
      <circle className={styles.sun} cx="772" cy="103" r="30" fill="#f3d5a2"/>
      <g className={styles.mountains}>
      <path d="M492 232L580 110 683 229 765 158 844 231V327H492Z" fill="#567779"/>
      <path d="M550 151l30-41 33 47-30-12-13 13Z" fill="#d7e1dc"/>
      </g>
      <path d="M492 278Q625 206 844 269V327H492Z" fill="#3f625c"/>
      <g className={styles.camper}>
        <path d="M564 274h111v-33h51l31 33v25H564Z" fill="#8f3e42"/>
        <path d="M686 248h35l22 24h-57Z" fill="#253f4a"/>
        <path d="M563 217h117v61H563ZM563 204h159v24h-42v-11H563Z" fill="#e6e1cf"/>
        <rect x="580" y="231" width="39" height="25" rx="2" fill="#2d4854"/>
        <path d="M636 235h28v43h-28Z" fill="#c7c4b4"/>
        {[590, 727].map(x => <g key={x}><circle cx={x} cy="299" r="14" fill="#16252e"/><circle cx={x} cy="299" r="7" fill="#9fa9a6"/></g>)}
      </g>
      <path d="M492 48H844V327H492ZM668 48V327" fill="none" stroke="#304b50" strokeWidth="12"/>
      <path d="M59 76h84M59 89h52" stroke="#72928e" strokeWidth="4"/>
      <text x="59" y="123" fill="#a5c0b8" fontSize="11" fontFamily="monospace" letterSpacing="3">STAY CURIOUS</text>
      <rect x="58" y="168" width="145" height="116" rx="4" fill="#29434a" stroke="#526b6b"/>
      <path d="M76 247l26-39 26 18 30-34 28 49" stroke="#7fa49a" strokeWidth="2" fill="none"/>
      <circle cx="128" cy="226" r="4" fill="#e4c795"/>
      <path d="M57 337h146" stroke="#bdac8c" strokeWidth="8"/>

      <path d="M154 332l-9-24h40l-8 24Z" fill="#bda17b"/><path className={styles.leaves} d="M164 307q-27-27-8-44 13 14 8 44m1-1q1-34 20-34 6 24-20 34" fill="#80a48b"/>
      <rect x="307" y="180" width="285" height="195" rx="9" fill="#111d25" stroke="#627a7c" strokeWidth="3"/>
      <rect x="319" y="193" width="261" height="166" rx="3" fill="#eaf0ed"/>
      <path d="M319 216h261" stroke="#cbd8d3"/>
      {[332,343,354].map(x => <circle key={x} cx={x} cy="204" r="3" fill="#92a6a0"/>)}
      <g className={styles.code} fill="none" strokeWidth="5" strokeLinecap="round">
        <path d="M338 239h42m10 0h61M348 257h70m11 0h35M348 275h35m10 0h82M338 293h40m10 0h49M338 320h66" stroke="#4d777c"/>
      </g>
      <g className={styles.interface}>
        <rect x="331" y="229" width="56" height="118" rx="3" fill="#d2dfd8"/>
        <path d="M343 246h29m-29 18h21m-21 18h25m-25 18h19" stroke="#8ba59b" strokeWidth="4"/>
        <rect x="400" y="230" width="163" height="26" rx="4" fill="#385c62"/>
        <rect x="400" y="265" width="76" height="52" rx="4" fill="#b9cfbd"/><rect x="485" y="265" width="78" height="52" rx="4" fill="#d9c7a8"/>
        <path d="M402 331h158m-158 9h109" stroke="#a5b7af" strokeWidth="4"/>
      </g>
      <g className={styles.guides} fill="none" stroke="#c58167" strokeWidth="1" strokeDasharray="3 3"><path d="M394 223v126M480 260v65M325 260h244"/></g>
      <path d="M431 376v32h-38m38 0h63" fill="none" stroke="#819792" strokeWidth="8"/>
      <path d="M256 411h395l28 16H243Z" fill="#c3ad8c"/><path d="M263 427v113m372-113v113" stroke="#8f816e" strokeWidth="11"/>
      <path d="M396 400h117l15 10H385Z" fill="#7d9690"/><ellipse cx="551" cy="405" rx="10" ry="6" fill="#b3c5bb"/>
      <g className={styles.cup}>
      <path className={styles.steam} d="M603 370q-6-7 0-13t0-13m10 26q-6-7 0-13t0-13" fill="none" stroke="#c8d9cf" strokeWidth="2" strokeLinecap="round"/>
      <rect x="598" y="378" width="22" height="29" rx="4" fill="#d9b388"/><path d="M619 383q19-1 7 17h-7" stroke="#d9b388" strokeWidth="4" fill="none"/>
      </g>
      <g className={styles.person}>
        <rect x="155" y="358" width="63" height="87" rx="16" fill="#102028"/>
        <path d="M155 435h105v14H155ZM191 448h12v80h-12ZM160 532h75v7h-75Z" fill="#102028"/>
        <circle cx="164" cy="541" r="6" fill="#102028"/><circle cx="231" cy="541" r="6" fill="#102028"/>
        <path d="M180 429Q211 429 252 448Q264 452 261 464L251 529H228L230 476 179 461Z" fill="#647780"/>
        <path d="M205 431Q249 430 284 449Q297 455 293 469L282 532H258L263 476 205 463Z" fill="#859198"/>
        <path d="M228 525h24l14 11q3 6-4 7h-38Z" fill="#17272f"/>
        <path d="M258 528h24l17 10q5 8-4 9h-41Z" fill="#17272f"/>
        <path d="M228 539h35v4h-39Zm26 4h44v4h-44Z" fill="#4a5e65"/>
        <path d="M176 348q37-24 70 0l20 89q-45 20-94-1Z" fill="#292f36"/>
        <path d="M196 342Q213 354 234 341l-2 96h-36Z" fill="#3b7777"/>
        <path d="M195 341l17 24 22-24-5-10q-20 11-31 0Z" fill="#4c8a85"/>
        <path d="M194 346l-9 20 9 11-7 58M235 345l12 23-12 9 8 59" fill="none" stroke="#647077" strokeWidth="2"/>
        <path d="M204 357v34m20-34v34" stroke="#aac2b8" strokeWidth="2"/>
        <g>
          <path d="M175 350Q164 350 165 366L164 410Q164 423 176 427L200 434 206 421 184 412 187 365Q187 352 175 350Z" fill="#303942"/>
          <path d="M198 420l9 3-5 12-10-4Z" fill="#242e35"/>
          <path d="M204 424l9 1 12 6q3 4-1 5l-14-4-9-3Z" fill="#d7ad94"/>
          <path d="M213 429l9 4" fill="none" stroke="#b88773" strokeWidth="1.2" strokeLinecap="round"/>
        </g>
        <g>
          <path d="M235 350Q246 345 253 358L271 393Q275 399 284 399H340L341 414 281 416Q263 416 254 402L229 371Q220 356 235 350Z" fill="#303942"/>
          <path d="M254 397q10 8 18-1" fill="none" stroke="#52616a" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M336 399h11v15h-11Z" fill="#242e35"/>
          <path d="M347 401q8-3 15 0l14 4q4 3 0 5l-13-2-9 4h-7Z" fill="#d7ad94"/>
          <path d="M360 403l13 4m-11 1 10 1" fill="none" stroke="#b88773" strokeWidth="1.1" strokeLinecap="round"/>
        </g>
        <g className={styles.jasonHead}>
          <path d="M201 324v23q13 12 27 0v-27Z" fill="#c7957e"/>
          <ellipse cx="182" cy="291" rx="8" ry="12" fill="#d7ad94"/><ellipse cx="248" cy="291" rx="7" ry="12" fill="#d7ad94"/>
          <path d="M183 275Q183 247 213 246Q246 246 248 276L245 308Q238 335 215 337Q190 334 185 310Z" fill="#dfb49b"/>
          <path d="M183 287l6 3 3 18q7 5 13 0l10-5 11 5 14-8 6-14-1 25q-5 26-29 29-24-3-30-28Z" fill="#42312e"/>
          <path d="M198 310q17 15 33-1-14 25-33 1Z" fill="#f3e7d8"/>
          <path d="M198 306q8-7 17-4 11-3 17 4l-13 3-5-2-6 3Z" fill="#352b2a"/>
          <path d="M195 279q7-5 14-1M224 278q7-5 14 0" stroke="#49332e" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
          <ellipse cx="203" cy="286" rx="2" ry="2.2" fill="#40332f"/><ellipse cx="230" cy="285" rx="2" ry="2.2" fill="#40332f"/>
          <path d="M215 285l-3 13 8 1" stroke="#b4816d" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M181 273q-4-39 33-42 31-1 39 25l-5 19Z" fill="#557b98"/>
          <path d="M189 252q23-17 51-3M215 234v26" fill="none" stroke="#7695ac" strokeWidth="1.5"/>
          <path d="M210 260q27-3 57 9l-9 10-49-5Z" fill="#293f54"/>
          <path d="M218 243l-9 5 10 4-7 5m11-15 7 5-7 5 7 4" stroke="#9b3948" strokeWidth="3" fill="none"/>
        </g>
      </g>
      <g className={styles.partner}>
        <ellipse cx="734" cy="549" rx="40" ry="5" fill="#172a2d" opacity=".45"/>
        <path d="M708 414h51l-4 64-4 53h-16l-2-74-5 74h-16l-5-53Z" fill="#1d2a2e"/>
        <path d="M713 520h15v18h-16Zm23 0h15l2 18h-17Z" fill="#a3acaf"/>
        <path d="M712 534h16l4 9q1 7-6 7h-23q-5-2-1-7Zm24 0h17l8 11q3 5-4 6h-23Z" fill="#d5dddb"/>
        <path d="M703 547h27v4h-28Zm31 1h26v4h-26Z" fill="#9da9a9"/>
        <path d="M708 311Q733 302 757 312l11 43-5 65q-30 10-61-1l-4-64Z" fill="#4a5046"/>
        <path d="M724 310h16l7 111h-27Z" fill="#222b2c"/>
        <path d="M713 314l-7 19 13 9-7 74m40-101 8 18-13 10 8 73M704 365h17m23 0h19m-61 25h18m25 0h19" fill="none" stroke="#666c5c" strokeWidth="1.7"/>
        <path d="M707 317q-8-1-11 17l-7 57 11 4 14-61Z" fill="#424a41"/>
        <path d="M757 317q9-1 13 17l8 56-11 5-16-60Z" fill="#424a41"/>
        <g fill="#ce9f86" stroke="#a77b68" strokeWidth=".8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M690 390l9 2 1 7 4 6q2 4-1 5l-5-5 1 10q0 3-3 3l-6-2q-4-1-4-5l1-11Z"/>
          <path d="M690 405v8m4-7 1 9" fill="none"/>
          <g transform="translate(1468 0) scale(-1 1)"><path d="M690 390l9 2 1 7 4 6q2 4-1 5l-5-5 1 10q0 3-3 3l-6-2q-4-1-4-5l1-11Z"/><path d="M690 405v8m4-7 1 9" fill="none"/></g>
        </g>
        <path d="M702 402l11-3 1 12-12 3m47-15 12 3v12l-13-3" fill="#3c443c"/>
        <g className={styles.curls}>
          <g transform="translate(733 300) scale(1.12 1.04) translate(-733 -300)">
          <path d="M704 335q-14-37-2-64 9-29 33-26 30 0 33 32 11 35-6 69l-14-9-8 13-16-9-14 7Z" fill="#25282a"/>
          {[[708,267],[702,282],[702,299],[704,315],[710,332],[760,271],[766,288],[765,304],[762,322],[752,338]].map(([x,y]) => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="8" fill="#2a292a"/><path d={`M${x-3} ${y+4}q-6-9 2-9q8 1 2 7l-1-2q3-5-1-4-5 1-2 8Z`} fill="#4b4140"/></g>)}
          </g>
        </g>
        <g transform="translate(183 2.75) scale(.75)">
        <path d="M718 386v22q12 16 26 0v-24Z" fill="#bb8e78"/>
        <path d="M705 343q24-25 51 1l2 28q-3 26-26 29-24-6-29-29Z" fill="#d4a78d"/>
        <path d="M698 358q-7-39 27-43 35-3 39 30l-12-5q-23-21-44 17Z" fill="#25282a"/>
        <path d="M710 354q6-4 12-1m16 0q6-4 11 0" fill="none" stroke="#47352f" strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="717" cy="360" rx="2.5" ry="3" fill="#40352e"/><ellipse cx="743" cy="360" rx="2.5" ry="3" fill="#40352e"/>
        <path d="M731 360l-3 12 6 1" fill="none" stroke="#b78570" strokeWidth="1.5"/>
        <path d="M716 380q15 14 29-1-13 24-29 1Z" fill="#f0e3d2"/>
        </g>
      </g>
      <Cat x={339} y={508} kind="tabby"/>
      <Cat x={440} y={520} kind="siamese"/>
      <Cat x={548} y={506} kind="fluffy"/>
      <text x="61" y="580" fill="#9eb6af" fontSize="11" fontFamily="monospace" letterSpacing="2">ENGINEERING / DESIGN / LIFE IN BETWEEN</text>
    </svg>
    {hotspots.map(spot => <button key={spot.key} type="button" className={styles.hotspot} style={{ left: `${spot.left}%`, top: `${spot.top}%`, width: `${spot.width}%`, height: `${spot.height}%` }} aria-label={spot.label} aria-describedby="about-scene-detail" onPointerEnter={() => setActive(spot.key)} onFocus={() => setActive(spot.key)} onClick={() => setActive(spot.key)} />)}
    </div>
    <p className={styles.caption} id="about-scene-detail">{active ? details[active] : 'A little curiosity goes a long way. Explore the desk, the view, or the cats.'}</p>
  </section>;
}
