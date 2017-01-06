/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: "string",
      size: 50,
      required: true
    },
    email: {
      type: "string",
      size: 100,
      unique: true,
      required: true
    },
    password: {
      type: "text",
      size: 50,
      required: true
    },
    dailyTasks: {
      type: "integer",
      defaultsTo: 5
    }
  }
};

