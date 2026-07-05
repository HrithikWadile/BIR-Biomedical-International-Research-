
import React from 'react';
import { motion } from 'framer-motion';

/* ── BlurText — cinematic word-by-word blur-in for headlines ──
   Each word starts blurred + below, sharpens as it rises.
   `highlightLast` renders the last N words in gold italic.
   `inView` waits for scroll visibility instead of mount. */
export const BlurText: React.FC<{
  text: string;
  className?: string;
  highlightLast?: number;
  delay?: number;
  stagger?: number;
  inView?: boolean;
  centered?: boolean;
}> = ({ text, className, highlightLast = 0, delay = 0, stagger = 0.09, inView = false, centered = false }) => {
  const words = text.split(' ').filter(Boolean);
  const highlightFrom = words.length - highlightLast;

  const target = {
    filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
    opacity: [0, 0.6, 1],
    y: [28, -4, 0],
  };

  return (
    <span
      className={`flex flex-wrap ${centered ? 'justify-center' : ''} ${className ?? ''}`}
      style={{ rowGap: '0.08em' }}
    >
      {words.map((word, i) => {
        const visibility = inView
          ? { whileInView: target, viewport: { once: true } as const }
          : { animate: target };
        return (
          <motion.span
            key={`${word}-${i}`}
            initial={{ filter: 'blur(10px)', opacity: 0, y: 28 }}
            {...visibility}
            transition={{
              duration: 0.7,
              times: [0, 0.5, 1],
              ease: 'easeOut',
              delay: delay + i * stagger,
            }}
            className={i >= highlightFrom ? 'gold-italic' : undefined}
            style={{
              display: 'inline-block',
              marginRight: '0.24em',
              willChange: 'transform, filter, opacity',
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
};

export const SectionTitle: React.FC<{
  title: string;
  subtitle?: string;
  light?: boolean;
  centered?: boolean;
}> = ({ title, subtitle, light, centered }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    {subtitle && (
      <motion.div
        initial={{ opacity: 0, x: centered ? 0 : -16, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
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
      initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
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

/* ── CurvedLines — staggered concentric arcs pulsing from a section edge ──
   Renders `count` nested one-sided rounded rectangles anchored to the
   left or right edge. Each pulses via the `line-pulse` keyframe with a
   0.25s stagger, creating a slow ripple. Pointer-events disabled. */
export const CurvedLines: React.FC<{
  side: 'left' | 'right';
  count?: number;
  color?: string;
  baseWidth?: number;
  step?: number;
  heightPct?: number;
  className?: string;
}> = ({
  side,
  count = 10,
  color = 'rgba(201,168,76,0.35)',
  baseWidth = 60,
  step = 12,
  heightPct = 62,
  className,
}) => (
  <div
    className={`absolute inset-y-0 ${side === 'left' ? 'left-0' : 'right-0'} pointer-events-none ${className ?? ''}`}
    aria-hidden="true"
  >
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: `${(100 - heightPct) / 2}%`,
          width: `${baseWidth + i * step}px`,
          height: `${heightPct}%`,
          border: `2px solid ${color}`,
          opacity: 0,
          animation: 'line-pulse 5s ease-in-out infinite',
          animationDelay: `${i * 0.25}s`,
          willChange: 'opacity, transform',
          ...(side === 'left'
            ? { left: 0, borderLeft: 'none', borderRadius: '0 80% 80% 0 / 0 50% 50% 0' }
            : { right: 0, borderRight: 'none', borderRadius: '80% 0 0 80% / 50% 0 0 50%' }),
        }}
      />
    ))}
  </div>
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
