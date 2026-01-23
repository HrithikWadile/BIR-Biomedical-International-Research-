
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { About } from './pages/About';
import { CaseStudies } from './pages/CaseStudies';
import { Enroll } from './pages/Enroll';
import { Research } from './pages/Research';
import { Services } from './pages/Services';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { AnimatePresence } from 'framer-motion';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminPath = location.pathname === '/admin';

  if (isAdminPath) {
    return <Admin />;
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
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
