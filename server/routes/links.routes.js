const Router = require('express');
const { getAllLinksUser} = require('../db/db');


const router = new Router;


router.get('/', async (req, res) => {
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
});

module.exports = router;