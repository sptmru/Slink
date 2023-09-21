const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: Number(process.env.DB_PORT), // Порт PostgreSQL по умолчанию
});

function query(queryText, values) {
	return pool.query(queryText, values);
}


async function checkHaveUrl(original_url) {
	const queryText = 'SELECT "short_url" FROM links WHERE "original_url" = $1';
	const result = await query(queryText, [original_url]);
	return result.rows.length > 0 ? result.rows[0].short_url : false;
}


async function getAllLinksUser(id) {
	const queryText = 'SELECT * FROM links WHERE "user_id" = $1';
	const result = await query(queryText, [id]);
	return result.rows.length > 0 ? result.rows : false;
}


async function insertNewUrl(user_id, original_url, short_url) {
	const insertQuery = 'INSERT INTO links ("user_id","original_url", "short_url") VALUES ($1, $2, $3) RETURNING *';
	const result = await query(insertQuery, [user_id, original_url, short_url]);
	return result.rows[0];
}


async function checkHaveShortUrl(short_url) {
	const queryText = 'SELECT "original_url" FROM links WHERE "short_url" = $1';
	const result = await query(queryText, [short_url]);
	return result.rows.length > 0 ? result.rows[0].original_url : false;
}


async function addUserDb(name, email, password_hash) {
	const insertQuery = 'INSERT INTO users ("name","email", "password_hash") VALUES ($1, $2, $3) RETURNING *';
	const result = await query(insertQuery, [name, email, password_hash]);
	return result.rows[0].name;
}


async function getUser(login) {
	const queryText = 'SELECT * FROM users WHERE "email" = $1 OR "name" = $1';

	const result = await query(queryText, [login]);
	return result.rows.length > 0 ? result.rows[0] : false;
}


async function checkUser(name, email) {
	const lowerCaseName = name.toLowerCase();
	const lowerCaseEmail = email.toLowerCase();

	const queryText = 'SELECT * FROM users WHERE LOWER("email") = $1 OR LOWER("name") = $2';
	const result = await query(queryText, [lowerCaseEmail, lowerCaseName]);

	if (result.rows.length > 0) {
		const existingUser = result.rows[0];
		const existingEmailLowerCase = existingUser.email.toLowerCase();
		const existingNameLowerCase = existingUser.name.toLowerCase();

		if (existingEmailLowerCase === lowerCaseEmail && existingNameLowerCase === lowerCaseName) {
			return "This user is already registered";
		} else if (existingEmailLowerCase === lowerCaseEmail) {
			return "A user with such an email is already registered";
		} else if (existingNameLowerCase === lowerCaseName) {
			return "A user with this name is already registered";
		}
	}
	return false;
}

async function deleteData() {
	const queryTextWithoutAuth = 'DELETE FROM links WHERE "user_id" IS NULL AND "created_at" < NOW() - INTERVAL \'1 month\'';
	await query(queryTextWithoutAuth);

	const queryTextWithtAuth = 'DELETE FROM links WHERE "user_id" IS NOT NULL AND "created_at" < NOW() - INTERVAL \'3 month\'';
	await query(queryTextWithtAuth);

	console.log('Links are removed automatically');
}


module.exports = { checkHaveUrl, getAllLinksUser, insertNewUrl, checkHaveShortUrl, addUserDb, checkUser, getUser, deleteData };