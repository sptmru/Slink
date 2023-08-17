const Router = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { check, validationResult } = require('express-validator');
const { addUserDb, checkUser, getUser } = require('../db/db');

const router = new Router;


router.post('/login', async (req, res) => {
	try {
		const { login, password } = req.body;
		const user = await getUser(login)

		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		const isPassValid = bcrypt.compareSync(password, user.password_hash)
		if (!isPassValid) {
			return res.status(400).json({ message: 'Invalid password' });
		}

		const token = jwt.sign({ email: user.email }, config.secretKey, { expiresIn: "1h" });

		return res.status(200).json({
			token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email
			}
		})

	} catch (err) {
		res.send({ message: 'Server error' })
	}
})


router.post('/registration',
	[
		check('email', 'Uncorrect email').isEmail(),
		check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: 3, max: 12 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: "Uncorrect request", errors })
			}

			const { name, email, password } = req.body;
			const message = await checkUser(name, email);


			if (message) {
				return res.status(400).json({ message: message });
			}

			const password_hash = await bcrypt.hash(password, 8);
			await addUserDb(name, email, password_hash);

			return res.json({ message: `User was created` })

		} catch (err) {
			res.send({ message: 'Server error' })
		}
	})

module.exports = router;