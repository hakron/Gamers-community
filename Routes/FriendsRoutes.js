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
function requireUser(req, res, next){
  if(req.session.user){
    return next();
  }
  res.redirect('/welcome');
}
module.exports = router;
