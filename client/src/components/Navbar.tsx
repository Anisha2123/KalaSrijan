"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

/* ─────────────────────────────────────
   NAV LINKS DATA
───────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "/", sub: null },
  {
    label: "Classes",
    href: "/training-classes",
    sub: [
      { label: "Painting",      href: "/training-classes/#painting",    desc: "8 styles · ₹3K–₹5K" },
      { label: "Stitching",     href: "/training-classes/#stitching",   desc: "3 diploma courses" },
      { label: "Let's Draw",    href: "/training-classes/#drawing",     desc: "12-level flagship program" },
      { label: "Calligraphy",   href: "/training-classes/#calligraphy", desc: "30 fonts · Hindi & English" },
      { label: "Clay Modeling", href: "/training-classes/#clay",        desc: "3D decorative art" },
      { label: "Paper Craft",   href: "/training-classes/#paper",       desc: "Bags · Origami · Flowers" },
      { label: "Resin Art",     href: "/training-classes/#resin",       desc: "Trending epoxy art" },
      { label: "Candle Making", href: "/training-classes/#candle",      desc: "Scented candles" },
      { label: "Soap Making",   href: "/training-classes/#soap",        desc: "Natural skincare" },
      { label: "Rangoli",       href: "/training-classes/#rangoli",     desc: "Traditional designs" },
      { label: "Lippan Art",    href: "/training-classes/#lippan",      desc: "Mud & mirror art" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    sub: [
      { label: "Hand Painting",      href: "/services/#hand-painting",      desc: "Custom art on any surface" },
      { label: "Thermacol Art",      href: "/services/#thermacol-art",      desc: "Event décor & sculptures" },
      { label: "Fancy Dress",        href: "/services/#fancy-dress",        desc: "Costume design & props" },
      { label: "School Projects",    href: "/services/#school-projects",    desc: "Models & STEM work" },
      { label: "Wedding Hampers",    href: "/services/#wedding-hampers",    desc: "Bespoke gift packaging" },
      { label: "Card Decoration",    href: "/services/#card-decoration",    desc: "Custom invitation art" },
      { label: "Custom Event Décor", href: "/services/#custom-event-decor", desc: "Theme-based decor items" },
    ],
  },
  { label: "Gallery", href: "/gallery",   sub: null },
  {
    label: "About",
    href: "/about-us",
    sub: [
      { label: "Meet Suman Jain", href: "/about-us/#meet-the-maker", desc: "The story behind Kalasrijan" },
      { label: "Why Choose Us",  href: "/about-us/#why-choose",      desc: "Experience · Trust · Creativity" },
      { label: "Our Journey",    href: "/about-us/#journey",          desc: "30+ years of art & craft" },
    ],
  },
];

/* ─────────────────────────────────────
   SCROLL PROGRESS BAR
───────────────────────────────────── */
function ScrollProgress() {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const h = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProg(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0,
      width: `${prog}%`, height: 2,
      background: "linear-gradient(90deg, #CD2C58, #FFC69D, #E06B80)",
      transition: "width 0.1s linear", zIndex: 100,
    }} />
  );
}

