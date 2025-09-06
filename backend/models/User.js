/**
 * User Model
 * Represents users in the EcoFinds marketplace
 */

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [6, 255]
      }
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 100]
      }
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: '/placeholder.svg'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users',
    hooks: {
      // Hash password before saving
      beforeCreate: async (user) => {
        if (user.password) {
          const saltRounds = 12;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const saltRounds = 12;
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      }
    }
  });

  // Instance methods
  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password; // Never return password in JSON
    return values;
  };

  // Class methods
  User.findByEmail = async function(email) {
    return await this.findOne({ where: { email } });
  };

  User.findByUsername = async function(username) {
    return await this.findOne({ where: { username } });
  };

  return User;
};
