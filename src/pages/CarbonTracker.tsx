import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { dataStore } from '@/lib/data';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumButton } from '@/components/ui/premium-button';
import { SustainabilityTracker } from '@/components/ui/eco-badge';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  TrendingUp, 
  Leaf, 
  Target, 
  Award,
  Calendar,
  Zap,
  TreePine,
  Recycle
} from 'lucide-react';

const CarbonTracker: React.FC = () => {
  const { user } = useAuth();
  const [carbonData, setCarbonData] = useState({
    totalSaved: 0,
    monthlyGoal: 50,
    weeklySaved: 0,
    itemsRecycled: 0,
    treesEquivalent: 0,
    energySaved: 0
  });

  useEffect(() => {
    if (user) {
      loadCarbonData();
    }
  }, [user]);

  const loadCarbonData = () => {
    if (!user) return;

    try {
      const purchases = dataStore.getPurchasesByUser(user.id);
      const totalSaved = purchases.length * 2.5; // 2.5kg CO2 per item
      const itemsRecycled = purchases.length;
      const treesEquivalent = Math.round(totalSaved / 22); // 1 tree absorbs ~22kg CO2/year
      const energySaved = Math.round(totalSaved * 0.5); // kWh equivalent

      setCarbonData({
        totalSaved,
        monthlyGoal: 50,
        weeklySaved: totalSaved / 4,
        itemsRecycled,
        treesEquivalent,
        energySaved
      });
    } catch (error) {
      console.error('Error loading carbon data:', error);
    }
  };

  const progressPercentage = Math.min((carbonData.totalSaved / carbonData.monthlyGoal) * 100, 100);

  const achievements = [
    {
      id: 'first-purchase',
      title: 'First Eco Purchase',
      description: 'Made your first sustainable purchase',
      icon: Leaf,
      unlocked: carbonData.itemsRecycled >= 1,
      progress: Math.min(carbonData.itemsRecycled, 1)
    },
    {
      id: 'carbon-saver',
      title: 'Carbon Saver',
      description: 'Saved 10kg of CO₂',
      icon: TreePine,
      unlocked: carbonData.totalSaved >= 10,
      progress: Math.min(carbonData.totalSaved / 10, 1)
    },
    {
      id: 'eco-warrior',
      title: 'Eco Warrior',
      description: 'Recycled 10 items',
      icon: Recycle,
      unlocked: carbonData.itemsRecycled >= 10,
      progress: Math.min(carbonData.itemsRecycled / 10, 1)
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Please sign in to view your carbon tracker</h2>
          <PremiumButton variant="eco">Sign In</PremiumButton>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Carbon Tracker
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Monitor your environmental impact and see how your sustainable choices are making a difference
            </p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6 text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {carbonData.totalSaved.toFixed(1)}kg
              </h3>
              <p className="text-muted-foreground">CO₂ Saved</p>
            </GlassCard>

            <GlassCard className="p-6 text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {carbonData.treesEquivalent}
              </h3>
              <p className="text-muted-foreground">Trees Equivalent</p>
            </GlassCard>

            <GlassCard className="p-6 text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {carbonData.energySaved}kWh
              </h3>
              <p className="text-muted-foreground">Energy Saved</p>
            </GlassCard>
          </div>

          {/* Monthly Goal Progress */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-foreground">Monthly Goal</h3>
              <span className="text-sm text-muted-foreground">
                {carbonData.totalSaved.toFixed(1)}kg / {carbonData.monthlyGoal}kg
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {progressPercentage >= 100 
                ? "🎉 Goal achieved! You're making a huge impact!"
                : `${(carbonData.monthlyGoal - carbonData.totalSaved).toFixed(1)}kg more to reach your goal`
              }
            </p>
          </GlassCard>

          {/* Achievements */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <GlassCard 
                    key={achievement.id} 
                    className={cn(
                      'p-4 transition-all duration-300',
                      achievement.unlocked 
                        ? 'border-green-500/50 bg-green-50/50 hover:scale-105' 
                        : 'opacity-60'
                    )}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        achievement.unlocked 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                          : 'bg-gray-300'
                      )}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${achievement.progress * 100}%` }}
                      />
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* Weekly Breakdown */}
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Weekly Breakdown</h3>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-muted-foreground mb-2">{day}</div>
                  <div className="w-full bg-gray-200 rounded-full h-16 flex items-end justify-center p-1">
                    <div 
                      className="w-full bg-gradient-to-t from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ 
                        height: `${Math.random() * 80 + 20}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {(Math.random() * 5 + 1).toFixed(1)}kg
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default CarbonTracker;
