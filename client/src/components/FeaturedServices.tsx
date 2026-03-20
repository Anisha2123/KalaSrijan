"use client";

import { useEffect, useRef, useState } from "react";
import SmartImage from "../utils/SmartImage";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */
const FEATURED = [
  {
    id: 1, num: "01", title: "Hand Painting", idSlug: "hand-painting",
    subtitle: "Wearable Canvas Art", icon: "🎨",
    highlight: "₹1,500 / piece",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto,c_fill,g_auto/v1773916625/image_rejikn.png",
    tagColor: "#CD2C58",
    size: "tall",
    desc: "Each garment becomes a masterpiece — vivid pigments, signature outlines, pure artistry.",
  },
  {
    id: 2, num: "02", title: "Thermacol Art", idSlug: "thermacol-art",
    subtitle: "Sculptural Event Décor", icon: "🏛️",
    highlight: "From ₹1,000",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916631/thermacol_art_tgh6et.png",
    tagColor: "#E06B80",
    size: "short",
    desc: "Grand statues, monuments & wedding trays shaped in lightweight Thermacol.",
  },
  {
    id: 3, num: "03", title: "Fancy Dress", idSlug: "fancy-dress",
    subtitle: "Costume Design End-to-End", icon: "✂️",
    highlight: "₹1,000 – ₹5,000",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773920275/35894ddc-a1f6-4e5b-b706-1098964ed757.png",
    tagColor: "#CD2C58",
    size: "short",
    desc: "Complete costume creation with matching props for every little star.",
  },
  {
    id: 4, num: "04", title: "School Projects", idSlug: "school-projects",
    subtitle: "Models, STEM & B.Ed", icon: "🔬",
    highlight: "From ₹300",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773920224/a52e6c62-720d-4a68-9c71-f96e3d44307b.png",
    tagColor: "#E06B80",
    size: "tall",
    desc: "Working models, robotic projects, STEM displays — every concept brought to life.",
  },
  {
    id: 5, num: "05", title: "Wedding Hampers", idSlug: "wedding-hampers",
    subtitle: "Packing & Platters", icon: "🎁",
    highlight: "Made to order",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916647/weeding_decorcation_and_hamper_orgaqa.png",
    tagColor: "#CD2C58",
    size: "wide",
    desc: "Curated platters and hampers for Haldi, gifting & every cherished occasion.",
  },
  {
    id: 6, num: "06", title: "Card Decoration", idSlug: "card-decoration",
    subtitle: "Themed Invitation Art", icon: "💌",
    highlight: "₹500 / card",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916647/Card_Decoration_ermpnu.png",
    tagColor: "#E06B80",
    size: "small",
    desc: "Customized wedding & event card decorations aligned to your theme.",
  },
  {
    id: 7, num: "07", title: "Custom Event Décor", idSlug: "custom-event-decor",
    subtitle: "Tailored Theme Elements", icon: "✨",
    highlight: "From ₹1,000",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773920841/61a7d48c-f7b5-43e0-b7e4-37cb5fb9a67c.png",
    tagColor: "#CD2C58",
    size: "small",
    desc: "Bespoke décor pieces designed specifically for your event's theme.",
  },
];

