import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { productsAPI, cartAPI, wishlistAPI } from '@/services/api';
import { toast } from 'sonner';
import { PremiumProductGrid } from '@/components/ui/premium-product-card';
import { Product } from '@/types';

const ProductGrid = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    if (user) {
      loadFavorites();
      loadCartItems();
    }
  }, [user]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productsAPI.getAll();
      if (response.success && response.data?.products) {
        setProducts(response.data.products);
      } else {
        toast.error('Failed to load products');
      }
    } catch (error: any) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
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
      toast.error('Failed to add item to cart');
    }
  };

  const handleToggleFavorite = async (productId: string) => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      const isFavorite = favorites.includes(productId);
      
      if (isFavorite) {
        // Remove from wishlist
        const response = await wishlistAPI.remove(productId);
        if (response.success) {
          setFavorites(prev => prev.filter(id => id !== productId));
          toast.success('Removed from wishlist');
        } else {
          toast.error('Failed to remove from wishlist');
        }
      } else {
        // Add to wishlist
        const response = await wishlistAPI.add(productId);
        if (response.success) {
          setFavorites(prev => [...prev, productId]);
          toast.success('Added to wishlist!');
        } else {
          toast.error('Failed to add to wishlist');
        }
      }
    } catch (error: any) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update wishlist');
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Featured <span className="text-eco-primary">Eco-Finds</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing pre-loved items from our community of eco-conscious sellers
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                <div className="bg-gray-200 rounded h-4 mb-2"></div>
                <div className="bg-gray-200 rounded h-4 w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <PremiumProductGrid
            products={products.slice(0, 8)} // Show only first 8 products on homepage
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
            cartItems={cartItems}
          />
        )}
        
        <div className="text-center mt-12">
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 text-eco-primary font-semibold hover:text-eco-secondary transition-colors"
          >
            View All Products
            <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;