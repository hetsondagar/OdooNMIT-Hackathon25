/**
 * Sequelize Configuration
 * This file initializes the Sequelize connection and handles database operations
 */

const { Sequelize } = require('sequelize');
const config = require('./database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Create Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    define: dbConfig.define
  }
);

// Create database if it doesn't exist
const createDatabase = async () => {
  // Create a connection without specifying the database
  const tempSequelize = new Sequelize('', dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false
  });
  
  try {
    // Create the database
    await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    console.log(` Database '${dbConfig.database}' created successfully.`);
    
    // Close the temporary connection
    await tempSequelize.close();
  } catch (error) {
    console.error(' Error creating database:', error);
    throw error;
  }
};

// Test the connection and create database if it doesn't exist
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Database connection has been established successfully.');
  } catch (error) {
    if (error.original && error.original.code === 'ER_BAD_DB_ERROR') {
      console.log(' Database does not exist, creating it...');
      await createDatabase();
      // Now test the connection to the actual database
      await sequelize.authenticate();
      console.log(' Database connection has been established successfully.');
    } else {
      console.error(' Unable to connect to the database:', error);
      process.exit(1);
    }
  }
};

// Sync database (create tables if they don't exist)
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log(' Database synchronized successfully.');
  } catch (error) {
    console.error(' Error synchronizing database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  testConnection,
  syncDatabase
};
