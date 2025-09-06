import React from 'react';
import { cn } from '@/lib/utils';
import { Leaf, Star, Award, Crown, Zap } from 'lucide-react';

interface EcoBadgeProps {
  level: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export function EcoBadge({ level, size = 'md', animated = false, className }: EcoBadgeProps) {
  const levels = {
    bronze: {
      icon: Leaf,
      colors: 'from-amber-500 to-orange-500',
      bg: 'bg-gradient-to-r from-amber-100 to-orange-100',
      text: 'text-amber-800',
      border: 'border-amber-300'
    },
    silver: {
      icon: Star,
      colors: 'from-gray-400 to-gray-600',
      bg: 'bg-gradient-to-r from-gray-100 to-gray-200',
      text: 'text-gray-800',
      border: 'border-gray-300'
    },
    gold: {
      icon: Award,
      colors: 'from-yellow-400 to-yellow-600',
      bg: 'bg-gradient-to-r from-yellow-100 to-yellow-200',
      text: 'text-yellow-800',
      border: 'border-yellow-300'
    },
    platinum: {
      icon: Crown,
      colors: 'from-purple-400 to-purple-600',
      bg: 'bg-gradient-to-r from-purple-100 to-purple-200',
      text: 'text-purple-800',
      border: 'border-purple-300'
    },
    diamond: {
      icon: Zap,
      colors: 'from-blue-400 to-cyan-500',
      bg: 'bg-gradient-to-r from-blue-100 to-cyan-100',
      text: 'text-blue-800',
      border: 'border-blue-300'
    }
  };

  const sizes = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base'
  };

  const Icon = levels[level].icon;

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full border-2 shadow-lg',
        levels[level].bg,
        levels[level].border,
        sizes[size],
        animated && 'animate-pulse',
        className
      )}
    >
      <Icon className={cn('h-4 w-4', levels[level].text)} />
      {animated && (
        <div className={cn(
          'absolute inset-0 rounded-full bg-gradient-to-r opacity-75 animate-ping',
          levels[level].colors
        )} />
      )}
    </div>
  );
}

interface TrustScoreProps {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function TrustScore({ 
  score, 
  maxScore = 100, 
  size = 'md', 
  showLabel = true,
  className 
}: TrustScoreProps) {
  const percentage = (score / maxScore) * 100;
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Poor';
  };

  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className={cn('font-bold', getScoreColor(score), sizes[size])}>
            {score}
          </span>
        </div>
        <div 
          className="absolute inset-0 rounded-full border-2 border-green-500"
          style={{
            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((percentage - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((percentage - 90) * Math.PI / 180)}%)`
          }}
        />
      </div>
      {showLabel && (
        <span className={cn('font-medium', getScoreColor(score), sizes[size])}>
          {getScoreLabel(score)}
        </span>
      )}
    </div>
  );
}

interface SustainabilityTrackerProps {
  co2Saved: number;
  itemsRecycled: number;
  className?: string;
}

export function SustainabilityTracker({ co2Saved, itemsRecycled, className }: SustainabilityTrackerProps) {
  return (
    <div className={cn('p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200', className)}>
      <h3 className="text-sm font-semibold text-green-800 mb-3">Environmental Impact</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-700">CO₂ Saved</span>
          <span className="text-sm font-bold text-green-800">{co2Saved.toFixed(1)}kg</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-700">Items Recycled</span>
          <span className="text-sm font-bold text-green-800">{itemsRecycled}</span>
        </div>
        <div className="w-full bg-green-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${Math.min((co2Saved / 10) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
