import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumButton } from '@/components/ui/premium-button';
import { PremiumProductCard } from '@/components/ui/premium-product-card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Eye, 
  Heart, 
  ShoppingCart,
  Star,
  Filter,
  Search,
  Calendar,
  MapPin,
  Users,
  Award,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import PleaseLogin from '@/components/Warning/PleaseLogin';

interface TrendingProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  views: number;
  likes: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  carbonSaved: number;
  condition: string;
  location: string;
  isLiked: boolean;
  isInCart: boolean;
  rating: number;
  reviews: number;
  timeLeft?: string;
}

interface TrendingCategory {
  name: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  icon: React.ComponentType<any>;
}

const TrendingListings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'sellers'>('products');
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | '30d' | 'all'>('7d');
  const [sortBy, setSortBy] = useState<'trend' | 'views' | 'likes' | 'price'>('trend');

  const trendingProducts: TrendingProduct[] = [
    {
      id: '1',
      title: 'Vintage Denim Jacket',
      price: 45,
      image: '/placeholder.svg',
      category: 'Fashion',
      seller: 'EcoStyler',
      views: 1247,
      likes: 89,
      trend: 'up',
      trendValue: 23,
      carbonSaved: 8.5,
      condition: 'Excellent',
      location: 'New York, NY',
      isLiked: false,
      isInCart: false,
      rating: 4.8,
      reviews: 24,
      timeLeft: '2 days left'
    },
    {
      id: '2',
      title: 'Handmade Pottery Set',
      price: 32,
      image: '/placeholder.svg',
      category: 'Home & Garden',
      seller: 'CraftedGreen',
      views: 892,
      likes: 67,
      trend: 'up',
      trendValue: 18,
      carbonSaved: 4.2,
      condition: 'Like New',
      location: 'San Francisco, CA',
      isLiked: true,
      isInCart: false,
      rating: 4.9,
      reviews: 18,
      timeLeft: '5 days left'
    },
    {
      id: '3',
      title: 'Eco-Friendly Sneakers',
      price: 68,
      image: '/placeholder.svg',
      category: 'Fashion',
      seller: 'SustainableSteps',
      views: 2156,
      likes: 156,
      trend: 'up',
      trendValue: 45,
      carbonSaved: 12.3,
      condition: 'Good',
      location: 'Los Angeles, CA',
      isLiked: false,
      isInCart: true,
      rating: 4.7,
      reviews: 42,
      timeLeft: '1 day left'
    },
    {
      id: '4',
      title: 'Bamboo Picture Frames',
      price: 24,
      image: '/placeholder.svg',
      category: 'Home & Garden',
      seller: 'NaturalFrames',
      views: 634,
      likes: 34,
      trend: 'down',
      trendValue: 8,
      carbonSaved: 3.1,
      condition: 'Excellent',
      location: 'Seattle, WA',
      isLiked: false,
      isInCart: false,
      rating: 4.6,
      reviews: 12,
      timeLeft: '3 days left'
    },
    {
      id: '5',
      title: 'Vintage Leather Bag',
      price: 89,
      image: '/placeholder.svg',
      category: 'Accessories',
      seller: 'RetroFinds',
      views: 1876,
      likes: 123,
      trend: 'up',
      trendValue: 32,
      carbonSaved: 15.7,
      condition: 'Very Good',
      location: 'Chicago, IL',
      isLiked: true,
      isInCart: false,
      rating: 4.9,
      reviews: 31,
      timeLeft: '4 days left'
    },
    {
      id: '6',
      title: 'Succulent Garden Kit',
      price: 38,
      image: '/placeholder.svg',
      category: 'Home & Garden',
      seller: 'GreenThumb',
      views: 1456,
      likes: 98,
      trend: 'stable',
      trendValue: 2,
      carbonSaved: 6.4,
      condition: 'New',
      location: 'Portland, OR',
      isLiked: false,
      isInCart: false,
      rating: 4.8,
      reviews: 19,
      timeLeft: '6 days left'
    }
  ];

  const trendingCategories: TrendingCategory[] = [
    { name: 'Fashion', count: 1247, trend: 'up', trendValue: 23, icon: Star },
    { name: 'Home & Garden', count: 892, trend: 'up', trendValue: 18, icon: Star },
    { name: 'Electronics', count: 634, trend: 'down', trendValue: 8, icon: Star },
    { name: 'Books', count: 456, trend: 'stable', trendValue: 2, icon: Star },
    { name: 'Sports & Outdoors', count: 789, trend: 'up', trendValue: 15, icon: Star },
    { name: 'Accessories', count: 567, trend: 'up', trendValue: 12, icon: Star }
  ];

  const topSellers = [
    { name: 'EcoStyler', sales: 156, rating: 4.9, products: 23, trend: 'up', trendValue: 15 },
    { name: 'CraftedGreen', sales: 134, rating: 4.8, products: 18, trend: 'up', trendValue: 12 },
    { name: 'SustainableSteps', sales: 98, rating: 4.7, products: 15, trend: 'stable', trendValue: 3 },
    { name: 'NaturalFrames', sales: 87, rating: 4.6, products: 12, trend: 'down', trendValue: 5 },
    { name: 'RetroFinds', sales: 76, rating: 4.9, products: 9, trend: 'up', trendValue: 18 }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-500" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
    }
  };

  const sortedProducts = [...trendingProducts].sort((a, b) => {
    switch (sortBy) {
      case 'trend': return b.trendValue - a.trendValue;
      case 'views': return b.views - a.views;
      case 'likes': return b.likes - a.likes;
      case 'price': return b.price - a.price;
      default: return 0;
    }
  });

  if (!user) {
    return <PleaseLogin message='Please sign in to view trending listings'/>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
            
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Trending Listings
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Discover what's popular in the sustainable marketplace and find your next eco-friendly purchase
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">2.4K</h3>
                <p className="text-muted-foreground">Total Views</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">567</h3>
                <p className="text-muted-foreground">Total Likes</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">89</h3>
                <p className="text-muted-foreground">Items Sold</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">156</h3>
                <p className="text-muted-foreground">CO₂ Saved (kg)</p>
              </GlassCard>
            </div>

            {/* Filters */}
            <GlassCard className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value as any)}
                      className="glass border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-green-500 transition-all duration-300"
                    >
                      <option value="24h">Last 24 hours</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="all">All time</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="glass border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-green-500 transition-all duration-300"
                    >
                      <option value="trend">Trending</option>
                      <option value="views">Most Viewed</option>
                      <option value="likes">Most Liked</option>
                      <option value="price">Price</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search trending items..."
                    className="glass border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-green-500 transition-all duration-300 w-64"
                  />
                </div>
              </div>
            </GlassCard>

            {/* Tabs */}
            <div className="flex space-x-1 bg-muted/50 p-1 rounded-xl">
              {[
                { id: 'products', label: 'Products', icon: Star },
                { id: 'categories', label: 'Categories', icon: Award },
                { id: 'sellers', label: 'Top Sellers', icon: Users }
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

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-foreground">Trending Products</h2>
                  <div className="text-sm text-muted-foreground">
                    Showing {sortedProducts.length} products
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <GlassCard key={product.id} className="p-4 hover:scale-105 transition-all duration-300">
                      <div className="relative mb-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              product.trend === 'up' ? 'bg-green-100 text-green-700' :
                              product.trend === 'down' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {getTrendIcon(product.trend)}
                            {product.trendValue}%
                          </Badge>
                        </div>
                        {product.timeLeft && (
                          <div className="absolute top-2 right-2">
                            <Badge variant="destructive" className="text-xs">
                              {product.timeLeft}
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{product.title}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-foreground">${product.price}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-muted-foreground">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {product.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {product.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="w-4 h-4" />
                            {product.carbonSaved}kg CO₂
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {product.location}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {product.condition}
                          </Badge>
                        </div>

                        <div className="flex gap-2">
                          <PremiumButton 
                            variant="eco" 
                            size="sm" 
                            className="flex-1 gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </PremiumButton>
                          <PremiumButton 
                            variant={product.isLiked ? "secondary" : "outline"} 
                            size="sm"
                          >
                            <Heart className={`w-4 h-4 ${product.isLiked ? 'fill-current' : ''}`} />
                          </PremiumButton>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Trending Categories</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <GlassCard key={category.name} className="p-6 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{category.name}</h3>
                              <p className="text-sm text-muted-foreground">{category.count} items</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {getTrendIcon(category.trend)}
                            <span className={`text-sm font-medium ${getTrendColor(category.trend)}`}>
                              {category.trendValue}%
                            </span>
                          </div>
                        </div>
                        <PremiumButton variant="outline" size="sm" className="w-full">
                          View Category
                        </PremiumButton>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sellers Tab */}
            {activeTab === 'sellers' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Top Sellers</h2>
                
                <div className="space-y-4">
                  {topSellers.map((seller, index) => (
                    <GlassCard key={seller.name} className="p-6 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{seller.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{seller.sales} sales</span>
                              <span>{seller.products} products</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                {seller.rating}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(seller.trend)}
                          <span className={`text-sm font-medium ${getTrendColor(seller.trend)}`}>
                            {seller.trendValue}%
                          </span>
                        </div>
                      </div>
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

export default TrendingListings;
