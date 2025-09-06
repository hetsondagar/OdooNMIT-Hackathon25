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
import { ArrowLeft, Upload, Save, X, Image as ImageIcon } from 'lucide-react';

const AddProduct: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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

    setIsLoading(true);

    try {
      const response = await productsAPI.create({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category as ProductCategory,
        price: parseFloat(formData.price),
        imageUrl: formData.imageUrl || '/placeholder.svg',
        isAvailable: true
      });

      if (response.success) {
        toast.success('Product created successfully!');
        setSuccess('Product created successfully!');
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: '',
          price: '',
          imageUrl: ''
        });

        // Redirect to product detail or my listings after a short delay
        setTimeout(() => {
          navigate('/my-listings');
        }, 2000);
      } else {
        toast.error('Failed to create product');
        setError('Failed to create product. Please try again.');
      }

    } catch (error: any) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product. Please try again.');
      setError('Failed to create product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = Object.values(ProductCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Create Product Listing</CardTitle>
            <CardDescription>
              Share your pre-owned items with the EcoFinds community
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
                <Label htmlFor="price">Price ($) *</Label>
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
                <Label>Product Image</Label>
                
                {/* Image Preview */}
                {uploadedImage && (
                  <div className="relative w-full max-w-xs">
                    <img
                      src={uploadedImage}
                      alt="Product preview"
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
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
                    className="flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{uploadedImage ? 'Change Image' : 'Upload Image'}</span>
                  </Button>
                  
                  {/* Fallback URL input */}
                  {!uploadedImage && (
                    <div className="flex-1">
                      <Input
                        placeholder="Or enter image URL"
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

              {/* Preview */}
              {formData.title && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {formData.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {formData.category && `${formData.category} • `}
                          {formData.price && `$${formData.price}`}
                        </p>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                          {formData.description}
                        </p>
                      </div>
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
                  className="bg-green-600 hover:bg-green-700"
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
