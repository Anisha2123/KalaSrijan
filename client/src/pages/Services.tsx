import { useEffect, useRef, useState } from "react";
import SmartImage from "../utils/SmartImage";
import { useLocation } from "react-router-dom";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 1, idSlug: "hand-painting", num: "01", title: "Hand Painting", subtitle: "Wearable Canvas Art", icon: "🎨", tag: "Wearable Art", tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916625/image_rejikn.png",
    desc: "Each piece is hand-crafted with meticulous outline work, vivid pigments, and Suman's signature touch of elegance — turning your garment into a wearable masterpiece.",
    services: [{ name: "Hand Painting on Saree", price: "₹1,500" }, { name: "Hand Painting on Suits", price: "₹1,500" }],
    highlight: "₹1,500 / piece",
    accent: "linear-gradient(145deg,#FFC69D,#E06B80)",
  },
  {
    id: 2, idSlug: "thermacol-art", num: "02", title: "Thermacol Art", subtitle: "Sculptural Event Décor", icon: "🏛️", tag: "Event Decor", tagColor: "#E06B80",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916631/thermacol_art_tgh6et.png",
    desc: "Lightweight yet breathtaking — Suman shapes Thermacol into grand statues, monuments, display props, and wedding packing trays that make every occasion unforgettable.",
    services: [{ name: "Wedding Packing Trays", price: "Custom" }, { name: "Statues & Monuments", price: "Custom" }, { name: "Temporary Displays", price: "Custom" }],
    highlight: "From ₹1,000",
    accent: "linear-gradient(145deg,#FFE6D4,#FFC69D)",
  },
  {
    id: 3, idSlug: "fancy-dress", num: "03", title: "Fancy Dress", subtitle: "Costume Design End-to-End", icon: "✂️", tag: "Costumes", tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773920275/35894ddc-a1f6-4e5b-b706-1098964ed757.png",
    desc: "From concept to catwalk — complete costume creation with matching props, themed colours, and every last detail handled for you. Every child deserves to shine on stage.",
    services: [{ name: "Theme Costume + Props", price: "₹1,000–₹5,000" }],
    highlight: "₹1,000 – ₹5,000",
    accent: "linear-gradient(145deg,#FFC69D,#CD2C58)",
  },
  {
    id: 4, idSlug: "school-projects", num: "04", title: "School Projects", subtitle: "Models, STEM & B.Ed", icon: "🔬", tag: "Education", tagColor: "#E06B80",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773920224/a52e6c62-720d-4a68-9c71-f96e3d44307b.png",
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
    id: 5, idSlug: "wedding-hampers", num: "05", title: "Wedding Hampers", subtitle: "Packing & Platters", icon: "🎁", tag: "Occasions", tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916647/weeding_decorcation_and_hamper_orgaqa.png",
    desc: "Beautifully curated platters and hampers for life's most cherished occasions — from Haldi ceremonies to gifting trays that leave every guest in awe.",
    services: [{ name: "Decorative Platters", price: "Custom" }, { name: "Haldi Platter", price: "Custom" }],
    highlight: "Made to order",
    accent: "linear-gradient(145deg,#FFC69D,#E06B80)",
  },
  {
    id: 6, idSlug: "card-decoration", num: "06", title: "Card Decoration", subtitle: "Themed Invitation Art", icon: "💌", tag: "Invitations", tagColor: "#E06B80",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916647/Card_Decoration_ermpnu.png",
    desc: "Customized card decorations for weddings and special events. Every design is carefully crafted to align with your specific theme and occasion style.",
    services: [
      { name: "Wedding Card Decoration", price: "₹500" },
      { name: "Event Card Decoration", price: "₹500" },
      { name: "Rally Customized Decoration", price: "₹500" },
    ],
    highlight: "₹500 / card",
    accent: "linear-gradient(145deg,#FFE6D4,#FFC69D)",
  },
  {
    id: 7, idSlug: "custom-event-decor", num: "07", title: "Custom Event Décor", subtitle: "Tailored Theme Elements", icon: "✨", tag: "Customized", tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773920841/61a7d48c-f7b5-43e0-b7e4-37cb5fb9a67c.png",
    desc: "Bespoke decoration items designed specifically for your event's requirements. Suman creates unique pieces that perfectly fit your chosen theme.",
    services: [{ name: "Theme-based Decor Items", price: "₹1,000" }],
    highlight: "From ₹1,000",
    accent: "linear-gradient(145deg,#FFC69D,#CD2C58)",
  },
];

