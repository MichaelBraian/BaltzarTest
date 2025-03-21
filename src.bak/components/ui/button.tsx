import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white text-neutral-800 border border-neutral-200',
    primary: 'bg-amber-600 text-white border-0',
    secondary: 'bg-neutral-800 text-white border-0',
    outline: 'bg-transparent border border-neutral-200 text-neutral-800',
    ghost: 'bg-transparent border-0 text-neutral-800 hover:bg-neutral-100',
  };

  const sizeStyles = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
    icon: 'p-2 aspect-square'
  };

  return (
    <button
      className={`rounded font-medium transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}; 