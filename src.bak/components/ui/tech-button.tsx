import React from 'react';

interface TechButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
}

export const TechButton: React.FC<TechButtonProps> = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  return (
    <button
      className={`rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 px-6 py-3 text-white font-medium shadow-md hover:shadow-lg transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 