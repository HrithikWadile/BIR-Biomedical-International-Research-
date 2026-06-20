
import React from 'react';
import { motion } from 'framer-motion';

export const SectionTitle: React.FC<{
  title: string;
  subtitle?: string;
  light?: boolean;
  centered?: boolean;
}> = ({ title, subtitle, light, centered }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    {subtitle && (
      <motion.div
        initial={{ opacity: 0, x: centered ? 0 : -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`flex items-center gap-3 mb-5 ${centered ? 'justify-center' : ''}`}
      >
        <div className="h-px w-8 bg-[#C9A84C]" />
        <span
          className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#C9A84C] font-display"
          style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
        >
          {subtitle}
        </span>
        <div className="h-px w-8 bg-[#C9A84C]" />
      </motion.div>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.12, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.06] ${
        light ? 'text-white' : 'heading-gradient'
      }`}
    >
      {title}
    </motion.h2>
  </div>
);

export const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={`bg-white border border-slate-100/80 shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden ${className}`}
  >
    {children}
  </div>
);

export const PrimaryButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.02, boxShadow: '0 16px 40px rgba(15,54,93,0.28)' }}
    whileTap={{ scale: 0.97 }}
    className={`relative overflow-hidden bg-[#0f365d] text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-[0_8px_28px_rgba(15,54,93,0.22)] group ${className}`}
    style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    <span
      className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-xl"
      style={{ background: 'linear-gradient(90deg, #1a4a7a 0%, #2460a0 100%)' }}
    />
  </motion.button>
);

/* ── Marquee ticker ── */
export const Marquee: React.FC<{ items: string[] }> = ({ items }) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div className="flex animate-marquee whitespace-nowrap gap-12">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500 inline-flex items-center gap-3 shrink-0"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            <span className="w-1 h-1 rounded-full bg-[#C9A84C] inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
