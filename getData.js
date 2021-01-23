const Pool = require('pg').Pool
const pool = new Pool({
    user: 'Gaurav',
    host: 'fyle.caj0r4nswp3c.us-east-1.rds.amazonaws.com',
    database: 'fyle',
    password: 'ho4s2oSHbaafdGLSdujS',
    port: 5432,
  })

  const getbanks = (request, response) => {
    pool.query('SELECT * FROM banks', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
      getbanks
  }