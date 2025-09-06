import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, ShoppingCart, Heart, MessageCircle } from 'lucide-react';
import { FloatingActionButton } from '@/components/ui/premium-button';
import { useAuth } from '@/contexts/AuthContext';
import { dataStore } from '@/lib/data';

export function FloatingActions() {
  const { user } = useAuth();
  const cartItemCount = user ? dataStore.getCartItems(user.id).length : 0;

  if (!user) return null;

  return (
    <>
      {/* Main FAB - Add Product */}
      <Link to="/products/new">
        <FloatingActionButton
          icon={<Plus className="h-6 w-6" />}
          label="Add New Product"
          position="bottom-right"
          className="h-16 w-16 shadow-floating hover:shadow-2xl"
        />
      </Link>

      {/* Secondary FABs */}
      <div className="fixed bottom-6 right-24 flex flex-col gap-3">
        {/* Cart FAB */}
        <Link to="/cart">
          <FloatingActionButton
            icon={<ShoppingCart className="h-5 w-5" />}
            label={`Cart (${cartItemCount})`}
            position="bottom-right"
            className="h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          />
        </Link>

        {/* Wishlist FAB */}
        <FloatingActionButton
          icon={<Heart className="h-5 w-5" />}
          label="Wishlist"
          position="bottom-right"
          className="h-12 w-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
        />

        {/* Support FAB */}
        <FloatingActionButton
          icon={<MessageCircle className="h-5 w-5" />}
          label="Support"
          position="bottom-right"
          className="h-12 w-12 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
        />
      </div>
    </>
  );
}

interface ScrollToTopProps {
  threshold?: number;
}

export function ScrollToTop({ threshold = 300 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <FloatingActionButton
      icon={<div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
      label="Back to Top"
      position="bottom-left"
      onClick={scrollToTop}
      className="h-12 w-12 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
    />
  );
}
