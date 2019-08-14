import dbConnectionService from './DbConnectionService';
import logger from './LoggerService'

class ManagementService {
	async create(urlmodel) {
		const connection = await dbConnectionService.pool.getConnectionAsync();
		try {
			const postUrlQuery = `INSERT INTO URLs (realurl, shorturl, hash) VALUES ('${urlmodel.realUrl}','${urlmodel.shortUrl}', 
            '${urlmodel.hash}')`;
			const res = await connection.queryAsync(postUrlQuery);
			if (res) {
				const getLastInserted = `SELECT * FROM URLs WHERE id = ${res.insertId}`;
				const [last] = await connection.queryAsync(getLastInserted);
				return {
					Id: last.Id,
					RealURL: last.RealURL,
					ShortURL: last.ShortURL,
					Hash: last.Hash,
					IsDeleted: false
				};
			}
		}
		catch (err) {
			logger.error = err;
		} finally {
			connection.release();
		}
	}
  
	async delete(id) {
		const connection = await dbConnectionService.pool.getConnectionAsync();
		try {
			const geturl = `SELECT Id, Hash FROM URLs WHERE Id = ${id}`;
			const [urlmodel] = await connection.queryAsync(geturl);
			const deleteUrlQuery = `DELETE FROM URLs WHERE Id = ${id}`;
			const res = await connection.queryAsync(deleteUrlQuery);
			if (res) {
				return {
					Id: id,
					Hash: urlmodel.Hash,
					IsDeleted: true
				}
			} else {
				throw new Error('Error while deleting');
			}
		
		} catch (err) {
			logger.error = err;
		}
		finally {
			connection.release();
		}
	}
}
export default new ManagementService();