import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { purchasesAPI } from '@/services/api';
import { Purchase } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import PageHeader from '@/components/PageHeader';
import { 
  ArrowLeft, 
  Package, 
  Calendar, 
  DollarSign,
  User,
  Star,
  MessageCircle,
  Download
} from 'lucide-react';

const Purchases: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPurchases();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const loadPurchases = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const response = await purchasesAPI.getAll();
      if (response.success && response.data?.purchases) {
        // Filter purchases by current user and sort by purchase date (newest first)
        const userPurchases = response.data.purchases
          .filter((purchase: any) => purchase.userId === user.id)
          .sort((a: any, b: any) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime());
        setPurchases(userPurchases);
      } else {
        toast.error('Failed to load purchase history');
      }
    } catch (error: any) {
      console.error('Error loading purchases:', error);
      toast.error('Failed to load purchase history. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotalSpent = () => {
    return purchases.reduce((sum, purchase) => sum + purchase.totalAmount, 0);
  };

  const calculateCarbonSaved = () => {
    // Estimate: each second-hand purchase saves approximately 2.5kg CO2
    return purchases.length * 2.5;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your purchase history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageHeader title="Purchase History" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Purchases</p>
                  <p className="text-2xl font-bold text-gray-900">{purchases.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${calculateTotalSpent().toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">CO₂ Saved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {calculateCarbonSaved().toFixed(1)}kg
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Eco-Friendly Purchases</h2>
          <p className="text-gray-600">
            Track your sustainable shopping journey and environmental impact
          </p>
        </div>

        {/* Purchases List */}
        {purchases.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
            <p className="text-gray-600 mb-4">
              Start your sustainable shopping journey by browsing our eco-friendly products
            </p>
            <Link to="/products">
              <Button className="bg-green-600 hover:bg-green-700">
                <Package className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <Card key={purchase.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full lg:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={purchase.product.imageUrl || '/placeholder.svg'}
                        alt={purchase.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Purchase Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {purchase.product.title}
                          </h3>
                          <Badge variant="secondary" className="mb-2">
                            {purchase.product.category}
                          </Badge>
                          <p className="text-gray-600 text-sm">
                            {purchase.product.description}
                          </p>
                        </div>
                        <div className="text-right mt-4 lg:mt-0">
                          <p className="text-xl font-bold text-green-600">
                            ${purchase.totalAmount.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Purchased on {formatDate(purchase.purchaseDate)}
                          </p>
                        </div>
                      </div>

                      <Separator className="my-4" />

                      {/* Seller Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Sold by {purchase.product.seller.username}
                            </p>
                            <p className="text-xs text-gray-500">
                              Member since {formatDate(purchase.product.seller.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Contact Seller
                          </Button>
                          <Button variant="outline" size="sm">
                            <Star className="w-3 h-3 mr-1" />
                            Leave Review
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Environmental Impact Summary */}
        {purchases.length > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Your Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">Carbon Footprint Reduction</h4>
                  <p className="text-green-700 text-sm">
                    By choosing second-hand items, you've prevented approximately{' '}
                    <span className="font-semibold">{calculateCarbonSaved().toFixed(1)}kg</span> of CO₂ 
                    from being emitted into the atmosphere.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-green-800 mb-2">Waste Reduction</h4>
                  <p className="text-green-700 text-sm">
                    You've given {purchases.length} item{purchases.length !== 1 ? 's' : ''} a second life, 
                    keeping them out of landfills and reducing the demand for new production.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Purchases;
