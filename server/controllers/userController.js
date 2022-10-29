const mysql = require('mysql')

require('dotenv').config()

//Connection Pool to MySql
const pool = mysql.createPool({
    connectionLimit: 100,
    host:  process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})


//view All Users
exports.view = (req, res) => {

    //connect to DB
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log("Connected as ID" + connection.threadId);

        connection.query('SELECT * FROM user', (err, rows) =>{
            //when done release connection
            connection.release()

            if(!err) {
                res.render('home', { rows })
            } else {
                console.log(err);
            }

            console.log('The data from user table: \n', rows);
        })
    })
}