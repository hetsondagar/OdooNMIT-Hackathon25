import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { productsAPI, cartAPI, wishlistAPI } from '@/services/api';
import { Product, ProductCategory } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumButton } from '@/components/ui/premium-button';
import { PremiumProductGrid } from '@/components/ui/premium-product-card';
import { FloatingActions, ScrollToTop } from '@/components/ui/floating-actions';
import PageHeader from '@/components/PageHeader';
import { 
  Search, 
  Filter, 
  Plus, 
  ShoppingCart, 
  Heart,
  MapPin,
  User,
  Sparkles
} from 'lucide-react';

const Products: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
    loadFavorites();
    loadCartItems();
  }, [user]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchQuery, selectedCategory, sortBy]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await productsAPI.getAll();
      if (response.success && response.data?.products) {
        setProducts(response.data.products);
      } else {
        setError('Failed to load products');
      }
    } catch (error: any) {
      console.error('Error loading products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFavorites = async () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    try {
      const response = await wishlistAPI.get();
      if (response.success && response.data?.wishlistItems) {
        const favoriteIds = response.data.wishlistItems.map((item: any) => item.productId);
        setFavorites(favoriteIds);
      }
    } catch (error: any) {
      console.error('Error loading favorites:', error);
    }
  };

  const loadCartItems = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    try {
      const response = await cartAPI.get();
      if (response.success && response.data?.cartItems) {
        const cartItemIds = response.data.cartItems.map((item: any) => item.productId);
        setCartItems(cartItemIds);
      }
    } catch (error: any) {
      console.error('Error loading cart items:', error);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    // Find the product to check if it belongs to the current user
    const product = products.find(p => p.id === productId);
    if (product && product.sellerId === user.id) {
      toast.error('You cannot add your own product to cart!');
      return;
    }

    // Check if item is already in cart
    if (cartItems.includes(productId)) {
      toast.info('Item is already in your cart!');
      return;
    }
    
    try {
      const response = await cartAPI.add(productId, 1);
      if (response.success) {
        setCartItems(prev => [...prev, productId]);
        toast.success('Item added to cart!');
      } else {
        toast.error('Failed to add item to cart');
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart. Please try again.');
    }
  };

  const handleToggleFavorite = async (productId: string) => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      if (favorites.includes(productId)) {
        await wishlistAPI.remove(productId);
        setFavorites(prev => prev.filter(id => id !== productId));
        toast.success('Removed from wishlist');
      } else {
        await wishlistAPI.add(productId);
        setFavorites(prev => [...prev, productId]);
        toast.success('Added to wishlist');
      }
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update wishlist. Please try again.');
    }
  };

  const categories = Object.values(ProductCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <div className="mb-6 flex justify-center">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-yellow-300" />
                <span className="font-medium">Premium Eco Marketplace</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 sm:text-5xl lg:text-6xl">
              Discover <span className="text-yellow-300">Sustainable</span> Finds
            </h1>
            
            <p className="text-lg text-white/90 sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
              Shop pre-owned items with style, save the planet, and join our community of conscious consumers.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-10">
        {/* Search and Filters */}
        <GlassCard className="p-6 mb-8 shadow-floating">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search sustainable products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass border-border/50 focus:border-green-500 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48 glass border-border/50">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="glass border-border/50">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 glass border-border/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="glass border-border/50">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="hover-lift"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </GlassCard>

        {/* Products Grid */}
        {isLoading ? (
          <GlassCard className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
              <Search className="w-12 h-12 text-green-400 animate-spin" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Loading products...</h3>
            <p className="text-muted-foreground">
              Discovering amazing sustainable finds for you
            </p>
          </GlassCard>
        ) : error ? (
          <GlassCard className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-red-400" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">Error loading products</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {error}
            </p>
            <Button onClick={loadProducts} variant="outline">
              Try Again
            </Button>
          </GlassCard>
        ) : filteredProducts.length === 0 ? (
          <GlassCard className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-3">No products found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your search or filter criteria to discover amazing sustainable finds
            </p>
            {user && (
              <Link to="/products/new">
                <PremiumButton variant="eco" size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Add First Product
                </PremiumButton>
              </Link>
            )}
          </GlassCard>
        ) : (
          <PremiumProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
            cartItems={cartItems}
          />
        )}
      </div>

      {/* Floating Actions */}
      <FloatingActions />
      <ScrollToTop />
    </div>
  );
};

export default Products;
