const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'Slink_db',
	password: '1412',
	port: 5432, // Порт PostgreSQL по умолчанию
});

function query(queryText, values) {
	return pool.query(queryText, values);
}

async function checkHaveUrl(original_url) {
	const queryText = 'SELECT "short_url" FROM links WHERE "original_url" = $1';
	const result = await query(queryText, [original_url]);
	return result.rows.length > 0 ? result.rows[0].short_url : false;
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

module.exports = {
	checkHaveUrl, insertNewUrl, checkHaveShortUrl, addUserDb
};