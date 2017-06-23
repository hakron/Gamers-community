const express = require('express');
router = express.Router();
const db = require('../DataBase/DbEditBio.js');

router.route('/editUserBio')
  .post(requireUser,(req, res) => {
  db.editUserBio(req.body.bio, req.session.user.id).then(function(results){
    req.session.user.bio = req.body.bio;
    res.json({
      success:true,
      bio: req.body.bio
    });
  }).catch(function(err){
    console.log(err);
  });
});
//get the bio from the user and render it in the user profile


function requireUser(req, res, next){
  if(req.session.user){
    return next();
  }
  res.redirect('/welcome');
}
module.exports = router;
