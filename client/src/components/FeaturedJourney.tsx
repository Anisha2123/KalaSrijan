"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const MILESTONES = [
  {
    year: "The Beginning",
    icon: "🧸",
    label: "Soft Toy Classes",
    blurb: "Free workshops in temples, sharing skills with the community — purely out of love.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=480&auto=format&fit=crop&q=80",
  },
  {
    year: "Growing Roots",
    icon: "🌱",
    label: "A Network of 5000+",
    blurb: "Word spread. Dedication earned trust. A growing family of learners and creators formed.",
    img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=480&auto=format&fit=crop&q=80",
  },
  {
    year: "2019",
    icon: "🍽️",
    label: "Chef at IFB",
    blurb: "A pivotal chapter — professional kitchens, new horizons, and a life transformed.",
    img: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=480&auto=format&fit=crop&q=80",
  },
  {
    year: "Today",
    icon: "✨",
    label: "Kalasrijan Lives",
    blurb: "Active, inspired, and unstoppable — M.Sc. Botany, Diploma of Pharmacy, and a heart full of craft.",
    img: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=480&auto=format&fit=crop&q=80",
  },
];

const CHIPS = [
  { val: "5000+", label: "Happy Learners" },
  { val: "2019",  label: "IFB Chef" },
  { val: "Free",  label: "First Classes" },
  { val: "M.Sc.", label: "Botany Degree" },
];

