import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { dataStore } from '@/lib/data';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumButton } from '@/components/ui/premium-button';
import { EcoBadge } from '@/components/ui/eco-badge';
import { BadgeCard } from '@/components/Badges/BadgeCard';
import { BadgeLevelGuide } from '@/components/Badges/BadgeLevelGuide';
import { StatsOverview } from '@/components/Badges/StatsOverview';
import PageHeader from '@/components/PageHeader';
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

type BadgeLevel = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
type BadgeCategory = 'purchases' | 'community' | 'impact' | 'social';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  level: BadgeLevel;
  category: BadgeCategory;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  points: number;
  unlockedAt?: Date;
}

interface BadgeCategoryConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Badge category configurations
const BADGE_CATEGORIES: BadgeCategoryConfig[] = [
  { id: 'all', label: 'All Badges', icon: Star },
  { id: 'purchases', label: 'Purchases', icon: ShoppingBag },
  { id: 'impact', label: 'Impact', icon: Recycle },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'social', label: 'Social', icon: Share2 }
];

// Helper function to create user badges based on their data
const createUserBadges = (totalPurchases: number, totalSaved: number): Badge[] => [
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

// Demo badges for non-authenticated users
const DEMO_BADGES: Badge[] = [
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

const EcoBadges: React.FC = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState<Badge[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [totalPoints, setTotalPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load badges based on user authentication status
  useEffect(() => {
    const loadBadges = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (user) {
          const purchases = dataStore.getPurchasesByUser(user.id);
          const totalPurchases = purchases.length;
          const totalSaved = totalPurchases * 2.5;
          
          const userBadges = createUserBadges(totalPurchases, totalSaved);
          setBadges(userBadges);
          setTotalPoints(userBadges.filter(b => b.unlocked).reduce((sum, b) => sum + b.points, 0));
        } else {
          setBadges(DEMO_BADGES);
          setTotalPoints(2760);
        }
      } catch (error) {
        console.error('Error loading badges:', error);
        setError('Failed to load badges. Please try again.');
        // Fallback to demo badges on error
        setBadges(DEMO_BADGES);
        setTotalPoints(2760);
      } finally {
        setIsLoading(false);
      }
    };

    loadBadges();
  }, [user]);

  // Memoized computed values for performance
  const filteredBadges = useMemo(() => 
    selectedCategory === 'all' 
      ? badges 
      : badges.filter(badge => badge.category === selectedCategory),
    [badges, selectedCategory]
  );

  const unlockedBadges = useMemo(() => 
    badges.filter(badge => badge.unlocked),
    [badges]
  );

  const completionPercentage = useMemo(() => 
    badges.length > 0 ? Math.round((unlockedBadges.length / badges.length) * 100) : 0,
    [unlockedBadges.length, badges.length]
  );

  // Memoized callback for category selection
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading badges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <PageHeader title="Eco Badges" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
              Eco Badges
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {user ? 'Earn badges for your sustainable actions and track your eco-journey progress' : 'Explore the badge system - sign in to track your own progress'}
            </p>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  ⚠️ <strong>Error:</strong> {error}
                </p>
              </div>
            )}
            {!user && !error && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  🎯 <strong>Demo Mode:</strong> Showing sample badges. Sign in to track your own eco-journey!
                </p>
              </div>
            )}
            
            {/* Badge Level Guide */}
            <BadgeLevelGuide />
          </div>

          {/* Stats Overview */}
          <StatsOverview 
            totalPoints={totalPoints}
            badgesEarned={unlockedBadges.length}
            completionPercentage={completionPercentage}
          />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {BADGE_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <PremiumButton
                  key={category.id}
                  variant={selectedCategory === category.id ? 'eco' : 'secondary'}
                  size="sm"
                  onClick={() => handleCategorySelect(category.id)}
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
                {unlockedBadges.slice(-3).map((badge) => (
                  <BadgeCard 
                    key={badge.id} 
                    badge={badge} 
                    showProgress={false}
                    className="border-green-500/50 bg-green-50/50"
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Badges */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              {selectedCategory === 'all' ? 'All Badges' : BADGE_CATEGORIES.find(c => c.id === selectedCategory)?.label}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBadges.map((badge) => (
                <BadgeCard 
                  key={badge.id} 
                  badge={badge}
                />
              ))}
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EcoBadges;
