const {Sequelize , DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Supplier = require('./Supplier');
const Brand = require('./Brand');

const SupBrand = sequelize.define('SupBrand', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Supplier,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }, 
    brandId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Brand,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'sup_brand',
    timestamps: false,
    indexes: [
        {
            fields: ['supId', 'brandId']
        }
    ]
});
// Define Associations
Supplier.hasMany(SupBrand, { foreignKey: 'supId' });
Brand.hasMany(SupBrand, { foreignKey: 'brandId' });

SupBrand.belongsTo(Supplier, { foreignKey: 'supId' });
SupBrand.belongsTo(Brand, { foreignKey: 'brandId' });
module.exports = SupBrand;