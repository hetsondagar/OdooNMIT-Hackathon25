import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Grid3X3, 
  List, 
  Filter,
  TrendingUp,
  Star,
  Package,
  Users,
  Leaf,
  Sparkles
} from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  parent_id?: number;
  is_active: boolean;
  product_count: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category_id: number;
  seller_id: number;
  price: number;
  condition_rating: string;
  is_available: boolean;
  eco_friendly_score: number;
  carbon_footprint_saved: number;
  location?: string;
  category_name: string;
  seller_name: string;
  primary_image: string;
  average_rating: number;
  review_count: number;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  const loadCategories = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockCategories: Category[] = [
        { id: 1, name: 'Electronics', description: 'Electronic devices and gadgets', icon: 'smartphone', product_count: 25 },
        { id: 2, name: 'Computers & Laptops', description: 'Computers, laptops, and accessories', icon: 'laptop', parent_id: 1, product_count: 12 },
        { id: 3, name: 'Mobile Phones', description: 'Smartphones and mobile accessories', icon: 'smartphone', parent_id: 1, product_count: 8 },
        { id: 4, name: 'Audio & Video', description: 'Speakers, headphones, cameras', icon: 'headphones', parent_id: 1, product_count: 5 },
        { id: 5, name: 'Clothing', description: 'Fashion and apparel', icon: 'shirt', product_count: 45 },
        { id: 6, name: 'Men\'s Clothing', description: 'Men\'s fashion and accessories', icon: 'user', parent_id: 5, product_count: 20 },
        { id: 7, name: 'Women\'s Clothing', description: 'Women\'s fashion and accessories', icon: 'user', parent_id: 5, product_count: 18 },
        { id: 8, name: 'Kids\' Clothing', description: 'Children\'s clothing and accessories', icon: 'baby', parent_id: 5, product_count: 7 },
        { id: 9, name: 'Furniture', description: 'Home and office furniture', icon: 'home', product_count: 30 },
        { id: 10, name: 'Living Room', description: 'Sofas, chairs, tables', icon: 'sofa', parent_id: 9, product_count: 15 },
        { id: 11, name: 'Bedroom', description: 'Beds, dressers, nightstands', icon: 'bed', parent_id: 9, product_count: 10 },
        { id: 12, name: 'Office', description: 'Desks, chairs, storage', icon: 'briefcase', parent_id: 9, product_count: 5 },
        { id: 13, name: 'Books', description: 'Books and educational materials', icon: 'book', product_count: 20 },
        { id: 14, name: 'Sports & Fitness', description: 'Sports equipment and fitness gear', icon: 'dumbbell', product_count: 15 },
        { id: 15, name: 'Home & Garden', description: 'Home improvement and gardening', icon: 'home', product_count: 18 },
        { id: 16, name: 'Toys & Games', description: 'Children\'s toys and games', icon: 'gamepad', product_count: 12 },
        { id: 17, name: 'Beauty & Health', description: 'Beauty products and health items', icon: 'heart', product_count: 8 },
        { id: 18, name: 'Automotive', description: 'Car parts and accessories', icon: 'car', product_count: 6 }
      ];
      setCategories(mockCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      // Mock data for now - replace with actual API call
      const mockProducts: Product[] = [
        {
          id: 1,
          title: 'MacBook Pro 13" (2020)',
          description: 'Excellent condition MacBook Pro with M1 chip',
          category_id: 2,
          seller_id: 1,
          price: 899.99,
          condition_rating: 'excellent',
          is_available: true,
          eco_friendly_score: 85,
          carbon_footprint_saved: 12.5,
          location: 'Eco City, EC',
          category_name: 'Computers & Laptops',
          seller_name: 'EcoWarrior',
          primary_image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
          average_rating: 4.8,
          review_count: 12
        },
        {
          id: 2,
          title: 'iPhone 12 Pro',
          description: 'iPhone 12 Pro in Space Gray, 128GB',
          category_id: 3,
          seller_id: 2,
          price: 599.99,
          condition_rating: 'excellent',
          is_available: true,
          eco_friendly_score: 82,
          carbon_footprint_saved: 8.7,
          location: 'Green Valley, GV',
          category_name: 'Mobile Phones',
          seller_name: 'GreenSarah',
          primary_image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
          average_rating: 4.6,
          review_count: 8
        }
      ];
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category_id === selectedCategory)
    : products;

  const getCategoryIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      smartphone: <Package className="h-6 w-6" />,
      laptop: <Grid3X3 className="h-6 w-6" />,
      headphones: <Search className="h-6 w-6" />,
      shirt: <Users className="h-6 w-6" />,
      user: <Users className="h-6 w-6" />,
      baby: <Users className="h-6 w-6" />,
      home: <Leaf className="h-6 w-6" />,
      sofa: <Leaf className="h-6 w-6" />,
      bed: <Leaf className="h-6 w-6" />,
      briefcase: <Leaf className="h-6 w-6" />,
      book: <Star className="h-6 w-6" />,
      dumbbell: <TrendingUp className="h-6 w-6" />,
      gamepad: <Sparkles className="h-6 w-6" />,
      heart: <Star className="h-6 w-6" />,
      car: <Package className="h-6 w-6" />
    };
    return iconMap[iconName] || <Package className="h-6 w-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <div className="mb-6 flex justify-center">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-sm">
                <Grid3X3 className="h-5 w-5 text-yellow-300" />
                <span className="font-medium">Browse Categories</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 sm:text-5xl lg:text-6xl">
              Discover by <span className="text-yellow-300">Category</span>
            </h1>
            
            <p className="text-lg text-white/90 sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-8">
              Explore our wide range of sustainable products organized by category. Find exactly what you're looking for!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-10">
        {/* Search and Filters */}
        <Card className="p-6 mb-8 shadow-floating">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass border-border/50 focus:border-green-500 transition-all duration-300"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredCategories.length} categor{filteredCategories.length !== 1 ? 'ies' : 'y'} found
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="hover-lift"
              >
                Clear Search
              </Button>
            )}
          </div>
        </Card>

        {/* Categories Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredCategories.map((category) => (
            <Card 
              key={category.id}
              className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
                selectedCategory === category.id ? 'ring-2 ring-green-500' : ''
              }`}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors">
                      {getCategoryIcon(category.icon || 'package')}
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    {category.product_count}
                  </Badge>
                </div>
              </CardHeader>
              
              {hoveredCategory === category.id && (
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {category.product_count} products available
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Products
                      </Button>
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        Browse
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Selected Category Products */}
        {selectedCategory && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Products in {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <Link to={`/products?category=${selectedCategory}`}>
                <Button variant="outline">
                  View All Products
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.slice(0, 8).map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        src={product.primary_image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {product.category_name}
                      </p>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-lg font-bold text-green-600">
                          ${product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">
                            {product.average_rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <Link to={`/products/${product.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
