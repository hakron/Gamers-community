const express = require('express');
router = express.Router();
const db = require('../DataBase/DbProfile.js');
const path = require('path');
const multer = require('multer');
const diskStorage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null, path.resolve(__dirname, '../Uploads'));
  },
  filename: function (req, file, callback){
    callback(null, Date.now() + '_' + Math.floor(Math.random() * 99999999) + '_' + file.originalname);
  }
});
const uploader = multer({
  storage: diskStorage,
  limits: {
    filesize: 2097152
  }
});

router.route('/userProfileInfo')
.get(requireUser, (req, res) => {
  //data from req.session.user
  const userInfo = {
    id: req.session.user.id,
    username: req.session.user.username,
    firstname: req.session.user.name,
    lastname: req.session.user.lastname,
    country: req.session.user.country,
    city: req.session.user.city,
    bio: req.session.user.bio,
    profilePicUrl: req.session.user.profilePicUrl
  };
  res.json({
    succes: true,
    results:userInfo
  });
});
router.route('/userInsertProfilePic')
.post(requireUser, uploader.single('file'),(req, res) => {
  if (req.file) {
    db.insertImg( req.file.filename, req.session.user.id).then(function(results){
        req.session.user.profilePicUrl = results.imgurl;
      res.json({
        success:true,
        newImagePath: results.imgurl
      });
    }).catch(function (err) {
      console.log(err);
    });

  } else {
    res.json({
      success: false,
    });
  }
});
router.route('/previewUserProfilePic')
.post(requireUser, uploader.single('file'), (req, res) => {
  res.json({
    success:true,
    file: '/Uploads/' + req.file.filename
  });
});

router.route('/userBio')
  .get(requireUser, (req, res) => {
  const userInfo = {
    bio: req.session.user.bio
  };
  res.json({
    succes: true,
    results:userInfo
  });
});
function requireUser(req, res, next){
  if(req.session.user){
    return next();
  }
  res.redirect('/welcome');
}
module.exports = router;
