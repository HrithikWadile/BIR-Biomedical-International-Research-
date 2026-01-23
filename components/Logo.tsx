
import React from 'react';

export const BIRLogo: React.FC<{ className?: string; light?: boolean }> = ({ className = "h-12", light = false }) => {
  const logo = new URL('../assets/images/bir-logo.jpeg', import.meta.url).href;
  const altText = 'bir-logo';

  return (
    <div className={`flex items-center ${className}`}>
      <img src={logo} alt={altText} className="h-full w-auto" />
    </div>
  );
};
