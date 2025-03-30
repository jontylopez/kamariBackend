const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const POS_SESSION = sequelize.define('POS_SESSION',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    session_date:{
        type: DataTypes.DATE,
        allowNull: false
    },    
    
    start_time:{
        type: DataTypes.TIME,
        allowNull: false,
    },
    end_time:{
        type: DataTypes.TIME,
        allowNull: true
    },
    startup_cash:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false

    },
    cash_in_drawer:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
    },
    status:{
        type: DataTypes.ENUM('open','closed'),
        allowNull: false,
        defaultValue: 'open' 
    },
    opened_by:{
        type: DataTypes.STRING,
        allowNull: true
    },
    closed_by:{
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName:'pos_session',
    timestamps: false
});
module.exports= POS_SESSION;