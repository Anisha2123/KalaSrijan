import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Enhanced testimonials with more details
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Professional Artist',
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop',
      text: 'Suman Jain transformed my creative journey completely. Her unique teaching methods and passionate approach to art made me discover talents I never knew I had. Truly grateful for her mentorship.',
      rating: 5,
      specialty: 'Illustration'
    },
    {
      id: 2,
      name: 'Aisha Patel',
      role: 'Craft Designer',
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      text: 'The expertise and passion she brings to every session is absolutely unmatched. Her innovative techniques and encouragement helped me build my own successful craft business.',
      rating: 5,
      specialty: 'Textile Design'
    },
    {
      id: 3,
      name: 'Neha Verma',
      role: 'Culinary Enthusiast',
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop',
      text: 'Best decision ever enrolling with Kalasrijan. Suman\'s creativity and dedication inspire me every single day. She goes beyond teaching - she mentors and motivates.',
      rating: 5,
      specialty: 'Culinary Arts'
    },
    {
      id: 4,
      name: 'Rajini Mehta',
      role: 'Home Entrepreneur',
      location: 'Pune',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=500&fit=crop',
      text: 'Suman\'s comprehensive approach to art and craft gave me the confidence to start my own home-based business. Her support and expertise are invaluable.',
      rating: 5,
      specialty: 'Home Decor'
    },
    {
      id: 5,
      name: 'Kavya Singh',
      role: 'Art Teacher',
      location: 'Jaipur',
      image: 'https://images.unsplash.com/photo-1517457373614-b7152f800fd1?w=500&h=500&fit=crop',
      text: 'Learning from Suman has elevated my teaching standards. Her innovative methods and deep knowledge of various art forms have made me a better educator.',
      rating: 5,
      specialty: 'Painting'
    },
  ];

  // Auto-play testimonials
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  const handlePrev = () => {
    setAutoPlay(false);
    setDirection(-1);
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setDirection(1);
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setAutoPlay(false);
    setDirection(index > activeTestimonial ? 1 : -1);
    setActiveTestimonial(index);
  };

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
    initial: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 100 : -100,
      y: 0,
    }),
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 1, 0.82, 1] },
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction > 0 ? -100 : 100,
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 1, 0.82, 1] },
    }),
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-white via-stone-50 to-amber-50/50">
      {/* ============ TESTIMONIALS SECTION ============ */}
      <section className="relative py-20 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
        {/* Animated background elements */}
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

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16 md:mb-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={itemVariants}>
              <motion.h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-slate-950 mb-4">
                Loved by Our
                <motion.span
                  className="block bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 bg-clip-text text-transparent font-normal"
                  animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Creative Community
                </motion.span>
              </motion.h2>
            </motion.div>

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
              Join thousands of satisfied students who have transformed their creative journey with Suman Jain's expert mentorship.
            </motion.p>
          </motion.div>

          {/* Main Testimonials Carousel */}
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeTestimonial}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              >
                {/* Left - Testimonial Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Quote Icon */}
                  <motion.div
                    className="mb-6"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Quote size={48} className="text-amber-600/30" />
                  </motion.div>

                  {/* Rating */}
                  <motion.div
                    className="flex gap-1 mb-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="text-2xl"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                      >
                        ⭐
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.p
                    className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-950 mb-10 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    "{testimonials[activeTestimonial].text}"
                  </motion.p>

                  {/* Author Info */}
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-transparent" />
                      <div>
                        <p className="text-xl font-light text-slate-950">
                          {testimonials[activeTestimonial].name}
                        </p>
                        <p className="text-sm text-slate-600 mb-1">
                          {testimonials[activeTestimonial].role}
                        </p>
                        <p className="text-xs text-amber-700 font-medium uppercase tracking-widest">
                          {testimonials[activeTestimonial].specialty}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Location Badge */}
                  <motion.div
                    className="inline-block px-4 py-2 bg-amber-50 border border-amber-200/60 rounded-full"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 251, 235, 0.95)' }}
                  >
                    <span className="text-sm text-amber-700 font-light">📍 {testimonials[activeTestimonial].location}</span>
                  </motion.div>
                </motion.div>

                {/* Right - Testimonial Image */}
                <motion.div
                  className="relative h-96 md:h-[500px]"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {/* Animated glow background */}
                  <motion.div
                    className="absolute -inset-6 bg-gradient-to-br from-amber-300/30 to-orange-300/20 rounded-3xl blur-2xl"
                    animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  {/* Image container with border animation */}
                  <motion.div
                    className="relative h-full rounded-3xl overflow-hidden border-4 border-amber-200/40 shadow-2xl"
                    animate={{ borderColor: ['rgba(217, 119, 6, 0.4)', 'rgba(217, 119, 6, 0.6)', 'rgba(217, 119, 6, 0.4)'] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].name}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                    {/* Floating badge */}
                    <motion.div
                      className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-amber-200/50"
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">✨</span>
                        <div>
                          <p className="text-sm font-medium text-slate-950">Certified Student</p>
                          <p className="text-xs text-amber-700">Of Kalasrijan</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              className="flex gap-4 justify-center items-center mt-12 md:mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={handlePrev}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full border-2 border-amber-600/50 text-amber-700 hover:border-amber-600 hover:bg-amber-50 transition-all"
              >
                <ChevronLeft size={24} />
              </motion.button>

              {/* Testimonial Counter */}
              <motion.div
                className="px-6 py-3 bg-white border border-amber-200/40 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm font-medium text-slate-700">
                  <span className="text-amber-700 font-semibold">{activeTestimonial + 1}</span>
                  {' '} / {' '}
                  <span className="text-slate-600">{testimonials.length}</span>
                </span>
              </motion.div>

              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full border-2 border-amber-600/50 text-amber-700 hover:border-amber-600 hover:bg-amber-50 transition-all"
              >
                <ChevronRight size={24} />
              </motion.button>
            </motion.div>

            {/* Dot Navigation */}
            <motion.div
              className="flex gap-2 justify-center mt-8 flex-wrap"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  variants={itemVariants}
                  className={`rounded-full transition-all duration-300 ${
                    activeTestimonial === i
                      ? 'w-10 h-3 bg-gradient-to-r from-amber-600 to-orange-600'
                      : 'w-3 h-3 bg-amber-200 hover:bg-amber-400'
                  }`}
                  title={`Go to testimonial ${i + 1}`}
                />
              ))}
            </motion.div>
          </div>

          {/* Stats Below Testimonials */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 md:mt-32"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { icon: '⭐', stat: '5000+', label: 'Happy Students' },
              { icon: '🎨', stat: '12+', label: 'Art Forms' },
              { icon: '📚', stat: '25+', label: 'Years Experience' },
              { icon: '🏆', stat: '100%', label: 'Satisfaction Rate' },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center p-6 rounded-xl bg-white border border-amber-200/40 hover:border-amber-400/60 transition-all group"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="text-4xl mb-3 group-hover:scale-125 transition-transform"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ delay: i * 0.2, duration: 3, repeat: Infinity }}
                >
                  {item.icon}
                </motion.div>
                <motion.p
                  className="text-2xl font-light text-amber-700 mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
                >
                  {item.stat}
                </motion.p>
                <p className="text-sm text-slate-600">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
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

export default TestimonialsSection;