import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, MapPin, Phone, Instagram, Facebook, Twitter, Linkedin, ArrowUp } from 'lucide-react';

const PremiumFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Classes', href: '/classes' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Gallery', href: '/gallery' },
        { label: 'Contact', href: '/contact' },
        { label: 'Blog', href: '/blog' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/kalasrijan', label: 'Instagram', color: 'hover:text-rose-400' },
    { icon: Facebook, href: 'https://facebook.com/kalasrijan', label: 'Facebook', color: 'hover:text-rose-400' },
    { icon: Twitter, href: 'https://twitter.com/kalasrijan', label: 'Twitter', color: 'hover:text-amber-400' },
    { icon: Linkedin, href: 'https://linkedin.com/company/kalasrijan', label: 'LinkedIn', color: 'hover:text-rose-400' },
  ];

  const contactInfo = [
    { icon: MapPin, text: 'Jaipur, Rajasthan, India', label: 'Location' },
    { icon: Phone, text: '+91 98765 43210', label: 'Phone' },
    { icon: Mail, text: 'info@kalasrijan.com', label: 'Email' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 1, 0.82, 1] },
    },
  };

  return (
    <>
      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      {/* PREMIUM FOOTER */}
      <footer className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-slate-200 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-rose-500/10 rounded-full blur-3xl pointer-events-none"
          animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-amber-500/15 to-rose-500/8 rounded-full blur-3xl pointer-events-none"
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
          {/* Main Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-20 pb-16 border-b border-slate-700/40"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Logo & Brand Column */}
            <motion.div variants={itemVariants} className="md:col-span-2">
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-rose-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl flex-shrink-0"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🎨
                </motion.div>
                <div>
                  <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}>
                    Kalasrijan
                  </h2>
                  <p className="text-xs md:text-sm text-amber-300 font-bold tracking-widest mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    CREATIVE STUDIO
                  </p>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed text-sm mb-8 max-w-sm font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Where traditional artistry meets contemporary innovation. Nurturing creative souls through handmade crafts and authentic artistic expression.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Follow Us</p>
                <motion.div
                  className="flex items-center gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={itemVariants}
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-400 transition-all ${social.color} hover:border-amber-500/60 hover:bg-slate-700/80 hover:shadow-lg`}
                        aria-label={social.label}
                      >
                        <Icon size={18} strokeWidth={1.5} />
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm uppercase tracking-widest font-bold text-white mb-8" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem' }}>
                Quick Links
              </h4>
              <ul className="space-y-4">
                {footerLinks[0].links.map((link) => (
                  <motion.li key={link.label} whileHover={{ x: 6 }}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-amber-300 transition-colors text-sm font-light"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm uppercase tracking-widest font-bold text-white mb-8" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem' }}>
                Resources
              </h4>
              <ul className="space-y-4">
                {footerLinks[1].links.map((link) => (
                  <motion.li key={link.label} whileHover={{ x: 6 }}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-amber-300 transition-colors text-sm font-light"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm uppercase tracking-widest font-bold text-white mb-8" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem' }}>
                Legal
              </h4>
              <ul className="space-y-4">
                {footerLinks[2].links.map((link) => (
                  <motion.li key={link.label} whileHover={{ x: 6 }}>
                    <a
                      href={link.href}
                      className="text-slate-300 hover:text-amber-300 transition-colors text-sm font-light"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact & Newsletter Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 pb-16 border-b border-slate-700/40"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm uppercase tracking-widest font-bold text-white mb-10" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem' }}>
                Get In Touch
              </h4>

              <div className="space-y-6">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={info.label === 'Email' ? `mailto:${info.text}` : info.label === 'Phone' ? `tel:${info.text}` : '#'}
                      className="flex items-start gap-4 group transition-all"
                      whileHover={{ x: 8 }}
                    >
                      <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/25 to-rose-500/15 flex-shrink-0 group-hover:from-amber-500/40 group-hover:to-rose-500/25 transition-all">
                        <Icon size={20} className="text-amber-300 group-hover:text-amber-200 transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          {info.label}
                        </p>
                        <p className="text-slate-200 text-sm hover:text-amber-300 transition-colors font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          {info.text}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants}>
              <h4 className="text-sm uppercase tracking-widest font-bold text-white mb-10" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.125rem' }}>
                Newsletter
              </h4>
              <p className="text-slate-300 text-sm mb-6 font-light leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Subscribe to receive updates on workshops, classes, and creative inspiration directly in your inbox.
              </p>

              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <motion.div
                  className="relative group"
                  whileHover={{ y: -2 }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-slate-700/60 border border-slate-600/60 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400/70 focus:bg-slate-700 transition-all text-sm font-light group-hover:border-slate-600"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 px-5 py-2 bg-gradient-to-r from-amber-600 to-rose-600 text-white rounded-md text-xs font-bold hover:shadow-lg transition-all tracking-widest"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Subscribe
                  </motion.button>
                </motion.div>
              </form>

              <p className="text-xs text-slate-400 mt-4 font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                We respect your privacy. Unsubscribe anytime.
              </p>
            </motion.div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Copyright */}
            <motion.div variants={itemVariants} className="text-center md:text-left">
              <p className="text-slate-400 text-xs font-light leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <span className="block">© {currentYear} Kalasrijan Studio. All rights reserved.</span>
                <span className="flex items-center justify-center md:justify-start gap-1 mt-2">
                  Made with
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Heart size={14} className="text-red-500" />
                  </motion.div>
                  by Creative Minds
                </span>
              </p>
            </motion.div>

            {/* Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.12, y: -4 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
              className="p-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all"
              aria-label="Scroll to top"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowUp size={20} />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Top Border */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Montserrat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Montserrat', sans-serif;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
        }

        footer a {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </>
  );
};

export default PremiumFooter;