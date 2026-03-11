import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Zap, Users, Award, TrendingUp } from 'lucide-react';

const WhyChooseSumanJain = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      text: 'Suman Jain transformed my creative journey. Her teaching methods are unique and inspiring.',
      rating: 5
    },
    {
      name: 'Aisha Patel',
      role: 'Artist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      text: 'The expertise and passion she brings to every session is unmatched. Truly grateful.',
      rating: 5
    },
    {
      name: 'Neha Verma',
      role: 'Craft Enthusiast',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      text: 'Best decision ever. Suman\'s creativity and dedication inspire me every day.',
      rating: 5
    },
  ];

  // Why choose cards data
  const whyChooseCards = [
    {
      icon: '📚',
      title: 'Decades of Experience',
      description: 'Years of mastery in diverse art forms, from traditional to contemporary crafts',
      stats: '25+ Years',
      color: 'from-blue-50 to-blue-100'
    },
    {
      icon: '❤️',
      title: 'Passion for Teaching',
      description: 'Dedicated to nurturing creativity and helping students discover their potential',
      stats: '5000+ Happy Students',
      color: 'from-rose-50 to-rose-100'
    },
    {
      icon: '✨',
      title: 'Unique Creative Vision',
      description: 'One-of-a-kind designs and innovative approaches that stand out',
      stats: 'Award Winner',
      color: 'from-yellow-50 to-yellow-100'
    },
    {
      icon: '🎯',
      title: 'Trusted & Appreciated',
      description: 'Recognized for excellence, innovation, and positive impact on students',
      stats: '100% Trust Rating',
      color: 'from-green-50 to-green-100'
    },
    {
      icon: '⚡',
      title: 'Dynamic Personality',
      description: 'Remains confident, active, and passionate after decades of experience',
      stats: 'Always Inspiring',
      color: 'from-purple-50 to-purple-100'
    },
    {
      icon: '🌟',
      title: 'Comprehensive Skills',
      description: 'Expert in painting, cooking, home decor, card making, and much more',
      stats: '12+ Crafts',
      color: 'from-orange-50 to-orange-100'
    },
  ];

  // Animation variants
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

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-white via-stone-50 to-amber-50">
      {/* ============ HERO SECTION ============ */}
      <section className="relative py-10 md:py-22 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-200/20 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-amber-100/20 to-orange-100/10 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-950 mb-4">
              Why Choose
              <motion.span
                className="block bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 bg-clip-text text-transparent font-normal"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Suman Jain?
              </motion.span>
            </motion.h2>

            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto mt-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ originX: 0.5 }}
            />

            <motion.p
              className="text-lg md:text-xl text-slate-700 mt-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              A combination of experience, dedication, creativity, and trust.
            </motion.p>
          </motion.div>

          {/* Main Hero Image & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            {/* Left - Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-amber-300/20 to-orange-300/20 rounded-3xl blur-2xl"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
                alt="Suman Jain"
                className="relative z-10 w-full rounded-3xl shadow-2xl object-cover aspect-square"
              />

              {/* Floating badges around image */}
              {[
                { icon: '⭐', label: '5000+\nStudents', pos: 'top-10 -right-8' },
                { icon: '🏆', label: 'Award\nWinner', pos: '-bottom-8 -left-8' },
                { icon: '❤️', label: '100%\nTrust', pos: '-bottom-8 right-10' },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${badge.pos} z-20`}
                  animate={{ y: [0, -15, 0] }}
                  transition={{ delay: i * 0.5, duration: 4, repeat: Infinity }}
                >
                  <motion.div
                    className="bg-white rounded-full shadow-lg p-4 text-center border-2 border-amber-200/50 backdrop-blur-xl"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-3xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-light text-slate-700 whitespace-pre-line leading-tight">
                      {badge.label}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right - Stats & Text */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-light text-slate-950 mb-6">
                The Master Artisan Behind Kalasrijan
              </motion.h3>

              <motion.p variants={itemVariants} className="text-slate-700 leading-relaxed mb-8 text-lg">
                Suman Jain has spent decades mastering diverse art forms and developing a unique creative philosophy. What sets her apart is not just her expertise, but her unwavering commitment to nurturing the next generation of artists.
              </motion.p>

              {/* Stats Grid */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { number: '25+', label: 'Years of Experience' },
                  { number: '5000+', label: 'Happy Students' },
                  { number: '12+', label: 'Art Forms' },
                  { number: '100%', label: 'Trust Rate' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200/40"
                    whileHover={{ y: -5, borderColor: 'rgba(217, 119, 6, 0.6)' }}
                  >
                    <motion.div
                      className="text-3xl font-light text-amber-700"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm text-slate-600 mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                variants={itemVariants}
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
                <span className="relative z-10">Learn More</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE GRID ============ */}
    

      {/* ============ EXPERTISE SHOWCASE ============ */}
      <section className="relative py-10 md:py-32 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-slate-950 mb-4">
              Comprehensive Expertise
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

          {/* Expertise circles */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { icon: '🎨', label: 'Painting' },
              { icon: '🖼️', label: 'Illustration' },
              { icon: '🧵', label: 'Textile Arts' },
              { icon: '👗', label: 'Sewing' },
              { icon: '👨‍🍳', label: 'Culinary' },
              { icon: '🏺', label: 'Clay Work' },
              { icon: '🎭', label: 'Lippan Art' },
              { icon: '📄', label: 'Paper Crafts' },
              { icon: '🏠', label: 'Home Decor' },
              { icon: '🎀', label: 'Card Making' },
              { icon: '💝', label: 'Gift Wrapping' },
              { icon: '✨', label: 'And More...' },
            ].map((skill, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border-2 border-amber-200/30 hover:border-amber-400/60 transition-all cursor-pointer group"
              >
                <motion.div
                  className="text-4xl mb-3 group-hover:scale-125 transition-transform"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ delay: i * 0.1, duration: 4, repeat: Infinity }}
                >
                  {skill.icon}
                </motion.div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-amber-700 transition-colors">
                  {skill.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
     

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-slate-950 mb-6">
            Experience the Kalasrijan Difference
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            Join thousands of creative individuals who have transformed their artistic journey with Suman Jain. Your creative potential awaits.
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
            <span className="relative z-10">Start Your Journey</span>
          </motion.button>
        </motion.div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap');

        * {
          font-family: 'Outfit', sans-serif;
        }

        h1, h2, h3 {
          font-family: 'Crimson Text', serif;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default WhyChooseSumanJain;