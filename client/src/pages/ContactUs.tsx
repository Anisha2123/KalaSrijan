"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────
   CONSTANTS
───────────────────────────────────── */
const INTERESTS = [
  "Painting Classes","Stitching / Diploma","Clay Modeling","Paper Craft",
  "Calligraphy","Herbal Soap Making","Resin Art","Candle Making",
  "Portable Rangoli","Lippan Art Workshop","Let's Draw & Paint",
  "Hand Painting (Service)","Thermacol Art (Service)","Fancy Dress Design",
  "School Projects","Wedding Hampers","General Inquiry",
];

const SOCIAL_LINKS = [
  {
    label:"WhatsApp", handle:"Chat with Suman", href:"https://wa.me/91XXXXXXXXXX",
    icon:(
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color:"#25D366", bg:"rgba(37,211,102,0.08)", border:"rgba(37,211,102,0.22)",
  },
  {
    label:"Instagram", handle:"@kalasrijan", href:"https://instagram.com/kalasrijan",
    icon:(
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color:"#E1306C", bg:"rgba(225,48,108,0.07)", border:"rgba(225,48,108,0.20)",
  },
];

const DETAIL_CARDS = [
  { icon:"📍", label:"Studio Address", value:"Kalathali A-21, Van Vihar Colony,\nOpp. Kamal N Company, Tonk Road\nJaipur – 302018", href:"https://maps.app.goo.gl/j6s6BdEftSDJV2hc8" },
  { icon:"📞", label:"Phone / WhatsApp", value:"+91 XXXXX XXXXX", href:"tel:+91XXXXXXXXXX" },
  { icon:"✉️", label:"Email", value:"hello@kalasrijan.com", href:"mailto:hello@kalasrijan.com" },
  { icon:"🕐", label:"Studio Hours", value:"Mon–Sat · 9:00 AM – 7:00 PM\nSunday by appointment", href:undefined },
];

const PETALS = Array.from({ length:8 }, (_,i) => ({
  size: 16 + (i*9)%26,
  top:  `${10+(i*11.3)%76}%`,
  left: `${5+(i*13.7)%88}%`,
  dur:  `${5+(i%4)}s`,
  delay:`${(i*0.7).toFixed(1)}s`,
  op:   0.10+(i%5)*0.04,
}));

/* ─────────────────────────────────────
   HOOK
───────────────────────────────────── */
function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [v,setV] = useState(false);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const obs = new IntersectionObserver(
      ([e])=>{ if(e.isIntersecting) setV(true); },
      { threshold }
    );
    obs.observe(el); return ()=>obs.disconnect();
  },[]);
  return { ref, inView:v };
}

