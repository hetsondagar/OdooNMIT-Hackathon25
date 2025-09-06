/**
 * Models Index
 * This file initializes all models and their associations
 */

const { sequelize } = require('../config/sequelize');

// Import all models
const User = require('./User')(sequelize);
const Product = require('./Product')(sequelize);
const CartItem = require('./CartItem')(sequelize);
const Purchase = require('./Purchase')(sequelize);
const WishlistItem = require('./WishlistItem')(sequelize);
const Badge = require('./Badge')(sequelize);
const UserBadge = require('./UserBadge')(sequelize);
const CommunityGroup = require('./CommunityGroup')(sequelize);
const CommunityPost = require('./CommunityPost')(sequelize);
const CarbonData = require('./CarbonData')(sequelize);

// Define associations

// User associations
User.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
User.hasMany(CartItem, { foreignKey: 'userId', as: 'cartItems' });
User.hasMany(Purchase, { foreignKey: 'buyerId', as: 'purchases' });
User.hasMany(Purchase, { foreignKey: 'sellerId', as: 'sales' });
User.hasMany(WishlistItem, { foreignKey: 'userId', as: 'wishlistItems' });
User.hasMany(UserBadge, { foreignKey: 'userId', as: 'userBadges' });
User.hasMany(CommunityGroup, { foreignKey: 'createdBy', as: 'createdGroups' });
User.hasMany(CommunityPost, { foreignKey: 'authorId', as: 'posts' });
User.hasOne(CarbonData, { foreignKey: 'userId', as: 'carbonData' });

// Product associations
Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });
Product.hasMany(CartItem, { foreignKey: 'productId', as: 'cartItems' });
Product.hasMany(Purchase, { foreignKey: 'productId', as: 'purchases' });
Product.hasMany(WishlistItem, { foreignKey: 'productId', as: 'wishlistItems' });

// CartItem associations
CartItem.belongsTo(User, { foreignKey: 'userId', as: 'user' });
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Purchase associations
Purchase.belongsTo(User, { foreignKey: 'buyerId', as: 'buyer' });
Purchase.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });
Purchase.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// WishlistItem associations
WishlistItem.belongsTo(User, { foreignKey: 'userId', as: 'user' });
WishlistItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

// Badge associations
Badge.hasMany(UserBadge, { foreignKey: 'badgeId', as: 'userBadges' });

// UserBadge associations
UserBadge.belongsTo(User, { foreignKey: 'userId', as: 'user' });
UserBadge.belongsTo(Badge, { foreignKey: 'badgeId', as: 'badge' });

// CommunityGroup associations
CommunityGroup.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
CommunityGroup.hasMany(CommunityPost, { foreignKey: 'groupId', as: 'posts' });

// CommunityPost associations
CommunityPost.belongsTo(CommunityGroup, { foreignKey: 'groupId', as: 'group' });
CommunityPost.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// CarbonData associations
CarbonData.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Export all models
module.exports = {
  sequelize,
  User,
  Product,
  CartItem,
  Purchase,
  WishlistItem,
  Badge,
  UserBadge,
  CommunityGroup,
  CommunityPost,
  CarbonData
};
