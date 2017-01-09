/**
 * Created by Jan on 8. 01. 2017.
 */
/* This script connects to the MySQL server and creates the necessary database.
*  In order for it to run, the app needs to be started with "npm start".
* */

var mysql = require('mysql');

var connection = mysql.createConnection({
    host      : process.env.JAWSDB_HOST,
    user      : process.env.JAWSDB_USERNAME,
    password  : process.env.JAWSDB_PASSWORD
});

connection.query("CREATE DATABASE IF NOT EXISTS todo_db", function(err, rows, fields) {
  if (err)
    throw err;

});

connection.destroy();
