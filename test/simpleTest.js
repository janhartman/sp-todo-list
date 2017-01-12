/**
 * Created by Jan on 8. 01. 2017.
 */


var Sails = require('sails').constructor;
var sails = new Sails();

sails.lift({}, function(err) {
  if (err)
    throw err;

  sails.lower();
})
