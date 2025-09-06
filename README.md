# 🌱 EcoFinds - Sustainable Marketplace

A comprehensive sustainable marketplace application built with React, TypeScript, and MySQL. Features AI-powered search, community features, and a normalized database design.

## 🚀 Features

### Core Features
- **User Authentication & Profiles** - Secure login/registration with profile management
- **Product Management** - Add, edit, delete, and browse sustainable products
- **Shopping Cart & Purchases** - Complete e-commerce functionality
- **Categories & Search** - Organized product categories with advanced search
- **Community Platform** - Social features, groups, events, and leaderboards
- **AI-Powered Search** - Intelligent product suggestions and search

### Database Features
- **Normalized Database Design** - Properly structured MySQL database
- **Sample Data** - 10-15 realistic sample entries across all tables
- **Advanced Queries** - Complex queries for trending products, user analytics
- **Search History** - Track user search patterns for AI improvements

### AI Features
- **Intent Recognition** - Understands "add product" vs "find product" queries
- **Product Suggestions** - Generates realistic product suggestions
- **Smart Recommendations** - Suggests products based on user queries
- **Natural Language Processing** - Processes user queries intelligently

## 📁 Project Structure

```
OdooNMIT-Hackathon25/
├── database/
│   ├── ecofinds_schema.sql      # Database schema
│   └── ecofinds_sample_data.sql # Sample data
├── src/
│   ├── components/
│   │   ├── AI/
│   │   │   └── AISearch.tsx     # AI search component
│   │   ├── Layout/
│   │   │   └── Header.tsx       # Navigation header
│   │   └── ui/                  # Reusable UI components
│   ├── lib/
│   │   ├── database.ts          # Database connection
│   │   ├── databaseDataService.ts # Database operations
│   │   └── aiService.ts         # AI processing logic
│   ├── pages/
│   │   ├── Categories.tsx       # Categories page
│   │   ├── Community.tsx        # Community page
│   │   ├── Dashboard.tsx        # User dashboard
│   │   └── ...                  # Other pages
│   └── types/
│       └── index.ts             # TypeScript definitions
└── env.example                  # Environment configuration
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### 1. Database Setup

1. **Create MySQL Database:**
   ```sql
   CREATE DATABASE ecofinds;
   ```

2. **Run Schema Script:**
   ```bash
   mysql -u root -p ecofinds < database/ecofinds_schema.sql
   ```

3. **Insert Sample Data:**
   ```bash
   mysql -u root -p ecofinds < database/ecofinds_sample_data.sql
   ```

### 2. Environment Configuration

1. **Copy Environment File:**
   ```bash
   cp env.example .env
   ```

2. **Update Database Credentials:**
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ecofinds
   DB_PORT=3306
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts and profiles
- **categories** - Product categories (hierarchical)
- **products** - Product listings
- **product_images** - Product images (one-to-many)
- **cart_items** - Shopping cart items
- **purchases** - Purchase history
- **wishlist_items** - User wishlists
- **reviews** - Product reviews and ratings

### Advanced Tables
- **search_history** - Track user searches for AI
- **ai_suggestions** - Store AI-generated suggestions

### Key Features
- **Normalized Design** - Eliminates data redundancy
- **Foreign Key Constraints** - Maintains data integrity
- **Indexes** - Optimized for performance
- **JSON Support** - Flexible data storage for AI features

## 🤖 AI Search Features

### Intent Recognition
The AI can understand different user intents:
- **Add Product**: "I want to add a laptop"
- **Find Product**: "Find smart LED lights under $50"
- **General**: "What can you help me with?"

### Product Suggestions
When users want to add products, the AI:
1. Analyzes the query for keywords
2. Determines product category
3. Generates realistic price ranges
4. Creates product descriptions
5. Suggests images from Unsplash API

### Smart Recommendations
For product searches, the AI:
1. Searches existing products
2. Matches by keywords and categories
3. Provides alternative suggestions
4. Shows confidence scores

## 🌟 Key Features Implemented

### ✅ Categories Page
- **Hover Effects** - Categories show details on hover
- **Product Counts** - Shows number of products per category
- **Grid/List View** - Toggle between view modes
- **Search Functionality** - Search within categories
- **Product Preview** - Shows products when category selected

### ✅ Community Page
- **Social Feed** - Community posts with likes/comments
- **Groups** - Join eco-focused groups
- **Events** - Community events and meetups
- **Leaderboard** - Eco points and achievements
- **User Profiles** - Trust scores and eco points

### ✅ AI Search Integration
- **Dashboard Integration** - AI search in user dashboard
- **Natural Language** - Understands user intent
- **Product Suggestions** - Generates realistic suggestions
- **Smart Recommendations** - Finds matching products
- **Confidence Scoring** - Shows AI confidence levels

### ✅ Database Integration
- **MySQL Connection** - Proper database connection
- **Service Layer** - Clean separation of concerns
- **Type Safety** - Full TypeScript support
- **Error Handling** - Robust error management

## 🔧 API Integration

### Image Fetching
The system can automatically fetch product images from:
- **Unsplash API** - High-quality stock photos
- **Placeholder Images** - Fallback images
- **User Uploads** - Custom product images

### Future Enhancements
- **OpenAI Integration** - More sophisticated AI
- **Payment Processing** - Stripe/PayPal integration
- **Real-time Chat** - Community messaging
- **Mobile App** - React Native version

## 📱 Responsive Design

- **Mobile-First** - Optimized for all devices
- **Touch-Friendly** - Mobile navigation
- **Progressive Web App** - PWA capabilities
- **Dark Mode** - Theme switching support

## 🚀 Getting Started

1. **Clone the repository**
2. **Set up MySQL database**
3. **Configure environment variables**
4. **Install dependencies**
5. **Run the application**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **shadcn/ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing
- **MySQL** - Reliable database system

---

**Built with ❤️ for a sustainable future** 🌱
