const Router = require('express');
const { checkHaveUrl, insertNewUrl, checkHaveShortUrl } = require('../db/db');
const { generateUrl } = require('../utils/generateUrl');
const config = require("../config/config");

const router = new Router;


router.post('/', async (req, res) => {
	try {
		const original_url = req.body.original_url;
		const user_id = req.body.id;

		let count = config.cutUrl;
		if (user_id) {
			count = config.cutUrlAuth;
		}

		const checkUrl = await checkHaveUrl(original_url);
		if (checkUrl) {
			return res.status(200).json({ message: checkUrl });
		} else {
			const short_url = generateUrl(count);
			await insertNewUrl(user_id, original_url, short_url);

			return res.status(200).json({ message: short_url });
		}
	} catch (err) {
		return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
	}
});

router.get('/:link', async (req, res) => {
	const checkShortUrl = await checkHaveShortUrl(`localhost:${config.port}/${req.params.link}`);
	if (checkShortUrl) {
		res.redirect(checkShortUrl)
	} else {
		res.redirect('/')
	}
});

module.exports = router;