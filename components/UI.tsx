
import React from 'react';
import { motion } from 'framer-motion';

export const SectionTitle: React.FC<{ 
  title: string; 
  subtitle?: string; 
  light?: boolean;
  centered?: boolean;
}> = ({ title, subtitle, light, centered }) => (
  <div className={`mb-16 ${centered ? 'text-center max-w-2xl mx-auto' : 'text-left'}`}>
    {subtitle && (
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`inline-block text-xs font-bold uppercase tracking-widest mb-3 ${light ? 'text-blue-300' : 'text-blue-600'}`}
      >
        {subtitle}
      </motion.span>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-3xl md:text-5xl font-bold leading-tight ${light ? 'text-white' : 'text-slate-900'}`}
    >
      {title}
    </motion.h2>
  </div>
);

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`glass border border-white/40 shadow-xl rounded-2xl overflow-hidden ${className}`}>
    {children}
  </div>
);

export const PrimaryButton: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className }) => (
  <button 
    onClick={onClick}
    className={`bg-blue-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-200/50 active:scale-95 ${className}`}
  >
    {children}
  </button>
);
