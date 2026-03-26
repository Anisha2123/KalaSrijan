"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import SmartImage from "../utils/SmartImage";
import { useLocation } from "react-router-dom";

/* ─────────────────────────────────────
   DATA
───────────────────────────────────── */
const CATEGORIES = ["All", "Painting", "Craft", "Stitching", "Cultural", "Wellness", "Drawing"];

const COURSES = [
  {
    id: 1, idSlug: "painting",
    title: "Painting Classes", subtitle: "8 styles from Oil to Freehand",
    category: "Painting", level: "All Ages",
    duration: "25 classes · 1–6 months", fee: "₹3,000 (Kids) · ₹5,000 (Adults)",
    feeShort: "From ₹3,000", icon: "🎨", tag: "Most Popular", tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916624/painting_dtkwer.png",
    desc: "Step-by-step painting across 8 styles — oil, fabric, kajal, watercolor, acrylic, texture, block & freehand.",
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
    id: 2, idSlug: "stitching",
    title: "Stitching Courses", subtitle: "Diploma in Garment Making",
    category: "Stitching", level: "Beginner–Advanced",
    duration: "60 classes per diploma", fee: "₹15,000 per diploma",
    feeShort: "₹15,000", icon: "🧵", tag: "Diploma", tagColor: "#E06B80",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916631/stiching_k7vehn.png",
    desc: "Three focused diplomas — Kids', Young Girl, and Ladies' Garments — from measurements to professional finishing.",
    curriculum: [
      { step: "Diploma in Kids' Garments", detail: "Design & stitch children's clothing with precise measurements." },
      { step: "Diploma in Young Girl Garments", detail: "Stylish, comfortable garments with advanced techniques." },
      { step: "Diploma in Ladies' Garments", detail: "Professional ladies' garment design & stitching mastery." },
    ],
  },
  {
    id: 3, idSlug: "clay",
    title: "Clay Modeling Craft", subtitle: "Decorative sculpture & 3D art",
    category: "Craft", level: "Beginner",
    duration: "5–25 days", fee: "₹5,000",
    feeShort: "₹5,000", icon: "🏺", tag: "Hands-on", tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916624/clay_abqanx.png",
    desc: "Create beautiful decorative items and artistic pieces using clay. Enhances hand coordination and artistic imagination.",
    curriculum: [
      { step: "Clay Basics & Tools", detail: "Introduction to clay types, tools, and preparation." },
      { step: "Hand Building Techniques", detail: "Pinching, coiling, and slab methods for shapes." },
      { step: "Decorative Items", detail: "Create functional and ornamental clay pieces." },
      { step: "Surface Detailing", detail: "Textures, patterns, and finishing touches." },
      { step: "Coloring & Sealing", detail: "Painting and sealing clay for durability." },
    ],
  },
  {
    id: 4, idSlug: "paper",
    title: "Paper Craft Classes", subtitle: "Bags, Origami, 3D Art & Flowers",
    category: "Craft", level: "All Levels",
    duration: "7 days per module", fee: "₹2,000 per module",
    feeShort: "₹2,000 / module", icon: "📄", tag: "4 Modules", tagColor: "#E06B80",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916626/paper_craft_gh2vmz.png",
    desc: "Four 7-day modules covering paper bag making, 3D origami statues, 3D art effects, and beautiful flower making.",
    curriculum: [
      { step: "Bag Making", detail: "Stylish handmade paper bags — cuts, folds & handles." },
      { step: "3D Statues & Origami", detail: "Origami fundamentals and 3D paper sculptures." },
      { step: "3D Art Effects", detail: "Layered paper techniques for three-dimensional art." },
      { step: "Flower Making", detail: "Colorful paper flowers for décor and gifting." },
    ],
  },
  {
    id: 5, idSlug: "calligraphy",
    title: "Calligraphy Courses", subtitle: "Hindi & English · 30 fonts",
    category: "Drawing", level: "Basic to Professional",
    duration: "Flexible", fee: "₹3,000–₹7,000",
    feeShort: "From ₹3,000", icon: "✍️", tag: "30 Fonts", tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916624/caligraphy_pcjmgs.png",
    desc: "Learn 30 different calligraphy fonts in Hindi and English — strokes, lettering styles, and creative writing.",
    curriculum: [
      { step: "Stroke Fundamentals", detail: "Basic pen holds, pressure, and stroke direction." },
      { step: "Hindi Calligraphy Fonts", detail: "15 Hindi fonts with authentic lettering styles." },
      { step: "English Calligraphy Fonts", detail: "15 English fonts from classic to modern." },
      { step: "Advanced Lettering", detail: "Composition, spacing, and decorative flourishes." },
      { step: "Professional Calligraphy", detail: "Portfolio creation and commissioned work skills." },
    ],
  },
  {
    id: 6, idSlug: "soap",
    title: "Herbal Soap Making", subtitle: "Natural skincare from scratch",
    category: "Wellness", level: "Beginner",
    duration: "3 days", fee: "₹2,000",
    feeShort: "₹2,000", icon: "🌿", tag: "Natural", tagColor: "#7a9b5a",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916625/herbal_soap_yabv5d.png",
    desc: "Learn to make natural soaps using herbal ingredients. Ideal for handmade products and natural skincare enthusiasts.",
    curriculum: [
      { step: "Ingredients & Safety", detail: "Herbal oils, lye handling, and safety protocols." },
      { step: "Cold Process Method", detail: "Measuring, mixing, and pouring techniques." },
      { step: "Adding Herbs & Scents", detail: "Botanicals, essential oils, and natural colourants." },
    ],
  },
  {
    id: 7, idSlug: "resin",
    title: "Resin Art", subtitle: "Epoxy art · Coasters & Wall Art",
    category: "Craft", level: "Beginner",
    duration: "2 days", fee: "₹1,500 (Material Excl.)",
    feeShort: "₹1,500", icon: "💎", tag: "Trending", tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916630/resin_art_f3zh20.png",
    desc: "Create glossy decorative pieces using epoxy resin — coasters, trays, wall art, name plates and more.",
    curriculum: [
      { step: "Resin Basics & Safety", detail: "Epoxy types, mixing ratios, and PPE essentials." },
      { step: "Colour Pigments & Effects", detail: "Adding pigments, alcohol inks, and metallic powders." },
      { step: "Coasters & Trays", detail: "Pouring, layering, and curing flat pieces." },
      { step: "3D & Wall Art", detail: "Bezels, moulds, and wall-hanging resin art." },
    ],
  },
  {
    id: 8, idSlug: "candle",
    title: "Candle Making", subtitle: "Scented candles · All colours",
    category: "Wellness", level: "Beginner",
    duration: "2 days", fee: "₹2,000",
    feeShort: "₹2,000", icon: "🕯️", tag: "Aromatic", tagColor: "#E06B80",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916622/candle_making_kwavgn.jpg",
    desc: "Learn to make beautifully scented candles in different colours, shapes, and sizes. Perfect for gifting and home décor.",
    curriculum: [
      { step: "Wax Types & Wicks", detail: "Soy, paraffin, beeswax and wick selection." },
      { step: "Fragrance & Colour", detail: "Scent blending, dye mixing, and safe additives." },
      { step: "Pouring & Setting", detail: "Temperature control, containers, and curing." },
    ],
  },
  {
    id: 9, idSlug: "rangoli",
    title: "Portable Rangoli", subtitle: "Basic to Advanced · Indian Art",
    category: "Cultural", level: "All Levels",
    duration: "2 days", fee: "₹2,000",
    feeShort: "₹2,000", icon: "🌸", tag: "Cultural", tagColor: "#E06B80",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916630/portable_rangoli_l12awu.png",
    desc: "Learn Rangoli from basic outlines to advanced patterns — symmetry, color blending, and traditional Indian designs.",
    curriculum: [
      { step: "Basic Outline Drawing", detail: "Grid, dots, and free-hand outline techniques." },
      { step: "Symmetry & Geometry", detail: "Mirror symmetry, radial patterns, and geometric grids." },
      { step: "Colour Blending", detail: "Dry and wet colour application and gradient fills." },
      { step: "Advanced Patterns", detail: "Festival-specific and intricate decorative designs." },
    ],
  },
  {
    id: 10, idSlug: "lippan",
    title: "Lippan Art Workshop", subtitle: "Mud & Mirror · Gujarat Heritage",
    category: "Cultural", level: "Beginner",
    duration: "2–3 days", fee: "₹2,000",
    feeShort: "₹2,000", icon: "🪞", tag: "Heritage", tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916625/lippon_art_wcfzrw.png",
    desc: "Discover Kutch Gujarat's ancient Lippan art — mud and mirror mosaic wall art with geometric patterns.",
    curriculum: [
      { step: "Introduction to Lippan", detail: "History of Kutch art and material overview." },
      { step: "Mud Preparation", detail: "Mixing clay, preparing the working surface." },
      { step: "Pattern Design", detail: "Traditional geometric motifs and layout planning." },
      { step: "Mirror Setting", detail: "Placing and pressing mirrors into mud designs." },
      { step: "Finishing & Sealing", detail: "Drying, touch-ups and surface sealing." },
    ],
  },
  {
    id: 11, idSlug: "drawing",
    title: "Let's Draw & Paint", subtitle: "Designer Package · 12 Levels",
    category: "Drawing", level: "Beginner to Advanced",
    duration: "12 levels × 25 sessions", fee: "₹3,000 per level",
    feeShort: "₹3,000 / level", icon: "✏️", tag: "Flagship", tagColor: "#CD2C58",
    img: "https://res.cloudinary.com/dpb3z1mfk/image/upload/f_auto,q_auto,dpr_auto,w_500,c_fill,g_auto/v1773916624/hand_painting_ybvnlb.png",
    desc: "Suman's flagship 12-level program — from basic sketching to portfolio development. A complete artistic education.",
    curriculum: [
      { step: "Sketching Techniques", detail: "Lines, shapes, proportions, and basic forms." },
      { step: "Knowledge of Colours", detail: "Color theory, mixing, and thematic application." },
      { step: "Brush Holding & Strokes", detail: "Proper grip, varied strokes for control & finish." },
      { step: "Basic to Advanced Learning", detail: "12 structured progressive levels of skill." },
      { step: "Portfolio Development", detail: "Build an attractive portfolio and illustration skills." },
    ],
  },
  {
  id: 3,
  idSlug: "cooking",
  title: "Cooking Classes",
  subtitle: "From Basics to Multi-Cuisine Mastery",
  category: "Cooking",
  level: "All Levels",
  duration: "Flexible batches · 1–3 months",
  fee: "₹4,000 – ₹12,000 (based on modules)",
  feeShort: "From ₹4,000",
  icon: "🍳",
  tag: "Trending",
  tagColor: "#E19184",
  img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&q=90&fit=crop",
  desc: "Comprehensive cooking program covering everyday meals, desserts, bakery, and global cuisines with hands-on learning.",
  curriculum: [
    { step: "Soups, Salads & Rice Recipes", detail: "Healthy soups, fresh salads, and everyday rice preparations." },
    { step: "Paratha & Naan", detail: "Traditional Indian breads with stuffing, layering & tandoor-style techniques." },
    { step: "Sweets, Raita & Desserts", detail: "Indian sweets, cooling raitas, and delicious dessert creations." },
    { step: "Vegetables & Main Course", detail: "Balanced meals with rich gravies and classic Indian dishes." },
    { step: "Snacks & Starters", detail: "Crispy, quick, and party-friendly snack recipes." },
    { step: "Food Preservation", detail: "Pickles, jams, and techniques to extend food shelf life." },
    { step: "Salad Decoration", detail: "Creative plating and decorative carving for presentation." },
    { step: "Mocktails & Sharbat", detail: "Refreshing non-alcoholic drinks and traditional beverages." },
    { step: "Ice Creams & Cakes", detail: "Homemade ice creams and soft, fluffy cakes." },
    { step: "Cookies & Baked Breads", detail: "Cookies, breads, buns, croissants, lavash, focaccia & baguette." },
    { step: "Pizza & Bakery Items", detail: "Pizza base, buns, and bakery-style products from scratch." },
    { step: "Chocolate & Pudding", detail: "Chocolate making and smooth pudding desserts." },
    { step: "Multi-Cuisine Cooking", detail: "Hands-on exposure to global cuisines." },
    { step: "Italian, Mexican & Lebanese", detail: "Popular international dishes with authentic flavors." },
    { step: "Chinese & Thai Cooking", detail: "Asian cuisine techniques, sauces, and stir-fry methods." },
  ],
}
];

