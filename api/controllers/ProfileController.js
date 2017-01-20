/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
 * @api {post} /profile Edit user profile
 * @apiName EditProfile
 * @apiGroup Profile
 *
 * @apiParam {Number} id Users unique ID.
 * @apiParam {Number} dailyTasks Number of daily tasks
 * @apiParam {String} maxPriorityFirst Pick tasks with maximum priority first
 *
 * @apiError 404 user not found
 * @apiSuccess 200 profile page refresh
 */
  editProfile: function(req, res) {
    var userID = req.session.user_id;
    var dailyTasksNumber = req.body.dailyTasks;
    var maxPriorityFirst = req.body.pick;


    //form validation
    try {
      dailyTasksNumber = Number(dailyTasksNumber);

      if (!(maxPriorityFirst == "yes" || maxPriorityFirst == "no" || dailyTasksNumber > 0)) {
        throw err;
      }
      maxPriorityFirst = maxPriorityFirst == "yes";
    }
    catch (err) {
      sails.log.error("editProfile: Incorrect profile settings provided by user "+ userID);
      return res.redirect("/profile");
    }

    //database update
    User.update({
      id: userID
    },{
      dailyTasks: dailyTasksNumber,
      maxPriorityFirst: maxPriorityFirst
      }
    ).exec(function(err, user) {
      if (err) {
        sails.log.error("editProfile: Error looking up database for user profile editing by user " + userID);
        return res.redirect("/profile");
      }

      else if (!user) {
        sails.log.info("editProfile: Cannot find user with id " + userID + " for user profile editing");
        return res.redirect("/profile");
      }

      sails.log.info("editProfile: Successfully updated user profile of user " + userID);
      return res.redirect("/profile");

    });

  },


  /**
 * @api {get} /logout Logs out the current user by deleting the user id from the cookie
 * @apiName Logout
 * @apiGroup Profile
 *
 * @apiParam {Number} id Users unique ID.

 * @apiSuccess 200 redirect to login page
 */
  logout: function(req, res) {
    sails.log.info("logout: Logging out user " + req.session.user_id);
    delete req.session.user_id;
    res.view("login");
  },

  /**
 * @api {get} /profile Get user profile
 * @apiName GetProfile
 * @apiGroup Profile
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess 200 profile page load
 * @apiError 404 user not found
 */
  profileView: function(req, res) {
    var userID = req.session.user_id;

    User.findOne({
      id: userID
    }).exec(function(err, user) {

      if (err) {
        sails.log.error("profileView: Error while loading profile view of user " + userID);
        return res.view("500");
      }

      else if (!user) {
        sails.log.error("profileView: Profile of user " + userID + " not found");
        return res.view("404");
      }

      return res.view("profile", {
        name: user.name,
        email: user.email,
        dailyTasks: user.dailyTasks,
        maxPriorityFirst: user.maxPriorityFirst,
        points: user.productivityPoints,
        todos: user.completedTasks,
        admin: user.admin
      });
    });
  },

  /**
 * @api {get} /admin Get admin panel
 * @apiName GetAdminPanel
 * @apiGroup Profile
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess 200 admin panel load
 * @apiError 500 error loading users
 */
  adminPanel: function (req, res) {
    var userID = req.session.user_id;

    User.find({
      id: {'!': userID}
    }).exec(function(err, users) {
      if (err) {
        sails.log.error("adminPanel: Error loading users for admin panel of user " + userID);
        return res.view("500");
      }

      sails.log.info("adminPanel: Loaded users for admin panel of user " + userID);
      return res.view("admin", {
        users: users
      });

    });


  }


};

