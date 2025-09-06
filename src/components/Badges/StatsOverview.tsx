import React from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Trophy, Award, Target } from 'lucide-react';

interface StatsOverviewProps {
  totalPoints: number;
  badgesEarned: number;
  completionPercentage: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  totalPoints,
  badgesEarned,
  completionPercentage
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <GlassCard className="p-6 text-center hover-lift">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{totalPoints}</h3>
        <p className="text-muted-foreground">Total Points</p>
      </GlassCard>

      <GlassCard className="p-6 text-center hover-lift">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{badgesEarned}</h3>
        <p className="text-muted-foreground">Badges Earned</p>
      </GlassCard>

      <GlassCard className="p-6 text-center hover-lift">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {completionPercentage}%
        </h3>
        <p className="text-muted-foreground">Completion</p>
      </GlassCard>
    </div>
  );
};
