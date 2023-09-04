const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { validationResult } = require('express-validator');
const { addUserDb, checkUser, getUser } = require('../db/db');

class authController {
	async login(req, res) {
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
	}

	async registration(req, res) {
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
			console.error(err);
			res.send({ message: 'Server error' })
		}
	}
}

module.exports = new authController();
