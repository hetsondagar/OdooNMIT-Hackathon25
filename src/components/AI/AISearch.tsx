import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Search, 
  Sparkles, 
  Plus, 
  ShoppingCart, 
  Heart,
  ArrowRight,
  Bot,
  Lightbulb,
  Package,
  Star
} from 'lucide-react';

interface AISearchResult {
  type: 'add_product' | 'find_product' | 'general';
  confidence: number;
  suggestions: string[];
  products?: any[];
  message: string;
}

interface ProductSuggestion {
  name: string;
  price_range: string;
  category: string;
  description: string;
  image_url?: string;
}

const AISearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AISearchResult | null>(null);
  const [productSuggestion, setProductSuggestion] = useState<ProductSuggestion | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const normalizedQuery = query.toLowerCase().trim();
      
      // Analyze intent
      if (normalizedQuery.includes('add') || normalizedQuery.includes('sell') || normalizedQuery.includes('list')) {
        // Add product intent
        const suggestion = generateProductSuggestion(query);
        setProductSuggestion(suggestion);
        setResult({
          type: 'add_product',
          confidence: 0.85,
          suggestions: [
            `I'll help you add a ${suggestion.name} to your listings!`,
            `Based on your query, I suggest creating a listing for: ${suggestion.name}`,
            `Would you like me to help you create a product listing for ${suggestion.name}?`
          ],
          message: `I understand you want to add a ${suggestion.name} to your listings. I can help you create a product listing with suggested details.`
        });
      } else if (normalizedQuery.includes('buy') || normalizedQuery.includes('find') || normalizedQuery.includes('looking')) {
        // Find product intent
        const mockProducts = generateMockProducts(query);
        setResult({
          type: 'find_product',
          confidence: 0.9,
          suggestions: [
            `I found ${mockProducts.length} products matching your search!`,
            `Here are some products that match your criteria:`,
            `Would you like to see more details about any of these products?`
          ],
          products: mockProducts,
          message: `I found ${mockProducts.length} products that match your search criteria.`
        });
      } else {
        // General intent
        setResult({
          type: 'general',
          confidence: 0.5,
          suggestions: [
            `I can help you find products, add new listings, or answer questions about EcoFinds.`,
            `Try asking me to "find a laptop" or "add a product" to get started!`,
            `What would you like to do today?`
          ],
          message: `I'm here to help! You can ask me to find products, add new listings, or get recommendations.`
        });
      }
    } catch (error) {
      console.error('AI search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateProductSuggestion = (query: string): ProductSuggestion => {
    const keywords = query.toLowerCase().split(' ').filter(word => 
      word.length > 2 && !['the', 'a', 'an', 'and', 'or', 'but', 'i', 'want', 'to', 'add', 'sell'].includes(word)
    );
    
    const productName = keywords.join(' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Generate price range based on product type
    let priceRange = '$20 - $200';
    if (keywords.some(k => ['laptop', 'computer', 'phone', 'smartphone'].includes(k))) {
      priceRange = '$200 - $1500';
    } else if (keywords.some(k => ['clothing', 'shirt', 'dress', 'shoes'].includes(k))) {
      priceRange = '$10 - $100';
    } else if (keywords.some(k => ['furniture', 'chair', 'table', 'sofa'].includes(k))) {
      priceRange = '$50 - $500';
    }
    
    // Determine category
    let category = 'Other';
    if (keywords.some(k => ['laptop', 'computer'].includes(k))) {
      category = 'Computers & Laptops';
    } else if (keywords.some(k => ['phone', 'smartphone'].includes(k))) {
      category = 'Mobile Phones';
    } else if (keywords.some(k => ['clothing', 'shirt', 'dress'].includes(k))) {
      category = 'Clothing';
    } else if (keywords.some(k => ['furniture', 'chair', 'table'].includes(k))) {
      category = 'Furniture';
    }
    
    return {
      name: productName,
      price_range: priceRange,
      category: category,
      description: `${productName} in excellent condition. Perfect for eco-conscious buyers looking for sustainable alternatives.`,
      image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    };
  };

  const generateMockProducts = (query: string) => {
    const keywords = query.toLowerCase();
    
    // Mock products based on query
    const allProducts = [
      {
        id: 1,
        title: 'MacBook Pro 13" (2020)',
        price: 899.99,
        category: 'Computers & Laptops',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        rating: 4.8,
        seller: 'EcoWarrior'
      },
      {
        id: 2,
        title: 'Dell XPS 15 Laptop',
        price: 749.99,
        category: 'Computers & Laptops',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        rating: 4.6,
        seller: 'GreenSarah'
      },
      {
        id: 3,
        title: 'iPhone 12 Pro',
        price: 599.99,
        category: 'Mobile Phones',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
        rating: 4.7,
        seller: 'EcoMike'
      }
    ];
    
    // Filter products based on query
    return allProducts.filter(product => 
      product.title.toLowerCase().includes(keywords) ||
      product.category.toLowerCase().includes(keywords) ||
      keywords.includes('laptop') && product.category.includes('Laptop') ||
      keywords.includes('phone') && product.category.includes('Phone')
    );
  };

  const handleAddToWishlist = (product: any) => {
    // Add to wishlist logic
    console.log('Adding to wishlist:', product);
  };

  const handleCreateListing = () => {
    if (productSuggestion) {
      // Navigate to add product page with pre-filled data
      console.log('Creating listing for:', productSuggestion);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-green-600" />
          AI Assistant
        </CardTitle>
        <CardDescription>
          Tell me what you want to do and I'll help you find or add products!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="e.g., 'I want to add a laptop' or 'Find smart LED lights under $50'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={isLoading || !query.trim()}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* AI Response */}
        {result && (
          <div className="space-y-4">
            <Alert>
              <Bot className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">AI Response:</span>
                  <Badge variant="secondary">
                    {Math.round(result.confidence * 100)}% confidence
                  </Badge>
                </div>
                <p>{result.message}</p>
              </AlertDescription>
            </Alert>

            {/* Suggestions */}
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Suggestions:
              </h4>
              <div className="space-y-2">
                {result.suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Suggestion for Add Product */}
            {result.type === 'add_product' && productSuggestion && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Product Suggestion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={productSuggestion.image_url}
                        alt={productSuggestion.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{productSuggestion.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{productSuggestion.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge variant="outline">{productSuggestion.category}</Badge>
                        <span className="text-green-600 font-medium">{productSuggestion.price_range}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleCreateListing} className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Listing
                    </Button>
                    <Button variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Save for Later
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Product Results for Find Product */}
            {result.type === 'find_product' && result.products && result.products.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium">Found Products:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.products.map((product) => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>
                            <p className="text-xs text-gray-600 mb-1">{product.category}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{product.rating}</span>
                              <span className="text-xs text-gray-500">by {product.seller}</span>
                            </div>
                            <p className="text-sm font-bold text-green-600">${product.price}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Add to Cart
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleAddToWishlist(product)}>
                            <Heart className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                <ArrowRight className="h-4 w-4 mr-2" />
                Browse All Products
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            </div>
          </div>
        )}

        {/* Example Queries */}
        {!result && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Try asking:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "I want to add a laptop product",
                "Find smart LED lights under $50",
                "I'm looking for sustainable clothing",
                "Add a vintage chair to my listings"
              ].map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setQuery(example)}
                  className="text-left justify-start h-auto p-2"
                >
                  <Package className="h-3 w-3 mr-2 flex-shrink-0" />
                  <span className="text-xs">{example}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AISearch;
