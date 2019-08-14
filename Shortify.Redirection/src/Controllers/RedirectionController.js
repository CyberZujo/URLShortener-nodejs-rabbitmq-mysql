import redisService from '../Services/RedisService';
import { isNullOrUndefined } from 'util';

class RedirectionController {
	async get(req, res) {
		try {
			let url = req.params.url;
            
			if (url === '' || isNullOrUndefined(url)) {
				throw new Error('There was somethign wrong with reading the data');
			}

			const exists = await redisService.keyExists(url);
			if (exists == null) {
				res.status(404).send('URL does not exists');
			} else {
				res.status(302).send('Redirecting');
			}
		} catch (error) {
			res.status(400).send(error.message);
		}
        
	}
}

export default new RedirectionController();