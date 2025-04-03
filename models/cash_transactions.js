const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const POS_ORDER = require('./pos_order');
const POS_SESSION = require('./pos_session');

const CASH_TR = sequelize.define('CASH_TR',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    session_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:POS_SESSION,
            key:'id'
        }
    },
    order_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model:POS_ORDER,
            key:'id'
        }
    },
    type:{
        type: DataTypes.ENUM('in', 'out'),
        allowNull: false
    },
    reason:{
        type: DataTypes.STRING,
        allowNull:true
    },
    amount:{
        type: DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time:{
        type: DataTypes.TIME,
        allowNull: false
    },
    recorded_by:{
        type: DataTypes.STRING,
        allowNull:true
    }
},{
    tableName: 'cash_transaction',
    timestamps: false
});

CASH_TR.belongsTo(POS_ORDER, {foreignKey: 'order_id'});
CASH_TR.belongsTo(POS_SESSION, {foreignKey:'session_id'});
module.exports=CASH_TR;