// Import required modules
const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables from .env file

// Create Sequelize instance and set up MySQL connection using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,   // Database name
  process.env.DB_USERNAME,  // Database username
  process.env.DB_PASSWORD,  // Database password
  {
    host: process.env.DB_HOST,  // Database host (localhost)
    dialect: 'mysql',  // Use MySQL as the database dialect
    logging: false,  // Disable SQL query logging (optional)
    define: {
      timestamps: false  // Disable automatic creation of timestamp columns (createdAt, updatedAt)
    }
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Export the Sequelize instance for use in models
module.exports = sequelize;
