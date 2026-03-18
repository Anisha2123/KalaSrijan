"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */
const FEATURED = [
  {
    id: 1, num: "01", title: "Hand Painting",
    subtitle: "Wearable Canvas Art", icon: "🎨",
    highlight: "₹1,500 / piece",
    img: "/classes/image.png",
    tagColor: "#CD2C58",
    size: "tall",
    desc: "Each garment becomes a masterpiece — vivid pigments, signature outlines, pure artistry.",
  },
  {
    id: 2, num: "02", title: "Thermacol Art",
    subtitle: "Sculptural Event Décor", icon: "🏛️",
    highlight: "From ₹1,000",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&auto=format&fit=crop",
    tagColor: "#E06B80",
    size: "short",
    desc: "Grand statues, monuments & wedding trays shaped in lightweight Thermacol.",
  },
  {
    id: 3, num: "03", title: "Fancy Dress",
    subtitle: "Costume Design End-to-End", icon: "✂️",
    highlight: "₹1,000 – ₹5,000",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop",
    tagColor: "#CD2C58",
    size: "short",
    desc: "Complete costume creation with matching props for every little star.",
  },
  {
    id: 4, num: "04", title: "School Projects",
    subtitle: "Models, STEM & B.Ed", icon: "🔬",
    highlight: "From ₹300",
    img: "https://images.unsplash.com/photo-1532094349884-543559822d54?w=700&auto=format&fit=crop",
    tagColor: "#E06B80",
    size: "tall",
    desc: "Working models, robotic projects, STEM displays — every concept brought to life.",
  },
  {
    id: 5, num: "05", title: "Wedding Hampers",
    subtitle: "Packing & Platters", icon: "🎁",
    highlight: "Made to order",
    img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=700&auto=format&fit=crop",
    tagColor: "#CD2C58",
    size: "wide",
    desc: "Curated platters and hampers for Haldi, gifting & every cherished occasion.",
  },
  {
    id: 6, num: "06", title: "Card Decoration",
    subtitle: "Themed Invitation Art", icon: "💌",
    highlight: "₹500 / card",
    img: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=700&auto=format&fit=crop",
    tagColor: "#E06B80",
    size: "small",
    desc: "Customized wedding & event card decorations aligned to your theme.",
  },
  {
    id: 7, num: "07", title: "Custom Event Décor",
    subtitle: "Tailored Theme Elements", icon: "✨",
    highlight: "From ₹1,000",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&auto=format&fit=crop",
    tagColor: "#CD2C58",
    size: "small",
    desc: "Bespoke décor pieces designed specifically for your event's theme.",
  },
];

/* ─────────────────────────────────────
   HOOK
───────────────────────────────────── */
function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, inView: v };
}

/* ─────────────────────────────────────
   RESPONSIVE HOOK
───────────────────────────────────── */
function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      if (w < 768) setBp("mobile");
      else if (w < 1100) setBp("tablet");
      else setBp("desktop");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

