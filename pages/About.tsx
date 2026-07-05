
import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, Users, ShieldCheck, FileText,
  Search, Edit3, BarChart, UploadCloud,
  GraduationCap, Globe, UserCheck, Clipboard,
  Activity, Stethoscope
} from 'lucide-react';
import { SectionTitle, BlurText, CurvedLines } from '../components/UI';
import { useSEO, SITE_URL } from '../hooks/useSEO';

const expertise = [
  { title: 'Research Question Development', icon: Search,       n: '01' },
  { title: 'Protocol Structuring',          icon: FileText,     n: '02' },
  { title: 'Quality Assessment',            icon: CheckCircle2, n: '03' },
  { title: 'Manuscript Drafting & Editing', icon: Edit3,        n: '04' },
  { title: 'Statistical Synthesis',         icon: BarChart,     n: '05' },
  { title: 'Journal Selection & Submission',icon: UploadCloud,  n: '06' },
];

export const About: React.FC = () => {
  useSEO({
    title: 'About BIR Research — Our Mission, Team & Approach',
    description: 'Learn about BIR Research: a doctor-led research mentorship organization founded by Dr. Roshan. Discover our mission, ethical authorship principles, and structured research pipeline for IMGs and clinicians.',
    keywords: 'About BIR Research, Dr. Roshan, Research Mentorship Mission, ICMJE Authorship, Ethical Research, Medical Research India',
    canonical: '/about',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#webpage`,
      url: `${SITE_URL}/about`,
      name: 'About BIR Research | Our Mission & Team',
      description: 'Learn about BIR Research, its founding by Dr. Roshan, and our commitment to ethical, structured research mentorship.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
        ],
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F6F2]">

      {/* ═══════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#F8F6F2]">
        {/* Watermark */}
        <div
          className="absolute right-0 top-0 select-none pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="block font-bold leading-none text-[18vw] text-[#0f365d] opacity-[0.03]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            ABOUT
          </span>
        </div>

        {/* Gold glow */}
        <div
          className="absolute top-0 left-0 w-[500px] h-[400px] pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(ellipse at 20% 40%, rgba(201,168,76,0.2) 0%, transparent 65%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A84C]"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                Our Identity
              </span>
              <div className="h-px w-8 bg-[#C9A84C]" />
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold text-[#0a1628] leading-[1.04] mb-10"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              <BlurText
                text="Advancing Medicine Through Ethical Research"
                highlightLast={2}
                delay={0.1}
                stagger={0.12}
              />
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="space-y-5 text-elegant max-w-3xl"
            >
              <p>
                BIR (Biomedical & International Research) is a doctor-led research mentorship and collaboration
                organization dedicated to producing high-quality systematic reviews and meta-analyses.
              </p>
              <p>
                Founded by <span className="text-[#0f365d] font-medium">Dr. Roshan</span>, BIR combines clinical
                insight, structured academic guidance, and a transparent research workflow to help medical students,
                IMGs, and doctors contribute meaningfully to evidence-based medicine.
              </p>
            </motion.div>

            {/* Quote block */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-14 flex gap-6 items-stretch"
            >
              <div className="w-1 rounded-full bg-[#C9A84C] shrink-0 min-h-full" />
              <blockquote className="pull-quote">
                "We do real research — no ghost authorship, no outsourcing, no shortcuts."
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          EXPERTISE
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Our Expertise" title="Comprehensive Research Lifecycle" />

          <p className="body-text mb-14 max-w-2xl">
            BIR guides collaborators through focused, manageable academic tasks while ensuring every project
            maintains rigorous methodological standards.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {expertise.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="group flex items-center gap-5 p-6 bg-[#F8F6F2] rounded-2xl border border-slate-100 hover:bg-white hover:border-[#C9A84C]/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-all">
                  <div
                    className="text-3xl font-bold text-[#0f365d]/10 shrink-0 group-hover:text-[#C9A84C]/20 transition-colors leading-none"
                    style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                  >
                    {item.n}
                  </div>
                  <div className="w-10 h-10 bg-white text-[#0f365d] rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                    <item.icon size={20} />
                  </div>
                  <span className="font-semibold text-[#0a1628] text-sm">{item.title}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <div
              className="inline-flex items-center gap-2.5 bg-[#F8F6F2] border border-[#C9A84C]/25 px-5 py-3 rounded-full"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <p
                className="text-xs text-slate-500 font-semibold"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                Collaborators receive authorship based on ICMJE criteria
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          OUR APPROACH  (dark)
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0a1628] text-white relative overflow-hidden">
        {/* Dots */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="about-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-dots)" />
          </svg>
        </div>

        <div className="absolute top-0 right-1/4 w-[400px] h-[200px] pointer-events-none opacity-10"
             style={{ background: 'radial-gradient(ellipse, #C9A84C 0%, transparent 70%)' }} />

        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle subtitle="Methodology" title="How We Bridge Clinical Expertise & Academic Rigor" light />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {[
              { title: 'Clinical Expertise',     icon: Stethoscope, desc: 'Led by practitioners who understand the medical landscape and its real-world constraints.' },
              { title: 'Transparent Mentorship', icon: Users,       desc: 'Step-by-step guidance through every phase of the research pipeline.' },
              { title: 'Ethical Authorship',     icon: ShieldCheck, desc: 'Strict adherence to ICMJE guidelines for every contributor.' },
              { title: 'Structured Pipeline',    icon: Activity,    desc: 'A start-to-finish research system optimized for quality and speed.' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-6 bg-white/[0.04] border border-white/[0.07] rounded-2xl h-full hover:bg-white/[0.08] hover:border-[#C9A84C]/20 transition-all">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#C9A84C] mb-5 group-hover:bg-[#C9A84C]/10 transition-colors">
                    <item.icon size={24} />
                  </div>
                  <h4 className="text-base font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                  <p className="body-text text-slate-500 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 p-8 bg-white/[0.04] border border-white/[0.07] rounded-2xl"
          >
            <div className="flex gap-4">
              <div className="w-1 rounded-full bg-[#C9A84C] shrink-0" />
              <p className="text-slate-400 text-base leading-relaxed font-light">
                Each project is planned with academic integrity and long-term credibility in mind. Our aim is not just
                publication — but skill-building, enabling participants to understand how real systematic reviews are
                created and completed.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TRACK RECORD & COMMUNITY
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#F8F6F2]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Track Record */}
            <div>
              <SectionTitle subtitle="Our Impact" title="Proven Track Record" />
              <p className="body-text mb-10">
                BIR has successfully completed and published systematic reviews in reputable indexed journals,
                with ongoing projects across cardiology, nephrology, orthopedics, public health, and AI in medicine.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Methodological Rigor',
                  'Ethical Collaboration',
                  'High-Quality Outputs',
                  'Consistent Pipeline',
                ].map(stat => (
                  <div
                    key={stat}
                    className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-[#C9A84C]/30 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full shrink-0" />
                    <span
                      className="font-semibold text-xs text-[#0a1628] uppercase tracking-wide"
                      style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                    >
                      {stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who We Work With */}
            <div>
              <SectionTitle subtitle="Our Community" title="Who We Work With" />
              <div className="grid grid-cols-2 gap-5">
                {[
                  { title: 'Medical Students', icon: GraduationCap },
                  { title: 'IMGs',             icon: Globe },
                  { title: 'Residents',         icon: UserCheck },
                  { title: 'Clinicians',        icon: Clipboard },
                ].map(profile => (
                  <motion.div
                    key={profile.title}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#C9A84C]/30 transition-all"
                  >
                    <div className="w-10 h-10 bg-[#F8F6F2] text-[#0f365d] rounded-xl flex items-center justify-center mb-4 border border-slate-100">
                      <profile.icon size={20} />
                    </div>
                    <p className="font-bold text-[#0a1628]">{profile.title}</p>
                  </motion.div>
                ))}
              </div>
              <p className="mt-8 text-slate-400 text-sm italic font-light leading-relaxed">
                Our focus is on individuals who value structured mentorship, real contribution, and long-term
                academic credibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          VISION  (dark)
      ════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#0a2540] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="vision-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vision-dots)" />
          </svg>
        </div>

        {/* Gold glow */}
        <div
          className="absolute inset-x-0 top-0 h-[200px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.4) 0%, transparent 60%)' }}
        />

        {/* Pulsing curved lines — ripple in from both edges */}
        <CurvedLines side="left" className="hidden md:block" color="rgba(252,250,248,0.18)" count={8} baseWidth={44} step={13} heightPct={55} />
        <CurvedLines side="right" className="hidden md:block" color="rgba(201,168,76,0.22)" count={8} baseWidth={44} step={13} heightPct={55} />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A84C]"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                Our Vision
              </span>
              <div className="h-px w-8 bg-[#C9A84C]" />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-12 leading-[1.08]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Building a <em className="gold-italic">Global</em> Research Ecosystem
            </motion.h2>

            <motion.blockquote
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="pull-quote border-t border-white/10 pt-10"
              style={{ color: 'rgba(148,163,184,0.75)' }}
            >
              "To build a global ecosystem where medical trainees and doctors can learn, contribute, and publish in
              an environment that is ethical, structured, and academically sound — without the confusion, exploitation,
              or misinformation often found in the research ecosystem."
            </motion.blockquote>

            <div className="mt-12 flex items-center justify-center gap-2">
              <div className="w-6 h-px bg-[#C9A84C]" />
              <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              <div className="w-6 h-px bg-[#C9A84C]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
