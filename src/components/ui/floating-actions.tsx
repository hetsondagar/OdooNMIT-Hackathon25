import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Plus, 
  ShoppingCart, 
  Heart, 
  Search, 
  Sparkles, 
  Zap,
  ArrowUp,
  MessageCircle,
  Bell
} from 'lucide-react';

interface FloatingActionsProps {
  className?: string;
  variant?: 'default' | 'premium' | 'tech';
}

export function FloatingActions({ className, variant = 'tech' }: FloatingActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const actions = [
    { icon: Search, label: 'Search', color: 'from-blue-500 to-cyan-500' },
    { icon: Heart, label: 'Wishlist', color: 'from-pink-500 to-rose-500' },
    { icon: ShoppingCart, label: 'Cart', color: 'from-green-500 to-emerald-500' },
    { icon: MessageCircle, label: 'Chat', color: 'from-purple-500 to-violet-500' },
    { icon: Bell, label: 'Alerts', color: 'from-orange-500 to-amber-500' },
  ];

  const variants = {
    default: 'bg-background/90 backdrop-blur-xl border border-border/50',
    premium: 'bg-gradient-to-br from-background/90 to-background/80 backdrop-blur-2xl border border-primary/30',
    tech: 'bg-gradient-to-br from-primary/10 via-background/90 to-emerald-500/10 backdrop-blur-2xl border border-primary/20'
  };

  return (
    <div className={cn('fixed bottom-6 right-6 z-50', className)}>
      {/* Floating Action Menu */}
      <div className="relative">
        {/* Action Items */}
        <div className={cn(
          'absolute bottom-16 right-0 flex flex-col gap-3 transition-all duration-500',
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}>
          {actions.map((action, index) => (
            <div
              key={action.label}
              className="flex items-center gap-3 transition-all duration-300"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <span className="text-sm font-medium text-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {action.label}
              </span>
              <Button
                size="icon"
                className={cn(
                  'h-12 w-12 rounded-full shadow-2xl transition-all duration-300 hover:scale-110',
                  `bg-gradient-to-r ${action.color} hover:shadow-lg`
                )}
              >
                <action.icon className="h-5 w-5 text-white" />
              </Button>
            </div>
          ))}
        </div>

        {/* Main FAB */}
        <Button
          size="icon"
          className={cn(
            'h-16 w-16 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 relative overflow-hidden',
            variants[variant],
            isExpanded && 'rotate-45'
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-emerald-500 to-primary animate-gradient-x" />
          
          {/* Icons */}
          <div className="relative z-10 flex items-center justify-center">
            {isExpanded ? (
              <ArrowUp className="h-6 w-6 text-white transition-transform duration-300" />
            ) : (
              <div className="flex items-center gap-1">
                <Plus className="h-6 w-6 text-white" />
                <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
              </div>
            )}
          </div>

          {/* Ripple Effect */}
          {isExpanded && (
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
          )}
        </Button>

        {/* Tech Glow Effect */}
        <div className={cn(
          'absolute inset-0 rounded-full transition-all duration-500',
          isExpanded 
            ? 'bg-gradient-to-r from-primary/30 to-emerald-500/30 blur-xl scale-150' 
            : 'bg-gradient-to-r from-primary/20 to-emerald-500/20 blur-lg scale-100'
        )} />
      </div>

      {/* Scroll to Top Button */}
      <Button
        size="icon"
        className="mt-4 h-12 w-12 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp className="h-5 w-5 text-foreground" />
      </Button>
    </div>
  );
}

// Scroll to Top Component
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp className="h-5 w-5 text-foreground" />
    </Button>
  );
}

// AI-Powered Search Component
export function AISearchFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      {isOpen && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-96">
          <div className="bg-background/95 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                <Sparkles className="h-5 w-5 text-white animate-pulse" />
              </div>
              <h3 className="font-semibold text-foreground">AI-Powered Search</h3>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI to find sustainable products..."
                className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border/50 focus:border-primary/50 focus:outline-none transition-all duration-300"
              />
              <Zap className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary animate-pulse" />
            </div>
            
            <div className="mt-4 flex gap-2">
              <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-emerald-600">
                Search with AI
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Search className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
}