const config = require("config");

const PORT = config.get('serverPort')

function generateUrl(count) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomString = `localhost:${PORT}/`;
	for (let i = 0; i < count; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomString += characters.charAt(randomIndex);
	}

	return randomString;
}

module.exports = { generateUrl };