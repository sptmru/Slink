const { checkHaveUrl, insertNewUrl, checkHaveShortUrl, getAllLinksUser } = require('../db/db');
const { generateUrl } = require('../utils/generateUrl');
const config = require("../config/config");

class linkController {
	async getUrl(req, res) {
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
			return res.status(500).json({ error: err });
		}
	}

	async getAllUrl(req, res) {
		const id = req.query.id;
		try {
			const allLinks = await getAllLinksUser(id);

			if (allLinks) {
				return res.status(200).json({ message: allLinks });
			} else {
				return res.status(200).json({ message: 'This user has not created short links yet' });
			}
		} catch (err) {
			return res.status(500).json({ error: 'Internal server error' });
		}
	}

	async redirect(req, res) {
		const checkShortUrl = await checkHaveShortUrl(`localhost:${config.port}/${req.params.link}`);

		if (checkShortUrl) {
			res.redirect(checkShortUrl)
		} else {
			res.redirect('/')
		}
	}
}

module.exports = new linkController();