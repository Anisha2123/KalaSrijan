import { useEffect, useRef, useState } from "react";

const REASONS = [
  { num:"01", icon:"✦", title:"Years of Expertise", sub:"Mastery earned through decades", body:"Suman Jain has spent years mastering diverse art forms — from painting and stitching to clay, resin, and cultural crafts. Her depth of knowledge is unmatched and always growing.", stat:"15+", statLabel:"Art Forms Taught", accent:"#CD2C58" },
  { num:"02", icon:"◈", title:"Personalized Attention", sub:"Every student, every style", body:"No two learners are alike. Suman tailors her guidance to each individual — adapting pace, technique, and encouragement so every student finds their own creative voice.", stat:"25", statLabel:"Sessions Per Course", accent:"#E06B80" },
  { num:"03", icon:"❋", title:"5000+ Happy Students", sub:"Trust built one class at a time", body:"Over 5,000 happy customers reflect the trust and love people place in Kalasrijan. Her unique, hard-to-copy designs and warm teaching style have made her truly one of a kind.", stat:"5K+", statLabel:"Happy Learners", accent:"#CD2C58" },
  { num:"04", icon:"⬡", title:"Practical Real-World Skills", sub:"Art you can use every day", body:"From decorating your home to making gifts, cooking, card decoration, and fabric painting — Kalasrijan teaches skills that enrich real everyday life.", stat:"100%", statLabel:"Hands-on Learning", accent:"#E06B80" },
  { num:"05", icon:"✿", title:"Inspiring Personality", sub:"Confidence that is contagious", body:"Even after years of experience, Suman remains active, passionate, and confident. Her positive energy transforms the act of learning into a genuine joy.", stat:"∞", statLabel:"Passion & Energy", accent:"#CD2C58" },
  { num:"06", icon:"◉", title:"One-of-a-Kind Creativity", sub:"Designs that can't be copied", body:"Suman's creative instinct produces work that is utterly original. She is appreciated for ideas and a special way of being creative — her designs are genuinely unique.", stat:"①", statLabel:"Unique Style", accent:"#E06B80" },
];

const MARQUEE = ["5000+ Happy Students","15+ Art Forms","Years of Expertise","Personalized Attention","Practical Skills","One-of-a-Kind Creativity","Inspiring Personality","Trusted by Thousands"];

function useInView(t=0.06){ const ref=useRef(null); const [v,setV]=useState(false); useEffect(()=>{ const el=ref.current; if(!el)return; const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t}); o.observe(el); return()=>o.disconnect(); },[]); return{ref,inView:v}; }

function CountUp({target}) {
  const [d,setD]=useState("0"); const {ref,inView}=useInView(0.3);
  useEffect(()=>{ if(!inView)return; const n=parseInt(target.replace(/\D/g,""),10); if(isNaN(n)){setD(target);return;} let c=0; const step=Math.ceil(n/50); const t=setInterval(()=>{ c+=step; if(c>=n){setD(target);clearInterval(t);}else setD(c+(target.includes("+")?"+":target.includes("%")?"%":"")); },28); return()=>clearInterval(t); },[inView,target]);
  return <span ref={ref}>{d}</span>;
}

