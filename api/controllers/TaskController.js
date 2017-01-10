/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');


module.exports = {

  //POST /tasks
  //task creation procedure
  //creates a new task
  addTask: function (req, res) {
    var userID = req.session.user_id;

    var dueDate, priority, name, description, category;

    try {
      dueDate = new Date(req.body.dueDate);
      priority = Number(req.body.priority);
      name = req.body.name.toString();
      description = req.body.description.toString();
      category = req.body.category.toString();
    }

    catch (err) {
      return res.send(400);
    }

    if (dueDate == "Invalid Date") {
      sails.log.debug("invalid date provided in form");
      return res.send(400);
    }


    Task.create({
      name: name,
      priority: priority,
      category: category,
      description: description,
      dueDate: dueDate,
      user: userID
    }).exec(function (err, task) {
      if (err) {
        sails.log.error("Error creating task for user " + userID);
        return res.send(500);
      }

      sails.log.info("Task created with id " + task.id + " for user " + userID);
      return res.view("tasksList", {
        tasks: [task],
        dailyTop: false
      });

    });


  },

  //PATCH /tasks
  //task editing procedure
  //change the task to completed or change its details
  editTask: function (req, res) {
    var userID = req.session.user_id;
    var taskID = req.body.id;

    var queryParam;

    // console.log(req.body);

    // change the task's status to completed
    if (req.body.completed) {
      queryParam = {
        category: "Completed",
        completedDate: new Date()
      };
    }

    // edit task details
    else {
      var dueDate, priority, name, description, category;

      //form validation
      try {
        dueDate = new Date(req.body.dueDate);
        priority = Number(req.body.priority);
        name = req.body.name.toString();
        description = req.body.description.toString();
        category = req.body.category.toString();
      }

      catch (err) {
        return res.send(400);
      }

      if (dueDate == "Invalid Date") {
        sails.log.debug("invalid date provided in form");
        return res.send(400);
      }

      queryParam = {
        name: name,
        priority: priority,
        category: category,
        description: description,
        dueDate: dueDate
      };

      //console.log(queryParam);
    }

    //update the task and return the rendered view of it
    Task.update({
      id: taskID,
      user: userID
    }, queryParam).exec(function (err, tasks) {
      if (err) {
        sails.log.error("Error updating task for user " + userID);
        return res.send(500);
      }

      sails.log.info(tasks.length + " task with id " + tasks[0].id + " updated for user " + userID);
      res.view("tasksList", {
        dailyTop: false,
        tasks: tasks
      });

    });

  },

  // GET /tasks
  // render the task view with top daily tasks, load category tasks separately
  taskView: function (req, res) {
    var userID = req.session.user_id;

    //options: sort by priority and limit number of daily tasks
    User.findOne({
      id: userID
    }).exec(function (err, user) {
      if (err) {
        sails.log.error("Error while loading user for daily task view of user " + userID);
        sails.log.error(err);
        return res.view("500");
      }

      //console.log(user);
      var dailyTasks = user.dailyTasks;

      var queryParam = {where: {user: userID, category: {"!": "Completed"}}, limit: Number(dailyTasks)};
      queryParam["sort"] = user.maxPriorityFirst ? "priority DESC" : "dueDate";

      //console.log(queryParam);

      Task.find(queryParam).exec(function (err, tasks) {
        if (err) {
          sails.log.error("Error while loading tasks for daily task view of user " + userID);
          sails.log.error(err);
          return res.view("500");
        }

        //console.log(tasks);

        res.view("tasks", {
          dailyTop: true,
          tasks: tasks
        })

        sails.log.info("Succesfully sent task view for user " + userID);
      });
    });


  },

  //GET /tasksCategory
  // gets and loads the tasks in a specified category
  tasksCategory: function (req, res) {
    var userID = req.session.user_id;
    var category = req.query.category;
    var queryParam = category == "All" ? {user: userID, category: {"!": "Completed"}} : {
        user: userID,
        category: category
      };

    //console.log(category);

    Task.find(queryParam).exec(function (err, tasks) {
      if (err) {
        sails.log.error("Error while loading tasks for task category view of user " + userID);
        return res.view("500");
      }

      res.view("tasksList", {
        category: category,
        dailyTop: false,
        tasks: tasks
      });

      sails.log.info("Succesfully sent task data for user " + userID);

    });
  },

  //GET /productivity
  // renders the productivity view
  productivityView: function (req, res) {
    res.view("productivity");

  },

  //GET /productivityData
  // returns the productivity data for the productivity view of a specified time period
  productivity: function (req, res) {
    var userID = req.session.user_id;
    period = req.query.period;

    var periodMap = {
      "day": 24,
      "week": 7,
      "month": 30,
      "year": 12
    };

    var dateToUnit = function (date) {
      switch (period) {
        case "day":
          return date.getHours();
        case "week":
          return date.getDay();
        case "month":
          return date.getDay();
        case "year":
          return date.getMonth();
      }
    };

    var periodLength = periodMap[period];

    var date = moment().subtract(1, period + 's').toDate();

    Task.find({
      user: userID,
      category: "Completed",
      completedDate: {'>': date}
    }).exec(function (err, tasks) {

      //console.log(date);
      //console.log(tasks);

      if (err) {
        sails.log.error("Error while loading tasks for productivity view of user " + userID);
        return res.view("500");
      }

      var missedTasks = tasks.filter(function (t) {
        return t.completedDate > t.dueDate;
      });

      var totalProductivity = tasks.reduce(function (acc, t) {
        return acc + t.priority;
      }, 0);

      var productivityByUnitOfTime = tasks.reduce(function (acc, t) {
        var i = dateToUnit(t.completedDate);
        acc[i] += t.priority;
        return acc;
      }, new Array(periodLength).fill(0));

      //console.log(productivityByUnitOfTime);

      res.send({
        completed: tasks.length,
        missed: missedTasks.length,
        total: totalProductivity,
        productivity: productivityByUnitOfTime
      })

      sails.log.info("Succesfully sent productivity data for user " + userID);
    });
  },

  //GET /tasksAdmin
  // gets and loads all tasks of a user
  tasksAdmin: function (req, res) {
    var userID = req.query.userID;

    Task.find({
      user: userID
    }).exec(function (err, tasks) {
      if (err) {
        sails.log.error("Error while loading tasks for task admin view of user " + userID);
        return res.view("500");
      }

      res.view("tasksList", {
        category: "All",
        dailyTop: true,
        tasks: tasks
      });

      sails.log.info("Succesfully sent task admin data for user " + userID);

    });
  }


};

