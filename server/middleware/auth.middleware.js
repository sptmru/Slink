const { check } = require('express-validator');

const validationRegistration = 	[
	check('email', 'Uncorrect email').isEmail(),
	check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: 3, max: 12 }),
];

module.exports = validationRegistration;