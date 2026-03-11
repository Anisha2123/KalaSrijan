"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */
const QUICK_LINKS = [
  { label: "Home",        href: "#home" },
  { label: "About Suman", href: "#about" },
  { label: "Classes",     href: "#classes" },
  { label: "Services",    href: "#services" },
  { label: "Gallery",     href: "#gallery" },
  { label: "Contact",     href: "#contact" },
];

const CLASS_LINKS = [
  { label: "Painting (8 styles)",  href: "#classes" },
  { label: "Stitching Diplomas",   href: "#classes" },
  { label: "Clay & Paper Craft",   href: "#classes" },
  { label: "Resin & Candle Art",   href: "#classes" },
  { label: "Calligraphy",          href: "#classes" },
  { label: "Rangoli & Lippan Art", href: "#classes" },
];

const SERVICE_LINKS = [
  { label: "Hand Painting",     href: "#services" },
  { label: "Thermacol Art",     href: "#services" },
  { label: "Fancy Dress Design",href: "#services" },
  { label: "School Projects",   href: "#services" },
  { label: "Wedding Hampers",   href: "#services" },
];

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@kalasrijan",
    href: "https://instagram.com/kalasrijan",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    handle: "Chat with us",
    href: "https://wa.me/91XXXXXXXXXX",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

const CRAFTS_MARQUEE = [
  "Painting","Stitching","Clay Modeling","Resin Art","Calligraphy",
  "Rangoli","Candle Making","Paper Craft","Lippan Art","Herbal Soaps",
  "Fancy Dress","Wedding Hampers","Cooking","Fabric Art",
];

/* ─────────────────────────────────────
   HOOK
───────────────────────────────────── */
function useInView(threshold = 0.06) {
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
   NEWSLETTER MINI FORM
───────────────────────────────────── */
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [focused, setFocused] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setDone(true);
  };

  if (done) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 18px",
        background: "rgba(255,198,157,0.10)",
        border: "1px solid rgba(255,198,157,0.22)",
        borderRadius: 14,
        animation: "ftFadeUp .5s ease both",
      }}>
        <span style={{ fontSize: "1.1rem" }}>🎨</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: ".85rem", color: "rgba(255,230,212,.80)", fontWeight: 300 }}>
          You're in! Expect creative inspiration soon.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <div style={{
        flex: 1, minWidth: 200,
        display: "flex", alignItems: "center",
        background: "rgba(255,255,255,0.06)",
        border: `1px solid ${focused ? "rgba(255,198,157,0.50)" : "rgba(255,198,157,0.18)"}`,
        borderRadius: 12, padding: "0 14px",
        transition: "border-color .25s",
      }}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            fontFamily: "'DM Sans', sans-serif", fontSize: ".84rem",
            color: "rgba(255,230,212,.90)", padding: "12px 0",
          }}
        />
      </div>
      <button type="submit" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "#CD2C58", color: "#fff",
        padding: "12px 22px", borderRadius: 12,
        border: "none", cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: ".82rem", fontWeight: 500,
        letterSpacing: ".03em",
        boxShadow: "0 4px 18px rgba(205,44,88,.35)",
        transition: "background .22s, transform .22s",
        whiteSpace: "nowrap",
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#b82350"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#CD2C58"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
      >
        Subscribe →
      </button>
    </form>
  );
}

/* ─────────────────────────────────────
   LINK COLUMN
───────────────────────────────────── */
function LinkCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h4 style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: ".66rem", letterSpacing: ".18em",
        textTransform: "uppercase", color: "rgba(255,198,157,.50)",
        fontWeight: 500, marginBottom: 4,
      }}>{title}</h4>
      {links.map(l => (
        <a key={l.label} href={l.href} style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: ".84rem", color: "rgba(255,230,212,.58)",
          textDecoration: "none", fontWeight: 300,
          display: "inline-flex", alignItems: "center", gap: 7,
          transition: "color .22s, gap .22s",
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = "#FFC69D";
            (e.currentTarget as HTMLElement).style.gap = "11px";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,230,212,.58)";
            (e.currentTarget as HTMLElement).style.gap = "7px";
          }}
        >
          <span style={{
            display: "inline-block", width: 4, height: 4, borderRadius: "50%",
            background: "linear-gradient(135deg,#CD2C58,#E06B80)",
            flexShrink: 0, transition: "transform .22s",
          }} />
          {l.label}
        </a>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────
   DECORATIVE FLOATING PETALS
