const express = require('express');
router = express.Router();
const db = require('../DataBase/DbEditUsername.js');

router.route('/editUsername')
  .post(requireUser,(req, res) => {
  db.editUsername(req.body.username, req.session.user.id).then(function(results){
    req.session.user.username = req.body.username;
    res.json({
      success:true,
      username: req.body.username
    });
  }).catch(function(err){
    console.log(err);
  });
});

function requireUser(req, res, next){
  if(req.session.user){
    return next();
  }
  res.redirect('/welcome');
}
module.exports = router;