/* ─────────────────────────────────────
   HOOKS
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
   BENTO CARD (desktop + tablet)
───────────────────────────────────── */
function BentoCard({
  s, idx, colSpan = 1, rowSpan = 1,
}: {
  s: typeof FEATURED[0]; idx: number; colSpan?: number; rowSpan?: number;
}) {
  const { ref, inView } = useInView(0.04);
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => navigate(`/services#${s.idSlug}`)}
      style={{
        gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}`,
        position: "relative", borderRadius: 22, overflow: "hidden",
        cursor: "pointer", background: "#2a1018",
        minHeight: rowSpan === 2 ? 420 : 210,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity .75s ease ${idx * 0.07}s, transform .75s ease ${idx * 0.07}s, box-shadow .3s ease`,
        boxShadow: hov
          ? "0 28px 72px rgba(42,16,24,.35), 0 4px 20px rgba(205,44,88,.16)"
          : "0 4px 24px rgba(42,16,24,.18)",
      }}
    >
      <SmartImage src={s.img} alt={s.title} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", display: "block",
        transition: "transform .7s ease",
        transform: hov ? "scale(1.09)" : "scale(1.0)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(42,16,24,0.90) 0%, rgba(42,16,24,0.32) 55%, rgba(42,16,24,0.08) 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: `linear-gradient(135deg, ${s.tagColor}33 0%, transparent 70%)`, opacity: hov ? 1 : 0, transition: "opacity .35s ease" }} />

      {/* Top badges */}
      <div style={{ position: "absolute", top: 14, left: 14, zIndex: 4, display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 100, padding: "4px 12px 4px 10px" }}>
        <span style={{ fontSize: "1rem" }}>{s.icon}</span>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,230,212,.70)", fontWeight: 500 }}>{s.num}</span>
      </div>
      <div style={{ position: "absolute", top: 14, right: 14, zIndex: 4, background: s.tagColor, color: "#fff", borderRadius: 100, padding: "5px 13px", fontFamily: "'Cormorant Garamond',serif", fontSize: "0.90rem", fontWeight: 600, boxShadow: `0 4px 16px ${s.tagColor}55`, opacity: hov ? 1 : 0.80, transition: "opacity .3s, transform .3s", transform: hov ? "translateY(0) scale(1.04)" : "translateY(4px) scale(1)" }}>{s.highlight}</div>

      {/* Content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 18px 20px", zIndex: 3, transform: hov ? "translateY(0)" : "translateY(6px)", transition: "transform .35s ease" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: rowSpan === 2 ? "clamp(1.4rem,2.2vw,2.2rem)" : "1.18rem", fontWeight: 400, color: "#fff", lineHeight: 1.1, marginBottom: 4 }}>{s.title}</h3>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".63rem", letterSpacing: ".13em", textTransform: "uppercase", color: s.tagColor, fontWeight: 500, marginBottom: hov ? 10 : 0, transition: "margin .3s" }}>{s.subtitle}</p>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".82rem", color: "rgba(255,230,212,.72)", fontWeight: 300, lineHeight: 1.65, maxHeight: hov ? "80px" : "0px", overflow: "hidden", opacity: hov ? 1 : 0, transition: "max-height .38s ease, opacity .32s ease" }}>{s.desc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: hov ? 12 : 0, maxHeight: hov ? "32px" : "0px", overflow: "hidden", opacity: hov ? 1 : 0, transition: "max-height .38s ease .05s, opacity .32s ease .05s, margin .32s ease" }}>
          <span style={{ width: 24, height: 24, borderRadius: "50%", background: s.tagColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".72rem", color: "#fff", flexShrink: 0 }}>→</span>
          <a href="tel:+918890448242" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".72rem", fontWeight: 500, color: "rgba(255,230,212,.70)", letterSpacing: ".06em", textTransform: "uppercase" }}>Enquire Now</span>
          </a>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 14, right: 14, zIndex: 4, width: 16, height: 16, borderBottom: `1.5px solid ${s.tagColor}80`, borderRight: `1.5px solid ${s.tagColor}80`, borderRadius: "0 0 5px 0", opacity: hov ? 1 : 0, transition: "opacity .3s" }} />
    </div>
  );
}

/* ─────────────────────────────────────
   MOBILE SCROLL CARD
   Full-width swipeable card in a
   horizontal scroll strip — always
   readable, image always visible
───────────────────────────────────── */
function MobileScrollCard({ s, idx }: { s: typeof FEATURED[0]; idx: number }) {
  const navigate = useNavigate();
  return (
    <div
      className="fst-card"
      onClick={() => navigate(`/services#${s.idSlug}`)}
    >
      {/* Full image background */}
      <img
        src={s.img}
        alt={s.title}
        className="fst-card-img"
      />

      {/* Always-on dark scrim — strong enough to read text without hover */}
      <div className="fst-card-scrim" />

      {/* Colour tint top-left */}
      <div className="fst-card-tint" style={{ background: `linear-gradient(140deg, ${s.tagColor}55 0%, transparent 60%)` }} />

      {/* Top row */}
      <div className="fst-card-top">
        <div className="fst-card-badge">
          <span className="fst-card-icon">{s.icon}</span>
          <span className="fst-card-num">{s.num}</span>
        </div>
        <div className="fst-card-price" style={{ background: s.tagColor }}>
          {s.highlight}
        </div>
      </div>

      {/* Bottom content — always visible */}
      <div className="fst-card-content">
        <p className="fst-card-sub" style={{ color: s.tagColor }}>{s.subtitle}</p>
        <h3 className="fst-card-title">{s.title}</h3>
        <p className="fst-card-desc">{s.desc}</p>
        <div className="fst-card-cta">
          <span className="fst-cta-dot" style={{ background: s.tagColor }}>→</span>
          <span className="fst-cta-label">Enquire Now</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   MAIN
───────────────────────────────────── */
export default function FeaturedServices() {
  const { ref: headRef, inView: headIn } = useInView(0.05);
  const { ref: ctaRef,  inView: ctaIn  } = useInView(0.06);
  const bp = useBreakpoint();

  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";
  const isDesktop = bp === "desktop";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fsBlob    { from{transform:translate(0,0) scale(1)} to{transform:translate(20px,16px) scale(1.04)} }
        @keyframes fsFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fsFadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fsPulse   { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
        @keyframes fsRotate  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fsMarquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .fs-section {
          background: #fff8f4; font-family: 'DM Sans', sans-serif;
          position: relative; overflow: hidden; padding: 104px 0 96px;
        }
        .fs-blob { position:absolute; border-radius:50%; pointer-events:none; z-index:0; }

        /* ── Desktop bento ── */
        .fs-bento-desktop {
          display: grid; grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 210px; gap: 14px;
        }

        /* ── Tablet bento ── */
        .fs-bento-tablet {
          display: grid; grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 200px; gap: 12px;
        }
        .fs-bento-tablet > * { grid-column: span 1 !important; grid-row: span 1 !important; min-height: 200px !important; }

        /* ── Mobile: horizontal scroll strip ── */
        .fst-strip-outer {
          /* Negative margin to break out of padding and go edge-to-edge */
          margin: 0 -16px;
          overflow-x: auto;
          overflow-y: visible;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          /* Fade edges */
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%);
        }
        .fst-strip-outer::-webkit-scrollbar { display: none; }

        .fst-strip-inner {
          display: flex;
          gap: 12px;
          padding: 4px 16px 16px;
          width: max-content;
        }

        /* Each card: 78vw wide so next card peeks — signals scrollability */
        .fst-card {
          position: relative;
          width: 78vw;
          max-width: 300px;
          border-radius: 20px;
          overflow: hidden;
          flex-shrink: 0;
          scroll-snap-align: start;
          cursor: pointer;
          background: #2a1018;
          /* Fixed height — tall enough for content */
          height: 380px;
          box-shadow: 0 6px 28px rgba(42,16,24,.20);
          -webkit-tap-highlight-color: transparent;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .fst-card:active {
          transform: scale(0.97);
          box-shadow: 0 2px 12px rgba(42,16,24,.18);
        }

        /* Image fills entire card */
        .fst-card-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        /* Strong bottom-up scrim — always readable */
        .fst-card-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(
            to top,
            rgba(42,16,24,0.96) 0%,
            rgba(42,16,24,0.60) 40%,
            rgba(42,16,24,0.15) 70%,
            transparent 100%
          );
          z-index: 1;
        }

        .fst-card-tint {
          position: absolute; inset: 0; z-index: 2;
          pointer-events: none;
        }

        /* Top row: badge + price */
        .fst-card-top {
          position: absolute; top: 14px; left: 14px; right: 14px;
          z-index: 4;
          display: flex; align-items: center; justify-content: space-between;
        }
        .fst-card-badge {
          display: flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 100px; padding: 4px 10px 4px 8px;
        }
        .fst-card-icon { font-size: .95rem; }
        .fst-card-num {
          font-family: 'DM Sans', sans-serif;
          font-size: .55rem; letter-spacing: .12em;
          text-transform: uppercase; color: rgba(255,230,212,.75); font-weight: 500;
        }
        .fst-card-price {
          color: #fff; border-radius: 100px; padding: 4px 11px;
          font-family: 'Cormorant Garamond', serif;
          font-size: .82rem; font-weight: 600;
        }

        /* Bottom content — always visible, never hidden */
        .fst-card-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 16px 16px 18px;
          z-index: 3;
        }
        .fst-card-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .60rem; letter-spacing: .13em;
          text-transform: uppercase; font-weight: 500;
          margin-bottom: 5px; line-height: 1;
        }
        .fst-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.55rem; font-weight: 400;
          color: #fff; line-height: 1.08; margin-bottom: 8px;
        }
        .fst-card-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem; color: rgba(255,230,212,.68);
          font-weight: 300; line-height: 1.65;
          margin-bottom: 12px;
          /* 2-line clamp */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .fst-card-cta {
          display: flex; align-items: center; gap: 8px;
        }
        .fst-cta-dot {
          width: 24px; height: 24px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: .70rem; color: #fff; flex-shrink: 0;
        }
        .fst-cta-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .70rem; font-weight: 500;
          color: rgba(255,230,212,.75);
          letter-spacing: .07em; text-transform: uppercase;
        }

        /* Scroll dots indicator below strip */
        .fst-dots {
          display: flex; justify-content: center; gap: 6px;
          padding-top: 14px;
        }
        .fst-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(205,44,88,.22);
          transition: background .3s, transform .3s;
        }
        .fst-dot.active {
          background: #CD2C58;
          transform: scale(1.5);
        }

        /* ── Ticker ── */
        .fs-ticker { overflow:hidden; margin-top:14px; padding:10px 0; border-top:1px solid rgba(205,44,88,.12); border-bottom:1px solid rgba(205,44,88,.12); }
        .fs-ticker-track { display:flex; width:max-content; animation:fsMarquee 18s linear infinite; }
        .fs-ticker-track:hover { animation-play-state:paused; }
        .fs-ticker-item { display:inline-flex; align-items:center; gap:12px; padding:0 22px; font-family:'DM Sans',sans-serif; font-size:.68rem; letter-spacing:.16em; text-transform:uppercase; color:rgba(205,44,88,.45); font-weight:500; white-space:nowrap; }
        .fs-ticker-dot { width:4px; height:4px; border-radius:50%; background:#E06B80; flex-shrink:0; }

        /* ── CTA buttons ── */
        .fs-cta-btn {
          display:inline-flex; align-items:center; gap:14px;
          background:#2a1018; color:#fff; padding:18px 40px; border-radius:100px;
          font-family:'DM Sans',sans-serif; font-size:.92rem; font-weight:500;
          letter-spacing:.04em; text-decoration:none;
          box-shadow:0 10px 36px rgba(42,16,24,.28);
          transition:background .25s,transform .25s,box-shadow .25s;
          position:relative; overflow:hidden; white-space:nowrap;
        }
        .fs-cta-btn::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,#CD2C58,#E06B80); opacity:0; transition:opacity .3s; }
        .fs-cta-btn:hover::before { opacity:1; }
        .fs-cta-btn:hover { transform:translateY(-3px); box-shadow:0 18px 48px rgba(42,16,24,.32); }
        .fs-cta-btn-text { position:relative; z-index:1; }
        .fs-cta-btn-icon { position:relative; z-index:1; width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,.12); display:flex; align-items:center; justify-content:center; font-size:.88rem; transition:transform .25s; }
        .fs-cta-btn:hover .fs-cta-btn-icon { transform:translateX(5px); }

        .fs-ghost-btn {
          display:inline-flex; align-items:center; gap:10px;
          border:1.5px solid rgba(205,44,88,.28); color:#CD2C58; padding:18px 32px; border-radius:100px;
          background:transparent; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:.88rem; font-weight:500;
          letter-spacing:.04em; text-decoration:none; transition:all .25s; white-space:nowrap;
        }
        .fs-ghost-btn:hover { background:rgba(205,44,88,.06); border-color:#CD2C58; transform:translateY(-2px); }

        .fs-ring { position:absolute; border-radius:50%; border:1px dashed rgba(205,44,88,.15); pointer-events:none; }

        /* ══ TABLET ══ */
        @media (max-width: 1099px) {
          .fs-section { padding:72px 0 72px }
          .fs-inner   { padding:0 28px !important }
          .fs-header  { flex-direction:column !important; align-items:flex-start !important; gap:24px !important }
          .fs-header-right { align-items:flex-start !important }
          .fs-cta-row { justify-content:flex-start !important }
          .fs-ring-lg { width:180px !important; height:180px !important }
          .fs-ring-sm { width:110px !important; height:110px !important }
        }

        /* ══ MOBILE ══ */
        @media (max-width: 767px) {
          .fs-section  { padding:52px 0 56px }
          .fs-inner    { padding:0 16px !important }

          .fs-cta-btn  { padding:15px 28px; font-size:.85rem; width:100%; justify-content:center }
          .fs-ghost-btn{ padding:15px 24px; font-size:.82rem; width:100%; justify-content:center }
          .fs-cta-row  { flex-direction:column !important; gap:10px !important; align-items:stretch !important }
          .fs-cta-quote{ max-width:100% !important }
          .fs-ring     { display:none }
          .fs-count-num{ font-size:clamp(2.2rem,10vw,3.5rem) !important }
          .fs-ticker-track { animation-duration:24s }

          /* Mobile "View all" teaser card */
          .fst-teaser {
            width: 78vw; max-width: 300px;
            height: 380px; flex-shrink: 0;
            scroll-snap-align: start;
            border-radius: 20px;
            border: 1.5px dashed rgba(205,44,88,.30);
            background: rgba(255,255,255,.65);
            backdrop-filter: blur(10px);
            display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 12px;
            cursor: pointer; padding: 24px;
            -webkit-tap-highlight-color: transparent;
            transition: background .25s;
          }
          .fst-teaser:active { background: rgba(205,44,88,.06); }
          .fst-teaser-icon {
            width: 52px; height: 52px; border-radius: 50%;
            background: linear-gradient(135deg, rgba(205,44,88,.12), rgba(255,198,157,.22));
            border: 1px solid rgba(205,44,88,.22);
            display: flex; align-items: center; justify-content: center;
            font-size: 1.4rem; animation: fsFloat 3s ease-in-out infinite;
          }
          .fst-teaser-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.3rem; font-weight: 400; color: #2a1018;
            text-align: center; line-height: 1.25;
          }
          .fst-teaser-sub {
            font-family: 'DM Sans', sans-serif;
            font-size: .72rem; color: #CD2C58; font-weight: 500;
            letter-spacing: .06em;
          }
        }
      `}</style>

      <section className="fs-section">

        {/* Ambient blobs */}
        <div className="fs-blob" style={{ width:620, height:620, background:"radial-gradient(circle,rgba(255,198,157,.16) 0%,transparent 65%)", top:-180, right:-200, animation:"fsBlob 16s ease-in-out infinite alternate" }} />
        <div className="fs-blob" style={{ width:460, height:460, background:"radial-gradient(circle,rgba(205,44,88,.07) 0%,transparent 65%)", bottom:-100, left:-140, animation:"fsBlob 13s ease-in-out infinite alternate" }} />

        <div className="fs-ring fs-ring-lg" style={{ width:300, height:300, top:"5%", right:"3%", animation:"fsRotate 40s linear infinite" }} />
        <div className="fs-ring fs-ring-sm" style={{ width:180, height:180, bottom:"10%", left:"2%", animation:"fsRotate 28s linear infinite reverse" }} />

        <div className="fs-inner" style={{ maxWidth:1240, margin:"0 auto", padding:"0 36px", position:"relative", zIndex:1 }}>

          {/* ── HEADER ── */}
          <div
            ref={headRef}
            className="fs-header"
            style={{
              display:"flex", alignItems:"flex-end", justifyContent:"space-between",
              gap:32, flexWrap:"wrap", marginBottom: isMobile ? 28 : 52,
              opacity: headIn ? 1 : 0,
              transform: headIn ? "translateY(0)" : "translateY(22px)",
              transition: "opacity .9s ease, transform .9s ease",
            }}
          >
            <div style={{ flex:1, minWidth:0 }}>
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

            <div className="fs-header-right" style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:16, flexShrink:0 }}>
              <div style={{ position:"relative", paddingRight: isDesktop ? 28 : 0 }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:6 }}>
                  <span className="fs-count-num" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(3rem,5vw,5.5rem)", fontWeight:600, color:"#2a1018", lineHeight:1 }}>07</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".75rem", letterSpacing:".12em", textTransform:"uppercase", color:"#7a4a55", fontWeight:400 }}>Services<br/>Available</span>
                </div>
                <div style={{ width:"100%", height:2, background:"linear-gradient(90deg,#CD2C58,#E06B80)", borderRadius:2, marginTop:6 }} />
              </div>
              <a href="/services" style={{ display:"inline-flex", alignItems:"center", gap:8, fontFamily:"'DM Sans',sans-serif", fontSize:".80rem", fontWeight:500, color:"#CD2C58", textDecoration:"none", letterSpacing:".04em", transition:"gap .22s" }}
                onMouseEnter={e => (e.currentTarget.style.gap = "14px")}
                onMouseLeave={e => (e.currentTarget.style.gap = "8px")}
              >
                Browse all services →
              </a>
            </div>
          </div>

          {/* ── DESKTOP bento ── */}
          {isDesktop && (
            <div className="fs-bento-desktop">
              <BentoCard s={FEATURED[0]} idx={0} colSpan={1} rowSpan={2} />
              <BentoCard s={FEATURED[1]} idx={1} colSpan={1} rowSpan={1} />
              <BentoCard s={FEATURED[2]} idx={2} colSpan={1} rowSpan={1} />
              <BentoCard s={FEATURED[3]} idx={3} colSpan={1} rowSpan={2} />
              <BentoCard s={FEATURED[4]} idx={4} colSpan={2} rowSpan={1} />
              <BentoCard s={FEATURED[5]} idx={5} colSpan={1} rowSpan={1} />
              <BentoCard s={FEATURED[6]} idx={6} colSpan={1} rowSpan={1} />
              <div style={{ gridColumn:"span 2", borderRadius:22, border:"1.5px dashed rgba(205,44,88,.25)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, background:"rgba(255,255,255,.50)", backdropFilter:"blur(8px)", cursor:"pointer", position:"relative", overflow:"hidden", transition:"background .3s,border-color .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(205,44,88,.05)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(205,44,88,.45)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.50)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(205,44,88,.25)"; }}
                onClick={() => window.location.href="/services"}
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

          {/* ── TABLET bento ── */}
          {isTablet && (
            <div className="fs-bento-tablet">
              {FEATURED.map((s, i) => (
                <BentoCard key={s.id} s={s} idx={i} colSpan={1} rowSpan={1} />
              ))}
              <div style={{ gridColumn:"span 2", borderRadius:18, border:"1.5px dashed rgba(205,44,88,.25)", minHeight:90, display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:20, background:"rgba(255,255,255,.55)", backdropFilter:"blur(8px)", cursor:"pointer", padding:"0 28px", transition:"background .3s,border-color .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(205,44,88,.05)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(205,44,88,.40)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.55)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(205,44,88,.25)"; }}
                onClick={() => window.location.href="/services"}
              >
                <div style={{ width:38, height:38, borderRadius:"50%", background:"linear-gradient(135deg,rgba(205,44,88,.14),rgba(255,198,157,.22))", border:"1px solid rgba(205,44,88,.22)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", animation:"fsFloat 3s ease-in-out infinite", flexShrink:0 }}>+</div>
                <div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", fontWeight:400, color:"#2a1018" }}>Discover all 7 services</p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".70rem", color:"#7a4a55", fontWeight:300 }}>View full catalogue →</p>
                </div>
              </div>
            </div>
          )}

          {/* ── MOBILE: horizontal scroll strip ── */}
          {isMobile && (
            <MobileServiceStrip services={FEATURED} />
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
              display:"flex", alignItems:"center", justifyContent:"space-between",
              gap:28, flexWrap:"wrap",
              opacity: ctaIn ? 1 : 0,
              transform: ctaIn ? "translateY(0)" : "translateY(22px)",
              transition: "opacity .9s ease, transform .9s ease",
            }}
          >
            <div className="fs-cta-quote" style={{ maxWidth:460 }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"clamp(.95rem,1.6vw,1.4rem)", fontWeight:300, color:"#7a4a55", lineHeight:1.65, marginBottom:8 }}>
                "From a single hand-painted saree to a full wedding hamper — every service is delivered with the same signature care."
              </p>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".68rem", letterSpacing:".12em", textTransform:"uppercase", color:"rgba(205,44,88,.50)", fontWeight:500 }}>
                — Suman Jain, Kalasrijan
              </span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap", flex: isMobile ? "1 1 100%" : "unset" }}>
              <a href="/services" className="fs-cta-btn">
                <span className="fs-cta-btn-text">Explore All Services</span>
                <div className="fs-cta-btn-icon">→</div>
              </a>
              <a href="tel:+918890448242" className="fs-ghost-btn">Get a Quote</a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────
   MOBILE STRIP — separate component
   so scroll tracking stays isolated
───────────────────────────────────── */
function MobileServiceStrip({ services }: { services: typeof FEATURED }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const navigate = useNavigate();
  const total = services.length + 1; // +1 for teaser

  // Track scroll position → update active dot
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.scrollWidth / total;
      setActiveIdx(Math.round(el.scrollLeft / cardW));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [total]);

  return (
    <div style={{ marginBottom: 8 }}>
      {/* Hint label */}
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".62rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(205,44,88,.50)", fontWeight: 500, marginBottom: 12 }}>
        Swipe to explore →
      </p>

      <div className="fst-strip-outer" ref={scrollRef}>
        <div className="fst-strip-inner">
          {services.map((s, i) => (
            <MobileScrollCard key={s.id} s={s} idx={i} />
          ))}
          {/* Teaser card — view all */}
          <div className="fst-teaser" onClick={() => navigate("/services")}>
            <div className="fst-teaser-icon">+</div>
            <p className="fst-teaser-title">View all<br />7 services</p>
            <p className="fst-teaser-sub">Full catalogue →</p>
          </div>
        </div>
      </div>

      {/* Scroll dots */}
      <div className="fst-dots">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`fst-dot ${i === activeIdx ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
}