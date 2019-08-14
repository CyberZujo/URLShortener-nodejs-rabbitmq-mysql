/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import mysql from 'mysql';
import config from '../config';

const options = config.db;

class DbConnectionService {
	constructor() {
		this.pool = mysql.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_DATABASE,
			port: '3306'
		});
	}
}

export default new DbConnectionService();
