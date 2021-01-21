
const cors = require('cors')

const whitelist = ['localhost:3000']
const acceptedOrigrin = function (req, callback) {
	if (whitelist.includes(req.headers.host)) {
		return callback(null, { origin: true })
	} else {
		return callback(new Error('Origin not accepted'), { origin: false })
	}
}
const handleAcceptedOrigin = function (request, response) {
	return new Promise((resolve, reject) => {
		cors(acceptedOrigrin)(request, response, result => {
			if (result instanceof Error) {
				return reject(result)
			}
			return resolve(result)
		});
	})
}

module.exports = {
	handleAcceptedOrigin
}