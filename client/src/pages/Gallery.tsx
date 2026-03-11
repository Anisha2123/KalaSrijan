import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// --- PREMIUM GALLERY ITEM WITH SMOOTH ANIMATIONS ---
const PremiumGalleryItem = ({ image, index, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Staggered reveal with smooth easing
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: (index % 3) * 0.15,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.05, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative w-full"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-200 cursor-pointer">
        {/* Image with smooth zoom on hover */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="w-full h-full overflow-hidden"
        >
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            src={image.src}
            alt={image.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Smooth overlay reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 flex flex-col justify-end p-8"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-amber-400 text-xs font-mono tracking-[0.4em] uppercase mb-3">
              {image.category}
            </p>
            <h3 className="text-white text-2xl font-serif italic leading-tight">
              {image.title}
            </h3>
          </motion.div>
        </motion.div>

        {/* Smooth expand indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-full text-slate-900"
        >
          <ChevronRight size={18} />
        </motion.div>
      </div>

      {/* Smooth label animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: (index % 3) * 0.15 + 0.2,
        }}
        className="mt-4 flex justify-between items-baseline border-b border-black/5 pb-3"
      >
        <span className="text-xs font-mono text-slate-400">0{image.id}</span>
        <span className="text-xs uppercase tracking-widest text-slate-700 font-medium">
          {image.title}
        </span>
      </motion.div>
    </motion.div>
  );
};

const DribbbleStyleGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // YOUR DATA
  const images = [
    { id: 1, src: 'Gallery/art/1.jpg', title: 'Artistic Masterpiece', category: 'painting' },
    // { id: 2, src: 'Gallery/art/2.jpg', title: 'Creative Vision', category: 'painting' },
    { id: 3, src: 'Gallery/art/2.png', title: 'Modern Expression', category: 'painting' },
    { id: 4, src: 'Gallery/art/3.png', title: 'Artistic Design', category: 'painting' },
    { id: 5, src: 'Gallery/art/4.png', title: 'Creative Journey', category: 'painting' },
    // { id: 6, src: 'Gallery/art/5.png', title: 'Art Showcase', category: 'painting' },
    { id: 7, src: 'Gallery/bake/1.png', title: 'Culinary Art', category: 'baking' },
    { id: 8, src: 'Gallery/bake/2.png', title: 'Baked Masterpiece', category: 'baking' },
    { id: 9, src: 'Gallery/bake/3.png', title: 'Sweet Creation', category: 'baking' },
    { id: 10, src: 'Gallery/bake/4.png', title: 'Culinary Excellence', category: 'baking' },
    { id: 11, src: 'Gallery/extra activity/1.png', title: 'Creative Activity', category: 'activity' },
    { id: 12, src: 'Gallery/extra activity/3.png', title: 'Workshop Experience', category: 'activity' },
    { id: 13, src: 'Gallery/extra activity/4.png', title: 'Learning Session', category: 'activity' },
    { id: 14, src: 'Gallery/extra activity/5.png', title: 'Creative Moment', category: 'activity' },
    { id: 15, src: 'Gallery/extra activity/6.png', title: 'Community Art', category: 'activity' },
    { id: 16, src: 'Gallery/extra activity/22.png', title: 'Group Creation', category: 'activity' },
    { id: 17, src: 'Gallery/packaging/1.png', title: 'Package Design', category: 'craft' },
    { id: 18, src: 'Gallery/packaging/2.png', title: 'Creative Packaging', category: 'craft' },
    { id: 19, src: 'Gallery/packaging/3.png', title: 'Gift Wrapping Art', category: 'craft' },
    { id: 20, src: 'Gallery/packaging/4.png', title: 'Packaging Excellence', category: 'craft' },
    { id: 21, src: 'Gallery/Painting 2/2.png', title: 'Artistic Expression', category: 'painting' },
    { id: 22, src: 'Gallery/Painting 2/3.png', title: 'Contemporary Art', category: 'painting' },
    { id: 23, src: 'Gallery/Painting 2/paiinting not dlt.png', title: 'Timeless Masterpiece', category: 'painting' },
    { id: 24, src: 'Gallery/Painting data/1.png', title: 'Fine Art', category: 'painting' },
    { id: 25, src: 'Gallery/Painting data/2.jpg', title: 'Artistic Vision', category: 'painting' },
    { id: 26, src: 'Gallery/Painting data/3.png', title: 'Color Study', category: 'painting' },
    { id: 27, src: 'Gallery/project/1.png', title: 'Project Showcase', category: 'project' },
    { id: 28, src: 'Gallery/project/2.png', title: 'Collaborative Work', category: 'project' },
    { id: 29, src: 'Gallery/project/3.png', title: 'Creative Project', category: 'project' },
    { id: 30, src: 'Gallery/project/4.png', title: 'Group Project', category: 'project' },
    { id: 31, src: 'Gallery/resin/1.png', title: 'Resin Art', category: 'resin' },
    { id: 32, src: 'Gallery/resin/2.png', title: 'Resin Masterpiece', category: 'resin' },
    { id: 33, src: 'Gallery/resin/3.png', title: 'Liquid Art', category: 'resin' },
    { id: 34, src: 'Gallery/resin/4.png', title: 'Resin Creation', category: 'resin' },
  ];

  const categories = ['all', 'painting', 'baking', 'activity', 'craft', 'project', 'resin'];

  const filteredImages = useMemo(() => {
    return filter === 'all' ? images : images.filter(img => img.category === filter);
  }, [filter, images]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FBFBF9] text-[#1A1A1A]">
      {/* Smooth background elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(217, 119, 6, 0.1), transparent 50%)',
        }}
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ============ EDITORIAL HEADER ============ */}
      <motion.header 
        className="relative z-10 px-8 md:px-20 pt-32 pb-16 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-black/5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-3xl">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono tracking-[0.5em] text-amber-700 uppercase"
          >
            Spring Portfolio • 2026
          </motion.span>
          <motion.h1 
            className="text-7xl md:text-9xl font-serif italic tracking-tighter mt-4 leading-[0.8]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Selected <br /> <span className="ml-[0.5em] text-slate-300">Works</span>
          </motion.h1>
        </div>
        
        <motion.div 
          className="flex flex-col items-end gap-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="text-right text-sm text-slate-500 max-w-[240px] leading-relaxed">
            A curated collection of tactile crafts, baked arts, and resin expressions from the Kalasrijan archive.
          </p>
          
          {/* Smooth Filter Buttons */}
          <motion.div 
            className="flex flex-wrap justify-end gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setCurrentImageIndex(0);
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.05, duration: 0.4 }}
                className={`text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg transition-all ${
                  filter === cat 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </motion.header>

      {/* ============ SMOOTH MASONRY GALLERY ============ */}
      <main className="relative z-10 px-8 md:px-20 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {filteredImages.map((image, index) => (
              <PremiumGalleryItem
                key={image.id}
                image={image}
                index={index}
                onClick={() => {
                  setSelectedImage(image);
                  setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* ============ SMOOTH LIGHTBOX ============ */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Top Bar */}
            <motion.div 
              className="p-8 flex justify-between items-center border-b border-black/5"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.span 
                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentImageIndex + 1} / {filteredImages.length}
              </motion.span>
              <motion.button 
                onClick={() => setSelectedImage(null)} 
                className="group flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                Close <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
                  <X size={16} />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row p-8 lg:p-20 gap-12 overflow-hidden">
              <motion.div 
                className="flex-1 relative flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <motion.img
                  key={currentImageIndex}
                  layoutId={selectedImage.id}
                  src={filteredImages[currentImageIndex].src}
                  className="max-h-full max-w-full object-contain shadow-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Smooth Nav Arrows */}
                <motion.button
                  onClick={handlePrevImage}
                  whileHover={{ scale: 1.1, x: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 hover:bg-slate-100 rounded-full transition-all"
                >
                  <ChevronLeft size={40} strokeWidth={1} />
                </motion.button>

                <motion.button
                  onClick={handleNextImage}
                  whileHover={{ scale: 1.1, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 hover:bg-slate-100 rounded-full transition-all"
                >
                  <ChevronRight size={40} strokeWidth={1} />
                </motion.button>
              </motion.div>

              {/* Sidebar Info with smooth animations */}
              <motion.div
                className="w-full lg:w-80 flex flex-col justify-between py-12"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <motion.h2 
                    className="text-5xl font-serif italic mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {filteredImages[currentImageIndex].title}
                  </motion.h2>
                  <motion.p 
                    className="text-amber-800 text-xs font-mono uppercase tracking-[0.4em] mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                  >
                    {filteredImages[currentImageIndex].category}
                  </motion.p>
                  <motion.p 
                    className="text-slate-500 text-sm leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    This work represents a unique exploration of textures and organic materials, handcrafted within our studio environment.
                  </motion.p>
                </motion.div>

                <motion.div
                  className="pt-12 border-t border-black/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <motion.div 
                    className="flex justify-between items-center group cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-[10px] font-mono tracking-widest uppercase">Inquire about work</span>
                    <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.3 }}>
                      <ArrowRight size={16} />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400;1,600&family=Inter:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-mono { font-family: 'Inter', sans-serif; font-size: 0.75rem; }
        body { background-color: #FBFBF9; }
      `}</style>
    </div>
  );
};

export default DribbbleStyleGallery;