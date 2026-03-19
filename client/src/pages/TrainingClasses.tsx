"use client";

import { useEffect, useRef, useState } from "react";
import SmartImage from "../utils/SmartImage";

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */
const CATEGORIES = ["All", "Painting", "Craft", "Stitching", "Cultural", "Wellness", "Drawing"];

const COURSES = [
  {
    id: 1,
    idSlug: "painting",
    title: "Painting Classes",
    subtitle: "8 styles from Oil to Freehand",
    category: "Painting",
    level: "All Ages",
    duration: "25 classes · 1–6 months",
    fee: "₹3,000 (Kids) · ₹5,000 (Adults)",
    feeShort: "From ₹3,000",
    icon: "🎨",
    tag: "Most Popular",
    tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916624/painting_dtkwer.png",
    desc: "Step-by-step painting across 8 styles — oil, fabric, kajal, watercolor, acrylic, texture, block & freehand. For every age and skill level.",
    curriculum: [
      { step: "Oil Painting on Canvas", detail: "Rich layering, color blending & shading on canvas." },
      { step: "Fabric Painting", detail: "Patterns on sarees, suits, dupattas using fabric colors." },
      { step: "Kajal Painting", detail: "Elegant black & white artwork using kohl as medium." },
      { step: "Watercolor Painting", detail: "Soft, transparent, fluid brush-control techniques." },
      { step: "Acrylic Painting", detail: "Vibrant bold expressions with fast-drying acrylic." },
      { step: "Texture Painting", detail: "3D artistic effects using pastes, tools & layered colors." },
      { step: "Block Painting", detail: "Traditional carved wooden block pattern printing." },
      { step: "Freehand Painting", detail: "Imagination-led creativity and original expression." },
    ],
  },
  {
    id: 2,
    idSlug: "stitching",
    title: "Stitching Courses",
    subtitle: "Diploma in Garment Making",
    category: "Stitching",
    level: "Beginner–Advanced",
    duration: "60 classes per diploma",
    fee: "₹15,000 per diploma",
    feeShort: "₹15,000",
    icon: "🧵",
    tag: "Diploma",
    tagColor: "#E06B80",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916631/stiching_k7vehn.png",
    desc: "Three focused diplomas — Kids' Garments, Young Girl Garments, and Ladies' Garments — from measurements and patterns to professional finishing.",
    curriculum: [
      { step: "Diploma in Kids' Garments", detail: "Design & stitch children's clothing with precise measurements." },
      { step: "Diploma in Young Girl Garments", detail: "Stylish, comfortable garments with advanced techniques." },
      { step: "Diploma in Ladies' Garments", detail: "Professional ladies' garment design & stitching mastery." },
    ],
  },
  {
    id: 3,
    idSlug: "clay",
    title: "Clay Modeling Craft",
    subtitle: "Decorative sculpture & 3D art",
    category: "Craft",
    level: "Beginner",
    duration: "5–25 days",
    fee: "₹5,000",
    feeShort: "₹5,000",
    icon: "🏺",
    tag: "Hands-on",
    tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916624/clay_abqanx.png",
    desc: "Create beautiful decorative items and artistic pieces using clay. Enhances hand coordination, patience, and artistic imagination.",
    curriculum: [
      { step: "Clay Basics & Tools", detail: "Introduction to clay types, tools, and preparation." },
      { step: "Hand Building Techniques", detail: "Pinching, coiling, and slab methods for shapes." },
      { step: "Decorative Items", detail: "Create functional and ornamental clay pieces." },
      { step: "Surface Detailing", detail: "Textures, patterns, and finishing touches." },
      { step: "Coloring & Sealing", detail: "Painting and sealing clay for durability." },
    ],
  },
  {
    id: 4,
    idSlug: "paper",
    title: "Paper Craft Classes",
    subtitle: "Bags, Origami, 3D Art & Flowers",
    category: "Craft",
    level: "All Levels",
    duration: "7 days per module",
    fee: "₹2,000 per module",
    feeShort: "₹2,000 / module",
    icon: "📄",
    tag: "4 Modules",
    tagColor: "#E06B80",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916626/paper_craft_gh2vmz.png",
    desc: "Four 7-day modules covering paper bag making, 3D origami statues, 3D art effects, and beautiful flower making using colorful papers.",
    curriculum: [
      { step: "Bag Making", detail: "Stylish handmade paper bags — cuts, folds & handles." },
      { step: "3D Statues & Origami", detail: "Origami fundamentals and 3D paper sculptures." },
      { step: "3D Art Effects", detail: "Layered paper techniques for three-dimensional art." },
      { step: "Flower Making", detail: "Colorful paper flowers for décor and gifting." },
    ],
  },
  {
    id: 5,
    idSlug: "calligraphy",
    title: "Calligraphy Courses",
    subtitle: "Hindi & English · 30 fonts",
    category: "Drawing",
    level: "Basic to Professional",
    duration: "Flexible",
    fee: "₹3,000–₹7,000",
    feeShort: "From ₹3,000",
    icon: "✍️",
    tag: "30 Fonts",
    tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916624/caligraphy_pcjmgs.png",
    desc: "Learn 30 different calligraphy fonts in Hindi and English — strokes, lettering styles, and creative writing from basic to professional level.",
    curriculum: [
      { step: "Stroke Fundamentals", detail: "Basic pen holds, pressure, and stroke direction." },
      { step: "Hindi Calligraphy Fonts", detail: "15 Hindi fonts with authentic lettering styles." },
      { step: "English Calligraphy Fonts", detail: "15 English fonts from classic to modern." },
      { step: "Advanced Lettering", detail: "Composition, spacing, and decorative flourishes." },
      { step: "Professional Calligraphy", detail: "Portfolio creation and commissioned work skills." },
    ],
  },
  {
    id: 6,
    idSlug: "soap",
    title: "Herbal Soap Making",
    subtitle: "Natural skincare from scratch",
    category: "Wellness",
    level: "Beginner",
    duration: "3 days",
    fee: "₹2,000",
    feeShort: "₹2,000",
    icon: "🌿",
    tag: "Natural",
    tagColor: "#7a9b5a",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916625/herbal_soap_yabv5d.png",
    desc: "Learn to make natural soaps using herbal ingredients. Ideal for those interested in handmade products and natural skincare.",
    curriculum: [
      { step: "Ingredients & Safety", detail: "Herbal oils, lye handling, and safety protocols." },
      { step: "Cold Process Method", detail: "Measuring, mixing, and pouring techniques." },
      { step: "Adding Herbs & Scents", detail: "Botanicals, essential oils, and natural colourants." },
    ],
  },
  {
    id: 7,
    idSlug: "resin",
    title: "Resin Art",
    subtitle: "Epoxy art · Coasters & Wall Art",
    category: "Craft",
    level: "Beginner",
    duration: "2 days",
    fee: "₹1,500 (Material Excl.)",
    feeShort: "₹1,500",
    icon: "💎",
    tag: "Trending",
    tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916630/resin_art_f3zh20.png",
    desc: "Create glossy, beautiful decorative pieces using epoxy resin — coasters, trays, wall art, name plates and more.",
    curriculum: [
      { step: "Resin Basics & Safety", detail: "Epoxy types, mixing ratios, and PPE essentials." },
      { step: "Colour Pigments & Effects", detail: "Adding pigments, alcohol inks, and metallic powders." },
      { step: "Coasters & Trays", detail: "Pouring, layering, and curing flat pieces." },
      { step: "3D & Wall Art", detail: "Bezels, moulds, and wall-hanging resin art." },
    ],
  },
  {
    id: 8,
    idSlug: "candle",
    title: "Candle Making",
    subtitle: "Scented candles · All colours",
    category: "Wellness",
    level: "Beginner",
    duration: "2 days",
    fee: "₹2,000",
    feeShort: "₹2,000",
    icon: "🕯️",
    tag: "Aromatic",
    tagColor: "#E06B80",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916622/candle_making_kwavgn.jpg",
    desc: "Learn to make beautifully scented candles in different colours, shapes, and sizes. Perfect for gifting and home décor.",
    curriculum: [
      { step: "Wax Types & Wicks", detail: "Soy, paraffin, beeswax and wick selection." },
      { step: "Fragrance & Colour", detail: "Scent blending, dye mixing, and safe additives." },
      { step: "Pouring & Setting", detail: "Temperature control, containers, and curing." },
    ],
  },
  {
    id: 9,
    idSlug: "rangoli",
    title: "Portable Rangoli",
    subtitle: "Basic to Advanced · Indian Art",
    category: "Cultural",
    level: "All Levels",
    duration: "2 days",
    fee: "₹2,000",
    feeShort: "₹2,000",
    icon: "🌸",
    tag: "Cultural",
    tagColor: "#E06B80",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916630/portable_rangoli_l12awu.png",
    desc: "Learn Rangoli from basic outlines to advanced patterns — symmetry, color blending, and traditional Indian designs for all occasions.",
    curriculum: [
      { step: "Basic Outline Drawing", detail: "Grid, dots, and free-hand outline techniques." },
      { step: "Symmetry & Geometry", detail: "Mirror symmetry, radial patterns, and geometric grids." },
      { step: "Colour Blending", detail: "Dry and wet colour application and gradient fills." },
      { step: "Advanced Patterns", detail: "Festival-specific and intricate decorative designs." },
    ],
  },
  {
    id: 10,
    idSlug: "lippan",
    title: "Lippan Art Workshop",
    subtitle: "Mud & Mirror · Gujarat Heritage",
    category: "Cultural",
    level: "Beginner",
    duration: "2–3 days",
    fee: "₹2,000",
    feeShort: "₹2,000",
    icon: "🪞",
    tag: "Heritage",
    tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916625/lippon_art_wcfzrw.png",
    desc: "Discover Kutch Gujarat's ancient Lippan art — mud and mirror mosaic wall art with stunning geometric patterns and mirror inlays.",
    curriculum: [
      { step: "Introduction to Lippan", detail: "History of Kutch art and material overview." },
      { step: "Mud Preparation", detail: "Mixing clay, preparing the working surface." },
      { step: "Pattern Design", detail: "Traditional geometric motifs and layout planning." },
      { step: "Mirror Setting", detail: "Placing and pressing mirrors into mud designs." },
      { step: "Finishing & Sealing", detail: "Drying, touch-ups and surface sealing." },
    ],
  },
  {
    id: 11,
    idSlug: "drawing",
    title: "Let's Draw & Paint",
    subtitle: "Designer Package · 12 Levels",
    category: "Drawing",
    level: "Beginner to Advanced",
    duration: "12 levels × 25 sessions",
    fee: "₹3,000 per level",
    feeShort: "₹3,000 / level",
    icon: "✏️",
    tag: "Flagship",
    tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916624/hand_painting_ybvnlb.png",
    desc: "Suman's flagship 12-level program — from basic sketching to portfolio development. A complete artistic education for all skill levels.",
    curriculum: [
      { step: "Sketching Techniques", detail: "Lines, shapes, proportions, and basic forms." },
      { step: "Knowledge of Colours", detail: "Color theory, mixing, and thematic application." },
      { step: "Brush Holding & Strokes", detail: "Proper grip, varied strokes for control & finish." },
      { step: "Basic to Advanced Learning", detail: "12 structured progressive levels of skill." },
      { step: "Portfolio Development", detail: "Build an attractive portfolio and illustration skills." },
    ],
  },
];

