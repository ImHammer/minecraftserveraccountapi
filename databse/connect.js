
require('dotenv').config()

const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');

const connect = new Sequelize({
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	dialect: process.env.DB_DIALECT
});

module.exports = connect