
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, Globe, Zap, Users2, GraduationCap, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { SectionTitle, GlassCard } from '../components/UI';

const iconMap: Record<string, any> = {
  TrendingUp: BarChart3,
  Beaker: ShieldCheck,
  BarChart: Globe
};

export const Home: React.FC = () => {
  const { settings, services, caseStudies } = dataService.getData();

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-white to-[#eef2ff]"></div>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#0f365d] rounded-full blur-[160px] opacity-[0.08]"></div>
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-40"></div>
          {/* Using a highly stable direct Unsplash source */}
          <img 
            src="https://images.unsplash.com/photo-1532187863486-abf9bdad1b4c?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-[0.03] mix-blend-overlay"
            alt="Medical Scientific Pattern"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center space-x-2 bg-[#0f365d]/10 text-[#0f365d] px-4 py-1.5 rounded-full text-xs font-bold mb-8 border border-[#0f365d]/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <span className="uppercase tracking-widest">Doctor-Led Research Mentorship</span>
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold text-[#0f365d] mb-8 leading-[1.05] tracking-tight">
              {settings.tagline}
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl font-medium">
              {settings.heroText}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/about">
                <button className="bg-[#0f365d] text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#1a4a7a] transition-all shadow-xl shadow-blue-900/10 active:scale-95 text-center">
                  Learn Our Method
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-10 py-5 rounded-xl font-bold text-[#0f365d] border-2 border-[#0f365d]/20 hover:border-[#0f365d] hover:bg-slate-50 transition-all text-lg w-full text-center">
                  Research Inquiry
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 p-4 bg-white/40 backdrop-blur-sm border border-white/60 rounded-[2.5rem] shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200" 
                className="rounded-[2rem] shadow-inner w-full aspect-[4/5] object-cover" 
                alt="Biomedical Research Professional" 
                loading="eager"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl border border-slate-100 shadow-2xl max-w-[280px]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#0f365d]/10 text-[#0f365d] rounded-xl flex items-center justify-center">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-[#0f365d]">Insight Velocity</div>
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Real-time clinical data synthesis for rapid strategic deployment.
                </p>
              </div>
            </div>
            <div className="absolute -z-10 -top-10 -left-10 w-full h-full border-2 border-[#0f365d]/10 rounded-[2.5rem]"></div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Mission Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#0f365d] leading-tight tracking-tight">
                Empowering the Next Generation of Medical Researchers
              </h2>
              <div className="prose prose-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  Led by <span className="text-[#0f365d] font-bold">Dr. Roshan</span>, BIR manages study design, manuscript drafting, analysis, and journal submission—allowing collaborators to focus on learning how real, publishable research is conducted, under mentorship and clear authorship guidelines.
                </p>
                <p>
                  We also collaborate with institutions and senior consultants on selected projects, ensuring high methodological standards across every systematic review and meta-analysis we undertake.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0f365d] shrink-0 border border-slate-100">
                    <Microscope size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f365d]">Real Research</h4>
                    <p className="text-sm text-slate-500">No shortcuts or outsourcing—just rigorous academic work.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0f365d] shrink-0 border border-slate-100">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0f365d]">Clear Mentorship</h4>
                    <p className="text-sm text-slate-500">Structured roles designed for skill acquisition.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-10 border-blue-100/50 bg-white shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-[#0f365d] text-white rounded-lg flex items-center justify-center">
                    <Users2 size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0f365d]">Our Community Focus</h3>
                </div>
                <ul className="space-y-6">
                  <li className="flex items-center gap-4 text-slate-700 font-semibold group">
                    <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                    International Medical Graduates (IMGs)
                  </li>
                  <li className="flex items-center gap-4 text-slate-700 font-semibold group">
                    <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                    Early-career Clinicians & Residents
                  </li>
                  <li className="flex items-center gap-4 text-slate-700 font-semibold group">
                    <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                    Medical Students & Academic Aspirants
                  </li>
                  <li className="flex items-center gap-4 text-slate-700 font-semibold group">
                    <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                    Senior Consultants & Institutions
                  </li>
                </ul>
                <div className="mt-10 pt-8 border-t border-slate-100">
                   <p className="text-sm text-slate-500 italic">
                     "BIR is a doctor-led research mentorship and collaboration organization specializing in systematic reviews and meta-analyses."
                   </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <SectionTitle 
            subtitle="Global Domain Expertise" 
            title="Scientific Innovation Meets Strategic Rigor" 
            centered 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, idx) => {
              const Icon = iconMap[service.icon] || BarChart3;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/services#${service.id}`} className="block group h-full">
                    <div className="bg-slate-50 border border-slate-100 p-10 h-full rounded-[2rem] transition-all group-hover:bg-white group-hover:shadow-2xl group-hover:border-[#0f365d]/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-150 transition-transform">
                         <Icon size={120} />
                      </div>
                      <div className="w-16 h-16 bg-[#0f365d] text-white rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110 shadow-lg shadow-blue-900/20">
                        <Icon size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-[#0f365d]">{service.title}</h3>
                      <p className="text-slate-500 leading-relaxed mb-10 font-medium">
                        {service.description}
                      </p>
                      <div className="flex items-center text-[#0f365d] font-black text-sm uppercase tracking-widest gap-2">
                        <span>Analysis Details</span>
                        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section with Brand Color */}
      <section className="py-24 bg-[#0f365d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-6xl font-black mb-3 tracking-tighter">18+</div>
              <div className="text-blue-200 text-xs uppercase tracking-[0.2em] font-black">Strategic Hubs</div>
            </div>
            <div>
              <div className="text-6xl font-black mb-3 tracking-tighter">600+</div>
              <div className="text-blue-200 text-xs uppercase tracking-[0.2em] font-black">PhD Analysts</div>
            </div>
            <div>
              <div className="text-6xl font-black mb-3 tracking-tighter">2.4B</div>
              <div className="text-blue-200 text-xs uppercase tracking-[0.2em] font-black">Datapoints</div>
            </div>
            <div>
              <div className="text-6xl font-black mb-3 tracking-tighter">92%</div>
              <div className="text-blue-200 text-xs uppercase tracking-[0.2em] font-black">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <SectionTitle subtitle="Strategic Impact" title="Selected Case Engagements" />
            </div>
            <Link to="/case-studies">
              <button className="bg-white text-[#0f365d] border border-[#0f365d]/20 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-3">
                Full Repository <ArrowRight size={18} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {caseStudies.slice(0, 2).map((study) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative h-[480px] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl border border-white">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f365d] via-[#0f365d]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                      {study.category}
                    </span>
                    <h3 className="text-4xl font-bold text-white mb-4 leading-tight">{study.title}</h3>
                    <p className="text-blue-100/80 line-clamp-2 font-medium mb-6">
                      {study.problem}
                    </p>
                    <div className="flex gap-3">
                      {study.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] text-white/60 font-bold uppercase tracking-widest border border-white/20 px-3 py-1 rounded-lg">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto bg-[#0f365d] rounded-[4rem] p-16 md:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 opacity-[0.05] -mr-20 -mt-20">
               <svg width="400" height="400" viewBox="0 0 100 100" fill="white">
                  <path d="M50 20v60M40 30c0 0 5-5 10-5s10 5 10 5-5 10-10 10-10 5-10 5 5 10 10 10 10-5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
               </svg>
            </div>

            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-[1.1] tracking-tight">Lead the future of research.</h2>
              <p className="text-blue-100 text-xl mb-14 max-w-2xl mx-auto font-medium">Connect with BIR Research today for unrivaled biomedical insights and global scientific validation.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/contact">
                  <button className="bg-white text-[#0f365d] px-12 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-2xl active:scale-95 uppercase tracking-widest text-center">
                    Consult an Analyst
                  </button>
                </Link>
                <Link to="/research">
                  <button className="bg-transparent text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all uppercase tracking-widest text-center">
                    Review Portfolio
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
