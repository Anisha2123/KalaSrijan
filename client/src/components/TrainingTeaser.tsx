"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const COURSES = [
  {
    id: 11, num: "01",
    title: "Let's Draw & Paint",
    subtitle: "Designer Package · 12 Levels",
    category: "Drawing",
    feeShort: "₹3,000 / level",
    tag: "Flagship",
    tagColor: "#CD2C58",
    icon: "✏️",
    img: "/classes/painting.png",
    accent: "#CD2C58",
    duration: "12 levels × 25 sessions",
  },
  {
    id: 1, num: "02",
    title: "Painting Classes",
    subtitle: "8 styles from Oil to Freehand",
    category: "Painting",
    feeShort: "From ₹3,000",
    tag: "Most Popular",
    tagColor: "#E06B80",
    icon: "🎨",
    img: "/classes/hand_painting.png",
    accent: "#E06B80",
    duration: "25 classes · 1–6 months",
  },
  {
    id: 2, num: "03",
    title: "Stitching Courses",
    subtitle: "Diploma in Garment Making",
    category: "Stitching",
    feeShort: "₹15,000",
    tag: "Diploma",
    tagColor: "#CD2C58",
    icon: "🧵",
    img: "/classes/stiching.png",
    accent: "#CD2C58",
    duration: "60 classes per diploma",
  },
  {
    id: 7, num: "04",
    title: "Resin Art",
    subtitle: "Epoxy · Coasters & Wall Art",
    category: "Craft",
    feeShort: "₹1,500",
    tag: "Trending",
    tagColor: "#E06B80",
    icon: "💎",
    img: "/classes/resin_art.png",
    accent: "#E06B80",
    duration: "2 days",
  },
  {
    id: 10, num: "05",
    title: "Lippan Art",
    subtitle: "Mud & Mirror · Gujarat Heritage",
    category: "Cultural",
    feeShort: "₹2,000",
    tag: "Heritage",
    tagColor: "#CD2C58",
    icon: "🪞",
    img: "/classes/lippon_art.png",
    accent: "#CD2C58",
    duration: "2–3 days",
  },
  {
    id: 5, num: "06",
    title: "Calligraphy Courses",
    subtitle: "Hindi & English · 30 fonts",
    category: "Drawing",
    feeShort: "From ₹3,000",
    tag: "30 Fonts",
    tagColor: "#E06B80",
    icon: "✍️",
    img: "/classes/caligraphy.png",
    accent: "#E06B80",
    duration: "Flexible",
  },
];

/* ─────────────────────────────────────────────────────────
   useInView
───────────────────────────────────────────────────────── */
function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView: v };
}

