const { Pool } = require('pg');

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'random_word',
	password: '1412',
	port: 5432, // Порт PostgreSQL по умолчанию
});

function query(queryText, values) {
	return pool.query(queryText, values);
}

async function checkHaveUrl(longURL) {
	const queryText = 'SELECT "shortURL" FROM test_word WHERE "longURL" = $1';
	const result = await query(queryText, [longURL]);
	return result.rows.length > 0 ? result.rows[0].shortURL : false;
  }

async function insertNewUrl(longURL, shortURL) {
	const insertQuery = 'INSERT INTO test_word ("longURL", "shortURL") VALUES ($1, $2) RETURNING *';
	const result = await query(insertQuery, [longURL, shortURL]);
	return result.rows[0];
}

async function checkHaveShortUrl(shortURL) {
	console.log(shortURL);
	const queryText = 'SELECT "longURL" FROM test_word WHERE "shortURL" = $1';
	const result = await query(queryText, [shortURL]);
	return result.rows.length > 0 ? result.rows[0].longURL : false;
  }

module.exports = {
	checkHaveUrl, insertNewUrl, checkHaveShortUrl
};