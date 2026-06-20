
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Award, FileText } from 'lucide-react';
import { dataService } from '../services/dataService';
import { SectionTitle } from '../components/UI';
import { useSEO, SITE_URL } from '../hooks/useSEO';

export const Research: React.FC = () => {
  const { caseStudies } = dataService.getData();

  useSEO({
    title: 'Published Research — Systematic Reviews & Case Studies',
    description: 'Browse BIR Research\'s portfolio of published systematic reviews and meta-analyses. 15+ indexed publications with a 4.2 average impact factor across cardiology, nephrology, orthopedics, and more.',
    keywords: 'BIR Research Publications, Published Systematic Reviews, Meta-Analysis Portfolio, Medical Research Case Studies, Indexed Journals, Impact Factor',
    canonical: '/research',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/research#webpage`,
      url: `${SITE_URL}/research`,
      name: 'Published Research | BIR Research Case Studies',
      description: 'Portfolio of published systematic reviews and meta-analyses by BIR Research.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Research', item: `${SITE_URL}/research` },
        ],
      },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: caseStudies.length,
        itemListElement: caseStudies.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.title,
          description: s.problem,
          url: s.link || `${SITE_URL}/research`,
        })),
      },
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F6F2]">

      {/* ─── Header ─── */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute right-0 top-0 select-none pointer-events-none" aria-hidden="true">
          <span
            className="block font-bold leading-none text-[14vw] text-[#0f365d] opacity-[0.03]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            RESEARCH
          </span>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle subtitle="Scholarly Repository" title="Published Research & Case Studies" />

          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: FileText, value: '15+', label: 'Indexed Publications' },
              { icon: Award,    value: '4.2', label: 'Avg. Impact Factor'  },
              { icon: BookOpen, value: '100%', label: 'Methodological Approval' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm flex items-center gap-5 hover:border-[#C9A84C]/25 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 bg-[#F8F6F2] text-[#0f365d] rounded-xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#0f365d] group-hover:text-white transition-all">
                    <s.icon size={22} />
                  </div>
                  <div>
                    <p
                      className="text-3xl font-bold text-[#0f365d]"
                      style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                    >
                      {s.value}
                    </p>
                    <p
                      className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5"
                      style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                    >
                      {s.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Case study gallery ─── */}
      <section className="pb-28 bg-[#F8F6F2]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {caseStudies.map((study, i) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group"
              >
                {/* Image card */}
                <div className="relative h-[380px] rounded-3xl overflow-hidden mb-5 shadow-[0_12px_48px_rgba(0,0,0,0.12)] border border-slate-100">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0.08) 0%, rgba(10,22,40,0.88) 100%)' }}
                  />

                  {/* Gold top line on hover */}
                  <div className="absolute top-0 left-8 right-8 h-0.5 bg-[#C9A84C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <p
                          className="text-[10px] text-[#C9A84C] font-bold uppercase tracking-[0.25em] mb-2"
                          style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                        >
                          {study.category}
                        </p>
                        <h4
                          className="text-2xl font-bold text-white leading-tight mb-2 tracking-tight"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {study.title}
                        </h4>
                      </div>
                      {study.link && (
                        <a
                          href={study.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/15 backdrop-blur-md p-2.5 rounded-xl border border-white/20 text-white hover:bg-[#C9A84C] hover:border-[#C9A84C] transition-all cursor-pointer shadow-lg ml-4 shrink-0"
                          title="Read Full Publication"
                          onClick={e => e.stopPropagation()}
                        >
                          <ExternalLink size={17} />
                        </a>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap">
                      {study.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-[9px] text-white/40 border border-white/15 px-2 py-0.5 rounded-md font-bold uppercase tracking-widest"
                          style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detail cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'The Problem', content: study.problem },
                    { label: 'Our Solution', content: study.solution },
                    { label: 'Outcome',     content: study.outcome },
                  ].map(card => (
                    <div
                      key={card.label}
                      className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:shadow-md hover:border-[#C9A84C]/20 transition-all"
                    >
                      <p
                        className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-widest mb-2"
                        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                      >
                        {card.label}
                      </p>
                      <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3 font-light">
                        {card.content}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-20 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-12 h-px bg-[#C9A84C]" />
              <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
              <div className="w-12 h-px bg-[#C9A84C]" />
            </div>
            <p className="pull-quote max-w-xl mx-auto" style={{ color: '#94A3B8', fontSize: '1.05rem' }}>
              "Our commitment is to absolute transparency and methodological rigor in every published work."
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
