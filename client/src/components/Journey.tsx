import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Heart, Brain, Trophy, BookOpen, Users, Sparkles } from 'lucide-react';

const JourneyOfSumanJain = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [hoveredMilestone, setHoveredMilestone] = useState(null);

  // Journey phases data
  const journeyPhases = [
    {
      id: 1,
      year: 'The Beginning',
      title: 'Free Soft Toy Classes',
      description: 'Started her creative journey by teaching soft toy-making classes in temples completely free. This humble beginning planted the seeds of passion and dedication that would define her career.',
      highlights: ['Free Classes', 'Temple Community', 'Soft Toy Making', 'Building Network'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
      icon: '🧸',
      color: 'from-pink-50 to-rose-50',
      borderColor: 'border-pink-200/40'
    },
    {
      id: 2,
      year: '2019',
      title: 'Turning Point at IFB',
      description: 'Worked as a professional chef at IFB, a major turning point in her career. This experience opened new doors, broadened her perspective, and gave her valuable insights into culinary arts and professional excellence.',
      highlights: ['Professional Chef', 'IFB Experience', 'Career Growth', 'New Skills'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
      icon: '👨‍🍳',
      color: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200/40'
    },
    {
      id: 3,
      year: 'Today',
      title: '5000+ Happy Students',
      description: 'From humble beginnings to serving over 5000 happy customers. Her dedication and creative vision have built a strong community of learners. Kalasrijan stands as a testament to her passion and commitment to nurturing creativity.',
      highlights: ['5000+ Students', 'Multiple Crafts', 'Growing Community', 'Legacy Building'],
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop',
      icon: '🌟',
      color: 'from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-200/40'
    },
  ];

  // Milestones data
  const milestones = [
    {
      year: 'Early Days',
      title: 'Temple Classes Begin',
      description: 'Started free soft toy-making sessions in local temples',
      achievement: 'First Students',
      emoji: '🏛️'
    },
    {
      year: 'Growth Phase',
      title: 'Network Building',
      description: 'Expanded classes and gained appreciation from community',
      achievement: '500+ Students',
      emoji: '🤝'
    },
    {
      year: '2019',
      title: 'Professional Growth',
      description: 'Worked as Chef at IFB - Career Turning Point',
      achievement: 'Expert Chef',
      emoji: '👨‍🍳'
    },
    {
      year: 'Expansion',
      title: 'Diverse Skills',
      description: 'Expanded into painting, cooking, home decor, and more',
      achievement: '12+ Crafts',
      emoji: '🎨'
    },
    {
      year: 'Present',
      title: 'Kalasrijan Legacy',
      description: 'Established Kalasrijan as a premier creative platform',
      achievement: '5000+ Happy',
      emoji: '✨'
    },
  ];

  // Qualifications data
  const qualifications = [
    {
      degree: 'M.Sc. in Botany',
      description: 'Scientific knowledge of nature and plants',
      icon: '🌿',
      year: 'Academic Excellence'
    },
    {
      degree: 'Diploma in Pharmacy',
      description: 'Professional healthcare qualification',
      icon: '⚕️',
      year: 'Professional Certification'
    },
    {
      degree: 'Master Artisan',
      description: 'Expertise in 12+ art and craft forms',
      icon: '🎭',
      year: 'Practical Mastery'
    },
  ];

  // Stats data
  const stats = [
    { icon: '📚', number: '25+', label: 'Years of Experience' },
    { icon: '🎓', number: '2', label: 'Professional Degrees' },
    { icon: '🎨', number: '12+', label: 'Art Forms Mastered' },
    { icon: '👥', number: '5000+', label: 'Happy Students' },
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

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: [0.23, 1, 0.82, 1] }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { duration: 0.4 }
    },
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-white via-stone-50 to-amber-50/50">
      {/* ============ HERO SECTION ============ */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
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

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-950 mb-4">
              The Creative
              <motion.span
                className="block bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 bg-clip-text text-transparent font-normal"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Journey of Suman Jain
              </motion.span>
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="w-24 h-1 bg-gradient-to-r from-amber-500 to-transparent mx-auto mt-6"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{ originX: 0.5 }}
            />

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-700 mt-8 max-w-3xl mx-auto leading-relaxed"
            >
              From humble beginnings teaching free classes in temples to serving 5000+ happy students. A remarkable story of dedication, creativity, and passion.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============ TIMELINE PHASES ============ */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Phase Selector */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {journeyPhases.map((phase, i) => (
              <motion.button
                key={phase.id}
                variants={itemVariants}
                onClick={() => setActivePhase(i)}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-6 rounded-2xl text-left transition-all border-2 overflow-hidden group ${
                  activePhase === i
                    ? `bg-gradient-to-br ${phase.color} ${phase.borderColor} border-amber-500/60`
                    : `bg-white ${phase.borderColor} border-transparent hover:border-amber-200/60`
                }`}
              >
                {/* Animated background on active */}
                {activePhase === i && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <div className="relative z-10">
                  <motion.div
                    className="text-4xl mb-3"
                    animate={activePhase === i ? { rotate: [0, 10, 0], scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    {phase.icon}
                  </motion.div>
                  <p className="text-sm uppercase tracking-widest text-amber-700 font-light mb-2">
                    {phase.year}
                  </p>
                  <h3 className="text-xl font-light text-slate-950 mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {phase.description}
                  </p>
                </div>

                {/* Active indicator */}
                {activePhase === i && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500"
                    layoutId="activePhase"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Active Phase Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhase}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              {/* Left - Image */}
              <motion.div
                className="relative h-96 md:h-[500px]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {/* Animated glow */}
                <motion.div
                  className="absolute -inset-6 bg-gradient-to-br from-amber-300/30 to-orange-300/20 rounded-3xl blur-2xl"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <motion.div
                  className={`relative h-full rounded-3xl overflow-hidden border-4 ${journeyPhases[activePhase].borderColor} shadow-2xl`}
                  animate={{ borderColor: ['rgba(217, 119, 6, 0.4)', 'rgba(217, 119, 6, 0.6)', 'rgba(217, 119, 6, 0.4)'] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <img
                    src={journeyPhases[activePhase].image}
                    alt={journeyPhases[activePhase].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                </motion.div>
              </motion.div>

              {/* Right - Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.p
                  className="text-sm uppercase tracking-widest text-amber-700 font-light mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {journeyPhases[activePhase].year}
                </motion.p>

                <motion.h3
                  className="text-3xl md:text-4xl font-light text-slate-950 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {journeyPhases[activePhase].title}
                </motion.h3>

                <motion.p
                  className="text-lg text-slate-700 leading-relaxed mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {journeyPhases[activePhase].description}
                </motion.p>

                {/* Highlights */}
                <motion.div
                  className="grid grid-cols-2 gap-4 mb-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {journeyPhases[activePhase].highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200/40"
                      whileHover={{ y: -5, borderColor: 'rgba(217, 119, 6, 0.6)' }}
                    >
                      <p className="text-sm font-medium text-amber-700">✨ {highlight}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ============ MILESTONES TIMELINE ============ */}
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
              Key Milestones
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

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-amber-500 to-orange-500 hidden md:block"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              style={{ top: 0, bottom: 0 }}
            />

            {/* Timeline items */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredMilestone(i)}
                  onMouseLeave={() => setHoveredMilestone(null)}
                  className={`relative md:p-8 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center w-6 h-6 bg-white border-4 border-amber-500 rounded-full z-10"
                    style={{ top: '2rem' }}
                    animate={hoveredMilestone === i ? { scale: 1.5 } : { scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className="p-6 bg-white rounded-2xl border border-amber-200/40 hover:border-amber-400/60 transition-all"
                    whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(217, 119, 6, 0.15)' }}
                  >
                    <motion.div
                      className="text-3xl mb-3"
                      animate={hoveredMilestone === i ? { rotate: [0, 10, -10, 0], scale: 1.2 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {milestone.emoji}
                    </motion.div>

                    <p className="text-sm uppercase tracking-widest text-amber-700 font-light mb-2">
                      {milestone.year}
                    </p>
                    <h4 className="text-xl font-light text-slate-950 mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                      {milestone.description}
                    </p>

                    {/* Achievement badge */}
                    <motion.div
                      className="inline-block px-3 py-1 bg-amber-50 border border-amber-200/60 rounded-full"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-xs font-medium text-amber-700">
                        {milestone.achievement}
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ QUALIFICATIONS ============ */}
    

      {/* ============ STATS ============ */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center p-8 rounded-2xl bg-white border border-amber-200/40 hover:border-amber-400/60 transition-all group"
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="text-4xl mb-4 group-hover:scale-125 transition-transform"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ delay: i * 0.2, duration: 3, repeat: Infinity }}
                >
                  {stat.icon}
                </motion.div>
                <motion.p
                  className="text-3xl font-light text-amber-700 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
                >
                  {stat.number}
                </motion.p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 lg:px-20 bg-white">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-slate-950 mb-6">
            Be Part of This Creative Journey
          </h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">
            Join thousands of students who have learned from Suman Jain's expertise and passion. Start your creative transformation today.
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
            <span className="relative z-10">Start Your Creative Journey</span>
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

export default JourneyOfSumanJain;