const isEmail = (string) => {
	const email = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');

	return email.test(string) ? true : false;
}