/* ─────────────────────────────────────
   MAIN
───────────────────────────────────── */
export default function ContactUs() {
  const [formState, setFormState] = useState({ name:"", email:"", phone:"", interest:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const { ref:heroRef, inView:heroIn } = useInView(0.04);
  const { ref:formRef, inView:formIn } = useInView(0.06);
  const { ref:mapRef,  inView:mapIn  } = useInView(0.06);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setFormState(s=>({...s,[e.target.name]:e.target.value}));

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --coral:#CD2C58; --rose:#E06B80; --sand:#FFC69D;
          --ink:#2a1018;   --muted:#7a4a55; --pale:#fff8f4;
        }
        .cu-wrap *, .cu-wrap *::before, .cu-wrap *::after { box-sizing:border-box; margin:0; padding:0; }

        /* ── keyframes ── */
        @keyframes petalDrift { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(180deg)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideL  { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideR  { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scrollPulse { 0%,100%{transform:scaleY(1);opacity:.5} 50%{transform:scaleY(.5);opacity:1} }

        /* ── Page ── */
        .cu-page { background:var(--pale); font-family:'DM Sans',sans-serif; position:relative; overflow:hidden; }

        /* ── Page blobs ── */
        .cu-blob { position:absolute; border-radius:50%; pointer-events:none; z-index:0; }

        /* ── Hero ── */
        .cu-hero {
          background:var(--ink); position:relative; overflow:hidden;
          padding:110px 40px 90px; text-align:center;
        }
        .cu-hero-noise {
          position:absolute; inset:0; pointer-events:none; z-index:0;
          background:
            radial-gradient(ellipse 70% 60% at 80% 30%,rgba(205,44,88,.14) 0%,transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 70%,rgba(255,198,157,.08) 0%,transparent 60%);
        }
        .cu-petal {
          position:absolute; border-radius:60% 40% 70% 30%/50% 60% 40% 50%;
          background:#E06B80; pointer-events:none; z-index:0;
          animation:petalDrift linear infinite;
        }
        .cu-hero-inner { position:relative; z-index:1; max-width:680px; margin:0 auto; }

        .cu-eyebrow {
          display:inline-flex; align-items:center; gap:12px;
          font-size:11px; letter-spacing:.20em; text-transform:uppercase;
          color:var(--sand); font-weight:500; margin-bottom:22px;
        }
        .cu-eyebrow-line { width:40px; height:1px; background:linear-gradient(90deg,var(--sand),transparent); flex-shrink:0; }
        .cu-eyebrow-line-r { background:linear-gradient(270deg,var(--sand),transparent); }

        .cu-hero-h1 {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(3rem,6vw,5.5rem); font-weight:300; line-height:1.06;
          color:#fff; margin-bottom:18px;
        }
        .cu-hero-h1 em { font-style:italic; color:var(--sand); }

        .cu-hero-sub {
          font-size:1rem; color:rgba(255,230,212,.65); font-weight:300;
          line-height:1.75; max-width:480px; margin:0 auto;
        }

        .cu-scroll-hint {
          margin-top:44px; display:flex; flex-direction:column; align-items:center; gap:8px;
          font-size:.65rem; letter-spacing:.16em; text-transform:uppercase; color:rgba(255,198,157,.38);
        }
        .cu-scroll-line {
          width:1px; height:36px;
          background:linear-gradient(to bottom,rgba(255,198,157,.50),transparent);
          animation:scrollPulse 2s ease-in-out infinite;
        }

        /* ── Body grid ── */
        .cu-body {
          max-width:1200px; margin:0 auto;
          padding:80px 40px 96px;
          display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start;
        }

        /* ── Section label ── */
        .cu-section-label {
          display:flex; align-items:center; gap:12px;
          font-size:11px; letter-spacing:.18em; text-transform:uppercase;
          color:var(--coral); font-weight:500; margin-bottom:20px;
        }
        .cu-section-label::before {
          content:''; display:block; width:36px; height:1px;
          background:linear-gradient(90deg,var(--coral),transparent);
        }

        /* ── Form col ── */
        .cu-form-col { opacity:0; }
        .cu-form-col.cu-in { animation:slideL 1s ease both; }

        .cu-form-heading {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(2rem,3.2vw,3.2rem); font-weight:300; line-height:1.1;
          color:var(--ink); margin-bottom:10px;
        }
        .cu-form-heading em { font-style:italic; color:var(--coral); }

        .cu-form-sub { font-size:.92rem; color:var(--muted); line-height:1.78; font-weight:300; margin-bottom:38px; }

        .cu-form { display:flex; flex-direction:column; gap:18px; }
        .cu-form-row { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        .cu-field { display:flex; flex-direction:column; gap:6px; }
        .cu-label { font-size:.70rem; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); font-weight:500; }

        .cu-input, .cu-select, .cu-textarea {
          padding:13px 16px;
          background:rgba(255,255,255,.75); backdrop-filter:blur(8px);
          border:1.5px solid rgba(224,107,128,.22); border-radius:12px;
          font-family:'DM Sans',sans-serif; font-size:.88rem; color:var(--ink);
          outline:none; width:100%;
          transition:border-color .25s, box-shadow .25s, background .25s;
        }
        .cu-input::placeholder, .cu-textarea::placeholder { color:rgba(122,74,85,.38); }
        .cu-input:focus, .cu-select:focus, .cu-textarea:focus {
          border-color:var(--rose); box-shadow:0 0 0 3px rgba(224,107,128,.12);
          background:rgba(255,255,255,.95);
        }
        .cu-select {
          cursor:pointer; appearance:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23E06B80' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat:no-repeat; background-position:right 14px center; padding-right:36px;
        }
        .cu-textarea { resize:vertical; min-height:110px; line-height:1.65; }

        .cu-submit {
          display:inline-flex; align-items:center; gap:12px;
          background:var(--coral); color:#fff; padding:15px 36px; border-radius:100px;
          border:none; cursor:pointer; font-family:'DM Sans',sans-serif;
          font-size:.9rem; font-weight:500; letter-spacing:.05em;
          box-shadow:0 8px 28px rgba(205,44,88,.30);
          transition:background .22s,transform .22s,box-shadow .22s; align-self:flex-start;
          -webkit-tap-highlight-color:transparent; touch-action:manipulation;
        }
        @media (hover:hover) {
          .cu-submit:hover { background:#b82350; transform:translateY(-2px); box-shadow:0 14px 36px rgba(205,44,88,.42); }
          .cu-submit:hover .cu-submit-arrow { transform:translateX(5px); }
        }
        .cu-submit-arrow { transition:transform .22s; }

        .cu-success {
          padding:40px 32px; background:rgba(205,44,88,.05);
          border:1px solid rgba(205,44,88,.20); border-radius:20px;
          text-align:center; animation:fadeUp .6s ease both;
        }
        .cu-success-icon { font-size:2.5rem; margin-bottom:14px; }
        .cu-success-title { font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:400; color:var(--ink); margin-bottom:10px; }
        .cu-success-body  { font-size:.92rem; color:var(--muted); font-weight:300; line-height:1.7; }

        /* ── Info col ── */
        .cu-info-col { opacity:0; display:flex; flex-direction:column; gap:32px; }
        .cu-info-col.cu-in { animation:slideR 1s ease .2s both; }

        /* Detail cards */
        .cu-detail-cards { display:flex; flex-direction:column; gap:14px; }
        .cu-detail-card {
          display:flex; align-items:flex-start; gap:16px; padding:18px 20px;
          background:rgba(255,255,255,.70); backdrop-filter:blur(10px);
          border:1px solid rgba(224,107,128,.18); border-radius:18px;
          text-decoration:none;
          transition:background .25s,border-color .25s,transform .25s;
        }
        @media (hover:hover) {
          .cu-detail-card:hover { background:rgba(255,255,255,.92); border-color:rgba(205,44,88,.28); transform:translateX(6px); }
        }
        .cu-detail-icon {
          width:44px; height:44px; flex-shrink:0; border-radius:14px;
          background:linear-gradient(135deg,rgba(205,44,88,.10),rgba(255,198,157,.20));
          border:1px solid rgba(205,44,88,.16);
          display:flex; align-items:center; justify-content:center; font-size:1.2rem;
        }
        .cu-detail-text { display:flex; flex-direction:column; gap:2px; }
        .cu-detail-lbl { font-size:.62rem; letter-spacing:.14em; text-transform:uppercase; color:var(--rose); font-weight:500; }
        .cu-detail-val { font-size:.88rem; color:var(--ink); font-weight:400; line-height:1.5; }

        /* Social */
        .cu-social-cards { display:flex; flex-direction:column; gap:12px; }
        .cu-social-card {
          display:flex; align-items:center; gap:16px; padding:16px 20px;
          border-radius:16px; border:1px solid; text-decoration:none;
          transition:transform .22s, box-shadow .22s;
          -webkit-tap-highlight-color:transparent;
        }
        @media (hover:hover) {
          .cu-social-card:hover { transform:translateY(-2px); box-shadow:0 10px 32px rgba(0,0,0,.08); }
          .cu-social-card:hover .cu-social-arrow { transform:translateX(4px); opacity:.80; }
        }
        .cu-social-icon { width:42px; height:42px; flex-shrink:0; border-radius:12px; display:flex; align-items:center; justify-content:center; }
        .cu-social-info { display:flex; flex-direction:column; gap:2px; }
        .cu-social-name   { font-size:.88rem; font-weight:500; color:var(--ink); }
        .cu-social-handle { font-size:.78rem; color:var(--muted); font-weight:300; }
        .cu-social-arrow  { margin-left:auto; font-size:1rem; transition:transform .22s; opacity:.40; }

        /* ── Map ── */
        .cu-map-section {
          max-width:1200px; margin:0 auto; padding:0 40px 96px;
          opacity:0;
        }
        .cu-map-section.cu-in { animation:slideUp .9s ease both; }

        .cu-map-header {
          display:flex; align-items:flex-end; justify-content:space-between;
          flex-wrap:wrap; gap:16px; margin-bottom:24px;
        }
        .cu-map-title {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(1.8rem,3vw,2.8rem); font-weight:300; color:var(--ink); line-height:1.1;
        }
        .cu-map-title em { font-style:italic; color:var(--coral); }

        .cu-map-btn {
          display:inline-flex; align-items:center; gap:10px;
          background:var(--coral); color:#fff; padding:12px 24px; border-radius:100px;
          text-decoration:none; font-family:'DM Sans',sans-serif; font-size:.82rem; font-weight:500;
          letter-spacing:.04em; box-shadow:0 6px 22px rgba(205,44,88,.28);
          transition:background .22s,transform .22s; -webkit-tap-highlight-color:transparent;
        }
        @media (hover:hover) { .cu-map-btn:hover { background:#b82350; transform:translateY(-2px); } }

        .cu-map-frame {
          width:100%; height:420px; border-radius:24px; overflow:hidden;
          border:1px solid rgba(224,107,128,.18);
          box-shadow:0 20px 64px rgba(42,16,24,.10),0 4px 16px rgba(205,44,88,.08);
          position:relative;
        }
        .cu-map-frame iframe { width:100%; height:100%; border:none; display:block; }
        .cu-map-overlay {
          position:absolute; bottom:20px; left:20px; z-index:2;
          background:rgba(255,255,255,.92); backdrop-filter:blur(12px);
          border-radius:16px; padding:14px 18px;
          border:1px solid rgba(224,107,128,.18); box-shadow:0 8px 28px rgba(42,16,24,.10);
          max-width:280px;
        }
        .cu-map-overlay-name { font-family:'Cormorant Garamond',serif; font-size:1rem; font-weight:600; color:var(--coral); margin-bottom:4px; }
        .cu-map-overlay-addr { font-size:.76rem; color:var(--muted); line-height:1.6; font-weight:300; }

        /* ══════════════════════════════════
           TABLET  768px – 1023px
        ══════════════════════════════════ */
        @media (min-width:768px) and (max-width:1023px) {
          .cu-hero   { padding:80px 32px 68px; }
          .cu-hero-h1 { font-size:clamp(2.6rem,5.5vw,4rem); }
          .cu-hero-sub { font-size:.95rem; }

          /* Stack the form + info vertically */
          .cu-body {
            grid-template-columns:1fr;
            gap:48px;
            padding:60px 32px 72px;
          }
          /* Remove slide transforms on tablet — avoid invisible content */
          .cu-form-col.cu-in { animation:fadeUp .9s ease both; }
          .cu-info-col.cu-in { animation:fadeUp .9s ease .15s both; }

          /* Info: 2-col detail cards on tablet */
          .cu-detail-cards { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

          /* Social: side-by-side */
          .cu-social-cards { flex-direction:row; gap:12px; }
          .cu-social-card   { flex:1; }

          .cu-map-section { padding:0 32px 72px; }
          .cu-map-frame   { height:360px; }
        }

        /* ══════════════════════════════════
           MOBILE  ≤767px
        ══════════════════════════════════ */
        @media (max-width:767px) {
          /* ── Hero ── */
          .cu-hero        { padding:56px 20px 52px; text-align:left; }
          .cu-hero-inner  { max-width:100%; }
          .cu-eyebrow     { justify-content:flex-start; }
          .cu-hero-h1     { font-size:clamp(2.2rem,9vw,3rem); text-align:left; }
          .cu-hero-sub    { text-align:left; margin:0; font-size:.88rem; max-width:100%; }
          .cu-scroll-hint { display:none; } /* clean on mobile — saves vertical space */

          /* ── Body ── */
          .cu-body {
            grid-template-columns:1fr;
            gap:40px;
            padding:48px 18px 56px;
          }
          .cu-form-col.cu-in { animation:fadeUp .8s ease both; }
          .cu-info-col.cu-in { animation:fadeUp .8s ease .1s both; }

          .cu-form-sub  { font-size:.875rem; margin-bottom:28px; }
          .cu-form-row  { grid-template-columns:1fr; gap:14px; }

          /* Inputs: larger tap area */
          .cu-input, .cu-select, .cu-textarea { padding:15px 16px; font-size:.9rem; border-radius:14px; }
          .cu-textarea { min-height:90px; }

          /* Submit: full-width on mobile */
          .cu-submit {
            width:100%; justify-content:center;
            border-radius:14px; padding:16px 24px; font-size:.9rem;
          }

          /* Detail cards: single col */
          .cu-detail-cards { gap:10px; }
          .cu-detail-card  { padding:14px 16px; border-radius:14px; }
          .cu-detail-icon  { width:38px; height:38px; border-radius:11px; font-size:1rem; }

          /* Social: stacked, full width */
          .cu-social-cards { flex-direction:column; gap:10px; }
          .cu-social-card  { padding:14px 16px; border-radius:14px; }

          /* Quick note */
          .cu-note { padding:16px 18px !important; border-radius:14px !important; }
          .cu-note p { font-size:.92rem !important; }

          /* Map */
          .cu-map-section { padding:0 18px 52px; }
          .cu-map-header  { flex-direction:column; align-items:flex-start; gap:14px; }
          .cu-map-btn     { width:100%; justify-content:center; border-radius:14px; padding:14px 20px; }
          .cu-map-frame   { height:260px; border-radius:18px; }
          .cu-map-overlay { display:none; } /* overlay covers too much on small map */
        }
      `}</style>

      <div className="cu-wrap cu-page">
        {/* Page ambient blobs */}
        <div className="cu-blob" style={{ width:500, height:500, background:"radial-gradient(circle,rgba(255,198,157,.12) 0%,transparent 70%)", top:"30%", right:-150, animation:"petalDrift 14s ease-in-out infinite alternate" }} />
        <div className="cu-blob" style={{ width:380, height:380, background:"radial-gradient(circle,rgba(205,44,88,.06) 0%,transparent 70%)", bottom:"10%", left:-100 }} />

        {/* ── Hero ── */}
        <div className="cu-hero" ref={heroRef}>
          <div className="cu-hero-noise" />
          {PETALS.map((p,i)=>(
            <div key={i} className="cu-petal" style={{ width:p.size, height:p.size, top:p.top, left:p.left, opacity:p.op, animationDuration:p.dur, animationDelay:p.delay }} />
          ))}
          <div className="cu-hero-inner">
            <div className={`cu-eyebrow ${heroIn?"cu-in":""}`} style={heroIn?{animation:"fadeUp .8s ease both"}:{}}>
              <div className="cu-eyebrow-line" />
              Get in Touch
              <div className="cu-eyebrow-line cu-eyebrow-line-r" />
            </div>
            <h1 className="cu-hero-h1" style={heroIn?{animation:"fadeUp .9s ease .15s both",opacity:1}:{opacity:0}}>
              Let's create<br />something <em>together</em>
            </h1>
            <p className="cu-hero-sub" style={heroIn?{animation:"fadeUp .9s ease .28s both",opacity:1}:{opacity:0}}>
              Reach out to Suman Jain for classes, services, or just to say hello. Kalasrijan's doors are always open.
            </p>
            <div className="cu-scroll-hint" style={heroIn?{animation:"fadeUp .9s ease .42s both",opacity:1}:{opacity:0}}>
              <div className="cu-scroll-line" />
              <span>Scroll</span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="cu-body">

          {/* LEFT: Form */}
          <div ref={formRef} className={`cu-form-col ${formIn?"cu-in":""}`}>
            <div className="cu-section-label">Send a Message</div>
            <h2 className="cu-form-heading">We'd love to<br /><em>hear from you</em></h2>
            <p className="cu-form-sub">Fill in your details and we'll get back to you promptly.</p>

            {submitted ? (
              <div className="cu-success">
                <div className="cu-success-icon">🎨</div>
                <div className="cu-success-title">Message Received!</div>
                <p className="cu-success-body">Suman Jain will get back to you very soon. Meanwhile, explore our classes and let your creativity flow.</p>
              </div>
            ) : (
              <form className="cu-form" onSubmit={handleSubmit}>
                <div className="cu-form-row">
                  <div className="cu-field">
                    <label className="cu-label" htmlFor="name">Your Name *</label>
                    <input id="name" name="name" type="text" className="cu-input" placeholder="e.g. Priya Sharma" value={formState.name} onChange={handleChange} required />
                  </div>
                  <div className="cu-field">
                    <label className="cu-label" htmlFor="email">Email Address *</label>
                    <input id="email" name="email" type="email" className="cu-input" placeholder="you@example.com" value={formState.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className="cu-form-row">
                  <div className="cu-field">
                    <label className="cu-label" htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" className="cu-input" placeholder="+91 XXXXX XXXXX" value={formState.phone} onChange={handleChange} />
                  </div>
                  <div className="cu-field">
                    <label className="cu-label" htmlFor="interest">I'm Interested In *</label>
                    <select id="interest" name="interest" className="cu-select" value={formState.interest} onChange={handleChange} required>
                      <option value="">Select a class or service…</option>
                      {INTERESTS.map(opt=><option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>

                <div className="cu-field">
                  <label className="cu-label" htmlFor="message">Your Message</label>
                  <textarea id="message" name="message" className="cu-textarea" placeholder="Tell us about your goals…" value={formState.message} onChange={handleChange} />
                </div>

                <button type="submit" className="cu-submit">
                  Send Message <span className="cu-submit-arrow">→</span>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Info */}
          <div className={`cu-info-col ${formIn?"cu-in":""}`}>
            <div>
              <div className="cu-section-label">Contact Details</div>
              <div className="cu-detail-cards">
                {DETAIL_CARDS.map((d,i)=>(
                  d.href ? (
                    <a key={i} href={d.href} className="cu-detail-card" target={d.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer">
                      <div className="cu-detail-icon">{d.icon}</div>
                      <div className="cu-detail-text">
                        <span className="cu-detail-lbl">{d.label}</span>
                        <span className="cu-detail-val" style={{whiteSpace:"pre-line"}}>{d.value}</span>
                      </div>
                    </a>
                  ) : (
                    <div key={i} className="cu-detail-card" style={{cursor:"default"}}>
                      <div className="cu-detail-icon">{d.icon}</div>
                      <div className="cu-detail-text">
                        <span className="cu-detail-lbl">{d.label}</span>
                        <span className="cu-detail-val" style={{whiteSpace:"pre-line"}}>{d.value}</span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            <div>
              <div className="cu-section-label">Connect Online</div>
              <div className="cu-social-cards">
                {SOCIAL_LINKS.map(s=>(
                  <a key={s.label} href={s.href} className="cu-social-card" target="_blank" rel="noopener noreferrer" style={{background:s.bg,borderColor:s.border}}>
                    <div className="cu-social-icon" style={{background:s.bg,color:s.color}}>{s.icon}</div>
                    <div className="cu-social-info">
                      <span className="cu-social-name">{s.label}</span>
                      <span className="cu-social-handle">{s.handle}</span>
                    </div>
                    <span className="cu-social-arrow">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="cu-note" style={{padding:"20px 22px",background:"rgba(205,44,88,.05)",border:"1px solid rgba(205,44,88,.14)",borderRadius:18}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontStyle:"italic",fontSize:"1.05rem",color:"var(--muted)",lineHeight:1.7}}>
                "Every great creation starts with a single message. Don't hesitate — Suman is always happy to guide you."
              </p>
            </div>
          </div>
        </div>

        {/* ── Map ── */}
        <div ref={mapRef} className={`cu-map-section ${mapIn?"cu-in":""}`}>
          <div className="cu-map-header">
            <h2 className="cu-map-title">Find our <em>Studio</em></h2>
            <a href="https://maps.app.goo.gl/j6s6BdEftSDJV2hc8" target="_blank" rel="noopener noreferrer" className="cu-map-btn">
              📍 Get Directions →
            </a>
          </div>
          <div className="cu-map-frame">
            <iframe
              title="Kalasrijan Studio Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.023!2d75.8577!3d26.8530!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zKA!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin&q=Kalathali+A-21+Van+vihar+colony+opp+Kamal+n+company+Tonk+road+Jaipur+302018"
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="cu-map-overlay">
              <div className="cu-map-overlay-name">🎨 Kalasrijan Studio</div>
              <div className="cu-map-overlay-addr">Kalathali A-21, Van Vihar Colony,{"\n"}Opp. Kamal N Company, Tonk Road,{"\n"}Jaipur – 302018</div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}