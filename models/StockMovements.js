const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Inventory = require('./Inventory');

const StockMovements = sequelize.define('StockMovements', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inventoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Inventory,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    buy_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    sell_price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'stock_movements',
    timestamps: false,
    indexes: [
        { fields: ['inventoryId', 'date'] }
    ]
});


Inventory.hasMany(StockMovements, { foreignKey: 'inventoryId' });
StockMovements.belongsTo(Inventory, { foreignKey: 'inventoryId' });

module.exports = StockMovements;
