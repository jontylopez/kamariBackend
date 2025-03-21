const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const Inventory = sequelize.define('Inventory', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    size:{
        type: DataTypes.STRING(10),
        allowNull: false
    },
    color:{
        type: DataTypes.STRING(50),
        allowNull: false    
    },      
    description:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    bCodeId:{
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: 'inventory',
    timestamps: false,
    indexes: [
        {fields:['productId', 'size', 'color']}
    ]
});
Product.hasMany(Inventory, {foreignKey: 'productId'});
Inventory.belongsTo(Product, {foreignKey:'productId'});

module.exports = Inventory;