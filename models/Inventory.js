const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');
const SupBrand = require('./SupBrand');

const Inventory = sequelize.define('Inventory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  supBrId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SupBrand,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  size: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  bCodeId: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'inventory',
  timestamps: false,
  indexes: [{ fields: ['productId', 'size', 'color'] }],
});

Product.hasMany(Inventory, { foreignKey: 'productId' });
Inventory.belongsTo(Product, { foreignKey: 'productId' });

SupBrand.hasMany(Inventory, { foreignKey: 'supBrId' });
Inventory.belongsTo(SupBrand, { foreignKey: 'supBrId' });

module.exports = Inventory;
