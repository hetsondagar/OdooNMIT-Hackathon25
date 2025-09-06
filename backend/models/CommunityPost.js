/**
 * CommunityPost Model
 * Represents posts in community groups
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CommunityPost = sequelize.define('CommunityPost', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'community_groups',
        key: 'id'
      }
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    comments: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    shares: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'community_posts',
    indexes: [
      {
        fields: ['groupId']
      },
      {
        fields: ['authorId']
      },
      {
        fields: ['createdAt']
      },
      {
        fields: ['isActive']
      }
    ]
  });

  return CommunityPost;
};
