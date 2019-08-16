import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import logger from '../Services/LoggerService';
import managementRouter from '../Routers/ManagementRouter';

class HttpServer {
	constructor(options = {}) {
		this.port = options.port || 3000;
		this.app = express();
		this.server = http.createServer(this.app);
	}

	start() {
		this.register();
		this.server.listen(this.port, () => {
			logger.info('Server started');
		});
	}
 
	register() {
		this.app.use(bodyParser());
		this.app.use(cors());
		this.app.use('/management', managementRouter);
	}
}

export default new HttpServer();