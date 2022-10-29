const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes =require('./server/routes/user')
const mysql = require('mysql')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

//parsing middleware
//Pars application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse app/json
app.use(bodyParser.json())

//set static files
app.use(express.static('public'))

//Set Template Engine
app.engine('hbs', exphbs.engine({ extname: '.hbs'}))
app.set('view engine', 'hbs')

//Connection Pool to MySql
const pool = mysql.createPool({
    connectionLimit: 100,
    host:  process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})
//Connect to DB
pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID' + connection.threadId);
})

//routes
app.use('/', routes)

app.listen(port, () => console.log(`Listening on port ${port}`))
