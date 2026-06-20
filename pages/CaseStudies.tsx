
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChevronRight, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { SectionTitle } from '../components/UI';
import { useSEO, SITE_URL } from '../hooks/useSEO';

export const CaseStudies: React.FC = () => {
  const { upcomingPapers } = dataService.getData();

  useSEO({
    title: 'Open Research Opportunities — Enroll as a Collaborator',
    description: 'Explore active research opportunities at BIR Research. Enroll as a collaborator on ongoing systematic reviews and meta-analyses across cardiology, nephrology, public health, and more. Earn authorship through real contribution.',
    keywords: 'Research Collaboration Opportunity, Enroll Research, IMG Research Opportunity, Medical Student Research, Systematic Review Collaborator, Open Research Enrollment',
    canonical: '/case-studies',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/case-studies#webpage`,
      url: `${SITE_URL}/case-studies`,
      name: 'Open Research Opportunities | BIR Research',
      description: 'Active research enrollment opportunities at BIR Research for IMGs, medical students, and clinicians.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
        ],
      },
      mainEntity: {
        '@type': 'ItemList',
        name: 'Open Research Enrollment Opportunities',
        numberOfItems: (upcomingPapers || []).length,
        itemListElement: (upcomingPapers || []).map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.title,
          description: p.description,
          url: `${SITE_URL}/enroll/${p.id}`,
        })),
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F6F2]">

      {/* ─── Header ─── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute right-0 top-0 select-none pointer-events-none" aria-hidden="true">
          <span
            className="block font-bold leading-none text-[12vw] text-[#0f365d] opacity-[0.03]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            OPEN
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle subtitle="Join Our Network" title="Active Research Opportunities" />
        </div>
      </section>

      {/* ─── Open enrollment ─── */}
      <section className="pb-28 bg-[#F8F6F2]">
        <div className="container mx-auto px-6 max-w-5xl">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 bg-[#0f365d] text-white rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(15,54,93,0.2)]">
              <Clock size={18} />
            </div>
            <h3
              className="text-xl font-bold text-[#0a1628]"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              Open Enrollment
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {(upcomingPapers || []).map((paper, idx) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <div className="bg-white border border-slate-100 rounded-3xl p-8 h-full flex flex-col shadow-sm hover:shadow-[0_12px_48px_rgba(0,0,0,0.09)] hover:border-[#C9A84C]/20 transition-all group">
                  {/* Top badges */}
                  <div className="flex justify-between items-start mb-6">
                    <span
                      className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                      style={{
                        background: 'rgba(201,168,76,0.09)',
                        borderColor: 'rgba(201,168,76,0.28)',
                        color: '#856F1C',
                        fontFamily: 'Space Grotesk, Inter, sans-serif',
                      }}
                    >
                      {paper.domain}
                    </span>
                    <span
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        paper.status === 'Recruiting'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-orange-50 text-orange-700 border border-orange-200'
                      }`}
                      style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                    >
                      {paper.status}
                    </span>
                  </div>

                  {/* Gold accent */}
                  <div className="h-0.5 w-8 bg-[#C9A84C] mb-5 rounded-full group-hover:w-16 transition-all" />

                  <h4
                    className="text-xl font-bold text-[#0a1628] mb-4 leading-tight flex-none tracking-tight"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {paper.title}
                  </h4>
                  <p className="body-text mb-7 flex-grow">
                    {paper.description}
                  </p>

                  {/* Meta info */}
                  <div className="space-y-2.5 mb-7 bg-[#F8F6F2] p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Users size={13} className="text-slate-400 shrink-0" />
                      <span
                        className="text-xs font-semibold text-slate-500"
                        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                      >
                        {paper.spots} Collaborator Spots Left
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bookmark size={13} className="text-slate-400 shrink-0" />
                      <span
                        className="text-xs font-semibold text-slate-500"
                        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                      >
                        Required: {paper.requiredBackground}
                      </span>
                    </div>
                  </div>

                  <Link to={`/enroll/${paper.id}`} className="block">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#0f365d] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1a4a7a] transition-colors flex items-center justify-center gap-2 text-sm shadow-[0_4px_16px_rgba(15,54,93,0.18)]"
                      style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                    >
                      Enroll as Collaborator <ChevronRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 rounded-3xl overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, #0a2540 0%, #0f365d 100%)' }}
          >
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="cta-cs-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cta-cs-dots)" />
              </svg>
            </div>

            <div className="relative z-10 p-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-6 bg-[#C9A84C]" />
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  Propose a Study
                </span>
                <div className="h-px w-6 bg-[#C9A84C]" />
              </div>

              <h4
                className="text-2xl font-bold text-white mb-3 tracking-tight"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Don't see a project in <em className="gold-italic">your field?</em>
              </h4>
              <p className="body-text mb-7 max-w-2xl mx-auto" style={{ color: 'rgba(147,197,253,0.55)' }}>
                We are constantly launching new research initiatives across various medical domains. Contact us
                directly to propose a study or join our notification list.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 12px 36px rgba(201,168,76,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#C9A84C] text-white px-8 py-3.5 rounded-xl font-semibold text-sm uppercase tracking-widest transition-shadow shadow-[0_6px_20px_rgba(201,168,76,0.2)]"
                  style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                >
                  Submit Research Proposal
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
