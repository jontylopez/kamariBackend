const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const POS_SESSION = require('./pos_session');


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
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    get() {
      const raw = this.getDataValue('total_price');
      return raw === null ? 0 : parseFloat(raw);
    },
  },
  
  status: {
    type: DataTypes.ENUM('unused', 'used'),
    defaultValue: 'unused'
  }, 

}, {
  tableName: 'pos_return', 
  timestamps: false,
});

// Relationships
POS_RETURN.belongsTo(POS_SESSION, { foreignKey: 'session_id' });

module.exports = POS_RETURN;
