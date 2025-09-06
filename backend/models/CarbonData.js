/**
 * CarbonData Model
 * Represents user carbon footprint tracking data
 */

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const CarbonData = sequelize.define('CarbonData', {
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
    totalSaved: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: 0
      },
      comment: 'Total CO2 saved in kg'
    },
    monthlyGoal: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 50,
      validate: {
        min: 0
      },
      comment: 'Monthly CO2 saving goal in kg'
    },
    weeklySaved: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: 0
      },
      comment: 'CO2 saved this week in kg'
    },
    itemsRecycled: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    treesEquivalent: {
      type: DataTypes.DECIMAL(8, 2),
      defaultValue: 0,
      validate: {
        min: 0
      },
      comment: 'Equivalent number of trees planted'
    },
    energySaved: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
        min: 0
      },
      comment: 'Energy saved in kWh'
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'carbon_data',
    indexes: [
      {
        unique: true,
        fields: ['userId']
      }
    ]
  });

  return CarbonData;
};
