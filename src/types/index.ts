export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  price: number;
  imageUrl?: string;
  sellerId: string;
  seller: User;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface Purchase {
  id: string;
  productId: string;
  product: Product;
  buyerId: string;
  buyer: User;
  purchaseDate: Date;
  totalAmount: number;
}

export enum ProductCategory {
  ELECTRONICS = 'Electronics',
  CLOTHING = 'Clothing',
  FURNITURE = 'Furniture',
  BOOKS = 'Books',
  SPORTS = 'Sports & Fitness',
  HOME_GARDEN = 'Home & Garden',
  TOYS = 'Toys & Games',
  AUTOMOTIVE = 'Automotive',
  BEAUTY = 'Beauty & Health',
  OTHER = 'Other'
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppState {
  auth: AuthState;
  products: Product[];
  cart: CartItem[];
  purchases: Purchase[];
}
