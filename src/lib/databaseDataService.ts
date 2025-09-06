// Database-based data service for EcoFinds
import { db, User, Category, Product, ProductImage, CartItem, Purchase, WishlistItem, Review, SearchHistory, AISuggestion } from './database';

export class DatabaseDataService {
  // User methods
  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const sql = `
      INSERT INTO users (email, password_hash, username, first_name, last_name, phone, address, avatar_url, trust_score, eco_points, is_verified)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      userData.email,
      userData.password_hash,
      userData.username,
      userData.first_name,
      userData.last_name,
      userData.phone,
      userData.address,
      userData.avatar_url,
      userData.trust_score,
      userData.eco_points,
      userData.is_verified
    ];
    
    const result = await db.execute(sql, params);
    return await this.getUserById(result.insertId);
  }

  async getUserById(id: number): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE id = ?';
    return await db.queryOne<User>(sql, [id]);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE email = ?';
    return await db.queryOne<User>(sql, [email]);
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | null> {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    const sql = `UPDATE users SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    
    await db.execute(sql, [...values, id]);
    return await this.getUserById(id);
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    const sql = 'SELECT * FROM categories WHERE is_active = TRUE ORDER BY name';
    return await db.query<Category>(sql);
  }

  async getCategoryById(id: number): Promise<Category | null> {
    const sql = 'SELECT * FROM categories WHERE id = ? AND is_active = TRUE';
    return await db.queryOne<Category>(sql, [id]);
  }

  async getCategoriesWithProducts(): Promise<(Category & { product_count: number })[]> {
    const sql = `
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_available = TRUE
      WHERE c.is_active = TRUE
      GROUP BY c.id
      ORDER BY c.name
    `;
    return await db.query(sql);
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    const sql = 'SELECT * FROM products WHERE is_available = TRUE ORDER BY created_at DESC';
    return await db.query<Product>(sql);
  }

  async getProductById(id: number): Promise<Product | null> {
    const sql = 'SELECT * FROM products WHERE id = ? AND is_available = TRUE';
    return await db.queryOne<Product>(sql, [id]);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const sql = 'SELECT * FROM products WHERE category_id = ? AND is_available = TRUE ORDER BY created_at DESC';
    return await db.query<Product>(sql, [categoryId]);
  }

  async getProductsBySeller(sellerId: number): Promise<Product[]> {
    const sql = 'SELECT * FROM products WHERE seller_id = ? AND is_available = TRUE ORDER BY created_at DESC';
    return await db.query<Product>(sql, [sellerId]);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const sql = `
      SELECT * FROM products 
      WHERE is_available = TRUE 
      AND (title LIKE ? OR description LIKE ?)
      ORDER BY created_at DESC
    `;
    const searchTerm = `%${query}%`;
    return await db.query<Product>(sql, [searchTerm, searchTerm]);
  }

  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const sql = `
      INSERT INTO products (title, description, category_id, seller_id, price, condition_rating, eco_friendly_score, carbon_footprint_saved, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      productData.title,
      productData.description,
      productData.category_id,
      productData.seller_id,
      productData.price,
      productData.condition_rating,
      productData.eco_friendly_score,
      productData.carbon_footprint_saved,
      productData.location
    ];
    
    const result = await db.execute(sql, params);
    return await this.getProductById(result.insertId);
  }

  async updateProduct(id: number, updates: Partial<Product>): Promise<Product | null> {
    const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    const sql = `UPDATE products SET ${fields}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    
    await db.execute(sql, [...values, id]);
    return await this.getProductById(id);
  }

  async deleteProduct(id: number): Promise<boolean> {
    const sql = 'UPDATE products SET is_available = FALSE WHERE id = ?';
    const result = await db.execute(sql, [id]);
    return result.affectedRows > 0;
  }

  // Product Images methods
  async getProductImages(productId: number): Promise<ProductImage[]> {
    const sql = 'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, created_at ASC';
    return await db.query<ProductImage>(sql, [productId]);
  }

  async addProductImage(imageData: Omit<ProductImage, 'id' | 'created_at'>): Promise<ProductImage> {
    const sql = `
      INSERT INTO product_images (product_id, image_url, is_primary, alt_text)
      VALUES (?, ?, ?, ?)
    `;
    const params = [imageData.product_id, imageData.image_url, imageData.is_primary, imageData.alt_text];
    
    const result = await db.execute(sql, params);
    const sql2 = 'SELECT * FROM product_images WHERE id = ?';
    return await db.queryOne<ProductImage>(sql2, [result.insertId]);
  }

  // Cart methods
  async getCartItems(userId: number): Promise<CartItem[]> {
    const sql = 'SELECT * FROM cart_items WHERE user_id = ? ORDER BY added_at DESC';
    return await db.query<CartItem>(sql, [userId]);
  }

  async addToCart(userId: number, productId: number, quantity: number = 1): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = await db.queryOne<CartItem>(
      'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (existingItem) {
      // Update quantity
      const sql = 'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?';
      await db.execute(sql, [quantity, existingItem.id]);
      return await db.queryOne<CartItem>('SELECT * FROM cart_items WHERE id = ?', [existingItem.id]);
    } else {
      // Add new item
      const sql = 'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)';
      const result = await db.execute(sql, [userId, productId, quantity]);
      return await db.queryOne<CartItem>('SELECT * FROM cart_items WHERE id = ?', [result.insertId]);
    }
  }

  async removeFromCart(cartItemId: number): Promise<boolean> {
    const sql = 'DELETE FROM cart_items WHERE id = ?';
    const result = await db.execute(sql, [cartItemId]);
    return result.affectedRows > 0;
  }

  async clearCart(userId: number): Promise<void> {
    const sql = 'DELETE FROM cart_items WHERE user_id = ?';
    await db.execute(sql, [userId]);
  }

  // Purchase methods
  async createPurchase(purchaseData: Omit<Purchase, 'id' | 'purchase_date' | 'delivered_at'>): Promise<Purchase> {
    const sql = `
      INSERT INTO purchases (product_id, buyer_id, seller_id, purchase_price, shipping_cost, total_amount, payment_method, shipping_address, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      purchaseData.product_id,
      purchaseData.buyer_id,
      purchaseData.seller_id,
      purchaseData.purchase_price,
      purchaseData.shipping_cost,
      purchaseData.total_amount,
      purchaseData.payment_method,
      purchaseData.shipping_address,
      purchaseData.status
    ];
    
    const result = await db.execute(sql, params);
    return await db.queryOne<Purchase>('SELECT * FROM purchases WHERE id = ?', [result.insertId]);
  }

  async getPurchasesByUser(userId: number): Promise<Purchase[]> {
    const sql = 'SELECT * FROM purchases WHERE buyer_id = ? ORDER BY purchase_date DESC';
    return await db.query<Purchase>(sql, [userId]);
  }

  // Wishlist methods
  async getWishlistItems(userId: number): Promise<WishlistItem[]> {
    const sql = 'SELECT * FROM wishlist_items WHERE user_id = ? ORDER BY added_at DESC';
    return await db.query<WishlistItem>(sql, [userId]);
  }

  async addToWishlist(userId: number, productId: number): Promise<WishlistItem> {
    const sql = 'INSERT INTO wishlist_items (user_id, product_id) VALUES (?, ?)';
    const result = await db.execute(sql, [userId, productId]);
    return await db.queryOne<WishlistItem>('SELECT * FROM wishlist_items WHERE id = ?', [result.insertId]);
  }

  async removeFromWishlist(userId: number, productId: number): Promise<boolean> {
    const sql = 'DELETE FROM wishlist_items WHERE user_id = ? AND product_id = ?';
    const result = await db.execute(sql, [userId, productId]);
    return result.affectedRows > 0;
  }

  // Review methods
  async getProductReviews(productId: number): Promise<Review[]> {
    const sql = 'SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC';
    return await db.query<Review>(sql, [productId]);
  }

  async createReview(reviewData: Omit<Review, 'id' | 'created_at'>): Promise<Review> {
    const sql = `
      INSERT INTO reviews (product_id, reviewer_id, rating, review_text, is_verified_purchase)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      reviewData.product_id,
      reviewData.reviewer_id,
      reviewData.rating,
      reviewData.review_text,
      reviewData.is_verified_purchase
    ];
    
    const result = await db.execute(sql, params);
    return await db.queryOne<Review>('SELECT * FROM reviews WHERE id = ?', [result.insertId]);
  }

  // Search History methods
  async addSearchHistory(searchData: Omit<SearchHistory, 'id' | 'created_at'>): Promise<SearchHistory> {
    const sql = `
      INSERT INTO search_history (user_id, search_query, search_type, results_count, clicked_results)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      searchData.user_id,
      searchData.search_query,
      searchData.search_type,
      searchData.results_count,
      searchData.clicked_results
    ];
    
    const result = await db.execute(sql, params);
    return await db.queryOne<SearchHistory>('SELECT * FROM search_history WHERE id = ?', [result.insertId]);
  }

  async getSearchHistory(userId: number, limit: number = 10): Promise<SearchHistory[]> {
    const sql = 'SELECT * FROM search_history WHERE user_id = ? ORDER BY created_at DESC LIMIT ?';
    return await db.query<SearchHistory>(sql, [userId, limit]);
  }

  // AI Suggestions methods
  async createAISuggestion(suggestionData: Omit<AISuggestion, 'id' | 'created_at'>): Promise<AISuggestion> {
    const sql = `
      INSERT INTO ai_suggestions (user_id, query_text, suggested_products, suggestion_type, confidence_score, is_acted_upon)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      suggestionData.user_id,
      suggestionData.query_text,
      suggestionData.suggested_products,
      suggestionData.suggestion_type,
      suggestionData.confidence_score,
      suggestionData.is_acted_upon
    ];
    
    const result = await db.execute(sql, params);
    return await db.queryOne<AISuggestion>('SELECT * FROM ai_suggestions WHERE id = ?', [result.insertId]);
  }

  async getAISuggestions(userId: number, limit: number = 5): Promise<AISuggestion[]> {
    const sql = 'SELECT * FROM ai_suggestions WHERE user_id = ? ORDER BY created_at DESC LIMIT ?';
    return await db.query<AISuggestion>(sql, [userId, limit]);
  }

  // Complex queries for enhanced functionality
  async getProductsWithDetails(): Promise<(Product & { category_name: string; seller_name: string; primary_image: string; average_rating: number; review_count: number })[]> {
    const sql = `
      SELECT 
        p.*,
        c.name as category_name,
        u.username as seller_name,
        pi.image_url as primary_image,
        COALESCE(AVG(r.rating), 0) as average_rating,
        COUNT(r.id) as review_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.seller_id = u.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
      LEFT JOIN reviews r ON p.id = r.product_id
      WHERE p.is_available = TRUE
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `;
    return await db.query(sql);
  }

  async getTrendingProducts(limit: number = 10): Promise<(Product & { category_name: string; seller_name: string; primary_image: string; purchase_count: number })[]> {
    const sql = `
      SELECT 
        p.*,
        c.name as category_name,
        u.username as seller_name,
        pi.image_url as primary_image,
        COUNT(pr.id) as purchase_count
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.seller_id = u.id
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
      LEFT JOIN purchases pr ON p.id = pr.product_id
      WHERE p.is_available = TRUE
      GROUP BY p.id
      ORDER BY purchase_count DESC, p.created_at DESC
      LIMIT ?
    `;
    return await db.query(sql, [limit]);
  }
}

// Export singleton instance
export const databaseDataService = new DatabaseDataService();
