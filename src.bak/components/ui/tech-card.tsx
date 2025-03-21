import React, { ReactNode } from 'react';

interface TechCardProps {
  children: ReactNode;
  className?: string;
}

export const TechCard: React.FC<TechCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${className}`}>
      {children}
    </div>
  );
}; 