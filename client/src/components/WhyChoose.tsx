import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const REASONS = [
  { num:"01", icon:"✦", title:"Years of Expertise",        sub:"Mastery earned through decades",    body:"Suman Jain has spent years mastering diverse art forms — from painting and stitching to clay, resin, and cultural crafts. Her depth of knowledge is unmatched and always growing.",                                                                         stat:"15+",  statLabel:"Art Forms Taught",    accent:"#CD2C58" },
  { num:"02", icon:"◈", title:"Personalized Attention",    sub:"Every student, every style",        body:"No two learners are alike. Suman tailors her guidance to each individual — adapting pace, technique, and encouragement so every student finds their own creative voice.",                                                                                    stat:"25",   statLabel:"Sessions Per Course", accent:"#E06B80" },
  { num:"03", icon:"❋", title:"5000+ Happy Students",      sub:"Trust built one class at a time",   body:"Over 5,000 happy customers reflect the trust and love people place in Kalasrijan. Her unique, hard-to-copy designs and warm teaching style have made her truly one of a kind.",                                                                             stat:"5K+",  statLabel:"Happy Learners",      accent:"#CD2C58" },
  { num:"04", icon:"⬡", title:"Practical Real-World Skills",sub:"Art you can use every day",        body:"From decorating your home to making gifts, cooking, card decoration, and fabric painting — Kalasrijan teaches skills that enrich real everyday life.",                                                                                                      stat:"100%", statLabel:"Hands-on Learning",   accent:"#E06B80" },
  { num:"05", icon:"✿", title:"Inspiring Personality",     sub:"Confidence that is contagious",     body:"Even after years of experience, Suman remains active, passionate, and confident. Her positive energy transforms the act of learning into a genuine joy.",                                                                                                   stat:"∞",    statLabel:"Passion & Energy",    accent:"#CD2C58" },
  { num:"06", icon:"◉", title:"One-of-a-Kind Creativity",  sub:"Designs that can't be copied",      body:"Suman's creative instinct produces work that is utterly original. She is appreciated for ideas and a special way of being creative — her designs are genuinely unique.",                                                                                    stat:"①",    statLabel:"Unique Style",         accent:"#E06B80" },
];

const STATS = [
  { v:"25000+", l:"Happy Students" },
  { v:"15+",   l:"Art Forms Taught" },
  { v:"100%",  l:"Hands-on Learning" },
  { v:"1",     l:"Truly Unique Style" },
];

const MARQUEE = ["25000+ Happy Students","15+ Art Forms","Years of Expertise","Personalized Attention","Practical Skills","One-of-a-Kind Creativity","Inspiring Personality","Trusted by Thousands"];

/* ─────────────────────────────────────────
   HOOK
───────────────────────────────────────── */
function useInView(t = 0.06) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: t }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return { ref, inView: v };
}

/* ─────────────────────────────────────────
   COUNT-UP
───────────────────────────────────────── */
function CountUp({ target }: { target: string }) {
  const [d, setD] = useState("0");
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    const n = parseInt(target.replace(/\D/g, ""), 10);
    if (isNaN(n)) { setD(target); return; }
    let c = 0;
    const step = Math.ceil(n / 50);
    const timer = setInterval(() => {
      c += step;
      if (c >= n) { setD(target); clearInterval(timer); }
      else setD(c + (target.includes("+") ? "+" : target.includes("%") ? "%" : ""));
    }, 28);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{d}</span>;
}

