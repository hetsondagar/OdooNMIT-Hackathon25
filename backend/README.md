# EcoFinds Backend API

A complete Node.js backend API for the EcoFinds sustainable marketplace, built with Express.js and Sequelize ORM.

## 🚀 Features

- **Complete CRUD Operations** for all entities
- **JWT Authentication** with secure password hashing
- **MySQL Database** with automatic table creation
- **CORS Enabled** for frontend integration
- **Rate Limiting** for security
- **Input Validation** with express-validator
- **Error Handling** with proper HTTP status codes
- **Sequelize ORM** with automatic migrations
- **Seed Data** for development and testing

## 📋 Prerequisites

Before running this backend, make sure you have:

- **Node.js** (v16 or higher)
- **MySQL** (v8.0 or higher) or **XAMPP** with MySQL
- **npm** or **yarn** package manager

## 🛠️ Installation

1. **Clone or navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory with the following content:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=ecofinds_db
   DB_USER=root
   DB_PASSWORD=

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # JWT Secret (Change this in production!)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # CORS Configuration
   FRONTEND_URL=http://localhost:8080

   # File Upload Configuration
   MAX_FILE_SIZE=5242880
   UPLOAD_PATH=./uploads
   ```

4. **Start MySQL:**
   - If using XAMPP: Start Apache and MySQL services
   - If using standalone MySQL: Make sure MySQL service is running

5. **Run the server:**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## 🎯 What Happens When You Start

When you run `npm start`, the backend will:

1. ✅ **Connect to MySQL** (creates database if it doesn't exist)
2. ✅ **Create all tables** automatically using Sequelize
3. ✅ **Seed the database** with sample data
4. ✅ **Start the API server** on port 5000
5. ✅ **Enable CORS** for your frontend

## 📊 Database Schema

The backend automatically creates these tables:

- **users** - User accounts and profiles
- **products** - Eco-friendly products for sale
- **cart_items** - Shopping cart functionality
- **purchases** - Purchase history and transactions
- **wishlist_items** - User wishlists
- **badges** - Achievement system badges
- **user_badges** - User progress towards badges
- **community_groups** - Community groups
- **community_posts** - Community posts and discussions
- **carbon_data** - Carbon footprint tracking

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (authenticated)
- `PUT /api/products/:id` - Update product (owner only)
- `DELETE /api/products/:id` - Delete product (owner only)
- `GET /api/products/user/:userId` - Get user's products

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Purchases
- `GET /api/purchases` - Get user's purchase history
- `POST /api/purchases` - Create new purchase
- `GET /api/purchases/sales` - Get user's sales
- `GET /api/purchases/:id` - Get single purchase

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist` - Add item to wishlist
- `PUT /api/wishlist/:id` - Update wishlist item
- `DELETE /api/wishlist/:id` - Remove item from wishlist
- `DELETE /api/wishlist` - Clear wishlist

### Badges
- `GET /api/badges` - Get all badges
- `GET /api/badges/user` - Get user's badge progress
- `POST /api/badges/update-progress` - Update badge progress
- `GET /api/badges/:id` - Get single badge
- `GET /api/badges/category/:category` - Get badges by category

### Carbon Tracking
- `GET /api/carbon` - Get user's carbon data
- `POST /api/carbon/update` - Update carbon data
- `PUT /api/carbon/goal` - Update monthly goal
- `GET /api/carbon/leaderboard` - Get carbon leaderboard

### Community
- `GET /api/community/groups` - Get community groups
- `POST /api/community/groups` - Create community group
- `GET /api/community/groups/:id` - Get single group
- `GET /api/community/posts` - Get community posts
- `POST /api/community/posts` - Create community post
- `GET /api/community/posts/:id` - Get single post

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📝 Sample Data

The backend automatically creates sample data including:

- **3 Demo Users** with different profiles
- **6 Sample Products** across various categories
- **8 Achievement Badges** with different levels
- **3 Community Groups** for different interests
- **3 Sample Posts** in community groups
- **Carbon Data** for all users

### Demo Login Credentials:
- **Email:** demo@ecofinds.com
- **Password:** password123

## 🔧 Configuration

### Database Configuration
The database configuration is in `config/database.js`. It supports:
- Development, test, and production environments
- Automatic table creation
- Connection pooling
- SQL logging in development

### CORS Configuration
CORS is configured to allow requests from your frontend URL. Update the `FRONTEND_URL` in your `.env` file.

### Rate Limiting
Rate limiting is enabled to prevent abuse:
- 100 requests per 15 minutes per IP
- Configurable in `server.js`

## 🚨 Troubleshooting

### Common Issues:

1. **Database Connection Error:**
   - Make sure MySQL is running
   - Check your database credentials in `.env`
   - Ensure the database exists (it will be created automatically)

2. **Port Already in Use:**
   - Change the PORT in your `.env` file
   - Or stop the process using the port

3. **CORS Issues:**
   - Update `FRONTEND_URL` in your `.env` file
   - Make sure your frontend is running on the correct port

4. **JWT Errors:**
   - Make sure `JWT_SECRET` is set in your `.env` file
   - Use a strong, unique secret in production

## 🎉 Success!

Once the server starts successfully, you'll see:

```
✅ Database connection has been established successfully.
✅ Database synchronized successfully.
🎉 Database seeding completed successfully!
✅ Server is running on port 5000
🎉 EcoFinds Backend is ready to serve requests!
```

Your backend is now ready to serve your React frontend! 🚀

## 📚 Next Steps

1. **Test the API** using the health check endpoint: `http://localhost:5000/health`
2. **Connect your frontend** to the API endpoints
3. **Customize the data** by modifying the seed data in `seeds/seedData.js`
4. **Add new features** by creating additional routes and models

## 🤝 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify your MySQL connection
3. Ensure all environment variables are set correctly
4. Check that all dependencies are installed

Happy coding! 🌱
