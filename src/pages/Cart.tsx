import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cartAPI } from '@/services/api';
import { CartItem } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Layout/Header';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft,
  CreditCard,
  Package,
  DollarSign
} from 'lucide-react';

const Cart: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      loadCartItems();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const loadCartItems = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await cartAPI.get();
      if (response.success && response.data?.cartItems) {
        setCartItems(response.data.cartItems);
      } else {
        setCartItems([]);
      }
    } catch (error: any) {
      console.error('Error loading cart items:', error);
      toast.error('Failed to load cart items');
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    try {
      const item = cartItems.find(i => i.id === itemId);
      if (!item) return;

      const response = await cartAPI.update(item.productId, newQuantity);
      if (response.success) {
        const updatedItems = cartItems.map(cartItem => 
          cartItem.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
        );
        setCartItems(updatedItems);
        toast.success('Quantity updated');
      } else {
        toast.error('Failed to update quantity');
      }
    } catch (error: any) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity. Please try again.');
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const item = cartItems.find(i => i.id === itemId);
      if (!item) return;

      const response = await cartAPI.remove(itemId);
      if (response.success) {
        setCartItems(cartItems.filter(cartItem => cartItem.id !== itemId));
        toast.success('Item removed from cart');
        setMessage('Item removed from cart');
        setTimeout(() => setMessage(''), 3000);
      } else {
        toast.error('Failed to remove item');
      }
    } catch (error: any) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item. Please try again.');
    }
  };

  const clearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        const response = await cartAPI.clear();
        if (response.success) {
          setCartItems([]);
          toast.success('Cart cleared');
          setMessage('Cart cleared');
          setTimeout(() => setMessage(''), 3000);
        } else {
          toast.error('Failed to clear cart');
        }
      } catch (error: any) {
        console.error('Error clearing cart:', error);
        toast.error('Failed to clear cart. Please try again.');
      }
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    try {
      // For now, we'll simulate checkout by clearing the cart
      // In a real app, you'd integrate with a payment processor
      const response = await cartAPI.clear();
      if (response.success) {
        setCartItems([]);
        toast.success('Purchase successful! Thank you for your eco-friendly choices.');
        setMessage('Purchase successful! Thank you for your eco-friendly choices.');
        setTimeout(() => {
          navigate('/purchases');
        }, 2000);
      } else {
        toast.error('Checkout failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Error during checkout:', error);
      toast.error('Checkout failed. Please try again.');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
    const tax = subtotal * 0.08; // 8% tax
    return subtotal + shipping + tax;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <Header />
      
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <Alert className="mb-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-4">
              Start adding some eco-friendly products to your cart
            </p>
            <Link to="/products">
              <Button className="bg-green-600 hover:bg-green-700">
                <Package className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Cart Items ({cartItems.length})
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700"
                >
                  Clear Cart
                </Button>
              </div>

              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.imageUrl || '/placeholder.svg'}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.product.category}
                        </p>
                        <p className="text-sm text-gray-500">
                          Sold by {item.product.seller.username}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ${((parseFloat(item.product.price) || 0) * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${(parseFloat(item.product.price) || 0).toFixed(2)} each
                        </p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>
                        {calculateSubtotal() > 50 ? 'Free' : '$5.99'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${(calculateSubtotal() * 0.08).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  {calculateSubtotal() < 50 && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        Add ${(50 - calculateSubtotal()).toFixed(2)} more for free shipping!
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>

                  <Link to="/products" className="block">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