───────────────────────────────────── */
const PETALS = [
  { w: 20, h: 20, top: "12%",  left: "4%",  dur: "7s",  del: "0s",  op: 0.07 },
  { w: 14, h: 14, top: "70%",  left: "8%",  dur: "9s",  del: ".8s", op: 0.05 },
  { w: 18, h: 18, top: "20%",  left: "92%", dur: "6s",  del: ".4s", op: 0.07 },
  { w: 12, h: 12, top: "55%",  left: "88%", dur: "8s",  del: "1s",  op: 0.05 },
  { w: 10, h: 10, top: "80%",  left: "50%", dur: "10s", del: ".2s", op: 0.04 },
];

/* ─────────────────────────────────────
   MAIN FOOTER
───────────────────────────────────── */
export default function Footer() {
  const { ref: mainRef, inView: mainIn } = useInView(0.04);
  const { ref: ctaRef, inView: ctaIn } = useInView(0.06);
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes ftPetal  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(180deg)} }
        @keyframes ftBlob   { from{transform:translate(0,0) scale(1)} to{transform:translate(18px,14px) scale(1.04)} }
        @keyframes ftFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mqScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes ftSpin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        input::placeholder { color: rgba(255,198,157,0.30) !important; }

        .ft-footer { background: #2a1018; position: relative; overflow: hidden; }

        /* ── Pre-footer CTA strip ── */
        .ft-cta-strip {
          background: linear-gradient(135deg, #CD2C58 0%, #9e1f44 100%);
          padding: 64px 40px;
          position: relative; overflow: hidden; z-index: 1;
        }
        .ft-cta-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          gap: 36px; flex-wrap: wrap;
          position: relative; z-index: 1;
        }
        .ft-cta-left {}
        .ft-cta-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: .65rem; letter-spacing: .18em;
          text-transform: uppercase; color: rgba(255,230,212,.65);
          font-weight: 500; margin-bottom: 10px;
        }
        .ft-cta-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem,3.2vw,3rem);
          font-weight: 300; color: #fff; line-height: 1.1;
        }
        .ft-cta-heading em { font-style: italic; color: #FFC69D; }

        .ft-cta-btn {
          display: inline-flex; align-items: center; gap: 11px;
          border: 1.5px solid rgba(255,230,212,.45);
          color: #fff; padding: 15px 36px; border-radius: 100px;
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(8px);
          font-family: 'DM Sans', sans-serif;
          font-size: .9rem; font-weight: 500;
          letter-spacing: .04em; text-decoration: none;
          transition: background .25s, border-color .25s, transform .22s;
          white-space: nowrap; flex-shrink: 0;
        }
        .ft-cta-btn:hover {
          background: rgba(255,255,255,.18);
          border-color: rgba(255,230,212,.80);
          transform: translateY(-2px);
        }
        .ft-cta-btn-arr { transition: transform .22s; }
        .ft-cta-btn:hover .ft-cta-btn-arr { transform: translateX(5px); }

        /* CTA background shapes */
        .ft-cta-bg-circle {
          position: absolute; border-radius: 50%; pointer-events: none;
        }

        /* ── Marquee craft strip ── */
        .ft-marquee-wrap {
          overflow: hidden;
          border-top: 1px solid rgba(255,198,157,.08);
          border-bottom: 1px solid rgba(255,198,157,.08);
          padding: 13px 0;
          background: rgba(255,255,255,.02);
          position: relative; z-index: 1;
        }
        .ft-marquee-track {
          display: flex; width: max-content;
          animation: mqScroll 26s linear infinite;
        }
        .ft-marquee-track:hover { animation-play-state: paused; }
        .ft-marquee-item {
          display: inline-flex; align-items: center; gap: 16px;
          padding: 0 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; letter-spacing: .16em;
          text-transform: uppercase; color: rgba(255,198,157,.35);
          font-weight: 400; white-space: nowrap;
        }
        .ft-mq-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: #CD2C58; flex-shrink: 0;
        }

        /* ── Main footer body ── */
        .ft-body {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto;
          padding: 72px 40px 56px;
        }

        /* Ambient blobs */
        .ft-blob {
          position: absolute; border-radius: 50%; pointer-events: none;
        }

        /* Top grid */
        .ft-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 56px; margin-bottom: 60px;
        }

        /* Brand column */
        .ft-brand {}
        .ft-logo {
          display: flex; align-items: center; gap: 11px;
          text-decoration: none; margin-bottom: 22px;
        }
        .ft-logo-mark {
          width: 46px; height: 46px; border-radius: 14px;
          background: linear-gradient(135deg, #CD2C58 0%, #E06B80 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 600; color: #fff;
          box-shadow: 0 4px 18px rgba(205,44,88,.35);
          flex-shrink: 0; transition: transform .3s;
        }
        .ft-logo:hover .ft-logo-mark { transform: rotate(-6deg) scale(1.08); }
        .ft-logo-text {}
        .ft-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem; font-weight: 600;
          color: #fff; line-height: 1.1;
          display: block; margin-bottom: 1px;
        }
        .ft-logo-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .60rem; letter-spacing: .14em;
          text-transform: uppercase;
          color: rgba(255,198,157,.45); font-weight: 400;
        }

        .ft-brand-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: .84rem; color: rgba(255,230,212,.45);
          line-height: 1.80; font-weight: 300; margin-bottom: 26px;
        }

        /* Socials */
        .ft-socials { display: flex; flex-direction: column; gap: 10px; }
        .ft-social-link {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 10px 14px; border-radius: 12px;
          border: 1px solid rgba(255,198,157,.10);
          background: rgba(255,255,255,.03);
          text-decoration: none;
          transition: background .22s, border-color .22s, transform .22s;
        }
        .ft-social-link:hover {
          background: rgba(255,255,255,.07);
          border-color: rgba(255,198,157,.22);
          transform: translateX(5px);
        }
        .ft-social-icon {
          width: 34px; height: 34px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ft-social-info {}
        .ft-social-name {
          font-family: 'DM Sans', sans-serif;
          font-size: .80rem; font-weight: 500;
          color: rgba(255,230,212,.80); display: block; margin-bottom: 1px;
        }
        .ft-social-handle {
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; color: rgba(255,198,157,.38); font-weight: 300;
        }
        .ft-social-arr {
          margin-left: auto; font-size: .8rem;
          color: rgba(255,198,157,.25); transition: transform .22s, color .22s;
        }
        .ft-social-link:hover .ft-social-arr { transform: translateX(3px); color: rgba(255,198,157,.60); }

        /* Newsletter */
        .ft-nl-heading {
          font-family: 'DM Sans', sans-serif;
          font-size: .66rem; letter-spacing: .18em;
          text-transform: uppercase; color: rgba(255,198,157,.50);
          font-weight: 500; margin-bottom: 10px;
        }
        .ft-nl-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem; color: rgba(255,230,212,.45);
          font-weight: 300; line-height: 1.6; margin-bottom: 16px;
        }

        /* ── Divider ── */
        .ft-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,198,157,.14) 30%, rgba(255,198,157,.14) 70%, transparent);
          margin-bottom: 32px;
        }

        /* ── Bottom bar ── */
        .ft-bottom {
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; flex-wrap: wrap;
        }
        .ft-copy {
          font-family: 'DM Sans', sans-serif;
          font-size: .75rem; color: rgba(255,198,157,.28);
          font-weight: 300; line-height: 1.6;
        }
        .ft-copy strong { color: rgba(255,198,157,.45); font-weight: 500; }

        .ft-bottom-links {
          display: flex; align-items: center; gap: 22px;
        }
        .ft-bottom-link {
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem; color: rgba(255,198,157,.28);
          text-decoration: none; font-weight: 300;
          transition: color .22s;
        }
        .ft-bottom-link:hover { color: rgba(255,198,157,.65); }

        .ft-bottom-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(255,198,157,.20); flex-shrink: 0;
        }

        /* Spinning craft wheel */
        .ft-wheel {
          width: 48px; height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(205,44,88,.25);
          display: flex; align-items: center; justify-content: center;
          position: relative;
          animation: ftSpin 18s linear infinite;
          flex-shrink: 0;
        }
        .ft-wheel-inner {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(205,44,88,.15), rgba(255,198,157,.15));
          border: 1px solid rgba(205,44,88,.18);
          animation: ftSpin 10s linear infinite reverse;
          display: flex; align-items: center; justify-content: center;
        }
        .ft-wheel-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #CD2C58, #E06B80);
        }

        /* Large bg text */
        .ft-bg-text {
          position: absolute; bottom: -20px; left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(6rem, 14vw, 14rem);
          font-weight: 600; color: rgba(205,44,88,.04);
          white-space: nowrap; pointer-events: none; user-select: none;
          letter-spacing: .05em; line-height: 1; z-index: 0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 980px) {
          .ft-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 620px) {
          .ft-grid { grid-template-columns: 1fr; gap: 36px; }
          .ft-body { padding: 56px 22px 44px; }
          .ft-cta-strip { padding: 48px 22px; }
          .ft-cta-inner { flex-direction: column; align-items: flex-start; }
          .ft-bottom { flex-direction: column; align-items: center; text-align: center; }
          .ft-bottom-links { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>

      <footer className="ft-footer">

        {/* ── PRE-FOOTER CTA ── */}
        <div ref={ctaRef} className="ft-cta-strip" style={{
          opacity: ctaIn ? 1 : 0, transform: ctaIn ? "translateY(0)" : "translateY(24px)",
          transition: "opacity .9s ease, transform .9s ease",
        }}>
          {/* bg circles */}
          <div className="ft-cta-bg-circle" style={{ width: 360, height: 360, background: "rgba(255,255,255,.05)", top: -120, right: -80 }} />
          <div className="ft-cta-bg-circle" style={{ width: 220, height: 220, background: "rgba(255,255,255,.04)", bottom: -60, left: 80 }} />
          <div className="ft-cta-bg-circle" style={{ width: 120, height: 120, background: "rgba(255,255,255,.06)", top: "30%", left: "40%" }} />

          <div className="ft-cta-inner">
            <div className="ft-cta-left">
              <p className="ft-cta-eyebrow">Ready to create?</p>
              <h2 className="ft-cta-heading">
                Start your journey<br />
                with <em>Kalasrijan</em>
              </h2>
            </div>
            <a href="#contact" className="ft-cta-btn">
              Join a Class Today
              <span className="ft-cta-btn-arr">→</span>
            </a>
          </div>
        </div>

        {/* ── CRAFT MARQUEE ── */}
        <div className="ft-marquee-wrap">
          <div className="ft-marquee-track">
            {[...CRAFTS_MARQUEE, ...CRAFTS_MARQUEE].map((item, i) => (
              <span key={i} className="ft-marquee-item">
                <span className="ft-mq-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Ambient blobs */}
        <div className="ft-blob" style={{ width: 500, height: 500, background: "radial-gradient(circle,rgba(205,44,88,.07) 0%,transparent 65%)", top: -100, right: -140, animation: "ftBlob 18s ease-in-out infinite alternate" }} />
        <div className="ft-blob" style={{ width: 380, height: 380, background: "radial-gradient(circle,rgba(255,198,157,.04) 0%,transparent 65%)", bottom: 0, left: -100, animation: "ftBlob 14s ease-in-out infinite alternate" }} />

        {/* Floating petals */}
        {PETALS.map((p, i) => (
          <div key={i} style={{
            position: "absolute", width: p.w, height: p.h,
            top: p.top, left: p.left,
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
            background: "#E06B80", opacity: p.op, pointerEvents: "none", zIndex: 0,
            animation: `ftPetal ${p.dur} linear ${p.del} infinite`,
          }} />
        ))}

        {/* Large watermark text */}
        <div className="ft-bg-text" aria-hidden="true">Kalasrijan</div>

        {/* ── MAIN BODY ── */}
        <div ref={mainRef} className="ft-body" style={{
          opacity: mainIn ? 1 : 0, transform: mainIn ? "translateY(0)" : "translateY(22px)",
          transition: "opacity .9s ease .1s, transform .9s ease .1s",
        }}>
          <div className="ft-grid">

            {/* Brand column */}
            <div className="ft-brand">
              <a href="#home" className="ft-logo" aria-label="Kalasrijan">
                <div className="ft-logo-mark">क</div>
                <div className="ft-logo-text">
                  <span className="ft-logo-name">Kalasrijan</span>
                  <span className="ft-logo-sub">by Suman Jain</span>
                </div>
              </a>

              <p className="ft-brand-desc">
                A creative studio where art, craft, and culture come alive. Guided by Suman Jain's decades of expertise — Kalasrijan is where passion meets practice.
              </p>

              {/* Address */}
              <div style={{ marginBottom: 22 }}>
                <a href="https://maps.app.goo.gl/j6s6BdEftSDJV2hc8" target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "flex-start", gap: 10, textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = ".80")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  <span style={{ fontSize: "1rem", marginTop: 1, flexShrink: 0 }}>📍</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: ".76rem", color: "rgba(255,198,157,.38)", lineHeight: 1.65, fontWeight: 300 }}>
                    Kalathali A-21, Van Vihar Colony,<br />
                    Opp. Kamal N Company, Tonk Road<br />
                    Jaipur – 302018
                  </span>
                </a>
              </div>

              {/* Socials */}
              <div className="ft-socials">
                {SOCIALS.map(s => (
                  <a key={s.label} href={s.href} className="ft-social-link" target="_blank" rel="noopener noreferrer">
                    <div className="ft-social-icon" style={{ background: `${s.color}18`, color: s.color }}>
                      {s.icon}
                    </div>
                    <div className="ft-social-info">
                      <span className="ft-social-name">{s.label}</span>
                      <span className="ft-social-handle">{s.handle}</span>
                    </div>
                    <span className="ft-social-arr">→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <LinkCol title="Quick Links" links={QUICK_LINKS} />

            {/* Classes */}
            <LinkCol title="Classes" links={CLASS_LINKS} />

            {/* Services + Newsletter */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <LinkCol title="Services" links={SERVICE_LINKS} />

              {/* Newsletter */}
              <div>
                <p className="ft-nl-heading">Stay Inspired</p>
                <p className="ft-nl-sub">Get updates on new classes & creative workshops.</p>
                <NewsletterForm />
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="ft-divider" />

          {/* Bottom bar */}
          <div className="ft-bottom">
          <p className="ft-copy">
  © {year} <strong>Kalasrijan</strong> · Jaipur, Rajasthan
  <br />
  <span style={{ opacity: 0.8, fontSize: '0.9em' }}>
    Developed by <a href="https://www.linkedin.com/in/anishabirla/" target="_blank" rel="noopener noreferrer" style={{ color: '#CD2C58' }}>Anisha Birla</a>
  </span>
</p>

            {/* Spinning wheel */}
            <div className="ft-wheel">
              <div className="ft-wheel-inner">
                <div className="ft-wheel-dot" />
              </div>
            </div>

            <div className="ft-bottom-links">
              {["Privacy Policy", "Terms of Use", "Sitemap"].map((l, i, arr) => (
                <span key={l} style={{ display: "contents" }}>
                  <a href="#" className="ft-bottom-link">{l}</a>
                  {i < arr.length - 1 && <div className="ft-bottom-dot" />}
                </span>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}