"use client";

import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────
   SHARED DATA — 6 featured courses from the full 11
───────────────────────────────────────────────────────── */
const FEATURED_COURSES = [
  {
    id: 11, num: "01",
    title: "Let's Draw & Paint",
    subtitle: "Designer Package · 12 Levels",
    category: "Drawing",
    feeShort: "₹3,000 / level",
    tag: "Flagship",
    tagColor: "#CD2C58",
    icon: "✏️",
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&auto=format&fit=crop",
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
    img: "/classes/image.png",
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
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&auto=format&fit=crop&q=80",
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
    img: "https://images.unsplash.com/photo-1615454782932-80dc42b03d39?w=700&auto=format&fit=crop&q=80",
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
    img: "https://images.unsplash.com/photo-1603570388395-5e3e01cfbe4e?w=700&auto=format&fit=crop&q=80",
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
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80",
    accent: "#E06B80",
    duration: "Flexible",
  },
];

/* ─────────────────────────────────────────────────────────
   HOOK
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
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, inView: v };
}

/* ═══════════════════════════════════════════════════════
   LAYOUT A — EDITORIAL DARK SCROLL STRIP
   Dark ink background. Horizontally scrollable cards.
   Giant serif numbers. Auto-play marquee feel.
═══════════════════════════════════════════════════════ */
function LayoutA() {
  const { ref: headRef, inView: headIn } = useInView(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll gentle nudge
  useEffect(() => {
    const el = scrollRef.current; if (!el) return;
    let raf: number;
    let running = false;
    const start = () => { running = true; tick(); };
    const stop  = () => { running = false; cancelAnimationFrame(raf); };
    const tick  = () => {
      if (!running) return;
      el.scrollLeft += 0.5;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) el.scrollLeft = 0;
      raf = requestAnimationFrame(tick);
    };
    const t = setTimeout(start, 1200);
    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);
    el.addEventListener("touchstart", stop, { passive: true });
    return () => { clearTimeout(t); stop(); el.removeEventListener("mouseenter", stop); el.removeEventListener("mouseleave", start); };
  }, []);

  return (
    <section style={{ background: "#2a1018", position: "relative", overflow: "hidden", padding: "88px 0 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        .la-scroll::-webkit-scrollbar { display: none; }
        .la-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes laBlobA { from{transform:translate(0,0)} to{transform:translate(28px,20px)} }
        @keyframes laCardIn { from{opacity:0;transform:translateY(24px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        .la-card {
          flex-shrink: 0;
          width: 280px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .la-card:hover {
          background: rgba(205,44,88,0.12);
          border-color: rgba(205,44,88,0.38);
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.36), 0 4px 20px rgba(205,44,88,0.18);
        }
        .la-card:hover .la-card-img { transform: scale(1.07); }
        .la-card:hover .la-card-num { opacity: 0.08; }
        .la-card:hover .la-enq { opacity: 1; transform: translateY(0); }
        .la-card-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.6s ease; }
        .la-enq {
          position: absolute; bottom: 16px; right: 16px;
          background: #CD2C58; color: #fff;
          padding: 6px 14px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; font-weight: 500; letter-spacing: .07em;
          text-transform: uppercase;
          opacity: 0; transform: translateY(6px);
          transition: opacity .28s ease, transform .28s ease;
        }
        .la-cta-btn {
          display: inline-flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          color: #fff; padding: 14px 32px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem; font-weight: 500; letter-spacing: .04em;
          text-decoration: none;
          transition: background .25s, border-color .25s, transform .22s;
          position: relative; overflow: hidden;
        }
        .la-cta-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #CD2C58, #E06B80);
          opacity: 0; transition: opacity .28s;
        }
        .la-cta-btn:hover::before { opacity: 1; }
        .la-cta-btn:hover { border-color: transparent; transform: translateY(-2px); }
        .la-cta-btn span { position: relative; z-index: 1; }

        /* ── Layout A Responsive ── */
        @media (max-width: 768px) {
          .la-card { width: 230px; }
          .la-card-img-wrap-h { height: 150px !important; }
        }
        @media (max-width: 480px) {
          .la-card { width: 200px; }
        }
      `}</style>

      {/* Ambient blobs */}
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(205,44,88,0.14) 0%,transparent 65%)", top:-160, right:-140, animation:"laBlobA 14s ease-in-out infinite alternate", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,198,157,0.08) 0%,transparent 65%)", bottom:-80, left:-80, animation:"laBlobA 11s ease-in-out infinite alternate", pointerEvents:"none" }} />

      {/* Decorative large text */}
      <div style={{ position:"absolute", top:20, left:36, fontFamily:"'Cormorant Garamond',serif", fontSize:"22rem", fontWeight:600, color:"rgba(255,255,255,0.025)", lineHeight:1, pointerEvents:"none", userSelect:"none", zIndex:0 }}>11</div>

      <div style={{ maxWidth:1240, margin:"0 auto", padding:"0 40px", position:"relative", zIndex:1 }}>

        {/* Header */}
        <div
          ref={headRef}
          style={{
            display:"flex", alignItems:"flex-end", justifyContent:"space-between",
            gap:24, flexWrap:"wrap", marginBottom:52,
            opacity: headIn ? 1 : 0, transform: headIn ? "translateY(0)" : "translateY(20px)",
            transition: "opacity .9s ease, transform .9s ease",
          }}
        >
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:12, fontSize:11, letterSpacing:".20em", textTransform:"uppercase", color:"#E06B80", fontWeight:500, marginBottom:16 }}>
              <div style={{ width:36, height:1, background:"linear-gradient(90deg,#E06B80,transparent)" }} />
              Training & Classes
              <div style={{ width:36, height:1, background:"linear-gradient(270deg,#E06B80,transparent)" }} />
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.4rem,4.5vw,4.6rem)", fontWeight:300, lineHeight:1.06, color:"#fff", marginBottom:0 }}>
              Craft your<br/><em style={{ fontStyle:"italic", color:"#E06B80" }}>next skill</em>
            </h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:14 }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.8rem,5vw,5rem)", fontWeight:600, color:"rgba(255,255,255,0.90)", lineHeight:1 }}>
              11
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".80rem", fontWeight:300, color:"rgba(255,255,255,0.40)", letterSpacing:".10em", textTransform:"uppercase", marginLeft:10 }}>courses</span>
            </div>
            <a href="/training" className="la-cta-btn">
              <span>View all classes</span>
              <span style={{ width:26, height:26, borderRadius:"50%", background:"rgba(255,255,255,0.10)", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:".80rem" }}>→</span>
            </a>
          </div>
        </div>

        {/* Scroll strip */}
        <div
          ref={scrollRef}
          className="la-scroll"
          style={{ display:"flex", gap:14, overflowX:"auto", cursor:"grab", paddingBottom:4 }}
        >
          {[...FEATURED_COURSES, ...FEATURED_COURSES.slice(0,3)].map((c, i) => (
            <div key={`${c.id}-${i}`} className="la-card"
              style={{
                animation: `laCardIn .65s ease ${(i % FEATURED_COURSES.length) * 0.08}s both`,
              }}
            >
              {/* Image zone */}
              <div style={{ position:"relative", height:180, overflow:"hidden" }}>
                <img src={c.img} alt={c.title} className="la-card-img" loading="lazy" />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(42,16,24,0.10) 0%, rgba(42,16,24,0.65) 100%)" }} />
                {/* Giant num */}
                <div className="la-card-num" style={{ position:"absolute", bottom:-14, right:10, fontFamily:"'Cormorant Garamond',serif", fontSize:"5rem", fontWeight:600, color:"rgba(255,255,255,0.14)", lineHeight:1, transition:"opacity .3s" }}>{c.num}</div>
                {/* Tag */}
                <div style={{ position:"absolute", top:12, left:12, background:c.tagColor, color:"#fff", borderRadius:100, padding:"3px 11px", fontFamily:"'DM Sans',sans-serif", fontSize:".58rem", fontWeight:600, letterSpacing:".10em", textTransform:"uppercase" }}>{c.tag}</div>
                {/* Icon */}
                <div style={{ position:"absolute", bottom:12, left:14, fontSize:"1.1rem" }}>{c.icon}</div>
                {/* Enquire pill */}
                <div className="la-enq">Enquire →</div>
              </div>

              {/* Body */}
              <div style={{ padding:"16px 18px 18px" }}>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".58rem", letterSpacing:".14em", textTransform:"uppercase", color:c.accent, fontWeight:500, marginBottom:5 }}>{c.category}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.22rem", fontWeight:400, color:"#fff", lineHeight:1.15, marginBottom:4 }}>{c.title}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".72rem", color:"rgba(255,230,212,.50)", fontWeight:300, marginBottom:14, lineHeight:1.5 }}>{c.subtitle}</p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".65rem", color:"rgba(255,255,255,0.35)", letterSpacing:".06em" }}>⏱ {c.duration}</span>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:600, color:c.accent }}>{c.feeShort}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div style={{ marginTop:20, display:"flex", alignItems:"center", gap:10, opacity:0.38 }}>
          <div style={{ height:1, flex:1, background:"linear-gradient(90deg,rgba(255,255,255,0.20),transparent)" }} />
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".62rem", letterSpacing:".14em", textTransform:"uppercase", color:"#fff" }}>Scroll to explore · Hover to pause</span>
          <div style={{ height:1, flex:1, background:"linear-gradient(270deg,rgba(255,255,255,0.20),transparent)" }} />
        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   LAYOUT B — FLOATING MOSAIC GRID
   Warm #fff8f4. Asymmetric portrait + landscape grid.
   Hover colour blooms. Editorial whitespace.
═══════════════════════════════════════════════════════ */
function LayoutB() {
  const { ref: secRef, inView } = useInView(0.05);
  const [hovId, setHovId] = useState<number | null>(null);

  // Map index → bento position
  const placements = [
    { col:"1/2", row:"1/3", aspect:"auto", minH:420 },  // tall left
    { col:"2/3", row:"1/2", aspect:"16/9", minH:0 },     // landscape top middle
    { col:"3/5", row:"1/2", aspect:"16/9", minH:0 },     // wide top right
    { col:"2/3", row:"2/3", aspect:"1/1",  minH:0 },     // square middle
    { col:"3/4", row:"2/3", aspect:"1/1",  minH:0 },     // square
    { col:"4/5", row:"2/3", aspect:"1/1",  minH:0 },     // square
  ];

  return (
    <section style={{ background:"#fff8f4", position:"relative", overflow:"hidden", padding:"96px 0 88px" }}>
      <style>{`
        @keyframes lbBlob { from{transform:translate(0,0) scale(1)} to{transform:translate(24px,18px) scale(1.04)} }
        @keyframes lbIn { from{opacity:0;transform:translateY(22px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        .lb-cell {
          border-radius: 20px; overflow: hidden; position: relative; cursor: pointer;
          transition: box-shadow .32s, transform .32s;
        }
        .lb-cell:hover { box-shadow: 0 24px 64px rgba(42,16,24,0.18); transform: translateY(-4px) scale(1.01); }
        .lb-cell:hover .lb-img { transform: scale(1.08); }
        .lb-cell:hover .lb-bloom { opacity: 1 !important; }
        .lb-cell:hover .lb-body { transform: translateY(0) !important; }
        .lb-cell:hover .lb-arrow { opacity: 1 !important; transform: translateX(0) !important; }
        .lb-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .65s ease; }
        .lb-cta {
          display: inline-flex; align-items: center; gap: 12px;
          background: #CD2C58; color: #fff;
          padding: 16px 36px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: .90rem; font-weight: 500; letter-spacing: .04em;
          text-decoration: none;
          box-shadow: 0 8px 28px rgba(205,44,88,0.28);
          transition: background .22s, transform .22s, box-shadow .22s;
        }
        .lb-cta:hover { background: #b82350; transform: translateY(-2px); box-shadow: 0 14px 40px rgba(205,44,88,0.38); }
        .lb-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1.5px solid rgba(205,44,88,.28); color: #CD2C58;
          padding: 16px 28px; border-radius: 100px; background: transparent;
          font-family: 'DM Sans', sans-serif; font-size: .88rem; font-weight: 500;
          text-decoration: none; transition: background .22s, border-color .22s, transform .22s;
        }
        .lb-ghost:hover { background: rgba(205,44,88,.06); border-color: #CD2C58; transform: translateY(-2px); }

        /* ── Layout B Responsive ── */
        @media (max-width: 1040px) {
          .lb-mosaic-grid { grid-template-columns: repeat(3,1fr) !important; grid-template-rows: 200px 200px !important; }
          .lb-cell-0 { grid-column: 1/2 !important; grid-row: 1/3 !important; }
          .lb-cell-1 { grid-column: 2/4 !important; grid-row: 1/2 !important; }
          .lb-cell-2 { grid-column: 2/3 !important; grid-row: 2/3 !important; }
          .lb-cell-3 { grid-column: 3/4 !important; grid-row: 2/3 !important; }
          .lb-cell-4 { display: none !important; }
          .lb-cell-5 { display: none !important; }
        }
        @media (max-width: 700px) {
          .lb-mosaic-grid { grid-template-columns: repeat(2,1fr) !important; grid-template-rows: repeat(3, 180px) !important; }
          .lb-cell-0 { grid-column: 1/2 !important; grid-row: 1/2 !important; }
          .lb-cell-1 { grid-column: 2/3 !important; grid-row: 1/2 !important; }
          .lb-cell-2 { grid-column: 1/2 !important; grid-row: 2/3 !important; }
          .lb-cell-3 { grid-column: 2/3 !important; grid-row: 2/3 !important; }
          .lb-cell-4 { grid-column: 1/2 !important; grid-row: 3/4 !important; display: block !important; }
          .lb-cell-5 { grid-column: 2/3 !important; grid-row: 3/4 !important; display: block !important; }
        }
        @media (max-width: 600px) {
          .lb-header { flex-direction: column !important; align-items: flex-start !important; }
          .lb-header-right { text-align: left !important; }
          .lb-header-right .lb-cta-row { justify-content: flex-start !important; }
        }
      `}</style>

      {/* Ambient */}
      <div style={{ position:"absolute", width:580, height:580, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,198,157,0.18) 0%,transparent 65%)", top:-180, left:-160, animation:"lbBlob 15s ease-in-out infinite alternate", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle,rgba(205,44,88,0.07) 0%,transparent 65%)", bottom:-100, right:-100, animation:"lbBlob 12s ease-in-out infinite alternate", pointerEvents:"none", zIndex:0 }} />

      <div
        ref={secRef}
        style={{ maxWidth:1240, margin:"0 auto", padding:"0 40px", position:"relative", zIndex:1 }}
      >
        {/* Header row */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:24, marginBottom:52,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(22px)",
          transition: "opacity .9s ease, transform .9s ease",
        }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:12, fontSize:11, letterSpacing:".20em", textTransform:"uppercase", color:"#CD2C58", fontWeight:500, marginBottom:16 }}>
              <div style={{ width:36, height:1, background:"linear-gradient(90deg,#CD2C58,transparent)" }} />
              Training & Classes
              <div style={{ width:36, height:1, background:"linear-gradient(270deg,#CD2C58,transparent)" }} />
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.4rem,4.2vw,4.4rem)", fontWeight:300, lineHeight:1.06, color:"#2a1018" }}>
              Learn something<br/><em style={{ fontStyle:"italic", color:"#CD2C58" }}>beautiful</em> today
            </h2>
          </div>
          <div style={{ textAlign:"right" }}>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".92rem", color:"#7a4a55", fontWeight:300, lineHeight:1.75, maxWidth:320, marginBottom:16 }}>
              11 courses across painting, craft, culture & wellness — guided by Suman Jain.
            </p>
            <div style={{ display:"flex", gap:12, justifyContent:"flex-end", flexWrap:"wrap" }}>
              <a href="/training" className="lb-cta">Explore All Classes →</a>
              <a href="#contact" className="lb-ghost">Get a Quote</a>
            </div>
          </div>
        </div>

        {/* Mosaic grid */}
        <div className="lb-mosaic-grid" style={{
          display:"grid",
          gridTemplateColumns:"repeat(4,1fr)",
          gridTemplateRows:"220px 220px",
          gap:14,
        }}>
          {FEATURED_COURSES.map((c, i) => {
            const p = placements[i];
            const isHov = hovId === c.id;
            return (
              <div
                key={c.id}
                className="lb-cell"
                style={{
                  gridColumn: p.col, gridRow: p.row,
                  minHeight: p.minH || undefined,
                  animation: inView ? `lbIn .70s ease ${i * 0.09}s both` : "none",
                }}
                onMouseEnter={() => setHovId(c.id)}
                onMouseLeave={() => setHovId(null)}
              >
                <img src={c.img} alt={c.title} className="lb-img" loading="lazy" style={{ position:"absolute", inset:0, height:"100%" }} />

                {/* Always-on base overlay */}
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(42,16,24,0.80) 0%, rgba(42,16,24,0.15) 60%, rgba(42,16,24,0.04) 100%)", zIndex:1 }} />

                {/* Hover colour bloom */}
                <div className="lb-bloom" style={{ position:"absolute", inset:0, background:`linear-gradient(145deg, ${c.accent}44 0%, transparent 65%)`, opacity:0, transition:"opacity .35s", zIndex:2 }} />

                {/* Top badges */}
                <div style={{ position:"absolute", top:12, left:12, zIndex:4, display:"flex", gap:7 }}>
                  <span style={{ background:c.tagColor, color:"#fff", borderRadius:100, padding:"3px 10px", fontFamily:"'DM Sans',sans-serif", fontSize:".58rem", fontWeight:600, letterSpacing:".10em", textTransform:"uppercase" }}>{c.tag}</span>
                </div>
                <div style={{ position:"absolute", top:12, right:12, zIndex:4, width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.15)", backdropFilter:"blur(6px)", border:"1px solid rgba(255,255,255,0.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:".90rem" }}>{c.icon}</div>

                {/* Body — slides up on hover */}
                <div className="lb-body" style={{ position:"absolute", bottom:0, left:0, right:0, padding:"14px 16px 16px", zIndex:3, transform: isHov ? "translateY(0)" : "translateY(8px)", transition:"transform .32s ease" }}>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".55rem", letterSpacing:".12em", textTransform:"uppercase", color:c.accent, fontWeight:500, marginBottom:4 }}>{c.category}</div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize: i===0 ? "1.5rem" : "1.15rem", fontWeight:400, color:"#fff", lineHeight:1.15, marginBottom:4 }}>{c.title}</h3>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".68rem", color:"rgba(255,230,212,.55)", fontWeight:300 }}>{c.subtitle}</span>
                    <span className="lb-arrow" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:".95rem", fontWeight:600, color:c.accent, opacity: isHov ? 1 : 0, transform: isHov ? "translateX(0)" : "translateX(6px)", transition:"opacity .28s, transform .28s" }}>{c.feeShort} →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stat strip */}
        <div style={{
          marginTop:40, display:"flex", alignItems:"center", justifyContent:"center", gap:48, flexWrap:"wrap",
          padding:"28px 0",
          borderTop:"1px solid rgba(205,44,88,.12)",
          opacity: inView ? 1 : 0, transition:"opacity 1.1s ease .4s",
        }}>
          {[["11","Unique Courses"],["5000+","Happy Students"],["15+","Art Forms"],["Free","Temple Classes"]].map(([n,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.2rem", fontWeight:600, color:"#CD2C58", lineHeight:1, marginBottom:4 }}>{n}</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".62rem", letterSpacing:".10em", textTransform:"uppercase", color:"#7a4a55", fontWeight:400 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   LAYOUT C — CINEMATIC SPOTLIGHT
   Left: large featured hero card.
   Right: stacked mini list of 5 courses.
   Background: deep gradient with grain texture feel.
═══════════════════════════════════════════════════════ */
function LayoutC() {
  const { ref: secRef, inView } = useInView(0.05);
  const [activeIdx, setActiveIdx] = useState(0);
  const active = FEATURED_COURSES[activeIdx];

  return (
    <section
      ref={secRef}
      style={{
        background:"linear-gradient(155deg, #1a0910 0%, #2a1018 45%, #1f0d14 100%)",
        position:"relative", overflow:"hidden", padding:"96px 0 88px",
      }}
    >
      <style>{`
        @keyframes lcBlob { from{transform:translate(0,0) scale(1)} to{transform:translate(30px,22px) scale(1.06)} }
        @keyframes lcFadeIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes lcImgIn { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:scale(1)} }
        @keyframes lcPulse { 0%,100%{box-shadow:0 0 0 0 rgba(205,44,88,0)} 50%{box-shadow:0 0 0 8px rgba(205,44,88,0.14)} }
        .lc-row {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px; border-radius: 14px;
          cursor: pointer; position: relative; overflow: hidden;
          transition: background .25s, transform .22s;
          border: 1px solid transparent;
        }
        .lc-row:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.08); transform: translateX(4px); }
        .lc-row.lc-row-active {
          background: rgba(205,44,88,0.12);
          border-color: rgba(205,44,88,0.28);
        }
        .lc-row-active .lc-row-dot { background: #CD2C58 !important; animation: lcPulse 2s infinite; }
        .lc-cta {
          display: inline-flex; align-items: center; gap: 12px;
          background: linear-gradient(135deg, #CD2C58 0%, #E06B80 100%);
          color: #fff; padding: 16px 36px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif; font-size: .90rem;
          font-weight: 500; letter-spacing: .04em; text-decoration: none;
          box-shadow: 0 10px 36px rgba(205,44,88,0.32);
          transition: transform .22s, box-shadow .22s, opacity .22s;
        }
        .lc-cta:hover { transform: translateY(-3px); box-shadow: 0 18px 50px rgba(205,44,88,0.42); }
        .lc-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(255,255,255,0.18); color: rgba(255,255,255,0.75);
          padding: 16px 28px; border-radius: 100px; background: transparent;
          font-family: 'DM Sans', sans-serif; font-size: .88rem; font-weight: 400;
          text-decoration: none; transition: background .22s, border-color .22s;
        }
        .lc-ghost:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.30); }

        /* ── Layout C Responsive ── */
        @media (max-width: 960px) {
          .lc-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .lc-left { max-width: 480px; margin: 0 auto; width: 100%; }
          .lc-featured-img { aspect-ratio: 4/3 !important; max-height: 340px !important; }
        }
        @media (max-width: 600px) {
          .lc-featured-img { aspect-ratio: 3/2 !important; max-height: 260px !important; }
          .lc-row { padding: 12px 14px !important; }
          .lc-cta-row { flex-wrap: wrap !important; }
          .lc-cta, .lc-ghost { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* Ambient */}
      <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle, rgba(205,44,88,0.14) 0%, transparent 60%)", top:-250, right:-200, animation:"lcBlob 16s ease-in-out infinite alternate", pointerEvents:"none" }} />
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(255,198,157,0.06) 0%, transparent 65%)", bottom:-100, left:-80, animation:"lcBlob 13s ease-in-out infinite alternate", pointerEvents:"none" }} />

      {/* Subtle grid lines */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px", pointerEvents:"none", zIndex:0 }} />

      <div style={{ maxWidth:1240, margin:"0 auto", padding:"0 40px", position:"relative", zIndex:1 }}>

        {/* Eyebrow */}
        <div style={{
          display:"flex", alignItems:"center", gap:14, marginBottom:52,
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(18px)",
          transition: "opacity .8s ease, transform .8s ease",
        }}>
          <div style={{ width:48, height:1, background:"linear-gradient(90deg,#E06B80,transparent)" }} />
          <span style={{ fontSize:11, letterSpacing:".20em", textTransform:"uppercase", color:"#E06B80", fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}>Training & Classes</span>
        </div>

        {/* Two-column layout */}
        <div className="lc-grid" style={{ display:"grid", gridTemplateColumns:"1.15fr 1fr", gap:52, alignItems:"center" }}>

          {/* LEFT — cinematic featured card */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-28px)",
            transition: "opacity .9s ease .1s, transform .9s ease .1s",
          }} className="lc-left">
            <div className="lc-featured-img" style={{ position:"relative", borderRadius:28, overflow:"hidden", aspectRatio:"3/4", maxHeight:540 }}>
              {/* Image */}
              <img
                key={active.id}
                src={active.img} alt={active.title}
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block", animation:"lcImgIn .6s ease both" }}
              />

              {/* Gradient overlay */}
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(42,16,24,0.94) 0%, rgba(42,16,24,0.42) 50%, rgba(42,16,24,0.10) 100%)" }} />

              {/* Top bar */}
              <div style={{ position:"absolute", top:20, left:20, right:20, zIndex:3, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ background:active.tagColor, color:"#fff", borderRadius:100, padding:"5px 14px", fontFamily:"'DM Sans',sans-serif", fontSize:".62rem", fontWeight:600, letterSpacing:".10em", textTransform:"uppercase", boxShadow:`0 4px 18px ${active.tagColor}55` }}>{active.tag}</div>
                <div style={{ background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:100, padding:"5px 14px", display:"flex", alignItems:"center", gap:7, fontFamily:"'DM Sans',sans-serif", fontSize:".62rem", color:"rgba(255,230,212,.70)", fontWeight:500 }}>
                  <span style={{ fontSize:".90rem" }}>{active.icon}</span>
                  {active.num}
                </div>
              </div>

              {/* Bottom content */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"28px 26px 28px", zIndex:3, animation:"lcFadeIn .5s ease both" }} key={active.id + "body"}>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".60rem", letterSpacing:".14em", textTransform:"uppercase", color:active.accent, fontWeight:500, marginBottom:8 }}>{active.category} · {active.duration}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,3vw,2.8rem)", fontWeight:300, color:"#fff", lineHeight:1.08, marginBottom:8 }}>{active.title}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".82rem", color:"rgba(255,230,212,.58)", fontWeight:300, lineHeight:1.6, marginBottom:18 }}>{active.subtitle}</p>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".55rem", letterSpacing:".12em", textTransform:"uppercase", color:"rgba(255,230,212,.45)", marginBottom:3 }}>Course Fee</div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:600, color:active.accent, lineHeight:1 }}>{active.feeShort}</div>
                  </div>
                  <a href="/training" style={{ background:active.accent, color:"#fff", padding:"10px 22px", borderRadius:100, fontFamily:"'DM Sans',sans-serif", fontSize:".78rem", fontWeight:500, textDecoration:"none", boxShadow:`0 6px 22px ${active.accent}44`, transition:"transform .22s, box-shadow .22s" }}
                    onMouseEnter={e=>(e.currentTarget.style.transform="translateY(-2px)")}
                    onMouseLeave={e=>(e.currentTarget.style.transform="translateY(0)")}
                  >Enquire Now →</a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — course list + CTA */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(28px)",
            transition: "opacity .9s ease .25s, transform .9s ease .25s",
          }}>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,3.8vw,4rem)", fontWeight:300, lineHeight:1.06, color:"#fff", marginBottom:10 }}>
              11 ways to grow your<br/><em style={{ fontStyle:"italic", color:"#E06B80" }}>creativity</em>
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".90rem", color:"rgba(255,230,212,.50)", fontWeight:300, lineHeight:1.75, marginBottom:36, maxWidth:360 }}>
              From foundational sketching to heritage craft — every course is designed for real progress.
            </p>

            {/* Course list */}
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:36 }}>
              {FEATURED_COURSES.map((c, i) => (
                <div
                  key={c.id}
                  className={`lc-row ${activeIdx === i ? "lc-row-active" : ""}`}
                  onClick={() => setActiveIdx(i)}
                >
                  <div className="lc-row-dot" style={{ width:8, height:8, borderRadius:"50%", background:"rgba(255,255,255,0.22)", flexShrink:0, transition:"background .25s" }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:400, color: activeIdx===i ? "#fff" : "rgba(255,255,255,0.65)", lineHeight:1.2, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.title}</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".60rem", color:"rgba(255,230,212,.35)", fontWeight:300, letterSpacing:".04em" }}>{c.category} · {c.duration}</div>
                  </div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:".90rem", fontWeight:600, color: activeIdx===i ? c.accent : "rgba(255,255,255,0.28)", flexShrink:0, transition:"color .25s" }}>{c.feeShort}</div>
                </div>
              ))}
            </div>

            {/* Stats + CTA */}
            <div style={{ display:"flex", gap:28, marginBottom:28 }}>
              {[["11","Courses"],["5000+","Students"],["15+","Art Forms"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.7rem", fontWeight:600, color:"#E06B80", lineHeight:1, marginBottom:3 }}>{n}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:".58rem", letterSpacing:".10em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)" }}>{l}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <a href="/training" className="lc-cta">View All 11 Courses →</a>
              <a href="#contact" className="lc-ghost">Get a Quote</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   EXPORT — default exports Layout C (Cinematic)
   Change export to LayoutA or LayoutB to swap.
═══════════════════════════════════════════════════════ */

// Named exports for each variant
export { LayoutA as TrainingTeaserEditorial };
export { LayoutB as TrainingTeaserMosaic };
export { LayoutC as TrainingTeaserCinematic };

// Default: Cinematic (recommended for home page)
export default LayoutC;