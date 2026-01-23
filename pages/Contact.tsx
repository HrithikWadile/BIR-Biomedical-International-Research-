
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { dataService } from '../services/dataService';
import { SectionTitle, GlassCard } from '../components/UI';

export const Contact: React.FC = () => {
  const { settings } = dataService.getData();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const formValues = Object.fromEntries(formData.entries());

    try {
      // Using FormSubmit.co for reliable client-side email delivery without a custom backend
      const response = await fetch(`https://formsubmit.co/ajax/${settings.contactEmail}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formValues,
          _subject: `New BIR Research Inquiry: ${formValues.subject}`,
          _template: "table"
        }),
      });

      if (response.ok) {
        // Log to local storage for the Admin dashboard
        dataService.addSubmission({
          name: formValues.name as string,
          email: formValues.email as string,
          subject: formValues.subject as string,
          message: formValues.message as string,
        });
        setSubmitted(true);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("There was an issue sending your message. Please try again or email us directly at " + settings.contactEmail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6">
        <SectionTitle 
          subtitle="Get in Touch" 
          title="Connect with our global research network" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Side */}
          <div className="space-y-8">
            <GlassCard className="p-8">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-12 h-12 bg-blue-100 text-[#0f365d] rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Email Us</h4>
                  <p className="text-slate-500 mb-2">Our team usually responds within 24 hours.</p>
                  <a href={`mailto:${settings.contactEmail}`} className="text-blue-600 font-bold hover:underline break-all">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 mb-8">
                <div className="w-12 h-12 bg-blue-100 text-[#0f365d] rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Call Us</h4>
                  <p className="text-slate-500 mb-2">Reach out for urgent research collaborations.</p>
                  <a href={`tel:${settings.phone}`} className="text-blue-600 font-bold hover:underline">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-100 text-[#0f365d] rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Location</h4>
                  <p className="text-slate-500 mb-2">BIR Research Hub</p>
                  <address className="not-italic text-slate-700 leading-relaxed font-medium">
                    {settings.address}
                  </address>
                </div>
              </div>
            </GlassCard>

            <div className="h-64 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238133.1523826233!2d78.93242277874945!3d21.16134839810156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d2dc0c02bb2!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1708453489241!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Office Location"
              ></iframe>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <GlassCard className="p-8 md:p-12 relative overflow-hidden">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Inquiry Sent Successfully</h3>
                  <p className="text-slate-600 text-lg max-w-md mx-auto">
                    Thank you for reaching out to BIR Research. Your message has been sent to our team at {settings.contactEmail}. We will review your inquiry and get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-10 text-blue-600 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden field for FormSubmit.co subject line */}
                  <input type="hidden" name="_subject" value="New Contact Form Submission" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-slate-700">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                        placeholder="Dr. John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-slate-700">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-bold text-slate-700">Inquiry Type</label>
                    <select 
                      id="subject" 
                      name="subject"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    >
                      <option value="">Select an option...</option>
                      <option value="Research Collaboration">Research Collaboration</option>
                      <option value="Mentorship Program">Mentorship Program</option>
                      <option value="Systematic Review Query">Systematic Review Query</option>
                      <option value="Meta-Analysis Support">Meta-Analysis Support</option>
                      <option value="Career/Partnerships">Career & Partnerships</option>
                      <option value="General Support">General Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-slate-700">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={6}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none font-medium" 
                      placeholder="Tell us about your research goals or background..."
                    ></textarea>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="w-2 h-2 bg-[#0f365d] rounded-full animate-pulse"></div>
                    Your message will be sent directly to our coordination team's primary inbox.
                  </div>

                  <button 
                    disabled={loading}
                    className="w-full bg-[#0f365d] text-white font-bold py-4 rounded-xl hover:bg-[#1a4a7a] transition-all shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Transmitting...
                      </span>
                    ) : (
                      <>
                        <Send size={18} /> Send Research Inquiry
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
