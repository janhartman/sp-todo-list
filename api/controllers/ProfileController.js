/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // POST /profile
  editProfile: function(req, res) {
    var userID = req.session.user_id;
    var dailyTasksNumber = req.body.dailyTasks;
    var maxPriorityFirst = req.body.pick;

    console.log(req.body);

    try {
      dailyTasksNumber = Number(dailyTasksNumber);

      if (!(maxPriorityFirst == "yes" || maxPriorityFirst == "no" || dailyTasksNumber > 0)) {
        throw err;
      }
      maxPriorityFirst = maxPriorityFirst == "yes";
    }
    catch (err) {
      sails.log.error("Incorrect profile settings provided");
      return res.redirect("/profile");
    }


    User.findOne({
      id: userID
    }).exec(function(err, user) {
      if (err) {
        sails.log.error("Error looking up database for user profile editing");
        return res.redirect("/profile");
      }

      else if (!user) {
        sails.log.info("Cannot find user with id " + userID + " for user profile editing");
        return res.redirect("/profile");
      }

      user.dailyTasks = dailyTasksNumber;
      user.maxPriorityFirst = maxPriorityFirst;
      user.save(function (err) {
        if (err) {
         sails.log.error("Error updating profile settings for user " + userID);
         return res.send(500);
        }

        sails.log.info("Successfully updated user profile");
        return res.redirect("/profile");
      });
    });

  },


  //GET /logout
  logout: function(req, res) {
    delete req.session.user_id;
    res.view("login");
  },

  // GET /profile
  profileView: function(req, res) {
    var userID = req.session.user_id;

    User.findOne({
      id: userID
    }).exec(function(err, user) {

      if (err) {
        sails.log.error("Error while loading profile view of user " + userID);
        return res.view("500");
      }

      else if (!user) {
        sails.log.error("Profile of user " + userID + " not found");
        return res.view("404");
      }

      return res.view("profile", {
        name: user.name,
        email: user.email,
        dailyTasks: user.dailyTasks,
        maxPriorityFirst: user.maxPriorityFirst,
        points: user.productivityPoints,
        todos: user.completedTasks
      });
    });
  }

};

