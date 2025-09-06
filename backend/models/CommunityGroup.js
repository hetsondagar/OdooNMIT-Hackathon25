/**
 * CommunityGroup Model
 * Represents community groups in the platform
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CommunityGroup = sequelize.define('CommunityGroup', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
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
      type: DataTypes.STRING(100),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    memberCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'community_groups',
    indexes: [
      {
        fields: ['category']
      },
      {
        fields: ['location']
      },
      {
        fields: ['isPublic']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['createdBy']
      }
    ]
  });

  return CommunityGroup;
};
