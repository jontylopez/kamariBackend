const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Customer = sequelize.define('Customer',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    phone:{
       type: DataTypes.STRING,
       allowNull: true,
       unique: true 
    }
},{
    tableName: 'customer',
    timestamps: false
});

module.exports = Customer;