/* ─────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled]             = useState(false);
  const [openMenu, setOpenMenu]             = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const navRef      = useRef<HTMLElement>(null);
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location    = useLocation();

  const getActiveLink = () => {
    const p = location.pathname;
    if (p.startsWith("/training-classes")) return "Classes";
    if (p.startsWith("/services"))         return "Services";
    if (p.startsWith("/gallery"))          return "Gallery";
    if (p.startsWith("/about-us"))         return "About";
    if (p === "/")                         return "Home";
    return "";
  };

  // Scroll detection
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleDropdownEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  const isScrolled = scrolled || mobileOpen;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }

        /* ════════════════════════════
           NAV BASE
        ════════════════════════════ */
        .nb-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          transition: background .35s ease, box-shadow .35s ease, backdrop-filter .35s ease;
        }
        .nb-nav.nb-scrolled {
          background: rgba(255,248,244,.92);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 1px 0 rgba(205,44,88,.10), 0 8px 32px rgba(42,16,24,.07);
        }
        .nb-nav.nb-top { background: transparent; }

        .nb-inner {
          max-width: 1320px; margin: 0 auto;
          padding: 0 36px; height: 72px;
          display: flex; align-items: center; justify-content: space-between;
          position: relative;
        }

        /* ════════════════════════════
           LOGO
        ════════════════════════════ */
        .nb-logo {
          display: flex; align-items: center; gap: 11px;
          text-decoration: none; flex-shrink: 0;
          opacity: 0; transform: translateY(-10px);
          animation: nbFadeDown .7s ease .05s forwards;
        }
        .nb-logo-mark {
          width: 40px; height: 40px; border-radius: 12px;
          background: linear-gradient(135deg, #CD2C58 0%, #E06B80 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem; font-weight: 600; color: #fff; flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(205,44,88,.30);
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .nb-logo:hover .nb-logo-mark { transform: rotate(-6deg) scale(1.07); box-shadow: 0 8px 24px rgba(205,44,88,.40); }
        .nb-logo-text  { display: flex; flex-direction: column; gap: 0; }
        .nb-logo-name  { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 600; color: #2a1018; line-height: 1.1; letter-spacing: .01em; transition: color .25s; }
        .nb-logo:hover .nb-logo-name { color: #CD2C58; }
        .nb-logo-tagline { font-family: 'DM Sans', sans-serif; font-size: .60rem; letter-spacing: .14em; text-transform: uppercase; color: #7a4a55; font-weight: 400; line-height: 1; }

        /* ════════════════════════════
           DESKTOP LINKS
        ════════════════════════════ */
        .nb-links { display: flex; align-items: center; gap: 4px; list-style: none; }
        .nb-item  { position: relative; opacity: 0; transform: translateY(-10px); }
        .nb-item:nth-child(1) { animation: nbFadeDown .65s ease .10s forwards; }
        .nb-item:nth-child(2) { animation: nbFadeDown .65s ease .16s forwards; }
        .nb-item:nth-child(3) { animation: nbFadeDown .65s ease .22s forwards; }
        .nb-item:nth-child(4) { animation: nbFadeDown .65s ease .28s forwards; }
        .nb-item:nth-child(5) { animation: nbFadeDown .65s ease .34s forwards; }
        .nb-item:nth-child(6) { animation: nbFadeDown .65s ease .40s forwards; }

        .nb-link {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 8px 14px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: .84rem; font-weight: 400;
          color: #2a1018; text-decoration: none; letter-spacing: .02em;
          transition: color .22s, background .22s;
          cursor: pointer; position: relative; white-space: nowrap;
        }
        .nb-link::after {
          content: ''; position: absolute; bottom: 2px;
          left: 50%; right: 50%; height: 1.5px;
          background: #CD2C58;
          transition: left .25s ease, right .25s ease; border-radius: 2px;
        }
        .nb-link:hover::after, .nb-link.nb-active::after { left: 14px; right: 14px; }
        .nb-link:hover { color: #CD2C58; }
        .nb-link.nb-active { color: #CD2C58; font-weight: 500; }

        .nb-chevron { display: inline-block; font-size: .6rem; transition: transform .25s ease; opacity: .55; }
        .nb-item.nb-open .nb-chevron { transform: rotate(180deg); opacity: 1; }

        /* ════════════════════════════
           DESKTOP DROPDOWN
        ════════════════════════════ */
        .nb-dropdown {
          position: absolute; top: calc(100% + 10px);
          left: 50%;
          min-width: 240px;
          background: rgba(255,248,244,.97);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(205,44,88,.14); border-radius: 18px;
          padding: 10px;
          box-shadow: 0 20px 60px rgba(42,16,24,.12), 0 4px 16px rgba(205,44,88,.08);
          opacity: 0; pointer-events: none;
          /* FIX: combine translate into one transform property */
          transform: translateX(-50%) translateY(-8px) scale(.97);
          transition: opacity .22s ease, transform .22s ease;
        }
        .nb-item.nb-open .nb-dropdown {
          opacity: 1; pointer-events: auto;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        /* FIX: arrow uses separate positioning, not conflicting transforms */
        .nb-dropdown::before {
          content: ''; position: absolute;
          top: -7px; left: 50%;
          margin-left: -6px;      /* centers the 12px arrow */
          width: 12px; height: 12px;
          background: rgba(255,248,244,.97);
          border-left: 1px solid rgba(205,44,88,.14);
          border-top: 1px solid rgba(205,44,88,.14);
          transform: rotate(45deg);
        }

        .nb-dd-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 11px 14px; border-radius: 12px;
          text-decoration: none; transition: background .2s; cursor: pointer;
        }
        .nb-dd-item:hover { background: rgba(205,44,88,.06); }
        .nb-dd-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: linear-gradient(135deg, #CD2C58, #E06B80);
          flex-shrink: 0; margin-top: 5px; transition: transform .2s;
        }
        .nb-dd-item:hover .nb-dd-dot { transform: scale(1.4); }
        .nb-dd-label { font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 500; color: #2a1018; line-height: 1.2; margin-bottom: 2px; transition: color .2s; }
        .nb-dd-item:hover .nb-dd-label { color: #CD2C58; }
        .nb-dd-desc  { font-family: 'DM Sans', sans-serif; font-size: .70rem; color: #7a4a55; font-weight: 300; line-height: 1.3; }

        /* ════════════════════════════
           CTA BUTTON
        ════════════════════════════ */
        .nb-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: #CD2C58; color: #fff;
          padding: 10px 22px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: .83rem; font-weight: 500;
          text-decoration: none; letter-spacing: .03em;
          box-shadow: 0 4px 16px rgba(205,44,88,.30);
          transition: background .22s, transform .22s, box-shadow .22s;
          opacity: 0; transform: translateY(-10px);
          animation: nbFadeDown .65s ease .46s forwards;
          white-space: nowrap; flex-shrink: 0;
        }
        .nb-cta:hover { background: #b82350; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(205,44,88,.42); }
        .nb-cta-arrow { transition: transform .22s; }
        .nb-cta:hover .nb-cta-arrow { transform: translateX(4px); }

        /* ════════════════════════════
           HAMBURGER
        ════════════════════════════ */
        .nb-burger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; padding: 8px; cursor: pointer;
          opacity: 0; animation: nbFadeDown .65s ease .20s forwards;
          -webkit-tap-highlight-color: transparent;
        }
        .nb-burger-line {
          display: block; width: 24px; height: 1.5px;
          background: #2a1018; border-radius: 2px;
          transform-origin: center;
          transition: transform .30s ease, opacity .25s ease, width .25s ease;
        }
        .nb-burger.nb-open .nb-burger-line:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .nb-burger.nb-open .nb-burger-line:nth-child(2) { opacity: 0; width: 0; }
        .nb-burger.nb-open .nb-burger-line:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ════════════════════════════════════════
           MOBILE PANEL
           FIX: uses flex column so inner content
           can scroll independently via overflow-y
        ════════════════════════════════════════ */
        .nb-mobile-panel {
          position: fixed;
          top: 72px; left: 0; right: 0; bottom: 0;
          background: rgba(255,248,244,.98);
          backdrop-filter: blur(20px);
          z-index: 999;
          /* FIX: flex column so .nb-mob-scroll-area can flex:1 and scroll */
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform .38s cubic-bezier(.22,.61,.36,1);
        }
        .nb-mobile-panel.nb-mob-open { transform: translateX(0); }

        /* ── Scrollable area inside the panel ── */
        .nb-mob-scroll-area {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 20px 24px 0;
          /* nice thin scrollbar */
          scrollbar-width: thin;
          scrollbar-color: rgba(205,44,88,.20) transparent;
        }
        .nb-mob-scroll-area::-webkit-scrollbar { width: 4px; }
        .nb-mob-scroll-area::-webkit-scrollbar-thumb { background: rgba(205,44,88,.20); border-radius: 4px; }

        /* ── Nav link list ── */
        .nb-mob-links { display: flex; flex-direction: column; gap: 4px; }
        .nb-mob-item  { border-bottom: 1px solid rgba(205,44,88,.08); }
        .nb-mob-item:last-child { border-bottom: none; }

        .nb-mob-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 4px;
          font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 400; color: #2a1018;
          text-decoration: none; cursor: pointer; width: 100%;
          background: none; border: none; text-align: left;
          transition: color .22s;
          -webkit-tap-highlight-color: transparent;
        }
        .nb-mob-link:hover, .nb-mob-link.nb-mob-active { color: #CD2C58; }

        .nb-mob-chevron { font-size: .65rem; transition: transform .25s; color: #7a4a55; }
        .nb-mob-chevron.nb-mob-ch-open { transform: rotate(180deg); }

        /* ════════════════════════════════════════════
           MOBILE SUBMENU
           FIX 1: max-height large enough for Classes (11 items × ~52px ≈ 572px)
           FIX 2: overflow-y: auto so it scrolls when container is short
           FIX 3: max-height transition still works; combined with panel scroll
        ════════════════════════════════════════════ */
        .nb-mob-sub {
          max-height: 0;
          overflow: hidden;
          transition: max-height .38s cubic-bezier(.4,0,.2,1);
        }
        .nb-mob-sub.nb-mob-sub-open {
          /* 11 items × ~52px + padding — large enough for any submenu */
          max-height: 620px;
        }

        .nb-mob-sub-item {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 14px; margin: 2px 0; border-radius: 12px;
          text-decoration: none; transition: background .2s; cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .nb-mob-sub-item:hover, .nb-mob-sub-item:active { background: rgba(205,44,88,.06); }

        .nb-mob-sub-dot   { width: 5px; height: 5px; border-radius: 50%; background: linear-gradient(135deg, #CD2C58, #E06B80); flex-shrink: 0; }
        .nb-mob-sub-label { font-family: 'DM Sans', sans-serif; font-size: .85rem; font-weight: 500; color: #2a1018; }
        .nb-mob-sub-desc  { font-family: 'DM Sans', sans-serif; font-size: .70rem; color: #7a4a55; font-weight: 300; display: block; margin-top: 1px; }

        /* ── Footer — fixed at bottom, never scrolls away ── */
        .nb-mob-footer {
          flex-shrink: 0;
          padding: 20px 24px 32px;
          border-top: 1px solid rgba(205,44,88,.10);
          display: flex; flex-direction: column; gap: 14px;
          background: rgba(255,248,244,.98);
          /* safe area for devices with home indicator */
          padding-bottom: max(32px, env(safe-area-inset-bottom, 32px));
        }
        .nb-mob-cta {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          background: #CD2C58; color: #fff;
          padding: 15px 24px; border-radius: 14px;
          font-family: 'DM Sans', sans-serif; font-size: .9rem; font-weight: 500;
          text-decoration: none; letter-spacing: .03em;
          box-shadow: 0 6px 22px rgba(205,44,88,.30);
          -webkit-tap-highlight-color: transparent;
        }
        .nb-mob-info {
          display: flex; align-items: center; justify-content: center; gap: 18px; flex-wrap: wrap;
        }
        .nb-mob-social {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: 'DM Sans', sans-serif; font-size: .78rem; color: #7a4a55; text-decoration: none;
          transition: color .22s;
        }
        .nb-mob-social:hover { color: #CD2C58; }
        .nb-mob-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: .95rem; font-style: italic;
          color: rgba(122,74,85,.60); text-align: center; line-height: 1.6;
        }

        /* ════════════════════════════
           ANIMATIONS
        ════════════════════════════ */
        @keyframes nbFadeDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ════════════════════════════
           BREAKPOINT
        ════════════════════════════ */
        @media (max-width: 900px) {
          .nb-links, .nb-cta { display: none !important; }
          .nb-burger { display: flex !important; }
          .nb-inner  { padding: 0 20px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav
        ref={navRef}
        className={`nb-nav ${isScrolled ? "nb-scrolled" : "nb-top"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nb-inner">

          {/* LOGO */}
          <a href="/" className="nb-logo" aria-label="Kalasrijan home">
            <div className="nb-logo-mark">क</div>
            <div className="nb-logo-text">
              <span className="nb-logo-name">Kalasrijan</span>
              <span className="nb-logo-tagline">by Suman Jain</span>
            </div>
          </a>

          {/* DESKTOP LINKS */}
          <ul className="nb-links" role="list">
            {NAV_LINKS.map((link) => (
              <li
                key={link.label}
                className={`nb-item ${openMenu === link.label ? "nb-open" : ""}`}
                onMouseEnter={() => link.sub && handleDropdownEnter(link.label)}
                onMouseLeave={() => link.sub && handleDropdownLeave()}
              >
                <a
                  href={link.href}
                  className={`nb-link ${getActiveLink() === link.label ? "nb-active" : ""}`}
                  aria-haspopup={link.sub ? "true" : undefined}
                  aria-expanded={link.sub ? openMenu === link.label : undefined}
                >
                  {link.label}
                  {link.sub && <span className="nb-chevron">▾</span>}
                </a>

                {link.sub && (
                  <div className="nb-dropdown" role="menu">
                    {link.sub.map((sub) => (
                      <a
                        key={sub.label}
                        href={sub.href}
                        className="nb-dd-item"
                        role="menuitem"
                        onClick={() => setOpenMenu(null)}
                      >
                        <div className="nb-dd-dot" />
                        <div>
                          <div className="nb-dd-label">{sub.label}</div>
                          <div className="nb-dd-desc">{sub.desc}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href="tel:+918890448242" className="nb-cta">
            Join a Class <span className="nb-cta-arrow">→</span>
          </a>

          {/* HAMBURGER */}
          <button
            className={`nb-burger ${mobileOpen ? "nb-open" : ""}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className="nb-burger-line" />
            <span className="nb-burger-line" />
            <span className="nb-burger-line" />
          </button>
        </div>

        <ScrollProgress />
      </nav>

      {/* ════════════════════════════════════════
          MOBILE PANEL
          Structure:
            panel (flex column, fixed)
              └─ scroll-area (flex:1, overflow-y:auto)  ← links scroll here
                   └─ links list
              └─ footer (flex-shrink:0, fixed at bottom) ← always visible
      ════════════════════════════════════════ */}
      <div
        className={`nb-mobile-panel ${mobileOpen ? "nb-mob-open" : ""}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >

        {/* ── Scrollable links area ── */}
        <div className="nb-mob-scroll-area">
          <div className="nb-mob-links">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="nb-mob-item">
                {link.sub ? (
                  <>
                    <button
                      className={`nb-mob-link ${getActiveLink() === link.label ? "nb-mob-active" : ""}`}
                      onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                      aria-expanded={mobileExpanded === link.label}
                    >
                      <span>{link.label}</span>
                      <span className={`nb-mob-chevron ${mobileExpanded === link.label ? "nb-mob-ch-open" : ""}`}>▾</span>
                    </button>

                    <div className={`nb-mob-sub ${mobileExpanded === link.label ? "nb-mob-sub-open" : ""}`}>
                      {link.sub.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="nb-mob-sub-item"
                          onClick={() => setMobileOpen(false)}
                        >
                          <div className="nb-mob-sub-dot" />
                          <div>
                            <div className="nb-mob-sub-label">{sub.label}</div>
                            <span className="nb-mob-sub-desc">{sub.desc}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a
                    href={link.href}
                    className={`nb-mob-link ${getActiveLink() === link.label ? "nb-mob-active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{link.href === "/" ? link.label : link.label}</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer — pinned to bottom, never scrolls away ── */}
        <div className="nb-mob-footer">
          <a href="tel:+918890448242" className="nb-mob-cta" onClick={() => setMobileOpen(false)}>
            Join a Class →
          </a>
          <div className="nb-mob-info">
            <a href="https://wa.me/918890448242" className="nb-mob-social" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a href="https://instagram.com/kalasrijan" className="nb-mob-social" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
          </div>
          <p className="nb-mob-quote">"Guided by years of expertise, Kalasrijan is where passion meets practice."</p>
        </div>

      </div>

      {/* Spacer */}
      <div style={{ height: 72 }} aria-hidden="true" />
    </>
  );
}