/* ─────────────────────────────────────────
   CARD
───────────────────────────────────────── */
function Card({ r, idx }: { r: typeof REASONS[0]; idx: number }) {
  const { ref, inView } = useInView(0.05);
  const [hov, setHov] = useState(false);

  const colDelay = ((idx % 3) * 0.09 + Math.floor(idx / 3) * 0.12).toFixed(2);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="wck-card"
      data-hov={hov}
      style={{
        "--accent": r.accent,
        opacity: inView ? 1 : 0,
        transform: inView ? (hov ? "translateY(-6px)" : "translateY(0)") : "translateY(30px)",
        transition: `opacity 0.8s ease ${colDelay}s, transform 0.28s ease, border-color 0.28s, background 0.28s, box-shadow 0.28s`,
      } as React.CSSProperties}
    >
      {/* Top accent bar */}
      <div className="wck-card-bar" style={{ transform: hov ? "scaleX(1)" : "scaleX(0.35)" }} />

      {/* Hover glow */}
      <div className="wck-card-glow" style={{ opacity: hov ? 1 : 0 }} />

      {/* Head row */}
      <div className="wck-card-head">
        <div className="wck-card-icon" style={{ transform: hov ? "scale(1.1) rotate(-5deg)" : "scale(1)" }}>
          {r.icon}
        </div>
        <span className="wck-card-num">{r.num}</span>
      </div>

      <h3 className="wck-card-title">{r.title}</h3>
      <p  className="wck-card-sub">{r.sub}</p>
      <div className="wck-card-divider" />
      <p  className="wck-card-body">{r.body}</p>

      <div className="wck-card-badge">
        <span className="wck-badge-val"><CountUp target={r.stat} /></span>
        <span className="wck-badge-label">{r.statLabel}</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN
───────────────────────────────────────── */
export default function WhyChooseKalasrijan() {
  const { ref: hr, inView: hi } = useInView(0.04);
  const { ref: cr, inView: ci } = useInView(0.06);

  return (
    <div id="why-choose">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --coral: #CD2C58;
          --rose:  #E06B80;
          --sand:  #FFC69D;
          --blush: #FFE6D4;
          --ink:   #2a1018;
          --pale:  #fff8f4;
        }

        @keyframes wcBlob {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(16px,12px) scale(1.04); }
        }
        @keyframes mq {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── CARD base ── */
        .wck-card {
          position: relative;
          background: rgba(255,255,255,0.038);
          border: 1px solid rgba(255,198,157,0.11);
          border-radius: 22px;
          padding: 30px 26px 26px;
          overflow: hidden;
          cursor: default;
        }
        .wck-card[data-hov="true"] {
          background: rgba(255,255,255,0.065);
          border-color: rgba(205,44,88,0.35);
          box-shadow: 0 24px 64px rgba(0,0,0,0.32), 0 4px 20px rgba(205,44,88,0.12);
        }

        .wck-card-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--accent), transparent);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .wck-card-glow {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--accent) 5%, transparent) 0%, transparent 70%);
          transition: opacity 0.4s;
        }
        .wck-card-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 18px;
        }
        .wck-card-icon {
          width: 52px; height: 52px; border-radius: 16px;
          border: 1px solid color-mix(in srgb, var(--accent) 16%, transparent);
          background: rgba(255,255,255,0.04);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem;
          transition: transform 0.3s;
          flex-shrink: 0;
        }
        .wck-card-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 600;
          color: color-mix(in srgb, var(--accent) 32%, transparent);
          line-height: 1;
        }
        .wck-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.42rem; font-weight: 400;
          color: #fff; line-height: 1.15; margin-bottom: 4px;
        }
        .wck-card-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(255,198,157,0.42);
          font-weight: 500; margin-bottom: 15px;
        }
        .wck-card-divider {
          height: 1px;
          background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 25%, transparent), transparent);
          margin-bottom: 15px;
        }
        .wck-card-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem; color: rgba(255,230,212,0.52);
          line-height: 1.82; font-weight: 300; margin-bottom: 22px;
        }
        .wck-card-badge {
          display: inline-flex; align-items: baseline; gap: 8px;
          padding: 9px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,198,157,0.10);
          border-radius: 12px;
        }
        .wck-badge-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem; font-weight: 600;
          color: var(--accent); line-height: 1;
        }
        .wck-badge-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.63rem; letter-spacing: 0.10em;
          text-transform: uppercase; color: rgba(255,198,157,0.38);
          font-weight: 400;
        }

        /* hover — desktop only */
        @media (hover: hover) {
          .wck-stb:hover { background: rgba(205,44,88,0.09) !important; }
          .wck-cta:hover {
            background: rgba(255,198,157,0.10) !important;
            border-color: #FFC69D !important;
            transform: translateY(-2px) !important;
          }
        }

        /* ══════════════════════════════════════
           TABLET  768px – 1023px
        ══════════════════════════════════════ */
        @media (min-width: 768px) and (max-width: 1023px) {
          .wck-inner    { padding: 0 28px !important; }
          .wck-header   { padding: 64px 0 48px !important; }
          .wck-h2       { font-size: clamp(2.2rem, 4.5vw, 3.6rem) !important; }

          /* Stats: 2×2 on tablet */
          .wck-stats    { grid-template-columns: repeat(2, 1fr) !important; margin-bottom: 48px !important; }

          /* Cards: 2-col on tablet */
          .wck-cards    { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; padding-bottom: 60px !important; }

          /* CTA strip: stack on tablet */
          .wck-cta-strip {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 28px !important;
            padding: 52px 28px !important;
          }
          .wck-cta { width: 100% !important; justify-content: center !important; border-radius: 14px !important; padding: 15px 24px !important; }
        }

        /* ══════════════════════════════════════
           MOBILE  ≤767px
        ══════════════════════════════════════ */
        @media (max-width: 767px) {
          .wck-inner    { padding: 0 16px !important; }
          .wck-header   { padding: 52px 0 36px !important; text-align: left !important; }
          .wck-eyebrow  { justify-content: flex-start !important; }
          .wck-h2       { font-size: clamp(2rem, 8.5vw, 2.7rem) !important; text-align: left !important; }
          .wck-lede     { text-align: left !important; margin: 0 !important; }

          /* Stats: 2×2 grid on mobile */
          .wck-stats {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1px !important;
            margin-bottom: 36px !important;
            border-radius: 16px !important;
          }
          .wck-stat-cell { padding: 18px 12px !important; }
          .wck-stat-val  { font-size: clamp(1.6rem, 6vw, 2.2rem) !important; }

          /* Cards: single column on mobile */
          .wck-cards {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            padding-bottom: 48px !important;
          }
          /* Remove stagger delay on mobile — avoid invisible content */
          .wck-card { transition: opacity 0.6s ease, transform 0.28s ease, border-color 0.28s, background 0.28s !important; }
          .wck-card-title { font-size: 1.3rem !important; }
          .wck-card-body  { font-size: 0.82rem !important; }

          /* CTA strip: stack, full-width button */
          .wck-cta-strip {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 24px !important;
            padding: 44px 16px !important;
          }
          .wck-cta-quote { font-size: clamp(1rem, 4.5vw, 1.25rem) !important; }
          .wck-cta {
            width: 100% !important;
            justify-content: center !important;
            border-radius: 14px !important;
            padding: 17px 20px !important;
            font-size: 0.9rem !important;
          }

          /* Marquee slightly slower + smaller text on mobile */
          .wck-marquee-track { animation-duration: 32s !important; }
          .wck-marquee-item  { font-size: 0.64rem !important; padding: 0 20px !important; }
        }
      `}</style>

      <section style={{ fontFamily:"'DM Sans',sans-serif", position:"relative", overflow:"hidden", background:"#2a1018" }}>

        {/* ── Grain ── */}
        <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", opacity:0.023,
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize:"200px" }} />

        {/* ── Blobs ── */}
        <div style={{ position:"absolute", width:680, height:680, borderRadius:"50%", background:"radial-gradient(circle,rgba(205,44,88,0.10) 0%,transparent 65%)", top:-200, right:-200, animation:"wcBlob 18s ease-in-out infinite alternate", zIndex:0, pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,198,157,0.07) 0%,transparent 65%)", bottom:-120, left:-120, animation:"wcBlob 14s ease-in-out infinite alternate", zIndex:0, pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:340, height:340, borderRadius:"50%", background:"radial-gradient(circle,rgba(224,107,128,0.08) 0%,transparent 65%)", top:"42%", left:"44%", animation:"wcBlob 11s ease-in-out 3s infinite alternate", zIndex:0, pointerEvents:"none" }} />

        {/* ── Decorative quotes ── */}
        <div style={{ position:"absolute", top:-44, left:-22, fontFamily:"'Cormorant Garamond',serif", fontSize:"17rem", fontWeight:600, color:"rgba(205,44,88,0.04)", lineHeight:1, zIndex:0, pointerEvents:"none", userSelect:"none" }}>"</div>
        <div style={{ position:"absolute", bottom:-64, right:-12, fontFamily:"'Cormorant Garamond',serif", fontSize:"17rem", fontWeight:600, color:"rgba(205,44,88,0.04)", lineHeight:1, zIndex:0, pointerEvents:"none", userSelect:"none", transform:"rotate(180deg)" }}>"</div>

        {/* ── Marquee ── */}
        <div style={{ overflow:"hidden", borderTop:"1px solid rgba(255,198,157,0.09)", borderBottom:"1px solid rgba(255,198,157,0.09)", padding:"13px 0", background:"rgba(205,44,88,0.05)", position:"relative", zIndex:1 }}>
          <div className="wck-marquee-track" style={{ display:"flex", width:"max-content", animation:"mq 24s linear infinite" }}>
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={i} className="wck-marquee-item" style={{ display:"inline-flex", alignItems:"center", gap:14, padding:"0 30px", fontSize:"0.70rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,198,157,0.50)", fontWeight:500, whiteSpace:"nowrap" }}>
                <span style={{ width:4, height:4, borderRadius:"50%", background:"#E06B80", flexShrink:0, display:"inline-block" }} />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Inner ── */}
        <div ref={hr} className="wck-inner" style={{ maxWidth:1180, margin:"0 auto", padding:"0 36px", position:"relative", zIndex:1 }}>

          {/* Header */}
          {hi && (
            <div className="wck-header" style={{ textAlign:"center", padding:"84px 0 64px", animation:"fadeUp 0.9s ease both" }}>
              <div className="wck-eyebrow" style={{ display:"inline-flex", alignItems:"center", gap:12, fontSize:11, letterSpacing:"0.20em", textTransform:"uppercase", color:"#FFC69D", fontWeight:500, marginBottom:20 }}>
                <div style={{ width:38, height:1, background:"linear-gradient(90deg,#FFC69D,transparent)", flexShrink:0 }} />
                Why Choose Kalasrijan
                <div style={{ width:38, height:1, background:"linear-gradient(270deg,#FFC69D,transparent)", flexShrink:0 }} />
              </div>
              <h2 className="wck-h2" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.7rem,5.2vw,5.2rem)", fontWeight:300, lineHeight:1.06, color:"#fff", marginBottom:18 }}>
                Experience, dedication,<br />creativity — and <em style={{ fontStyle:"italic", color:"#FFC69D" }}>trust</em>
              </h2>
              <p className="wck-lede" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"1rem", color:"rgba(255,230,212,0.52)", fontWeight:300, lineHeight:1.78, maxWidth:510, margin:"0 auto" }}>
                Choosing Kalasrijan means learning from someone who embodies all four — and brings genuine joy to every class.
              </p>
            </div>
          )}

          {/* Stats row */}
          {hi && (
            <div className="wck-stats" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:"rgba(255,198,157,0.09)", border:"1px solid rgba(255,198,157,0.09)", borderRadius:20, overflow:"hidden", marginBottom:64, animation:"fadeUp 0.9s ease 0.15s both" }}>
              {STATS.map((s, i) => (
                <div key={i} className="wck-stb wck-stat-cell" style={{ padding:"26px 22px", background:"rgba(255,255,255,0.03)", textAlign:"center", cursor:"default", transition:"background 0.25s" }}>
                  <div className="wck-stat-val" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,3.2vw,3rem)", fontWeight:600, color:"#FFC69D", lineHeight:1, marginBottom:7 }}>
                    <CountUp target={s.v} />
                  </div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.68rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,198,157,0.42)", fontWeight:400 }}>{s.l}</div>
                </div>
              ))}
            </div>
          )}

          {/* Cards */}
          <div className="wck-cards" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, paddingBottom:80 }}>
            {/* {REASONS.map((r, i) => <Card key={r.num} r={r} idx={i} />)} */}
          </div>
        </div>

        {/* ── CTA strip ── */}
        <div
          ref={cr}
          className="wck-cta-strip"
          style={{
            borderTop:"1px solid rgba(255,198,157,0.09)",
            padding:"68px 36px",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            gap:40, flexWrap:"wrap",
            position:"relative", zIndex:1,
            maxWidth:1180, margin:"0 auto",
            opacity: ci ? 1 : 0,
            transform: ci ? "translateY(0)" : "translateY(22px)",
            transition:"opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div style={{ maxWidth:560 }}>
            <p className="wck-cta-quote" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.15rem,2vw,1.75rem)", fontWeight:300, fontStyle:"italic", color:"rgba(255,230,212,0.72)", lineHeight:1.58, marginBottom:8 }}>
              "Choosing Suman Jain means learning from someone who is the combination of{" "}
              <em style={{ color:"#FFC69D", fontStyle:"normal", fontWeight:400 }}>experience, dedication, creativity, and trust.</em>"
            </p>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.70rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,198,157,0.32)" }}>— The Kalasrijan Promise</p>
          </div>

          <a href="tel:+918890448242"
            className="wck-cta"
            style={{ display:"inline-flex", alignItems:"center", gap:12, border:"1.5px solid rgba(255,198,157,0.33)", color:"#FFC69D", padding:"15px 34px", borderRadius:100, background:"transparent", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", fontWeight:500, letterSpacing:"0.05em", textDecoration:"none", whiteSpace:"nowrap", transition:"all 0.25s", flexShrink:0 }}
          >
            Start Learning Today <span style={{ transition:"transform 0.22s" }}>→</span>
          </a>
        </div>

      </section>
    </div>
  );
}