/* ─────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────────────────
   DESKTOP CARD  (untouched — alternating left/right)
───────────────────────────────────────────────────────── */
function DesktopCard({ s, idx }) {
  const { ref, inView } = useInView(0.08);
  const [hov, setHov] = useState(false);
  const even = idx % 2 === 0;
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 85;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div id={s.idSlug} ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:"grid", gridTemplateColumns: even ? "400px 1fr" : "1fr 400px", gap:52, alignItems:"center", position:"relative",
        opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : (even ? "translateX(-28px)" : "translateX(28px)"),
        transition:`opacity 0.9s ease ${idx*0.1}s, transform 0.9s ease ${idx*0.1}s` }}>

      <span style={{ position:"absolute", top:-28, right:0, fontFamily:"'Cormorant Garamond',serif", fontSize:"7rem", fontWeight:600, color:"rgba(205,44,88,0.05)", lineHeight:1, pointerEvents:"none", userSelect:"none", zIndex:0 }}>{s.num}</span>

      <div style={{ position:"relative", order: even ? 1 : 2, zIndex:1 }}>
        <div style={{ position:"absolute", top:14, left:14, width:"100%", height:"100%", border:"1.5px solid rgba(205,44,88,0.18)", borderRadius: even ? "24px 6px 24px 6px" : "6px 24px 6px 24px", transition:"transform 0.4s", transform: hov ? "translate(5px,5px)" : "none", zIndex:0 }}/>
        <div style={{ position:"relative", zIndex:1, width:"100%", aspectRatio:"4/3", borderRadius: even ? "6px 24px 6px 24px" : "24px 6px 24px 6px", overflow:"hidden", boxShadow:"0 28px 72px rgba(205,44,88,0.18),0 6px 20px rgba(224,107,128,0.12)" }}>
          <SmartImage src={s.img} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.7s ease", transform: hov ? "scale(1.06)" : "scale(1)", display:"block" }} />
          <div style={{ position:"absolute", inset:0, background:s.accent, opacity: hov ? 0.12 : 0.28, mixBlendMode:"multiply", transition:"opacity 0.4s" }}/>
          <div style={{ position:"absolute", bottom:14, left:14, width:44, height:44, background:"rgba(255,255,255,0.90)", backdropFilter:"blur(8px)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.25rem", boxShadow:"0 4px 16px rgba(205,44,88,0.14)" }}>{s.icon}</div>
        </div>
        <div style={{ position:"absolute", top:-10, right:-10, background:"rgba(255,255,255,0.92)", backdropFilter:"blur(10px)", border:`1px solid ${s.tagColor}`, color:s.tagColor, borderRadius:100, padding:"5px 14px", fontSize:"0.68rem", fontWeight:500, letterSpacing:"0.09em", textTransform:"uppercase", boxShadow:"0 4px 18px rgba(205,44,88,0.10)", zIndex:2, animation:"tagFloat 5s ease-in-out infinite" }}>{s.tag}</div>
      </div>

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
          <a href="tel:+918890448242" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#CD2C58", color:"#fff", padding:"13px 28px", borderRadius:100, border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:"0.875rem", fontWeight:500, letterSpacing:"0.04em", boxShadow:"0 8px 26px rgba(205,44,88,0.28)", transition:"all 0.22s ease", textDecoration:"none" }}
            onMouseEnter={e => { e.currentTarget.style.background="#b82350"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#CD2C58"; e.currentTarget.style.transform=""; }}>
            Enquire Now <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TABLET CARD  (editorial stacked — image top, content below)
───────────────────────────────────────────────────────── */
function TabletCard({ s, idx }) {
  const { ref, inView } = useInView(0.06);

  return (
    <div id={`tab-${s.idSlug}`} ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 32,
        alignItems: "start",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.75s ease ${idx * 0.08}s, transform 0.75s ease ${idx * 0.08}s`,
      }}>

      {/* Image — left column */}
      <div style={{ position:"relative" }}>
        {/* Num watermark top-left */}
        <div style={{ position:"absolute", top:-16, left:0, fontFamily:"'Cormorant Garamond',serif", fontSize:"4.5rem", fontWeight:600, color:"rgba(205,44,88,0.07)", lineHeight:1, pointerEvents:"none", userSelect:"none", zIndex:0 }}>{s.num}</div>
        <div style={{ position:"relative", zIndex:1, width:"100%", aspectRatio:"4/3", borderRadius:"18px 4px 18px 4px", overflow:"hidden", boxShadow:"0 16px 48px rgba(205,44,88,0.14),0 4px 16px rgba(224,107,128,0.10)" }}>
          <SmartImage src={s.img} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          <div style={{ position:"absolute", inset:0, background:s.accent, opacity:0.22, mixBlendMode:"multiply" }}/>
          {/* Icon badge */}
          <div style={{ position:"absolute", bottom:12, left:12, width:38, height:38, background:"rgba(255,255,255,0.92)", backdropFilter:"blur(6px)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", boxShadow:"0 4px 14px rgba(205,44,88,0.14)" }}>{s.icon}</div>
        </div>
        {/* Tag pill */}
        <div style={{ position:"absolute", top:10, right:-8, background:"rgba(255,255,255,0.94)", backdropFilter:"blur(10px)", border:`1px solid ${s.tagColor}`, color:s.tagColor, borderRadius:100, padding:"4px 12px", fontSize:"0.62rem", fontWeight:500, letterSpacing:"0.09em", textTransform:"uppercase", boxShadow:"0 4px 14px rgba(205,44,88,0.10)", zIndex:2, animation:"tagFloat 5s ease-in-out infinite" }}>{s.tag}</div>
      </div>

      {/* Content — right column */}
      <div style={{ paddingTop:8 }}>
        {/* Number + title */}
        <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:10 }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.62rem", fontWeight:500, color:"rgba(205,44,88,0.55)", letterSpacing:"0.12em" }}>{s.num}</span>
          <div style={{ width:24, height:1, background:"rgba(205,44,88,0.25)" }} />
        </div>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.5rem,2.8vw,2rem)", fontWeight:400, color:"#2a1018", lineHeight:1.1, marginBottom:4 }}>{s.title}</h3>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.68rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"#E06B80", fontWeight:500, marginBottom:12 }}>{s.subtitle}</p>

        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.85rem", color:"#7a4a55", lineHeight:1.78, fontWeight:300, marginBottom:16 }}>{s.desc}</p>

        {/* Service list */}
        <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:18 }}>
          {s.services.map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 12px", background:"rgba(255,255,255,0.60)", backdropFilter:"blur(6px)", border:"1px solid rgba(224,107,128,0.14)", borderRadius:10 }}>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.78rem", color:"#2a1018", fontWeight:400 }}>{item.name}</span>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"0.95rem", fontWeight:600, color:"#CD2C58", whiteSpace:"nowrap", marginLeft:8 }}>{item.price}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
          <div style={{ background:"rgba(255,255,255,0.55)", border:"1px solid rgba(205,44,88,0.18)", borderRadius:12, padding:"8px 14px" }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.52rem", letterSpacing:"0.14em", textTransform:"uppercase", color:"#E06B80" }}>From</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", fontWeight:600, color:"#CD2C58", lineHeight:1.2 }}>{s.highlight}</div>
          </div>
          <a href="tel:+918890448242"
            style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#CD2C58", color:"#fff", padding:"11px 22px", borderRadius:100, fontFamily:"'DM Sans',sans-serif", fontSize:"0.80rem", fontWeight:500, letterSpacing:"0.04em", textDecoration:"none", boxShadow:"0 6px 20px rgba(205,44,88,0.26)", transition:"background 0.2s, transform 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#b82350"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#CD2C58"; e.currentTarget.style.transform=""; }}>
            Enquire <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MOBILE CARD  (accordion drawer — tap to expand)
───────────────────────────────────────────────────────── */
function MobileCard({ s, idx, isOpen, onToggle }) {
  const { ref, inView } = useInView(0.05);

  return (
    <div ref={ref} id={`mob-${s.idSlug}`}
      style={{
        background: "rgba(255,255,255,0.70)",
        backdropFilter: "blur(12px)",
        border: isOpen ? `1px solid ${s.tagColor}44` : "1px solid rgba(224,107,128,0.18)",
        borderRadius: 18,
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${idx * 0.06}s, transform 0.6s ease ${idx * 0.06}s, border-color 0.25s`,
        boxShadow: isOpen ? "0 12px 40px rgba(205,44,88,0.12)" : "0 2px 12px rgba(42,16,24,0.06)",
      }}>

      {/* ── Tap header ── */}
      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          gap: 14, padding: "16px 18px",
          background: "none", border: "none", cursor: "pointer",
          textAlign: "left",
          WebkitTapHighlightColor: "transparent",
        }}>

        {/* Icon circle */}
        <div style={{
          width: 44, height: 44, flexShrink: 0, borderRadius: "50%",
          background: isOpen
            ? `linear-gradient(135deg, ${s.tagColor}, ${s.tagColor}bb)`
            : "rgba(255,255,255,0.85)",
          border: `1.5px solid ${s.tagColor}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.15rem",
          boxShadow: isOpen ? `0 4px 16px ${s.tagColor}33` : "0 2px 8px rgba(205,44,88,0.08)",
          transition: "background 0.25s, box-shadow 0.25s",
        }}>{s.icon}</div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.55rem", fontWeight:500, color:"rgba(205,44,88,0.55)", letterSpacing:"0.12em" }}>{s.num}</span>
            <span style={{ width:16, height:1, background:"rgba(205,44,88,0.25)" }} />
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.12rem", fontWeight:400, color:"#2a1018", lineHeight:1.2 }}>{s.title}</div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.60rem", letterSpacing:"0.10em", textTransform:"uppercase", color:"#E06B80", fontWeight:500, marginTop:1 }}>{s.subtitle}</div>
        </div>

        {/* Price + chevron */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4, flexShrink:0 }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:600, color:"#CD2C58", lineHeight:1 }}>{s.highlight}</div>
          <div style={{
            width: 26, height: 26, borderRadius: "50%",
            background: isOpen ? "#CD2C58" : "rgba(205,44,88,0.08)",
            border: `1px solid ${isOpen ? "#CD2C58" : "rgba(205,44,88,0.22)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.70rem",
            color: isOpen ? "#fff" : "#CD2C58",
            transition: "all 0.25s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}>▾</div>
        </div>
      </button>

      {/* ── Expanded content ── */}
      <div style={{
        maxHeight: isOpen ? "900px" : "0px",
        overflow: "hidden",
        transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ padding: "0 18px 20px" }}>

          {/* Image */}
          <div style={{ width:"100%", aspectRatio:"16/9", borderRadius:14, overflow:"hidden", marginBottom:16, boxShadow:"0 8px 28px rgba(205,44,88,0.14)" }}>
            <SmartImage src={s.img} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          </div>

          {/* Description */}
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.84rem", color:"#7a4a55", lineHeight:1.80, fontWeight:300, marginBottom:16 }}>{s.desc}</p>

          {/* Service items */}
          <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:18 }}>
            {s.services.map((item, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 13px", background:"rgba(255,255,255,0.65)", border:"1px solid rgba(224,107,128,0.16)", borderRadius:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ width:5, height:5, borderRadius:"50%", background:"#E06B80", flexShrink:0 }} />
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.80rem", color:"#2a1018" }}>{item.name}</span>
                </div>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"0.95rem", fontWeight:600, color:"#CD2C58", whiteSpace:"nowrap", marginLeft:8 }}>{item.price}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="tel:+918890448242"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, background:"#CD2C58", color:"#fff", padding:"14px 24px", borderRadius:100, fontFamily:"'DM Sans',sans-serif", fontSize:"0.875rem", fontWeight:500, letterSpacing:"0.04em", textDecoration:"none", boxShadow:"0 8px 24px rgba(205,44,88,0.28)", width:"100%" }}>
            Enquire Now →
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION HEADER  (shared)
───────────────────────────────────────────────────────── */
function SectionHeader({ inView }: { inView: boolean }) {
  return (
    <div style={{ textAlign:"center", marginBottom:72, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition:"opacity 0.9s ease, transform 0.9s ease" }}>
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
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN
───────────────────────────────────────────────────────── */
export default function ServicesSection() {
  const { ref: hr, inView: hi } = useInView(0.1);
  const [openId, setOpenId] = useState<number | null>(1); // first open by default

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes tagFloat  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-6px)} }
        @keyframes bd1       { from{transform:translate(0,0)}    to{transform:translate(-28px,20px)} }
        @keyframes bd2       { from{transform:translate(0,0)}    to{transform:translate(20px,-16px)} }
        * { box-sizing:border-box; margin:0; padding:0; }

        /* ── Which layout renders at which breakpoint ── */

        /* Desktop ≥1024px: show desktop, hide tablet + mobile */
        .ss-desktop { display: flex; flex-direction: column; gap: 52px; }
        .ss-tablet  { display: none; }
        .ss-mobile  { display: none; }

        /* Tablet 768–1023px: show tablet, hide desktop + mobile */
        @media (max-width: 1023px) {
          .ss-desktop { display: none; }
          .ss-tablet  { display: flex; flex-direction: column; gap: 44px; }
          .ss-mobile  { display: none; }

          /* Tablet section padding */
          .ss-section { padding: 72px 0 64px !important; }
          .ss-inner   { padding: 0 28px !important; }

          /* Tighten header margin */
          .ss-header-wrap { margin-bottom: 52px !important; }
          .ss-header-wrap h2 { font-size: clamp(2rem,4.5vw,3.2rem) !important; }
        }

        /* Mobile ≤767px: show mobile, hide desktop + tablet */
        @media (max-width: 767px) {
          .ss-desktop { display: none; }
          .ss-tablet  { display: none; }
          .ss-mobile  { display: flex; flex-direction: column; gap: 12px; }

          /* Mobile section padding */
          .ss-section { padding: 52px 0 48px !important; }
          .ss-inner   { padding: 0 16px !important; }

          .ss-header-wrap { margin-bottom: 36px !important; text-align: left !important; }
          .ss-header-wrap h2 { font-size: clamp(1.9rem,7vw,2.4rem) !important; text-align: left !important; }
          .ss-header-wrap p  { text-align: left !important; margin: 0 !important; font-size: .88rem !important; }
          .ss-header-eyebrow { justify-content: flex-start !important; }
        }

        /* XS ≤399px */
        @media (max-width: 399px) {
          .ss-inner { padding: 0 14px !important; }
          .ss-header-wrap h2 { font-size: 1.75rem !important; }
        }
      `}</style>

      <section className="ss-section" style={{ background:"#fff8f4", fontFamily:"'DM Sans',sans-serif", position:"relative", overflow:"hidden", padding:"96px 0 88px" }}>

        {/* Ambient blobs */}
        <div style={{ position:"absolute", width:620, height:620, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,198,157,0.16) 0%,transparent 65%)", top:-160, right:-200, animation:"bd1 16s ease-in-out infinite alternate", pointerEvents:"none", zIndex:0 }}/>
        <div style={{ position:"absolute", width:460, height:460, borderRadius:"50%", background:"radial-gradient(circle,rgba(205,44,88,0.07) 0%,transparent 65%)", bottom:-80, left:-120, animation:"bd2 13s ease-in-out infinite alternate", pointerEvents:"none", zIndex:0 }}/>

        <div className="ss-inner" style={{ maxWidth:1180, margin:"0 auto", padding:"0 36px", position:"relative", zIndex:1 }}>

          {/* Header */}
          <div ref={hr} className="ss-header-wrap" style={{ textAlign:"center", marginBottom:72, opacity: hi ? 1 : 0, transform: hi ? "translateY(0)" : "translateY(24px)", transition:"opacity 0.9s ease, transform 0.9s ease" }}>
            <div className="ss-header-eyebrow" style={{ display:"inline-flex", alignItems:"center", gap:12, fontFamily:"'DM Sans',sans-serif", fontSize:11, letterSpacing:"0.20em", textTransform:"uppercase", color:"#CD2C58", fontWeight:500, marginBottom:20 }}>
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

          {/* ══════════════════════════════════════
              DESKTOP  ≥1024px — alternating cards
          ══════════════════════════════════════ */}
          <div className="ss-desktop">
            {SERVICES.map((s, i) => (
              <div key={s.id}>
                <DesktopCard s={s} idx={i} />
                {i < SERVICES.length - 1 && (
                  <div style={{ width:"100%", height:1, background:"linear-gradient(90deg,transparent,rgba(205,44,88,0.12),transparent)", marginTop:52 }}/>
                )}
              </div>
            ))}
          </div>

          {/* ══════════════════════════════════════
              TABLET  768–1023px
              2-col grid: image left, content right
              Stacked editorial, clean hierarchy
          ══════════════════════════════════════ */}
          <div className="ss-tablet">
            {SERVICES.map((s, i) => (
              <div key={s.id}>
                <TabletCard s={s} idx={i} />
                {i < SERVICES.length - 1 && (
                  <div style={{ width:"100%", height:1, background:"linear-gradient(90deg,transparent,rgba(205,44,88,0.14),transparent)", marginTop:44 }}/>
                )}
              </div>
            ))}
          </div>

          {/* ══════════════════════════════════════
              MOBILE  ≤767px
              Accordion list — tap to expand
              Dense, scannable, touch-native
          ══════════════════════════════════════ */}
          <div className="ss-mobile">
            {SERVICES.map((s, i) => (
              <MobileCard
                key={s.id}
                s={s}
                idx={i}
                isOpen={openId === s.id}
                onToggle={() => setOpenId(openId === s.id ? null : s.id)}
              />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}