/**
 * Product Model
 * Represents eco-friendly products in the marketplace
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM(
        'Electronics',
        'Clothing',
        'Furniture',
        'Books',
        'Sports & Fitness',
        'Home & Garden',
        'Toys & Games',
        'Automotive',
        'Beauty & Health',
        'Other'
      ),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sellerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    condition: {
      type: DataTypes.ENUM('Like New', 'Excellent', 'Very Good', 'Good', 'Fair'),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    carbonFootprint: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
      comment: 'CO2 saved in kg by purchasing this item'
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'products',
    indexes: [
      {
        fields: ['sellerId']
      },
      {
        fields: ['category']
      },
      {
        fields: ['isAvailable']
      },
      {
        fields: ['price']
      },
      {
        fields: ['createdAt']
      }
    ]
  });

  return Product;
};
