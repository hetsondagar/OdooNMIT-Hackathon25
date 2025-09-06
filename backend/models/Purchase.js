/**
 * Purchase Model
 * Represents completed purchases in the marketplace
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Purchase = sequelize.define('Purchase', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    buyerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    sellerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    purchaseDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
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
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled', 'refunded'),
      defaultValue: 'completed'
    },
    paymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    transactionId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    carbonSaved: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      comment: 'CO2 saved in kg by this purchase'
    }
  }, {
    tableName: 'purchases',
    indexes: [
      {
        fields: ['buyerId']
      },
      {
        fields: ['sellerId']
      },
      {
        fields: ['productId']
      },
      {
        fields: ['purchaseDate']
      },
      {
        fields: ['status']
      }
    ]
  });

  return Purchase;
};
