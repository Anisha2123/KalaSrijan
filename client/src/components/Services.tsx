import { useEffect, useRef, useState } from "react";

const SERVICES = [
  {
    id: 1, num: "01", title: "Hand Painting", subtitle: "Wearable Canvas Art", icon: "🎨", tag: "Wearable Art", tagColor: "#CD2C58",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=700&auto=format&fit=crop",
    desc: "Each piece is hand-crafted with meticulous outline work, vivid pigments, and Suman's signature touch of elegance — turning your garment into a wearable masterpiece.",
    services: [{ name: "Hand Painting on Saree", price: "₹1,500" }, { name: "Hand Painting on Suits", price: "₹1,500" }],
    highlight: "₹1,500 / piece",
    accent: "linear-gradient(145deg,#FFC69D,#E06B80)",
  },
  {
    id: 2, num: "02", title: "Thermacol Art", subtitle: "Sculptural Event Décor", icon: "🏛️", tag: "Event Decor", tagColor: "#E06B80",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&auto=format&fit=crop",
    desc: "Lightweight yet breathtaking — Suman shapes Thermacol into grand statues, monuments, display props, and wedding packing trays that make every occasion unforgettable.",
    services: [{ name: "Wedding Packing Trays", price: "Custom" }, { name: "Statues & Monuments", price: "Custom" }, { name: "Temporary Displays", price: "Custom" }],
    highlight: "From ₹1,000",
    accent: "linear-gradient(145deg,#FFE6D4,#FFC69D)",
  },
  {
    id: 3, num: "03", title: "Fancy Dress", subtitle: "Costume Design End-to-End", icon: "✂️", tag: "Costumes", tagColor: "#CD2C58",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&auto=format&fit=crop",
    desc: "From concept to catwalk — complete costume creation with matching props, themed colours, and every last detail handled for you. Every child deserves to shine on stage.",
    services: [{ name: "Theme Costume + Props", price: "₹1,000–₹5,000" }],
    highlight: "₹1,000 – ₹5,000",
    accent: "linear-gradient(145deg,#FFC69D,#CD2C58)",
  },
  {
    id: 4, num: "04", title: "School Projects", subtitle: "Models, STEM & B.Ed", icon: "🔬", tag: "Education", tagColor: "#E06B80",
    img: "https://images.unsplash.com/photo-1532094349884-543559822d54?w=700&auto=format&fit=crop",
    desc: "Working models, robotic projects, B.Ed assignments, STEM exhibition displays, storytelling models — every concept brought to life with clarity and craft.",
    services: [
      { name: "Working / Demo Models", price: "₹300–₹500" },
      { name: "Robotic Projects", price: "From ₹5,000" },
      { name: "B.Ed Projects", price: "Custom" },
      { name: "STEM Exhibition Models", price: "Custom" },
      { name: "Storytelling Models", price: "Custom" },
    ],
    highlight: "From ₹300",
    accent: "linear-gradient(145deg,#FFE6D4,#E06B80)",
  },
  {
    id: 5, num: "05", title: "Wedding Hampers", subtitle: "Packing & Platters", icon: "🎁", tag: "Occasions", tagColor: "#CD2C58",
    img: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=700&auto=format&fit=crop",
    desc: "Beautifully curated platters and hampers for life's most cherished occasions — from Haldi ceremonies to gifting trays that leave every guest in awe.",
    services: [{ name: "Decorative Platters", price: "Custom" }, { name: "Haldi Platter", price: "Custom" }],
    highlight: "Made to order",
    accent: "linear-gradient(145deg,#FFC69D,#E06B80)",
  },
  {
    id: 6, num: "06", title: "Card Decoration", subtitle: "Themed Invitation Art", icon: "💌", tag: "Invitations", tagColor: "#E06B80",
    img: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=700&auto=format&fit=crop",
    desc: "Customized card decorations for weddings and special events. Every design is carefully crafted to align with your specific theme and occasion style.",
    services: [
      { name: "Wedding Card Decoration", price: "₹500" },
      { name: "Event Card Decoration", price: "₹500" },
      { name: "Rally Customized Decoration", price: "₹500" }
    ],
    highlight: "₹500 / card",
    accent: "linear-gradient(145deg,#FFE6D4,#FFC69D)",
  },
  {
    id: 7, num: "07", title: "Custom Event Décor", subtitle: "Tailored Theme Elements", icon: "✨", tag: "Customized", tagColor: "#CD2C58",
    img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&auto=format&fit=crop",
    desc: "Bespoke decoration items designed specifically for your event's requirements. Suman creates unique pieces that perfectly fit your chosen theme.",
    services: [{ name: "Theme-based Decor Items", price: "₹1,000" }],
    highlight: "From ₹1,000",
    accent: "linear-gradient(145deg,#FFC69D,#CD2C58)",
  },
];

