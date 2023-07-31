const Router = require('express');

const router = new Router;
const users = [];

router.post('/login', (req, res) => {
	try {
		const {name, email, password} = req.body;

		const user = users.find(item => item.name === name || item.email === email || item.password === password);

		if(!user) {
			return res.status(400).json({message: 'The data is incorrect'});
		} 

		users.push(req.body);
		console.log(users);
		return res.json({message: 'User was created'})

	} catch (err) {
		console.log(err);
		res.send({message: 'Не получилось войти'})
	}
})

router.post('/registration', (req, res) => {
	try {
		const {name, email, password} = req.body;

		const user = users.find(item => item.name === name || item.email === email);

		if(user) {
			return res.status(400).json({message: 'User with name or email already exist'});
		} 

		users.push(req.body);
		console.log(users);
		return res.json({message: 'User was created'})

	} catch (err) {
		console.log(err);
		res.send({message: 'Не получилось войти'})
	}
})

module.exports = router;