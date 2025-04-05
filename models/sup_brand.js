const {Sequelize , DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Supplier = require('./supplier');
const Brand = require('./brand');

const SupBrand = sequelize.define('SupBrand', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sup_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Supplier,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }, 
    brand_id:{
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
            fields: ['sup_id', 'brand_id']
        }
    ]
});
// Define Associations
Supplier.hasMany(SupBrand, { foreignKey: 'sup_id' });
Brand.hasMany(SupBrand, { foreignKey: 'brand_id' });

SupBrand.belongsTo(Supplier, { foreignKey: 'sup_id' });
SupBrand.belongsTo(Brand, { foreignKey: 'brand_id' });
module.exports = SupBrand;