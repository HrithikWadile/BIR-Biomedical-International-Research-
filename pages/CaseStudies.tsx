
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChevronRight, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { SectionTitle, GlassCard } from '../components/UI';

export const CaseStudies: React.FC = () => {
  const { upcomingPapers } = dataService.getData();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionTitle 
          subtitle="Join Our Network" 
          title="Active Research Opportunities" 
        />

        {/* Upcoming Papers / Research Opportunities */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg">
              <Clock size={20} />
            </div>
            <h3 className="text-2xl font-bold text-[#0f365d]">Open Enrollment</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {(upcomingPapers || []).map((paper) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-8 border-blue-100 hover:shadow-2xl transition-all h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">
                      {paper.domain}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      paper.status === 'Recruiting' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {paper.status}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold text-[#0f365d] mb-4 leading-tight">{paper.title}</h4>
                  <p className="text-slate-600 mb-6 flex-grow leading-relaxed font-medium">
                    {paper.description}
                  </p>
                  
                  <div className="space-y-3 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                      <Users size={14} />
                      <span>{paper.spots} Collaborator Spots Left</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                      <Bookmark size={14} />
                      <span>Required: {paper.requiredBackground}</span>
                    </div>
                  </div>

                  <Link to={`/enroll/${paper.id}`} className="block">
                    <button className="w-full bg-[#0f365d] text-white font-bold py-4 rounded-xl hover:bg-[#1a4a7a] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                      Enroll as Collaborator <ChevronRight size={18} />
                    </button>
                  </Link>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-blue-900 rounded-[2.5rem] text-white text-center">
            <h4 className="text-2xl font-bold mb-4">Don't see a project in your field?</h4>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">We are constantly launching new research initiatives across various medical domains. Contact us directly to propose a study or join our notification list.</p>
            <Link to="/contact">
              <button className="bg-white text-blue-900 px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-blue-50 transition-all">
                Submit Research Proposal
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
