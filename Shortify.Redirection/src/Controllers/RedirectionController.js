/* eslint-disable no-mixed-spaces-and-tabs */
import redisService from '../Services/RedisService';

class RedirectionController {
	async get(req, res) {
		try {
			let urlValue = req.params.url;
			if (urlValue === '') {
				throw new Error('There was something wrong with reading the data');
			}
			const exists = await redisService.keyExists(urlValue);
			if (exists) {
				res.writeHead(302, {'Location':exists});
				res.end();
			} else {
				res.status(404).send('URL does not exists');
			}
		} catch (error) {
			res.status(400).send(error.message);
		}
        
	}
}

export default new RedirectionController();