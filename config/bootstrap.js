/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  sails.config.appName = "To-Do List";

  console.log(sails.config);

  /*
  sails.log.info(process.env.DB_HOST);
  // the SQL to run
  var sql = "select * from user";

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : 'todo_db'
  });

  connection.query(sql, function(err, rows, fields) {
    if (err)
      throw err;
    else {
      console.log(rows);
      console.log(fields);
    }
      cb();
  });
  */

  cb();
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

};
