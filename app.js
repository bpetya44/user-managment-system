const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
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

//Router
app.get('', (req, res) =>{
    res.render('home')
})


app.listen(port, () => console.log(`Listening on port ${port}`))
