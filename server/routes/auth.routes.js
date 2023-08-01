const Router = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require('express-validator')

const router = new Router;
const users = [];

router.post('/login', async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const user = users.find(item => item.name === name && item.email === email);
		if (!user) {
			return res.status(400).json({ message: 'User not found' });
		}

		const isPassValid = bcrypt.compareSync(password, user.password)
		if (!isPassValid) {
			return res.status(400).json({ message: 'Invalid password' });
		}

		const token = jwt.sign({ email: user.email }, config.get("secretKey"), { expiresIn: "1h" });
		return res.json({
			token,
			user: {
				name: user.name,
				email: user.email
			}
		})

	} catch (err) {
		console.log(err);
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

			const user = users.find(item => item.name === name || item.email === email);

			if (user) {
				return res.status(400).json({ message: 'User with name or email already exist' });
			}

			const hashPassword = await bcrypt.hash(password, 8);
			const newUser = { name, email, password: hashPassword };

			users.push(newUser);
			console.log(users);
			return res.json({ message: 'User was created' })

		} catch (err) {
			console.log(err);
			res.send({ message: 'Server error' })
		}
	})

module.exports = router;