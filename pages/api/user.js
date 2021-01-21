
const { handleAcceptedOrigin } = require('../../api/Middlewares.js')

const userGetMethod = require('../../api/user/Get')
const userPostMethod = require('../../api/user/Post')

export default async (req, res) =>
{
	try {
		await handleAcceptedOrigin(req, res)
	} catch (error) {
		console.log(error)
	}

	switch (req.method) {
		case 'GET':
		case 'get':
			return userGetMethod(req, res)
		break
		case 'POST':
		case 'post':
			return userPostMethod(req, res)
	}
	return res.status(200).json({ error_code: 1000, error: 'Operation no accepted' })
}