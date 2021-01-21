
require('dotenv').config()

const accountsGetModel = require('../../databse/AccountsModel')
const bcrypt = require('bcrypt')
const { handleVerifyString, generateRandomString } = require('./Middlewares')

module.exports = async (request, response) => {

	console.log(request)

	let accountsModel = await accountsGetModel(require('../../databse/connect'))
	if (accountsModel instanceof Error) {
		return res.status(200).json({ error_code: 1000, error: accountsModel.message })
	}
	accountsModel.sync();
	
	const { name, password, painelpassword } = request.body
	if (!handleVerifyString(name) || !handleVerifyString(password) || !handleVerifyString(painelpassword)) {
		return response.status(200).json({ error_code: 1001, error: 'Incorrect parameters' })
	}

	if (painelpassword != process.env.SERVIDOR_PAINEL_PASSWORD) {
		return response.status(200).json({ error_code: 1002, error: 'Incorrect painel password' })
	}

	let user = await accountsModel.findOne({ where: { name } })
	if (user) {
		return response.status(200).json({ error_code: 1003, error: 'User already exists' })
	}

	const passwordSalt = await bcrypt.genSalt(8)
	const passwordHash = await bcrypt.hash(password, passwordSalt)

	user = await accountsModel.build({
		name,
		password: passwordHash
	})
	
	const randomBytes = generateRandomString(process.env.SERVIDOR_APP_USER_LENGTH || 8)
	const hashSalt = await bcrypt.genSalt(8)
	const hashToken = 'APP_USER_' + await bcrypt.hash(process.env.SERVIDOR_APP_USER + user.id + name + password + randomBytes, hashSalt)

	user.token = hashToken
	await user.save()

	return response.status(200).json({ user })
}