/* ─────────────────────────────────────────
   HOOK
───────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

/* ─────────────────────────────────────────
   MILESTONE DOT CARD
───────────────────────────────────────── */
function MilestoneCard({
  m, idx, active, total, onClick,
}: {
  m: typeof MILESTONES[0];
  idx: number;
  active: boolean;
  total: number;
  onClick: () => void;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <div
      ref={ref}
      className="fjm-card"
      data-inview={inView}
      data-active={active}
      style={{ "--d": `${idx * 0.13}s` } as React.CSSProperties}
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button"
      aria-pressed={active}
    >
      {/* Connector */}
      {idx < total - 1 && (
        <div className="fjm-connector">
          <div className="fjm-connector-fill" data-active={active} />
        </div>
      )}

      {/* Dot */}
      <div className="fjm-dot" data-active={active}>
        <span className="fjm-dot-icon">{m.icon}</span>
        <div className="fjm-dot-ring" />
      </div>

      {/* Label */}
      <div className="fjm-card-label">
        <span className="fjm-card-year">{m.year}</span>
        <span className="fjm-card-name">{m.label}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export default function FeaturedJourney() {
  const [active, setActive]     = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const { ref: secRef,   inView: secIn   } = useInView(0.05);
  const { ref: quoteRef, inView: quoteIn } = useInView(0.10);
  const { ref: panelRef, inView: panelIn } = useInView(0.08);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setActive(a => (a + 1) % MILESTONES.length), 4000);
    return () => clearInterval(t);
  }, [isPaused]);

  const handleSelect = (i: number) => {
    setActive(i);
    setImgLoaded(false);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const cur = MILESTONES[active];

  return (
    <>
      {/* ─── GLOBAL STYLES ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --coral: #CD2C58;
          --rose:  #E06B80;
          --sand:  #FFC69D;
          --blush: #FFE6D4;
          --ink:   #2a1018;
          --muted: #7a4a55;
          --pale:  #fff8f4;
        }

        /* ─── Reset scoped ─── */
        .fj-wrap *, .fj-wrap *::before, .fj-wrap *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        /* ─── Section ─── */
        .fj-section {
          background: var(--ink);
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 100px 0 90px;
        }

        /* ─── Backgrounds ─── */
        .fj-noise {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            radial-gradient(ellipse 80% 60% at 70% 20%, rgba(205,44,88,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 10% 80%, rgba(255,198,157,0.08) 0%, transparent 60%);
        }
        .fj-grain {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }
        .fj-arc {
          position: absolute; border-radius: 50%; pointer-events: none; z-index: 0;
          animation: fjArc 14s ease-in-out infinite alternate;
        }
        .fj-arc-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(224,107,128,0.08) 0%, transparent 70%);
          top: -100px; left: -100px;
        }
        .fj-arc-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(255,198,157,0.07) 0%, transparent 70%);
          bottom: -80px; right: -80px;
          animation-delay: -7s;
        }
        @keyframes fjArc { from { transform: translate(0,0); } to { transform: translate(25px, 18px); } }

        /* ─── Inner ─── */
        .fj-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative; z-index: 1;
        }

        /* ─── Eyebrow ─── */
        .fj-eyebrow {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 60px;
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fj-eyebrow.fj-in { opacity: 1; transform: translateY(0); }
        .fj-eyebrow-line {
          height: 1px; width: 48px;
          background: linear-gradient(90deg, var(--sand), transparent);
          flex-shrink: 0;
        }
        .fj-eyebrow-line-r { background: linear-gradient(270deg, var(--sand), transparent); }
        .fj-eyebrow-text {
          font-size: 11px; letter-spacing: 0.20em;
          text-transform: uppercase; color: var(--sand); font-weight: 500;
          white-space: nowrap;
        }

        /* ─── Desktop grid (≥1024px) — PRESERVED ─── */
        .fj-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: start;
          margin-bottom: 72px;
        }

        /* ─── Left: text ─── */
        .fj-left {
          opacity: 0; transform: translateX(-28px);
          transition: opacity 1s ease 0.1s, transform 1s ease 0.1s;
        }
        .fj-left.fj-in { opacity: 1; transform: translateX(0); }

        .fj-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 4.5vw, 5rem);
          font-weight: 300; line-height: 1.06;
          color: #fff; margin-bottom: 18px;
        }
        .fj-heading em { font-style: italic; color: var(--sand); }

        .fj-lede {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.05rem, 1.6vw, 1.3rem);
          color: rgba(255,230,212,0.75);
          font-style: italic; font-weight: 300;
          line-height: 1.75; border-left: 2px solid var(--rose);
          padding-left: 20px; margin-bottom: 28px;
        }

        .fj-body {
          font-size: 0.93rem; color: rgba(255,230,212,0.60);
          line-height: 1.9; font-weight: 300; margin-bottom: 38px;
        }

        /* ─── Chips ─── */
        .fj-chips { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 38px; }
        .fj-chip {
          display: flex; flex-direction: column;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,198,157,0.18);
          border-radius: 14px; padding: 12px 18px;
          backdrop-filter: blur(8px);
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
          cursor: default;
        }
        @media (hover: hover) {
          .fj-chip:hover {
            background: rgba(205,44,88,0.12);
            border-color: rgba(205,44,88,0.40);
            transform: translateY(-3px);
          }
        }
        .fj-chip-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem; font-weight: 600;
          color: var(--sand); line-height: 1;
        }
        .fj-chip-label {
          font-size: 0.68rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,198,157,0.55);
          margin-top: 4px;
        }

        /* ─── CTA ─── */
        .fj-cta {
          display: inline-flex; align-items: center; gap: 12px;
          border: 1.5px solid rgba(255,198,157,0.35);
          color: var(--sand);
          padding: 14px 32px; border-radius: 100px;
          background: transparent;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem; font-weight: 500;
          letter-spacing: 0.05em;
          text-decoration: none;
          transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.22s;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        @media (hover: hover) {
          .fj-cta:hover {
            background: rgba(255,198,157,0.10);
            border-color: var(--sand);
            transform: translateY(-2px);
          }
          .fj-cta:hover .fj-cta-arrow { transform: translateX(5px); }
        }
        .fj-cta-arrow { transition: transform 0.22s; }

        /* ─── Right: image ─── */
        .fj-right {
          opacity: 0; transform: translateX(28px);
          transition: opacity 1s ease 0.25s, transform 1s ease 0.25s;
          position: relative;
        }
        .fj-right.fj-in { opacity: 1; transform: translateX(0); }

        .fj-img-stage { position: relative; width: 100%; }
        .fj-img-deco {
          position: absolute;
          top: 20px; right: -20px;
          width: 100%; height: 100%;
          border: 1px solid rgba(255,198,157,0.14);
          border-radius: 6px 28px 6px 28px;
          z-index: 0; pointer-events: none;
        }
        .fj-img-box {
          position: relative; z-index: 1;
          width: 100%;
          aspect-ratio: 3/4;
          border-radius: 28px 6px 28px 6px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.50), 0 8px 30px rgba(205,44,88,0.22);
        }
        .fj-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity 0.55s ease, transform 0.7s ease;
          display: block;
        }
        .fj-img-loading { opacity: 0; transform: scale(1.03); }
        .fj-img-loaded  { opacity: 1; transform: scale(1); }
        .fj-img-gradient {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(42,16,24,0.75) 0%, transparent 55%);
          z-index: 1;
        }
        .fj-img-caption {
          position: absolute; bottom: 0; left: 0; right: 0;
          z-index: 2; padding: 28px 24px;
        }
        .fj-img-caption-year {
          font-size: 0.65rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--sand);
          font-weight: 500; margin-bottom: 5px;
        }
        .fj-img-caption-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 400;
          color: #fff; line-height: 1.2; margin-bottom: 6px;
        }
        .fj-img-caption-blurb {
          font-size: 0.80rem; color: rgba(255,230,212,0.70);
          line-height: 1.65; font-weight: 300;
          max-width: 320px;
        }

        /* Badge */
        .fj-img-badge {
          position: absolute;
          top: 20px; left: -20px; z-index: 2;
          background: var(--coral);
          border-radius: 16px; padding: 12px 16px;
          box-shadow: 0 8px 30px rgba(205,44,88,0.40);
          display: flex; flex-direction: column; align-items: center;
          animation: fjBadge 5s ease-in-out infinite;
        }
        @keyframes fjBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .fj-img-badge-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 600;
          color: #fff; line-height: 1;
        }
        .fj-img-badge-text {
          font-size: 0.60rem; letter-spacing: 0.10em;
          text-transform: uppercase; color: rgba(255,255,255,0.75);
          margin-top: 2px; text-align: center;
        }

        /* ─── Timeline row ─── */
        .fj-timeline {
          display: flex; align-items: flex-start;
          justify-content: center; gap: 0;
          position: relative; margin-bottom: 0;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s;
        }
        .fj-timeline.fj-in { opacity: 1; transform: translateY(0); }

        /* ─── Milestone card ─── */
        .fjm-card {
          flex: 1;
          display: flex; flex-direction: column; align-items: center;
          position: relative;
          cursor: pointer;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.7s ease var(--d), transform 0.7s ease var(--d);
          outline: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .fjm-card[data-inview="true"] { opacity: 1; transform: translateY(0); }

        .fjm-connector {
          position: absolute;
          top: 20px;
          left: calc(50% + 22px);
          right: calc(-50% + 22px);
          height: 1px;
          background: rgba(255,198,157,0.15);
          overflow: hidden;
        }
        .fjm-connector-fill {
          height: 100%; width: 0%;
          background: linear-gradient(90deg, var(--rose), var(--sand));
          transition: width 0.6s ease;
        }
        .fjm-connector-fill[data-active="true"] { width: 100%; }

        .fjm-dot {
          width: 42px; height: 42px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,198,157,0.22);
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
          transition: background 0.35s, border-color 0.35s, transform 0.35s, box-shadow 0.35s;
          margin-bottom: 12px;
          flex-shrink: 0;
        }
        @media (hover: hover) { .fjm-dot:hover { transform: scale(1.12); } }
        .fjm-dot[data-active="true"] {
          background: var(--coral) !important;
          border-color: var(--coral) !important;
          box-shadow: 0 0 0 6px rgba(205,44,88,0.20), 0 6px 22px rgba(205,44,88,0.40) !important;
          transform: scale(1.15) !important;
        }
        .fjm-dot-icon { font-size: 1.05rem; }
        .fjm-dot-ring {
          position: absolute; inset: -6px; border-radius: 50%;
          border: 1px solid rgba(205,44,88,0);
          transition: border-color 0.35s, transform 0.35s;
        }
        .fjm-dot[data-active="true"] .fjm-dot-ring {
          border-color: rgba(205,44,88,0.35);
          animation: dotPulse 2.5s ease infinite;
        }
        @keyframes dotPulse {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50%      { transform: scale(1.25); opacity: 0; }
        }

        .fjm-card-label {
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          text-align: center; padding: 0 6px;
        }
        .fjm-card-year {
          font-size: 0.62rem; letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,198,157,0.50); font-weight: 500;
          transition: color 0.3s;
        }
        .fjm-card[data-active="true"] .fjm-card-year { color: var(--sand); }
        .fjm-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem; font-weight: 400;
          color: rgba(255,230,212,0.45); line-height: 1.2;
          transition: color 0.3s;
        }
        .fjm-card[data-active="true"] .fjm-card-name { color: #fff; }

        /* ─── Quote band ─── */
        .fj-quote-band {
          margin-top: 72px;
          padding: 44px 52px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,198,157,0.10);
          border-radius: 24px;
          position: relative; overflow: hidden;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .fj-quote-band.fj-in { opacity: 1; transform: translateY(0); }
        .fj-quote-band::before {
          content: '"';
          position: absolute; top: -10px; left: 28px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 10rem; font-weight: 600;
          color: rgba(205,44,88,0.08); line-height: 1;
          pointer-events: none;
        }
        .fj-quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          font-style: italic; font-weight: 300;
          color: rgba(255,230,212,0.80);
          line-height: 1.7; max-width: 760px;
          position: relative; z-index: 1;
        }
        .fj-quote-text em { color: var(--sand); font-style: normal; font-weight: 400; }
        .fj-quote-attr {
          margin-top: 18px;
          font-size: 0.78rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,198,157,0.40);
          position: relative; z-index: 1;
        }

        /* ══════════════════════════════════════
           TABLET  768px – 1023px
        ══════════════════════════════════════ */
        @media (min-width: 768px) and (max-width: 1023px) {
          .fj-section { padding: 80px 0 72px; }
          .fj-inner { padding: 0 32px; }

          /* Stack: image on top, text below */
          .fj-grid {
            grid-template-columns: 1fr;
            gap: 0;
            margin-bottom: 56px;
          }

          /* Image — half-height landscape, full width */
          .fj-right {
            order: -1;
            transform: none !important;
            margin-bottom: 44px;
          }
          .fj-img-box {
            aspect-ratio: 16 / 8;
            border-radius: 20px;
          }
          .fj-img-deco {
            top: 14px; right: -14px;
            border-radius: 4px 20px 4px 20px;
          }
          .fj-img-badge { left: -10px; }

          /* Text */
          .fj-left { transform: none !important; }
          .fj-heading { font-size: clamp(2.4rem, 5vw, 3.6rem); margin-bottom: 16px; }
          .fj-lede { font-size: 1.1rem; margin-bottom: 22px; }
          .fj-body { margin-bottom: 28px; }

          /* 4-col chips on tablet */
          .fj-chips { gap: 10px; }
          .fj-chip { padding: 10px 14px; border-radius: 12px; }
          .fj-chip-val { font-size: 1.5rem; }

          /* Timeline: show full row */
          .fjm-card-name { font-size: 0.88rem; }
          .fj-eyebrow { margin-bottom: 44px; }

          /* Quote */
          .fj-quote-band { margin-top: 52px; padding: 36px 40px; }
        }

        /* ══════════════════════════════════════
           MOBILE  ≤767px
        ══════════════════════════════════════ */
        @media (max-width: 767px) {
          .fj-section { padding: 60px 0 56px; }
          .fj-inner { padding: 0 18px; }

          /* Eyebrow */
          .fj-eyebrow { margin-bottom: 32px; }
          .fj-eyebrow-line { width: 28px; }

          /* Stack layout */
          .fj-grid {
            grid-template-columns: 1fr;
            gap: 0;
            margin-bottom: 40px;
          }

          /* Image first, full bleed feel */
          .fj-right {
            order: -1;
            transform: none !important;
            margin-bottom: 36px;
          }
          .fj-img-box {
            aspect-ratio: 4 / 3;
            border-radius: 16px;
          }
          .fj-img-deco { display: none; }
          .fj-img-badge {
            left: 12px; top: 12px;
            padding: 8px 12px;
            border-radius: 12px;
            animation: none; /* no float on mobile — avoids jank */
          }
          .fj-img-badge-num { font-size: 1.3rem; }
          .fj-img-caption { padding: 20px 18px; }
          .fj-img-caption-title { font-size: 1.2rem; }
          .fj-img-caption-blurb { display: none; } /* shown in card body instead */

          /* Text */
          .fj-left { transform: none !important; }
          .fj-heading {
            font-size: clamp(2rem, 8.5vw, 2.8rem);
            margin-bottom: 14px;
            line-height: 1.08;
          }
          .fj-lede {
            font-size: 1rem;
            margin-bottom: 18px;
            padding-left: 14px;
          }
          .fj-body {
            font-size: 0.875rem;
            line-height: 1.8;
            margin-bottom: 24px;
          }

          /* Chips — 2x2 grid on mobile */
          .fj-chips {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 28px;
          }
          .fj-chip { padding: 12px 14px; border-radius: 12px; }
          .fj-chip-val { font-size: 1.5rem; }
          .fj-chip-label { font-size: 0.65rem; }

          /* CTA — full width pill */
          .fj-cta {
            width: 100%;
            justify-content: center;
            padding: 16px 24px;
            font-size: 0.875rem;
            border-radius: 14px;
          }

          /* Timeline — compact pill strip on mobile */
          .fj-timeline {
            gap: 0;
            overflow-x: auto;
            justify-content: flex-start;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .fj-timeline::-webkit-scrollbar { display: none; }

          .fjm-card {
            min-width: 76px;
            flex: 0 0 auto;
            padding: 0 4px;
          }
          .fjm-dot {
            width: 38px; height: 38px;
            margin-bottom: 8px;
          }
          .fjm-dot-icon { font-size: 0.95rem; }
          .fjm-connector {
            left: calc(50% + 19px);
            right: calc(-50% + 19px);
          }
          .fjm-card-year { font-size: 0.55rem; letter-spacing: 0.10em; }
          .fjm-card-name { font-size: 0.72rem; }

          /* Active milestone blurb — shown as card under timeline on mobile */
          .fj-mobile-blurb {
            display: block;
            margin-top: 20px;
            padding: 16px 18px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,198,157,0.12);
            border-radius: 14px;
            font-size: 0.83rem;
            color: rgba(255,230,212,0.65);
            line-height: 1.7;
            font-weight: 300;
          }

          /* Quote */
          .fj-quote-band {
            margin-top: 36px;
            padding: 24px 20px;
            border-radius: 16px;
          }
          .fj-quote-band::before { font-size: 7rem; top: -6px; left: 16px; }
          .fj-quote-text { font-size: 1rem; line-height: 1.75; }
          .fj-quote-attr { font-size: 0.70rem; margin-top: 14px; }
        }

        /* Hide blurb card on tablet/desktop */
        @media (min-width: 768px) {
          .fj-mobile-blurb { display: none; }
        }
      `}</style>

      {/* ─── MARKUP ─── */}
      <section className="fj-wrap fj-section">
        <div className="fj-noise" />
        <div className="fj-grain" />
        <div className="fj-arc fj-arc-1" />
        <div className="fj-arc fj-arc-2" />

        <div className="fj-inner">

          {/* Eyebrow */}
          <div ref={secRef} className={`fj-eyebrow ${secIn ? "fj-in" : ""}`}>
            <div className="fj-eyebrow-line" />
            <span className="fj-eyebrow-text">Featured Journey</span>
            <div className="fj-eyebrow-line fj-eyebrow-line-r" />
          </div>

          {/* Main grid */}
          <div className="fj-grid">

            {/* LEFT: Text */}
            <div className={`fj-left ${secIn ? "fj-in" : ""}`}>
              <h2 className="fj-heading">
                A story woven<br />
                in <em>craft & courage</em>
              </h2>

              <p className="fj-lede">
                From free classes in temples to 5,000+ inspired learners — Suman Jain's journey is one of quiet persistence, bold creativity, and unshakeable heart.
              </p>

              <p className="fj-body">
                Suman started by teaching soft toy-making to her community — no fees, no expectations, just a desire to give. Over time, her warmth built a network that grew beyond anything she imagined. In 2019, a chapter as a professional chef at IFB opened new doors and reshaped her perspective. Today, armed with an M.Sc. in Botany and a Diploma of Pharmacy, she channels science and soul into every class, every craft, every student she touches.
              </p>

              {/* Stats chips */}
              <div className="fj-chips">
                {CHIPS.map((c, i) => (
                  <div key={i} className="fj-chip">
                    <span className="fj-chip-val">{c.val}</span>
                    <span className="fj-chip-label">{c.label}</span>
                  </div>
                ))}
              </div>

              <a href="#" className="fj-cta">
                Read the Full Journey
                <span className="fj-cta-arrow">→</span>
              </a>
            </div>

            {/* RIGHT: Image */}
            <div ref={panelRef} className={`fj-right ${panelIn ? "fj-in" : ""}`}>
              <div className="fj-img-stage">
                <div className="fj-img-deco" />
                <div className="fj-img-box">
                  <img
                    key={cur.img}
                    src={cur.img}
                    alt={cur.label}
                    className={`fj-img ${imgLoaded ? "fj-img-loaded" : "fj-img-loading"}`}
                    onLoad={() => setImgLoaded(true)}
                  />
                  <div className="fj-img-gradient" />
                  <div className="fj-img-caption">
                    <div className="fj-img-caption-year">{cur.year}</div>
                    <div className="fj-img-caption-title">{cur.label}</div>
                    <div className="fj-img-caption-blurb">{cur.blurb}</div>
                  </div>
                </div>
                <div className="fj-img-badge">
                  <div className="fj-img-badge-num">5K+</div>
                  <div className="fj-img-badge-text">Lives<br />Touched</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline dots */}
          <div className={`fj-timeline ${secIn ? "fj-in" : ""}`}>
            {MILESTONES.map((m, i) => (
              <MilestoneCard
                key={i}
                m={m}
                idx={i}
                active={active === i}
                total={MILESTONES.length}
                onClick={() => handleSelect(i)}
              />
            ))}
          </div>

          {/* Mobile-only: active milestone blurb */}
          <div className="fj-mobile-blurb">
            <span style={{ color: "var(--sand)", marginRight: 6, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
              {cur.year} —
            </span>
            {cur.blurb}
          </div>

          {/* Quote band */}
          <div ref={quoteRef} className={`fj-quote-band ${quoteIn ? "fj-in" : ""}`}>
            <p className="fj-quote-text">
              "Her creative mindset and strong dedication continue to inspire —
              because <em>Kalasrijan</em> was never just a school.
              It was always a community where passion meets practice."
            </p>
            <p className="fj-quote-attr">— The Kalasrijan Story</p>
          </div>

        </div>
      </section>
    </>
  );
}