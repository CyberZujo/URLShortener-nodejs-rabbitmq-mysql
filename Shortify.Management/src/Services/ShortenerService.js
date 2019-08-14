import dbConnectionService from './DbConnectionService';
import logger from './LoggerService';

class ShortenerService {
	async shortenURL(url) {
		// eslint-disable-next-line no-undef
		let path = `http://${process.env.HOSTNAME}:${process.env.REDIRECTION_PORT}/redirection/`;
		let longUrl = this.checkLongURL(url);
		if (longUrl) {
			let hash = this.getRandom();
			let hashExists = await this.hashExists(hash);
			if (!hashExists) {
				let shortUrl = path + hash;
				let urlmodel = {
					'realUrl': url,
					'shortUrl': shortUrl,
					'hash': hash
				};
				return urlmodel;
			}
		}
	}
	async hashExists(hash) {
		const connection = await dbConnectionService.pool.getConnectionAsync();
		try {
			const query = `SELECT Hash FROM URLs WHERE Hash = '${hash}'`;
			const result = await connection.queryAsync(query);
			if (result === hash) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			logger.error(error);
		}
	}
	checkLongURL(url) {
		let newurl = '';
		var isValidUrl = url.startsWith('http://') || url.startsWith('https://') || url.startsWith('ftp://');
		if (!isValidUrl) {
			newurl = 'http://' + url;
			return newurl;
		} else {
			return url;
		}
	}
	getRandom() {
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		return text;
	}
}

export default new ShortenerService();