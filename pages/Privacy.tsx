import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="text-4xl font-black text-[#0f365d] mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: January 22, 2026</p>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <p className="text-sm text-slate-700">This Privacy Policy explains how BIR Research collects, uses, and shares information when you visit the Site or interact with our services.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
        <p className="text-sm text-slate-700">We may collect personal information you provide directly (for example, contact form submissions, newsletter signups) and usage data (IP address, browser, device, pages visited).</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">How We Use Information</h2>
        <p className="text-sm text-slate-700">We use data to operate and improve the Site, respond to inquiries, send newsletters, and comply with legal obligations. We do not sell personal data.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Data Retention & Security</h2>
        <p className="text-sm text-slate-700">We retain personal data as needed and implement reasonable technical and organizational measures to protect it. No system is fully secure; report concerns to our contact email.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Third-Party Services</h2>
        <p className="text-sm text-slate-700">We may share data with trusted third-party providers (analytics, hosting, email) under contractual obligations to protect data.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Choices</h2>
        <p className="text-sm text-slate-700">You can opt-out of marketing communications and request access, correction, or deletion of your personal data by contacting us at the address below.</p>
      </section>

      <p className="text-sm text-slate-500">Contact: bir.research.in@gmail.com</p>
    </div>
  );
};

export default Privacy;
