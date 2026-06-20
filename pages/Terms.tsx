import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-6 pt-36 pb-24 max-w-4xl">
      <h1 className="text-4xl font-black text-[#0f365d] mb-6">Terms of Service</h1>
      <p className="mb-4">Last updated: January 22, 2026</p>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Acceptance of Terms</h2>
        <p className="text-sm text-slate-700">By accessing or using the BIR Research website (the “Site”), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use the Site.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Use of the Site</h2>
        <p className="text-sm text-slate-700">You may use the Site only for lawful purposes and in accordance with these Terms. You agree not to misuse the Site or assist others in doing so.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Intellectual Property</h2>
        <p className="text-sm text-slate-700">All content on the Site, including text, images, logos, and code, is owned or licensed by BIR Research. You may not reproduce or redistribute Site content without prior written permission.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Limitation of Liability</h2>
        <p className="text-sm text-slate-700">To the maximum extent permitted by law, BIR Research disclaims all warranties and limits liability for damages arising from use of the Site.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Governing Law</h2>
        <p className="text-sm text-slate-700">These Terms are governed by the laws of the jurisdiction where BIR Research is incorporated, unless otherwise required by applicable law.</p>
      </section>

      <p className="text-sm text-slate-500">If you have questions about these Terms, contact us at the address in the Privacy Policy page.</p>
    </div>
  );
};

export default Terms;
