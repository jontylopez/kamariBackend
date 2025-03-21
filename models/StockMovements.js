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
    movement_type: {
        type: DataTypes.ENUM('in', 'out'),
        allowNull: false
    },
    buy_price: {
        type: DataTypes.DECIMAL(10,2), // ✅ Fixed decimal precision
        allowNull: true
    },
    sell_price: {
        type: DataTypes.DECIMAL(10,2), // ✅ Fixed decimal precision
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
        { fields: ['inventoryId', 'date'] } // ✅ Fixed index format
    ]
});

// ✅ Define Associations
Inventory.hasMany(StockMovements, { foreignKey: 'inventoryId' }); // An Inventory item has many StockMovements
StockMovements.belongsTo(Inventory, { foreignKey: 'inventoryId' }); // A StockMovement belongs to an Inventory item

module.exports = StockMovements;
