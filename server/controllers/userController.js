const mysql = require("mysql");

require("dotenv").config();

//Connection Pool to MySql
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//view All Users
exports.view = (req, res) => {
  //connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID" + connection.threadId);

    connection.query("SELECT * FROM user", (err, rows) => {
      //when done release connection
      connection.release();

      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }

      console.log("The data from user table: \n", rows);
    });
  });
};

//Find user by Search
exports.find = (req, res) => {
  //connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID" + connection.threadId);

    //get the value from the search input box with name="search"
    let searchQuery = req.body.search;

    //you can add AND status = "active"
    connection.query(
      "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ? ",
      ["%" + searchQuery + "%", "%" + searchQuery + "%"],
      (err, rows) => {
        //when done release connection
        connection.release();

        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }

        console.log("The data from user table: \n", rows);
      }
    );
  });
};

//Add new user /add-user
exports.addUser = (req, res) => {
  //get the value from the input box with name="..."
  const { first_name, last_name, email, phone, comments } = req.body;

  //connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID" + connection.threadId);

    connection.query(
      "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments =?",
      [first_name, last_name, email, phone, comments],
      (err, rows) => {
        //when done release connection
        connection.release();

        if (!err) {
          res.render("add-user", { alert: 'User added successfully!'});
        } else {
          console.log(err);
          res.render("add-user", { message: 'User submission failed!'});
        }

        console.log("The data from user table: \n", rows);
      }
    );
  });
};

exports.form = (req, res) => {
  res.render("add-user");
};
