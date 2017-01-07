/**
 * Task.js
 *
 * @description :: This model represents tasks.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    "name": {
      type: "string",
      size: 50,
      notNull: true
    },
    "description": {
      type: "longtext"
    },
    "dueDate": {
      type: "date",
      notNull: true,
      columnName: "due_date"
    },
    "priority": {
      type: "integer",
      defaultsTo: 1
    },
    "category": {
      type: "string",
      size: 20,
      defaultsTo: "Other"
    },
    "completedDate": {
      type: "date",
      columnName: "completed_date"
    },
    "user": {
      model: "user",
      notNull: true,
      columnName: "user_id",
      index: true
    }
  },
  autoCreatedAt: false,
  autoUpdatedAt: false,
};

