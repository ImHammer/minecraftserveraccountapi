
const whiteListVerifyString = [
	'string',
	'number'
]
function handleVerifyString(string) {
	if (!string) return false;
	if (!whiteListVerifyString.includes(typeof(string))) return false;
	if (string.length < 1) return false;
	if (string.length > 32) return false;

	return true;
}

function generateRandomString(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;

	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
 }

module.exports = {
	handleVerifyString,
	generateRandomString
}