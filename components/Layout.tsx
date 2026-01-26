
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Linkedin, Instagram, Check } from 'lucide-react';
import { dataService, syncWithServer } from '../services/dataService';
import { BIRLogo } from './Logo';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const location = useLocation();
  const [data, setData] = useState(() => dataService.getData());
  const { settings } = data;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await syncWithServer();
      if (!cancelled) setData(dataService.getData());
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSent(false), 5000);
    }
  };

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Research', path: '/research' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-slate-200 py-2 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="group transition-transform hover:scale-[1.02] flex items-center">
            <BIRLogo className="h-12 md:h-14 lg:h-16" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-semibold transition-colors hover:text-blue-700 ${location.pathname === link.path ? 'text-blue-800 underline underline-offset-8 decoration-2' : scrolled ? 'text-slate-600' : 'text-slate-700'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/admin" className="bg-[#0f365d] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#1a4a7a] transition-all shadow-md active:scale-95">
              Client Portal
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass border-b border-slate-200 absolute top-full left-0 w-full animate-in slide-in-from-top duration-300">
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="text-lg font-bold text-[#0f365d] border-b border-slate-100 pb-2">
                  {link.name}
                </Link>
              ))}
              <Link to="/admin" className="bg-[#0f365d] text-white px-6 py-3 rounded-xl text-center font-bold">
                Client Portal
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0f365d] text-slate-300 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <Link to="/" className="mb-8 block">
                <BIRLogo className="h-12" light />
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {settings.heroText.slice(0, 120)}...
              </p>
              <div className="flex space-x-5 items-center">
                <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
                  <Instagram size={20} />
                </a>
                <a href={settings.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="WhatsApp Community">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3l-1.5 6.5Z" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Resources</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/research" className="hover:text-white transition-colors">Insights & Articles</Link></li>
                <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Annual Reports</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Press</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Capabilities</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Intelligence Newsletter</h4>
              <p className="text-sm text-slate-400 mb-4">Subscribe for quarterly biomedical breakthroughs.</p>
              <form onSubmit={handleNewsletter} className="flex">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email address" 
                  className="bg-[#1a4a7a] border-none rounded-l-lg px-4 py-2 w-full text-white text-sm focus:ring-1 focus:ring-blue-400 placeholder-slate-400"
                />
                <button 
                  type="submit"
                  disabled={newsletterSent}
                  className={`${newsletterSent ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500'} text-white rounded-r-lg px-4 py-2 transition-all font-bold flex items-center justify-center min-w-[70px]`}
                >
                  {newsletterSent ? <Check size={18} /> : 'Join'}
                </button>
              </form>
              {newsletterSent && <p className="text-[10px] text-green-400 mt-2 font-bold uppercase tracking-widest">Added to registry!</p>}
            </div>
          </div>
          
          <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
            <p>© {new Date().getFullYear()} {settings.companyName}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="hover:text-slate-200">Terms of Service</Link>
              <Link to="/privacy" className="hover:text-slate-200">Privacy Policy</Link>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 opacity-70">
              Created By. Hrithik Wadile
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
