/**
 * CartItem Model
 * Represents items in user shopping carts
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CartItem = sequelize.define('CartItem', {
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1
      }
    },
    addedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'cart_items',
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

  return CartItem;
};
