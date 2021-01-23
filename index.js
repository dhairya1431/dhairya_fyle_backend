const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const cors = require('cors')
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(express.json())
app.use(cors())

//Data for database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'Gaurav',
    host: 'fyle.caj0r4nswp3c.us-east-1.rds.amazonaws.com',
    database: 'fyle',
    password: 'ho4s2oSHbaafdGLSdujS',
    port: 5432,
  })

//Defining Functions used for APIs
  const get_details_of_banks = (req, res) => {
    
    const q = req.query.q.toUpperCase();
    const limit = req.query.limit;
    const offset = req.query.offset;

    pool.query(`SELECT * FROM branches WHERE branch LIKE '${q}%' ORDER BY ifsc OFFSET ${offset} LIMIT ${limit}` , (error, results) => {
      if (error) {
        throw error
        console.log(error)
      }
      res.status(200).send(results.rows)
    })
  }

  const get_city_details = (req, res) => {
    const q = req.query.q.toUpperCase();
    const limit = req.query.limit;
    const offset = req.query.offset;

    console.log(q + limit + offset)
    pool.query(`SELECT * FROM branches WHERE city LIKE '${q}%' ORDER BY ifsc OFFSET ${offset} LIMIT ${limit}` , (error, results) => {
      if (error) {
        throw error
        console.log(error)
      }
      res.status(200).send(results.rows)
    })
  }


//API
app.get('/api/branches/autocomplete', get_details_of_banks)

app.get('/api/branches' , get_city_details)


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})