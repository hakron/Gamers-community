const express = require('express');
router = express.Router();
const db = require('../DataBase/DbEditProfile.js');

router.route('/updateUserProfile')
.post(requireUser, (req, res) => {
  db.updateProfile(req.body.name,  req.body.lastname, req.body.country, req.body.city, req.body.age, req.session.user.id).then(function(results){
    req.session.user = {
      id : req.session.user.id,
      name : req.body.name,
      lastname : req.body.lastname,
      country: req.body.country,
      city: req.body.city,
      age: req.body.age,
    };
    res.json({
      success:true
    });
  }).catch(function (err) {
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