function useInView(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    o.observe(el); return () => o.disconnect();
  }, []);
  return { ref, inView: v };
}

function Card({ s, idx }) {
  const { ref, inView } = useInView(0.08);
  const [hov, setHov] = useState(false);
  const even = idx % 2 === 0;

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"grid", gridTemplateColumns: even ? "400px 1fr" : "1fr 400px", gap:52, alignItems:"center", position:"relative",
        opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : (even ? "translateX(-28px)" : "translateX(28px)"),
        transition:`opacity 0.9s ease ${idx*0.1}s, transform 0.9s ease ${idx*0.1}s` }}>
      
      {/* Watermark */}
      <span style={{ position:"absolute", top:-28, right:0, fontFamily:"'Cormorant Garamond',serif", fontSize:"7rem", fontWeight:600, color:"rgba(205,44,88,0.05)", lineHeight:1, pointerEvents:"none", userSelect:"none", zIndex:0 }}>{s.num}</span>

      {/* IMG */}
      <div style={{ position:"relative", order: even ? 1 : 2, zIndex:1 }}>
        <div style={{ position:"absolute", top:14, left:14, width:"100%", height:"100%", border:"1.5px solid rgba(205,44,88,0.18)", borderRadius: even ? "24px 6px 24px 6px" : "6px 24px 6px 24px", transition:"transform 0.4s", transform: hov ? "translate(5px,5px)" : "none", zIndex:0 }}/>
        <div style={{ position:"relative", zIndex:1, width:"100%", aspectRatio:"4/3", borderRadius: even ? "6px 24px 6px 24px" : "24px 6px 24px 6px", overflow:"hidden", boxShadow:"0 28px 72px rgba(205,44,88,0.18),0 6px 20px rgba(224,107,128,0.12)" }}>
          <img src={s.img} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.7s ease", transform: hov ? "scale(1.06)" : "scale(1)", display:"block" }} />
          <div style={{ position:"absolute", inset:0, background:s.accent, opacity: hov ? 0.12 : 0.28, mixBlendMode:"multiply", transition:"opacity 0.4s" }}/>
          <div style={{ position:"absolute", bottom:14, left:14, width:44, height:44, background:"rgba(255,255,255,0.90)", backdropFilter:"blur(8px)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.25rem", boxShadow:"0 4px 16px rgba(205,44,88,0.14)" }}>{s.icon}</div>
        </div>
        <div style={{ position:"absolute", top:-10, right:-10, background:"rgba(255,255,255,0.92)", backdropFilter:"blur(10px)", border:`1px solid ${s.tagColor}`, color:s.tagColor, borderRadius:100, padding:"5px 14px", fontSize:"0.68rem", fontWeight:500, letterSpacing:"0.09em", textTransform:"uppercase", boxShadow:"0 4px 18px rgba(205,44,88,0.10)", zIndex:2, animation:"tagFloat 5s ease-in-out infinite" }}>{s.tag}</div>
      </div>

      {/* CONTENT */}
      <div style={{ order: even ? 2 : 1, position:"relative", zIndex:1 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:16 }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"0.78rem", fontWeight:600, color:"#CD2C58", letterSpacing:"0.08em", marginTop:6, opacity:0.65 }}>{s.num}</span>
          <div>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.7rem,2.6vw,2.5rem)", fontWeight:400, color:"#2a1018", lineHeight:1.08, marginBottom:4 }}>{s.title}</h3>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.76rem", letterSpacing:"0.13em", textTransform:"uppercase", color:"#E06B80", fontWeight:500 }}>{s.subtitle}</p>
          </div>
        </div>

        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.94rem", color:"#7a4a55", lineHeight:1.85, fontWeight:300, marginBottom:20 }}>{s.desc}</p>
        <div style={{ width:48, height:1, background:"linear-gradient(90deg,#FFC69D,transparent)", marginBottom:20 }}/>

        <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:9, marginBottom:26 }}>
          {s.services.map((item,i) => (
            <li key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:"rgba(255,255,255,0.60)", backdropFilter:"blur(8px)", border:"1px solid rgba(224,107,128,0.16)", borderRadius:12, transition:"background 0.22s,border-color 0.22s,transform 0.22s", cursor:"default" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(205,44,88,0.06)"; e.currentTarget.style.transform="translateX(5px)"; e.currentTarget.style.borderColor="rgba(205,44,88,0.28)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.60)"; e.currentTarget.style.transform=""; e.currentTarget.style.borderColor="rgba(224,107,128,0.16)"; }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#E06B80", flexShrink:0 }}/>
              <span style={{ flex:1, fontFamily:"'DM Sans',sans-serif", fontSize:"0.88rem", color:"#2a1018" }}>{item.name}</span>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:600, color:"#CD2C58", whiteSpace:"nowrap" }}>{item.price}</span>
            </li>
          ))}
        </ul>

        <div style={{ display:"flex", alignItems:"center", gap:18, flexWrap:"wrap" }}>
          <div style={{ background:"rgba(255,255,255,0.55)", backdropFilter:"blur(8px)", border:"1px solid rgba(205,44,88,0.18)", borderRadius:14, padding:"10px 18px" }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.60rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"#E06B80", fontWeight:500 }}>Starting</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", fontWeight:600, color:"#CD2C58", lineHeight:1.2 }}>{s.highlight}</div>
          </div>
          <button style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#CD2C58", color:"#fff", padding:"13px 28px", borderRadius:100, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"0.875rem", fontWeight:500, letterSpacing:"0.04em", boxShadow:"0 8px 26px rgba(205,44,88,0.28)", transition:"all 0.22s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background="#b82350"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#CD2C58"; e.currentTarget.style.transform=""; }}>
            Enquire Now <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { ref: hr, inView: hi } = useInView(0.1);

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes tagFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes bd1{from{transform:translate(0,0)}to{transform:translate(-28px,20px)}}
        @keyframes bd2{from{transform:translate(0,0)}to{transform:translate(20px,-16px)}}
        * { box-sizing:border-box; margin:0; padding:0; }
      `}</style>
      <section style={{ background:"#fff8f4", fontFamily:"'DM Sans',sans-serif", position:"relative", overflow:"hidden", padding:"96px 0 88px" }}>
        <div style={{ position:"absolute", width:620, height:620, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,198,157,0.16) 0%,transparent 65%)", top:-160, right:-200, animation:"bd1 16s ease-in-out infinite alternate", pointerEvents:"none", zIndex:0 }}/>
        <div style={{ position:"absolute", width:460, height:460, borderRadius:"50%", background:"radial-gradient(circle,rgba(205,44,88,0.07) 0%,transparent 65%)", bottom:-80, left:-120, animation:"bd2 13s ease-in-out infinite alternate", pointerEvents:"none", zIndex:0 }}/>

        <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 36px", position:"relative", zIndex:1 }}>
          {/* Header */}
          <div ref={hr} style={{ textAlign:"center", marginBottom:72, opacity: hi ? 1 : 0, transform: hi ? "translateY(0)" : "translateY(24px)", transition:"opacity 0.9s ease, transform 0.9s ease" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:12, fontFamily:"'DM Sans',sans-serif", fontSize:11, letterSpacing:"0.20em", textTransform:"uppercase", color:"#CD2C58", fontWeight:500, marginBottom:20 }}>
              <div style={{ width:40, height:1, background:"linear-gradient(90deg,#CD2C58,transparent)" }}/>
              Services
              <div style={{ width:40, height:1, background:"linear-gradient(270deg,#CD2C58,transparent)" }}/>
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.4rem,5vw,4.5rem)", fontWeight:300, lineHeight:1.06, color:"#2a1018", marginBottom:16 }}>
              Crafted with <em style={{ fontStyle:"italic", color:"#CD2C58" }}>passion</em>,<br/>delivered with care
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"1rem", color:"#7a4a55", fontWeight:300, maxWidth:500, margin:"0 auto", lineHeight:1.75 }}>
              Services by Suman Jain — where artistry meets purpose, for every occasion and every dream.
            </p>
          </div>

          {/* Cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:52 }}>
            {SERVICES.map((s, i) => (
              <div key={s.id}>
                <Card s={s} idx={i} />
                {i < SERVICES.length - 1 && <div style={{ width:"100%", height:1, background:"linear-gradient(90deg,transparent,rgba(205,44,88,0.12),transparent)", marginTop:52 }}/>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}