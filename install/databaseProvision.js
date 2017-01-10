/**
 * Created by Jan on 8. 01. 2017.
 */
/* This script connects to the MySQL server and creates the necessary database.
*  In order for it to run, the app needs to be started with "npm start".
* */

/*
var adminSQL = "INSERT INTO user (name, email, password, admin) VALUES(root, root@root.root, root, 1)"
var fkSQL = "ALTER TABLE task ADD FOREIGN KEY (user_id) REFERENCES user(id)";
var triggerSQL="CREATE TRIGGER update_user_profile AFTER UPDATE ON `task` FOR EACH ROW BEGIN UPDATE user SET completed_tasks=completed_tasks+1, productivity_points=productivity_points+OLD.priority WHERE NEW.category='Completed' AND user.id=OLD.user_id; END";
var mysql = require('mysql');

var connection = mysql.createConnection({
    host      : process.env.DB_HOST,
    user      : process.env.DB_USERNAME,
    password  : process.env.DB_PASSWORD
});

connection.query("CREATE DATABASE IF NOT EXISTS todo_db", function(err, rows, fields) {
  if (err)
    throw err;

  //run migrations





});

connection.destroy();

*/