/* ─────────────────────────────────────
   HOOK
───────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, inView: v };
}

/* ─────────────────────────────────────
   ACCORDION
───────────────────────────────────── */
function Accordion({ items }: { items: { step: string; detail: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="tc-acc">
      {items.map((item, i) => (
        <div key={i} className={`tc-acc-row ${open === i ? "tc-acc-open" : ""}`}>
          <button className="tc-acc-head" onClick={() => setOpen(open === i ? null : i)}>
            <span className="tc-acc-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="tc-acc-title">{item.step}</span>
            <span className="tc-acc-chevron">{open === i ? "−" : "+"}</span>
          </button>
          <div className="tc-acc-body">
            <p className="tc-acc-detail">{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────
   COURSE CARD
───────────────────────────────────── */
function CourseCard({ c, idx }: { c: typeof COURSES[0]; idx: number }) {
  const { ref, inView } = useInView(0.06);
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      ref={ref}
      id={c.idSlug}
      className={`tc-card ${inView ? "tc-card-in" : ""}`}
      style={{ "--d": `${(idx % 3) * 0.08}s` } as React.CSSProperties}
    >
      {/* Image area */}
      <div className="tc-card-img-wrap">
        <SmartImage src={c.img} loading="lazy"
  decoding="async" alt={c.title} className="tc-card-img" loading="lazy" />
        <div className="tc-card-img-overlay" />
        {/* Tag */}
        <div className="tc-card-tag" style={{ background: c.tagColor }}>
          {c.tag}
        </div>
        {/* Icon */}
        <div className="tc-card-icon-badge">{c.icon}</div>
      </div>

      {/* Body */}
      <div className="tc-card-body">
        <div className="tc-card-cat">{c.category}</div>
        <h3 className="tc-card-title">{c.title}</h3>
        <p className="tc-card-subtitle">{c.subtitle}</p>

        {/* Meta row */}
        <div className="tc-card-meta">
          <span className="tc-meta-pill">⏱ {c.duration}</span>
          <span className="tc-meta-pill">📊 {c.level}</span>
        </div>

        <p className="tc-card-desc">{c.desc}</p>

        {/* Curriculum toggle */}
        <details className="tc-details">
          <summary className="tc-details-summary">
            <span>View Curriculum</span>
            <span className="tc-details-arrow">↓</span>
          </summary>
          <div className="tc-details-body">
            <Accordion items={c.curriculum} />
          </div>
        </details>

        {/* Footer */}
        <div className="tc-card-footer">
          <div className="tc-card-price">
            <span className="tc-price-label">Course Fee</span>
            <span className="tc-price-val">{c.feeShort}</span>
          </div>
          <button className="tc-join-btn">
            Join Class →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   MAIN
───────────────────────────────────── */
export default function TrainingClasses() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { ref: headRef, inView: headIn } = useInView(0.06);

  const filtered = COURSES.filter((c) => {
    const matchCat = activeFilter === "All" || c.category === activeFilter;
    const matchSearch =
      search === "" ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --coral: #CD2C58;
          --rose:  #E06B80;
          --sand:  #FFC69D;
          --blush: #FFE6D4;
          --ink:   #2a1018;
          --muted: #7a4a55;
          --pale:  #fff8f4;
          --card-bg: #ffffff;
        }

        .tc-wrap * { box-sizing: border-box; margin: 0; padding: 0; }

        .tc-section {
          background: var(--pale);
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 96px 0 88px;
        }

        /* ambient */
        .tc-blob {
          position: absolute; border-radius: 50%; pointer-events: none; z-index: 0;
        }
        .tc-blob-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(255,198,157,0.16) 0%, transparent 65%);
          top: -140px; right: -160px;
          animation: tcBlob 14s ease-in-out infinite alternate;
        }
        .tc-blob-2 {
          width: 440px; height: 440px;
          background: radial-gradient(circle, rgba(205,44,88,0.07) 0%, transparent 65%);
          bottom: -80px; left: -100px;
          animation: tcBlob 11s ease-in-out infinite alternate;
        }
        @keyframes tcBlob { from{transform:translate(0,0)} to{transform:translate(22px,18px)} }

        .tc-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative; z-index: 1;
        }

        /* ── Header ── */
        .tc-head {
          text-align: center;
          margin-bottom: 64px;
          opacity: 0; transform: translateY(22px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .tc-head.tc-in { opacity: 1; transform: translateY(0); }

        .tc-eyebrow {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 11px; letter-spacing: 0.20em;
          text-transform: uppercase; color: var(--coral); font-weight: 500;
          margin-bottom: 18px;
        }
        .tc-eyebrow-line {
          width: 40px; height: 1px;
          background: linear-gradient(90deg, var(--coral), transparent);
        }
        .tc-eyebrow-line-r { background: linear-gradient(270deg, var(--coral), transparent); }

        .tc-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 5vw, 5rem);
          font-weight: 300; line-height: 1.06; color: var(--ink);
          margin-bottom: 14px;
        }
        .tc-heading em { font-style: italic; color: var(--coral); }

        .tc-head-sub {
          font-size: 1rem; color: var(--muted); font-weight: 300;
          max-width: 500px; margin: 0 auto; line-height: 1.75;
        }

        /* ── Search + Filter ── */
        .tc-controls {
          display: flex; flex-direction: column; align-items: center; gap: 20px;
          margin-bottom: 52px;
        }

        .tc-search-wrap {
          position: relative; width: 100%; max-width: 480px;
        }
        .tc-search-icon {
          position: absolute; left: 18px; top: 50%; transform: translateY(-50%);
          font-size: 0.9rem; color: var(--rose); pointer-events: none;
        }
        .tc-search {
          width: 100%; padding: 14px 20px 14px 46px;
          background: rgba(255,255,255,0.80);
          backdrop-filter: blur(10px);
          border: 1.5px solid rgba(224,107,128,0.22);
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; color: var(--ink);
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .tc-search::placeholder { color: rgba(122,74,85,0.45); }
        .tc-search:focus {
          border-color: var(--rose);
          box-shadow: 0 0 0 3px rgba(224,107,128,0.12);
        }

        .tc-filters {
          display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
        }
        .tc-filter-btn {
          padding: 8px 20px; border-radius: 100px;
          border: 1.5px solid rgba(205,44,88,0.22);
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.80rem; font-weight: 500;
          color: var(--muted); cursor: pointer;
          letter-spacing: 0.04em;
          transition: background 0.22s, border-color 0.22s, color 0.22s, transform 0.18s;
        }
        .tc-filter-btn:hover {
          background: rgba(205,44,88,0.06);
          border-color: var(--rose);
          color: var(--coral);
          transform: translateY(-1px);
        }
        .tc-filter-btn.tc-active {
          background: var(--coral);
          border-color: var(--coral);
          color: #fff;
          box-shadow: 0 4px 18px rgba(205,44,88,0.28);
        }

        /* ── Grid ── */
        .tc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        /* ── Card ── */
        .tc-card {
          background: var(--card-bg);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(42,16,24,0.07), 0 1px 4px rgba(205,44,88,0.05);
          border: 1px solid rgba(255,198,157,0.18);
          display: flex; flex-direction: column;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.75s ease var(--d), transform 0.75s ease var(--d), box-shadow 0.28s, border-color 0.28s;
        }
        .tc-card.tc-card-in { opacity: 1; transform: translateY(0); }
        .tc-card:hover {
          box-shadow: 0 20px 60px rgba(42,16,24,0.12), 0 4px 20px rgba(205,44,88,0.10);
          border-color: rgba(205,44,88,0.25);
          transform: translateY(-5px);
        }
        .tc-card:hover .tc-card-img { transform: scale(1.05); }

        /* Card image */
        .tc-card-img-wrap {
          position: relative; width: 100%;
          aspect-ratio: 16/10; overflow: hidden;
        }
        .tc-card-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.65s ease;
          display: block;
        }
        .tc-card-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(42,16,24,0.55) 100%);
        }
        .tc-card-tag {
          position: absolute; top: 14px; left: 14px;
          color: #fff; font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 4px 12px; border-radius: 100px;
        }
        .tc-card-icon-badge {
          position: absolute; bottom: 14px; right: 14px;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.90);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          box-shadow: 0 4px 14px rgba(42,16,24,0.12);
        }

        /* Card body */
        .tc-card-body {
          padding: 22px 22px 20px;
          display: flex; flex-direction: column; flex: 1;
        }
        .tc-card-cat {
          font-size: 0.65rem; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--rose); font-weight: 500;
          margin-bottom: 6px;
        }
        .tc-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.55rem; font-weight: 400; color: var(--ink); line-height: 1.1;
          margin-bottom: 4px;
        }
        .tc-card-subtitle {
          font-size: 0.78rem; color: var(--muted); margin-bottom: 14px;
          font-weight: 300; font-style: italic;
        }

        /* Meta pills */
        .tc-card-meta {
          display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px;
        }
        .tc-meta-pill {
          background: rgba(255,230,212,0.60);
          border: 1px solid rgba(224,107,128,0.18);
          border-radius: 100px; padding: 4px 12px;
          font-size: 0.72rem; color: var(--muted);
        }

        .tc-card-desc {
          font-size: 0.85rem; color: var(--muted); line-height: 1.78;
          font-weight: 300; margin-bottom: 18px; flex: 1;
        }

        /* Curriculum accordion trigger */
        .tc-details { margin-bottom: 18px; }
        .tc-details-summary {
          list-style: none;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 0.80rem; font-weight: 500;
          color: var(--coral); cursor: pointer;
          padding: 10px 14px;
          background: rgba(205,44,88,0.05);
          border: 1px solid rgba(205,44,88,0.15);
          border-radius: 10px;
          user-select: none;
          transition: background 0.2s;
        }
        .tc-details-summary:hover { background: rgba(205,44,88,0.09); }
        .tc-details-summary::-webkit-details-marker { display: none; }
        .tc-details-arrow { transition: transform 0.3s; }
        .tc-details[open] .tc-details-arrow { transform: rotate(180deg); }
        .tc-details-body { margin-top: 10px; }

        /* ── Accordion ── */
        .tc-acc { display: flex; flex-direction: column; gap: 6px; }
        .tc-acc-row {
          border: 1px solid rgba(224,107,128,0.15);
          border-radius: 10px; overflow: hidden;
          transition: border-color 0.25s;
        }
        .tc-acc-row.tc-acc-open { border-color: rgba(205,44,88,0.30); }
        .tc-acc-head {
          width: 100%; display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif; text-align: left;
          transition: background 0.2s;
        }
        .tc-acc-head:hover { background: rgba(255,230,212,0.40); }
        .tc-acc-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.85rem; font-weight: 600; color: var(--coral);
          flex-shrink: 0; opacity: 0.70;
        }
        .tc-acc-title { flex: 1; font-size: 0.82rem; color: var(--ink); font-weight: 400; }
        .tc-acc-chevron { font-size: 1rem; color: var(--rose); flex-shrink: 0; }
        .tc-acc-body {
          max-height: 0; overflow: hidden;
          transition: max-height 0.35s ease;
        }
        .tc-acc-open .tc-acc-body { max-height: 120px; }
        .tc-acc-detail {
          padding: 0 14px 12px 38px;
          font-size: 0.78rem; color: var(--muted); line-height: 1.7; font-weight: 300;
        }

        /* Card footer */
        .tc-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid rgba(255,198,157,0.30);
          gap: 12px;
        }
        .tc-card-price { display: flex; flex-direction: column; }
        .tc-price-label {
          font-size: 0.60rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--rose); font-weight: 500;
        }
        .tc-price-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 600; color: var(--coral); line-height: 1.2;
        }
        .tc-join-btn {
          background: var(--coral); color: #fff;
          padding: 10px 22px; border-radius: 100px; border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500; cursor: pointer;
          letter-spacing: 0.04em;
          box-shadow: 0 6px 20px rgba(205,44,88,0.28);
          transition: background 0.22s, transform 0.22s, box-shadow 0.22s;
          white-space: nowrap;
        }
        .tc-join-btn:hover {
          background: #b82350;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(205,44,88,0.38);
        }

        /* Empty state */
        .tc-empty {
          grid-column: 1/-1;
          text-align: center; padding: 72px 20px;
          color: var(--muted); font-style: italic;
          font-family: 'Cormorant Garamond', serif; font-size: 1.4rem;
        }

        /* Result count */
        .tc-result-count {
          text-align: center; margin-bottom: 28px;
          font-size: 0.80rem; color: var(--muted); letter-spacing: 0.06em;
        }
        .tc-result-count strong { color: var(--coral); }

        /* ── Responsive ── */
        @media (max-width: 1040px) {
          .tc-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .tc-section { padding: 72px 0 64px; }
          .tc-inner { padding: 0 18px; }
          .tc-grid { grid-template-columns: 1fr; gap: 22px; }
          .tc-heading { font-size: 2.4rem; }
          .tc-card:hover { transform: translateY(-2px); }
        }
      `}</style>

      <section className="tc-wrap tc-section" id = "training-classes">
        <div className="tc-blob tc-blob-1" />
        <div className="tc-blob tc-blob-2" />

        <div className="tc-inner">

          {/* Header */}
          <div ref={headRef} className={`tc-head ${headIn ? "tc-in" : ""}`}>
            <div className="tc-eyebrow">
              <div className="tc-eyebrow-line" />
              Training & Classes
              <div className="tc-eyebrow-line tc-eyebrow-line-r" />
            </div>
            <h2 className="tc-heading">
              Learn something <em>beautiful</em><br />today
            </h2>
            <p className="tc-head-sub">
              11 courses across painting, craft, culture, and wellness — guided step-by-step by Suman Jain.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="tc-controls">
            <div className="tc-search-wrap">
              <span className="tc-search-icon">🔍</span>
              <input
                className="tc-search"
                type="text"
                placeholder="Search a class or skill…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="tc-filters">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`tc-filter-btn ${activeFilter === cat ? "tc-active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <p className="tc-result-count">
            Showing <strong>{filtered.length}</strong> of {COURSES.length} classes
          </p>

          {/* Cards grid */}
          <div className="tc-grid">
            {filtered.length === 0 ? (
              <div className="tc-empty">No classes found — try a different filter.</div>
            ) : (
              filtered.map((c, idx) => <CourseCard key={c.id} c={c} idx={idx} />)
            )}
          </div>

        </div>
      </section>
    </>
  );
}