/* ─────────────────────────────────────
   BENTO CARD
───────────────────────────────────── */
function BentoCard({
  s, idx, colSpan = 1, rowSpan = 1, forceExpanded = false,
}: {
  s: typeof FEATURED[0];
  idx: number;
  colSpan?: number;
  rowSpan?: number;
  forceExpanded?: boolean;
}) {
  const { ref, inView } = useInView(0.04);
  const [hov, setHov] = useState(false);
  // On mobile we show desc always (tap UX)
  const isActive = hov || forceExpanded;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        cursor: "pointer",
        background: "#2a1018",
        minHeight: rowSpan === 2 ? 420 : 210,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity .75s ease ${idx * 0.07}s, transform .75s ease ${idx * 0.07}s, box-shadow .3s ease`,
        boxShadow: hov
          ? "0 28px 72px rgba(42,16,24,.35), 0 4px 20px rgba(205,44,88,.16)"
          : "0 4px 24px rgba(42,16,24,.18)",
      }}
    >
      {/* Background image */}
      <img
        src={s.img}
        alt={s.title}
        loading="lazy"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", display: "block",
          transition: "transform .7s ease",
          transform: hov ? "scale(1.09)" : "scale(1.0)",
        }}
      />

      {/* Base gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(42,16,24,0.90) 0%, rgba(42,16,24,0.32) 55%, rgba(42,16,24,0.08) 100%)",
        zIndex: 1,
      }} />

      {/* Hover colour wash */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(135deg, ${s.tagColor}33 0%, transparent 70%)`,
        opacity: isActive ? 1 : 0,
        transition: "opacity .35s ease",
      }} />

      {/* Top-left badge */}
      <div style={{
        position: "absolute", top: 14, left: 14, zIndex: 4,
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(255,255,255,0.10)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 100,
        padding: "4px 12px 4px 10px",
      }}>
        <span style={{ fontSize: "1rem" }}>{s.icon}</span>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: ".62rem", letterSpacing: ".12em",
          textTransform: "uppercase", color: "rgba(255,230,212,.70)",
          fontWeight: 500,
        }}>{s.num}</span>
      </div>

      {/* Price badge */}
      <div style={{
        position: "absolute", top: 14, right: 14, zIndex: 4,
        background: s.tagColor,
        color: "#fff", borderRadius: 100,
        padding: "5px 13px",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.90rem", fontWeight: 600,
        boxShadow: `0 4px 16px ${s.tagColor}55`,
        opacity: isActive ? 1 : 0.80,
        transition: "opacity .3s, transform .3s",
        transform: isActive ? "translateY(0) scale(1.04)" : "translateY(4px) scale(1)",
      }}>
        {s.highlight}
      </div>

      {/* Content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "18px 18px 20px",
        zIndex: 3,
        transform: isActive ? "translateY(0)" : "translateY(6px)",
        transition: "transform .35s ease",
      }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: rowSpan === 2 ? "clamp(1.4rem,2.2vw,2.2rem)" : "1.18rem",
          fontWeight: 400, color: "#fff",
          lineHeight: 1.1, marginBottom: 4,
        }}>{s.title}</h3>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: ".63rem", letterSpacing: ".13em",
          textTransform: "uppercase", color: s.tagColor,
          fontWeight: 500, marginBottom: isActive ? 10 : 0,
          transition: "margin .3s",
        }}>{s.subtitle}</p>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: ".82rem", color: "rgba(255,230,212,.72)",
          fontWeight: 300, lineHeight: 1.65,
          maxHeight: isActive ? "80px" : "0px",
          overflow: "hidden",
          opacity: isActive ? 1 : 0,
          transition: "max-height .38s ease, opacity .32s ease",
        }}>{s.desc}</p>

        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          marginTop: isActive ? 12 : 0,
          maxHeight: isActive ? "32px" : "0px",
          overflow: "hidden",
          opacity: isActive ? 1 : 0,
          transition: "max-height .38s ease .05s, opacity .32s ease .05s, margin .32s ease",
        }}>
          <span style={{
            width: 24, height: 24,
            borderRadius: "50%", background: s.tagColor,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: ".72rem", color: "#fff", flexShrink: 0,
          }}>→</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: ".72rem", fontWeight: 500,
            color: "rgba(255,230,212,.70)",
            letterSpacing: ".06em", textTransform: "uppercase",
          }}>Enquire Now</span>
        </div>
      </div>

      {/* Corner accent */}
      <div style={{
        position: "absolute", bottom: 14, right: 14, zIndex: 4,
        width: 16, height: 16,
        borderBottom: `1.5px solid ${s.tagColor}80`,
        borderRight: `1.5px solid ${s.tagColor}80`,
        borderRadius: "0 0 5px 0",
        opacity: isActive ? 1 : 0,
        transition: "opacity .3s",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────
   MOBILE CARD — compact square, text over image, 2-per-row
───────────────────────────────────── */
function MobileCard({ s, idx }: { s: typeof FEATURED[0]; idx: number }) {
  const { ref, inView } = useInView(0.04);
  const [tapped, setTapped] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() => setTapped(t => !t)}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        background: "#2a1018",
        aspectRatio: "3 / 4",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.96)",
        transition: `opacity .55s ease ${idx * 0.05}s, transform .55s ease ${idx * 0.05}s`,
        boxShadow: tapped
          ? "0 12px 36px rgba(42,16,24,.30)"
          : "0 3px 14px rgba(42,16,24,.18)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Full bg image */}
      <img
        src={s.img} alt={s.title} loading="lazy"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          transform: tapped ? "scale(1.07)" : "scale(1)",
          transition: "transform .5s ease",
        }}
      />

      {/* Base dark gradient from bottom */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(42,16,24,0.92) 0%, rgba(42,16,24,0.38) 55%, rgba(42,16,24,0.10) 100%)",
        zIndex: 1,
      }} />

      {/* Colour wash on tap */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(160deg, ${s.tagColor}44 0%, transparent 65%)`,
        opacity: tapped ? 1 : 0,
        transition: "opacity .3s",
      }} />

      {/* Top-left icon + number */}
      <div style={{
        position: "absolute", top: 10, left: 10, zIndex: 4,
        display: "flex", alignItems: "center", gap: 4,
        background: "rgba(255,255,255,0.10)", backdropFilter: "blur(6px)",
        border: "1px solid rgba(255,255,255,0.14)",
        borderRadius: 100, padding: "3px 8px 3px 7px",
      }}>
        <span style={{ fontSize: ".80rem" }}>{s.icon}</span>
        <span style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: ".50rem",
          letterSpacing: ".10em", textTransform: "uppercase",
          color: "rgba(255,230,212,.65)", fontWeight: 500,
        }}>{s.num}</span>
      </div>

      {/* Price pill — top right */}
      <div style={{
        position: "absolute", top: 10, right: 10, zIndex: 4,
        background: s.tagColor, color: "#fff",
        borderRadius: 100, padding: "3px 9px",
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: ".72rem", fontWeight: 600,
        opacity: tapped ? 1 : 0.82,
        transition: "opacity .3s",
      }}>{s.highlight}</div>

      {/* Bottom content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "10px 11px 12px",
        zIndex: 3,
      }}>
        <p style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: ".52rem", letterSpacing: ".11em",
          textTransform: "uppercase", color: s.tagColor,
          fontWeight: 500, marginBottom: 3, lineHeight: 1,
        }}>{s.subtitle}</p>

        <h3 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "1.05rem", fontWeight: 400,
          color: "#fff", lineHeight: 1.15, marginBottom: 0,
        }}>{s.title}</h3>

        {/* Enquire nudge on tap */}
        <div style={{
          maxHeight: tapped ? "28px" : "0",
          overflow: "hidden", opacity: tapped ? 1 : 0,
          transition: "max-height .3s ease, opacity .25s ease",
          marginTop: tapped ? 6 : 0,
        }}>
          <span style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: ".60rem", fontWeight: 500,
            color: "rgba(255,230,212,.75)",
            letterSpacing: ".07em", textTransform: "uppercase",
          }}>Enquire →</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────── */
export default function FeaturedServices() {
  const { ref: headRef, inView: headIn } = useInView(0.05);
  const { ref: ctaRef,  inView: ctaIn  } = useInView(0.06);
  const bp = useBreakpoint();

  const isMobile = bp === "mobile";
  const isTablet = bp === "tablet";
  const isDesktop = bp === "desktop";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fsBlob    { from{transform:translate(0,0) scale(1)} to{transform:translate(20px,16px) scale(1.04)} }
        @keyframes fsFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fsFadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fsPulse   { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
        @keyframes fsRotate  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fsMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .fs-section {
          background: #fff8f4;
          font-family: 'DM Sans', sans-serif;
          position: relative; overflow: hidden;
          padding: 104px 0 96px;
        }
        .fs-blob { position:absolute; border-radius:50%; pointer-events:none; z-index:0; }

        /* ══ DESKTOP BENTO (≥1100px) — UNTOUCHED ══ */
        .fs-bento-desktop {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 210px;
          gap: 14px;
        }

        /* ══ TABLET BENTO (768–1099px) ══ */
        .fs-bento-tablet {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 200px;
          gap: 12px;
        }
        /* Force all tablet cards to span 1×1 */
        .fs-bento-tablet > * {
          grid-column: span 1 !important;
          grid-row: span 1 !important;
          min-height: 200px !important;
        }

        /* ══ MOBILE STACK ══ */
        .fs-mobile-stack {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
        }

        /* ── Ticker ── */
        .fs-ticker {
          overflow: hidden; margin-top: 14px;
          padding: 10px 0;
          border-top: 1px solid rgba(205,44,88,.12);
          border-bottom: 1px solid rgba(205,44,88,.12);
        }
        .fs-ticker-track {
          display: flex; width: max-content;
          animation: fsMarquee 18s linear infinite;
        }
        .fs-ticker-track:hover { animation-play-state: paused; }
        .fs-ticker-item {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 0 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; letter-spacing: .16em;
          text-transform: uppercase;
          color: rgba(205,44,88,.45); font-weight: 500;
          white-space: nowrap;
        }
        .fs-ticker-dot { width:4px; height:4px; border-radius:50%; background:#E06B80; flex-shrink:0; }

        /* ── CTA buttons ── */
        .fs-cta-btn {
          display: inline-flex; align-items: center; gap: 14px;
          background: #2a1018; color: #fff;
          padding: 18px 40px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: .92rem; font-weight: 500;
          letter-spacing: .04em; text-decoration: none;
          box-shadow: 0 10px 36px rgba(42,16,24,.28);
          transition: background .25s, transform .25s, box-shadow .25s;
          position: relative; overflow: hidden;
          white-space: nowrap;
        }
        .fs-cta-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #CD2C58, #E06B80);
          opacity: 0; transition: opacity .3s;
        }
        .fs-cta-btn:hover::before { opacity: 1; }
        .fs-cta-btn:hover { transform: translateY(-3px); box-shadow: 0 18px 48px rgba(42,16,24,.32); }
        .fs-cta-btn-text { position: relative; z-index: 1; }
        .fs-cta-btn-icon {
          position: relative; z-index: 1;
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,.12);
          display: flex; align-items: center; justify-content: center;
          font-size: .88rem; transition: transform .25s;
        }
        .fs-cta-btn:hover .fs-cta-btn-icon { transform: translateX(5px); }

        .fs-ghost-btn {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1.5px solid rgba(205,44,88,.28);
          color: #CD2C58; padding: 18px 32px; border-radius: 100px;
          background: transparent; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem; font-weight: 500;
          letter-spacing: .04em; text-decoration: none;
          transition: all .25s; white-space: nowrap;
        }
        .fs-ghost-btn:hover { background: rgba(205,44,88,.06); border-color: #CD2C58; transform: translateY(-2px); }

        .fs-ring {
          position: absolute; border-radius: 50%;
          border: 1px dashed rgba(205,44,88,.15);
          pointer-events: none;
        }

        /* ══ TABLET OVERRIDES ══ */
        @media (max-width: 1099px) {
          .fs-section { padding: 72px 0 72px }
          .fs-inner   { padding: 0 28px !important }

          /* Header: stack vertically */
          .fs-header  { flex-direction: column !important; align-items: flex-start !important; gap: 24px !important }
          .fs-header-right { align-items: flex-start !important }

          /* CTA: allow wrapping neatly */
          .fs-cta-row { justify-content: flex-start !important }

          /* Rings: smaller so they don't bleed */
          .fs-ring-lg { width: 180px !important; height: 180px !important }
          .fs-ring-sm { width: 110px !important; height: 110px !important }
        }

        /* ══ MOBILE OVERRIDES ══ */
        @media (max-width: 767px) {
          .fs-section { padding: 52px 0 56px }
          .fs-inner   { padding: 0 16px !important }

          .fs-cta-btn  { padding: 15px 28px; font-size: .85rem; width: 100%; justify-content: center }
          .fs-ghost-btn{ padding: 15px 24px; font-size: .82rem; width: 100%; justify-content: center }

          .fs-cta-row  { flex-direction: column !important; gap: 10px !important; align-items: stretch !important }
          .fs-cta-quote{ max-width: 100% !important }

          /* hide decorative rings on mobile */
          .fs-ring { display: none }

          /* header count: left-align, smaller  */
          .fs-count-num { font-size: clamp(2.2rem,10vw,3.5rem) !important }

          /* ticker: slower on mobile */
          .fs-ticker-track { animation-duration: 24s }
        }
      `}</style>

      <section className="fs-section">

        {/* Ambient blobs */}
        <div className="fs-blob" style={{ width:620, height:620, background:"radial-gradient(circle,rgba(255,198,157,.16) 0%,transparent 65%)", top:-180, right:-200, animation:"fsBlob 16s ease-in-out infinite alternate" }} />
        <div className="fs-blob" style={{ width:460, height:460, background:"radial-gradient(circle,rgba(205,44,88,.07) 0%,transparent 65%)", bottom:-100, left:-140, animation:"fsBlob 13s ease-in-out infinite alternate" }} />

        {/* Decorative rings — hidden on mobile via CSS */}
        <div className="fs-ring fs-ring-lg" style={{ width:300, height:300, top:"5%", right:"3%", animation:"fsRotate 40s linear infinite" }} />
        <div className="fs-ring fs-ring-sm" style={{ width:180, height:180, bottom:"10%", left:"2%", animation:"fsRotate 28s linear infinite reverse" }} />

        <div className="fs-inner" style={{ maxWidth:1240, margin:"0 auto", padding:"0 36px", position:"relative", zIndex:1 }}>

          {/* ── HEADER ── */}
          <div
            ref={headRef}
            className="fs-header"
            style={{
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              gap: 32, flexWrap: "wrap", marginBottom: isMobile ? 32 : 52,
              opacity: headIn ? 1 : 0,
              transform: headIn ? "translateY(0)" : "translateY(22px)",
              transition: "opacity .9s ease, transform .9s ease",
            }}
          >
            {/* Left text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:12, fontSize:11, letterSpacing:".20em", textTransform:"uppercase", color:"#CD2C58", fontWeight:500, marginBottom:18 }}>
                <div style={{ width:40, height:1, background:"linear-gradient(90deg,#CD2C58,transparent)" }} />
                What We Offer
                <div style={{ width:40, height:1, background:"linear-gradient(270deg,#CD2C58,transparent)" }} />
              </div>

              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,4.8vw,4.8rem)", fontWeight:300, lineHeight:1.06, color:"#2a1018", marginBottom:14 }}>
                Services crafted<br />
                with <em style={{ fontStyle:"italic", color:"#CD2C58" }}>love & skill</em>
              </h2>

              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize: isMobile ? ".92rem" : "1rem", color:"#7a4a55", fontWeight:300, lineHeight:1.75, maxWidth:440 }}>
                From hand-painted garments to sculptural décor — Suman Jain's artistry transforms every occasion into something unforgettable.
              </p>
            </div>

            {/* Right — count */}
            <div className="fs-header-right" style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:16, flexShrink:0 }}>
              <div style={{ position:"relative", paddingRight: isDesktop ? 28 : 0 }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
                  <span className="fs-count-num" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(3rem,5vw,5.5rem)", fontWeight:600, color:"#2a1018", lineHeight:1 }}>07</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".75rem", letterSpacing:".12em", textTransform:"uppercase", color:"#7a4a55", fontWeight:400 }}>Services<br/>Available</span>
                </div>
                <div style={{ width:"100%", height:2, background:"linear-gradient(90deg,#CD2C58,#E06B80)", borderRadius:2, marginTop:6 }} />
              </div>
              <a href="#services" style={{ display:"inline-flex", alignItems:"center", gap:8, fontFamily:"'DM Sans',sans-serif", fontSize:".80rem", fontWeight:500, color:"#CD2C58", textDecoration:"none", letterSpacing:".04em", transition:"gap .22s" }}
                onMouseEnter={e => (e.currentTarget.style.gap = "14px")}
                onMouseLeave={e => (e.currentTarget.style.gap = "8px")}
              >
                Browse all services →
              </a>
            </div>
          </div>

          {/* ── GRID / LIST ── */}

          {/* DESKTOP: original bento with full colspan/rowspan */}
          {isDesktop && (
            <div className="fs-bento-desktop" style={{ position:"relative" }}>
              <BentoCard s={FEATURED[0]} idx={0} colSpan={1} rowSpan={2} />
              <BentoCard s={FEATURED[1]} idx={1} colSpan={1} rowSpan={1} />
              <BentoCard s={FEATURED[2]} idx={2} colSpan={1} rowSpan={1} />
              <BentoCard s={FEATURED[3]} idx={3} colSpan={1} rowSpan={2} />
              <BentoCard s={FEATURED[4]} idx={4} colSpan={2} rowSpan={1} />
              <BentoCard s={FEATURED[5]} idx={5} colSpan={1} rowSpan={1} />
              <BentoCard s={FEATURED[6]} idx={6} colSpan={1} rowSpan={1} />

              {/* "And more" teaser */}
              <div style={{
                gridColumn: "span 2", borderRadius:22,
                border:"1.5px dashed rgba(205,44,88,.25)",
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10,
                background:"rgba(255,255,255,.50)", backdropFilter:"blur(8px)",
                cursor:"pointer", transition:"background .3s, border-color .3s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(205,44,88,.05)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(205,44,88,.45)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.50)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(205,44,88,.25)"; }}
                onClick={() => window.location.href="#services"}
              >
                {[0,60,120,180,240,300].map((deg,i)=>(
                  <div key={i} style={{ position:"absolute", width:5, height:5, borderRadius:"50%", background:i%2===0?"#CD2C58":"#E06B80", opacity:.35, top:`calc(50% + ${Math.sin(deg*Math.PI/180)*54}px)`, left:`calc(50% + ${Math.cos(deg*Math.PI/180)*54}px)`, transform:"translate(-50%,-50%)", animation:`fsPulse ${2+i*.3}s ease-in-out ${i*.2}s infinite` }}/>
                ))}
                <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,rgba(205,44,88,.12),rgba(255,198,157,.20))", border:"1px solid rgba(205,44,88,.22)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", animation:"fsFloat 3s ease-in-out infinite" }}>+</div>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.25rem", fontWeight:400, color:"#2a1018", lineHeight:1.2 }}>& more services</p>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".72rem", color:"#7a4a55", fontWeight:300, letterSpacing:".06em" }}>View all 7 offerings →</p>
              </div>
            </div>
          )}

          {/* TABLET: 2-col bento, all cards 1×1 */}
          {isTablet && (
            <div className="fs-bento-tablet">
              {FEATURED.map((s, i) => (
                <BentoCard key={s.id} s={s} idx={i} colSpan={1} rowSpan={1} />
              ))}
              {/* Teaser tile spanning 2 cols on tablet */}
              <div style={{
                gridColumn:"span 2", borderRadius:18,
                border:"1.5px dashed rgba(205,44,88,.25)",
                minHeight: 90,
                display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:20,
                background:"rgba(255,255,255,.55)", backdropFilter:"blur(8px)",
                cursor:"pointer", padding:"0 28px",
                transition:"background .3s, border-color .3s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(205,44,88,.05)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(205,44,88,.40)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.55)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(205,44,88,.25)"; }}
                onClick={() => window.location.href="#services"}
              >
                <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,rgba(205,44,88,.14),rgba(255,198,157,.22))", border:"1px solid rgba(205,44,88,.22)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", animation:"fsFloat 3s ease-in-out infinite", flexShrink:0 }}>+</div>
                <div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", fontWeight:400, color:"#2a1018" }}>Discover all 7 services</p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".70rem", color:"#7a4a55", fontWeight:300 }}>View full catalogue →</p>
                </div>
              </div>
            </div>
          )}

          {/* MOBILE: horizontal card list */}
          {isMobile && (
            <>
              <div className="fs-mobile-stack">
                {FEATURED.map((s, i) => (
                  <MobileCard key={s.id} s={s} idx={i} />
                ))}
                {/* Teaser — spans both columns */}
                <div
                  onClick={() => window.location.href="#services"}
                  style={{
                    gridColumn: "span 2",
                    borderRadius: 14,
                    border: "1.5px dashed rgba(205,44,88,.28)",
                    padding: "14px 16px",
                    display: "flex", alignItems: "center", gap: 12,
                    background: "rgba(255,255,255,.60)", backdropFilter: "blur(8px)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,rgba(205,44,88,.14),rgba(255,198,157,.20))", border:"1px solid rgba(205,44,88,.22)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", animation:"fsFloat 3s ease-in-out infinite", flexShrink:0 }}>+</div>
                  <div>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:".95rem", fontWeight:400, color:"#2a1018", marginBottom:1 }}>& more services available</p>
                    <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".62rem", color:"#CD2C58", fontWeight:500, letterSpacing:".06em" }}>View all 7 offerings →</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── TICKER ── */}
          <div className="fs-ticker">
            <div className="fs-ticker-track">
              {[...FEATURED, ...FEATURED].map((s, i) => (
                <span key={i} className="fs-ticker-item">
                  <span className="fs-ticker-dot" />
                  {s.title}
                </span>
              ))}
            </div>
          </div>

          {/* ── CTA ROW ── */}
          <div
            ref={ctaRef}
            className="fs-cta-row"
            style={{
              marginTop: isMobile ? 36 : 52,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 28, flexWrap: "wrap",
              opacity: ctaIn ? 1 : 0,
              transform: ctaIn ? "translateY(0)" : "translateY(22px)",
              transition: "opacity .9s ease, transform .9s ease",
            }}
          >
            {/* Quote */}
            <div className="fs-cta-quote" style={{ maxWidth: 460 }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"clamp(.95rem,1.6vw,1.4rem)", fontWeight:300, color:"#7a4a55", lineHeight:1.65, marginBottom:8 }}>
                "From a single hand-painted saree to a full wedding hamper — every service is delivered with the same signature care."
              </p>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".68rem", letterSpacing:".12em", textTransform:"uppercase", color:"rgba(205,44,88,.50)", fontWeight:500 }}>
                — Suman Jain, Kalasrijan
              </span>
            </div>

            {/* Buttons */}
            <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap", flex: isMobile ? "1 1 100%" : "unset" }}>
              <a href="#services" className="fs-cta-btn">
                <span className="fs-cta-btn-text">Explore All Services</span>
                <div className="fs-cta-btn-icon">→</div>
              </a>
              <a href="#contact" className="fs-ghost-btn">
                Get a Quote
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}