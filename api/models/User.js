/**
 * User.js
 *
 * @description :: This model represents users.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs');



module.exports = {

  attributes: {
    name: {
      type: "string",
      size: 50,
      notNull: true
    },
    email: {
      type: "string",
      size: 100,
      unique: true,
      notNull: true
    },
    password: {
      type: "string",
      size: 60,
      notNull: true
    },
    dailyTasks: {
      type: "integer",
      defaultsTo: 5,
      columnName: "daily_tasks"
    },
    maxPriorityFirst: {
      type: "boolean",
      defaultsTo: true,
      columnName: "max_priority_first"
    },
    completedTasks: {
      type: "integer",
      defaultsTo: 0,
      columnName: "completed_tasks"
    },
    productivityPoints: {
      type: "integer",
      defaultsTo: 0,
      columnName: "productivity_points"
    },
    tasks: {
      collection: "task",
      via: "user"
    },
    admin: {
      type: "boolean",
      defaultsTo: false
    }
  },
  autoCreatedAt: false,
  autoUpdatedAt: false,

  // Lifecycle Callbacks
  beforeCreate: function(values, next) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err)
        return next(err);

       bcrypt.hash(values.password, salt, null, function(err, hash) {
        if (err) {
          return next(err);
        }
        values.password = hash;
        next();
      });
    });

  }
};

