import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { productsAPI } from '@/services/api';
import { ProductCategory } from '@/types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/Products/ProductCard';
import { ArrowLeft, Upload, Save, X, Image as ImageIcon, CheckCircle, Eye } from 'lucide-react';

const AddProduct: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [createdProduct, setCreatedProduct] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    imageUrl: ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }

      // Compress and create preview
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions (max 800px width/height)
        const maxSize = 800;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
        
        setUploadedImage(compressedDataUrl);
        setFormData(prev => ({
          ...prev,
          imageUrl: compressedDataUrl
        }));
      };
      
      img.src = URL.createObjectURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setFormData(prev => ({
      ...prev,
      imageUrl: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.title.trim()) {
      setError('Product title is required');
      return;
    }

    if (!formData.description.trim()) {
      setError('Product description is required');
      return;
    }

    if (!formData.category) {
      setError('Please select a category');
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    if (!formData.imageUrl.trim()) {
      setError('Please upload a product image or provide an image URL');
      toast.error('Product image is required to list your item');
      return;
    }

    setIsLoading(true);

    try {
      const productData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category as ProductCategory,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl,
        condition: 'Excellent',
        location: 'Mumbai, Maharashtra',
        carbonFootprint: 8.5,
        tags: ['eco-friendly', 'sustainable']
      };
      
      console.log('Creating product with data:', productData);
      console.log('User info:', user);
      console.log('Auth token:', localStorage.getItem('ecofinds_auth_token'));
      
      const response = await productsAPI.create(productData);
      console.log('Product creation response:', response);
      console.log('Response success:', response.success);
      console.log('Response data:', response.data);

      if (response.success) {
        toast.success('Product created successfully!');
        setSuccess('Product created successfully!');
        
        // Store the created product for preview
        setCreatedProduct({
          id: response.data?.product?.id || 'new-product',
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category,
          price: parseFloat(formData.price),
          imageUrl: formData.imageUrl,
          seller: user.firstName + ' ' + user.lastName,
          condition: 'Excellent',
          carbonSaved: 8.5
        });
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: '',
          price: '',
          imageUrl: ''
        });
        setUploadedImage(null);

        // Redirect to my listings after a longer delay to show the preview
        setTimeout(() => {
          navigate('/my-listings');
        }, 4000);
      } else {
        toast.error('Failed to create product');
        setError('Failed to create product. Please try again.');
      }

    } catch (error: any) {
      console.error('Error creating product:', error);
      console.error('Error details:', error.response?.data || error.message);
      toast.error('Failed to create product. Please try again.');
      setError(`Failed to create product: ${error.response?.data?.message || error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = Object.values(ProductCategory);

  // Show success state with created product
  if (createdProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Header */}
        <PageHeader title="Product Created Successfully!" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success Message */}
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Product Listed Successfully!</h3>
                  <p className="text-green-600">Your product is now live and visible to the EcoFinds community.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Created Product Preview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Your New Product</h2>
            </div>
            <div className="flex justify-center">
              <div className="w-80">
                <ProductCard
                  id={createdProduct.id}
                  title={createdProduct.title}
                  price={createdProduct.price}
                  image={createdProduct.imageUrl}
                  category={createdProduct.category}
                  seller={createdProduct.seller}
                  condition={createdProduct.condition}
                  carbonSaved={createdProduct.carbonSaved}
                  isLiked={false}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={() => navigate('/my-listings')}
              className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              View in My Listings
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCreatedProduct(null);
                setSuccess('');
              }}
            >
              Create Another Product
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PageHeader title="Add New Product" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-emerald-500/5 rounded-t-lg">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              Create Product Listing
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Share your pre-owned items with the EcoFinds community and help build a sustainable future
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {/* Product Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Product Title *</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter a descriptive title for your product"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your product, its condition, and any relevant details..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Product Image *</Label>
                <p className="text-sm text-muted-foreground">
                  Upload a clear photo of your product. This is required to list your item.
                </p>
                
                {/* Image Preview */}
                {uploadedImage ? (
                  <div className="relative w-full max-w-sm">
                    <div className="relative overflow-hidden rounded-xl border-2 border-primary/20 shadow-lg">
                      <img
                        src={uploadedImage}
                        alt="Product preview"
                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-8 w-8 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
                      onClick={removeImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <div className="mt-2 text-center">
                      <p className="text-sm font-medium text-green-600">✓ Image uploaded successfully</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-sm h-64 border-2 border-dashed border-muted-foreground/25 rounded-xl flex flex-col items-center justify-center bg-gradient-to-br from-muted/20 to-muted/40 hover:from-muted/30 hover:to-muted/50 transition-all duration-300">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <ImageIcon className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground text-center mb-1">
                      No image uploaded
                    </p>
                    <p className="text-xs text-muted-foreground/70 text-center">
                      Upload an image to continue
                    </p>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex items-center space-x-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{uploadedImage ? 'Change Image' : 'Upload Image'}</span>
                  </Button>
                  
                  {/* Fallback URL input */}
                  {!uploadedImage && (
                    <div className="flex-1">
                      <Input
                        placeholder="Or enter image URL (required)"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        name="imageUrl"
                      />
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-500">
                  Upload a local image or enter an image URL. Max size: 5MB
                </p>
              </div>

              {/* Live Preview */}
              {formData.title && formData.category && formData.price && (uploadedImage || formData.imageUrl) && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <Label className="text-lg font-semibold">Live Preview</Label>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-80">
                      <ProductCard
                        id="preview"
                        title={formData.title}
                        price={parseFloat(formData.price)}
                        image={uploadedImage || formData.imageUrl}
                        category={formData.category}
                        seller={user?.firstName + ' ' + user?.lastName || 'You'}
                        condition="Excellent"
                        carbonSaved={8.5}
                        isLiked={false}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Creating...' : 'Create Listing'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
