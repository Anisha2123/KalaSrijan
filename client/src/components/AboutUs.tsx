import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "5000+", label: "Happy Students" },
  { value: "15+", label: "Art Forms" },
  { value: "Free", label: "Temple Classes" },
  { value: "2019", label: "IFB Chef Year" },
];
const TIMELINE = [
  { year: "Early Days", icon: "🧸", title: "Soft Toy Classes", desc: "Started her journey teaching soft toy-making, conducting free classes in temples to share skills with the community." },
  { year: "Growing", icon: "🌱", title: "Building a Network", desc: "Through dedication and creativity, she built a strong network and earned appreciation from thousands of learners." },
  { year: "2019", icon: "👩‍🍳", title: "Chef at IFB", desc: "A pivotal turning point — working as a chef at IFB opened new opportunities and transformed her creative path." },
  { year: "Today", icon: "✨", title: "5000+ Happy Customers", desc: "Active, confident, and passionate, inspiring learners through art, craft, and everyday creativity." },
];
const CREDENTIALS = [
  { icon: "🎓", text: "M.Sc. in Botany" },
  { icon: "💊", text: "Diploma of Pharmacy" },
  { icon: "🍽️", text: "Professional Chef, IFB 2019" },
  { icon: "🏛️", text: "Community Educator" },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function CountUp({ target }: { target: string }) {
  const [display, setDisplay] = useState("0");
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    if (isNaN(num)) { setDisplay(target); return; }
    let s = 0; const step = Math.ceil(num / 45);
    const t = setInterval(() => {
      s += step;
      if (s >= num) { setDisplay(target); clearInterval(t); }
      else setDisplay(s + (target.includes("+") ? "+" : ""));
    }, 30);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{display}</span>;
}

export default function MeetTheMaker() {
  const [expanded, setExpanded] = useState(false);
  const { ref: secRef, inView } = useInView(0.05);

  return (
    <div ref={secRef} id = "meet-the-maker">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── Base ── */
        .mtm-section {
          background: #fff8f4;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 90px 0 80px;
        }

        /* ── Keyframes ── */
        @keyframes d1    { from{transform:translate(0,0)}   to{transform:translate(35px,28px)} }
        @keyframes d2    { from{transform:translate(0,0)}   to{transform:translate(-28px,18px)} }
        @keyframes badgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes slideIn    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft   { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeRight  { from{opacity:0;transform:translateX(30px)}  to{opacity:1;transform:translateX(0)} }

        /* ── Entrance animations ── */
        .mtm-eyebrow-anim { animation: slideIn  0.8s ease both }
        .mtm-left-anim    { animation: fadeLeft  1.0s ease 0.20s both }
        .mtm-right-anim   { animation: fadeRight 1.0s ease 0.35s both }

        /* ── Hover interactions ── */
        .mtm-cred-item {
          transition: transform 0.2s, background 0.2s, border-color 0.2s;
        }
        .mtm-cred-item:hover {
          transform: translateX(5px);
          background: rgba(205,44,88,0.07) !important;
          border-color: rgba(205,44,88,0.35) !important;
        }
        .mtm-stat-card {
          transition: transform 0.25s, box-shadow 0.25s, background 0.25s, border-color 0.25s;
        }
        .mtm-stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 36px rgba(205,44,88,0.14) !important;
          background: rgba(205,44,88,0.07) !important;
          border-color: rgba(205,44,88,0.32) !important;
        }
        .mtm-btn-main {
          transition: transform 0.22s, box-shadow 0.22s, background 0.22s;
        }
        .mtm-btn-main:hover {
          background: #b82350 !important;
          transform: translateY(-2px);
          box-shadow: 0 14px 38px rgba(205,44,88,0.42) !important;
        }
        .mtm-toggle-btn { transition: opacity 0.2s }
        .mtm-toggle-btn:hover { opacity: 0.65 }
        .mtm-tl-dot { transition: background 0.2s, border-color 0.2s }
        .mtm-tl-row:hover .mtm-tl-dot {
          background: rgba(205,44,88,0.10) !important;
          border-color: rgba(205,44,88,0.45) !important;
        }
        .mtm-photo-frame-deco { transition: transform 0.4s }
        .mtm-photo-outer:hover .mtm-photo-frame-deco {
          transform: translate(5px,5px) !important;
        }

        /* ══════════════════════════════════════
           LAYOUT — Desktop (default ≥ 1024px)
        ══════════════════════════════════════ */
        .mtm-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 68px;
          align-items: start;
        }

        .mtm-photo-max  { max-width: 380px }
        .mtm-stats-grid { grid-template-columns: repeat(4, 1fr) }

        .mtm-photo-aspect {
          aspect-ratio: 3 / 4;
          font-size: 6rem;
        }

        /* Large decorative quote mark */
        .mtm-deco-quote {
          display: block;
          position: absolute;
          top: 60px; right: 20px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16rem;
          font-weight: 600;
          color: rgba(205,44,88,0.04);
          line-height: 1;
          pointer-events: none;
          z-index: 0;
          user-select: none;
        }

        /* ══════════════════════════════════════
           TABLET  768px – 1023px
        ══════════════════════════════════════ */
        @media (max-width: 1023px) {
          .mtm-section       { padding: 70px 0 60px }
          .mtm-inner         { padding: 0 28px }

          .mtm-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          /* Photo column: side-by-side photo + credentials on tablet */
          .mtm-left-inner {
            display: grid;
            grid-template-columns: 260px 1fr;
            gap: 32px;
            align-items: start;
          }

          .mtm-photo-max     { max-width: 100% }
          .mtm-photo-aspect  { font-size: 4rem }

          /* Push credentials below photo on narrow tablets */
          .mtm-stats-grid    { grid-template-columns: repeat(2, 1fr) }

          .mtm-deco-quote    { font-size: 8rem; top: 30px; right: 10px }
        }

        /* ══════════════════════════════════════
           MOBILE  < 768px
        ══════════════════════════════════════ */
        @media (max-width: 767px) {
          .mtm-section { padding: 52px 0 48px }
          .mtm-inner   { padding: 0 20px }

          /* Single-column full-width */
          .mtm-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          /* Stack photo above credentials */
          .mtm-left-inner {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          /* Constrain photo on mobile but keep it generous */
          .mtm-photo-max {
            max-width: 100%;
            width: 100%;
          }

          .mtm-photo-aspect {
            aspect-ratio: 4 / 3;   /* landscape-ish on small screens — less tall */
            font-size: 3.5rem;
          }

          /* Badge repositioned to not overflow */
          .mtm-badge {
            bottom: -12px !important;
            right: 12px !important;
            padding: 10px 14px !important;
          }
          .mtm-badge-num  { font-size: 1.6rem !important }
          .mtm-badge-text { font-size: 0.65rem !important; max-width: 60px !important }

          /* 2-col stats on mobile */
          .mtm-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px }

          /* Heading scale */
          .mtm-heading { font-size: clamp(2rem, 8vw, 2.8rem) !important }

          /* CTA stack */
          .mtm-cta-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }

          .mtm-deco-quote { display: none }  /* too large on tiny screens */

          /* Eyebrow lines shrink */
          .mtm-eyebrow-line { width: 32px !important }
        }

        /* ══════════════════════════════════════
           EXTRA SMALL  < 400px
        ══════════════════════════════════════ */
        @media (max-width: 399px) {
          .mtm-inner        { padding: 0 16px }
          .mtm-photo-aspect { aspect-ratio: 3 / 2; font-size: 2.8rem }
          .mtm-stats-grid   { grid-template-columns: repeat(2, 1fr) }
        }
      `}</style>

      <div className="mtm-section">
        {/* Ambient blobs */}
        <div style={{position:"absolute",width:650,height:650,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,198,157,0.18) 0%,transparent 65%)",top:-200,left:-200,animation:"d1 14s ease-in-out infinite alternate",pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"absolute",width:480,height:480,borderRadius:"50%",background:"radial-gradient(circle,rgba(205,44,88,0.07) 0%,transparent 65%)",bottom:-100,right:-100,animation:"d2 11s ease-in-out infinite alternate",pointerEvents:"none",zIndex:0}}/>
        <div className="mtm-deco-quote">"</div>

        <div className="mtm-inner" style={{maxWidth:1180,margin:"0 auto",position:"relative",zIndex:1}}>

          {/* Eyebrow */}
          {inView && (
            <div className="mtm-eyebrow-anim" style={{display:"flex",alignItems:"center",gap:14,marginBottom:60}}>
              <div className="mtm-eyebrow-line" style={{width:56,height:1,background:"linear-gradient(90deg,#CD2C58,transparent)"}}/>
              <span style={{fontSize:11,letterSpacing:"0.20em",textTransform:"uppercase",color:"#CD2C58",fontWeight:500,fontFamily:"'DM Sans',sans-serif"}}>Meet the Maker</span>
              <div className="mtm-eyebrow-line" style={{width:56,height:1,background:"linear-gradient(270deg,#CD2C58,transparent)"}}/>
            </div>
          )}

          {/* Main grid */}
          <div className="mtm-grid">

            {/* ── LEFT COLUMN ── */}
            {inView && (
              <div className="mtm-left-anim">
                <div className="mtm-left-inner">

                  {/* Photo */}
                  <div className="mtm-photo-max">
                    <div className="mtm-photo-outer" style={{position:"relative",display:"block"}}>
                      {/* Decorative offset frame */}
                      <div className="mtm-photo-frame-deco" style={{position:"absolute",top:18,left:18,width:"100%",height:"100%",border:"2px solid rgba(205,44,88,0.20)",borderRadius:"8px 28px 8px 28px",zIndex:0}}/>
                      {/* Photo */}
                      <div className="mtm-photo-aspect" style={{position:"relative",zIndex:1,width:"100%",borderRadius:"28px 8px 28px 8px",background:"linear-gradient(155deg,#FFC69D 0%,#E06B80 55%,#CD2C58 100%)",overflow:"hidden",boxShadow:"0 32px 80px rgba(205,44,88,0.22),0 8px 24px rgba(224,107,128,0.14)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
                        {/* Replace with <img src="..." alt="Suman Jain" style={{width:"100%",height:"100%",objectFit:"cover"}}/> */}
                        <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,color:"rgba(255,255,255,0.90)",lineHeight:1,textShadow:"0 4px 20px rgba(205,44,88,0.22)"}}>सुमन</div>
                        <div style={{fontSize:"0.68rem",letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(255,255,255,0.65)",fontFamily:"'DM Sans',sans-serif"}}>Suman Jain</div>
                      </div>
                      {/* Badge */}
                      <div className="mtm-badge" style={{position:"absolute",bottom:-16,right:-16,zIndex:2,background:"#fff",borderRadius:18,padding:"13px 18px",boxShadow:"0 10px 40px rgba(205,44,88,0.16)",border:"1px solid rgba(255,255,255,0.90)",display:"flex",alignItems:"center",gap:12,animation:"badgeFloat 6s ease-in-out infinite"}}>
                        <div className="mtm-badge-num" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:600,color:"#CD2C58",lineHeight:1}}><CountUp target="5000+" /></div>
                        <div className="mtm-badge-text" style={{fontSize:"0.70rem",color:"#7a4a55",lineHeight:1.45,maxWidth:70,fontFamily:"'DM Sans',sans-serif"}}>Happy Students & Counting</div>
                      </div>
                    </div>
                  </div>

                  {/* Credentials */}
                  {/* <div style={{display:"flex",flexDirection:"column",gap:9,marginTop:38}}>
                    {CREDENTIALS.map((c,i)=>(
                      <div key={i} className="mtm-cred-item" style={{display:"flex",alignItems:"center",gap:12,background:"rgba(255,255,255,0.70)",backdropFilter:"blur(8px)",border:"1px solid rgba(224,107,128,0.18)",borderRadius:12,padding:"10px 16px",fontSize:"0.82rem",color:"#7a4a55",fontFamily:"'DM Sans',sans-serif"}}>
                        <span style={{fontSize:"1rem"}}>{c.icon}</span><span>{c.text}</span>
                      </div>
                    ))}
                  </div> */}

                </div>
              </div>
            )}

            {/* ── RIGHT COLUMN ── */}
            {inView && (
              <div className="mtm-right-anim">
                <h2 className="mtm-heading" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.3rem,3.8vw,4rem)",fontWeight:300,lineHeight:1.08,color:"#2a1018",marginBottom:20}}>
                  The heart<br/>behind <em style={{fontStyle:"italic",color:"#CD2C58"}}>Kalasrijan</em>
                </h2>

                <blockquote style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1rem,1.4vw,1.12rem)",color:"#E06B80",fontWeight:300,lineHeight:1.72,fontStyle:"italic",borderLeft:"2px solid #FFC69D",paddingLeft:20,marginBottom:30}}>
                  "Guided by Suman Jain's years of expertise, Kalasrijan is more than a school — it's a community where passion meets practice."
                </blockquote>

                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"0.94rem",color:"#7a4a55",lineHeight:1.85,fontWeight:300,marginBottom:10}}>
                  Suman Jain started her journey by teaching soft toy-making classes, conducting free sessions in temples to share skills with her community. Her dedication and warmth slowly built a strong, loyal network of learners.
                </p>

                {expanded && (
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"0.94rem",color:"#7a4a55",lineHeight:1.85,fontWeight:300,marginBottom:10,animation:"slideIn 0.5s ease both"}}>
                    In 2019, working as a chef at IFB became a pivotal turning point — this experience opened new doors and gave her a deeper creative vision. Today she remains active, confident, and deeply passionate. With an M.Sc. in Botany and a Diploma of Pharmacy, she brings both scientific precision and artistic soul to everything she teaches.
                  </p>
                )}

                <button className="mtm-toggle-btn" onClick={()=>setExpanded(e=>!e)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.82rem",color:"#CD2C58",fontWeight:500,letterSpacing:"0.04em",display:"inline-flex",alignItems:"center",gap:6,marginBottom:36,padding:0}}>
                  {expanded ? "Show less" : "Read Suman's full story"}
                  <span style={{display:"inline-block",transition:"transform 0.3s",transform:expanded?"rotate(90deg)":"rotate(0deg)"}}>→</span>
                </button>

                {/* Timeline */}
                <div style={{overflow:"hidden",maxHeight:expanded?"800px":"0",transition:"max-height 0.7s cubic-bezier(0.4,0,0.2,1)",marginBottom:expanded?36:0}}>
                  <div style={{paddingTop:8}}>
                    {TIMELINE.map((item,i)=>(
                      <div key={i} className="mtm-tl-row" style={{display:"flex",gap:18,paddingBottom:26,position:"relative"}}>
                        {i<TIMELINE.length-1 && <div style={{position:"absolute",left:21,top:44,width:1,bottom:0,background:"linear-gradient(to bottom,rgba(205,44,88,0.22),transparent)"}}/>}
                        <div className="mtm-tl-dot" style={{width:44,height:44,flexShrink:0,borderRadius:"50%",background:"rgba(255,255,255,0.80)",border:"1.5px solid rgba(205,44,88,0.22)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.05rem",boxShadow:"0 4px 16px rgba(205,44,88,0.09)"}}>{item.icon}</div>
                        <div>
                          <div style={{fontSize:"0.68rem",letterSpacing:"0.14em",textTransform:"uppercase",color:"#CD2C58",fontWeight:500,marginBottom:3,fontFamily:"'DM Sans',sans-serif"}}>{item.year}</div>
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:600,color:"#2a1018",marginBottom:4}}>{item.title}</div>
                          <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"0.84rem",color:"#7a4a55",lineHeight:1.72,fontWeight:300}}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="mtm-stats-grid" style={{display:"grid",gap:14,marginBottom:40}}>
                  {STATS.map((s,i)=>(
                    <div key={i} className="mtm-stat-card" style={{background:"rgba(255,255,255,0.60)",backdropFilter:"blur(10px)",border:"1px solid rgba(224,107,128,0.18)",borderRadius:16,padding:"16px 10px",textAlign:"center",cursor:"default"}}>
                      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.8rem",fontWeight:600,color:"#CD2C58",lineHeight:1,marginBottom:5}}><CountUp target={s.value}/></div>
                      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"0.68rem",letterSpacing:"0.08em",textTransform:"uppercase",color:"#7a4a55",fontWeight:400}}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mtm-cta-row" style={{display:"flex",alignItems:"center",gap:22,flexWrap:"wrap"}}>
                  <a href="#" className="mtm-btn-main" style={{display:"inline-flex",alignItems:"center",gap:10,background:"#CD2C58",color:"#fff",padding:"14px 30px",borderRadius:100,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.875rem",fontWeight:500,letterSpacing:"0.04em",textDecoration:"none",boxShadow:"0 8px 28px rgba(205,44,88,0.28)"}}>
                    Read Suman's Story <span style={{transition:"transform 0.22s"}}>→</span>
                  </a>
                  <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",fontStyle:"italic",color:"#7a4a55"}}>— Inspiring since day one</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}