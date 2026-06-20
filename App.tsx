
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AnimatePresence } from 'framer-motion';

const Home = React.lazy(async () => ({ default: (await import('./pages/Home')).Home }));
const About = React.lazy(async () => ({ default: (await import('./pages/About')).About }));
const Services = React.lazy(async () => ({ default: (await import('./pages/Services')).Services }));
const CaseStudies = React.lazy(async () => ({ default: (await import('./pages/CaseStudies')).CaseStudies }));
const Enroll = React.lazy(async () => ({ default: (await import('./pages/Enroll')).Enroll }));
const Research = React.lazy(async () => ({ default: (await import('./pages/Research')).Research }));
const Contact = React.lazy(async () => ({ default: (await import('./pages/Contact')).Contact }));
const Terms = React.lazy(async () => ({ default: (await import('./pages/Terms')).Terms }));
const Privacy = React.lazy(async () => ({ default: (await import('./pages/Privacy')).Privacy }));
const Admin = React.lazy(async () => ({ default: (await import('./pages/Admin')).Admin }));

const RouteFallback: React.FC = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="text-slate-500 font-semibold">Loading…</div>
  </div>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPath = location.pathname === '/admin';

  if (isAdminPath) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <Admin />
      </Suspense>
    );
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/enroll/:paperId" element={<Enroll />} />
            <Route path="/research" element={<Research />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
