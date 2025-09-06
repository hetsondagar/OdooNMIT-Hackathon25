import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { productsAPI } from '@/services/api';
import { Product } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Package,
  Calendar,
  DollarSign,
  AlertCircle
} from 'lucide-react';

const MyListings: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      loadProducts();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const loadProducts = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await productsAPI.getAll();
      if (response.success && response.data?.products) {
        // Filter products by current user
        const userProducts = response.data.products.filter((product: Product) => product.sellerId === user.id);
        setProducts(userProducts);
      } else {
        toast.error('Failed to load your listings');
      }
    } catch (error: any) {
      console.error('Error loading products:', error);
      toast.error('Failed to load your listings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        const response = await productsAPI.delete(productId);
        if (response.success) {
          setProducts(products.filter(p => p.id !== productId));
          toast.success('Product deleted successfully');
          setMessage('Product deleted successfully');
          setTimeout(() => setMessage(''), 3000);
        } else {
          toast.error('Failed to delete product');
        }
      } catch (error: any) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product. Please try again.');
      }
    }
  };

  const handleToggleAvailability = async (productId: string) => {
    try {
      const product = products.find(p => p.id === productId);
      if (product) {
        const response = await productsAPI.update(productId, { isAvailable: !product.isAvailable });
        if (response.success) {
          setProducts(products.map(p => 
            p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p
          ));
          toast.success(`Product ${!product.isAvailable ? 'activated' : 'deactivated'} successfully`);
          setMessage(`Product ${!product.isAvailable ? 'activated' : 'deactivated'} successfully`);
          setTimeout(() => setMessage(''), 3000);
        } else {
          toast.error('Failed to update product availability');
        }
      }
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product availability. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-green-600">
                EcoFinds
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link to="/products/new">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <Alert className="mb-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
              <p className="text-gray-600 mt-2">
                Manage your product listings and track their performance
              </p>
            </div>
            <Link to="/products/new">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Listings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {products.filter(p => p.isAvailable).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${products.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products List */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
            <p className="text-gray-600 mb-4">
              Start selling your pre-owned items to the EcoFinds community
            </p>
            <Link to="/products/new">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Listing
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden relative">
                    <img
                      src={product.imageUrl || '/placeholder.svg'}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {!product.isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-sm">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Inactive
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                      <Badge variant={product.isAvailable ? "default" : "secondary"}>
                        {product.isAvailable ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>

                    <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>Listed {new Date(product.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-green-600">
                        ${(parseFloat(product.price) || 0).toFixed(2)}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <Link to={`/products/${product.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Link to={`/products/${product.id}/edit`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleToggleAvailability(product.id)}
                        >
                          {product.isAvailable ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;
