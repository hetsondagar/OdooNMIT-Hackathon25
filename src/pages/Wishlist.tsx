import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistAPI, cartAPI } from '@/services/api';
import { toast } from 'sonner';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumButton } from '@/components/ui/premium-button';
import { Badge } from '@/components/ui/badge';
<<<<<<< HEAD
import PageHeader from '@/components/PageHeader';
=======
import Header from '@/components/Layout/Header';
>>>>>>> d337f7639639938b175ce07271703f293dfa0f86
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Share2, 
  Eye,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  Calendar,
  MapPin,
  Star,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  Tag
} from 'lucide-react';

interface WishlistItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  sellerId: string;
  condition: string;
  location: string;
  carbonSaved: number;
  addedAt: Date;
  isAvailable: boolean;
  priceChanged: boolean;
  originalPrice?: number;
  rating: number;
  reviews: number;
  timeLeft?: string;
}

const Wishlist: React.FC = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<WishlistItem[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'price' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      loadWishlistItems();
    }
  }, [user]);

  useEffect(() => {
    filterAndSortItems();
  }, [wishlistItems, sortBy, sortOrder, categoryFilter, searchQuery]);

  const loadWishlistItems = async () => {
    if (!user) return;

    try {
      const response = await wishlistAPI.get();
      console.log('Wishlist API response:', response); // Debug log
      
      if (response.success && response.data?.wishlistItems) {
        // Transform backend data to match frontend interface
        const transformedItems: WishlistItem[] = response.data.wishlistItems.map((item: any) => ({
          id: item.id,
          productId: item.productId,
          title: item.product?.title || 'Unknown Product',
          price: parseFloat(item.product?.price) || 0,
          image: item.product?.imageUrl || '/placeholder.svg',
          category: item.product?.category || 'Unknown',
          seller: item.product?.seller?.username || 'Unknown Seller',
          sellerId: item.product?.sellerId || item.product?.seller?.id || '',
          condition: item.product?.condition || 'Good',
          location: item.product?.location || 'Unknown',
          carbonSaved: parseFloat(item.product?.carbonFootprint) || 5.0,
          addedAt: new Date(item.createdAt),
          isAvailable: item.product?.isAvailable !== false, // Default to true if not specified
          priceChanged: false, // Default to no price change
          rating: 4.5, // Default rating
          reviews: 0 // Default reviews
        }));
        console.log('Transformed wishlist items:', transformedItems); // Debug log
        setWishlistItems(transformedItems);
      } else {
        console.log('No wishlist data found or API failed:', response);
        setWishlistItems([]);
        if (response.message) {
          toast.error(response.message);
        }
      }
    } catch (error: any) {
      console.error('Error loading wishlist:', error);
      toast.error('Failed to load wishlist. Please try again.');
      setWishlistItems([]);
    }
  };

  const filterAndSortItems = () => {
    let filtered = [...wishlistItems];

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.seller.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort items
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = a.addedAt.getTime() - b.addedAt.getTime();
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredItems(filtered);
  };

  const removeFromWishlist = async (itemId: string) => {
    try {
      const response = await wishlistAPI.remove(itemId);
      if (response.success) {
        setWishlistItems(prev => prev.filter(item => item.id !== itemId));
        toast.success('Item removed from wishlist');
      } else {
        toast.error('Failed to remove item from wishlist');
      }
    } catch (error: any) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item from wishlist. Please try again.');
    }
  };

  const addToCart = async (itemId: string) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      const item = wishlistItems.find(i => i.id === itemId);
      if (item) {
        // Check if the product belongs to the current user
        if (item.sellerId === user.id) {
          toast.error('You cannot add your own product to cart!');
          return;
        }

        const response = await cartAPI.add(item.productId, 1);
        if (response.success) {
          toast.success('Item added to cart!');
        } else {
          toast.error('Failed to add item to cart');
        }
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart. Please try again.');
    }
  };

  const toggleSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAll = () => {
    setSelectedItems(filteredItems.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const removeSelected = async () => {
    try {
      // Remove all selected items from wishlist
      const removePromises = selectedItems.map(itemId => wishlistAPI.remove(itemId));
      await Promise.all(removePromises);
      
      setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      toast.success('Selected items removed from wishlist');
    } catch (error: any) {
      console.error('Error removing selected items:', error);
      toast.error('Failed to remove selected items. Please try again.');
    }
  };

  const categories = ['all', 'Fashion', 'Home & Garden', 'Electronics', 'Books', 'Sports & Outdoors', 'Accessories'];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Please sign in to view your wishlist</h2>
          <PremiumButton variant="eco">Sign In</PremiumButton>
        </GlassCard>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <PageHeader title="My Wishlist" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
              My Wishlist
            </h1>
=======
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      {/* Header Navigation */}
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
            
            {/* Page Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                My Wishlist
              </h1>
>>>>>>> d337f7639639938b175ce07271703f293dfa0f86
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Keep track of your favorite sustainable finds and never miss a great deal
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{wishlistItems.length}</h3>
                <p className="text-muted-foreground">Total Items</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {wishlistItems.filter(item => item.isAvailable).length}
                </h3>
                <p className="text-muted-foreground">Available</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {wishlistItems.filter(item => item.priceChanged).length}
                </h3>
                <p className="text-muted-foreground">Price Drops</p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {wishlistItems.reduce((sum, item) => sum + item.carbonSaved, 0).toFixed(1)}kg
                </h3>
                <p className="text-muted-foreground">CO₂ Potential</p>
              </GlassCard>
            </div>

            {/* Filters and Actions */}
            <GlassCard className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search wishlist..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="glass border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-green-500 transition-all duration-300 w-64"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="glass border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-green-500 transition-all duration-300"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="glass border border-border/50 rounded-lg px-3 py-2 text-sm focus:border-green-500 transition-all duration-300"
                    >
                      <option value="date">Date Added</option>
                      <option value="price">Price</option>
                      <option value="name">Name</option>
                    </select>
                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="p-2 glass border border-border/50 rounded-lg hover:bg-accent/50 transition-all duration-300"
                    >
                      {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {selectedItems.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {selectedItems.length} selected
                    </span>
                    <PremiumButton variant="secondary" size="sm" onClick={removeSelected} className="bg-red-500 hover:bg-red-600 text-white">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Remove
                    </PremiumButton>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Bulk Actions */}
            {filteredItems.length > 0 && (
              <div className="flex items-center gap-2">
                <PremiumButton variant="secondary" size="sm" onClick={selectAll}>
                  Select All
                </PremiumButton>
                <PremiumButton variant="secondary" size="sm" onClick={clearSelection}>
                  Clear Selection
                </PremiumButton>
              </div>
            )}

            {/* Wishlist Items */}
            {filteredItems.length === 0 ? (
              <GlassCard className="p-12 text-center">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-6">
                  Start adding items you love to your wishlist to keep track of them
                </p>
                <PremiumButton variant="eco">Browse Products</PremiumButton>
              </GlassCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <GlassCard key={item.id} className="p-4 hover:scale-105 transition-all duration-300">
                    <div className="relative mb-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelection(item.id)}
                          className="w-4 h-4 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500"
                        />
                      </div>
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {!item.isAvailable && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Sold
                          </Badge>
                        )}
                        {item.priceChanged && (
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            <Tag className="w-3 h-3 mr-1" />
                            Price Drop
                          </Badge>
                        )}
                        {item.timeLeft && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.timeLeft}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          {item.priceChanged && item.originalPrice ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-green-600">${item.price}</span>
                              <span className="text-sm text-muted-foreground line-through">${item.originalPrice}</span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-foreground">${item.price}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-muted-foreground">
                            {item.rating} ({item.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {item.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-4 h-4" />
                          {item.carbonSaved}kg CO₂
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Added {item.addedAt.toLocaleDateString()}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.condition}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        {item.isAvailable ? (
                          <PremiumButton 
                            variant="eco" 
                            size="sm" 
                            className="flex-1 gap-2"
                            onClick={() => addToCart(item.id)}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </PremiumButton>
                        ) : (
                          <PremiumButton 
                            variant="secondary" 
                            size="sm" 
                            className="flex-1 gap-2"
                            disabled
                          >
                            <AlertCircle className="w-4 h-4" />
                            Sold Out
                          </PremiumButton>
                        )}
                        
                        <PremiumButton 
                          variant="secondary" 
                          size="sm"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </PremiumButton>
                        
                        <PremiumButton 
                          variant="secondary" 
                          size="sm"
                        >
                          <Share2 className="w-4 h-4" />
                        </PremiumButton>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
