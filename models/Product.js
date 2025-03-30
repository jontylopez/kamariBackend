const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'unisex'),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('UpperBody', 'LowerBody', 'FullBody', 'UnderGarment', 'Article'),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'product',
  timestamps: false,
  indexes: [{ fields: ['name'] }],
});

module.exports = Product;
