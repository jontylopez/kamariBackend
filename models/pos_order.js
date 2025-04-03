const {Sequelize, DataTypes}= require('sequelize');
const sequelize = require('../config/db');
const Customer = require('./Customer');
const POS_SESSION = require('./pos_session');

const POS_ORDER = sequelize.define('POS_ORDER',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    session_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: POS_SESSION,
            key: 'id'
        },
        onDelete:'CASCADE'
    },
    order_date:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    order_time:{
        type: DataTypes.TIME,
        allowNull: false
    },
    customer_id:{
         type: DataTypes.INTEGER,
         allowNull: true,
         references:{
            model:Customer,
            key:'id'
         },
         onDelete:'SET NULL'
    },
    discount: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        comment: "Bill-wide discount in %",
      },      
    total:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false

    },

},{
    tableName: 'pos_order',
    timestamps: false
});

POS_ORDER.belongsTo(POS_SESSION, { foreignKey: 'session_id'});
POS_ORDER.belongsTo(Customer, { foreignKey: 'customer_id'});

module.exports = POS_ORDER;