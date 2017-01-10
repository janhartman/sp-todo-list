module.exports = function(req, res, next) {

  User.findOne({
    id: req.session.user_id
  }).exec(function(err, user) {
    if (!user.admin) {
      return res.redirect('/');
    }
    else{
      return next();
    }
  });


};
