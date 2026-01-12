import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500/50 disabled:opacity-50 disabled:pointer-events-none uppercase tracking-wider";
  
  const variants = {
    primary: "bg-gold-500 text-black hover:bg-gold-400 font-bold",
    secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
    outline: "border border-gold-500 text-gold-500 hover:bg-gold-500/10",
    ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  return (
    <button 
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
