const Router = require('express');
const { checkHaveUrl, insertNewUrl, checkHaveShortUrl } = require('../db/db');
const { generateUrl } = require('../utils/generateUrl');
const config = require("config");

const router = new Router;
const PORT = config.get('serverPort');
const cutUrl = config.get('cutUrl');
const cutUrlAuth = config.get('cutUrlAuth');


router.post('/', async (req, res) => {
	try {
		const origUrl = req.body.longUrl;
		const userId = req.body.id;

		let count = cutUrl;
		if (userId) {
			count = cutUrlAuth;
		}

		const checkUrl = await checkHaveUrl(origUrl);

		if (checkUrl) {
			return res.status(200).json({ message: checkUrl });
		} else {
			const shortUrl = generateUrl(count);
			await insertNewUrl(origUrl, shortUrl);

			return res.status(200).json({ message: shortUrl });
		}
	} catch (err) {
		return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
	}
});

router.get('/:link', async (req, res) => {
	const checkShortUrl = await checkHaveShortUrl(`localhost:${PORT}/${req.params.link}`);
	if (checkShortUrl) {
		res.redirect(checkShortUrl)
	} else {
		res.redirect('/')
	}
});

module.exports = router;