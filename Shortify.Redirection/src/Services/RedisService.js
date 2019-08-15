import logger from './LoggerService';
import redis from 'async-redis';

class RedisService {
	async connect() {
		let client = redis.createClient();
		client.on('error', (err) => {
			console.log('Something went wrong ', err)
		});
		return client;
	}
	async keyExists(key) {
		let client = redis.createClient();
		client.on('error', (err) => {
			console.log('Error ' + err);
		});
		let res = await client.get(key.toString());
		return res;
	}

	async storeData(data) {
		try {
			let client = redis.createClient();
			client.on('error', (err) => {
				console.log('Error ' + err);
			});
			let model = {
				hash: data.hash,
				realURL: data.url
			};
			await client.set(model.hash.toString(), model.realURL.toString());
			const value = await client.get(model.hash.toString());
			return value;

		} catch (error) {
			logger.error(error);
		}
	}

	async removeData(key) {
		let client = redis.createClient();
		client.on('error', (err) => {
			console.log('Error ' + err);
		});
		await client.del(key);
		const value = await client.get(key.toString());
		return value;
	}
}
export default new RedisService();