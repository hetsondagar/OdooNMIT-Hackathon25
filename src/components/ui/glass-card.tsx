import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'subtle' | 'premium' | 'tech';
  hover?: boolean;
  glow?: boolean;
  animated?: boolean;
}

export function GlassCard({ 
  children, 
  className, 
  variant = 'default',
  hover = true,
  glow = false,
  animated = false,
  ...props 
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    default: 'bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg',
    elevated: 'bg-background/90 backdrop-blur-2xl border border-border/60 shadow-2xl',
    subtle: 'bg-background/60 backdrop-blur-lg border border-border/30 shadow-md',
    premium: 'bg-gradient-to-br from-background/90 via-background/80 to-background/90 backdrop-blur-2xl border border-border/60 shadow-2xl',
    tech: 'bg-gradient-to-br from-primary/5 via-background/80 to-emerald-500/5 backdrop-blur-2xl border border-primary/20 shadow-2xl'
  };

  return (
    <div
      className={cn(
        'relative rounded-3xl transition-all duration-500 overflow-hidden',
        variants[variant],
        hover && 'hover:shadow-2xl hover:scale-[1.02] hover:bg-background/95',
        glow && 'shadow-primary/20 shadow-2xl',
        animated && 'animate-tech-pulse',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Animated Background Gradient */}
      {animated && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full animate-shimmer" />
      )}
      
      {/* Hover Glow Effect */}
      {isHovered && glow && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-emerald-500/10 animate-pulse" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
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
