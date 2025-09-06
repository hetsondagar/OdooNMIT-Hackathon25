import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Leaf, 
  Award, 
  Users, 
  Share2, 
  TrendingUp, 
  Heart, 
  BarChart3,
  Home,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';

const platformNavItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: Home,
    path: '/platform',
    description: 'Platform dashboard'
  },
  {
    id: 'carbon-tracker',
    label: 'Carbon Tracker',
    icon: BarChart3,
    path: '/platform/carbon-tracker',
    description: 'Track your environmental impact'
  },
  {
    id: 'eco-badges',
    label: 'Eco Badges',
    icon: Award,
    path: '/platform/eco-badges',
    description: 'Achievements & rewards'
  },
  {
    id: 'community',
    label: 'Community',
    icon: Users,
    path: '/platform/community',
    description: 'Connect with eco-warriors'
  },
  {
    id: 'social-share',
    label: 'Social Share',
    icon: Share2,
    path: '/platform/social-share',
    description: 'Share your impact'
  },
  {
    id: 'trending',
    label: 'Trending',
    icon: TrendingUp,
    path: '/platform/trending',
    description: 'Popular listings'
  },
  {
    id: 'wishlist',
    label: 'Wishlist',
    icon: Heart,
    path: '/platform/wishlist',
    description: 'Saved items'
  }
];

interface PlatformNavigationProps {
  className?: string;
}

export function PlatformNavigation({ className }: PlatformNavigationProps) {
  const location = useLocation();

  return (
    <GlassCard className={cn('p-4', className)}>
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-foreground">Platform</span>
        </div>
        
        <nav className="space-y-1">
          {platformNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.id} to={item.path}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 h-auto p-3 transition-all duration-300',
                    isActive 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                      : 'hover:bg-accent/50 hover:scale-105'
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className={cn(
                      'text-xs',
                      isActive ? 'text-white/80' : 'text-muted-foreground'
                    )}>
                      {item.description}
                    </div>
                  </div>
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </GlassCard>
  );
}

export function PlatformBreadcrumb() {
  const location = useLocation();
  
  const getCurrentPage = () => {
    const currentItem = platformNavItems.find(item => item.path === location.pathname);
    return currentItem || { label: 'Platform', description: 'EcoFinds Platform' };
  };

  const currentPage = getCurrentPage();

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <Link to="/platform" className="hover:text-foreground transition-colors">
        Platform
      </Link>
      <span>/</span>
      <span className="text-foreground font-medium">{currentPage.label}</span>
    </div>
  );
}
