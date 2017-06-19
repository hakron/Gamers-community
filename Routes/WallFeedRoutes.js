const express = require('express');
router = express.Router();
const db = require('../DataBase/DbWallFeed.js');

router.route('/insertComment/:commentedId')
.post(requireUser, (req, res) => {
  var profileThatWasCommented;
  if(req.params.commentedId === "undefined"){
    profileThatWasCommented = req.session.user.id;
  } else {
    profileThatWasCommented = req.params.commentedId;
  }
  db.insertComment(profileThatWasCommented, req.session.user.id, req.body.comment).then(function(results){
    res.json({
      success:true,
      comment: req.body.comment
    });
  }).catch(function(err){
    console.log(err);
  });
});
});
router.route('/getUserComment/:commentedId/comments')
.get(requireUser, (req, res) =>{
  var profileThatWasCommented;
  if(req.params.commentedId === "undefined"){
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
