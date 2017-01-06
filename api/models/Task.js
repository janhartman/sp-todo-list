/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    "name": {
      type: "string",
      size: 50,
      required: true
    },
    "description": {
      type: "longtext"
    },
    "dueDate": {
      type: "date",
      required: true
    },
    "priority": {
      type: "integer",
      defaultsTo: 1
    },
    "category": {
      type: "string",
      size: 20,
      defaultsTo: "Other"
    }
  }
};

