// AI Service for EcoFinds - Handles intelligent search and suggestions
import { databaseDataService } from './databaseDataService';

export interface AISearchResult {
  type: 'add_product' | 'find_product' | 'general';
  confidence: number;
  suggestions: string[];
  products?: any[];
  message: string;
}

export interface ProductSuggestion {
  name: string;
  price_range: string;
  category: string;
  description: string;
  image_url?: string;
}

export class AIService {
  private static instance: AIService;

  private constructor() {}

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  // Main AI search processing function
  async processSearchQuery(userId: number, query: string): Promise<AISearchResult> {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Save search history
    await databaseDataService.addSearchHistory({
      user_id: userId,
      search_query: query,
      search_type: 'general',
      results_count: 0,
      clicked_results: null
    });

    // Analyze query intent
    const intent = this.analyzeIntent(normalizedQuery);
    
    switch (intent.type) {
      case 'add_product':
        return await this.handleAddProductIntent(userId, normalizedQuery, intent);
      case 'find_product':
        return await this.handleFindProductIntent(userId, normalizedQuery, intent);
      default:
        return await this.handleGeneralIntent(userId, normalizedQuery);
    }
  }

  // Analyze user intent from query
  private analyzeIntent(query: string): { type: 'add_product' | 'find_product' | 'general'; keywords: string[] } {
    const addProductKeywords = ['add', 'sell', 'list', 'post', 'create', 'upload', 'want to add', 'i want to sell'];
    const findProductKeywords = ['buy', 'find', 'search', 'looking for', 'need', 'want to buy', 'i want to buy', 'show me'];
    
    const addProductScore = addProductKeywords.reduce((score, keyword) => 
      query.includes(keyword) ? score + 1 : score, 0);
    const findProductScore = findProductKeywords.reduce((score, keyword) => 
      query.includes(keyword) ? score + 1 : score, 0);

    if (addProductScore > findProductScore && addProductScore > 0) {
      return { type: 'add_product', keywords: this.extractKeywords(query) };
    } else if (findProductScore > 0) {
      return { type: 'find_product', keywords: this.extractKeywords(query) };
    } else {
      return { type: 'general', keywords: this.extractKeywords(query) };
    }
  }

