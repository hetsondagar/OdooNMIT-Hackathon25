import React from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { EcoBadge } from '@/components/ui/eco-badge';
import { cn } from '@/lib/utils';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  level: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  category: 'purchases' | 'community' | 'impact' | 'social';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  points: number;
  unlockedAt?: Date;
}

interface BadgeCardProps {
  badge: Badge;
  showProgress?: boolean;
  className?: string;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ 
  badge, 
  showProgress = true, 
  className 
}) => {
  const Icon = badge.icon;
  const progressPercentage = (badge.progress / badge.maxProgress) * 100;

  return (
    <GlassCard 
      className={cn(
        'p-4 transition-all duration-300',
        badge.unlocked 
          ? 'border-green-500/50 bg-green-50/50 hover:scale-105' 
          : 'opacity-60',
        className
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <EcoBadge 
          level={badge.level} 
          size="md" 
          animated={badge.unlocked}
        />
        <div>
          <h4 className="font-semibold text-foreground">{badge.title}</h4>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
        </div>
      </div>
      
      {showProgress && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {badge.progress}/{badge.maxProgress}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-600 font-medium">+{badge.points} points</span>
            {badge.unlocked && badge.unlockedAt && (
              <span className="text-xs text-muted-foreground">
                {badge.unlockedAt.toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      )}
    </GlassCard>
  );
};
