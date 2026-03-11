import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Target, Users, Lightbulb, Palette } from 'lucide-react';

const AboutUsPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const coreValues = [
    {
      icon: '🎨',
      title: 'Creativity',
      description: 'Fostering innovative artistic expression in every form',
      color: 'from-pink-50 to-rose-50',
      borderColor: 'border-pink-200/40'
    },
    {
      icon: '❤️',
      title: 'Passion',
      description: 'Dedicated to nurturing creative souls with enthusiasm',
      color: 'from-rose-50 to-red-50',
      borderColor: 'border-rose-200/40'
    },
    {
      icon: '🌍',
      title: 'Tradition',
      description: 'Preserving and celebrating handmade art forms',
      color: 'from-amber-50 to-yellow-50',
      borderColor: 'border-amber-200/40'
    },
    {
      icon: '✨',
      title: 'Excellence',
      description: 'Delivering high-quality artistic education and craft',
      color: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200/40'
    },
  ];

  const features = [
    {
      icon: '🎯',
      title: 'Clear Vision',
      description: 'Present traditional and modern art in unique, inspiring ways',
      items: ['Traditional Crafts', 'Modern Design', 'Artistic Innovation']
    },
    {
      icon: '📚',
      title: 'Comprehensive Learning',
      description: 'Master handmade crafts, artistic design, and art forms',
      items: ['Handmade Crafts', 'Design Principles', 'Cultural Expression']
    },
    {
      icon: '🌟',
      title: 'Inspirational Journey',
      description: 'Every creation brings inspiration, beauty, and expression',
      items: ['Creative Expression', 'Personal Growth', 'Artistic Beauty']
    },
  ];

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
      title: 'Handmade Crafts',
      category: 'Traditional'
    },
    {
      src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
      title: 'Artistic Design',
      category: 'Modern'
    },
    {
      src: 'https://images.unsplash.com/photo-1578926314433-e1f5f97de2c6?w=500&h=500&fit=crop',
      title: 'Sculpture',
      category: 'Craft'
    },
    {
      src: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=500&fit=crop',
      title: 'Textile Arts',
      category: 'Traditional'
    },
    {
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop',
      title: 'Culinary',
      category: 'Modern'
    },
    {
      src: 'https://images.unsplash.com/photo-1578898657941-69a1f1a1ac60?w=500&h=500&fit=crop',
      title: 'Creative Expression',
      category: 'Craft'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.82, 1] },
    },
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-white via-stone-50 to-amber-50/50">
      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-screen py-20 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden flex items-center">
        {/* Animated background orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-amber-200/25 to-orange-200/15 rounded-full blur-3xl"
          animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-amber-100/20 to-orange-100/10 rounded-full blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.div variants={itemVariants} className="mb-6">
                <motion.span
                  className="inline-block px-4 py-2 bg-amber-50 border border-amber-200/60 rounded-full text-sm uppercase tracking-widest text-amber-700 font-light"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 251, 235, 0.95)' }}
                >
                  About Kalasrijan
                </motion.span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-950 mb-6 leading-tight">
                Where Art Meets
                <motion.span
                  className="block bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 bg-clip-text text-transparent font-normal"
                  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Passion & Purpose
                </motion.span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="w-24 h-1 bg-gradient-to-r from-amber-500 to-transparent mb-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
              />

              <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
                With over 32 years of experience, Kalasrijan is a creative platform dedicated to handmade art, craft, and authentic artistic expression. We believe art is not just a hobby—it's a powerful way to express emotions, imagination, and culture.
              </motion.p>

              <motion.p variants={itemVariants} className="text-base md:text-lg text-slate-600 leading-relaxed mb-10">
                Join us on a creative journey where every creation brings inspiration, beauty, and artistic expression. Experience the unique blend of traditional and modern artistic creations.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium uppercase tracking-widest overflow-hidden relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10">Join Our Community</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-amber-600/50 text-amber-700 rounded-lg font-medium uppercase tracking-widest hover:border-amber-600 hover:bg-amber-50 transition-all"
                >
                  Explore Courses
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              className="relative h-96 md:h-[600px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Animated glow */}
              <motion.div
                className="absolute -inset-6 bg-gradient-to-br from-amber-300/30 to-orange-300/20 rounded-3xl blur-2xl"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <motion.div
                className="relative h-full rounded-3xl overflow-hidden border-4 border-amber-200/40 shadow-2xl"
                animate={{ borderColor: ['rgba(217, 119, 6, 0.4)', 'rgba(217, 119, 6, 0.6)', 'rgba(217, 119, 6, 0.4)'] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
                  alt="Kalasrijan Studio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                {/* Floating stat badge */}
                <motion.div
                  className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-amber-200/50"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="text-4xl font-light text-amber-700 mb-2">32+</div>
                  <p className="text-sm text-slate-700">Years of<br/>Experience</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ MISSION & VISION ============ */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Left - Mission */}
            <motion.div
              variants={itemVariants}
              className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-amber-50/50 to-orange-50/50 border border-amber-200/40 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, rgba(217, 119, 6, 0.1), rgba(234, 88, 12, 0.1))`,
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="text-6xl mb-6 inline-block"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🎯
                </motion.div>

                <h3 className="text-3xl font-light text-slate-950 mb-4">Our Mission</h3>

                <p className="text-slate-700 leading-relaxed mb-4">
                  To promote the beauty and uniqueness of handmade craft by presenting traditional and modern artistic creations in unique and inspiring ways.
                </p>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  We aim to connect creative souls with the art forms that ignite their passion and help them discover their authentic artistic voice.
                </p>

                <motion.div
                  className="flex gap-3 flex-wrap"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {['Handmade', 'Traditional', 'Modern', 'Authentic'].map((tag, i) => (
                    <motion.span
                      key={i}
                      variants={itemVariants}
                      className="px-4 py-2 bg-white/50 rounded-full text-sm text-amber-700 border border-amber-200/60"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Vision */}
            <motion.div
              variants={itemVariants}
              className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-rose-50/50 to-pink-50/50 border border-rose-200/40 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, rgba(217, 119, 6, 0.1), rgba(234, 88, 12, 0.1))`,
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="text-6xl mb-6 inline-block"
                  animate={{ rotate: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ✨
                </motion.div>

                <h3 className="text-3xl font-light text-slate-950 mb-4">Our Vision</h3>

                <p className="text-slate-700 leading-relaxed mb-4">
                  To create a thriving community where every individual can express their emotions, imagination, and cultural heritage through artistic creation.
                </p>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Art is a powerful medium for self-expression and cultural preservation. We believe in its transformative power to inspire, heal, and connect people across all backgrounds.
                </p>

                <motion.div
                  className="flex gap-3 flex-wrap"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {['Expression', 'Connection', 'Culture', 'Growth'].map((tag, i) => (
                    <motion.span
                      key={i}
                      variants={itemVariants}
                      className="px-4 py-2 bg-white/50 rounded-full text-sm text-rose-700 border border-rose-200/60"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============ CORE VALUES ============ */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-amber-50/30 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-slate-950 mb-4">
              Our Core Values
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ originX: 0.5 }}
            />
          </motion.div>

          {/* Values Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                onMouseEnter={() => setActiveValue(i)}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group relative p-6 rounded-2xl border-2 bg-gradient-to-br ${value.color} ${value.borderColor} hover:border-amber-400/60 transition-all cursor-pointer overflow-hidden`}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, rgba(217, 119, 6, 0.1), rgba(234, 88, 12, 0.1))`,
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="text-5xl mb-4"
                    animate={activeValue === i ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    {value.icon}
                  </motion.div>

                  <h3 className="text-2xl font-light text-slate-950 mb-3">
                    {value.title}
                  </h3>

                  <p className="text-slate-700 text-sm leading-relaxed">
                    {value.description}
                  </p>

                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ WHAT WE OFFER ============ */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-slate-950 mb-4">
              What We Offer
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ originX: 0.5 }}
            />
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-amber-50/50 to-orange-50/50 border border-amber-200/40 hover:border-amber-400/60 transition-all group"
              >
                <motion.div
                  className="text-5xl mb-6"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ delay: i * 0.3, duration: 3, repeat: Infinity }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-2xl font-light text-slate-950 mb-3">
                  {feature.title}
                </h3>

                <p className="text-slate-700 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <motion.div
                  className="space-y-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {feature.items.map((item, j) => (
                    <motion.div
                      key={j}
                      variants={itemVariants}
                      className="flex items-center gap-2"
                    >
                      <span className="text-amber-600">✓</span>
                      <span className="text-sm text-slate-600">{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-amber-50/30 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-slate-950 mb-4">
              Our Creative Works
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ originX: 0.5 }}
            />
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {galleryImages.map((image, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative h-64 md:h-72 rounded-2xl overflow-hidden group cursor-pointer border border-amber-200/40"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-amber-300 text-sm uppercase tracking-widest mb-2">
                      {image.category}
                    </p>
                    <h4 className="text-white text-xl font-light">
                      {image.title}
                    </h4>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

  
      {/* ============ FINAL CTA ============ */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-light text-slate-950 mb-6"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Start Your Creative Journey Today
          </motion.h2>

          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            Every creation brings inspiration, beauty, and artistic expression. Join our community and discover the transformative power of handmade craft.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium uppercase tracking-widest text-lg overflow-hidden relative group"
          >
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">Join Kalasrijan Now</span>
          </motion.button>
        </motion.div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap');

        * {
          font-family: 'Outfit', sans-serif;
        }

        h1, h2, h3, h4 {
          font-family: 'Crimson Text', serif;
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgb(217, 119, 6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgb(180, 83, 9);
        }
      `}</style>
    </div>
  );
};

export default AboutUsPage;