const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const SupBrand = require('./SupBrand');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'unisex'),
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('UpperBody', 'LowerBody', 'FullBody', 'UnderGarment', 'Article'),
        allowNull: false
    },
    supBrId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SupBrand,
            key: 'id'
        },
        onDelete: 'CASCADE' // ✅ Fixed onDelete placement
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'product',
    timestamps: false,
    indexes: [
        { fields: ['name'] } // ✅ Fixed `indexes` format
    ]
});

// ✅ Define Associations
SupBrand.hasMany(Product, { foreignKey: 'supBrId' }); // A SupBrand has many Products
Product.belongsTo(SupBrand, { foreignKey: 'supBrId' }); // A Product belongs to a SupBrand

module.exports = Product;
