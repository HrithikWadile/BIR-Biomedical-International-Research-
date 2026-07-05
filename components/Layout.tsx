
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Instagram, Check, ArrowUpRight } from 'lucide-react';
import { dataService, syncWithServer } from '../services/dataService';
import { BIRLogo } from './Logo';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const location = useLocation();
  const [data, setData] = useState(() => dataService.getData());
  const { settings } = data;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await syncWithServer();
      if (!cancelled) setData(dataService.getData());
    })();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lock page scroll while the full-screen drawer is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSent(false), 5000);
    }
  };

  const navLinks = [
    { name: 'About',       path: '/about' },
    { name: 'Services',    path: '/services' },
    { name: 'Case Studies',path: '/case-studies' },
    { name: 'Research',    path: '/research' },
    { name: 'Contact',     path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Navigation ── */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/96 backdrop-blur-xl border-b border-slate-100 py-3 shadow-[0_2px_24px_rgba(0,0,0,0.07)]'
          : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="block transition-opacity hover:opacity-80">
            <BIRLogo className="h-10 md:h-12 lg:h-14" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors pb-1 ${
                  location.pathname === link.path
                    ? 'text-[#0f365d]'
                    : scrolled
                      ? 'text-slate-500 hover:text-[#0f365d]'
                      : 'text-slate-600 hover:text-[#0f365d]'
                }`}
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif', letterSpacing: '0.01em' }}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: '#C9A84C' }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </Link>
            ))}

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(15,54,93,0.25)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#0f365d] text-white text-sm px-5 py-2.5 rounded-lg font-semibold shadow-[0_4px_14px_rgba(15,54,93,0.18)] hover:bg-[#1a4a7a] transition-colors"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white/80 text-[#0f365d] transition-colors hover:border-[#0f365d]"
            onClick={() => setIsMenuOpen(v => !v)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Full-screen mobile menu drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="md:hidden fixed inset-0 z-[-1] bg-[#F8F6F2] flex flex-col"
              style={{ zIndex: -1 }}
            >
              {/* Subtle dot texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="drawer-dots" width="22" height="22" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.2" fill="#0f365d" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#drawer-dots)" />
                </svg>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center gap-1 px-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-2.5 text-4xl font-bold text-center transition-colors ${
                        location.pathname === link.path ? 'text-[#C9A84C]' : 'text-[#0a1628]'
                      }`}
                      style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.03em' }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.08 + navLinks.length * 0.07, duration: 0.5 }}
                  className="mt-8"
                >
                  <Link to="/contact">
                    <button
                      className="bg-[#0f365d] text-white px-10 py-4 rounded-full font-semibold text-sm uppercase tracking-widest shadow-[0_8px_28px_rgba(15,54,93,0.25)]"
                      style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                    >
                      Get in Touch
                    </button>
                  </Link>
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="pb-10 text-center label-text text-slate-400"
              >
                © {new Date().getFullYear()} {settings.companyName}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Page content ── */}
      <main className="flex-grow">{children}</main>

      {/* ── Footer ── */}
      <footer className="bg-[#0a1628] text-slate-400 pt-20 pb-10 relative overflow-hidden">
        {/* Dot pattern texture */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none select-none" aria-hidden="true">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="footer-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footer-dots)" />
          </svg>
        </div>

        {/* Glow accent */}
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[200px] pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(ellipse, #C9A84C 0%, transparent 70%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 pb-16 border-b border-white/[0.07]">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <Link to="/" className="mb-6 block w-fit">
                <BIRLogo className="h-10" light />
              </Link>
              <p className="body-text text-sm mb-8 max-w-[240px]" style={{ color: '#64748b' }}>
                {settings.heroText.slice(0, 115)}…
              </p>
              <div className="flex gap-3">
                {[
                  { href: settings.socialLinks.linkedin, icon: <Linkedin size={15} />, label: 'LinkedIn' },
                  { href: settings.socialLinks.instagram, icon: <Instagram size={15} />, label: 'Instagram' },
                  {
                    href: settings.socialLinks.whatsapp,
                    label: 'WhatsApp',
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3l-1.5 6.5Z" />
                      </svg>
                    ),
                  },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4
                className="text-white/70 font-semibold mb-6 text-[10px] uppercase tracking-[0.28em]"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                Resources
              </h4>
              <ul className="space-y-3.5">
                {[
                  { label: 'Insights & Articles', path: '/research' },
                  { label: 'Case Studies',         path: '/case-studies' },
                  { label: 'Annual Reports',       path: '/about' },
                  { label: 'Contact Press',        path: '/contact' },
                ].map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      {item.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4
                className="text-white/70 font-semibold mb-6 text-[10px] uppercase tracking-[0.28em]"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                Company
              </h4>
              <ul className="space-y-3.5">
                {[
                  { label: 'Our Story',    path: '/about' },
                  { label: 'Capabilities', path: '/services' },
                  { label: 'Careers',      path: '/about' },
                  { label: 'Privacy Policy', path: '/privacy' },
                ].map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-sm text-slate-500 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      {item.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4
                className="text-white/70 font-semibold mb-2 text-[10px] uppercase tracking-[0.28em]"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                Intelligence Newsletter
              </h4>
              <p className="text-sm text-slate-500 mt-3 mb-5 leading-relaxed">
                Quarterly biomedical breakthroughs delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletter} className="space-y-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-white/[0.05] border border-white/[0.09] rounded-lg px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#C9A84C]/50 focus:bg-white/10 transition-all"
                />
                <button
                  type="submit"
                  disabled={newsletterSent}
                  className={`w-full py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    newsletterSent
                      ? 'bg-green-600 text-white'
                      : 'bg-[#C9A84C] text-white hover:bg-[#b8952d] shadow-[0_4px_16px_rgba(201,168,76,0.3)]'
                  }`}
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  {newsletterSent ? <><Check size={15} /> Subscribed!</> : 'Join the Registry'}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="label-text text-slate-600">
              © {new Date().getFullYear()} {settings.companyName}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/terms"   className="text-xs text-slate-600 hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="text-xs text-slate-600 hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.32em] text-slate-700"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              Crafted by Hrithik Wadile
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
