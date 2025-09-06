/**
 * WishlistItem Model
 * Represents items in user wishlists
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const WishlistItem = sequelize.define('WishlistItem', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    addedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    priceWhenAdded: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'Price of the product when added to wishlist'
    },
    isPriceAlert: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Whether user wants price alerts for this item'
    },
    targetPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'Target price for price alerts'
    }
  }, {
    tableName: 'wishlist_items',
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['productId']
      },
      {
        unique: true,
        fields: ['userId', 'productId']
      }
    ]
  });

  return WishlistItem;
};
