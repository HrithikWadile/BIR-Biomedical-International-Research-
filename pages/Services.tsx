
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  ArrowRight,
  Target,
  FileText,
  Search,
  Users,
  GraduationCap,
  ClipboardCheck,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { SectionTitle, GlassCard } from '../components/UI';

const iconMap: Record<string, any> = {
  Search: Search,
  GraduationCap: GraduationCap,
  Users: Users,
  ShieldCheck: ShieldCheck
};

export const Services: React.FC = () => {
  const { services } = dataService.getData();
  const serviceImgs = [
    'https://picsum.photos/seed/service0/1200/675',
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1200',
    'https://picsum.photos/seed/service2/1200/675',
    'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200'
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionTitle 
          subtitle="Our Capabilities" 
          title="Advanced Scientific Methodologies" 
          centered
        />

        <div className="grid grid-cols-1 gap-24 mt-16">
          {services.map((service, idx) => {
            const Icon = iconMap[service.icon] || Globe;
            const isEven = idx % 2 === 0;

            return (
              <motion.div 
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:flex-row items-center gap-16 ${isEven ? '' : 'lg:flex-row-reverse'}`}
              >
                {/* Visual Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 opacity-10"></div>
                    <GlassCard className="p-2 border-slate-200 shadow-2xl relative z-10">
                      <img
                        src={serviceImgs[idx]}
                        alt={service.title}
                        className="rounded-[2.5rem] w-full aspect-video object-cover"
                      />
                    </GlassCard>
                  </div>
                </div>

                {/* Text Side */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#0f365d] text-white rounded-2xl flex items-center justify-center shadow-xl">
                      <Icon size={32} />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#0f365d] leading-tight">{service.title}</h3>
                  </div>
                  
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    {service.longDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <CheckCircle2 className="text-blue-500 shrink-0" size={18} />
                        <span className="font-bold text-slate-700 text-xs md:text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <Link to="/contact">
                      <button className="bg-[#0f365d] text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-[#1a4a7a] transition-all shadow-lg active:scale-95">
                        Inquire About This Service <ArrowRight size={20} />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Our Commitment Section */}
        <section className="mt-40">
          <SectionTitle subtitle="Professional Standards" title="Our Core Commitments" centered />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { 
                title: "Ethical Collaboration", 
                icon: ShieldCheck, 
                desc: "We prioritize contribution-based authorship. We do not offer ghostwriting or guaranteed authorship without significant academic involvement." 
              },
              { 
                title: "Doctor-Led Oversight", 
                icon: ClipboardCheck, 
                desc: "Every project is supervised by clinicians who ensure clinical relevance and high methodological standards." 
              },
              { 
                title: "Academic Credibility", 
                icon: Award, 
                desc: "Our focus is on long-term academic reputation through completion of publishable, high-impact research." 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-6">
                  <item.icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-[#0f365d] mb-4">{item.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Global Pipeline Section */}
        <section className="mt-32 bg-[#0f365d] rounded-[4rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Research Pipeline</h2>
              <p className="text-blue-100/80 text-lg font-medium">
                We manage the entire scientific lifecycle, ensuring every manuscript produced under the BIR umbrella meets international peer-review standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Conceptualization", icon: Target, desc: "PICO framework development & protocol registration." },
                { step: "02", title: "Synthesis", icon: FileText, desc: "Systematic searching, screening, & data extraction." },
                { step: "03", title: "Analysis", icon: BarChart3, desc: "Quality assessment & statistical meta-analysis." },
                { step: "04", title: "Submission", icon: Globe, desc: "Manuscript drafting & ethical journal placement." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm group hover:bg-white/10 transition-all">
                  <div className="text-4xl font-black text-blue-500/30 mb-4 group-hover:text-blue-400 transition-colors">{item.step}</div>
                  <item.icon className="text-blue-400 mb-4" size={32} />
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-blue-100/60 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
