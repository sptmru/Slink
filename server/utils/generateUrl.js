const config = require("../config/config");

function generateUrl(count) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomString = `localhost:${config.port}/`;
	for (let i = 0; i < count; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomString += characters.charAt(randomIndex);
	}

	return randomString;
}

module.exports = { generateUrl };