  // Extract keywords from query
  private extractKeywords(query: string): string[] {
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'i', 'want', 'to', 'buy', 'sell', 'add'];
    return query
      .split(' ')
      .filter(word => word.length > 2 && !commonWords.includes(word))
      .map(word => word.replace(/[^\w]/g, ''));
  }

  // Handle add product intent
  private async handleAddProductIntent(userId: number, query: string, intent: { keywords: string[] }): Promise<AISearchResult> {
    const productSuggestion = this.generateProductSuggestion(query, intent.keywords);
    
    // Save AI suggestion
    await databaseDataService.createAISuggestion({
      user_id: userId,
      query_text: query,
      suggested_products: JSON.stringify([productSuggestion]),
      suggestion_type: 'add_product',
      confidence_score: 0.85,
      is_acted_upon: false
    });

    return {
      type: 'add_product',
      confidence: 0.85,
      suggestions: [
        `I'll help you add a ${productSuggestion.name} to your listings!`,
        `Based on your query, I suggest creating a listing for: ${productSuggestion.name}`,
        `Would you like me to help you create a product listing for ${productSuggestion.name}?`
      ],
      message: `I understand you want to add a ${productSuggestion.name} to your listings. I can help you create a product listing with suggested details.`
    };
  }

  // Handle find product intent
  private async handleFindProductIntent(userId: number, query: string, intent: { keywords: string[] }): Promise<AISearchResult> {
    // Search for matching products
    const matchingProducts = await this.searchMatchingProducts(intent.keywords);
    
    // Save AI suggestion
    await databaseDataService.createAISuggestion({
      user_id: userId,
      query_text: query,
      suggested_products: JSON.stringify(matchingProducts.map(p => ({ id: p.id, title: p.title }))),
      suggestion_type: 'find_product',
      confidence: matchingProducts.length > 0 ? 0.9 : 0.6,
      is_acted_upon: false
    });

    if (matchingProducts.length > 0) {
      return {
        type: 'find_product',
        confidence: 0.9,
        suggestions: [
          `I found ${matchingProducts.length} products matching your search!`,
          `Here are some products that match your criteria:`,
          `Would you like to see more details about any of these products?`
        ],
        products: matchingProducts,
        message: `I found ${matchingProducts.length} products that match your search criteria.`
      };
    } else {
      return {
        type: 'find_product',
        confidence: 0.6,
        suggestions: [
          `I couldn't find exact matches for your search, but here are some related products:`,
          `Would you like me to notify you when similar products are added?`,
          `Try searching with different keywords or browse our categories.`
        ],
        message: `I couldn't find exact matches for your search. Would you like to browse our categories or try different keywords?`
      };
    }
  }

  // Handle general intent
  private async handleGeneralIntent(userId: number, query: string): Promise<AISearchResult> {
    const suggestions = [
      `I can help you find products, add new listings, or answer questions about EcoFinds.`,
      `Try asking me to "find a laptop" or "add a product" to get started!`,
      `What would you like to do today?`
    ];

    return {
      type: 'general',
      confidence: 0.5,
      suggestions,
      message: `I'm here to help! You can ask me to find products, add new listings, or get recommendations.`
    };
  }

  // Generate product suggestion based on query
  private generateProductSuggestion(query: string, keywords: string[]): ProductSuggestion {
    // Simple product suggestion logic - in a real app, this would use ML models
    const productName = keywords.join(' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Generate price range based on product type
    const priceRange = this.generatePriceRange(keywords);
    
    // Determine category
    const category = this.determineCategory(keywords);
    
    // Generate description
    const description = this.generateDescription(productName, keywords);

    return {
      name: productName,
      price_range: priceRange,
      category: category,
      description: description,
      image_url: this.generateImageUrl(keywords)
    };
  }

  // Generate price range based on keywords
  private generatePriceRange(keywords: string[]): string {
    const priceKeywords = keywords.filter(word => 
      word.includes('price') || word.includes('cost') || word.includes('budget') ||
      /\d+/.test(word)
    );
    
    if (priceKeywords.length > 0) {
      const numbers = keywords.filter(word => /\d+/.test(word)).map(Number);
      if (numbers.length > 0) {
        const min = Math.min(...numbers);
        const max = min * 1.5;
        return `$${min} - $${max}`;
      }
    }
    
    // Default price ranges based on product type
    if (keywords.some(k => ['laptop', 'computer', 'phone', 'smartphone'].includes(k))) {
      return '$200 - $1500';
    } else if (keywords.some(k => ['clothing', 'shirt', 'dress', 'shoes'].includes(k))) {
      return '$10 - $100';
    } else if (keywords.some(k => ['furniture', 'chair', 'table', 'sofa'].includes(k))) {
      return '$50 - $500';
    } else {
      return '$20 - $200';
    }
  }

  // Determine category based on keywords
  private determineCategory(keywords: string[]): string {
    const categoryMap: { [key: string]: string } = {
      'laptop': 'Computers & Laptops',
      'computer': 'Computers & Laptops',
      'phone': 'Mobile Phones',
      'smartphone': 'Mobile Phones',
      'headphones': 'Audio & Video',
      'speaker': 'Audio & Video',
      'camera': 'Audio & Video',
      'shirt': 'Men\'s Clothing',
      'dress': 'Women\'s Clothing',
      'shoes': 'Sports & Fitness',
      'book': 'Books',
      'chair': 'Furniture',
      'table': 'Furniture',
      'sofa': 'Furniture',
      'toy': 'Toys & Games',
      'game': 'Toys & Games'
    };

    for (const keyword of keywords) {
      if (categoryMap[keyword]) {
        return categoryMap[keyword];
      }
    }

    return 'Other';
  }

  // Generate description based on product name and keywords
  private generateDescription(productName: string, keywords: string[]): string {
    const conditions = ['excellent', 'good', 'fair', 'like new', 'barely used'];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return `${productName} in ${condition} condition. Perfect for eco-conscious buyers looking for sustainable alternatives. This pre-owned item helps reduce waste and carbon footprint.`;
  }

  // Generate image URL (placeholder - in real app, would use Unsplash API)
  private generateImageUrl(keywords: string[]): string {
    const imageKeywords = keywords.join(',');
    return `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`;
  }

  // Search for matching products
  private async searchMatchingProducts(keywords: string[]): Promise<any[]> {
    try {
      // Search products by keywords
      const searchQuery = keywords.join(' ');
      const products = await databaseDataService.searchProducts(searchQuery);
      
      // If no direct matches, try category-based search
      if (products.length === 0) {
        const category = this.determineCategory(keywords);
        const categories = await databaseDataService.getAllCategories();
        const categoryId = categories.find(c => c.name === category)?.id;
        
        if (categoryId) {
          return await databaseDataService.getProductsByCategory(categoryId);
        }
      }
      
      return products.slice(0, 5); // Return top 5 matches
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }

  // Get AI suggestions for user
  async getAISuggestions(userId: number): Promise<any[]> {
    return await databaseDataService.getAISuggestions(userId, 5);
  }

  // Mark suggestion as acted upon
  async markSuggestionActedUpon(suggestionId: number): Promise<void> {
    // This would update the AI suggestion in the database
    // Implementation depends on your database service
  }
}

// Export singleton instance
export const aiService = AIService.getInstance();
