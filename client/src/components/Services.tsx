"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────
   TEASER DATA — 6 featured services
───────────────────────────────────── */
const FEATURED = [
  {
    id: 1, num: "01", title: "Hand Painting",
    subtitle: "Wearable Canvas Art", icon: "🎨",
    highlight: "₹1,500 / piece",
    img: "/classes/image.png",
    tagColor: "#CD2C58",
    size: "tall",           // bento sizing hint
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
   BENTO CARD
───────────────────────────────────── */
function BentoCard({
  s, idx, colSpan = 1, rowSpan = 1,
}: {
  s: typeof FEATURED[0];
  idx: number;
  colSpan?: number;
  rowSpan?: number;
}) {
  const { ref, inView } = useInView(0.04);
  const [hov, setHov] = useState(false);

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
        transition: `opacity .75s ease ${idx * 0.07}s, transform .75s ease ${idx * 0.07}s,
                     box-shadow .3s ease`,
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

      {/* Base gradient overlay — always visible, darkens bottom */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(42,16,24,0.88) 0%, rgba(42,16,24,0.30) 50%, rgba(42,16,24,0.08) 100%)",
        zIndex: 1,
      }} />

      {/* Hover colour wash */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(135deg, ${s.tagColor}33 0%, transparent 70%)`,
        opacity: hov ? 1 : 0,
        transition: "opacity .35s ease",
      }} />

      {/* Top-left number badge */}
      <div style={{
        position: "absolute", top: 16, left: 16, zIndex: 4,
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

      {/* Price badge — top right */}
      <div style={{
        position: "absolute", top: 16, right: 16, zIndex: 4,
        background: s.tagColor,
        color: "#fff", borderRadius: 100,
        padding: "5px 13px",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "0.90rem", fontWeight: 600,
        boxShadow: `0 4px 16px ${s.tagColor}55`,
        opacity: hov ? 1 : 0.75,
        transition: "opacity .3s, transform .3s",
        transform: hov ? "translateY(0) scale(1.04)" : "translateY(4px) scale(1)",
      }}>
        {s.highlight}
      </div>

      {/* Content — slides up on hover */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "20px 20px 22px",
        zIndex: 3,
        transform: hov ? "translateY(0)" : "translateY(6px)",
        transition: "transform .35s ease",
      }}>
        {/* Title */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: rowSpan === 2 ? "clamp(1.6rem,2.2vw,2.2rem)" : "1.25rem",
          fontWeight: 400, color: "#fff",
          lineHeight: 1.1, marginBottom: 4,
        }}>{s.title}</h3>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: ".65rem", letterSpacing: ".13em",
          textTransform: "uppercase", color: s.tagColor,
          fontWeight: 500, marginBottom: hov ? 10 : 0,
          transition: "margin .3s",
        }}>{s.subtitle}</p>

        {/* Description — revealed on hover */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: ".82rem", color: "rgba(255,230,212,.72)",
          fontWeight: 300, lineHeight: 1.65,
          maxHeight: hov ? "80px" : "0px",
          overflow: "hidden",
          opacity: hov ? 1 : 0,
          transition: "max-height .38s ease, opacity .32s ease",
        }}>{s.desc}</p>

        {/* Enquire nudge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          marginTop: hov ? 12 : 0,
          maxHeight: hov ? "32px" : "0px",
          overflow: "hidden",
          opacity: hov ? 1 : 0,
          transition: "max-height .38s ease .05s, opacity .32s ease .05s, margin .32s ease",
        }}>
          <span style={{
            display: "inline-block", width: 24, height: 24,
            borderRadius: "50%", background: s.tagColor,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: ".72rem", color: "#fff",
          }}>→</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: ".72rem", fontWeight: 500,
            color: "rgba(255,230,212,.70)",
            letterSpacing: ".06em", textTransform: "uppercase",
          }}>Enquire Now</span>
        </div>
      </div>

      {/* Bottom-right corner accent */}
      <div style={{
        position: "absolute", bottom: 14, right: 14, zIndex: 4,
        width: 16, height: 16,
        borderBottom: `1.5px solid ${s.tagColor}80`,
        borderRight: `1.5px solid ${s.tagColor}80`,
        borderRadius: "0 0 5px 0",
        opacity: hov ? 1 : 0,
        transition: "opacity .3s",
      }} />
    </div>
  );
}

/* ─────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────── */
export default function FeaturedServices() {
  const { ref: headRef, inView: headIn } = useInView(0.05);
  const { ref: ctaRef,  inView: ctaIn  } = useInView(0.06);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fsBlob { from{transform:translate(0,0) scale(1)} to{transform:translate(20px,16px) scale(1.04)} }
        @keyframes fsFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fsFadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fsPulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
        @keyframes fsRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fsMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .fs-section {
          background: #fff8f4;
          font-family: 'DM Sans', sans-serif;
          position: relative; overflow: hidden;
          padding: 104px 0 96px;
        }

        /* ambient blobs */
        .fs-blob { position:absolute; border-radius:50%; pointer-events:none; z-index:0; }

        /* grid */
        .fs-bento {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 210px;
          gap: 14px;
        }

        /* Floating count badge */
        .fs-count-badge {
          position: absolute;
          top: -22px; right: -18px;
          width: 56px; height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #CD2C58 0%, #E06B80 100%);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          flex-direction: column;
          box-shadow: 0 6px 22px rgba(205,44,88,.38);
          animation: fsFloat 4s ease-in-out infinite;
          z-index: 5;
          border: 2px solid rgba(255,255,255,0.30);
        }
        .fs-count-n {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-weight: 600; line-height: 1;
        }
        .fs-count-l {
          font-family: 'DM Sans', sans-serif;
          font-size: .46rem; letter-spacing: .10em;
          text-transform: uppercase; opacity: .80;
        }

        /* "See all services" ticker */
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
        .fs-ticker-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #E06B80; flex-shrink: 0;
        }

        /* CTA button */
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
        }
        .fs-cta-btn::before {
          content: '';
          position: absolute; inset: 0;
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

        /* Ghost secondary */
        .fs-ghost-btn {
          display: inline-flex; align-items: center; gap: 10px;
          border: 1.5px solid rgba(205,44,88,.28);
          color: #CD2C58; padding: 18px 32px; border-radius: 100px;
          background: transparent; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem; font-weight: 500;
          letter-spacing: .04em; text-decoration: none;
          transition: all .25s;
        }
        .fs-ghost-btn:hover {
          background: rgba(205,44,88,.06);
          border-color: #CD2C58; transform: translateY(-2px);
        }

        /* Decorative rotating ring */
        .fs-ring {
          position: absolute; border-radius: 50%;
          border: 1px dashed rgba(205,44,88,.15);
          pointer-events: none;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .fs-bento { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 760px) {
          .fs-bento { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; }
          .fs-section { padding: 72px 0 72px; }
        }
        @media (max-width: 480px) {
          .fs-bento { grid-template-columns: 1fr; grid-auto-rows: 200px; gap: 10px; }
        }
      `}</style>

      <section className="fs-section">

        {/* Ambient blobs */}
        <div className="fs-blob" style={{ width:620, height:620, background:"radial-gradient(circle,rgba(255,198,157,.16) 0%,transparent 65%)", top:-180, right:-200, animation:"fsBlob 16s ease-in-out infinite alternate" }} />
        <div className="fs-blob" style={{ width:460, height:460, background:"radial-gradient(circle,rgba(205,44,88,.07) 0%,transparent 65%)", bottom:-100, left:-140, animation:"fsBlob 13s ease-in-out infinite alternate" }} />

        {/* Rotating decorative rings */}
        <div className="fs-ring" style={{ width:300, height:300, top:"5%", right:"3%", animation:"fsRotate 40s linear infinite" }} />
        <div className="fs-ring" style={{ width:180, height:180, bottom:"10%", left:"2%", animation:"fsRotate 28s linear infinite reverse" }} />

        <div style={{ maxWidth:1240, margin:"0 auto", padding:"0 36px", position:"relative", zIndex:1 }}>

          {/* ── HEADER ── */}
          <div ref={headRef} style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            gap: 32, flexWrap: "wrap", marginBottom: 52,
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(22px)",
            transition: "opacity .9s ease, transform .9s ease",
          }}>
            <div>
              {/* Eyebrow */}
              <div style={{ display:"inline-flex", alignItems:"center", gap:12, fontSize:11, letterSpacing:".20em", textTransform:"uppercase", color:"#CD2C58", fontWeight:500, marginBottom:18 }}>
                <div style={{ width:40, height:1, background:"linear-gradient(90deg,#CD2C58,transparent)" }} />
                What We Offer
                <div style={{ width:40, height:1, background:"linear-gradient(270deg,#CD2C58,transparent)" }} />
              </div>

              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.6rem,4.8vw,4.8rem)", fontWeight:300, lineHeight:1.06, color:"#2a1018", marginBottom:14 }}>
                Services crafted<br />
                with <em style={{ fontStyle:"italic", color:"#CD2C58" }}>love & skill</em>
              </h2>

              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"1rem", color:"#7a4a55", fontWeight:300, lineHeight:1.75, maxWidth:440 }}>
                From hand-painted garments to sculptural décor — Suman Jain's artistry transforms every occasion into something unforgettable.
              </p>
            </div>

            {/* Right — count + quick link */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:16, flexShrink:0 }}>
              <div style={{ position:"relative", paddingRight:28 }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(3rem,5vw,5.5rem)", fontWeight:600, color:"#2a1018", lineHeight:1 }}>07</span>
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

          {/* ── BENTO GRID ── */}
          {/* Layout:
              Row 1: [tall span-1 row-2] [short] [short] [tall span-1 row-2]
              Row 2:                      [wide span-2]
              Row 3: [small] [small] ...
          */}
          <div className="fs-bento" style={{ position:"relative" }}>

            {/* 1 — Hand Painting — tall, 2 rows */}
            <BentoCard s={FEATURED[0]} idx={0} colSpan={1} rowSpan={2} />

            {/* 2 — Thermacol Art — short */}
            <BentoCard s={FEATURED[1]} idx={1} colSpan={1} rowSpan={1} />

            {/* 3 — Fancy Dress — short */}
            <BentoCard s={FEATURED[2]} idx={2} colSpan={1} rowSpan={1} />

            {/* 4 — School Projects — tall, 2 rows (last col) */}
            <BentoCard s={FEATURED[3]} idx={3} colSpan={1} rowSpan={2} />

            {/* 5 — Wedding Hampers — wide, cols 2-3 */}
            <BentoCard s={FEATURED[4]} idx={4} colSpan={2} rowSpan={1} />

            {/* 6 — Card Decoration — small */}
            <BentoCard s={FEATURED[5]} idx={5} colSpan={1} rowSpan={1} />

            {/* 7 — Custom Decor — small */}
            <BentoCard s={FEATURED[6]} idx={6} colSpan={1} rowSpan={1} />

            {/* "And more..." teaser tile */}
            <div style={{
              gridColumn: "span 2",
              borderRadius: 22,
              border: "1.5px dashed rgba(205,44,88,.25)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 10,
              background: "rgba(255,255,255,.50)",
              backdropFilter: "blur(8px)",
              position: "relative", overflow: "hidden",
              cursor: "pointer",
              transition: "background .3s, border-color .3s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(205,44,88,.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,44,88,.45)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.50)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(205,44,88,.25)";
              }}
              onClick={() => window.location.href = "#services"}
            >
              {/* orbiting dots */}
              {[0,60,120,180,240,300].map((deg,i) => (
                <div key={i} style={{
                  position:"absolute",
                  width:5, height:5, borderRadius:"50%",
                  background: i%2===0 ? "#CD2C58" : "#E06B80",
                  opacity: .35,
                  top: `calc(50% + ${Math.sin(deg*Math.PI/180)*54}px)`,
                  left: `calc(50% + ${Math.cos(deg*Math.PI/180)*54}px)`,
                  transform: "translate(-50%,-50%)",
                  animation: `fsPulse ${2+i*.3}s ease-in-out ${i*.2}s infinite`,
                }}/>
              ))}
              <div style={{
                width:44, height:44, borderRadius:"50%",
                background:"linear-gradient(135deg,rgba(205,44,88,.12),rgba(255,198,157,.20))",
                border:"1px solid rgba(205,44,88,.22)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"1.2rem",
                animation:"fsFloat 3s ease-in-out infinite",
              }}>+</div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.25rem", fontWeight:400, color:"#2a1018", lineHeight:1.2 }}>
                & more services
              </p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".72rem", color:"#7a4a55", fontWeight:300, letterSpacing:".06em" }}>
                View all 7 offerings →
              </p>
            </div>
          </div>

          {/* ── MINI TICKER ── */}
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
          <div ref={ctaRef} style={{
            marginTop: 52,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 32, flexWrap: "wrap",
            opacity: ctaIn ? 1 : 0,
            transform: ctaIn ? "translateY(0)" : "translateY(22px)",
            transition: "opacity .9s ease, transform .9s ease",
          }}>
            {/* Quote */}
            <div style={{ maxWidth: 460 }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"clamp(1rem,1.6vw,1.4rem)", fontWeight:300, color:"#7a4a55", lineHeight:1.65, marginBottom:8 }}>
                "From a single hand-painted saree to a full wedding hamper — every service is delivered with the same signature care."
              </p>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".68rem", letterSpacing:".12em", textTransform:"uppercase", color:"rgba(205,44,88,.50)", fontWeight:500 }}>
                — Suman Jain, Kalasrijan
              </span>
            </div>

            {/* Buttons */}
            <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
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