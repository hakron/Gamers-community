const express = require('express');
router = express.Router();
const db = require('../DataBase/DbApp.js');

router.route('/getUserProfileInfo')
.get(requireUser, (req, res) => {
  //data from req.session.user
  const userInfo = {
    id: req.session.user.id,
    username: req.session.user.username,
    firstname: req.session.user.name,
    lastname: req.session.user.lastname,
    profilePicUrl: req.session.user.profilePicUrl
  };
  res.json({
    succes: true,
    results:userInfo
  });
});

router.route('/getAllUserNames')
  .get(requireUser, (req, res) => {
    db.getUsersNames().then(function(results) {
      res.json({
        success: true,
        usernames: res.results.username
      });
    });
  });
function requireUser(req, res, next){
  if(req.session.user){
    return next();
  }
  res.redirect('/welcome');
}
module.exports = router;
