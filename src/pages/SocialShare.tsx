import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumButton } from '@/components/ui/premium-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/PageHeader';
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Copy,
  Download,
  Heart,
  MessageCircle,
  TrendingUp,
  Users,
  Calendar,
  Globe,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  FileText
} from 'lucide-react';
import PleaseLogin from '@/components/Warning/PleaseLogin';

interface ShareTemplate {
  id: string;
  title: string;
  description: string;
  category: 'impact' | 'achievement' | 'product' | 'community';
  content: string;
  hashtags: string[];
  image?: string;
  likes: number;
  shares: number;
  isLiked: boolean;
}

interface ShareHistory {
  id: string;
  platform: string;
  content: string;
  timestamp: Date;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

const SocialShare: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'templates' | 'history' | 'analytics'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<ShareTemplate | null>(null);

  const shareTemplates: ShareTemplate[] = [
    {
      id: '1',
      title: 'Carbon Impact Achievement',
      description: 'Share your environmental impact milestone',
      category: 'achievement',
      content: '🌱 Just saved 25kg of CO₂ emissions through sustainable shopping! Every small choice makes a difference. #EcoFinds #Sustainability #ClimateAction',
      hashtags: ['EcoFinds', 'Sustainability', 'ClimateAction', 'CarbonFootprint'],
      likes: 42,
      shares: 18,
      isLiked: false
    },
    {
      id: '2',
      title: 'Product Discovery',
      description: 'Share an amazing sustainable find',
      category: 'product',
      content: '✨ Found this incredible vintage leather jacket on EcoFinds! Perfect condition and saved it from landfill. Love giving items a second life! #SecondHand #Vintage #SustainableFashion',
      hashtags: ['SecondHand', 'Vintage', 'SustainableFashion', 'EcoFinds'],
      likes: 28,
      shares: 12,
      isLiked: true
    },
    {
      id: '3',
      title: 'Community Impact',
      description: 'Share community achievements',
      category: 'community',
      content: '🌟 Our EcoFinds community just reached 10,000 members! Together we\'ve saved over 50 tons of CO₂. Join us in making a difference! #Community #Impact #Together',
      hashtags: ['Community', 'Impact', 'Together', 'EcoFinds'],
      likes: 156,
      shares: 89,
      isLiked: false
    },
    {
      id: '4',
      title: 'Zero Waste Journey',
      description: 'Share your zero waste progress',
      category: 'impact',
      content: '📦 Completed my first zero-waste month! Here are my top 5 tips that made the biggest difference. Small changes, big impact! #ZeroWaste #Tips #Lifestyle',
      hashtags: ['ZeroWaste', 'Tips', 'Lifestyle', 'Sustainability'],
      likes: 73,
      shares: 34,
      isLiked: false
    }
  ];

  const shareHistory: ShareHistory[] = [
    {
      id: '1',
      platform: 'Twitter',
      content: 'Just saved 25kg of CO₂ emissions through sustainable shopping!',
      timestamp: new Date('2024-01-10'),
      engagement: { likes: 12, shares: 5, comments: 3 }
    },
    {
      id: '2',
      platform: 'Instagram',
      content: 'Found this incredible vintage leather jacket on EcoFinds!',
      timestamp: new Date('2024-01-08'),
      engagement: { likes: 28, shares: 8, comments: 7 }
    },
    {
      id: '3',
      platform: 'Facebook',
      content: 'Our EcoFinds community just reached 10,000 members!',
      timestamp: new Date('2024-01-05'),
      engagement: { likes: 45, shares: 23, comments: 12 }
    }
  ];

  const platforms = [
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-600', users: '2.9B' },
    { name: 'Twitter', icon: Twitter, color: 'bg-sky-500', users: '450M' },
    { name: 'Instagram', icon: Instagram, color: 'bg-pink-600', users: '2B' },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', users: '900M' }
  ];

  const handleShare = (platform: string, content: string) => {
    // In a real app, this would integrate with social media APIs
    console.log(`Sharing to ${platform}:`, content);
    // For demo purposes, we'll just copy to clipboard
    navigator.clipboard.writeText(content);
    alert(`Content copied to clipboard for ${platform}!`);
  };

  const handleLike = (templateId: string) => {
    // Toggle like status
    console.log(`Toggled like for template ${templateId}`);
  };

  if (!user) {
    return <PleaseLogin message='Please sign in to access social sharing'/>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <PageHeader title="Social Share" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
              Social Share
            </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Share your sustainable journey and inspire others to make eco-friendly choices
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">24</h3>
                <p className="text-muted-foreground">Total Shares</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">156</h3>
                <p className="text-muted-foreground">Total Likes</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">89</h3>
                <p className="text-muted-foreground">People Reached</p>
              </GlassCard>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-muted/50 p-1 rounded-xl">
              {[
                { id: 'templates', label: 'Templates', icon: FileText },
                { id: 'history', label: 'History', icon: Calendar },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-white shadow-lg text-green-600 font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-foreground">Share Templates</h2>
                  <PremiumButton variant="eco" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Create Template
                  </PremiumButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {shareTemplates.map((template) => (
                    <GlassCard key={template.id} className="p-6 hover:scale-105 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{template.title}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>

                      <div className="bg-muted/50 p-4 rounded-lg mb-4">
                        <p className="text-sm text-foreground">{template.content}</p>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {template.hashtags.map((hashtag) => (
                          <Badge key={hashtag} variant="outline" className="text-xs">
                            #{hashtag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => handleLike(template.id)}
                            className={`flex items-center gap-1 text-sm transition-colors ${
                              template.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${template.isLiked ? 'fill-current' : ''}`} />
                            {template.likes}
                          </button>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Share2 className="w-4 h-4" />
                            {template.shares}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {platforms.slice(0, 2).map((platform) => {
                          const Icon = platform.icon;
                          return (
                            <button
                              key={platform.name}
                              onClick={() => handleShare(platform.name, template.content)}
                              className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:scale-105 ${platform.color}`}
                            >
                              <Icon className="w-4 h-4" />
                              {platform.name}
                            </button>
                          );
                        })}
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Share History</h2>
                
                <div className="space-y-4">
                  {shareHistory.map((share) => (
                    <GlassCard key={share.id} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <Share2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-foreground">{share.platform}</h4>
                            <span className="text-sm text-muted-foreground">
                              {share.timestamp.toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-foreground mb-3">{share.content}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {share.engagement.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <Share2 className="w-4 h-4" />
                              {share.engagement.shares}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {share.engagement.comments}
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Share Analytics</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Platform Performance</h3>
                    <div className="space-y-4">
                      {platforms.map((platform) => {
                        const Icon = platform.icon;
                        return (
                          <div key={platform.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center`}>
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{platform.name}</p>
                                <p className="text-xs text-muted-foreground">{platform.users} users</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-foreground">12</p>
                              <p className="text-xs text-muted-foreground">shares</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Engagement Trends</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">This Week</span>
                        <span className="font-semibold text-green-600">+24%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">This Month</span>
                        <span className="font-semibold text-green-600">+156%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Total Reach</span>
                        <span className="font-semibold text-foreground">2.4K</span>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
