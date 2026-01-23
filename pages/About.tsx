
import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Target, 
  Users, 
  ShieldCheck, 
  FileText, 
  Search, 
  Edit3, 
  BarChart, 
  UploadCloud,
  GraduationCap,
  Globe,
  UserCheck,
  Clipboard,
  Activity,
  Stethoscope
} from 'lucide-react';
import { SectionTitle, GlassCard } from '../components/UI';

export const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-24">
        <div className="max-w-4xl">
          <SectionTitle 
            subtitle="Our Identity" 
            title="Advancing Medicine Through Ethical Research" 
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg text-slate-600 font-medium leading-relaxed space-y-6 max-w-none"
          >
            <p className="text-xl text-slate-700">
              BIR (Biomedical & International Research) is a doctor-led research mentorship and collaboration organization dedicated to producing high-quality systematic reviews and meta-analyses.
            </p>
            <p>
              Founded by <span className="text-[#0f365d] font-bold">Dr. Roshan</span>, BIR combines clinical insight, structured academic guidance, and a transparent research workflow to help medical students, IMGs, and doctors contribute meaningfully to evidence-based medicine.
            </p>
            <div className="bg-[#0f365d] text-white p-8 rounded-3xl mt-12 border-l-8 border-blue-500 shadow-2xl">
              <p className="text-2xl font-black italic m-0">"We do real research—no ghost authorship, no outsourcing, no shortcuts."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <SectionTitle 
            subtitle="Our Expertise" 
            title="Comprehensive Research Lifecycle" 
          />
          <p className="text-slate-600 mb-12 max-w-2xl font-medium">
            BIR guides collaborators through focused, manageable academic tasks while ensuring every project maintains rigorous methodological standards. Our core team handles the complex components of each project:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Research Question Development", icon: Search },
              { title: "Protocol Structuring", icon: FileText },
              { title: "Quality Assessment", icon: CheckCircle2 },
              { title: "Manuscript Drafting & Editing", icon: Edit3 },
              { title: "Statistical Synthesis", icon: BarChart },
              { title: "Journal Selection & Submission", icon: UploadCloud }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 bg-white text-[#0f365d] rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <item.icon size={24} />
                  </div>
                  <span className="font-bold text-[#0f365d]">{item.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-12 text-sm text-slate-500 font-bold uppercase tracking-widest bg-blue-50 px-6 py-3 rounded-full inline-block border border-blue-100">
            Collaborators contribute to clearly defined workflow segments and receive authorship based on ICMJE criteria.
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[160px] opacity-10 -mr-48 -mt-48"></div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle 
            subtitle="Methodology" 
            title="How We Bridge Clinical Expertise & Academic Rigor" 
            light 
          />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {[
              { title: "Clinical Expertise", icon: Stethoscope, desc: "Led by practitioners who understand the medical landscape." },
              { title: "Transparent Mentorship", icon: Users, desc: "Step-by-step guidance through every phase of the pipeline." },
              { title: "Ethical Authorship", icon: ShieldCheck, desc: "Strict adherence to ICMJE guidelines for all contributors." },
              { title: "Structured Pipeline", icon: Activity, desc: "A start-to-finish research pipeline optimized for quality." }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 border border-white/10">
                  <item.icon size={28} />
                </div>
                <h4 className="text-xl font-bold">{item.title}</h4>
                <p className="text-blue-100/60 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-20 p-8 bg-white/5 border border-white/10 rounded-[2rem]">
            <p className="text-lg text-blue-100 font-medium">
              Each project is planned with academic integrity and long-term credibility in mind. Our aim is not just publication — but skill-building, enabling participants to understand how real systematic reviews are created and completed.
            </p>
          </div>
        </div>
      </section>

      {/* Track Record & Who We Work With */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <SectionTitle subtitle="Our Impact" title="Proven Track Record" />
              <div className="space-y-6 text-slate-600 font-medium">
                <p>
                  BIR has successfully completed and published systematic reviews in reputable indexed journals, with ongoing projects across cardiology, nephrology, orthopedics, public health, and artificial intelligence in medicine.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    "Methodological Rigor",
                    "Ethical Collaboration",
                    "High-Quality Outputs",
                    "Consistent Pipeline"
                  ].map(stat => (
                    <div key={stat} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="font-bold text-sm text-[#0f365d] uppercase tracking-wide">{stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <SectionTitle subtitle="Our Community" title="Who We Work With" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Medical Students", icon: GraduationCap },
                  { title: "IMGs", icon: Globe },
                  { title: "Residents", icon: UserCheck },
                  { title: "Clinicians", icon: Clipboard }
                ].map(profile => (
                  <GlassCard key={profile.title} className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#0f365d]/5 text-[#0f365d] rounded-xl flex items-center justify-center">
                        <profile.icon size={20} />
                      </div>
                      <span className="font-bold text-slate-800">{profile.title}</span>
                    </div>
                  </GlassCard>
                ))}
              </div>
              <p className="mt-8 text-slate-500 font-medium italic">
                Our focus is on individuals who value structured mentorship, real contribution, and long-term academic credibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 bg-[#0f365d] relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
         </div>
         <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <span className="text-blue-300 text-xs font-black uppercase tracking-[0.4em] mb-6 inline-block">Our Vision</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 leading-tight">
                Building a Global Research Ecosystem
              </h2>
              <p className="text-xl md:text-2xl text-blue-100/80 leading-relaxed font-medium">
                "To build a global ecosystem where medical trainees and doctors can learn, contribute, and publish in an environment that is ethical, structured, and academically sound — without the confusion, exploitation, or misinformation often found in the research ecosystem."
              </p>
              <div className="mt-16 w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
            </div>
         </div>
      </section>
    </div>
  );
};
