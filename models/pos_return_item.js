const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const POS_RETURN = require('./pos_return');
const INVENTORY = require('./inventory');

const POS_RETURN_ITEM = sequelize.define('POS_RETURN_ITEM', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  return_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: POS_RETURN,
      key: 'id',
    },
    onDelete: 'CASCADE'
  },
  inventory_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: INVENTORY,
      key: 'id',
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  restock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  processed_by: {
    type: DataTypes.STRING(100),
    allowNull: true,
  }
}, {
  tableName: 'pos_return_item',
  timestamps: false,
});

// Associations
POS_RETURN_ITEM.belongsTo(POS_RETURN, { foreignKey: 'return_id' });
POS_RETURN_ITEM.belongsTo(INVENTORY, { foreignKey: 'inventory_id' });

module.exports = POS_RETURN_ITEM;