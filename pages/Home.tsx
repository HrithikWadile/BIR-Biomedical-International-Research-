
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, BarChart3, ShieldCheck, Globe, Zap,
  Users2, GraduationCap, Microscope, ArrowUpRight,
  FlaskConical, BookOpen, Brain
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { SectionTitle, BlurText, CurvedLines } from '../components/UI';
import { useSEO, SITE_URL } from '../hooks/useSEO';

/* ── Animated counter ── */
const Counter: React.FC<{ value: number; suffix?: string; prefix?: string }> = ({
  value, suffix = '', prefix = ''
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress >= 1) clearInterval(tick);
    }, 16);
    return () => clearInterval(tick);
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const iconMap: Record<string, any> = {
  TrendingUp: BarChart3,
  Beaker: ShieldCheck,
  BarChart: Globe,
  FlaskConical,
  BookOpen,
  Brain,
};

export const Home: React.FC = () => {
  const { settings, services, caseStudies } = dataService.getData();

  useSEO({
    title: 'Doctor-Led Biomedical Research Mentorship',
    description: 'BIR Research is a doctor-led organization helping IMGs, medical students, and early-career clinicians publish systematic reviews and meta-analyses in high-impact indexed journals. Led by Dr. Roshan.',
    keywords: 'BIR Research, Biomedical Research, Systematic Review, Meta-Analysis, IMG Mentorship, Medical Publication, Doctor-Led Research, ICMJE, Evidence-Based Medicine',
    canonical: '/',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'BIR Research | Doctor-Led Biomedical Research Mentorship',
      description: 'BIR Research — doctor-led research mentorship specializing in systematic reviews and meta-analyses.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }] },
    },
  });

  return (
    <div className="overflow-hidden bg-[#F8F6F2]">

      {/* ═══════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: '#F8F6F2' }}>

        {/* Background watermark */}
        <div
          className="absolute right-[-2%] top-1/2 -translate-y-1/2 select-none pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="block font-bold leading-none text-[22vw] text-[#0f365d] opacity-[0.03]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            BIR
          </span>
        </div>

        {/* Radial gold glow */}
        <div
          className="absolute top-0 left-[-10%] w-[700px] h-[500px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.18) 0%, transparent 65%)' }}
        />

        {/* Decorative circles */}
        <div className="absolute top-32 right-[12%] w-72 h-72 rounded-full border border-[#0f365d]/[0.06] pointer-events-none animate-spin-slow" />
        <div className="absolute top-44 right-[15%] w-40 h-40 rounded-full border border-[#C9A84C]/[0.1] pointer-events-none" />

        {/* Pulsing curved lines — ripple in from both edges */}
        <CurvedLines side="left" className="hidden lg:block" color="rgba(201,168,76,0.28)" count={10} baseWidth={50} step={14} />
        <CurvedLines side="right" className="hidden lg:block" color="rgba(15,54,93,0.12)" count={10} baseWidth={50} step={14} />

        <div className="container mx-auto px-6 relative z-10 pt-32 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

            {/* ── Left: Content ── */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border text-[11px] font-semibold uppercase tracking-[0.1em]"
                style={{
                  background: 'rgba(201,168,76,0.09)',
                  borderColor: 'rgba(201,168,76,0.28)',
                  color: '#856F1C',
                  fontFamily: 'Space Grotesk, Inter, sans-serif',
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-[#C9A84C] opacity-60 animate-ping" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-[#C9A84C]" />
                </span>
                Doctor-Led Research Mentorship
              </motion.div>

              {/* Heading — cinematic word-by-word blur-in */}
              <h1
                className="font-bold leading-[1.04] mb-7 text-[#0a1628]"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 5.4rem)' }}
              >
                {(() => {
                  const words = settings.tagline.split(' ');
                  const cut = Math.max(2, Math.floor(words.length * 0.62));
                  return (
                    <BlurText
                      text={settings.tagline}
                      highlightLast={words.length - cut}
                      delay={0.15}
                      stagger={0.11}
                    />
                  );
                })()}
              </h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="text-elegant mb-10 max-w-lg"
              >
                {settings.heroText}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 16px 40px rgba(15,54,93,0.28)' }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#0f365d] text-white px-8 py-4 rounded-xl font-semibold text-[15px] flex items-center gap-3 shadow-[0_8px_28px_rgba(15,54,93,0.22)] transition-shadow"
                    style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                  >
                    Learn Our Method <ArrowRight size={17} />
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 bg-white rounded-full p-1.5 pr-6 transition-shadow"
                    style={{ border: '4px solid #EFECE4' }}
                  >
                    <img
                      src="/favicon.png"
                      alt="BIR Research team"
                      className="w-10 h-10 rounded-full object-cover border border-slate-100"
                    />
                    <span className="text-left">
                      <span
                        className="block text-sm font-semibold text-[#0a1628] leading-tight"
                        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                      >
                        Talk to our team
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <span className="w-2 h-2 rounded-full bg-[#1DCC5D] inline-block" />
                        Replies within 24 hours
                      </span>
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Image ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.15 }}
              className="hidden lg:block relative"
            >
              {/* Offset border decoration */}
              <div className="absolute -inset-4 rounded-3xl border border-[#C9A84C]/20 pointer-events-none" />

              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_24px_80px_rgba(15,54,93,0.18)]">
                <img
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200"
                  className="w-full h-full object-cover scale-105"
                  alt="Medical research professional"
                  loading="eager"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0.05) 0%, rgba(10,22,40,0.55) 100%)' }}
                />
              </div>

              {/* Floating card — top left */}
              <motion.div
                initial={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="absolute -left-10 top-10 liquid-glass rounded-2xl p-5 animate-float"
              >
                <p
                  className="text-3xl font-bold text-[#0f365d] mb-0.5"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >600+</p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">PhD Analysts</p>
              </motion.div>

              {/* Floating card — bottom right */}
              <motion.div
                initial={{ opacity: 0, x: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="absolute -right-8 bottom-14 liquid-glass-dark text-white rounded-2xl p-5 animate-float-slow"
              >
                <p
                  className="text-3xl font-bold mb-0.5"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >92%</p>
                <p className="text-[10px] text-blue-200 font-semibold uppercase tracking-widest">Success Rate</p>
              </motion.div>

              {/* Gold dot accent */}
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-[#C9A84C] opacity-70 animate-gold" />
            </motion.div>
          </div>

          {/* ── Stats bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200 border-t border-slate-200"
          >
            {[
              { num: 18,   suffix: '+', label: 'Research Hubs' },
              { num: 600,  suffix: '+', label: 'PhD Analysts' },
              { num: 2,    suffix: '.4B', label: 'Data Points' },
              { num: 92,   suffix: '%',  label: 'Success Rate' },
            ].map((s, i) => (
              <div key={i} className="py-8 px-6">
                <div
                  className="text-3xl md:text-4xl font-bold text-[#0f365d] mb-1 num-stat"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  <Counter value={s.num} suffix={s.suffix} />
                </div>
                <p className="label-text text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MARQUEE TICKER
      ════════════════════════════════════════════════════════ */}
      <div className="bg-[#0a1628] py-5 overflow-hidden border-y border-white/[0.05]">
        <div className="marquee-mask overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-4 select-none w-max">
            {[...Array(2)].flatMap(() =>
              [
                'Systematic Reviews', 'Meta-Analysis', 'Doctor-Led Mentorship',
                'ICMJE Authorship', 'Evidence-Based Medicine', 'High-Impact Publications',
                'Research Pipeline', 'Academic Credibility', 'Clinical Expertise',
              ].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 shrink-0 border border-white/[0.08] bg-white/[0.04] rounded-full px-4 py-1.5"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block shrink-0 animate-gold" />
                  {item}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          MISSION SECTION
      ════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8 bg-[#C9A84C]" />
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A84C]"
                    style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                  >
                    Our Mission
                  </span>
                </div>
                <h2
                  className="text-4xl md:text-5xl font-bold leading-[1.06]"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#0a1628' }}
                >
                  Empowering the{' '}
                  <em className="gold-italic">Next Generation</em>
                  {' '}of Medical Researchers
                </h2>
              </div>

              <div className="space-y-5 body-text">
                <p>
                  Led by <span className="text-[#0f365d] font-medium">Dr. Roshan</span>, BIR manages study design,
                  manuscript drafting, analysis, and journal submission — allowing collaborators to focus on learning
                  how real, publishable research is conducted under mentorship and clear authorship guidelines.
                </p>
                <p>
                  We collaborate with institutions and senior consultants on selected projects, ensuring high
                  methodological standards across every systematic review and meta-analysis we undertake.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-5 pt-2">
                {[
                  { icon: Microscope, title: 'Real Research', desc: 'No shortcuts — rigorous academic work only.' },
                  { icon: GraduationCap, title: 'Clear Mentorship', desc: 'Structured roles designed for skill acquisition.' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#F8F6F2] text-[#0f365d] flex items-center justify-center shrink-0 border border-slate-100">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0a1628] text-sm mb-1">{item.title}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — community card */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                {/* Offset decoration */}
                <div className="absolute -inset-3 rounded-3xl bg-[#F8F6F2] border border-slate-100" />

                <div className="relative bg-white rounded-3xl p-10 border border-slate-100 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-[#0f365d] text-white rounded-xl flex items-center justify-center">
                      <Users2 size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0f365d]" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
                      Our Community Focus
                    </h3>
                  </div>

                  <ul className="space-y-5">
                    {[
                      'International Medical Graduates (IMGs)',
                      'Early-career Clinicians & Residents',
                      'Medical Students & Academic Aspirants',
                      'Senior Consultants & Institutions',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0 group-hover:scale-150 transition-transform" />
                        <span className="text-slate-700 font-medium text-[15px]">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 pt-8 border-t border-slate-50">
                    <p className="pull-quote text-slate-400 text-base">
                      "BIR is a doctor-led research mentorship and collaboration organization specializing in
                      systematic reviews and meta-analyses."
                    </p>
                  </div>

                  {/* Gold accent bar */}
                  <div className="absolute top-0 left-8 right-8 h-0.5 bg-[#C9A84C] rounded-full opacity-60" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#F8F6F2] relative overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid-services" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0f365d" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-services)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <SectionTitle
              subtitle="Our Capabilities"
              title="Scientific Innovation Meets Strategic Rigor"
            />
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 text-[#0f365d] border border-[#0f365d]/20 bg-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:border-[#0f365d] hover:bg-white transition-all shadow-sm mb-16 md:mb-0 shrink-0"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                All Services <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = iconMap[service.icon] || BarChart3;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/services#${service.id}`} className="block group h-full">
                    <div className="bg-white border border-slate-100 p-8 h-full rounded-2xl transition-all group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.1)] group-hover:border-[#0f365d]/10 relative overflow-hidden">
                      {/* Large background number */}
                      <div
                        className="absolute -right-3 -top-5 text-[7rem] font-black text-[#0f365d]/[0.04] leading-none select-none pointer-events-none transition-all group-hover:text-[#0f365d]/[0.07]"
                        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      {/* Gold top accent */}
                      <div className="h-0.5 w-8 bg-[#C9A84C] mb-6 rounded-full transition-all group-hover:w-16" />

                      <div className="w-12 h-12 bg-[#F8F6F2] text-[#0f365d] rounded-xl flex items-center justify-center mb-6 transition-all group-hover:bg-[#0f365d] group-hover:text-white border border-slate-100">
                        <Icon size={24} />
                      </div>

                      <h3 className="text-xl font-bold text-[#0a1628] mb-3 tracking-tight">{service.title}</h3>
                      <p className="body-text mb-7">{service.description}</p>

                      <div
                        className="flex items-center text-[#0f365d] font-semibold text-xs uppercase tracking-widest gap-2"
                        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                      >
                        <span>View Details</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          IMPACT NUMBERS  (dark section)
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a1628] text-white relative overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="dots-dark" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots-dark)" />
          </svg>
        </div>

        {/* Gold radial glow */}
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[300px] pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(ellipse, #C9A84C 0%, transparent 65%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A84C]"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                Global Reach
              </span>
              <div className="h-px w-8 bg-[#C9A84C]" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <BlurText text="Our Impact in Numbers" highlightLast={2} inView centered stagger={0.12} />
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/[0.08]">
            {[
              { num: 18,  suffix: '+',  label: 'Strategic Hubs',  desc: 'Active research hubs worldwide' },
              { num: 600, suffix: '+',  label: 'PhD Analysts',    desc: 'Expert academic collaborators' },
              { num: 15,  suffix: '+',  label: 'Publications',    desc: 'Indexed in reputed journals' },
              { num: 92,  suffix: '%',  label: 'Success Rate',    desc: 'Manuscript acceptance rate' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="px-8 py-10 text-center group"
              >
                <div
                  className="text-5xl md:text-6xl font-bold mb-2 text-white num-stat"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  <Counter value={s.num} suffix={s.suffix} />
                </div>
                <div className="label-text text-[#C9A84C] mb-2">{s.label}</div>
                <p className="text-xs text-slate-600 leading-relaxed hidden md:block font-light">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CASE STUDIES PREVIEW
      ════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <SectionTitle subtitle="Selected Impact" title="Research Case Engagements" />
            <Link to="/research">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 text-[#0f365d] border border-[#0f365d]/20 bg-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:border-[#0f365d] transition-all shadow-sm mb-16 md:mb-0 shrink-0"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                Full Repository <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.slice(0, 2).map((study, i) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[440px] rounded-3xl overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.12)] border border-slate-100">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0.1) 0%, rgba(10,22,40,0.82) 100%)' }}
                  />

                  {/* Gold top accent */}
                  <div className="absolute top-0 left-8 right-8 h-0.5 bg-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <span
                      className="inline-block bg-[#C9A84C] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
                      style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                    >
                      {study.category}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {study.title}
                    </h3>
                    <p className="text-blue-100/70 text-sm line-clamp-2 mb-5 leading-relaxed">{study.problem}</p>
                    <div className="flex gap-2 flex-wrap">
                      {study.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="text-[10px] text-white/50 border border-white/15 px-2.5 py-1 rounded-lg font-semibold uppercase tracking-widest"
                          style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CTA SECTION
      ════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#F8F6F2]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0a2540 0%, #0f365d 60%, #163e6e 100%)' }}
          >
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/[0.02] border border-white/[0.05]" />
            <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-[#C9A84C]/[0.08] border border-[#C9A84C]/10" />
            <div className="absolute left-1/3 bottom-0 w-96 h-32 rounded-full bg-[#C9A84C]/[0.04] blur-2xl" />

            {/* Pulsing curved lines — ripple in from both edges */}
            <CurvedLines side="left" className="hidden md:block" color="rgba(252,250,248,0.22)" count={8} baseWidth={40} step={12} heightPct={55} />
            <CurvedLines side="right" className="hidden md:block" color="rgba(201,168,76,0.25)" count={8} baseWidth={40} step={12} heightPct={55} />

            {/* Grid */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-grid)" />
              </svg>
            </div>

            <div className="relative z-10 px-10 md:px-20 py-20 text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-8 bg-[#C9A84C]" />
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A84C]"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  Ready to Start?
                </span>
                <div className="h-px w-8 bg-[#C9A84C]" />
              </div>

              <h2
                className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.08]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                <BlurText
                  text="Lead the future of medical research."
                  highlightLast={2}
                  inView
                  centered
                  stagger={0.1}
                />
              </h2>

              <p className="text-elegant mb-12 max-w-xl mx-auto" style={{ color: 'rgba(191,219,254,0.6)' }}>
                Connect with BIR Research today for unrivaled biomedical insights and global scientific validation.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 16px 48px rgba(201,168,76,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#C9A84C] text-white px-10 py-4 rounded-xl font-semibold text-sm uppercase tracking-widest transition-shadow shadow-[0_8px_28px_rgba(201,168,76,0.25)]"
                    style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                  >
                    Consult an Analyst
                  </motion.button>
                </Link>
                <Link to="/research">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-xl font-semibold text-sm uppercase tracking-widest hover:bg-white/15 transition-all flex items-center gap-2 justify-center"
                    style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                  >
                    Review Portfolio <ArrowUpRight size={16} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
