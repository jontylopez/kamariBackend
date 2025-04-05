const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product');
const SupBrand = require('./sup_brand');

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
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  sup_br_id: {
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
  b_code_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'inventory',
  timestamps: false,
  indexes: [{ fields: ['product_id', 'size', 'color'] }],
});

Product.hasMany(Inventory, { foreignKey: 'product_id' });
Inventory.belongsTo(Product, { foreignKey: 'product_id' });

SupBrand.hasMany(Inventory, { foreignKey: 'sup_br_id' });
Inventory.belongsTo(SupBrand, { foreignKey: 'sup_br_id' });

module.exports = Inventory;
