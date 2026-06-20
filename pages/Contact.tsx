
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { dataService } from '../services/dataService';
import { SectionTitle } from '../components/UI';
import { useSEO, SITE_URL } from '../hooks/useSEO';

export const Contact: React.FC = () => {
  const { settings } = dataService.getData();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useSEO({
    title: 'Contact BIR Research — Research Inquiries & Collaboration',
    description: 'Get in touch with BIR Research for systematic review collaboration, mentorship inquiries, or research proposals. We respond within 24 hours. Located in Nagpur, Maharashtra, India.',
    keywords: 'Contact BIR Research, Research Inquiry, Medical Research Collaboration, Systematic Review Help, Research Mentorship Contact, BIR Research Email',
    canonical: '/contact',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact#webpage`,
      url: `${SITE_URL}/contact`,
      name: 'Contact BIR Research',
      description: 'Reach out to BIR Research for research collaboration, mentorship, and systematic review inquiries.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
        ],
      },
      mainEntity: {
        '@type': 'ContactPoint',
        telephone: settings.phone,
        email: settings.contactEmail,
        contactType: 'Research Inquiries',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Hindi'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${settings.contactEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...formValues,
          _subject: `New BIR Research Inquiry: ${formValues.subject}`,
          _template: 'table',
        }),
      });

      if (response.ok) {
        dataService.addSubmission({
          name:    formValues.name    as string,
          email:   formValues.email   as string,
          subject: formValues.subject as string,
          message: formValues.message as string,
        });
        setSubmitted(true);
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      alert(`There was an issue sending your message. Please email us at ${settings.contactEmail}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2]">

      {/* ─── Header ─── */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute right-0 top-0 select-none pointer-events-none" aria-hidden="true">
          <span
            className="block font-bold leading-none text-[14vw] text-[#0f365d] opacity-[0.03]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            CONNECT
          </span>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle subtitle="Get in Touch" title="Connect with our global research network" />
        </div>
      </section>

      {/* ─── Main grid ─── */}
      <section className="pb-28 bg-[#F8F6F2]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: Contact info */}
            <div className="space-y-6">

              {/* Info card */}
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm space-y-8">
                {[
                  {
                    icon: Mail,
                    title: 'Email Us',
                    sub: 'Our team responds within 24 hours.',
                    href: `mailto:${settings.contactEmail}`,
                    value: settings.contactEmail,
                  },
                  {
                    icon: Phone,
                    title: 'Call Us',
                    sub: 'Reach out for urgent collaborations.',
                    href: `tel:${settings.phone}`,
                    value: settings.phone,
                  },
                  {
                    icon: MapPin,
                    title: 'Location',
                    sub: 'BIR Research Hub',
                    href: undefined,
                    value: settings.address,
                  },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-5 group">
                    <div className="w-11 h-11 bg-[#F8F6F2] text-[#0f365d] rounded-xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#0f365d] group-hover:text-white transition-all">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0a1628] text-sm mb-0.5">{item.title}</p>
                      <p className="text-xs text-slate-400 mb-1.5">{item.sub}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-[#0f365d] font-medium hover:text-[#C9A84C] transition-colors break-all"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <address className="not-italic text-sm text-slate-600 font-medium leading-relaxed">
                          {item.value}
                        </address>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="h-56 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238133.1523826233!2d78.93242277874945!3d21.16134839810156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d2dc0c02bb2!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1708453489241!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Office Location"
                />
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
                {/* Gold top line */}
                <div className="absolute top-0 left-8 right-8 h-0.5 bg-[#C9A84C] rounded-full" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 text-center"
                  >
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                      <CheckCircle2 size={44} />
                    </div>
                    <h3
                      className="text-3xl font-bold text-[#0a1628] mb-4 heading-gradient"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Inquiry Sent <em className="gold-italic">Successfully</em>
                    </h3>
                    <p className="text-elegant max-w-md mx-auto">
                      Thank you for reaching out to BIR Research. Your message has been sent to our team at{' '}
                      <span className="text-[#0f365d] font-medium">{settings.contactEmail}</span>. We will review
                      your inquiry and get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-[#C9A84C] font-semibold text-sm hover:underline"
                      style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                    >
                      Send another message →
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input type="hidden" name="_subject" value="New Contact Form Submission" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="name"
                          className="text-xs font-semibold text-slate-500 uppercase tracking-widest"
                          style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Dr. Jane Doe"
                          className="w-full bg-[#F8F6F2] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/50 transition-all placeholder-slate-400"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="text-xs font-semibold text-slate-500 uppercase tracking-widest"
                          style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="jane@example.com"
                          className="w-full bg-[#F8F6F2] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/50 transition-all placeholder-slate-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="subject"
                        className="text-xs font-semibold text-slate-500 uppercase tracking-widest"
                        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                      >
                        Inquiry Type
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full bg-[#F8F6F2] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/50 transition-all text-slate-700 appearance-none"
                      >
                        <option value="">Select an option…</option>
                        <option value="Research Collaboration">Research Collaboration</option>
                        <option value="Mentorship Program">Mentorship Program</option>
                        <option value="Systematic Review Query">Systematic Review Query</option>
                        <option value="Meta-Analysis Support">Meta-Analysis Support</option>
                        <option value="Career/Partnerships">Career & Partnerships</option>
                        <option value="General Support">General Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="text-xs font-semibold text-slate-500 uppercase tracking-widest"
                        style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        placeholder="Tell us about your research goals or background…"
                        className="w-full bg-[#F8F6F2] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/30 focus:border-[#C9A84C]/50 transition-all resize-none placeholder-slate-400"
                      />
                    </div>

                    <div className="flex items-center gap-3 bg-[#F8F6F2] p-4 rounded-xl border border-slate-100">
                      <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-pulse shrink-0" />
                      <p className="text-xs text-slate-500 font-medium">
                        Your message will be sent directly to our coordination team's primary inbox.
                      </p>
                    </div>

                    <motion.button
                      disabled={loading}
                      whileHover={{ scale: 1.01, boxShadow: '0 12px 36px rgba(15,54,93,0.25)' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-[#0f365d] text-white font-semibold py-4 rounded-xl hover:bg-[#1a4a7a] transition-colors shadow-[0_6px_20px_rgba(15,54,93,0.18)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 text-sm uppercase tracking-widest"
                      style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Transmitting…
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Send Research Inquiry
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
