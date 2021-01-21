
require('dotenv').config()

const accountsGetModel = require('../../databse/AccountsModel')
const { handleVerifyString } = require('./Middlewares')

module.exports = async (request, response) => {

	console.log(request)

	let accountsModel = await accountsGetModel(require('../../databse/connect'))
	if (accountsModel instanceof Error) {
		return res.status(200).json({ error_code: 1000, error: accountsModel.message })
	}
	accountsModel.sync();

	const { name } = request.query
	if (!handleVerifyString(name)) {
		return response.status(200).json({ error_code: 1001, error: 'Incorrect parameters' })
	}

	const user = await accountsModel.findOne({ where: { name } })
	if (!user) {
		return response.status(200).json({ error_code: 1003, error: 'User not found' })
	}

	const { id, name: username, coins } = user
	response.status(200).json({ id, name: username, coins })	
}