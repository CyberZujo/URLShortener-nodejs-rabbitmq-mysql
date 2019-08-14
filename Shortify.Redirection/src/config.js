/* eslint-disable no-undef */
require('dotenv').config();


export default {
	environment: process.env.NODE_ENV || 'development',
	serverPort: process.env.SERVER_PORT || 3000
}