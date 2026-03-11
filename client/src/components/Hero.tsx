import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Globe, Maximize2, MoveDown } from 'lucide-react';

const KalasrijanPremiumHero = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, -150]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const slides = [
    {
      title: "The Fine Art of Drawing",
      subtitle: "Sketching & Illustration",
      img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=2000",
      color: "#D97706"
    },
    {
      title: "Woven Narratives",
      subtitle: "Textiles & Embroidery",
      img: "https://images.unsplash.com/photo-1528813155421-ee3836376510?auto=format&fit=crop&q=80&w=2000",
      color: "#92400E"
    },
    {
      title: "Sculpting the Void",
      subtitle: "Ceramics & Clay",
      img: "https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=2000",
      color: "#78350F"
    }
  ];

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#F9F8F6] overflow-hidden text-[#1A1A1A]">
     

      {/* --- HERO CONTENT GRID --- */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-screen items-center px-8 md:px-16 pt-0">
        
        {/* Left: Text Content */}
        <div className="lg:col-span-5 z-20">
          <motion.div style={{ y: y1 }}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-[1px] bg-amber-700" />
              <span className="text-[10px] uppercase tracking-[0.5em] text-amber-800 font-bold">Est. 2024 • Studio</span>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={index}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tight"
                >
                  {slides[index].title.split(" ").slice(0, 2).join(" ")} <br />
                  <span className="italic font-light text-amber-700/80">
                    {slides[index].title.split(" ").slice(2).join(" ")}
                  </span>
                </motion.h1>
              </AnimatePresence>
            </div>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-lg text-stone-500 max-w-sm mb-12 font-light leading-relaxed"
            >
              A sanctuary where traditional craftsmanship meets modern vision. Learn from master artisans in an environment designed for elite creativity.
            </motion.p>

            <div className="flex flex-wrap items-center gap-12 mt-4">
  {/* --- PRIMARY: THE LIQUID SLIDE BUTTON --- */}
  <motion.button
    whileHover="hover"
    initial="initial"
    className="relative group px-10 py-5 overflow-hidden transition-all duration-500"
  >
    {/* Elegant Thin Border */}
    <div className="absolute inset-0 border border-[#141E27]/20 group-hover:border-[#B45309] transition-colors duration-500" />
    
    {/* The Liquid Reveal Background */}
    <motion.div 
      variants={{
        initial: { x: '-101%' },
        hover: { x: 0 }
      }}
      transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
      className="absolute inset-0 bg-[#141E27] z-0"
    />
    
    <div className="relative z-10 flex items-center gap-4">
      <span className="text-[11px] uppercase tracking-[0.5em] font-bold group-hover:text-white transition-colors duration-500">
        Explore Curriculums
      </span>
      <ArrowRight 
        size={16} 
        className="text-[#B45309] group-hover:text-white group-hover:translate-x-2 transition-all duration-500" 
      />
    </div>
  </motion.button>

  {/* --- SECONDARY: THE CINEMATIC PLAY BUTTON --- */}
  <motion.button 
    whileHover="hover"
    className="flex items-center gap-6 group cursor-pointer"
  >
    <div className="relative w-14 h-14 flex items-center justify-center">
      {/* Outer Rotating/Scaling Ring */}
      <motion.div 
        variants={{
          hover: { scale: 1.2, rotate: 90 }
        }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="absolute inset-0 rounded-full border border-[#141E27]/10 group-hover:border-[#B45309]"
      />
      
      {/* Inner Play Icon */}
      <div className="relative z-10 overflow-hidden">
        <motion.div
          variants={{
            initial: { y: 0 },
            hover: { y: -30 }
          }}
        >
          <Play size={14} className="text-[#141E27] fill-current" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          variants={{
            initial: { y: 30 },
            hover: { y: 0 }
          }}
        >
          <Play size={14} className="text-[#B45309] fill-current" />
        </motion.div>
      </div>
    </div>

    <div className="flex flex-col items-start overflow-hidden">
      <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#141E27]">
        Watch Film
      </span>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        className="h-[1px] w-full bg-[#B45309] origin-left"
      />
    </div>
  </motion.button>
</div>
          </motion.div>
        </div>
        

        {/* Right: The Artistic Frame */}
        <div className="lg:col-span-7 relative flex justify-end h-[70vh] lg:h-[85vh]">
          <motion.div 
            style={{ y: y2 }}
            className="relative w-full lg:w-[90%] h-full rounded-tl-[10rem] overflow-hidden shadow-2xl shadow-stone-300"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                exit={{ clipPath: 'inset(0 0 100% 0)' }}
                transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
                className="absolute inset-0"
              >
                <motion.img 
                  src={slides[index].img}
                  className="w-full h-full object-cover scale-110"
                  animate={{ scale: 1 }}
                  transition={{ duration: 6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Floating UI Elements over Image */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-12 right-12 text-white text-right z-30"
            >
              <div className="text-[10px] uppercase tracking-[0.4em] mb-2 opacity-70">Feature Subject</div>
              <div className="text-2xl font-serif italic">{slides[index].subtitle}</div>
            </motion.div>

            {/* Scrolling Slide Numbers */}
            <div className="absolute top-12 left-12 z-30 flex flex-col items-center gap-4">
              <span className="text-[10px] font-bold text-white/50 tracking-widest">0{index + 1}</span>
              <div className="w-[1px] h-20 bg-white/20 relative">
                <motion.div 
                  className="absolute top-0 w-full bg-white"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  key={index}
                />
              </div>
              <span className="text-[10px] font-bold text-white tracking-widest">03</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- FOOTER ELEMENTS --- */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-16 z-30 hidden xl:flex items-center gap-8"
      >
        <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-bold opacity-40">
          <Globe size={12} /> Worldwide Excellence
        </div>
        <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-bold opacity-40">
          <Maximize2 size={12} /> Immersive Studio
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 right-1/2 translate-x-1/2 z-30 flex flex-col items-center gap-3 opacity-30"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] font-bold">Scroll</span>
        <MoveDown size={14} />
      </motion.div>

      {/* --- GLOBAL STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;600&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          background-color: #F9F8F6;
        }

        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }

        ::selection {
          background: #D97706;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default KalasrijanPremiumHero;