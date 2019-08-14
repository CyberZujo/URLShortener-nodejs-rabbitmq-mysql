import amqp from 'amqplib';
class MessagingService {
	async pushMessage(data) {
		const queue = 'shortify_queue';
		let dataModel = JSON.stringify(data);

		let open = amqp.connect('amqp://localhost:5672');
		return open.then(function (conn) {
			return conn.createChannel();
		}).then(function (ch) {
			// eslint-disable-next-line no-unused-vars
			return ch.assertQueue(queue, { durable: false }).then(function (ok) {
				// eslint-disable-next-line no-undef
				return ch.sendToQueue(queue, Buffer.from(dataModel));
			});
		}).catch(console.warn);
	}
}
export default new MessagingService();