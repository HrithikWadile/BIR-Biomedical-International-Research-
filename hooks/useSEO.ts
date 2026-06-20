import { useEffect } from 'react';

/* ─────────────────────────────────────────────────────────────
   UPDATE THIS to your actual deployed domain before going live
───────────────────────────────────────────────────────────── */
export const SITE_URL = 'https://birresearch.com';
export const SITE_NAME = 'BIR Research';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface SEOConfig {
  /** Page title (without brand suffix — that's appended automatically) */
  title: string;
  /** Page meta description (150-160 characters ideal) */
  description: string;
  /** Comma-separated keywords */
  keywords?: string;
  /** Path relative to root, e.g. "/about" */
  canonical?: string;
  /** Absolute URL to the OG share image */
  ogImage?: string;
  /** JSON-LD schema object(s) specific to this page */
  schema?: object | object[];
}

/* ── Helpers ── */
const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
};

const injectSchema = (id: string, data: object | object[]) => {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const s = document.createElement('script');
  s.id = id;
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(Array.isArray(data) ? data : data);
  document.head.appendChild(s);
};

const removeSchema = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.remove();
};

/* ── Hook ── */
export const useSEO = ({
  title,
  description,
  keywords,
  canonical = '/',
  ogImage = DEFAULT_OG_IMAGE,
  schema,
}: SEOConfig) => {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${canonical}`;

    // ── Title ──
    document.title = fullTitle;

    // ── Core meta ──
    upsertMeta('meta[name="title"]',       { name: 'title', content: fullTitle });
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    if (keywords) {
      upsertMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    }

    // ── Canonical ──
    upsertLink('canonical', canonicalUrl);

    // ── Open Graph ──
    upsertMeta('meta[property="og:title"]',       { property: 'og:title',       content: fullTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:url"]',         { property: 'og:url',         content: canonicalUrl });
    upsertMeta('meta[property="og:image"]',       { property: 'og:image',       content: ogImage });
    upsertMeta('meta[property="og:type"]',        { property: 'og:type',        content: 'website' });

    // ── Twitter Card ──
    upsertMeta('meta[name="twitter:title"]',       { name: 'twitter:title',       content: fullTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]',       { name: 'twitter:image',       content: ogImage });
    upsertMeta('meta[name="twitter:card"]',        { name: 'twitter:card',        content: 'summary_large_image' });

    // ── Page-level JSON-LD ──
    if (schema) injectSchema('page-schema', schema);

    // ── Cleanup on route change ──
    return () => {
      document.title = `${SITE_NAME} | Doctor-Led Biomedical Research Mentorship`;
      removeSchema('page-schema');
    };
  }, [title, description, keywords, canonical, ogImage, schema]);
};
