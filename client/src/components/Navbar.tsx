import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, ChevronDown, Palette } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartCount, setCartCount] = useState(3); // Dummy cart count

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    window.addEventListener('scroll', () => setIsOpen(false));
    return () => window.removeEventListener('scroll', () => setIsOpen(false));
  }, []);

  const menuItems = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Services', href: '/services', icon: '✨' },
     { label: 'Classes', href: '/classes', icon: '🎓' },
     { label: 'Gallery', href: '/gallery', icon: '🎨' },
      { label: 'Contact', href: '/contact', icon: '📞' },
    { label: 'About Us', href: '/aboutus', icon: '📖' },
  ];

  const authItems = [
    { label: 'Login', href: '/login', type: 'secondary' },
    { label: 'Sign Up', href: '/signup', type: 'primary' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.23, 1, 0.82, 1] },
    },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 group cursor-pointer flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-lg"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                🎨
              </motion.div>
              <div className="hidden sm:flex flex-col">
                <span className="logo-text text-lg md:text-xl text-slate-950 leading-tight">
                  Kalasrijan
                </span>
                <span className="logo-subtitle text-xs md:text-sm text-amber-700 tracking-widest">
                  CREATIVE STUDIO
                </span>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              className="hidden lg:flex items-center gap-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {menuItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="nav-link relative px-4 py-2 text-sm font-medium text-slate-700 hover:text-amber-700 transition-colors group"
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Right Side - Cart, Auth & Mobile Menu */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Cart Icon */}
              <motion.a
                href="/cart"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-slate-700 hover:text-amber-700 transition-colors"
              >
                <ShoppingCart size={20} className="md:w-6 md:h-6" />
                {cartCount > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.a>

              {/* Desktop Auth Buttons */}
              <motion.div
                className="hidden md:flex items-center gap-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.a
                  href="/login"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="nav-button px-4 py-2 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                >
                  Login
                </motion.a>

                <motion.a
                  href="/signup"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="nav-button px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all overflow-hidden relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10">Sign Up</span>
                </motion.a>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-2 text-slate-700 hover:text-amber-700 transition-colors"
              >
                {isOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            />

            {/* Slide-in Menu */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed right-0 top-16 md:top-20 h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] w-80 bg-white/95 backdrop-blur-lg z-30 lg:hidden overflow-y-auto shadow-2xl"
            >
              {/* Mobile Menu Items */}
              <motion.div
                className="p-6 md:p-8 space-y-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {menuItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    variants={itemVariants}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ x: 10, backgroundColor: 'rgba(217, 119, 6, 0.1)' }}
                    className="nav-link flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:text-amber-700 transition-all group"
                  >
                    <span className="text-xl group-hover:scale-125 transition-transform">
                      {item.icon}
                    </span>
                    <span className="font-semibold">{item.label}</span>
                  </motion.a>
                ))}

                {/* Divider */}
                <motion.div
                  className="h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent my-6"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3 }}
                />

                {/* Mobile Auth Buttons */}
                <motion.div
                  className="space-y-3 pt-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.a
                    href="/login"
                    variants={itemVariants}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(217, 119, 6, 0.1)' }}
                    className="nav-button block px-6 py-3 text-center rounded-lg border-2 border-amber-200/40 text-amber-700 font-semibold hover:border-amber-400/60 transition-all"
                  >
                    Login
                  </motion.a>

                  <motion.a
                    href="/signup"
                    variants={itemVariants}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="nav-button block px-6 py-3 text-center bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all overflow-hidden relative group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10">Sign Up</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content overlap */}
      <div className="h-16 md:h-20" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Montserrat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Montserrat', sans-serif;
        }

        h1, h2, h3, h4 {
          font-family: 'Playfair Display', serif;
        }

        .logo-text {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .logo-subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
        }

        .nav-link {
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .nav-button {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        /* Smooth scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgb(217, 119, 6);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgb(180, 83, 9);
        }
      `}</style>
    </>
  );
};

export default NavBar;