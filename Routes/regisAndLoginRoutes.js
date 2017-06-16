const express = require('express');
router = express.Router();
const db = require('../DataBase/dbRegisAndLogin.js');
const auth = require('../Utilities/utilities.js');

router.route('/registerNewUser')
.post((req, res) => {
  if (!req.body.name || !req.body.lastname || !req.body.email || !req.body.password){
    res.json({
      success:false
    });

  } else {
    auth.hashPassword(req.body.password).then(function(hash){
      db.insertUser(req.body.name, req.body.lastname, req.body.country, req.body.city, req.body.age, req.body.email, hash).then(function(results){
        req.session.user = {
          id : results.id,
          name : req.body.name,
          lastname : req.body.lastname,
          country: req.body.country,
          city: req.body.city,
          age: req.body.age,
          email : req.body.email
        };
        res.json({
          success:true
        })
      }).catch(function(err){
        console.log(err);
        res.json({
          success: false,
          notUnique: "not unique"
        })
      });
    }).catch(function (err) {
      console.log(err);
    });
  }
});
router.route('/loginUser')
.post((req, res) => {
  if (!req.body.email || !req.body.password){
    res.json({
      success:false,
    });
  } else {
    db.checkIfEmailExists(req.body.email).then(function(exists){
      if(!exists){
        res.json({
          success:false,
          notExists: "not exists"
        });
      } else {
        db.getPassword(req.body.email).then(function(results){
          auth.checkPassword(req.body.password, results).then(function(doesMatch){
            if (doesMatch == true){
              db.getUser(req.body.email)
              .then(function(results){
                //data from the database
                req.session.user={
                  id : results.id,
                  name : results.firstname,
                  lastname : results.lastname,
                  country: results.country,
                  city: results.city,
                  age: results.age,
                  email : req.body.email,
                  profilePicUrl: results.imgurl,
                  bio: results.info
                };
                // return req.session.user;
                res.json({
                  userInfo: req.session.user,
                  success: true
                });
              });
            } else {
              res.json({
                success:false,
                error: "wrong pwd"
              });
            }
          });
        });
      }
    });
  }
});
router.get('/logout', function(req, res){
  req.session = null;
    res.redirect('/welcome#/login');
});
module.exports = router;
