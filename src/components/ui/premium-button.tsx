import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'eco' | 'glass' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function PremiumButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className,
  disabled,
  ...props
}: PremiumButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl border-0',
    secondary: 'bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90 text-foreground shadow-md hover:shadow-lg',
    eco: 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg hover:shadow-green-500/25',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white shadow-lg hover:shadow-xl',
    gradient: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  };

  return (
    <Button
      className={cn(
        'relative overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
        'before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <span className="relative flex items-center gap-2">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          icon
        )}
        {children}
      </span>
    </Button>
  );
}

interface FloatingActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function FloatingActionButton({
  icon,
  label,
  position = 'bottom-right',
  className,
  ...props
}: FloatingActionButtonProps) {
  const positions = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  };

  return (
    <button
      className={cn(
        'h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-500',
        'hover:from-green-600 hover:to-emerald-600 text-white shadow-2xl',
        'hover:shadow-green-500/25 hover:scale-110 active:scale-95',
        'transition-all duration-300 backdrop-blur-sm border border-white/20',
        'flex items-center justify-center group relative overflow-hidden',
        positions[position],
        className
      )}
      {...props}
    >
      <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      {label && (
        <span className="absolute right-full mr-3 px-2 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {label}
        </span>
      )}
    </button>
  );
}
