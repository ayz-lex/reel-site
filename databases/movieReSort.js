//how to incorporate this to the server

const pool = require('./query')

module.exports = async () => {
  const query = 'SELECT * FROM movies ORDER BY popularity DESC;'
  await pool.connect()
  await pool.query(query)
  await pool.end()
}
