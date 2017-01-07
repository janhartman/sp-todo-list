/**
 * Created by Jan on 7. 01. 2017.
 */

module.exports = function(req, res, next) {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }
  else{
    return next();
  }
};
