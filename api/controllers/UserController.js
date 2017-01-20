/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require("bcrypt-nodejs");


module.exports = {

  /**
 * @api {post} /login Logs in with the provided username and password
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} email user's email
 * @apiParam {String} pwd user's password
 *
 * @apiSuccess 302 task page load
 * @apiError 404 user not found
 */
  login: function (req, res) {
    var email = req.body.email;
    var password = req.body.pwd;

    User.findOne({
      email: email
    }).exec(function(err, user) {
      if (err) {
        sails.log.error("login: Error while looking up database for user log in " + email);
        return res.redirect("/login");
      }

      else if (!user) {
        sails.log.info("login: Cannot find user with the specified email " + email);
        return res.redirect("/login");
      }

      //verify that the provided password hashes to the same value as the one in the database
      else {
        bcrypt.compare(password, user.password, function(err, compareRes) {
          if (err) {
            sails.log.error("login: Error comparing passwords for user " + email);
            return res.view("500");
          }

          else if(!compareRes) {
              sails.log.info("login: Incorrect password provided for user " + email);
              return res.redirect("/login");
          }

          sails.log.info("login: User " + user.email + " successfully logged in");
          req.session.user_id = user.id;
          return res.redirect("/tasks");
        });
      }
    });
  },

  /**
 * @api {post} /register Register a new user
 * @apiName Register
 * @apiGroup User
 *
 * @apiParam {String} email User's email
 * @apiParam {String} name User's name
 * @apiParam {String} password User's password
 * @apiParam {String} checkPassword User's password repeated
 *
 * @apiSuccess 302 login page load
 * @apiError 400 missing data
 */
  register: function (req, res) {
    var email = req.body.email;
    var name = req.body.name;
    var pass1 = req.body.pwd;
    var pass2 = req.body.cpwd;

    //form validation
    if(pass1 != pass2) {
      sails.log.info("register: Passwords do not match");
      return res.redirect("/register");
    }

    else if (!name || !email) {
      sails.log.info("register: Missing info for registration");
      return res.redirect("/register");
    }

    else if (! /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(email)) {
      sails.log.info("register: Email " + email + " is not a valid email");
      return res.redirect("/register");
    }

    //database lookup
    User.findOne({
      email: email
    }).exec(function(err, user) {
      if (err) {
        sails.log.error("register: Error while looking up database for user registration " + email);
        return res.redirect("/register");
      }

      else if (user) {
        sails.log.info("register: User with email " + email + " already exists");
        return res.redirect("/register");
      }

      //create a new user in database
      User.create({
          email: email,
          name: name,
          password: pass1
        }).exec(function (err, user) {
          if (err) {
            sails.log.error("register: Error creating user record in database "+ err);
            return res.redirect("/register")
          }

          sails.log.info("register: User " + user.email + " successfully registered");
          return res.redirect("/login");
        });

    });

  },

  /**
 * @api {patch} /admin Promote user to admin
 * @apiName PromoteUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess 200 admin panel refresh
 * @apiError 404 user not found
 */
  editUser: function (req, res) {
    var id = req.body.id;
    sails.log.info("editUser: Updating user " + id + " to admin");

    User.update({
      id: id
    }, {
      admin: true
    }).exec(function (err, users) {
      if (err) {
        sails.log.error("editUser: Error updating user " + id + " to administrator");
        return res.view("500");
      }

      else if (!users) {
        sails.log.info("editUser: Could not find user " + id + " to update");
        return res.view("admin", {
          users: users
        });
      }

      sails.log.info("editUser: Successfully updated user "+ users[0].id +" to admin");
      return res.view("admin", {
        users: users
      });
    });


  },


  /**
 * @api {get} /login Load login page
 * @apiName GetLogin
 * @apiGroup User
 *
 * @apiSuccess 200 login page load
 */
  loginView: function(req, res) {
    var userID = req.session.user_id;

    if (userID) {
      res.redirect("/");
    }
    else {
      res.view("login");
    }

  },

  /**
 * @api {get} /register Load register page
 * @apiName GetRegister
 * @apiGroup User
 *
 * @apiSuccess 200 register page load
 */
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

