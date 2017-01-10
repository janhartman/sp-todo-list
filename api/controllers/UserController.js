/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require("bcrypt-nodejs");


module.exports = {

  // POST /login
  // login procedure
  // checks if user exists and if the provided password is correct
  login: function (req, res) {
    var email = req.body.email;
    var password = req.body.pwd;

    User.findOne({
      email: email
    }).exec(function(err, user) {
      if (err) {
        sails.log.error("Error while looking up database for user log in " + email);
        return res.redirect("/login");
      }

      else if (!user) {
        sails.log.info("Cannot find user with the specified email");
        return res.redirect("/login");
      }

      //verify that the provided password hashes to the same value as the one in the database
      else {
        bcrypt.compare(password, user.password, function(err, compareRes) {
          if (err) {
            sails.log.error("Error comparing passwords for user");
            return res.view("500");
          }

          else if(!compareRes) {
              sails.log.info("Incorrect password provided");
              return res.redirect("/login");
          }

          sails.log.info("User " + user + " successfully logged in");
          req.session.user_id = user.id;
          return res.redirect("/tasks");
        });
      }
    });
  },

  //POST /register
  // registration procedure
  // verifies the form data and creates a new user in the database
  register: function (req, res) {
    var email = req.body.email;
    var name = req.body.name;
    var pass1 = req.body.pwd;
    var pass2 = req.body.cpwd;

    //form validation
    if(pass1 != pass2) {
      sails.log.info("Passwords do not match");
      return res.redirect("/register");
    }

    else if (! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(email)) {
      sails.log.info("Email is not a valid email");
      return res.redirect("/register");
    }

    //database lookup
    User.findOne({
      email: email
    }).exec(function(err, user) {
      if (err) {
        sails.log.error("Error while looking up database for user registration " + email);
        return res.redirect("/register");
      }

      else if (user) {
        sails.log.info("User with email " + email + " already exists");
        return res.redirect("/register");
      }

      //create a new user in database
      User.create({
          email: email,
          name: name,
          password: pass1
        }).exec(function (err, user) {
          if (err) {
            sails.log.error("Error creating user record in database "+ err);
            return res.redirect("/register")
          }

          sails.log.info("User " + user + " successfully registered");
          return res.redirect("/login");
        });

    });

  },

  // PATCH /admin
  // promotes the user to admin
  editUser: function (req, res) {
    var id = req.body.id;

    User.update({
      id: id
    }, {
      admin: true
    }).exec(function (err, users) {
      if (err) {
        sails.log.error("Error updating user to administrator");
        return res.view("500");
      }

      else if (!users) {
        sails.log.info("Could not find user to update");
        return res.view("admin", {
          users: users
        });
      }

      sails.log.info("Successfully updated user "+ users[0] +" to admin");
      return res.view("admin", {
        users: users
      });
    });


  },


  // GET /login
  // renders the login view
  loginView: function(req, res) {
    var userID = req.session.user_id;

    if (userID) {
      res.redirect("/");
    }
    else {
      res.view("login");
    }

  },

  // GET /register
  // renders the registration view
  registerView: function(req, res) {
    var userID = req.session.user_id;

    if (userID) {
      res.redirect("/");
    }
    else {
      res.view("register");
    }
  }

};