function Card({r,idx}) {
  const {ref,inView}=useInView(0.05); const [hov,setHov]=useState(false);
  return (
    <div ref={ref} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{position:"relative",background:hov?"rgba(255,255,255,0.065)":"rgba(255,255,255,0.038)",border:`1px solid ${hov?"rgba(205,44,88,0.35)":"rgba(255,198,157,0.11)"}`,borderRadius:22,padding:"30px 26px 26px",overflow:"hidden",cursor:"default",
        opacity:inView?1:0,transform:inView?(hov?"translateY(-6px)":"translateY(0)"):"translateY(30px)",
        boxShadow:hov?"0 24px 64px rgba(0,0,0,0.32),0 4px 20px rgba(205,44,88,0.12)":"none",
        transition:`opacity 0.8s ease ${((idx%3)*0.09+Math.floor(idx/3)*0.12).toFixed(2)}s, transform 0.28s ease, border-color 0.28s, background 0.28s, box-shadow 0.28s`}}>
      {/* Top accent line */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${r.accent},transparent)`,transformOrigin:"left",transform:hov?"scaleX(1)":"scaleX(0.35)",transition:"transform 0.4s ease"}}/>
      {/* Hover shimmer */}
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 0%,${r.accent}0c 0%,transparent 70%)`,opacity:hov?1:0,transition:"opacity 0.4s",pointerEvents:"none"}}/>
      {/* Head */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
        <div style={{width:52,height:52,borderRadius:16,border:`1px solid ${r.accent}28`,background:"rgba(255,255,255,0.04)",color:r.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.4rem",transition:"transform 0.3s",transform:hov?"scale(1.1) rotate(-5deg)":"scale(1)"}}>{r.icon}</div>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2rem",fontWeight:600,color:`${r.accent}50`,lineHeight:1}}>{r.num}</span>
      </div>
      <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.42rem",fontWeight:400,color:"#fff",lineHeight:1.15,marginBottom:4}}>{r.title}</h3>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"0.68rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,198,157,0.42)",fontWeight:500,marginBottom:15}}>{r.sub}</p>
      <div style={{height:1,background:`linear-gradient(90deg,${r.accent}40,transparent)`,marginBottom:15}}/>
      <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",color:"rgba(255,230,212,0.52)",lineHeight:1.82,fontWeight:300,marginBottom:22}}>{r.body}</p>
      <div style={{display:"inline-flex",alignItems:"baseline",gap:8,padding:"9px 14px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,198,157,0.10)",borderRadius:12}}>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.45rem",fontWeight:600,color:r.accent,lineHeight:1}}><CountUp target={r.stat}/></span>
        <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"0.63rem",letterSpacing:"0.10em",textTransform:"uppercase",color:"rgba(255,198,157,0.38)",fontWeight:400}}>{r.statLabel}</span>
      </div>
    </div>
  );
}

