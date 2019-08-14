/* eslint-disable no-unused-vars */
import logger from './LoggerService';
import amqp from 'amqplib/callback_api';
import redisService from './RedisService';
class ConsumerStorageService {
	async storeData() {
		amqp.connect('amqp://localhost:5672', (error0, connection) => {
			let obj = {};

			if (error0) {
				logger.error(error0);
				throw error0;
			}
			connection.createChannel((error1, channel) => {
				if (error1) {
					logger.error(error1);
					throw error1;
				}

				let queue = 'shortify_queue';

				channel.assertQueue(queue, {
					durable: false
				});
				channel.prefetch(1);

				console.log('[*] Waiting for messages in %s. To exit press CTRL+C', queue);

				channel.consume(queue, (msg) => {
					obj = JSON.parse(msg.content.toString());
					let res = this.handleStorage(obj).then(val => {
						console.log('Redis -> Updating storage data..');
					});
					return obj;
				}, {
					noAck: true
				});
            
			});
		});
	}
	async handleStorage(data) {
		if (data.IsDeleted) {
			const result = await redisService.removeData(data.Hash).then(res => {
				console.log('Redis-> Delete');
				return res;
			})
		} else {
			const result = await redisService.storeData({ hash: data.Hash, url: data.RealURL })
				.then(res => {
					console.log('Redis-> Insert');
					return res;
				})
		}
	}
}


export default new ConsumerStorageService();