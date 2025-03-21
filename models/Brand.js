const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import the Sequelize instance

const Brand = sequelize.define('Brand', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'brand', // Explicitly define table name
  timestamps: false  // Disable createdAt and updatedAt
});

module.exports = Brand;
