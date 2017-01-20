/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');


module.exports = {

  /**
 * @api {post} /tasks Create a new task
 * @apiName AddTask
 * @apiGroup Task
 *
 * @apiParam {id} id User's unique id
 * @apiParam {Date} dueDate Due date
 * @apiParam {Number} priority Task priority
 * @apiParam {String} name Task name
 * @apiParam {String} description Task description
 * @apiParam {String} category Task category
 *
 * @apiSuccess 200 task page load
 * @apiError 400 missing data for task creation
 */
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
      sails.log.debug("addTask: Invalid form data for task creation by user " + userID);
      return res.send(400);
    }

    if (dueDate == "Invalid Date") {
      sails.log.debug("addTask: Invalid date provided for task creation by user " + userID);
      return res.send(400);
    }

    if (!dueDate || priority == undefined || !name || !category) {
      sails.log.debug("addTask: Missing form data for task creation by user " + userID);
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
        sails.log.error("addTask: Error creating task by user " + userID);
        return res.send(500);
      }

      sails.log.info("addTask: Task created with id " + task.id + " for user " + userID);
      return res.view("tasksList", {
        tasks: [task],
        dailyTop: false
      });

    });


  },

  /**
 * @api {patch} /tasks Edit task
 * @apiName EditTask
 * @apiGroup Task
 *
 * @apiParam {id} id User's unique id
 * @apiParam {taskId} taskId Task's unique id
 * @apiParam {Date} dueDate Due date
 * @apiParam {Number} priority Task priority
 * @apiParam {String} name Task name
 * @apiParam {String} description Task description
 * @apiParam {String} category Task category
 * @apiParam {Boolean} completed Task completion status
 *
 * @apiSuccess 200 task page load
 * @apiError 400 missing data for task creation
 */
  editTask: function (req, res) {
    var userID = req.session.user_id;
    var taskID = req.body.id;

    var queryParam;

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
        sails.log.debug("editTask: invalid date provided in form by user " + userID);
        return res.send(400);
      }

      queryParam = {
        name: name,
        priority: priority,
        category: category,
        description: description,
        dueDate: dueDate
      };

    }

    //update the task and return the rendered view of it
    Task.update({
      id: taskID,
      user: userID
    }, queryParam).exec(function (err, tasks) {
      if (err) {
        sails.log.error("editTask: Error updating task with id " + tasks[0].id + " for user " + userID);
        return res.send(500);
      }

      sails.log.info("editTask: " + tasks.length + " task with id " + tasks[0].id + " updated for user " + userID);
      res.view("tasksList", {
        dailyTop: false,
        tasks: tasks
      });

    });

  },

  /**
 * @api {get} /tasks Load task view with daily tasks
 * @apiName GetTasks
 * @apiGroup Task
 *
 * @apiParam {id} id User's unique id
 *
 * @apiSuccess 200 task page load
 * @apiError 404 user not found
 */
  taskView: function (req, res) {
    var userID = req.session.user_id;

    //options: sort by priority and limit number of daily tasks
    User.findOne({
      id: userID
    }).exec(function (err, user) {
      if (err) {
        sails.log.error("taskView: Error while loading user for daily task view of user " + userID);
        sails.log.error(err);
        return res.view("500");
      }

      var dailyTasks = user.dailyTasks;

      var queryParam = {where: {user: userID, category: {"!": "Completed"}}, limit: Number(dailyTasks)};
      queryParam["sort"] = user.maxPriorityFirst ? "priority DESC" : "dueDate";

      Task.find(queryParam).exec(function (err, tasks) {
        if (err) {
          sails.log.error("taskView: Error while loading tasks for daily task view of user " + userID);
          sails.log.error(err);
          return res.view("500");
        }

        res.view("tasks", {
          dailyTop: true,
          tasks: tasks
        });

        sails.log.info("taskView: Succesfully sent task view for user " + userID);
      });
    });


  },

  /**
 * @api {get} /tasks/category
 * @apiName GetTasksCategory
 * @apiGroup Task
 *
 * @apiParam {id} id User's unique id
 * @apiParam {String} category Task category
 *
 * @apiSuccess 200 task page load
 * @apiError 404 User not found
 */
  tasksCategory: function (req, res) {
    var userID = req.session.user_id;
    var category = req.query.category;
    var queryParam = category == "All" ? {user: userID, category: {"!": "Completed"}} : {
        user: userID,
        category: category
      };

    Task.find(queryParam).exec(function (err, tasks) {
      if (err) {
        sails.log.error("tasksCategory: Error while loading tasks for task category view of user " + userID);
        return res.view("500");
      }

      res.view("tasksList", {
        category: category,
        dailyTop: false,
        tasks: tasks
      });

      sails.log.info("tasksCategory: Succesfully sent task data for user " + userID);

    });
  },

  /**
 * @api {get} /productivity Load productivity page
 * @apiName GetProductivity
 * @apiGroup Task
 *
 * @apiSuccess 200 productivity page load
 */
  productivityView: function (req, res) {
    res.view("productivity");
  },

  /**
 * @api {get} /productivity/data Get productivity data for specified time period
 * @apiName GetProductivityData
 * @apiGroup Task
 *
 * @apiParam {id} id User's unique id
 * @apiParam {String} period Time period
 *
 * @apiSuccess 200 productivity data
 * @apiError 400 missing or wrong time period
 */
  productivity: function (req, res) {
    var userID = req.session.user_id;
    period = req.query.period;

    if (!period || ["day", "week", "month", "year"].indexOf(period) < 0) {
      res.status(400);
      return res.send({});
    }

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

      if (err) {
        sails.log.error("productivityData: Error while loading tasks for productivity view of user " + userID);
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

      res.send({
        completed: tasks.length,
        missed: missedTasks.length,
        total: totalProductivity,
        productivity: productivityByUnitOfTime
      });

      sails.log.info("productivityData: Succesfully sent productivity data for user " + userID);
    });
  },

  /**
 * @api {get} /admin/tasks Get tasks of a user for admin panel
 * @apiName GetAdminTasks
 * @apiGroup Task
 *
 * @apiParam {id} id User's unique id
 *
 * @apiSuccess 200 tasks list for user
 * @apiError 404 user not found
 */
  tasksAdmin: function (req, res) {
    var userID = req.query.userID;

    Task.find({
      user: userID
    }).exec(function (err, tasks) {
      if (err) {
        sails.log.error("tasksAdmin: Error while loading tasks for task admin view of user " + userID);
        return res.view("500");
      }

      res.view("tasksList", {
        category: "All",
        dailyTop: true,
        tasks: tasks
      });

      sails.log.info("tasksAdmin: Succesfully sent task admin data for user " + userID);

    });
  }


};

