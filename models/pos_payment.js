const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const POS_ORDER = require('./pos_order');

const POS_PAYMENT = sequelize.define('POS_PAYMENT',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:POS_ORDER,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    method:{
        type: DataTypes.ENUM('cash', 'card', 'bank', 'ex', 'qr', 'voucher','multy'),
        allowNull: false
    },
    amount:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
},{
    tableName: 'pos_payment',
    timestamps: false
});

POS_PAYMENT.belongsTo(POS_ORDER, {foreignKey:'order_id'});
module.exports= POS_PAYMENT;