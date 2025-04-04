const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

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
  tableName: 'brand', 
  timestamps: false  
});

module.exports = Brand;
