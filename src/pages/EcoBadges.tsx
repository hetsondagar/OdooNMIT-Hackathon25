import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { dataStore } from '@/lib/data';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumButton } from '@/components/ui/premium-button';
import { EcoBadge } from '@/components/ui/eco-badge';
import { cn } from '@/lib/utils';
import { 
  Award, 
  Trophy, 
  Star, 
  Target, 
  Zap,
  Leaf,
  Recycle,
  Users,
  Heart,
  Share2,
  TrendingUp,
  Calendar,
  Gift,
  ShoppingBag
} from 'lucide-react';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  level: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  category: 'purchases' | 'community' | 'impact' | 'social';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  points: number;
  unlockedAt?: Date;
}

const EcoBadges: React.FC = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    if (user) {
      loadBadges();
    }
  }, [user]);

  const loadBadges = () => {
    if (!user) return;

    try {
      const purchases = dataStore.getPurchasesByUser(user.id);
      const totalPurchases = purchases.length;
      const totalSaved = totalPurchases * 2.5;

      const allBadges: Badge[] = [
        // Purchase Badges
        {
          id: 'first-purchase',
          title: 'First Steps',
          description: 'Made your first eco-friendly purchase',
          icon: Leaf,
          level: 'bronze',
          category: 'purchases',
          unlocked: totalPurchases >= 1,
          progress: Math.min(totalPurchases, 1),
          maxProgress: 1,
          points: 10,
          unlockedAt: totalPurchases >= 1 ? new Date() : undefined
        },
        {
          id: 'eco-shopper',
          title: 'Eco Shopper',
          description: 'Made 5 sustainable purchases',
          icon: ShoppingBag,
          level: 'silver',
          category: 'purchases',
          unlocked: totalPurchases >= 5,
          progress: Math.min(totalPurchases, 5),
          maxProgress: 5,
          points: 50,
          unlockedAt: totalPurchases >= 5 ? new Date() : undefined
        },
        {
          id: 'sustainability-champion',
          title: 'Sustainability Champion',
          description: 'Made 25 eco-friendly purchases',
          icon: Trophy,
          level: 'gold',
          category: 'purchases',
          unlocked: totalPurchases >= 25,
          progress: Math.min(totalPurchases, 25),
          maxProgress: 25,
          points: 250,
          unlockedAt: totalPurchases >= 25 ? new Date() : undefined
        },
        // Impact Badges
        {
          id: 'carbon-saver',
          title: 'Carbon Saver',
          description: 'Saved 10kg of CO₂ emissions',
          icon: Recycle,
          level: 'bronze',
          category: 'impact',
          unlocked: totalSaved >= 10,
          progress: Math.min(totalSaved, 10),
          maxProgress: 10,
          points: 25,
          unlockedAt: totalSaved >= 10 ? new Date() : undefined
        },
        {
          id: 'climate-warrior',
          title: 'Climate Warrior',
          description: 'Saved 50kg of CO₂ emissions',
          icon: Zap,
          level: 'silver',
          category: 'impact',
          unlocked: totalSaved >= 50,
          progress: Math.min(totalSaved, 50),
          maxProgress: 50,
          points: 100,
          unlockedAt: totalSaved >= 50 ? new Date() : undefined
        },
        {
          id: 'planet-protector',
          title: 'Planet Protector',
          description: 'Saved 100kg of CO₂ emissions',
          icon: Star,
          level: 'platinum',
          category: 'impact',
          unlocked: totalSaved >= 100,
          progress: Math.min(totalSaved, 100),
          maxProgress: 100,
          points: 500,
          unlockedAt: totalSaved >= 100 ? new Date() : undefined
        },
        // Community Badges
        {
          id: 'community-member',
          title: 'Community Member',
          description: 'Joined the EcoFinds community',
          icon: Users,
          level: 'bronze',
          category: 'community',
          unlocked: true,
          progress: 1,
          maxProgress: 1,
          points: 5,
          unlockedAt: new Date()
        },
        {
          id: 'social-advocate',
          title: 'Social Advocate',
          description: 'Shared your impact 5 times',
          icon: Share2,
          level: 'silver',
          category: 'social',
          unlocked: false, // This would be tracked separately
          progress: 0,
          maxProgress: 5,
          points: 75,
          unlockedAt: undefined
        }
      ];

      setBadges(allBadges);
      setTotalPoints(allBadges.filter(b => b.unlocked).reduce((sum, b) => sum + b.points, 0));
    } catch (error) {
      console.error('Error loading badges:', error);
    }
  };

  const categories = [
    { id: 'all', label: 'All Badges', icon: Star },
    { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
    { id: 'impact', label: 'Impact', icon: Recycle },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'social', label: 'Social', icon: Share2 }
  ];

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);

  // If no user, show comprehensive demo badges
  if (!user) {
    useEffect(() => {
      const demoBadges: Badge[] = [
        // Purchase Badges
        {
          id: 'eco-starter',
          title: 'Eco Starter',
          description: 'Made your first sustainable purchase',
          icon: Leaf,
          level: 'bronze',
          category: 'purchases',
          unlocked: true,
          progress: 1,
          maxProgress: 1,
          points: 10,
          unlockedAt: new Date()
        },
        {
          id: 'green-shopper',
          title: 'Green Shopper',
          description: 'Made 10 sustainable purchases',
          icon: ShoppingBag,
          level: 'silver',
          category: 'purchases',
          unlocked: true,
          progress: 10,
          maxProgress: 10,
          points: 100,
          unlockedAt: new Date()
        },
        {
          id: 'sustainability-champion',
          title: 'Sustainability Champion',
          description: 'Made 25 eco-friendly purchases',
          icon: Trophy,
          level: 'gold',
          category: 'purchases',
          unlocked: true,
          progress: 25,
          maxProgress: 25,
          points: 250,
          unlockedAt: new Date()
        },
        // Impact Badges
        {
          id: 'carbon-saver',
          title: 'Carbon Saver',
          description: 'Saved 10kg of CO₂ emissions',
          icon: Recycle,
          level: 'bronze',
          category: 'impact',
          unlocked: true,
          progress: 10,
          maxProgress: 10,
          points: 50,
          unlockedAt: new Date()
        },
        {
          id: 'climate-warrior',
          title: 'Climate Warrior',
          description: 'Saved 50kg of CO₂ emissions',
          icon: Zap,
          level: 'silver',
          category: 'impact',
          unlocked: true,
          progress: 50,
          maxProgress: 50,
          points: 200,
          unlockedAt: new Date()
        },
        {
          id: 'planet-protector',
          title: 'Planet Protector',
          description: 'Saved 100kg of CO₂ emissions',
          icon: Award,
          level: 'gold',
          category: 'impact',
          unlocked: true,
          progress: 100,
          maxProgress: 100,
          points: 500,
          unlockedAt: new Date()
        },
        // Community Badges
        {
          id: 'community-helper',
          title: 'Community Helper',
          description: 'Helped 5 community members',
          icon: Users,
          level: 'bronze',
          category: 'community',
          unlocked: true,
          progress: 5,
          maxProgress: 5,
          points: 75,
          unlockedAt: new Date()
        },
        {
          id: 'eco-ambassador',
          title: 'Eco Ambassador',
          description: 'Shared 10 eco-friendly tips',
          icon: Share2,
          level: 'silver',
          category: 'community',
          unlocked: true,
          progress: 10,
          maxProgress: 10,
          points: 150,
          unlockedAt: new Date()
        },
        {
          id: 'green-influencer',
          title: 'Green Influencer',
          description: 'Inspired 25 people to go green',
          icon: TrendingUp,
          level: 'gold',
          category: 'community',
          unlocked: true,
          progress: 25,
          maxProgress: 25,
          points: 300,
          unlockedAt: new Date()
        },
        // Social Badges
        {
          id: 'social-advocate',
          title: 'Social Advocate',
          description: 'Shared 5 sustainable posts',
          icon: Heart,
          level: 'bronze',
          category: 'social',
          unlocked: true,
          progress: 5,
          maxProgress: 5,
          points: 25,
          unlockedAt: new Date()
        },
        {
          id: 'eco-blogger',
          title: 'Eco Blogger',
          description: 'Created 10 eco-content posts',
          icon: Calendar,
          level: 'silver',
          category: 'social',
          unlocked: true,
          progress: 10,
          maxProgress: 10,
          points: 100,
          unlockedAt: new Date()
        },
        {
          id: 'sustainability-guru',
          title: 'Sustainability Guru',
          description: 'Achieved 1000 social engagement points',
          icon: Gift,
          level: 'platinum',
          category: 'social',
          unlocked: true,
          progress: 1000,
          maxProgress: 1000,
          points: 1000,
          unlockedAt: new Date()
        }
      ];
      setBadges(demoBadges);
      setTotalPoints(2760);
    }, []);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Eco Badges
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {user ? 'Earn badges for your sustainable actions and track your eco-journey progress' : 'Explore the badge system - sign in to track your own progress'}
            </p>
            {!user && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  🎯 <strong>Demo Mode:</strong> Showing sample badges. Sign in to track your own eco-journey!
                </p>
              </div>
            )}
            
            {/* Badge Level Guide */}
            <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <h3 className="text-lg font-semibold text-green-800 mb-4">🏆 Badge Levels</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-sm">B</span>
                  </div>
                  <p className="text-xs font-medium text-amber-700">Bronze</p>
                  <p className="text-xs text-amber-600">10-50 pts</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <p className="text-xs font-medium text-gray-700">Silver</p>
                  <p className="text-xs text-gray-600">100-200 pts</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-sm">G</span>
                  </div>
                  <p className="text-xs font-medium text-yellow-700">Gold</p>
                  <p className="text-xs text-yellow-600">250-500 pts</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <p className="text-xs font-medium text-purple-700">Platinum</p>
                  <p className="text-xs text-purple-600">1000+ pts</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <p className="text-xs font-medium text-blue-700">Diamond</p>
                  <p className="text-xs text-blue-600">5000+ pts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
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
              <h3 className="text-2xl font-bold text-foreground mb-2">{unlockedBadges.length}</h3>
              <p className="text-muted-foreground">Badges Earned</p>
            </GlassCard>

            <GlassCard className="p-6 text-center hover-lift">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {Math.round((unlockedBadges.length / badges.length) * 100)}%
              </h3>
              <p className="text-muted-foreground">Completion</p>
            </GlassCard>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <PremiumButton
                  key={category.id}
                  variant={selectedCategory === category.id ? 'eco' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </PremiumButton>
              );
            })}
          </div>

          {/* Recent Achievements */}
          {unlockedBadges.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Recent Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unlockedBadges.slice(-3).map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <GlassCard key={badge.id} className="p-4 border-green-500/50 bg-green-50/50 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <EcoBadge level={badge.level} size="md" animated />
                        <div>
                          <h4 className="font-semibold text-foreground">{badge.title}</h4>
                          <p className="text-xs text-muted-foreground">{badge.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600 font-medium">+{badge.points} points</span>
                        <span className="text-xs text-muted-foreground">
                          {badge.unlockedAt?.toLocaleDateString()}
                        </span>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Badges */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              {selectedCategory === 'all' ? 'All Badges' : categories.find(c => c.id === selectedCategory)?.label}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <GlassCard 
                    key={badge.id} 
                    className={cn(
                      'p-4 transition-all duration-300',
                      badge.unlocked 
                        ? 'border-green-500/50 bg-green-50/50 hover:scale-105' 
                        : 'opacity-60'
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
                          style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
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
                  </GlassCard>
                  );
                })}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EcoBadges;
