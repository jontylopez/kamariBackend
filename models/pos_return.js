const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const POS_SESSION = require('./pos_session');
const Inventory = require('./Inventory');

const POS_RETURN = sequelize.define('POS_RETURN', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  session_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: POS_SESSION,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  inventory_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Inventory,
      key: 'id',
    },
    onDelete: 'CASCADE',
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
    allowNull: false,
  },
  status:{
    type: DataTypes.ENUM('unused', 'used'),
    defaultValue:'unused'
  },
  processed_by: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'pos_return', 
  timestamps: false,
});

// Relationships
POS_RETURN.belongsTo(POS_SESSION, { foreignKey: 'session_id' });
POS_RETURN.belongsTo(Inventory, { foreignKey: 'inventory_id' });

module.exports = POS_RETURN;