export default function WhyChooseKalasrijan() {
  const {ref:hr,inView:hi}=useInView(0.04);
  const {ref:cr,inView:ci}=useInView(0.06);

  return <div>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      *{box-sizing:border-box;margin:0;padding:0}
      @keyframes wcBlob{from{transform:translate(0,0) scale(1)}to{transform:translate(16px,12px) scale(1.04)}}
      @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
      .wc-stb:hover{background:rgba(205,44,88,0.09)!important}
      .wc-cta-a:hover{background:rgba(255,198,157,0.10)!important;border-color:#FFC69D!important;transform:translateY(-2px)!important}
    `}</style>

    <section style={{fontFamily:"'DM Sans',sans-serif",position:"relative",overflow:"hidden",background:"#2a1018"}}>
      {/* Grain */}
      <div style={{position:"absolute",inset:0,zIndex:0,pointerEvents:"none",opacity:0.023,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",backgroundSize:"200px"}}/>
      {/* Blobs */}
      <div style={{position:"absolute",width:680,height:680,borderRadius:"50%",background:"radial-gradient(circle,rgba(205,44,88,0.10) 0%,transparent 65%)",top:-200,right:-200,animation:"wcBlob 18s ease-in-out infinite alternate",zIndex:0,pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,198,157,0.07) 0%,transparent 65%)",bottom:-120,left:-120,animation:"wcBlob 14s ease-in-out infinite alternate",zIndex:0,pointerEvents:"none"}}/>
      <div style={{position:"absolute",width:340,height:340,borderRadius:"50%",background:"radial-gradient(circle,rgba(224,107,128,0.08) 0%,transparent 65%)",top:"42%",left:"44%",animation:"wcBlob 11s ease-in-out 3s infinite alternate",zIndex:0,pointerEvents:"none"}}/>
      {/* Corner marks */}
      <div style={{position:"absolute",top:-44,left:-22,fontFamily:"'Cormorant Garamond',serif",fontSize:"17rem",fontWeight:600,color:"rgba(205,44,88,0.04)",lineHeight:1,zIndex:0,pointerEvents:"none",userSelect:"none"}}>"</div>
      <div style={{position:"absolute",bottom:-64,right:-12,fontFamily:"'Cormorant Garamond',serif",fontSize:"17rem",fontWeight:600,color:"rgba(205,44,88,0.04)",lineHeight:1,zIndex:0,pointerEvents:"none",userSelect:"none",transform:"rotate(180deg)"}}>"</div>

      {/* Marquee */}
      <div style={{overflow:"hidden",borderTop:"1px solid rgba(255,198,157,0.09)",borderBottom:"1px solid rgba(255,198,157,0.09)",padding:"13px 0",background:"rgba(205,44,88,0.05)",position:"relative",zIndex:1}}>
        <div style={{display:"flex",width:"max-content",animation:"mq 24s linear infinite"}}>
          {[...MARQUEE,...MARQUEE].map((item,i)=>(
            <span key={i} style={{display:"inline-flex",alignItems:"center",gap:14,padding:"0 30px",fontSize:"0.70rem",letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,198,157,0.50)",fontWeight:500,whiteSpace:"nowrap"}}>
              <span style={{width:4,height:4,borderRadius:"50%",background:"#E06B80",flexShrink:0,display:"inline-block"}}/>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Inner */}
      <div ref={hr} style={{maxWidth:1180,margin:"0 auto",padding:"0 36px",position:"relative",zIndex:1}}>
        {/* Header */}
        {hi && <div style={{textAlign:"center",padding:"84px 0 64px",animation:"fadeUp 0.9s ease both"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:12,fontSize:11,letterSpacing:"0.20em",textTransform:"uppercase",color:"#FFC69D",fontWeight:500,marginBottom:20}}>
            <div style={{width:38,height:1,background:"linear-gradient(90deg,#FFC69D,transparent)"}}/>
            Why Choose Kalasrijan
            <div style={{width:38,height:1,background:"linear-gradient(270deg,#FFC69D,transparent)"}}/>
          </div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.7rem,5.2vw,5.2rem)",fontWeight:300,lineHeight:1.06,color:"#fff",marginBottom:18}}>
            Experience, dedication,<br/>creativity — and <em style={{fontStyle:"italic",color:"#FFC69D"}}>trust</em>
          </h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"1rem",color:"rgba(255,230,212,0.52)",fontWeight:300,lineHeight:1.78,maxWidth:510,margin:"0 auto"}}>
            Choosing Kalasrijan means learning from someone who embodies all four — and brings genuine joy to every class.
          </p>
        </div>}

        {/* Stats row */}
        {hi && <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"rgba(255,198,157,0.09)",border:"1px solid rgba(255,198,157,0.09)",borderRadius:20,overflow:"hidden",marginBottom:64,animation:"fadeUp 0.9s ease 0.15s both"}}>
          {[{v:"5000+",l:"Happy Students"},{v:"15+",l:"Art Forms Taught"},{v:"100%",l:"Hands-on Learning"},{v:"1",l:"Truly Unique Style"}].map((s,i)=>(
            <div key={i} className="wc-stb" style={{padding:"26px 22px",background:"rgba(255,255,255,0.03)",textAlign:"center",cursor:"default",transition:"background 0.25s"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2rem,3.2vw,3rem)",fontWeight:600,color:"#FFC69D",lineHeight:1,marginBottom:7}}><CountUp target={s.v}/></div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"0.68rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,198,157,0.42)",fontWeight:400}}>{s.l}</div>
            </div>
          ))}
        </div>}

        {/* Cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,paddingBottom:80}}>
          {REASONS.map((r,i)=><Card key={r.num} r={r} idx={i}/>)}
        </div>
      </div>

      {/* CTA strip */}
      <div ref={cr} style={{borderTop:"1px solid rgba(255,198,157,0.09)",padding:"68px 36px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:40,flexWrap:"wrap",position:"relative",zIndex:1,maxWidth:1180,margin:"0 auto",
        opacity:ci?1:0,transform:ci?"translateY(0)":"translateY(22px)",transition:"opacity 0.9s ease,transform 0.9s ease"}}>
        <div style={{maxWidth:560}}>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(1.15rem,2vw,1.75rem)",fontWeight:300,fontStyle:"italic",color:"rgba(255,230,212,0.72)",lineHeight:1.58,marginBottom:8}}>
            "Choosing Suman Jain means learning from someone who is the combination of <em style={{color:"#FFC69D",fontStyle:"normal",fontWeight:400}}>experience, dedication, creativity, and trust.</em>"
          </p>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"0.70rem",letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,198,157,0.32)"}}>— The Kalasrijan Promise</p>
        </div>
        <a href="#" className="wc-cta-a" style={{display:"inline-flex",alignItems:"center",gap:12,border:"1.5px solid rgba(255,198,157,0.33)",color:"#FFC69D",padding:"15px 34px",borderRadius:100,background:"transparent",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:"0.88rem",fontWeight:500,letterSpacing:"0.05em",textDecoration:"none",whiteSpace:"nowrap",transition:"all 0.25s",flexShrink:0}}>
          Start Learning Today <span style={{transition:"transform 0.22s"}}>→</span>
        </a>
      </div>

    </section>
  </div>;
}