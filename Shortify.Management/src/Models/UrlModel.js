import { isObject } from 'lodash';

class Url {
	constructor(urlmodel) {
		if (!isObject(urlmodel)) {
			throw new Error('InvalidURLTypeError');
		}
		this.id = urlmodel.Id;
		this.RealURL = urlmodel.RealURL;
		this.ShortURL = urlmodel.ShortURL;
	}
}

export default Url;