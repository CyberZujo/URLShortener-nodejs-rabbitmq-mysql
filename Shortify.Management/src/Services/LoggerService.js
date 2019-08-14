const { createLogger, format, transports } = require('winston');

const {
	combine,
	timestamp,
	json,
} = format;

export default createLogger({
	format: combine(
		timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
		json(info => `Date & Time: ${info.timestamp} Level: ${info.level} Message: ${info.message}`),
	),
	transports: [
		new transports.Console(),
		new transports.File({
			// eslint-disable-next-line no-undef
			filename: `${__dirname}../../../logs/logger.log`,
		}),
	],
});
