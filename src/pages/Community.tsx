import React, { useState, useEffect } from 'react';
import Header from '@/components/Layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  TrendingUp,
  Leaf,
  Star,
  Award,
  Calendar,
  MapPin,
  Clock,
  Plus,
  Search,
  Filter,
  Sparkles,
  Zap,
  Target,
  Globe
} from 'lucide-react';

interface CommunityPost {
  id: number;
  author: {
    id: number;
    name: string;
    avatar: string;
    eco_points: number;
    trust_score: number;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  created_at: string;
  tags: string[];
}

interface EcoGroup {
  id: number;
  name: string;
  description: string;
  member_count: number;
  category: string;
  image: string;
  is_joined: boolean;
}

interface EcoEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  attendees: number;
  max_attendees: number;
  image: string;
}

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [groups, setGroups] = useState<EcoGroup[]>([]);
  const [events, setEvents] = useState<EcoEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCommunityData();
  }, []);

  const loadCommunityData = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockPosts: CommunityPost[] = [
        {
          id: 1,
          author: {
            id: 1,
            name: 'EcoWarrior',
            avatar: '/avatars/john.jpg',
            eco_points: 1250,
            trust_score: 4.8
          },
          content: 'Just completed my first zero-waste week! 🎉 Managed to reduce my household waste by 80%. Here are some tips that helped me: 1) Use reusable containers 2) Buy in bulk 3) Compost food scraps. What are your favorite zero-waste tips?',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778d09?w=500',
          likes: 24,
          comments: 8,
          shares: 3,
          created_at: '2024-01-15T10:30:00Z',
          tags: ['zerowaste', 'sustainability', 'tips']
        },
        {
          id: 2,
          author: {
            id: 2,
            name: 'GreenSarah',
            avatar: '/avatars/sarah.jpg',
            eco_points: 2100,
            trust_score: 4.9
          },
          content: 'Found this amazing vintage dress on EcoFinds! Perfect condition and saved it from going to landfill. The seller was so friendly and even included care instructions. Love supporting sustainable fashion! 💚',
          likes: 18,
          comments: 5,
          shares: 2,
          created_at: '2024-01-14T15:45:00Z',
          tags: ['fashion', 'vintage', 'sustainable']
        },
        {
          id: 3,
          author: {
            id: 3,
            name: 'EcoMike',
            avatar: '/avatars/mike.jpg',
            eco_points: 980,
            trust_score: 4.7
          },
          content: 'Just finished building my own compost bin from recycled materials! It\'s amazing how much organic waste we can turn into nutrient-rich soil. Anyone else into composting? Would love to exchange tips! 🌱',
          likes: 31,
          comments: 12,
          shares: 7,
          created_at: '2024-01-13T09:20:00Z',
          tags: ['composting', 'gardening', 'diy']
        }
      ];

      const mockGroups: EcoGroup[] = [
        {
          id: 1,
          name: 'Zero Waste Warriors',
          description: 'A community dedicated to reducing waste and living sustainably',
          member_count: 1250,
          category: 'Lifestyle',
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778d09?w=500',
          is_joined: true
        },
        {
          id: 2,
          name: 'Sustainable Fashion Enthusiasts',
          description: 'Sharing tips on eco-friendly fashion and second-hand shopping',
          member_count: 890,
          category: 'Fashion',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500',
          is_joined: false
        },
        {
          id: 3,
          name: 'Urban Gardeners',
          description: 'Growing food in small spaces and urban environments',
          member_count: 650,
          category: 'Gardening',
          image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
          is_joined: true
        },
        {
          id: 4,
          name: 'Eco Tech Innovators',
          description: 'Exploring technology solutions for environmental challenges',
          member_count: 420,
          category: 'Technology',
          image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500',
          is_joined: false
        }
      ];

      const mockEvents: EcoEvent[] = [
        {
          id: 1,
          title: 'Community Cleanup Day',
          description: 'Join us for a day of cleaning up our local park and learning about waste reduction',
          date: '2024-01-20T09:00:00Z',
          location: 'Central Park, Eco City',
          organizer: 'EcoWarrior',
          attendees: 45,
          max_attendees: 50,
          image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500'
        },
        {
          id: 2,
          title: 'Sustainable Living Workshop',
          description: 'Learn practical tips for reducing your carbon footprint and living more sustainably',
          date: '2024-01-25T14:00:00Z',
          location: 'Green Community Center',
          organizer: 'GreenSarah',
          attendees: 28,
          max_attendees: 30,
          image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778d09?w=500'
        },
        {
          id: 3,
          title: 'EcoFinds Marketplace Meetup',
          description: 'Meet other EcoFinds users, share experiences, and discover new sustainable products',
          date: '2024-01-30T18:00:00Z',
          location: 'Sustainable Cafe Downtown',
          organizer: 'EcoMike',
          attendees: 15,
          max_attendees: 25,
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500'
        }
      ];

      setPosts(mockPosts);
      setGroups(mockGroups);
      setEvents(mockEvents);
    } catch (error) {
      console.error('Error loading community data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <div className="mb-6 flex justify-center">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
                <Users className="h-5 w-5 text-yellow-300" />
                <span className="font-medium">EcoFinds Community</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 sm:text-5xl lg:text-6xl">
              Connect with <span className="text-yellow-300">Eco Warriors</span>
            </h1>
            
            <p className="text-lg text-white/90 sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
              Join our vibrant community of sustainability enthusiasts. Share tips, discover products, and make a positive impact together!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Community Feed */}
          <TabsContent value="feed" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Community Feed</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {post.author.eco_points} pts
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">
                              {post.author.trust_score}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {formatDate(post.created_at)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-800">{post.content}</p>
                    
                    {post.image && (
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={post.image}
                          alt="Post image"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t">
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        {post.shares}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Groups */}
          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Eco Groups</h2>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <Card key={group.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        src={group.image}
                        alt={group.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{group.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          {group.member_count}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{group.name}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {group.description}
                      </p>
                      <Button 
                        className={`w-full ${
                          group.is_joined 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-gray-600 hover:bg-gray-700'
                        }`}
                      >
                        {group.is_joined ? 'Joined' : 'Join Group'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Upcoming Events</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>

            <div className="space-y-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold">{event.title}</h3>
                          <Badge variant="outline">
                            {event.attendees}/{event.max_attendees} attendees
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {formatEventDate(event.date)}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Organized by {event.organizer}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Join Event
                          </Button>
                          <Button size="sm" variant="outline">
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard */}
          <TabsContent value="leaderboard" className="space-y-6">
            <h2 className="text-2xl font-bold">Eco Points Leaderboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Top Contributors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'EcoWarrior', points: 1250, rank: 1 },
                    { name: 'GreenSarah', points: 2100, rank: 2 },
                    { name: 'EcoMike', points: 980, rank: 3 }
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        user.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                        user.rank === 2 ? 'bg-gray-100 text-gray-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.points} points</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Most Active Groups */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Most Active Groups
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Zero Waste Warriors', members: 1250 },
                    { name: 'Sustainable Fashion', members: 890 },
                    { name: 'Urban Gardeners', members: 650 }
                  ].map((group) => (
                    <div key={group.name} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{group.name}</p>
                        <p className="text-sm text-gray-600">{group.members} members</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { user: 'EcoWarrior', achievement: 'Zero Waste Week', points: 100 },
                    { user: 'GreenSarah', achievement: 'First Sale', points: 50 },
                    { user: 'EcoMike', achievement: 'Compost Master', points: 75 }
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{achievement.user}</p>
                        <p className="text-sm text-gray-600">{achievement.achievement}</p>
                      </div>
                      <Badge variant="secondary">+{achievement.points}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
