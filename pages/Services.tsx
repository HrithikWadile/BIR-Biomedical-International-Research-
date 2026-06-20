
import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, ShieldCheck, Globe, CheckCircle2,
  ArrowRight, Target, FileText, Search, Users,
  GraduationCap, ClipboardCheck, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { SectionTitle } from '../components/UI';
import { useSEO, SITE_URL } from '../hooks/useSEO';

const iconMap: Record<string, any> = {
  Search, GraduationCap, Users, ShieldCheck
};

const serviceImgs = [
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=1200',
  'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200',
];

export const Services: React.FC = () => {
  const { services } = dataService.getData();

  useSEO({
    title: 'Research Services — Systematic Reviews, Meta-Analysis & Mentorship',
    description: 'BIR Research offers comprehensive services: systematic reviews, meta-analyses, research mentorship for IMGs and trainees, institutional collaborations, and full journal submission support.',
    keywords: 'Systematic Review Service, Meta-Analysis Support, Research Mentorship, IMG Research, Medical Journal Submission, Protocol Structuring, Manuscript Drafting',
    canonical: '/services',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/services#webpage`,
      url: `${SITE_URL}/services`,
      name: 'BIR Research Services | Systematic Reviews, Meta-Analysis & Mentorship',
      description: 'Comprehensive medical research services including systematic reviews, meta-analyses, and structured mentorship programs.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        ],
      },
      mainEntity: services.map((s, i) => ({
        '@type': 'Service',
        position: i + 1,
        name: s.title,
        description: s.description,
        provider: { '@id': `${SITE_URL}/#organization` },
        serviceType: 'Medical Research',
        areaServed: 'Worldwide',
      })),
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F6F2]">

      {/* ─── Page header ─── */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#F8F6F2]">
        {/* Watermark */}
        <div className="absolute right-0 top-0 select-none pointer-events-none" aria-hidden="true">
          <span
            className="block font-bold leading-none text-[16vw] text-[#0f365d] opacity-[0.03]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            SERVICES
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle
            subtitle="Our Capabilities"
            title="Advanced Scientific Methodologies"
            centered
          />
        </div>
      </section>

      {/* ─── Service alternating rows ─── */}
      <section className="pb-24 bg-[#F8F6F2]">
        <div className="container mx-auto px-6">
          <div className="space-y-28">
            {services.map((service, idx) => {
              const Icon  = iconMap[service.icon] || Globe;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}
                >
                  {/* Visual */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative group">
                      {/* Gold offset border */}
                      <div className={`absolute -inset-3 rounded-3xl border border-[#C9A84C]/20 ${isEven ? '-rotate-1' : 'rotate-1'}`} />

                      <div className="relative rounded-3xl overflow-hidden aspect-video shadow-[0_16px_56px_rgba(15,54,93,0.15)]">
                        <img
                          src={serviceImgs[idx]}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Navy overlay */}
                        <div
                          className="absolute inset-0"
                          style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0.05) 0%, rgba(10,22,40,0.35) 100%)' }}
                        />

                        {/* Number label */}
                        <div
                          className="absolute top-4 left-4 text-7xl font-black text-white/[0.08] leading-none select-none"
                          style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="w-full lg:w-1/2 space-y-7">
                    {/* Gold accent + number */}
                    <div className="flex items-center gap-4">
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] border border-[#C9A84C]/30 px-3 py-1.5 rounded-full bg-[#C9A84C]/8"
                        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif', background: 'rgba(201,168,76,0.08)' }}
                      >
                        {String(idx + 1).padStart(2, '0')} — Service
                      </span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-[#0f365d] text-white rounded-2xl flex items-center justify-center shadow-[0_8px_24px_rgba(15,54,93,0.25)] shrink-0">
                        <Icon size={28} />
                      </div>
                      <h3
                        className="text-3xl md:text-4xl font-bold leading-tight heading-gradient"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-elegant">{service.longDescription}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm hover:border-[#C9A84C]/25 transition-colors">
                          <CheckCircle2 className="text-[#C9A84C] shrink-0 mt-0.5" size={16} />
                          <span className="text-slate-700 text-xs font-medium leading-snug">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Link to="/contact">
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 12px 36px rgba(15,54,93,0.25)' }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-[#0f365d] text-white px-7 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2.5 shadow-[0_6px_20px_rgba(15,54,93,0.2)] transition-shadow"
                        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                      >
                        Inquire About This Service <ArrowRight size={16} />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Core commitments ─── */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="Professional Standards" title="Our Core Commitments" centered />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {[
              {
                title: 'Ethical Collaboration',
                icon: ShieldCheck,
                desc: 'We prioritize contribution-based authorship. We do not offer ghostwriting or guaranteed authorship without significant academic involvement.',
              },
              {
                title: 'Doctor-Led Oversight',
                icon: ClipboardCheck,
                desc: 'Every project is supervised by clinicians who ensure clinical relevance and high methodological standards.',
              },
              {
                title: 'Academic Credibility',
                icon: Award,
                desc: 'Our focus is on long-term academic reputation through completion of publishable, high-impact research.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="group p-8 bg-[#F8F6F2] rounded-2xl border border-slate-100 hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.07)] hover:border-[#C9A84C]/20 transition-all h-full">
                  <div className="h-0.5 w-8 bg-[#C9A84C] mb-6 rounded-full group-hover:w-16 transition-all" />
                  <div className="w-11 h-11 bg-white text-[#0f365d] rounded-xl flex items-center justify-center mb-5 shadow-sm border border-slate-100">
                    <item.icon size={22} />
                  </div>
                  <h4 className="text-lg font-bold text-[#0a1628] mb-3 tracking-tight">{item.title}</h4>
                  <p className="body-text text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Research pipeline ─── */}
      <section className="py-24 bg-[#0a1628] relative overflow-hidden">
        {/* Dots */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="pipeline-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pipeline-dots)" />
          </svg>
        </div>

        {/* Gold glow */}
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[300px] pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(ellipse, #C9A84C 0%, transparent 65%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A84C]"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                Research Pipeline
              </span>
              <div className="h-px w-8 bg-[#C9A84C]" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-5"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Our Research <em className="gold-italic">Pipeline</em>
            </h2>
            <p className="body-text text-slate-500">
              We manage the entire scientific lifecycle, ensuring every manuscript produced under the BIR umbrella
              meets international peer-review standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-white/[0.06]" />

            {[
              { step: '01', title: 'Conceptualization', icon: Target,    desc: 'PICO framework development & protocol registration.' },
              { step: '02', title: 'Synthesis',         icon: FileText,  desc: 'Systematic searching, screening, & data extraction.' },
              { step: '03', title: 'Analysis',          icon: BarChart3, desc: 'Quality assessment & statistical meta-analysis.' },
              { step: '04', title: 'Submission',        icon: Globe,     desc: 'Manuscript drafting & ethical journal placement.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="relative z-10"
              >
                <div className="group p-8 hover:bg-white/[0.05] transition-all rounded-2xl">
                  {/* Step bubble */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-lg font-bold border border-white/10 bg-white/[0.04] group-hover:border-[#C9A84C]/30 group-hover:text-[#C9A84C] transition-all text-slate-500"
                    style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                  >
                    {item.step}
                  </div>
                  <item.icon className="text-[#C9A84C] mb-4" size={28} />
                  <h4 className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</h4>
                  <p className="body-text text-sm text-slate-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
