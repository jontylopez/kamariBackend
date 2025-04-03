const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const POS_ORDER = require('./pos_order');
const Inventory = require('./Inventory');
const StockMovements = require('./StockMovements');

const POS_ORDER_ITEM = sequelize.define('POS_ORDER_ITEM', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: POS_ORDER,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  inventory_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Inventory,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  stock_movement_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: StockMovements,
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  discount: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    comment: "Per item discount in %",
  },   
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'pos_order_item',
  timestamps: false
});

// Associations
POS_ORDER_ITEM.belongsTo(POS_ORDER, { foreignKey: 'order_id' });
POS_ORDER_ITEM.belongsTo(Inventory, { foreignKey: 'inventory_id' });
POS_ORDER_ITEM.belongsTo(StockMovements, { foreignKey: 'stock_movement_id' });

module.exports = POS_ORDER_ITEM;
