/**
 * Created by Jan on 8. 01. 2017.
 */


var Sails = require('sails').constructor;
var sails = new Sails();

sails.lift({
  port: process.env.PORT || 1337
}, function(err) {
  if (err)
    throw err;

  sails.lower();
});
