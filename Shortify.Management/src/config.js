/* eslint-disable no-undef */
require('dotenv').config();

export default {
	environment: process.env.NODE_ENV || 'development',
	serverPort: process.env.SERVER_PORT || 3000,
	db: {
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'ShortifyDB',
		port: '3306',
	}
}