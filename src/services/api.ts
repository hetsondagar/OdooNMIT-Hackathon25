import { User } from '@/types';

const API_BASE_URL = 'http://localhost:5000/api';

// API Response types
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('ecofinds_auth_token');
};

// Set auth token in localStorage
const setAuthToken = (token: string): void => {
  localStorage.setItem('ecofinds_auth_token', token);
};

// Remove auth token from localStorage
const removeAuthToken = (): void => {
  localStorage.removeItem('ecofinds_auth_token');
};

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Authentication API functions
export const authAPI = {
  // Login user
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data?.token) {
      setAuthToken(response.data.token);
    }

    return response;
  },

  // Register user
  register: async (userData: {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
  }): Promise<RegisterResponse> => {
    return await apiRequest<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await apiRequest<{ data: { user: User } }>('/auth/me');
    return response.data.user;
  },

  // Logout user
  logout: (): void => {
    removeAuthToken();
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!getAuthToken();
  },

  // Get stored token
  getToken: getAuthToken,
};

// Products API functions
export const productsAPI = {
  getAll: async () => {
    return await apiRequest('/products');
  },
  
  getById: async (id: string) => {
    return await apiRequest(`/products/${id}`);
  },
  
  create: async (productData: any) => {
    return await apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },
  
  update: async (id: string, productData: any) => {
    return await apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },
  
  delete: async (id: string) => {
    return await apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Cart API functions
export const cartAPI = {
  get: async () => {
    return await apiRequest('/cart');
  },
  
  add: async (productId: string, quantity: number = 1) => {
    return await apiRequest('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },
  
  update: async (productId: string, quantity: number) => {
    return await apiRequest(`/cart/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },
  
  remove: async (productId: string) => {
    return await apiRequest(`/cart/${productId}`, {
      method: 'DELETE',
    });
  },
  
  clear: async () => {
    return await apiRequest('/cart/clear', {
      method: 'DELETE',
    });
  },
};

// Wishlist API functions
export const wishlistAPI = {
  get: async () => {
    return await apiRequest('/wishlist');
  },
  
  add: async (productId: string) => {
    return await apiRequest('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  },
  
  remove: async (productId: string) => {
    return await apiRequest(`/wishlist/${productId}`, {
      method: 'DELETE',
    });
  },
};

// Badges API functions
export const badgesAPI = {
  getAll: async () => {
    return await apiRequest('/badges');
  },
  
  getUserBadges: async () => {
    return await apiRequest('/badges/user');
  },
};

// Community API functions
export const communityAPI = {
  getGroups: async () => {
    return await apiRequest('/community/groups');
  },
  
  getPosts: async () => {
    return await apiRequest('/community/posts');
  },
  
  createPost: async (postData: any) => {
    return await apiRequest('/community/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },
};

// Carbon API functions
export const carbonAPI = {
  getLeaderboard: async () => {
    return await apiRequest('/carbon/leaderboard');
  },
  
  getUserData: async () => {
    return await apiRequest('/carbon/user');
  },
  
  addData: async (carbonData: any) => {
    return await apiRequest('/carbon', {
      method: 'POST',
      body: JSON.stringify(carbonData),
    });
  },
};

export default {
  auth: authAPI,
  products: productsAPI,
  cart: cartAPI,
  wishlist: wishlistAPI,
  badges: badgesAPI,
  community: communityAPI,
  carbon: carbonAPI,
};
