import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { productsAPI, purchasesAPI, wishlistAPI } from '@/services/api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Layout/Header';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  ShoppingBag, 
  Package, 
  History,
  Plus,
  LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user?.username || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [userStats, setUserStats] = useState({
    totalListings: 0,
    totalPurchases: 0,
    totalWishlistItems: 0,
    totalSpent: 0
  });

  useEffect(() => {
    if (user) {
      loadUserStats();
    }
  }, [user]);

  const loadUserStats = async () => {
    if (!user) return;

    try {
      // Load user's listings
      const productsResponse = await productsAPI.getAll();
      if (productsResponse.success && productsResponse.data?.products) {
        const userListings = productsResponse.data.products.filter((product: any) => product.sellerId === user.id);
        
        // Load user's purchases
        const purchasesResponse = await purchasesAPI.getAll();
        let userPurchases: any[] = [];
        let totalSpent = 0;
        if (purchasesResponse.success && purchasesResponse.data?.purchases) {
          userPurchases = purchasesResponse.data.purchases.filter((purchase: any) => purchase.userId === user.id);
          totalSpent = userPurchases.reduce((sum: number, purchase: any) => sum + (purchase.totalAmount || 0), 0);
        }

        // Load user's wishlist
        const wishlistResponse = await wishlistAPI.get();
        let wishlistItems: any[] = [];
        if (wishlistResponse.success && wishlistResponse.data?.wishlist) {
          wishlistItems = wishlistResponse.data.wishlist;
        }

        setUserStats({
          totalListings: userListings.length,
          totalPurchases: userPurchases.length,
          totalWishlistItems: wishlistItems.length,
          totalSpent
        });
      }
    } catch (error: any) {
      console.error('Error loading user stats:', error);
      toast.error('Failed to load user statistics');
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const success = await updateProfile(editData);
      if (success) {
        setMessage('Profile updated successfully!');
        setIsEditing(false);
      } else {
        setMessage('Failed to update profile');
      }
    } catch (error) {
      setMessage('An error occurred while updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      username: user.username,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      address: user.address || ''
    });
    setIsEditing(false);
    setMessage('');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <Header />
      
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Manage your account details and preferences
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {message && (
                  <Alert>
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}

                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="text-lg">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-gray-600">@{user.username}</p>
                  </div>
                </div>

                <Separator />

                {/* Profile Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    {isEditing ? (
                      <Input
                        id="username"
                        name="username"
                        value={editData.username}
                        onChange={handleInputChange}
                        placeholder="Enter username"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded-md">
                        <span className="text-sm">@{user.username}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center p-2 bg-gray-50 rounded-md">
                      <Mail className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    {isEditing ? (
                      <Input
                        id="firstName"
                        name="firstName"
                        value={editData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded-md">
                        <span className="text-sm">{user.firstName || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    {isEditing ? (
                      <Input
                        id="lastName"
                        name="lastName"
                        value={editData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded-md">
                        <span className="text-sm">{user.lastName || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <div className="flex items-center p-2 bg-gray-50 rounded-md">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm">{user.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        name="address"
                        value={editData.address}
                        onChange={handleInputChange}
                        placeholder="Enter address"
                      />
                    ) : (
                      <div className="flex items-center p-2 bg-gray-50 rounded-md">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-sm">{user.address || 'Not provided'}</span>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Manage your marketplace activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/products/new" className="block">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                  </Button>
                </Link>
                
                <Link to="/my-listings" className="block">
                  <Button variant="outline" className="w-full">
                    <Package className="w-4 h-4 mr-2" />
                    My Listings
                  </Button>
                </Link>
                
                <Link to="/cart" className="block">
                  <Button variant="outline" className="w-full">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Shopping Cart
                  </Button>
                </Link>
                
                <Link to="/purchases" className="block">
                  <Button variant="outline" className="w-full">
                    <History className="w-4 h-4 mr-2" />
                    Purchase History
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Account Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Account Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Member since</span>
                    <span className="text-sm font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last updated</span>
                    <span className="text-sm font-medium">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Listings</span>
                    <span className="text-sm font-medium">{userStats.totalListings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Purchases</span>
                    <span className="text-sm font-medium">{userStats.totalPurchases}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Wishlist Items</span>
                    <span className="text-sm font-medium">{userStats.totalWishlistItems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Spent</span>
                    <span className="text-sm font-medium">${userStats.totalSpent.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
