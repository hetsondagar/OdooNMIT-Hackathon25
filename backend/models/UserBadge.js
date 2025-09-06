/**
 * UserBadge Model
 * Represents user progress towards badges
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const UserBadge = sequelize.define('UserBadge', {
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
    badgeId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: 'badges',
        key: 'id'
      }
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    isUnlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    unlockedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'user_badges',
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['badgeId']
      },
      {
        unique: true,
        fields: ['userId', 'badgeId']
      },
      {
        fields: ['isUnlocked']
      }
    ]
  });

  return UserBadge;
};
