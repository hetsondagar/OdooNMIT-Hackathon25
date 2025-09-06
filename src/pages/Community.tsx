import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { communityAPI } from '@/services/api';
import { toast } from 'sonner';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumButton } from '@/components/ui/premium-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import PageHeader from '@/components/PageHeader';
import { cn } from '@/lib/utils';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  Leaf,
  UserCircle
} from 'lucide-react';

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  location: string;
  isJoined: boolean;
  avatar: string;
  recentActivity: string;
  tags: string[];
}

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    level: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
}

const Community: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'groups' | 'posts' | 'events'>('groups');
  const [searchQuery, setSearchQuery] = useState('');
  const [communityGroups, setCommunityGroups] = useState<CommunityGroup[]>([]);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadCommunityData();
    }
  }, [user]);

  const loadCommunityData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load groups
      const groupsResponse = await communityAPI.getGroups();
      if (groupsResponse.success && groupsResponse.data?.groups) {
        const transformedGroups: CommunityGroup[] = groupsResponse.data.groups.map((group: any) => ({
          id: group.id,
          name: group.name,
          description: group.description,
          memberCount: group.memberCount || 0,
          category: group.category || 'General',
          location: group.location || 'Global',
          isJoined: group.isJoined || false,
          avatar: group.avatar || '/placeholder.svg',
          recentActivity: group.recentActivity || 'Recently',
          tags: group.tags || []
        }));
        setCommunityGroups(transformedGroups);
      }

      // Load posts
      const postsResponse = await communityAPI.getPosts();
      if (postsResponse.success && postsResponse.data?.posts) {
        const transformedPosts: CommunityPost[] = postsResponse.data.posts.map((post: any) => ({
          id: post.id,
          author: {
            name: post.author?.name || 'Anonymous',
            avatar: post.author?.avatar || '/placeholder.svg',
            level: post.author?.level || 'Member'
          },
          content: post.content,
          image: post.image,
          likes: post.likes || 0,
          comments: post.comments || 0,
          shares: post.shares || 0,
          timestamp: post.timestamp || 'Recently',
          tags: post.tags || []
        }));
        setCommunityPosts(transformedPosts);
      }
    } catch (error: any) {
      console.error('Error loading community data:', error);
      setError('Failed to load community data. Please try again.');
      toast.error('Failed to load community data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Static events data (can be moved to backend later)
  const upcomingEvents = [
    {
      id: '1',
      title: 'Community Cleanup Day',
      date: '2024-01-15',
      location: 'Central Park, NYC',
      attendees: 45,
      description: 'Join us for a community cleanup and learn about local environmental initiatives.'
    },
    {
      id: '2',
      title: 'Sustainable Fashion Swap',
      date: '2024-01-20',
      location: 'Brooklyn Community Center',
      attendees: 23,
      description: 'Bring clothes you no longer wear and swap them for something new-to-you!'
    },
    {
      id: '3',
      title: 'Zero Waste Workshop',
      date: '2024-01-25',
      location: 'Online Event',
      attendees: 89,
      description: 'Learn practical tips for reducing waste in your daily life.'
    }
  ];

  const filteredGroups = communityGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Please sign in to access the community</h2>
          <PremiumButton variant="eco">Sign In</PremiumButton>
        </GlassCard>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <PageHeader title="Community" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
              Community
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Connect with like-minded eco-warriors, share experiences, and learn from the community
            </p>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  ⚠️ <strong>Error:</strong> {error}
                </p>
              </div>
            )}
          </div>

          {/* Search and Filter */}
          <GlassCard className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search groups, posts, or events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 glass border border-border/50 rounded-xl focus:border-green-500 transition-all duration-300"
                />
              </div>
              <PremiumButton variant="secondary" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </PremiumButton>
            </div>
          </GlassCard>

          {/* Tabs */}
          <div className="flex space-x-1 bg-muted/50 p-1 rounded-xl">
            {[
              { id: 'groups', label: 'Groups', icon: Users },
              { id: 'posts', label: 'Posts', icon: MessageCircle },
              { id: 'events', label: 'Events', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300',
                    activeTab === tab.id
                      ? 'bg-white shadow-lg text-green-600 font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Groups Tab */}
          {activeTab === 'groups' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Community Groups</h2>
                <PremiumButton variant="eco" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Group
                </PremiumButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGroups.map((group) => (
                  <GlassCard key={group.id} className="p-6 hover:scale-105 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarImage src={group.avatar} alt={group.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/10 to-emerald-500/10 text-primary">
                          {group.avatar && group.avatar !== '/placeholder.svg' ? (
                            <span className="text-sm font-semibold">{group.name[0]}</span>
                          ) : (
                            <UserCircle className="h-6 w-6 text-primary" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{group.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {group.memberCount.toLocaleString()} members
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {group.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {group.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Active {group.recentActivity}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {group.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <PremiumButton
                      variant={group.isJoined ? 'secondary' : 'eco'}
                      size="sm"
                      className="w-full"
                    >
                      {group.isJoined ? 'Joined' : 'Join Group'}
                    </PremiumButton>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Community Posts</h2>
                <PremiumButton variant="eco" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Post
                </PremiumButton>
              </div>

              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <GlassCard key={post.id} className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-10 h-10 border-2 border-primary/20">
                        <AvatarImage src={post.author.avatar} alt={post.author.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/10 to-emerald-500/10 text-primary">
                          {post.author.avatar && post.author.avatar !== '/placeholder.svg' ? (
                            <span className="text-xs font-semibold">{post.author.name[0]}</span>
                          ) : (
                            <UserCircle className="h-5 w-5 text-primary" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{post.author.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {post.author.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                      </div>
                    </div>

                    <p className="text-foreground mb-4">{post.content}</p>

                    {post.image && (
                      <div className="mb-4">
                        <img
                          src={post.image}
                          alt="Post content"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-colors">
                        <Share2 className="w-4 h-4" />
                        {post.shares}
                      </button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-foreground">Upcoming Events</h2>
                <PremiumButton variant="eco" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Event
                </PremiumButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <GlassCard key={event.id} className="p-6 hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {event.attendees} attendees
                      </div>
                    </div>

                    <PremiumButton variant="eco" size="sm" className="w-full">
                      Join Event
                    </PremiumButton>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
