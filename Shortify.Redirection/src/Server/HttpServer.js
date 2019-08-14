import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import logger from '../Services/LoggerService';
import redirectionRouter from '../Routers/RedirectionRouter';
import rateLimit from 'express-rate-limit';

class HttpServer {
	constructor(options = {}) {
		this.port = options.port || 4000;
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
		// API rate limiter
		const limiter = rateLimit({
			windowMs: 120000, 
			max: 10,
			message: 'Request limit reached...please wait 120 seconds'
		});

		this.app.use(bodyParser());
		this.app.use(cors());
		this.app.get('/', (req, res) => {
			res.json({
				message: 'Shortify'
			});
		});
		this.app.use('/redirection', limiter, redirectionRouter);
	}
}

export default new HttpServer();