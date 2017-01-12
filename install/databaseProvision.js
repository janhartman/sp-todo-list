/**
 * Created by Jan on 8. 01. 2017.
 */
/* This script connects to the MySQL server and creates the necessary database +.
*  In order for it to run, the app needs to be started with "npm start".
* */

if (process.env.NODE_ENV != "production") {
  return;
}

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

var rootPassword = process.env.ROOT_PASSWORD || "iamroot";

bcrypt.genSalt(10, function(err, salt) {
  if (err)
    throw err;

   bcrypt.hash(rootPassword, salt, null, function(err, hash) {
    if (err)
      throw err;

    var checkDatabaseSQL = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'todo_db';";
    var createDatabaseSQL = "CREATE DATABASE todo_db;";
    var alterColumnSQL = "ALTER TABLE task MODIFY COLUMN user_id int(10) unsigned;";
    var fkSQL = "ALTER TABLE task ADD FOREIGN KEY (user_id) REFERENCES user(id);";
    var triggerSQL="CREATE TRIGGER update_user_profile AFTER UPDATE ON `task` FOR EACH ROW BEGIN UPDATE user SET completed_tasks=completed_tasks+1, productivity_points=productivity_points+OLD.priority WHERE NEW.category='Completed' AND user.id=OLD.user_id; END;";
    var adminSQL = "INSERT INTO user (name, email, password, admin, daily_tasks, max_priority_first, completed_tasks, productivity_points) VALUES('root', 'root@to.do', '" + hash + "', 1, 5, 1, 0, 0);";

    var databaseConnection = {
      host      : process.env.DB_HOST,
      user      : process.env.DB_USERNAME,
      password  : process.env.DB_PASSWORD,
      multipleStatements: true
    };


    var connection = mysql.createConnection(databaseConnection);


    connection.query(checkDatabaseSQL, function(err, rows, fields) {
      if (err)
        throw err;

      //console.log(rows);

      if (rows.length == 0) {
        connection.query(createDatabaseSQL, function(err, rows, fields) {
          if (err)
            throw err;

          //console.log(rows);

          //run migrations
          process.env.NODE_ENV="development";
          var Sails = require('sails').constructor;
          var sails = new Sails();

          sails.load({
            models: { connection: 'mysql_remote', migrate: 'alter' }
          }, function(err) {
            if (err)
              throw err;

            process.env.NODE_ENV="production";

            //run sql
            connection.query("USE todo_db; " + alterColumnSQL + fkSQL + triggerSQL + adminSQL, function(err, rows, fields) {
              if (err)
                throw err;

              //console.log(rows);

              sails.lower(function(err) {
                connection.end();
              });

            });

           });



        });
      }
      else {
        connection.end();
      }

    });

  });
});


