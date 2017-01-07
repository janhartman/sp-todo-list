/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');


module.exports = {

  // GET /tasks
  taskView: function(req, res) {
    var userID = req.session.user_id;
    var category = req.category;

    Task.find({
      user: userID,
      category: category
    }).exec(function(err, tasks) {
      if (err) {
        sails.log.error("Error while loading tasks for productivity view of user " + userID);
        return res.view("500");
      }

      var dailyTaskList = [];

      var taskList = [];

      res.view("tasks", {
        dailyTasks: dailyTaskList,
        categoryTasks: taskList
      })
    });


  },

   //POST /tasks
  addTask: function(req, res) {

  },

  //PATCH /tasks
  //edit task details or change category (move to done)
  editTask: function(req, res) {

  },

  //GET /productivity
  productivityView: function(req, res) {
    var userID = req.session.user_id;
    period = req.period;

    var periodMap = {
      "day": 24,
      "week": 7,
      "month": 30,
      "year": 12
    };

    var dateToUnit = function(date) {
      switch(period) {
        case "day": return date.getHours();
        case "week": return date.getDay();
        case "month": return date.getDay();
        case "year": return date.getMonth();
      }
    };

    var periodLength = periodMap[period];

    var date = moment().subtract(1, period + 's').toDate();

    Task.find({
      user: userID,
      category: "Completed",
      completedDate: { '>': date}
    }).exec(function (err, tasks) {

      if (err) {
        sails.log.error("Error while loading tasks for productivity view of user " + userID);
        return res.view("500");
      }

      var missedTasks = tasks.filter(function(t) {
        return t.completedDate > t.dueDate;
      });

      var totalProductivity = tasks.reduce(function(acc, t) {
        return acc + t.priority;
      }, 0);

      var productivityByUnitOfTime = tasks.reduce(function(acc, t) {
        var i = dateToUnit(t.completedDate);
        acc[i] += t.priority;
        return acc;
      }, new Array(periodLength).fill(0));

      res.view("productivity", {
        completed: tasks.length,
        missed: missedTasks.length,
        total: totalProductivity,
        productivityByUnit: productivityByUnitOfTime
      })
    });
  }


};

