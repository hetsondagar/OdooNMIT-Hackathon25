import { User, Product, CartItem, Purchase, ProductCategory } from '@/types';

// Simple in-memory data store with localStorage persistence
class DataStore {
  private users: User[] = [];
  private products: Product[] = [];
  private cart: CartItem[] = [];
  private purchases: Purchase[] = [];

  constructor() {
    this.loadFromStorage();
    this.initializeSampleData();
  }

  private loadFromStorage() {
    try {
      const usersData = localStorage.getItem('ecofinds_users');
      const productsData = localStorage.getItem('ecofinds_products');
      const cartData = localStorage.getItem('ecofinds_cart');
      const purchasesData = localStorage.getItem('ecofinds_purchases');

      if (usersData) this.users = JSON.parse(usersData);
      if (productsData) this.products = JSON.parse(productsData);
      if (cartData) this.cart = JSON.parse(cartData);
      if (purchasesData) this.purchases = JSON.parse(purchasesData);
    } catch (error) {
      console.error('Error loading data from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('ecofinds_users', JSON.stringify(this.users));
      localStorage.setItem('ecofinds_products', JSON.stringify(this.products));
      localStorage.setItem('ecofinds_cart', JSON.stringify(this.cart));
      localStorage.setItem('ecofinds_purchases', JSON.stringify(this.purchases));
    } catch (error) {
      console.error('Error saving data to storage:', error);
    }
  }

  private initializeSampleData() {
    // Only initialize if no data exists
    if (this.users.length === 0) {
      const sampleUser: User = {
        id: '1',
        email: 'demo@ecofinds.com',
        password: 'password123',
        username: 'EcoWarrior',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        address: '123 Green Street, Eco City',
        avatar: '/placeholder.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.users.push(sampleUser);
    }

    // Products will be loaded from the backend API
    // No hardcoded products in the frontend

    this.saveToStorage();
  }

  // User methods
  createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.push(newUser);
    this.saveToStorage();
    return newUser;
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  updateUser(id: string, updates: Partial<User>): User | null {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date()
    };
    this.saveToStorage();
    return this.users[userIndex];
  }

  // Product methods
  createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'seller'>): Product {
    const seller = this.findUserById(productData.sellerId);
    if (!seller) throw new Error('Seller not found');

    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      seller,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.push(newProduct);
    this.saveToStorage();
    return newProduct;
  }

  getProducts(): Product[] {
    return this.products.filter(product => product.isAvailable);
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getProductsBySeller(sellerId: string): Product[] {
    return this.products.filter(product => product.sellerId === sellerId);
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return null;

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updates,
      updatedAt: new Date()
    };
    this.saveToStorage();
    return this.products[productIndex];
  }

  deleteProduct(id: string): boolean {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) return false;

    this.products.splice(productIndex, 1);
    this.saveToStorage();
    return true;
  }

  searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(product => 
      product.isAvailable && (
        product.title.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  getProductsByCategory(category: ProductCategory): Product[] {
    return this.products.filter(product => 
      product.isAvailable && product.category === category
    );
  }

  // Cart methods
  addToCart(productId: string, userId: string): CartItem {
    const existingItem = this.cart.find(item => 
      item.productId === productId && item.product.sellerId === userId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const product = this.getProductById(productId);
      if (!product) throw new Error('Product not found');

      const newCartItem: CartItem = {
        id: Date.now().toString(),
        productId,
        product,
        quantity: 1,
        addedAt: new Date()
      };
      this.cart.push(newCartItem);
    }

    this.saveToStorage();
    return existingItem || this.cart[this.cart.length - 1];
  }

  getCartItems(userId: string): CartItem[] {
    return this.cart.filter(item => item.product.sellerId === userId);
  }

  removeFromCart(itemId: string): boolean {
    const itemIndex = this.cart.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return false;

    this.cart.splice(itemIndex, 1);
    this.saveToStorage();
    return true;
  }

  clearCart(userId: string): void {
    this.cart = this.cart.filter(item => item.product.sellerId !== userId);
    this.saveToStorage();
  }

  // Purchase methods
  createPurchase(productId: string, buyerId: string): Purchase {
    const product = this.getProductById(productId);
    const buyer = this.findUserById(buyerId);
    
    if (!product || !buyer) throw new Error('Product or buyer not found');

    const newPurchase: Purchase = {
      id: Date.now().toString(),
      productId,
      product,
      buyerId,
      buyer,
      purchaseDate: new Date(),
      totalAmount: product.price
    };

    this.purchases.push(newPurchase);
    
    // Mark product as unavailable
    this.updateProduct(productId, { isAvailable: false });
    
    // Remove from cart
    this.cart = this.cart.filter(item => item.productId !== productId);
    
    this.saveToStorage();
    return newPurchase;
  }

  getPurchasesByUser(userId: string): Purchase[] {
    return this.purchases.filter(purchase => purchase.buyerId === userId);
  }
}

export const dataStore = new DataStore();
