import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cartAPI, purchasesAPI } from '@/services/api';
import { CartItem } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PageHeader from '@/components/PageHeader';
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('offline');

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
      // Create purchases for each item in the cart
      const purchasePromises = cartItems.map(async (item) => {
        return await purchasesAPI.create({
          productId: item.product.id,
          quantity: item.quantity,
          paymentMethod: selectedPaymentMethod
        });
      });

      const results = await Promise.all(purchasePromises);
      
      // Check if all purchases were successful
      const allSuccessful = results.every(result => result.success);
      
      if (allSuccessful) {
        // Clear the cart after successful purchases
        await cartAPI.clear();
        setCartItems([]);
        toast.success('Purchase successful! Thank you for your eco-friendly choices. Contact 9023684742@ypl for payment details.');
        setMessage('Purchase successful! Thank you for your eco-friendly choices. Contact 9023684742@ypl for payment details.');
        setTimeout(() => {
          navigate('/purchases');
        }, 2000);
      } else {
        toast.error('Some items could not be purchased. Please try again.');
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
    const shipping = subtotal > 4150 ? 0 : 500; // Free shipping over ₹4150 (50 USD)
    const tax = subtotal * 0.08; // 8% tax
    return subtotal + shipping + tax;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <PageHeader title="Shopping Cart" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <Alert className="mb-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <ShoppingCart className="w-16 h-16 text-primary animate-bounce" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">0</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent mb-3">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start adding some eco-friendly products to your cart and make a positive impact on the environment
            </p>
            <Link to="/products">
              <Button className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Package className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                  Cart Items ({cartItems.length})
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20 hover:border-destructive/30 transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </div>

              {cartItems.map((item, index) => (
                <Card key={item.id} className="group hover:shadow-xl transition-all duration-500 hover:scale-[1.02] bg-card/80 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex space-x-6">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 bg-gradient-to-br from-primary/10 to-emerald-500/10 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={item.product.imageUrl || '/placeholder.svg'}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                          {item.product.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                            {item.product.category}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-600 rounded-full">
                            {item.product.condition || 'Good'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Sold by <span className="font-medium text-foreground">{item.product.seller.username}</span>
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <div className="w-12 h-8 bg-gradient-to-r from-primary/10 to-emerald-500/10 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-bold text-foreground">
                            {item.quantity}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                          ₹{((parseFloat(item.product.price) || 0) * item.quantity).toFixed(0)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ₹{(parseFloat(item.product.price) || 0).toFixed(0)} each
                        </p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 hover:scale-110"
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
              <Card className="sticky top-4 bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">₹{calculateSubtotal().toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-foreground">
                        {calculateSubtotal() > 4150 ? 'Free' : '₹500'} {/* 50 USD = ~4150 INR */}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="font-medium text-foreground">₹{(calculateSubtotal() * 0.08).toFixed(0)}</span>
                    </div>
                    <Separator className="bg-border/50" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">Total</span>
                      <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">₹{calculateTotal().toFixed(0)}</span>
                    </div>
                  </div>

                  {calculateSubtotal() < 4150 && (
                    <div className="p-4 bg-gradient-to-r from-primary/10 to-emerald-500/10 rounded-xl border border-primary/20">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <p className="text-sm font-medium text-primary">
                          Add ₹{(4150 - calculateSubtotal()).toFixed(0)} more for free shipping!
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">Payment Method</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 p-3 border border-border/50 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="offline"
                          checked={selectedPaymentMethod === 'offline'}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Offline Payment (All Methods Accepted)</span>
                        </div>
                        <div className="text-xs text-muted-foreground ml-7">
                          Contact: 9023684742@ypl for payment details
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border border-border/50 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={selectedPaymentMethod === 'upi'}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">UPI Payment</span>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border border-border/50 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={selectedPaymentMethod === 'card'}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Credit/Debit Card</span>
                        </div>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border border-border/50 rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="netbanking"
                          checked={selectedPaymentMethod === 'netbanking'}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="text-primary focus:ring-primary"
                        />
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Net Banking</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>

                  <Link to="/products" className="block">
                    <Button variant="outline" className="w-full hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
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
