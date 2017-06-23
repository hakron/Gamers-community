const express = require('express');
router = express.Router();
const db = require('../DataBase/DbWallFeed.js');

router.route('/insertComment/:commentedId')
.post(requireUser, (req, res) => {
  var profileThatWasCommented;
  // NOTE: should probably send the user.id as the commentedId

  if(req.params.commentedId === "null"){
        profileThatWasCommented = req.session.user.id;
  } else {

    profileThatWasCommented = req.params.commentedId;
  }

  db.insertComment(profileThatWasCommented, req.session.user.id, req.body.comment)
  .then(function () {
    res.redirect(`/getUserComment/${profileThatWasCommented}/comments`)
  })
  .catch(function(err){
    console.log(err);
  });
});
router.route('/getUserComment/:commentedId/comments')
.get(requireUser, (req, res) =>{
  var profileThatWasCommented;
  if(req.params.commentedId === "null" || req.params.commentedId === "undefined"){
    profileThatWasCommented = req.session.user.id;
  } else {
    profileThatWasCommented = req.params.commentedId;
  }
  db.getComments(profileThatWasCommented).then(function (comments) {
    res.json({
      success: true,
      comments: comments
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
