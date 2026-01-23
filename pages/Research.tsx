
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Award, FileText } from 'lucide-react';
import { dataService } from '../services/dataService';
import { SectionTitle } from '../components/UI';

export const Research: React.FC = () => {
  const { caseStudies } = dataService.getData();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionTitle 
          subtitle="Scholarly Repository" 
          title="Published Research & Case Studies" 
        />

        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-start gap-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-[#0f365d] mb-1">15+</h4>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Indexed Publications</p>
            </div>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-start gap-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-[#0f365d]">4.2</h4>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Avg. Impact Factor</p>
            </div>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-start gap-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <BookOpen size={24} />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-[#0f365d]">100%</h4>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Methodological Approval</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl border border-white">
                <img src={study.image} alt={study.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f365d] via-[#0f365d]/40 to-transparent opacity-90"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-3xl font-bold text-white mb-2 leading-tight">{study.title}</h4>
                      <p className="text-blue-100/90 font-medium mb-4">{study.category}</p>
                    </div>
                    {study.link && (
                      <a 
                        href={study.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30 text-white hover:bg-white hover:text-[#0f365d] transition-all cursor-pointer shadow-lg"
                        title="Read Full Publication"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {study.tags.map(tag => (
                      <span key={tag} className="text-[10px] text-white/50 border border-white/20 px-2 py-1 rounded-md uppercase font-bold tracking-widest">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[10px] font-black text-blue-600 uppercase mb-3 tracking-widest">The Problem</div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{study.problem}</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[10px] font-black text-blue-600 uppercase mb-3 tracking-widest">Our Solution</div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{study.solution}</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[10px] font-black text-blue-600 uppercase mb-3 tracking-widest">Outcome</div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{study.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-slate-500 font-medium italic mb-6">"Our commitment is to absolute transparency and methodological rigor in every published work."</p>
          <div className="flex justify-center gap-4">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <div className="w-3 h-3 rounded-full bg-blue-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};