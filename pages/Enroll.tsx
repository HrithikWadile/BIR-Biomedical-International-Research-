
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, CheckCircle2, Microscope, User, Mail, Briefcase, GraduationCap } from 'lucide-react';
import { dataService } from '../services/dataService';
import { SectionTitle, GlassCard } from '../components/UI';

export const Enroll: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();
  const { upcomingPapers, settings } = dataService.getData();
  const paper = upcomingPapers.find(p => p.id === paperId);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!paper) {
      navigate('/case-studies');
    }
  }, [paper, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    try {
      // Send to FormSubmit as well for real email notification
      await fetch(`https://formsubmit.co/ajax/${settings.contactEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          _subject: `New Research Enrollment: ${paper?.title}`,
          _template: "table"
        }),
      });

      // Store in local DB
      dataService.addEnrollment({
        paperId: paperId || 'unknown',
        paperTitle: paper?.title || 'Unknown Paper',
        name: values.name as string,
        email: values.email as string,
        background: values.background as string,
        experience: values.experience as string,
      });

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Submission error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!paper) return null;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#F8F6F2]">
      <div className="container mx-auto px-6">
        <Link to="/case-studies" className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold mb-8 hover:gap-3 transition-all text-sm" style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}>
          <ArrowLeft size={16} /> Back to Repository
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Paper Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Enrollment Opening</h2>
              <h1 className="text-4xl font-bold text-[#0f365d] mb-6 leading-tight">{paper.title}</h1>
              <div className="bg-[#0f365d] p-8 rounded-3xl text-white shadow-xl mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Microscope size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-200 uppercase font-black tracking-widest">Domain</p>
                    <p className="font-bold">{paper.domain}</p>
                  </div>
                </div>
                <p className="text-blue-100/70 text-sm leading-relaxed mb-6 font-medium">
                  Join our research hub for this specific study. You will be mentored by the core team while contributing to key phases of the systematic review.
                </p>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs">
                   <span className="opacity-60 uppercase font-black tracking-widest">Status</span>
                   <span className="font-bold bg-green-500/20 text-green-300 px-3 py-1 rounded-full">{paper.status}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0f365d]">Clear Authorship</h4>
                    <p className="text-xs text-slate-500 font-medium">Based on ICMJE criteria and contribution.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0f365d]">Expert Guidance</h4>
                    <p className="text-xs text-slate-500 font-medium">Weekly check-ins and methodological support.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <GlassCard className="p-8 md:p-12">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-[#0f365d] mb-4">Application Received</h3>
                  <p className="text-slate-600 max-w-md mx-auto text-lg leading-relaxed">
                    Thank you for your interest in <span className="font-bold text-[#0f365d]">{paper.title}</span>. Our team will review your background and contact you via email at {settings.contactEmail} to discuss the next steps.
                  </p>
                  <Link to="/case-studies" className="mt-10 inline-block bg-[#0f365d] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1a4a7a] transition-all">
                    Return to Portfolio
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                        <User size={14} /> Full Name
                      </label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        placeholder="Dr. Jane Smith"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                        <Mail size={14} /> Email Address
                      </label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        placeholder="jane@research.edu"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase size={14} /> Academic / Professional Background
                    </label>
                    <select 
                      name="background" 
                      required 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                      <option value="">Select your current status...</option>
                      <option value="Medical Student">Medical Student</option>
                      <option value="IMG (International Medical Graduate)">IMG (International Medical Graduate)</option>
                      <option value="Resident Physician">Resident Physician</option>
                      <option value="Fellow / Senior Clinician">Fellow / Senior Clinician</option>
                      <option value="PhD Candidate / Researcher">PhD Candidate / Researcher</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest flex items-center gap-2">
                      Research Interests & Prior Experience
                    </label>
                    <textarea 
                      name="experience" 
                      required 
                      rows={5}
                      placeholder="Briefly describe your interest in this topic and any prior research work..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-xs text-blue-800 leading-relaxed">
                    <p className="font-bold mb-2 uppercase tracking-widest">Enrollment Disclaimer:</p>
                    By submitting this form, you express interest in joining the BIR research hub for this study. Selection is based on background alignment and spot availability. Enrollment does not guarantee authorship; authorship is earned through active and meaningful contribution as per ICMJE standards.
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full bg-[#0f365d] text-white font-black py-5 rounded-2xl hover:bg-[#1a4a7a] transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 uppercase tracking-[0.2em]"
                  >
                    {loading ? "Submitting Application..." : (
                      <>
                        Submit Enrollment Application <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};
