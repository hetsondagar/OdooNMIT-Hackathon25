# EcoFinds API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format
All API responses follow this format:
```json
{
  "success": true|false,
  "message": "Description of the result",
  "data": { ... }
}
```

## Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "username",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Products

#### Get All Products
```http
GET /api/products?page=1&limit=20&category=Electronics&search=laptop&minPrice=100&maxPrice=500&sortBy=price&sortOrder=ASC
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Product Title",
  "description": "Product description",
  "category": "Electronics",
  "price": 99.99,
  "imageUrl": "https://example.com/image.jpg",
  "condition": "Like New",
  "location": "New York",
  "carbonFootprint": 5.5,
  "tags": ["eco-friendly", "sustainable"]
}
```

#### Update Product
```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "price": 89.99
}
```

#### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

### Cart

#### Get Cart Items
```http
GET /api/cart
Authorization: Bearer <token>
```

#### Add to Cart
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "uuid",
  "quantity": 1
}
```

#### Update Cart Item
```http
PUT /api/cart/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 2
}
```

#### Remove from Cart
```http
DELETE /api/cart/:id
Authorization: Bearer <token>
```

### Purchases

#### Get Purchase History
```http
GET /api/purchases
Authorization: Bearer <token>
```

#### Create Purchase
```http
POST /api/purchases
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "uuid",
  "quantity": 1,
  "paymentMethod": "credit_card"
}
```

#### Get Sales History
```http
GET /api/purchases/sales
Authorization: Bearer <token>
```

### Wishlist

#### Get Wishlist
```http
GET /api/wishlist
Authorization: Bearer <token>
```

#### Add to Wishlist
```http
POST /api/wishlist
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "uuid",
  "isPriceAlert": true,
  "targetPrice": 50.00
}
```

#### Update Wishlist Item
```http
PUT /api/wishlist/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "isPriceAlert": false,
  "targetPrice": 40.00
}
```

#### Remove from Wishlist
```http
DELETE /api/wishlist/:id
Authorization: Bearer <token>
```

### Badges

#### Get All Badges
```http
GET /api/badges
```

#### Get User Badges
```http
GET /api/badges/user
Authorization: Bearer <token>
```

#### Update Badge Progress
```http
POST /api/badges/update-progress
Authorization: Bearer <token>
```

#### Get Badges by Category
```http
GET /api/badges/category/purchases
```

### Carbon Tracking

#### Get Carbon Data
```http
GET /api/carbon
Authorization: Bearer <token>
```

#### Update Carbon Data
```http
POST /api/carbon/update
Authorization: Bearer <token>
```

#### Update Monthly Goal
```http
PUT /api/carbon/goal
Authorization: Bearer <token>
Content-Type: application/json

{
  "monthlyGoal": 100
}
```

#### Get Leaderboard
```http
GET /api/carbon/leaderboard
```

### Community

#### Get Community Groups
```http
GET /api/community/groups?category=General&location=New York&page=1&limit=20
```

#### Create Community Group
```http
POST /api/community/groups
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Group Name",
  "description": "Group description",
  "category": "General",
  "location": "New York",
  "isPublic": true,
  "tags": ["sustainability", "eco-friendly"]
}
```

#### Get Community Posts
```http
GET /api/community/posts?groupId=uuid&page=1&limit=20
```

#### Create Community Post
```http
POST /api/community/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "groupId": "uuid",
  "content": "Post content",
  "imageUrl": "https://example.com/image.jpg",
  "tags": ["sustainability", "tips"]
}
```

## Error Codes

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Demo Data

The API comes with pre-seeded demo data:

- **Users:** 3 demo users with different profiles
- **Products:** 6 sample products across categories
- **Badges:** 8 achievement badges
- **Community:** 3 groups with sample posts
- **Carbon Data:** Sample carbon tracking data

### Demo Login
```
Email: demo@ecofinds.com
Password: password123
```
