const {Sequelize , DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Supplier = sequelize.define('Supplier',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tel:{
        type: DataTypes.STRING(20),
        allowNull: true
    },
    address:{
        type: DataTypes.TEXT,
        allowNull: true
    }, 
    email:{
        type: DataTypes.STRING(100),  
        allowNull: true,
        unique: true  
    }, 
    date:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }

}, {
    tableName: 'supplier',
    timestamps: false
});
module.exports = Supplier;