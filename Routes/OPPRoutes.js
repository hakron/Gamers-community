const express = require('express');
router = express.Router();
const db = require('../DataBase/DbOPP.js');

router.route('/user/:id/data')
  .get(requireUser, ( req, res) => {
    if (req.params.id == req.session.user.id) {
      res.json({
        redirect: true
      });
      return;
    }else{
      req.params.id != req.session.user.id;
    }

    db.getUserOP(req.params.id).then(function(results){
      const userInfo = {
        id: results.id,
        username: results.username,
        firstname: results.firstname,
        lastname: results.lastname,
        country: results.country,
        city: results.city,
        profilePicUrl: results.imgurl,
        bio: results.info
      };
      res.json({
        success: true,
        results:userInfo
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
