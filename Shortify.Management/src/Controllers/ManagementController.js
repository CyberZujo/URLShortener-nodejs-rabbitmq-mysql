import managementService from '../Services/ManagementService';
import shortenerService from '../Services/ShortenerService';
import messagingService from '../Services/MessagingService';
import { isUndefined, isNullOrUndefined } from 'util';

class ManagementController {
	async post(req, res) {
		try {
			const { url } = req.body;
      
			if (url === '' || isNullOrUndefined(url)) {
				throw new Error('URL is not in the correct format, try again');
			}

			let urlmodel = await shortenerService.shortenURL(url);
			const data = await managementService.create(urlmodel);
			if(isUndefined(data)) {
				throw new Error('Error while storing the data');
			}
			// Having troubles here with returning the result from the message service so i didn't use this status anywhere

			const status = await messagingService.pushMessage(data);
			if (status) {
				console.log('Message has been sent to queue');
			}
			const response = {
				Id: data.Id,
				RealURL: data.RealURL,
				ShortURL: data.ShortURL
			};

			res.status(200).send(response);
		} catch (error) {
			res.status(400).send(error.message);
		}
	}

	async delete(req, res) {
		try {
			const { id } = req.body;
			const data = await managementService.delete(id);

			if(isUndefined(data)) {
				throw new Error('Error while deleting');
			}
        
			const status = await messagingService.pushMessage(data);
			console.log('Message status ->', status);
			res.status(200).send(data);

		} catch (error) {
			res.status(400).send(error.message);
		}
	}
}

export default new ManagementController();