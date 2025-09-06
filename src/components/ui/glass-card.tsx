import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'subtle';
  hover?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  variant = 'default',
  hover = true,
  ...props 
}: GlassCardProps) {
  const variants = {
    default: 'bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg',
    elevated: 'bg-background/90 backdrop-blur-2xl border border-border/60 shadow-2xl',
    subtle: 'bg-background/60 backdrop-blur-lg border border-border/30 shadow-md'
  };

  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        variants[variant],
        hover && 'hover:shadow-xl hover:scale-[1.02] hover:bg-background/90',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface EcoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ecoLevel?: 'bronze' | 'silver' | 'gold' | 'platinum';
  glow?: boolean;
}

export function EcoCard({ 
  children, 
  className, 
  ecoLevel = 'bronze',
  glow = false,
  ...props 
}: EcoCardProps) {
  const ecoStyles = {
    bronze: 'border-green-200/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80',
    silver: 'border-green-300/60 bg-gradient-to-br from-green-100/80 to-emerald-100/80',
    gold: 'border-green-400/70 bg-gradient-to-br from-green-200/80 to-emerald-200/80',
    platinum: 'border-green-500/80 bg-gradient-to-br from-green-300/80 to-emerald-300/80'
  };

  return (
    <div
      className={cn(
        'rounded-2xl backdrop-blur-xl border shadow-lg transition-all duration-500',
        ecoStyles[ecoLevel],
        glow && 'shadow-green-500/20 shadow-2xl',
        'hover:shadow-xl hover:scale-[1.02] hover:shadow-green-500/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
