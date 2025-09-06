/**
 * Badge Model
 * Represents achievement badges in the system
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Badge = sequelize.define('Badge', {
    id: {
      type: DataTypes.STRING(100),
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: 'Icon name from Lucide React'
    },
    level: {
      type: DataTypes.ENUM('bronze', 'silver', 'gold', 'platinum', 'diamond'),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('purchases', 'community', 'impact', 'social'),
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    maxProgress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    requirements: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'JSON object describing badge requirements'
    }
  }, {
    tableName: 'badges',
    indexes: [
      {
        fields: ['category']
      },
      {
        fields: ['level']
      },
      {
        fields: ['isActive']
      }
    ]
  });

  return Badge;
};
