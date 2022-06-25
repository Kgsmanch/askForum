const Sequelize = require('sequelize');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });



const databaseName = process.env.DB_NAME;
const databaseUser = process.env.DB_USER;
const databasePassword = process.env.DB_PASSWORD;



const conn = new Sequelize(databaseName,databaseUser,databasePassword, {
    host:3306,
    dialect: 'mysql',
});


try {
  conn.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
  server.close();
}

module.exports = conn;