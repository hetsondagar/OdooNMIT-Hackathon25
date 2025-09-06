// Database connection utility for EcoFinds
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecofinds',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Database service class
export class DatabaseService {
  private static instance: DatabaseService;
  private pool: mysql.Pool;

  private constructor() {
    this.pool = pool;
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Generic query method
  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    try {
      const [rows] = await this.pool.execute(sql, params);
      return rows as T[];
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }

  // Get single record
  async queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const results = await this.query<T>(sql, params);
    return results.length > 0 ? results[0] : null;
  }

  // Execute insert/update/delete
  async execute(sql: string, params: any[] = []): Promise<mysql.ResultSetHeader> {
    try {
      const [result] = await this.pool.execute(sql, params);
      return result as mysql.ResultSetHeader;
    } catch (error) {
      console.error('Database execute error:', error);
      throw error;
    }
  }

  // Transaction support
  async transaction<T>(callback: (connection: mysql.PoolConnection) => Promise<T>): Promise<T> {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Close connection pool
  async close(): Promise<void> {
    await this.pool.end();
  }
}

// Export singleton instance
export const db = DatabaseService.getInstance();

// Database models
export interface User {
  id: number;
  email: string;
  password_hash: string;
  username: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  avatar_url?: string;
  trust_score: number;
  eco_points: number;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  parent_id?: number;
  is_active: boolean;
  created_at: Date;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category_id: number;
  seller_id: number;
  price: number;
  condition_rating: 'excellent' | 'good' | 'fair' | 'poor';
  is_available: boolean;
  eco_friendly_score: number;
  carbon_footprint_saved: number;
  location?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  alt_text?: string;
  created_at: Date;
}

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  added_at: Date;
}

export interface Purchase {
  id: number;
  product_id: number;
  buyer_id: number;
  seller_id: number;
  purchase_price: number;
  shipping_cost: number;
  total_amount: number;
  payment_method?: string;
  shipping_address?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  purchase_date: Date;
  delivered_at?: Date;
}

export interface WishlistItem {
  id: number;
  user_id: number;
  product_id: number;
  added_at: Date;
}

export interface Review {
  id: number;
  product_id: number;
  reviewer_id: number;
  rating: number;
  review_text?: string;
  is_verified_purchase: boolean;
  created_at: Date;
}

export interface SearchHistory {
  id: number;
  user_id: number;
  search_query: string;
  search_type: 'product' | 'category' | 'general';
  results_count: number;
  clicked_results?: string;
  created_at: Date;
}

export interface AISuggestion {
  id: number;
  user_id: number;
  query_text: string;
  suggested_products?: string;
  suggestion_type: 'add_product' | 'find_product' | 'general';
  confidence_score: number;
  is_acted_upon: boolean;
  created_at: Date;
}
