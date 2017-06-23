const express = require('express');
router = express.Router();
const db = require('../DataBase/DbFriends.js');

router.route('/getAllFriendsAndPendingRequest')
.get(requireUser, (req, res) => {
  Promise.all ([
    db.getAllFriends(req.session.user.id),
    db.getPendingRequests(req.session.user.id),
  ]).then((data) => {
    res.json({
      succes:true,
      friends: data[0],
      requests: data[1]
    });
  }).catch((err) =>{
    res.json({
      succes:false
    });
  });

});
router.route('/getFrienshipStatus/:friendId/friendship')
.get(requireUser, (req, res) => {
  var otherUserId =req.params.friendId;
  db.getFrienshipStatus(req.session.user.id, otherUserId).then(function(results){
    res.json({ friendshipStatusInfo: results});
  }).catch(function(err){
    console.log(err);
    res.json({ err: true });
  });
});
router.route('/userAddFriend/:friendId/addFriends')
.post(requireUser, (req, res) => {
  var otherUserId = req.params.friendId;
  db.insertFriend(req.session.user.id, otherUserId).then(function(results){
    res.json({status: results.status});
  }).catch(function(err){
    console.log(err);
    res.json({error: true});
  });
});
router.route('/userAcceptFriend/:friendId/acceptFriendship')
.post(requireUser, (req, res) => {
  var otherUserId = req.params.friendId;
  db.acceptFriendRequest(req.session.user.id, otherUserId).then(function(results){
    res.json({status: results.status});
  }).catch(function(err){
    console.log(err);
    res.json({error: true});
  });
});
router.route('/userEndFriendship/:friendId/endFriendship')
.post(requireUser, (req, res) => {
  var otherUserId =req.params.friendId;
  db.eliminateFriend(req.session.user.id, otherUserId).then(function(results){
    res.json({status:results.status});
  }).catch(function(err){
    console.log(err);
    res.json({error: true});
  });
});

function requireUser(req, res, next){
  if(req.session.user){
    return next();
  }
  res.redirect('/welcome');
}
module.exports = router;