/* ─────────────────────────────────────────────────────────
   DesktopCard  (used in desktop + tablet marquee)
───────────────────────────────────────────────────────── */
function DesktopCard({ c }: { c: typeof COURSES[0] }) {
  return (
    <div className="la-card">
      <div className="la-card-img-zone">
        <img src={c.img} alt={c.title} className="la-card-img" loading="lazy" />
        <div className="la-card-grad" />
        <div className="la-card-num" aria-hidden="true">{c.num}</div>
        <div className="la-card-tag" style={{ background: c.tagColor }}>{c.tag}</div>
        <div className="la-card-icon">{c.icon}</div>
        <div className="la-enq">Enquire →</div>
      </div>
      <div className="la-card-body">
        <div className="la-card-cat" style={{ color: c.accent }}>{c.category}</div>
        <h3 className="la-card-title">{c.title}</h3>
        <p className="la-card-sub">{c.subtitle}</p>
        <div className="la-card-foot">
          <span className="la-card-dur">⏱ {c.duration}</span>
          <span className="la-card-fee" style={{ color: c.accent }}>{c.feeShort}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MobileCard  (compact portrait, used in 2-row mobile)
───────────────────────────────────────────────────────── */
function MobileCard({ c }: { c: typeof COURSES[0] }) {
  return (
    <div className="lam-card">
      <div className="lam-thumb">
        <img src={c.img} alt={c.title} className="lam-img" loading="lazy" />
        <div className="lam-grad" />
        <div className="lam-tag" style={{ background: c.tagColor }}>{c.tag}</div>
        <span className="lam-icon">{c.icon}</span>
      </div>
      <div className="lam-body">
        <div className="lam-cat" style={{ color: c.accent }}>{c.category}</div>
        <div className="lam-title">{c.title}</div>
        <div className="lam-fee" style={{ color: c.accent }}>{c.feeShort}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────── */
export default function TrainingTeaserEditorial() {
  const { ref: headRef, inView: headIn } = useInView(0.08);

  // 4× repetition ensures seamless -50% loop for any viewport width
  const quad = [...COURSES, ...COURSES, ...COURSES, ...COURSES];

  // Row 2: offset by 3 so both rows show different cards in view
  const row2 = [
    ...COURSES.slice(3), ...COURSES.slice(0, 3),
    ...COURSES.slice(3), ...COURSES.slice(0, 3),
    ...COURSES, ...COURSES,
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── reset ── */
        .la-root *, .la-root *::before, .la-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        /* ════════════════════════════════
           KEYFRAMES
        ════════════════════════════════ */
        @keyframes laBlob {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(28px,20px) scale(1.06); }
        }
        @keyframes laFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes laCardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        /* ── GPU-only infinite marquees ── */
        @keyframes laLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes laRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* ════════════════════════════════
           SECTION
        ════════════════════════════════ */
        .la-section {
          background: #2a1018;
          position: relative; overflow: hidden;
          padding: 88px 0 80px;
          font-family: 'DM Sans', sans-serif;
        }

        .la-blob {
          position: absolute; border-radius: 50%;
          pointer-events: none; will-change: transform;
        }
        .la-blob-a {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(205,44,88,0.14) 0%, transparent 65%);
          top: -160px; right: -140px;
          animation: laBlob 14s ease-in-out infinite alternate;
        }
        .la-blob-b {
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(255,198,157,0.08) 0%, transparent 65%);
          bottom: -80px; left: -80px;
          animation: laBlob 11s ease-in-out infinite alternate;
        }
        .la-deco {
          position: absolute; top: 20px; left: 36px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 22rem; font-weight: 600;
          color: rgba(255,255,255,0.025);
          line-height: 1; pointer-events: none;
          user-select: none; z-index: 0;
        }

        .la-inner {
          max-width: 1240px; margin: 0 auto;
          padding: 0 40px; position: relative; z-index: 1;
        }

        /* ════════════════════════════════
           HEADER  (desktop — untouched)
        ════════════════════════════════ */
        .la-header {
          display: flex; align-items: flex-end;
          justify-content: space-between;
          gap: 24px; flex-wrap: wrap;
          margin-bottom: 52px;
          opacity: 0; transition: opacity .9s ease, transform .9s ease;
          transform: translateY(20px);
        }
        .la-header.la-visible {
          opacity: 1; transform: translateY(0);
        }

        .la-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 11px; letter-spacing: .20em;
          text-transform: uppercase; color: #E06B80;
          font-weight: 500; margin-bottom: 16px;
        }
        .la-eline-l { width:36px; height:1px; background:linear-gradient(90deg,#E06B80,transparent); }
        .la-eline-r { width:36px; height:1px; background:linear-gradient(270deg,#E06B80,transparent); }

        .la-h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 4.5vw, 4.6rem);
          font-weight: 300; line-height: 1.06; color: #fff;
        }
        .la-h2 em { font-style: italic; color: #E06B80; }

        .la-hright {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 14px;
        }
        .la-count {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 5rem);
          font-weight: 600; color: rgba(255,255,255,.90); line-height: 1;
        }
        .la-count-lbl {
          font-family: 'DM Sans', sans-serif;
          font-size: .80rem; font-weight: 300;
          color: rgba(255,255,255,.40);
          letter-spacing: .10em; text-transform: uppercase; margin-left: 10px;
        }

        .la-cta {
          display: inline-flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.14);
          color: #fff; padding: 14px 32px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem; font-weight: 500; letter-spacing: .04em;
          text-decoration: none; white-space: nowrap;
          transition: border-color .25s, transform .22s, box-shadow .22s;
          position: relative; overflow: hidden;
        }
        .la-cta::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #CD2C58, #E06B80);
          opacity: 0; transition: opacity .28s;
        }
        .la-cta:hover::before { opacity: 1; }
        .la-cta:hover {
          border-color: transparent; transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(205,44,88,.32);
        }
        .la-cta-txt, .la-cta-ico { position: relative; z-index: 1; }
        .la-cta-ico {
          width: 26px; height: 26px; border-radius: 50%;
          background: rgba(255,255,255,.10);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: .80rem; transition: transform .22s;
        }
        .la-cta:hover .la-cta-ico { transform: translateX(4px); }

        /* ════════════════════════════════
           DESKTOP STRIP  (≥768px)
           overflow:hidden clips the animating track
        ════════════════════════════════ */
        .la-strip {
          position: relative; overflow: hidden;
        }
        .la-strip::before, .la-strip::after {
          content: ''; position: absolute; top: 0; bottom: 0;
          width: 120px; z-index: 2; pointer-events: none;
        }
        .la-strip::before {
          left: 0; background: linear-gradient(to right, #2a1018, transparent);
        }
        .la-strip::after {
          right: 0; background: linear-gradient(to left, #2a1018, transparent);
        }
        /* The continuously moving track */
        .la-track {
          display: flex; gap: 14px;
          width: max-content; will-change: transform;
          animation: laLeft 38s linear infinite;
        }
        /* Pause on hover */
        .la-strip:hover .la-track { animation-play-state: paused; }

        /* ════════════════════════════════
           DESKTOP CARD
        ════════════════════════════════ */
        .la-card {
          flex-shrink: 0; width: 280px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 20px; overflow: hidden; cursor: pointer;
          transition: background .3s, border-color .3s,
                      transform .32s cubic-bezier(.34,1.56,.64,1), box-shadow .3s;
          will-change: transform;
        }
        @media (hover: hover) {
          .la-card:hover {
            background: rgba(205,44,88,.12);
            border-color: rgba(205,44,88,.38);
            transform: translateY(-6px);
            box-shadow: 0 24px 60px rgba(0,0,0,.36), 0 4px 20px rgba(205,44,88,.18);
          }
          .la-card:hover .la-card-img  { transform: scale(1.07); }
          .la-card:hover .la-card-num  { opacity: .06 !important; }
          .la-card:hover .la-enq       { opacity: 1 !important; transform: translateY(0) !important; }
        }

        .la-card-img-zone {
          position: relative; height: 180px; overflow: hidden;
        }
        .la-card-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform .6s ease; will-change: transform;
        }
        .la-card-grad {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(42,16,24,.10) 0%, rgba(42,16,24,.65) 100%);
        }
        .la-card-num {
          position: absolute; bottom: -14px; right: 10px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem; font-weight: 600;
          color: rgba(255,255,255,.14); line-height: 1;
          transition: opacity .3s; pointer-events: none; user-select: none;
        }
        .la-card-tag {
          position: absolute; top: 12px; left: 12px;
          color: #fff; border-radius: 100px; padding: 3px 11px;
          font-family: 'DM Sans', sans-serif;
          font-size: .58rem; font-weight: 600;
          letter-spacing: .10em; text-transform: uppercase;
        }
        .la-card-icon { position: absolute; bottom: 12px; left: 14px; font-size: 1.1rem; }
        .la-enq {
          position: absolute; bottom: 16px; right: 16px;
          background: #CD2C58; color: #fff;
          padding: 6px 14px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; font-weight: 500;
          letter-spacing: .07em; text-transform: uppercase;
          opacity: 0; transform: translateY(6px);
          transition: opacity .28s ease, transform .28s ease;
        }
        .la-card-body { padding: 16px 18px 18px; }
        .la-card-cat  { font-size: .58rem; letter-spacing: .14em; text-transform: uppercase; font-weight: 500; margin-bottom: 5px; }
        .la-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.22rem; font-weight: 400; color: #fff; line-height: 1.15; margin-bottom: 4px;
        }
        .la-card-sub  { font-size: .72rem; color: rgba(255,230,212,.50); font-weight: 300; margin-bottom: 14px; line-height: 1.5; }
        .la-card-foot { display: flex; align-items: center; justify-content: space-between; }
        .la-card-dur  { font-size: .65rem; color: rgba(255,255,255,.35); letter-spacing: .06em; }
        .la-card-fee  { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 600; }

        /* ════════════════════════════════
           SCROLL HINT
        ════════════════════════════════ */
        .la-hint {
          margin-top: 20px; display: flex; align-items: center; gap: 10px; opacity: .38;
        }
        .la-hline     { height: 1px; flex: 1; }
        .la-hline-l   { background: linear-gradient(90deg, rgba(255,255,255,.20), transparent); }
        .la-hline-r   { background: linear-gradient(270deg, rgba(255,255,255,.20), transparent); }
        .la-hint-txt  { font-size: .62rem; letter-spacing: .14em; text-transform: uppercase; color: #fff; white-space: nowrap; }

        /* ════════════════════════════════
           MOBILE ROWS  (hidden by default)
        ════════════════════════════════ */
        .la-mob-rows { display: none; flex-direction: column; gap: 10px; }

        .la-mob-row {
          overflow: hidden; position: relative;
        }
        /* subtle edge fades */
        .la-mob-row::before, .la-mob-row::after {
          content: ''; position: absolute; top: 0; bottom: 0;
          width: 28px; z-index: 2; pointer-events: none;
        }
        .la-mob-row::before { left: 0;  background: linear-gradient(to right, #2a1018, transparent); }
        .la-mob-row::after  { right: 0; background: linear-gradient(to left,  #2a1018, transparent); }

        .la-mob-track           { display: flex; gap: 9px; width: max-content; will-change: transform; }
        .la-mob-track-ltr       { animation: laLeft  26s linear infinite; }
        .la-mob-track-rtl       { animation: laRight 30s linear infinite; }
        .la-mob-row:active .la-mob-track { animation-play-state: paused; }

        /* ── compact portrait card ── */
        .lam-card {
          flex-shrink: 0; width: 148px;
          border-radius: 13px; overflow: hidden;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.09);
          cursor: pointer; will-change: transform;
          transition: transform .18s, border-color .18s;
        }
        .lam-card:active { transform: scale(.95); border-color: rgba(205,44,88,.40); }

        .lam-thumb { position: relative; height: 96px; overflow: hidden; }
        .lam-img   { width: 100%; height: 100%; object-fit: cover; display: block; }
        .lam-grad  {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(42,16,24,.06) 0%, rgba(42,16,24,.72) 100%);
        }
        .lam-tag {
          position: absolute; top: 7px; left: 7px;
          color: #fff; border-radius: 100px; padding: 2px 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: .47rem; font-weight: 600; letter-spacing: .09em; text-transform: uppercase;
        }
        .lam-icon { position: absolute; bottom: 6px; left: 8px; font-size: .80rem; }

        .lam-body  { padding: 9px 10px 11px; display: flex; flex-direction: column; gap: 2px; }
        .lam-cat   { font-size: .47rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 500; }
        .lam-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: .90rem; font-weight: 400; color: #fff; line-height: 1.2;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .lam-fee   { font-family: 'Cormorant Garamond', serif; font-size: .76rem; font-weight: 600; margin-top: 2px; }

        /* mobile hint */
        .la-mob-hint {
          display: none; margin-top: 14px;
          align-items: center; gap: 8px; opacity: .35;
        }
        .la-mob-hint-l { height:1px; flex:1; background:linear-gradient(90deg,rgba(255,255,255,.20),transparent); }
        .la-mob-hint-r { height:1px; flex:1; background:linear-gradient(270deg,rgba(255,255,255,.20),transparent); }
        .la-mob-hint-t { font-size:.58rem; letter-spacing:.12em; text-transform:uppercase; color:#fff; white-space:nowrap; }

        /* stat bar — tablet only */
        .la-stats {
          display: none; margin-top: 36px;
          border-top: 1px solid rgba(255,255,255,.07);
        }
        .la-stat {
          flex: 1; display: flex; flex-direction: column; align-items: center;
          padding: 18px 8px; text-align: center;
          border-right: 1px solid rgba(255,255,255,.07);
        }
        .la-stat:last-child { border-right: none; }
        .la-stat-n {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 600; color: #E06B80; line-height: 1; margin-bottom: 4px;
        }
        .la-stat-l { font-size: .58rem; letter-spacing: .10em; text-transform: uppercase; color: rgba(255,255,255,.35); }

        /* ════════════════════════════════
           TABLET  768–1023px
           Header stays side-by-side, tightened.
           Cards slightly narrower. Faster marquee.
           Stat bar appears below strip.
        ════════════════════════════════ */
        @media (max-width: 1023px) {
          .la-section { padding: 72px 0 60px; }
          .la-inner   { padding: 0 28px; }
          .la-deco    { font-size: 13rem; }

          .la-header  { margin-bottom: 40px; gap: 20px; }
          .la-h2      { font-size: clamp(2.2rem, 4vw, 3.4rem); }
          .la-count   { font-size: clamp(2.4rem, 4vw, 3.8rem); }

          .la-card    { width: 248px; }
          .la-card-img-zone { height: 158px; }

          .la-strip::before, .la-strip::after { width: 60px; }
          .la-track   { animation-duration: 32s; }

          .la-stats   { display: flex; }
        }

        /* ════════════════════════════════
           MOBILE  ≤767px
           Header stacks, count hidden,
           inline pill stats + compact CTA.
           Desktop strip hidden → 2-row mobile marquee shown.
        ════════════════════════════════ */
        @media (max-width: 767px) {
          .la-section  { padding: 48px 0 44px; }
          .la-inner    { padding: 0 16px; }
          .la-deco     { display: none; }

          /* Stack header */
          .la-header {
            flex-direction: column; align-items: flex-start;
            gap: 0; margin-bottom: 26px;
          }
          .la-hleft    { width: 100%; margin-bottom: 16px; }
          .la-eyebrow  { margin-bottom: 10px; font-size: 10px; }
          .la-h2       { font-size: clamp(1.9rem, 7.5vw, 2.4rem); }

          .la-hright {
            width: 100%; flex-direction: row;
            align-items: center; justify-content: space-between; gap: 10px;
          }
          .la-count-wrap { display: none !important; }

          /* Inline stat pills */
          .la-pills {
            display: flex !important; align-items: center; gap: 6px; flex-wrap: wrap;
          }
          .la-pill {
            background: rgba(255,255,255,.07);
            border: 1px solid rgba(255,255,255,.10);
            border-radius: 100px; padding: 4px 10px;
            font-family: 'DM Sans', sans-serif;
            font-size: .58rem; font-weight: 500;
            color: rgba(255,255,255,.50); white-space: nowrap;
          }
          .la-pill strong { color: #E06B80; font-weight: 600; margin-right: 2px; }

          /* CTA compact */
          .la-cta      { padding: 11px 20px; font-size: .82rem; flex-shrink: 0; }
          .la-cta-ico  { width: 22px; height: 22px; font-size: .72rem; }

          /* Swap layouts */
          .la-strip    { display: none; }
          .la-hint     { display: none; }
          .la-mob-rows { display: flex; }
          .la-mob-hint { display: flex; }
          .la-stats    { display: none !important; }
        }

        /* ════════════════════════════════
           XS  ≤399px
        ════════════════════════════════ */
        @media (max-width: 399px) {
          .la-inner    { padding: 0 12px; }
          .la-h2       { font-size: 1.75rem; }
          .lam-card    { width: 130px; }
          .lam-thumb   { height: 84px; }
          .la-pill     { font-size: .53rem; padding: 3px 8px; }
          .la-cta      { padding: 10px 14px; font-size: .76rem; }
        }
      `}</style>

      <section className="la-root la-section">

        <div className="la-blob la-blob-a" />
        <div className="la-blob la-blob-b" />
        <div className="la-deco" aria-hidden="true">11</div>

        <div className="la-inner">

          {/* ══════════════════════════
              HEADER
          ══════════════════════════ */}
          <div
            ref={headRef}
            className={`la-header${headIn ? " la-visible" : ""}`}
          >
            {/* Left */}
            <div className="la-hleft">
              <div className="la-eyebrow">
                <div className="la-eline-l" />
                Training &amp; Classes
                <div className="la-eline-r" />
              </div>
              <h2 className="la-h2">
                Craft your<br />
                <em>next skill</em>
              </h2>
            </div>

            {/* Right */}
            <div className="la-hright">
              {/* Desktop / tablet count */}
              <div className="la-count-wrap">
                <div className="la-count">
                  11<span className="la-count-lbl">courses</span>
                </div>
              </div>

              {/* Mobile stat pills — shown via CSS */}
              <div className="la-pills" style={{ display: "none" }}>
                <span className="la-pill"><strong>11</strong>Courses</span>
                <span className="la-pill"><strong>5000+</strong>Students</span>
                <span className="la-pill"><strong>15+</strong>Art Forms</span>
              </div>

              <a href="/training" className="la-cta">
                <span className="la-cta-txt">View all classes</span>
                <span className="la-cta-ico">→</span>
              </a>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              DESKTOP + TABLET — single CSS marquee
              translateX(-50%) loops back seamlessly
              because the track is exactly 2× content
          ══════════════════════════════════════════ */}
          <div className="la-strip">
            <div className="la-track">
              {quad.map((c, i) => (
                <DesktopCard key={`dt-${c.id}-${i}`} c={c} />
              ))}
            </div>
          </div>

          <div className="la-hint">
            <div className="la-hline la-hline-l" />
            <span className="la-hint-txt">Scroll to explore · Hover to pause</span>
            <div className="la-hline la-hline-r" />
          </div>

          {/* ══════════════════════════════════════════
              MOBILE — 2 rows, opposite directions
              Row 1 → moves LEFT
              Row 2 → moves RIGHT  (offset cards)
          ══════════════════════════════════════════ */}
          <div className="la-mob-rows">

            {/* Row 1 — left */}
            <div className="la-mob-row">
              <div className="la-mob-track la-mob-track-ltr">
                {quad.map((c, i) => (
                  <MobileCard key={`r1-${c.id}-${i}`} c={c} />
                ))}
              </div>
            </div>

            {/* Row 2 — right, offset cards */}
            <div className="la-mob-row">
              <div className="la-mob-track la-mob-track-rtl">
                {row2.map((c, i) => (
                  <MobileCard key={`r2-${c.id}-${i}`} c={c} />
                ))}
              </div>
            </div>

          </div>

          {/* Mobile hint */}
          <div className="la-mob-hint">
            <div className="la-mob-hint-l" />
            <span className="la-mob-hint-t">11 courses · tap to enquire</span>
            <div className="la-mob-hint-r" />
          </div>

          {/* Stat bar — tablet only */}
          <div className="la-stats">
            {[
              { n: "11",    l: "Courses"        },
              { n: "5000+", l: "Students"       },
              { n: "15+",   l: "Art Forms"      },
              { n: "Free",  l: "Temple Classes" },
            ].map(({ n, l }) => (
              <div key={l} className="la-stat">
                <div className="la-stat-n">{n}</div>
                <div className="la-stat-l">{l}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}