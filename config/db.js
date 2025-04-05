const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD,  
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', 
    logging: false,  
    define: {
      timestamps: false  
    }
  }
);


sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
//bjanithrandika
//cHAf0qeigN0nG6au