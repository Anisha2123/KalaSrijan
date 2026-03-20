"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import SmartImage from "../utils/SmartImage";

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */
const images = [
  { id: 1,  src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916631/1_zlkloo.jpg",                           title: 'Artistic Masterpiece', category: 'painting' },
  { id: 2,  src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916632/2_pik48p.jpg",                            title: 'Creative Vision',      category: 'painting' },
  { id: 4,  src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916634/3_y9dzvu.png",                           title: 'Artistic Design',      category: 'painting' },
  { id: 5,  src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916634/4_tjyxpy.png",                            title: 'Creative Journey',     category: 'painting' },
  { id: 6,  src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916634/Screenshot_2026-03-10_154252_ykefyq.png", title: 'Art Showcase',         category: 'painting' },
  { id: 7,  src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916635/1_shjfwn.png",                           title: 'Culinary Art',         category: 'baking'   },
  { id: 9,  src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916635/2_ord13a.png",                           title: 'Sweet Creation',       category: 'baking'   },
  { id: 10, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916635/4_mvydjp.png",                           title: 'Culinary Excellence',  category: 'baking'   },
  { id: 11, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916635/1_jox1sa.png",                           title: 'Creative Activity',    category: 'activity' },
  { id: 12, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916636/3_zfnbse.png",                           title: 'Workshop Experience',  category: 'activity' },
  { id: 13, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916636/4_menrau.png",                           title: 'Learning Session',     category: 'activity' },
  { id: 15, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916636/6_rjftmg.png",                           title: 'Community Art',        category: 'activity' },
  { id: 16, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916635/22_epex0c.png",                          title: 'Group Creation',       category: 'activity' },
  { id: 17, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916637/1_i4q4nk.png",                           title: 'Package Design',       category: 'craft'    },
  { id: 18, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916637/2_kvlk8b.png",                           title: 'Creative Packaging',   category: 'craft'    },
  { id: 19, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916638/3_pzt3ds.png",                           title: 'Gift Wrapping Art',    category: 'craft'    },
  { id: 20, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916638/4_y0zqis.png",                           title: 'Packaging Excellence', category: 'craft'    },
  { id: 21, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916640/2_mh9irm.png",                           title: 'Artistic Expression',  category: 'painting' },
  { id: 22, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916639/3_kx5ife.png",                           title: 'Contemporary Art',     category: 'painting' },
  { id: 23, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916639/paiinting_not_dlt_izx7yj.png",           title: 'Timeless Masterpiece', category: 'painting' },
  { id: 24, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916642/1_c6uewx.png",                           title: 'Fine Art',             category: 'painting' },
  { id: 25, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916642/2_b0blcb.jpg",                           title: 'Artistic Vision',      category: 'painting' },
  { id: 26, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916642/3_mrdten.png",                           title: 'Color Study',          category: 'painting' },
  { id: 27, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916642/1_aetfxf.png",                           title: 'Project Showcase',     category: 'project'  },
  { id: 28, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916643/2_j4t6qu.png",                           title: 'Collaborative Work',   category: 'project'  },
  { id: 29, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916643/3_fcv2tx.png",                           title: 'Creative Project',     category: 'project'  },
  { id: 30, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916643/4_myg0xr.png",                           title: 'Group Project',        category: 'project'  },
  { id: 31, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916644/1_erxxxe.png",                           title: 'Resin Art',            category: 'resin'    },
  { id: 32, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916646/2_hrykta.png",                           title: 'Resin Masterpiece',    category: 'resin'    },
  { id: 33, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916646/3_yd645t.png",                           title: 'Liquid Art',           category: 'resin'    },
  { id: 34, src: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_auto/v1773916647/4_xfpmry.png",                           title: 'Resin Creation',       category: 'resin'    },
];

const CAT_META: Record<string, { label: string; icon: string; color: string }> = {
  painting: { label: 'Painting',   icon: '🎨', color: '#CD2C58' },
  baking:   { label: 'Baking',     icon: '🍰', color: '#E06B80' },
  activity: { label: 'Activities', icon: '✨', color: '#CD2C58' },
  craft:    { label: 'Craft',      icon: '🎁', color: '#E06B80' },
  project:  { label: 'Projects',   icon: '🔬', color: '#CD2C58' },
  resin:    { label: 'Resin Art',  icon: '💎', color: '#E06B80' },
};

const ALL_CATS = ['all', ...Object.keys(CAT_META)];
const H_PAT = ['tall','short','medium','medium','tall','short','short','tall','medium','short','medium','tall'];

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
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView: v };
}

/* ─────────────────────────────────────
   LIGHTBOX
───────────────────────────────────── */
function Lightbox({ image, onClose, onPrev, onNext, idx, total }: {
  image: typeof images[0]; onClose: () => void;
  onPrev: () => void; onNext: () => void;
  idx: number; total: number;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose, onPrev, onNext]);

  const meta = CAT_META[image.category];

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(18,6,10,0.96)', backdropFilter: 'blur(14px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      animation: 'lbFadeIn .28s ease both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        position: 'relative', maxWidth: 920, width: '100%',
        animation: 'lbSlideUp .32s ease both',
      }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{
            background: meta.color, color: '#fff',
            fontSize: '.63rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
            padding: '5px 14px', borderRadius: 100,
          }}>{meta.icon} {meta.label}</span>
          <button onClick={onClose} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,.09)', border: '1px solid rgba(255,255,255,.18)',
            color: '#fff', cursor: 'pointer', fontSize: '.82rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#CD2C58')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.09)')}>✕</button>
        </div>

        {/* Image — use a fixed-height container so the image always has space to render */}
        <div style={{
          position: 'relative', borderRadius: 18, overflow: 'hidden',
          /* explicit height — not just maxHeight — so children can fill it */
          height: 'min(67vh, 560px)',
          background: 'rgba(255,255,255,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <button onClick={onPrev} style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.18)',
            color: '#fff', cursor: 'pointer', fontSize: '1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#CD2C58')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.10)')}>‹</button>

          {/* Plain <img> — completely isolated from .pg-card-img class styles */}
          <img
            src={image.src}
            alt={image.title}
            style={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: 14,
            }}
          />

          <button onClick={onNext} style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.18)',
            color: '#fff', cursor: 'pointer', fontSize: '1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#CD2C58')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.10)')}>›</button>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 2px 0', gap: 12 }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.35rem', fontWeight: 400, color: 'rgba(255,230,212,.88)', lineHeight: 1.2 }}>{image.title}</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', fontWeight: 300, color: 'rgba(255,198,157,.40)', whiteSpace: 'nowrap' }}>{idx + 1} / {total}</div>
        </div>

        {/* Dot progress */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', paddingTop: 14 }}>
          {Array.from({ length: Math.min(total, 9) }).map((_, i) => (
            <div key={i} style={{
              width: 5, height: 5, borderRadius: '50%',
              background: i === idx % 9 ? meta.color : 'rgba(255,198,157,.22)',
              transform: i === idx % 9 ? 'scale(1.6)' : 'scale(1)',
              transition: 'all .3s',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   MASONRY CARD
───────────────────────────────────── */
function MasonryCard({ img, heightKey, idx, onOpen }: {
  img: typeof images[0]; heightKey: string; idx: number; onOpen: () => void;
}) {
  const { ref, inView } = useInView(0.04);
  const [hov, setHov] = useState(false);
  const meta = CAT_META[img.category];

  // Desktop fixed heights; on mobile we use aspect-ratio instead (see CSS)
  const desktopHeights: Record<string, string> = { tall: '355px', medium: '268px', short: '188px' };
  const desktopHeight = desktopHeights[heightKey] || '260px';

  return (
    <div
      ref={ref}
      onClick={onOpen}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`pg-card pg-card-${heightKey}`}
      style={{
        breakInside: 'avoid',
        marginBottom: 14,
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        // Desktop: fixed height. Mobile override via CSS class below.
        height: desktopHeight,
        background: 'rgba(42,16,24,.08)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(26px) scale(0.97)',
        transition: `opacity .72s ease ${(idx % 8) * .055}s, transform .72s ease ${(idx % 8) * .055}s`,
        boxShadow: hov ? '0 18px 48px rgba(42,16,24,.18)' : 'none',
      }}
    >
      {/*
        THE FIX:
        Desktop: image fills the fixed-height container with height:100%.
        Mobile: the card has height:auto + aspect-ratio (set via CSS),
                so the image must use width:100% + height:100% on a
                position:absolute fill — achieved via .pg-card-img CSS class.
      */}
      <SmartImage
        src={img.src}
        alt={img.title}
        loading="lazy"
        decoding="async"
        className="pg-card-img"
        style={{
          transition: 'transform .65s ease',
          transform: hov ? 'scale(1.08)' : 'scale(1)',
        }}
      />

      {/* Hover veil */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(42,16,24,.84) 0%, rgba(42,16,24,.14) 56%, transparent 100%)',
        opacity: hov ? 1 : 0, transition: 'opacity .32s ease',
        display: 'flex', alignItems: 'flex-end',
      }}>
        <div style={{
          padding: '16px 15px', width: '100%',
          transform: hov ? 'translateY(0)' : 'translateY(10px)',
          transition: 'transform .32s ease',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: meta.color, color: '#fff',
            fontSize: '.60rem', fontWeight: 700, letterSpacing: '.11em', textTransform: 'uppercase',
            padding: '4px 10px', borderRadius: 100, marginBottom: 7,
          }}>{meta.icon} {meta.label}</span>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.07rem', fontWeight: 400, color: '#fff', lineHeight: 1.2, marginBottom: 9 }}>{img.title}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: hov ? '#CD2C58' : 'rgba(255,255,255,.16)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '.88rem', color: '#fff', transition: 'background .22s',
            }}>⤢</div>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      {[
        { top: 9, left: 9, borderTop: '1.5px solid', borderLeft: '1.5px solid', borderRadius: '5px 0 0 0' },
        { bottom: 9, right: 9, borderBottom: '1.5px solid', borderRight: '1.5px solid', borderRadius: '0 0 5px 0' },
      ].map((s, i) => (
        <div key={i} style={{
          position: 'absolute', width: 18, height: 18,
          borderColor: `${meta.color}55`,
          opacity: hov ? 1 : 0, transition: 'opacity .3s',
          pointerEvents: 'none', ...s,
        } as React.CSSProperties} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────
   MAIN
───────────────────────────────────── */
export default function PhotoGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lbIdx, setLbIdx] = useState<number | null>(null);
  const [showCount, setShowCount] = useState(16);
  const { ref: headRef, inView: headIn } = useInView(0.04);

  const filtered = activeFilter === 'all' ? images : images.filter(i => i.category === activeFilter);
  const shown = filtered.slice(0, showCount);

  useEffect(() => setShowCount(16), [activeFilter]);

  const openLb = useCallback((imgId: number) => {
    setLbIdx(filtered.findIndex(i => i.id === imgId));
  }, [filtered]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes petalFlt  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(180deg)} }
        @keyframes lbFadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes lbSlideUp { from{transform:translateY(18px);opacity:0} to{transform:translateY(0);opacity:1} }
        @keyframes pgFadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ambBlob   { from{transform:translate(0,0)} to{transform:translate(20px,14px)} }

        /* ─────────────────────────────────────
           CARD IMAGE — THE CORE FIX
           Desktop: position:absolute fill so
             height:100% on the container works.
           Mobile: card has height:auto +
             aspect-ratio, image still fills via
             absolute positioning.
        ───────────────────────────────────── */
        .pg-card {
          /* Ensure absolute children are contained */
          position: relative;
        }
        .pg-card-img {
          /* Always fill the card absolutely — works for both
             fixed-height (desktop) and aspect-ratio (mobile) */
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── Masonry columns ── */
        .pg-masonry { columns: 4; column-gap: 14px; }

        /* ── Filters ── */
        .pg-filters {
          display: flex; flex-wrap: wrap; gap: 9px;
          justify-content: center;
        }

        /* ══════════════════════════════
           TABLET  768 – 1023px
        ══════════════════════════════ */
        @media (min-width: 768px) and (max-width: 1023px) {
          .pg-hero       { padding: 72px 32px 64px !important; }
          .pg-hero-inner { max-width: 560px !important; }
          .pg-hero-h1    { font-size: clamp(2.4rem, 5.5vw, 4rem) !important; }
          .pg-divider    { padding: 0 24px 36px !important; }
          .pg-filters    { padding: 0 24px 32px !important; }
          .pg-masonry    { columns: 3 !important; padding: 0 24px 40px !important; }
          .pg-load-more  { padding-bottom: 60px !important; }
        }

        /* ══════════════════════════════
           MOBILE  ≤767px
        ══════════════════════════════ */
        @media (max-width: 767px) {

          /* Hero */
          .pg-hero        { padding: 60px 20px 52px !important; text-align: left !important; }
          .pg-hero-eyebrow{ justify-content: flex-start !important; }
          .pg-hero-inner  { max-width: 100% !important; }
          .pg-hero-h1     { font-size: clamp(2.2rem, 9vw, 3rem) !important; text-align: left !important; }
          .pg-hero-sub    { text-align: left !important; margin: 0 !important; max-width: 100% !important; font-size: .9rem !important; }

          /* Divider */
          .pg-divider      { padding: 0 18px 28px !important; }
          .pg-divider-text { font-size: .62rem !important; }

          /* Filters: horizontal scroll row */
          .pg-filters {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            justify-content: flex-start !important;
            padding: 0 18px 28px !important;
            scrollbar-width: none !important;
            -webkit-overflow-scrolling: touch;
            gap: 8px !important;
          }
          .pg-filters::-webkit-scrollbar { display: none; }
          .pg-filter-btn {
            flex-shrink: 0 !important;
            padding: 9px 16px !important;
            font-size: .75rem !important;
          }

          /* Masonry: 2-col */
          .pg-masonry {
            columns: 2 !important;
            column-gap: 10px !important;
            padding: 0 18px 36px !important;
          }

          /*
            THE KEY FIX FOR MOBILE IMAGES:
            Remove the fixed height so the card can size naturally.
            Use aspect-ratio to give the card a real height so
            the absolutely-positioned image has something to fill.
            Different aspect ratios mimic the tall/medium/short rhythm.
          */
          .pg-card {
            height: auto !important;
          }
          .pg-card-tall   { aspect-ratio: 3 / 4; }
          .pg-card-medium { aspect-ratio: 4 / 3.6; }
          .pg-card-short  { aspect-ratio: 4 / 3; }

          /* Load more */
          .pg-load-more { padding-bottom: 52px !important; }
          .pg-load-btn  { width: calc(100% - 36px) !important; justify-content: center !important; border-radius: 14px !important; padding: 15px 20px !important; }
        }

        @media (hover: none) {
          .pg-card:active { opacity: .88; }
        }
      `}</style>

      <div style={{ background: '#fff8f4', fontFamily: "'DM Sans',sans-serif", position: 'relative', overflow: 'hidden' }}>

        {/* Ambient blobs */}
        <div style={{ position: 'absolute', width: 540, height: 540, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,198,157,.14) 0%,transparent 65%)', top: '8%', right: -150, animation: 'ambBlob 16s ease-in-out infinite alternate', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(205,44,88,.06) 0%,transparent 65%)', bottom: '6%', left: -90, pointerEvents: 'none', zIndex: 0 }} />

        {/* ── HERO ── */}
        <div className="pg-hero" style={{
          background: '#2a1018', position: 'relative', overflow: 'hidden',
          padding: '96px 40px 84px', textAlign: 'center', zIndex: 1,
        }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 65% 55% at 85% 20%,rgba(205,44,88,.15) 0%,transparent 60%), radial-gradient(ellipse 50% 42% at 12% 80%,rgba(255,198,157,.07) 0%,transparent 60%)' }} />

          {/* Petals */}
          {([
            [18,'18%','8%','6s','0s',.10],[12,'72%','14%','8s','.8s',.07],
            [22,'25%','85%','7s','.4s',.09],[16,'60%','90%','5s','1.2s',.08],
            [10,'45%','50%','9s','.2s',.06],[14,'38%','32%','7.5s','.6s',.08],
          ] as [number,string,string,string,string,number][]).map(([size,top,left,dur,delay,op],i) => (
            <div key={i} style={{
              position: 'absolute', borderRadius: '60% 40% 70% 30%/50% 60% 40% 50%',
              background: '#E06B80', pointerEvents: 'none', zIndex: 0,
              width: size, height: size, top, left, opacity: op,
              animation: `petalFlt ${dur} linear ${delay} infinite`,
            }} />
          ))}

          <div className="pg-hero-inner" style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
            <div className="pg-hero-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, fontSize: 11, letterSpacing: '.20em', textTransform: 'uppercase', color: '#FFC69D', fontWeight: 500, marginBottom: 20, animation: 'pgFadeUp .85s ease both' }}>
              <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg,#FFC69D,transparent)', flexShrink: 0 }} />
              Studio Gallery
              <div style={{ width: 40, height: 1, background: 'linear-gradient(270deg,#FFC69D,transparent)', flexShrink: 0 }} />
            </div>
            <h1 className="pg-hero-h1" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2.8rem,6vw,5.6rem)', fontWeight: 300, lineHeight: 1.05, color: '#fff', marginBottom: 16, animation: 'pgFadeUp .9s ease .12s both' }}>
              A window into<br /><em style={{ fontStyle: 'italic', color: '#FFC69D' }}>Kalasrijan</em>
            </h1>
            <p className="pg-hero-sub" style={{ fontSize: '1rem', color: 'rgba(255,230,212,.55)', fontWeight: 300, lineHeight: 1.76, maxWidth: 460, margin: '0 auto', animation: 'pgFadeUp .9s ease .24s both' }}>
              Paintings, craft, baking, resin art, and the joy of making — every frame tells a story from Suman's studio.
            </p>
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div className="pg-divider" style={{ display: 'flex', alignItems: 'center', gap: 20, maxWidth: 1260, margin: '0 auto', padding: '0 36px 44px', position: 'relative', zIndex: 1 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(205,44,88,.18),transparent)' }} />
          <span className="pg-divider-text" style={{ fontSize: '.70rem', letterSpacing: '.16em', textTransform: 'uppercase', color: '#7a4a55', fontWeight: 500, whiteSpace: 'nowrap' }}>
            {images.length} works · 6 categories
          </span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(270deg,rgba(205,44,88,.18),transparent)' }} />
        </div>

        {/* ── FILTERS ── */}
        <div ref={headRef} className="pg-filters" style={{
          maxWidth: 1260, margin: '0 auto', padding: '0 36px 40px', position: 'relative', zIndex: 1,
          opacity: headIn ? 1 : 0,
          transform: headIn ? 'translateY(0)' : 'translateY(18px)',
          transition: 'opacity .8s ease, transform .8s ease',
        }}>
          {ALL_CATS.map(cat => {
            const count = cat === 'all' ? images.length : images.filter(i => i.category === cat).length;
            const meta = cat === 'all' ? null : CAT_META[cat];
            const isActive = activeFilter === cat;
            return (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className="pg-filter-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '9px 18px', borderRadius: 100,
                  border: `1.5px solid ${isActive ? '#CD2C58' : 'rgba(205,44,88,.22)'}`,
                  background: isActive ? '#CD2C58' : 'transparent',
                  color: isActive ? '#fff' : '#7a4a55',
                  fontFamily: "'DM Sans',sans-serif", fontSize: '.79rem', fontWeight: 500,
                  cursor: 'pointer', letterSpacing: '.03em', whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 18px rgba(205,44,88,.30)' : 'none',
                  transition: 'all .22s', flexShrink: 0,
                }}
                onMouseEnter={e => { if (!isActive) { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(205,44,88,.07)'; el.style.borderColor = '#E06B80'; el.style.color = '#CD2C58'; } }}
                onMouseLeave={e => { if (!isActive) { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(205,44,88,.22)'; el.style.color = '#7a4a55'; } }}
              >
                {meta && <span>{meta.icon}</span>}
                {cat === 'all' ? 'All Work' : meta!.label}
                <span style={{ background: 'rgba(255,255,255,.22)', borderRadius: 100, padding: '2px 8px', fontSize: '.65rem', fontWeight: 600 }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* ── MASONRY ── */}
        <div className="pg-masonry" style={{ maxWidth: 1260, margin: '0 auto', padding: '0 36px 48px', position: 'relative', zIndex: 1 }}>
          {shown.map((img, i) => (
            <MasonryCard
              key={img.id}
              img={img}
              heightKey={H_PAT[i % H_PAT.length]}
              idx={i}
              onOpen={() => openLb(img.id)}
            />
          ))}
        </div>

        {/* ── LOAD MORE ── */}
        {showCount < filtered.length && (
          <div className="pg-load-more" style={{ textAlign: 'center', paddingBottom: 80, position: 'relative', zIndex: 1 }}>
            <button
              className="pg-load-btn"
              onClick={() => setShowCount(c => c + 12)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1.5px solid rgba(205,44,88,.28)', color: '#CD2C58', padding: '13px 36px', borderRadius: 100, background: 'transparent', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '.875rem', fontWeight: 500, letterSpacing: '.04em', transition: 'all .25s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(205,44,88,.07)'; el.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.transform = 'translateY(0)'; }}
            >
              Load More
              <span style={{ background: 'rgba(205,44,88,.10)', borderRadius: 100, padding: '3px 10px', fontSize: '.72rem' }}>
                {filtered.length - showCount} remaining
              </span>
            </button>
          </div>
        )}

        {/* ── LIGHTBOX ── */}
        {lbIdx !== null && (
          <Lightbox
            image={filtered[lbIdx]}
            onClose={() => setLbIdx(null)}
            onPrev={() => setLbIdx(i => i === null ? null : (i - 1 + filtered.length) % filtered.length)}
            onNext={() => setLbIdx(i => i === null ? null : (i + 1) % filtered.length)}
            idx={lbIdx}
            total={filtered.length}
          />
        )}
      </div>
    </>
  );
}