type Course = typeof COURSES[0];

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
   CURRICULUM OVERLAY  (shared — unchanged)
───────────────────────────────────── */
function CurriculumOverlay({ course, onClose }: { course: Course; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [openStep, setOpenStep] = useState<number | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 320);
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  return createPortal(
    <div
      className={`tco-backdrop ${visible ? "tco-visible" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className={`tco-sheet ${visible ? "tco-sheet-up" : ""}`}>
        <div className="tco-pill" />
        <div className="tco-header">
          <div className="tco-header-left">
            <span className="tco-icon">{course.icon}</span>
            <div>
              <p className="tco-cat">{course.category}</p>
              <h3 className="tco-title">{course.title}</h3>
            </div>
          </div>
          <button className="tco-close" onClick={handleClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="tco-divider" />
        <div className="tco-scroll">
          <p className="tco-steps-label">{course.curriculum.length} modules</p>
          <div className="tco-steps">
            {course.curriculum.map((item, i) => (
              <div key={i} className={`tco-step ${openStep === i ? "tco-step-open" : ""}`} style={{ animationDelay: `${i * 0.045}s` }}>
                <button className="tco-step-head" onClick={() => setOpenStep(openStep === i ? null : i)}>
                  <span className="tco-step-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="tco-step-name">{item.step}</span>
                  <span className="tco-step-chevron">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2.5 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                <div className="tco-step-body">
                  <p className="tco-step-detail">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="tco-footer">
          <div className="tco-fee">
            <span className="tco-fee-label">Course Fee</span>
            <span className="tco-fee-val">{course.feeShort}</span>
          </div>
          <a href="tel:+918890448242" className="tco-cta" onClick={handleClose}>Enroll Now →</a>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ─────────────────────────────────────
   DESKTOP CARD  (3-col fixed-height — untouched)
───────────────────────────────────── */
function DesktopCard({ c, idx, onCurriculum }: { c: Course; idx: number; onCurriculum: (c: Course) => void }) {
  const { ref, inView } = useInView(0.06);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => { const y = el.getBoundingClientRect().top + window.pageYOffset - 85; window.scrollTo({ top: y, behavior: "smooth" }); }, 100);
    }
  }, [location]);

  return (
    <div ref={ref} id={c.idSlug}
      className={`tc-card ${inView ? "tc-card-in" : ""}`}
      style={{ "--d": `${(idx % 3) * 0.08}s` } as React.CSSProperties}
    >
      <div className="tc-img-wrap">
        <SmartImage src={c.img} alt={c.title} className="tc-img" />
        <div className="tc-img-scrim" />
        <span className="tc-tag" style={{ background: c.tagColor }}>{c.tag}</span>
        <span className="tc-icon-badge">{c.icon}</span>
      </div>
      <div className="tc-body">
        <div className="tc-cat">{c.category}</div>
        <h3 className="tc-title">{c.title}</h3>
        <p className="tc-subtitle">{c.subtitle}</p>
        <div className="tc-pills">
          <span className="tc-pill">⏱ {c.duration}</span>
          <span className="tc-pill">📊 {c.level}</span>
        </div>
        <p className="tc-desc">{c.desc}</p>
      </div>
      <div className="tc-footer">
        <div className="tc-price-block">
          <span className="tc-price-label">Fee</span>
          <span className="tc-price">{c.feeShort}</span>
        </div>
        <div className="tc-actions">
          <button className="tc-curr-btn" onClick={() => onCurriculum(c)}>Curriculum</button>
          <a href="tel:+918890448242" className="tc-join-btn">Join →</a>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   TABLET CARD  (horizontal — image left 38%, content right)
───────────────────────────────────── */
function TabletCard({ c, idx, onCurriculum }: { c: Course; idx: number; onCurriculum: (c: Course) => void }) {
  const { ref, inView } = useInView(0.05);

  return (
    <div ref={ref} id={`tab-${c.idSlug}`}
      className={`tbt-card ${inView ? "tbt-in" : ""}`}
      style={{ "--td": `${(idx % 2) * 0.07}s` } as React.CSSProperties}
    >
      {/* Image left */}
      <div className="tbt-img-col">
        <SmartImage src={c.img} alt={c.title} className="tbt-img" />
        <div className="tbt-img-scrim" />
        <span className="tbt-tag" style={{ background: c.tagColor }}>{c.tag}</span>
        <span className="tbt-icon">{c.icon}</span>
      </div>

      {/* Content right */}
      <div className="tbt-content">
        <div className="tbt-meta-top">
          <span className="tbt-cat">{c.category}</span>
          <span className="tbt-level">📊 {c.level}</span>
        </div>
        <h3 className="tbt-title">{c.title}</h3>
        <p className="tbt-subtitle">{c.subtitle}</p>
        <p className="tbt-desc">{c.desc}</p>
        <div className="tbt-dur">⏱ {c.duration}</div>
        <div className="tbt-footer">
          <div className="tbt-price-block">
            <span className="tbt-price-lbl">Course Fee</span>
            <span className="tbt-price">{c.feeShort}</span>
          </div>
          <div className="tbt-actions">
            <button className="tbt-curr-btn" onClick={() => onCurriculum(c)}>Curriculum</button>
            <a href="tel:+918890448242" className="tbt-join-btn">Join →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   MOBILE CARD  (portrait, 2-col, compact)
───────────────────────────────────── */
function MobileCard({ c, idx, onCurriculum }: { c: Course; idx: number; onCurriculum: (c: Course) => void }) {
  const { ref, inView } = useInView(0.04);

  return (
    <div ref={ref} id={`mob-${c.idSlug}`}
      className={`tmo-card ${inView ? "tmo-in" : ""}`}
      style={{ "--md": `${(idx % 2) * 0.06}s` } as React.CSSProperties}
    >
      {/* Image zone */}
      <div className="tmo-img-wrap">
        <SmartImage src={c.img} alt={c.title} className="tmo-img" />
        <div className="tmo-scrim" />
        <span className="tmo-tag" style={{ background: c.tagColor }}>{c.tag}</span>
        <span className="tmo-icon">{c.icon}</span>
      </div>
      {/* Content */}
      <div className="tmo-body">
        <div className="tmo-cat" >{c.category}</div>
        <h3 className="tmo-title">{c.title}</h3>
        <p className="tmo-sub">{c.subtitle}</p>
        <div className="tmo-dur">⏱ {c.duration}</div>
        <div className="tmo-footer">
          <span className="tmo-price">{c.feeShort}</span>
          <div className="tmo-btns">
            <button className="tmo-curr" onClick={() => onCurriculum(c)} title="View curriculum">≡</button>
            <a href="tel:+918890448242" className="tmo-join">Join</a>
          </div>
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
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const { ref: headRef, inView: headIn } = useInView(0.06);

  const filtered = COURSES.filter((c) => {
    const matchCat = activeFilter === "All" || c.category === activeFilter;
    const matchSearch = search === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase()) || c.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        :root {
          --coral:#CD2C58; --rose:#E06B80; --sand:#FFC69D;
          --blush:#FFE6D4; --ink:#2a1018; --muted:#7a4a55; --pale:#fff8f4;
        }
        .tc-wrap * { box-sizing:border-box; margin:0; padding:0; }

        /* ════════ SECTION ════════ */
        .tc-section {
          background:var(--pale); font-family:'DM Sans',sans-serif;
          padding:96px 0 88px; position:relative; overflow:hidden;
        }
        .tc-blob{position:absolute;border-radius:50%;pointer-events:none;z-index:0}
        .tc-blob-1{width:600px;height:600px;top:-140px;right:-160px;background:radial-gradient(circle,rgba(255,198,157,.16) 0%,transparent 65%);animation:tcBlob 14s ease-in-out infinite alternate}
        .tc-blob-2{width:440px;height:440px;bottom:-80px;left:-100px;background:radial-gradient(circle,rgba(205,44,88,.07) 0%,transparent 65%);animation:tcBlob 11s ease-in-out infinite alternate}
        @keyframes tcBlob{from{transform:translate(0,0)}to{transform:translate(22px,18px)}}
        .tc-inner{max-width:1240px;margin:0 auto;padding:0 40px;position:relative;z-index:1}

        /* ════════ HEADER ════════ */
        .tc-head{text-align:center;margin-bottom:64px;opacity:0;transform:translateY(22px);transition:opacity .9s ease,transform .9s ease}
        .tc-head.tc-in{opacity:1;transform:translateY(0)}
        .tc-eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:11px;letter-spacing:.20em;text-transform:uppercase;color:var(--coral);font-weight:500;margin-bottom:18px}
        .tc-eyebrow-line{width:40px;height:1px;background:linear-gradient(90deg,var(--coral),transparent)}
        .tc-eyebrow-line-r{background:linear-gradient(270deg,var(--coral),transparent)}
        .tc-heading{font-family:'Cormorant Garamond',serif;font-size:clamp(2.6rem,5vw,5rem);font-weight:300;line-height:1.06;color:var(--ink);margin-bottom:14px}
        .tc-heading em{font-style:italic;color:var(--coral)}
        .tc-head-sub{font-size:1rem;color:var(--muted);font-weight:300;max-width:500px;margin:0 auto;line-height:1.75}

        /* ════════ CONTROLS (desktop + tablet) ════════ */
        .tc-controls{display:flex;flex-direction:column;align-items:center;gap:20px;margin-bottom:52px}
        .tc-search-wrap{position:relative;width:100%;max-width:480px}
        .tc-search-icon{position:absolute;left:18px;top:50%;transform:translateY(-50%);font-size:.9rem;color:var(--rose);pointer-events:none}
        .tc-search{width:100%;padding:14px 20px 14px 46px;background:rgba(255,255,255,.80);backdrop-filter:blur(10px);border:1.5px solid rgba(224,107,128,.22);border-radius:100px;font-family:'DM Sans',sans-serif;font-size:.9rem;color:var(--ink);outline:none;transition:border-color .25s,box-shadow .25s}
        .tc-search::placeholder{color:rgba(122,74,85,.45)}
        .tc-search:focus{border-color:var(--rose);box-shadow:0 0 0 3px rgba(224,107,128,.12)}
        .tc-filters{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
        .tc-filter-btn{padding:8px 20px;border-radius:100px;border:1.5px solid rgba(205,44,88,.22);background:transparent;font-family:'DM Sans',sans-serif;font-size:.80rem;font-weight:500;color:var(--muted);cursor:pointer;letter-spacing:.04em;transition:background .22s,border-color .22s,color .22s,transform .18s}
        @media(hover:hover){.tc-filter-btn:hover{background:rgba(205,44,88,.06);border-color:var(--rose);color:var(--coral);transform:translateY(-1px)}}
        .tc-filter-btn.tc-active{background:var(--coral);border-color:var(--coral);color:#fff;box-shadow:0 4px 18px rgba(205,44,88,.28)}
        .tc-result-count{text-align:center;margin-bottom:28px;font-size:.80rem;color:var(--muted);letter-spacing:.06em}
        .tc-result-count strong{color:var(--coral)}

        /* ════════ DESKTOP GRID (≥1024px) ════════ */
        .tc-desktop-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}

        /* ── Desktop card (fixed 460px) ── */
        .tc-card{background:#fff;border-radius:20px;overflow:hidden;border:1px solid rgba(255,198,157,.20);box-shadow:0 2px 16px rgba(42,16,24,.06);display:flex;flex-direction:column;height:460px;opacity:0;transform:translateY(24px);transition:opacity .7s ease var(--d),transform .7s ease var(--d),box-shadow .25s,border-color .25s}
        .tc-card.tc-card-in{opacity:1;transform:translateY(0)}
        @media(hover:hover){.tc-card:hover{box-shadow:0 16px 48px rgba(42,16,24,.11),0 2px 12px rgba(205,44,88,.08);border-color:rgba(205,44,88,.22);transform:translateY(-4px)}.tc-card:hover .tc-img{transform:scale(1.04)}}
        .tc-img-wrap{position:relative;width:100%;height:175px;overflow:hidden;flex-shrink:0}
        .tc-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
        .tc-img-scrim{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 35%,rgba(42,16,24,.50))}
        .tc-tag{position:absolute;top:12px;left:12px;color:#fff;font-size:.60rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:3px 10px;border-radius:100px}
        .tc-icon-badge{position:absolute;bottom:12px;right:12px;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.92);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;font-size:.95rem;box-shadow:0 2px 10px rgba(42,16,24,.12)}
        .tc-body{padding:16px 18px 0;display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden}
        .tc-cat{font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;color:var(--rose);font-weight:500;margin-bottom:3px;flex-shrink:0}
        .tc-title{font-family:'Cormorant Garamond',serif;font-size:1.38rem;font-weight:400;color:var(--ink);line-height:1.1;margin-bottom:3px;flex-shrink:0}
        .tc-subtitle{font-size:.72rem;color:var(--muted);font-weight:300;font-style:italic;margin-bottom:10px;flex-shrink:0}
        .tc-pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;flex-shrink:0}
        .tc-pill{background:rgba(255,230,212,.55);border:1px solid rgba(224,107,128,.16);border-radius:100px;padding:3px 10px;font-size:.66rem;color:var(--muted)}
        .tc-desc{font-size:.81rem;color:var(--muted);line-height:1.72;font-weight:300;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
        .tc-footer{display:flex;align-items:center;justify-content:space-between;padding:13px 18px 15px;border-top:1px solid rgba(255,198,157,.28);flex-shrink:0;gap:10px;margin-top:auto;background:#fff}
        .tc-price-block{display:flex;flex-direction:column;gap:1px}
        .tc-price-label{font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--rose);font-weight:500}
        .tc-price{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:600;color:var(--coral);line-height:1.1}
        .tc-actions{display:flex;gap:8px;align-items:center}
        .tc-curr-btn{padding:7px 13px;border-radius:100px;border:1.5px solid rgba(205,44,88,.30);background:transparent;font-family:'DM Sans',sans-serif;font-size:.74rem;font-weight:500;color:var(--coral);cursor:pointer;white-space:nowrap;transition:background .2s,border-color .2s}
        @media(hover:hover){.tc-curr-btn:hover{background:rgba(205,44,88,.06);border-color:var(--coral)}}
        .tc-join-btn{padding:7px 16px;border-radius:100px;border:none;background:var(--coral);color:#fff;font-family:'DM Sans',sans-serif;font-size:.74rem;font-weight:500;cursor:pointer;box-shadow:0 4px 14px rgba(205,44,88,.26);transition:background .2s,transform .2s;white-space:nowrap;text-decoration:none;display:inline-block}
        @media(hover:hover){.tc-join-btn:hover{background:#b82350;transform:translateY(-1px)}}
        .tc-empty{grid-column:1/-1;text-align:center;padding:72px 20px;color:var(--muted);font-style:italic;font-family:'Cormorant Garamond',serif;font-size:1.4rem}

        /* ════════ TABLET CARDS (768–1023px) ════════
           Horizontal layout: image left, content right
        ════════════════════════════════════════════ */
        .tc-tablet-grid{display:none;flex-direction:column;gap:16px}
        .tbt-card{
          display:flex;flex-direction:row;
          background:#fff;border-radius:18px;overflow:hidden;
          border:1px solid rgba(255,198,157,.22);
          box-shadow:0 2px 14px rgba(42,16,24,.06);
          opacity:0;transform:translateY(18px);
          transition:opacity .65s ease var(--td),transform .65s ease var(--td),box-shadow .25s,border-color .25s;
          min-height:168px;
        }
        .tbt-card.tbt-in{opacity:1;transform:translateY(0)}
        @media(hover:hover){.tbt-card:hover{box-shadow:0 12px 36px rgba(42,16,24,.10),0 2px 10px rgba(205,44,88,.08);border-color:rgba(205,44,88,.20);transform:translateY(-3px)}.tbt-card:hover .tbt-img{transform:scale(1.05)}}

        /* Image column — fixed width, full height */
        .tbt-img-col{position:relative;width:200px;min-width:200px;overflow:hidden;flex-shrink:0}
        .tbt-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
        .tbt-img-scrim{position:absolute;inset:0;background:linear-gradient(to right,transparent 60%,rgba(42,16,24,.28))}
        .tbt-tag{position:absolute;top:10px;left:10px;color:#fff;font-size:.55rem;font-weight:600;letter-spacing:.10em;text-transform:uppercase;padding:3px 9px;border-radius:100px}
        .tbt-icon{position:absolute;bottom:10px;left:10px;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.90);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;font-size:.90rem;box-shadow:0 2px 8px rgba(42,16,24,.12)}

        /* Content column */
        .tbt-content{flex:1;padding:16px 18px;display:flex;flex-direction:column;min-width:0}
        .tbt-meta-top{display:flex;align-items:center;gap:10px;margin-bottom:6px}
        .tbt-cat{font-size:.58rem;letter-spacing:.15em;text-transform:uppercase;color:var(--rose);font-weight:500}
        .tbt-level{font-size:.60rem;color:var(--muted);background:rgba(255,230,212,.50);border:1px solid rgba(224,107,128,.16);border-radius:100px;padding:2px 8px}
        .tbt-title{font-family:'Cormorant Garamond',serif;font-size:1.28rem;font-weight:400;color:var(--ink);line-height:1.12;margin-bottom:2px}
        .tbt-subtitle{font-size:.68rem;color:var(--muted);font-weight:300;font-style:italic;margin-bottom:8px}
        .tbt-desc{font-size:.78rem;color:var(--muted);line-height:1.70;font-weight:300;flex:1;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:10px}
        .tbt-dur{font-size:.64rem;color:var(--muted);margin-bottom:10px;opacity:.80}
        .tbt-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
        .tbt-price-block{display:flex;flex-direction:column;gap:1px}
        .tbt-price-lbl{font-size:.55rem;letter-spacing:.12em;text-transform:uppercase;color:var(--rose);font-weight:500}
        .tbt-price{font-family:'Cormorant Garamond',serif;font-size:1.05rem;font-weight:600;color:var(--coral);line-height:1.1}
        .tbt-actions{display:flex;gap:7px;align-items:center}
        .tbt-curr-btn{padding:6px 12px;border-radius:100px;border:1.5px solid rgba(205,44,88,.28);background:transparent;font-family:'DM Sans',sans-serif;font-size:.70rem;font-weight:500;color:var(--coral);cursor:pointer;white-space:nowrap;transition:background .2s}
        @media(hover:hover){.tbt-curr-btn:hover{background:rgba(205,44,88,.06)}}
        .tbt-join-btn{padding:7px 15px;border-radius:100px;border:none;background:var(--coral);color:#fff;font-family:'DM Sans',sans-serif;font-size:.72rem;font-weight:500;text-decoration:none;display:inline-block;white-space:nowrap;box-shadow:0 4px 14px rgba(205,44,88,.24);transition:background .2s}
        @media(hover:hover){.tbt-join-btn:hover{background:#b82350}}

        /* ════════ MOBILE LAYOUT (≤767px) ════════
           Sticky filter strip + 2-col portrait cards
        ════════════════════════════════════════ */
        .tc-mob-controls{display:none;flex-direction:column;gap:10px;margin-bottom:20px}

        /* Search bar compact */
        .tc-mob-search-wrap{position:relative;width:100%}
        .tc-mob-search-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:.82rem;color:var(--rose);pointer-events:none}
        .tc-mob-search{width:100%;padding:12px 16px 12px 38px;background:rgba(255,255,255,.85);backdrop-filter:blur(10px);border:1.5px solid rgba(224,107,128,.22);border-radius:100px;font-family:'DM Sans',sans-serif;font-size:.85rem;color:var(--ink);outline:none;transition:border-color .25s,box-shadow .25s}
        .tc-mob-search::placeholder{color:rgba(122,74,85,.45)}
        .tc-mob-search:focus{border-color:var(--rose);box-shadow:0 0 0 3px rgba(224,107,128,.12)}

        /* Sticky filter strip */
        .tc-mob-filter-strip{
          display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;
          -webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;
        }
        .tc-mob-filter-strip::-webkit-scrollbar{display:none}
        .tc-mob-filter-strip{-ms-overflow-style:none;scrollbar-width:none}
        .tc-mob-chip{flex-shrink:0;scroll-snap-align:start;padding:7px 16px;border-radius:100px;border:1.5px solid rgba(205,44,88,.20);background:rgba(255,255,255,.70);backdrop-filter:blur(6px);font-family:'DM Sans',sans-serif;font-size:.72rem;font-weight:500;color:var(--muted);cursor:pointer;white-space:nowrap;-webkit-tap-highlight-color:transparent;transition:background .18s,border-color .18s,color .18s}
        .tc-mob-chip.tc-mob-chip-active{background:var(--coral);border-color:var(--coral);color:#fff;box-shadow:0 3px 12px rgba(205,44,88,.26)}

        /* Mobile count */
        .tc-mob-count{font-size:.72rem;color:var(--muted);letter-spacing:.06em;margin-bottom:14px}
        .tc-mob-count strong{color:var(--coral)}

        /* 2-column portrait grid */
        .tc-mobile-grid{display:none;grid-template-columns:repeat(2,1fr);gap:11px}
        .tmo-card{background:#fff;border-radius:16px;overflow:hidden;border:1px solid rgba(255,198,157,.22);box-shadow:0 2px 12px rgba(42,16,24,.06);display:flex;flex-direction:column;opacity:0;transform:translateY(16px);transition:opacity .55s ease var(--md),transform .55s ease var(--md)}
        .tmo-card.tmo-in{opacity:1;transform:translateY(0)}
        .tmo-card:active{transform:scale(.98);border-color:rgba(205,44,88,.24)}

        /* Image */
        .tmo-img-wrap{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;flex-shrink:0}
        .tmo-img{width:100%;height:100%;object-fit:cover;display:block}
        .tmo-scrim{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 30%,rgba(42,16,24,.55))}
        .tmo-tag{position:absolute;top:8px;left:8px;color:#fff;font-size:.50rem;font-weight:600;letter-spacing:.09em;text-transform:uppercase;padding:2px 8px;border-radius:100px}
        .tmo-icon{position:absolute;bottom:8px;right:8px;width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.90);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;font-size:.82rem;box-shadow:0 2px 8px rgba(42,16,24,.12)}

        /* Content */
        .tmo-body{padding:11px 12px 12px;display:flex;flex-direction:column;flex:1}
        .tmo-cat{font-size:.52rem;letter-spacing:.13em;text-transform:uppercase;color:var(--rose);font-weight:500;margin-bottom:2px}
        .tmo-title{font-family:'Cormorant Garamond',serif;font-size:1.02rem;font-weight:400;color:var(--ink);line-height:1.18;margin-bottom:2px}
        .tmo-sub{font-size:.62rem;color:var(--muted);font-weight:300;font-style:italic;margin-bottom:6px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .tmo-dur{font-size:.58rem;color:rgba(122,74,85,.60);margin-bottom:8px}
        .tmo-footer{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-top:auto;padding-top:8px;border-top:1px solid rgba(255,198,157,.28)}
        .tmo-price{font-family:'Cormorant Garamond',serif;font-size:.95rem;font-weight:600;color:var(--coral)}
        .tmo-btns{display:flex;gap:5px;align-items:center}
        .tmo-curr{width:28px;height:28px;border-radius:50%;border:1.5px solid rgba(205,44,88,.26);background:transparent;font-size:.80rem;color:var(--coral);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;-webkit-tap-highlight-color:transparent;transition:background .18s}
        .tmo-curr:active{background:rgba(205,44,88,.08)}
        .tmo-join{padding:6px 10px;border-radius:100px;border:none;background:var(--coral);color:#fff;font-family:'DM Sans',sans-serif;font-size:.66rem;font-weight:500;text-decoration:none;display:inline-block;white-space:nowrap;box-shadow:0 3px 10px rgba(205,44,88,.24);-webkit-tap-highlight-color:transparent}
        .tmo-join:active{background:#b82350}

        /* Mobile empty */
        .tmo-empty{grid-column:1/-1;text-align:center;padding:48px 16px;color:var(--muted);font-style:italic;font-family:'Cormorant Garamond',serif;font-size:1.2rem}

        /* ════════ OVERLAY (shared, unchanged) ════════ */
        .tco-backdrop{position:fixed;inset:0;z-index:9999;background:rgba(42,16,24,0);backdrop-filter:blur(0px);transition:background .32s ease,backdrop-filter .32s ease;display:flex;align-items:flex-end;justify-content:center;padding:0 16px}
        .tco-backdrop.tco-visible{background:rgba(42,16,24,.45);backdrop-filter:blur(5px)}
        .tco-sheet{width:100%;max-width:540px;background:#fff;border-radius:24px 24px 0 0;box-shadow:0 -8px 60px rgba(42,16,24,.18);transform:translateY(100%);transition:transform .32s cubic-bezier(.34,1.04,.64,1);max-height:70vh;display:flex;flex-direction:column}
        .tco-sheet.tco-sheet-up{transform:translateY(0)}
        .tco-pill{width:36px;height:4px;background:rgba(42,16,24,.10);border-radius:2px;margin:14px auto 0;flex-shrink:0}
        .tco-header{display:flex;align-items:center;justify-content:space-between;padding:16px 22px 0;flex-shrink:0}
        .tco-header-left{display:flex;align-items:center;gap:13px}
        .tco-icon{width:42px;height:42px;border-radius:12px;background:var(--blush);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
        .tco-cat{font-size:.60rem;letter-spacing:.14em;text-transform:uppercase;color:var(--rose);font-weight:500;margin-bottom:2px}
        .tco-title{font-family:'Cormorant Garamond',serif;font-size:1.28rem;font-weight:400;color:var(--ink);line-height:1.1}
        .tco-close{width:34px;height:34px;border-radius:50%;border:1px solid rgba(42,16,24,.10);background:rgba(42,16,24,.04);color:var(--muted);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:background .2s,color .2s}
        @media(hover:hover){.tco-close:hover{background:rgba(205,44,88,.08);color:var(--coral)}}
        .tco-divider{height:1px;background:rgba(255,198,157,.35);margin:14px 22px 0;flex-shrink:0}
        .tco-scroll{flex:1;overflow-y:auto;padding:14px 22px 0;scrollbar-width:thin;scrollbar-color:rgba(205,44,88,.20) transparent}
        .tco-scroll::-webkit-scrollbar{width:4px}
        .tco-scroll::-webkit-scrollbar-thumb{background:rgba(205,44,88,.20);border-radius:4px}
        .tco-steps-label{font-size:.68rem;letter-spacing:.10em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
        .tco-steps{display:flex;flex-direction:column;gap:6px;padding-bottom:4px}
        .tco-step{border:1px solid rgba(224,107,128,.14);border-radius:12px;overflow:hidden;animation:tcoIn .22s ease both;transition:border-color .2s}
        .tco-step.tco-step-open{border-color:rgba(205,44,88,.28)}
        @keyframes tcoIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .tco-step-head{width:100%;display:flex;align-items:center;gap:11px;padding:11px 14px;background:none;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;text-align:left;transition:background .18s}
        @media(hover:hover){.tco-step-head:hover{background:rgba(255,230,212,.35)}}
        .tco-step-num{font-family:'Cormorant Garamond',serif;font-size:.88rem;color:var(--coral);opacity:.65;flex-shrink:0}
        .tco-step-name{flex:1;font-size:.83rem;color:var(--ink);font-weight:400}
        .tco-step-chevron{color:var(--rose);flex-shrink:0;transition:transform .25s ease}
        .tco-step-open .tco-step-chevron{transform:rotate(180deg)}
        .tco-step-body{max-height:0;overflow:hidden;transition:max-height .28s ease}
        .tco-step-open .tco-step-body{max-height:80px}
        .tco-step-detail{padding:0 14px 11px 40px;font-size:.77rem;color:var(--muted);line-height:1.72;font-weight:300}
        .tco-footer{display:flex;align-items:center;justify-content:space-between;padding:14px 22px 20px;border-top:1px solid rgba(255,198,157,.30);flex-shrink:0;gap:12px;background:#fff}
        .tco-fee{display:flex;flex-direction:column;gap:2px}
        .tco-fee-label{font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--rose);font-weight:500}
        .tco-fee-val{font-family:'Cormorant Garamond',serif;font-size:1.28rem;font-weight:600;color:var(--coral)}
        .tco-cta{padding:10px 26px;border-radius:100px;border:none;background:var(--coral);color:#fff;font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:500;cursor:pointer;text-decoration:none;display:inline-block;box-shadow:0 6px 22px rgba(205,44,88,.30);transition:background .2s,transform .2s}
        @media(hover:hover){.tco-cta:hover{background:#b82350;transform:translateY(-1px)}}

        /* ════════ TABLET BREAKPOINT 768–1023px ════════ */
        @media (max-width: 1023px) {
          .tc-section  { padding: 72px 0 64px; }
          .tc-inner    { padding: 0 28px; }
          .tc-head     { margin-bottom: 48px; }
          .tc-heading  { font-size: clamp(2.2rem,4.5vw,3.4rem); }

          /* Show tablet grid, hide desktop + mobile */
          .tc-desktop-grid { display: none; }
          .tc-tablet-grid  { display: flex; }
          .tc-mob-controls { display: none; }
          .tc-mobile-grid  { display: none; }
          .tc-result-count { display: block; }
        }

        /* ════════ MOBILE BREAKPOINT ≤767px ════════ */
        @media (max-width: 767px) {
          .tc-section  { padding: 48px 0 44px; }
          .tc-inner    { padding: 0 14px; }

          /* Header compact */
          .tc-head     { margin-bottom: 28px; text-align: left; }
          .tc-eyebrow  { margin-bottom: 12px; }
          .tc-heading  { font-size: clamp(1.9rem,7vw,2.4rem); text-align: left; }
          .tc-head-sub { font-size: .88rem; text-align: left; margin: 0; }

          /* Show mobile, hide others */
          .tc-desktop-grid { display: none; }
          .tc-tablet-grid  { display: none; }
          .tc-controls     { display: none; }
          .tc-result-count { display: none; }
          .tc-mob-controls { display: flex; }
          .tc-mobile-grid  { display: grid; }

          /* Overlay full bottom sheet */
          .tco-sheet { max-height: 80vh; border-radius: 20px 20px 0 0; }
          .tco-backdrop { padding: 0; }
        }

        /* XS ≤399px */
        @media (max-width: 399px) {
          .tc-inner    { padding: 0 12px; }
          .tc-heading  { font-size: 1.8rem; }
          .tc-mobile-grid { gap: 9px; }
          .tmo-title   { font-size: .94rem; }
        }
      `}</style>

      <section className="tc-wrap tc-section" id="training-classes">
        <div className="tc-blob tc-blob-1" />
        <div className="tc-blob tc-blob-2" />

        <div className="tc-inner">

          {/* ── HEADER ── */}
          <div ref={headRef} className={`tc-head ${headIn ? "tc-in" : ""}`}>
            <div className="tc-eyebrow">
              <div className="tc-eyebrow-line" />
              Training &amp; Classes
              <div className="tc-eyebrow-line tc-eyebrow-line-r" />
            </div>
            <h2 className="tc-heading">Learn something <em>beautiful</em><br />today</h2>
            <p className="tc-head-sub">11 courses across painting, craft, culture, and wellness — guided step-by-step by Suman Jain.</p>
          </div>

          {/* ── DESKTOP + TABLET CONTROLS ── */}
          <div className="tc-controls">
            <div className="tc-search-wrap">
              <span className="tc-search-icon">🔍</span>
              <input className="tc-search" type="text" placeholder="Search a class or skill…"
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="tc-filters">
              {CATEGORIES.map((cat) => (
                <button key={cat} className={`tc-filter-btn ${activeFilter === cat ? "tc-active" : ""}`}
                  onClick={() => setActiveFilter(cat)}>{cat}</button>
              ))}
            </div>
          </div>

          <p className="tc-result-count">Showing <strong>{filtered.length}</strong> of {COURSES.length} classes</p>

          {/* ══════════════════════════════════════
              DESKTOP  ≥1024px — 3-col fixed cards
          ══════════════════════════════════════ */}
          <div className="tc-desktop-grid">
            {filtered.length === 0
              ? <div className="tc-empty">No classes found — try a different filter.</div>
              : filtered.map((c, idx) => <DesktopCard key={c.id} c={c} idx={idx} onCurriculum={setActiveCourse} />)
            }
          </div>

          {/* ══════════════════════════════════════
              TABLET  768–1023px — horizontal list
          ══════════════════════════════════════ */}
          <div className="tc-tablet-grid">
            {filtered.length === 0
              ? <div className="tc-empty" style={{ gridColumn: "1/-1" }}>No classes found.</div>
              : filtered.map((c, idx) => <TabletCard key={c.id} c={c} idx={idx} onCurriculum={setActiveCourse} />)
            }
          </div>

          {/* ══════════════════════════════════════
              MOBILE  ≤767px — sticky chips + 2-col
          ══════════════════════════════════════ */}

          {/* Mobile controls: search + scrollable chip strip */}
          <div className="tc-mob-controls">
            <div className="tc-mob-search-wrap">
              <span className="tc-mob-search-icon">🔍</span>
              <input className="tc-mob-search" type="text" placeholder="Search a class…"
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="tc-mob-filter-strip">
              {CATEGORIES.map((cat) => (
                <button key={cat} className={`tc-mob-chip ${activeFilter === cat ? "tc-mob-chip-active" : ""}`}
                  onClick={() => setActiveFilter(cat)}>{cat}</button>
              ))}
            </div>
          </div>

          <p className="tc-mob-count" style={{ display: "none" }}>
            <strong>{filtered.length}</strong> classes
          </p>

          <div className="tc-mobile-grid">
            {filtered.length === 0
              ? <div className="tmo-empty">No classes found.</div>
              : filtered.map((c, idx) => <MobileCard key={c.id} c={c} idx={idx} onCurriculum={setActiveCourse} />)
            }
          </div>

        </div>
      </section>

      {activeCourse && (
        <CurriculumOverlay course={activeCourse} onClose={() => setActiveCourse(null)} />
      )}
    </>
  );
}