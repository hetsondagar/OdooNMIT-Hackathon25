import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { productsAPI, cartAPI, wishlistAPI } from '@/services/api';
import { Product } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PageHeader from '@/components/PageHeader';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  User, 
  MapPin, 
  Calendar,
  MessageCircle,
  Share2,
  Edit,
  Trash2
} from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError('');
      const response = await productsAPI.getById(id);
      if (response.success && response.data?.product) {
        setProduct(response.data.product);
        // Check if product is in wishlist
        if (user) {
          checkWishlistStatus(id);
        }
      } else {
        setError('Product not found');
      }
    } catch (error: any) {
      console.error('Error loading product:', error);
      setError('Failed to load product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkWishlistStatus = async (productId: string) => {
    try {
      const response = await wishlistAPI.get();
      if (response.success && response.data?.wishlist) {
        const isInWishlist = response.data.wishlist.some((item: any) => item.productId === productId);
        setIsInWishlist(isInWishlist);
      }
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    if (!product) return;

    try {
      const response = await cartAPI.add(product.id, 1);
      if (response.success) {
        toast.success('Product added to cart!');
        setMessage('Product added to cart!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        toast.error('Failed to add product to cart');
        setError('Failed to add product to cart');
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart. Please try again.');
      setError('Failed to add product to cart');
    }
  };

  const handlePurchase = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!product) return;

    try {
      dataStore.createPurchase(product.id, user.id);
      setMessage('Purchase successful! Thank you for your eco-friendly choice.');
      setTimeout(() => {
        navigate('/purchases');
      }, 2000);
    } catch (error) {
      setError('Failed to complete purchase');
    }
  };

  const handleDelete = async () => {
    if (!product || !user || product.sellerId !== user.id) return;

    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await productsAPI.delete(product.id);
        if (response.success) {
          toast.success('Product deleted successfully');
          navigate('/my-listings');
        } else {
          toast.error('Failed to delete product');
          setError('Failed to delete product');
        }
      } catch (error: any) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product. Please try again.');
        setError('Failed to delete product');
      }
    }
  };

  const handleToggleWishlist = async () => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      navigate('/login');
      return;
    }

    if (!product) return;

    try {
      if (isInWishlist) {
        await wishlistAPI.remove(product.id);
        setIsInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        await wishlistAPI.add(product.id);
        setIsInWishlist(true);
        toast.success('Added to wishlist');
      }
    } catch (error: any) {
      console.error('Error toggling wishlist:', error);
      toast.error('Failed to update wishlist. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-gray-600 mb-4">{error || 'The product you are looking for does not exist.'}</p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = user && product.sellerId === user.id;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageHeader title="Product Details" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <Alert className="mb-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.imageUrl || '/placeholder.svg'}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{product.title}</CardTitle>
                    <Badge variant="secondary" className="mb-4">
                      {product.category}
                    </Badge>
                  </div>
                  {isOwner && (
                    <div className="flex space-x-2">
                      <Link to={`/products/${product.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDelete}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="text-3xl font-bold text-green-600">
                  ₹{(parseFloat(product.price) || 0).toFixed(0)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Seller Information</h4>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">{product.seller.username}</p>
                      <p className="text-sm text-gray-500">
                        Member since {new Date(product.seller.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Product Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Listed on {new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Available for pickup/delivery</span>
                    </div>
                  </div>
                </div>

                {!isOwner && (
                  <div className="space-y-3 pt-4">
                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      onClick={handlePurchase}
                      variant="outline"
                      className="w-full"
                    >
                      Buy Now
                    </Button>
                  </div>
                )}

                <div className="flex space-x-2 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`flex-1 ${isInWishlist ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                    onClick={handleToggleWishlist}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
                    {isInWishlist ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products - TODO: Implement with backend API */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">More from this seller</h2>
          <div className="text-center py-8 text-gray-500">
            <p>Related products will be loaded from the backend</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
