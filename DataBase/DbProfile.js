var spicePg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = process.env.DATABASE_URL ||`postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/gamerscommunity`;
var db = spicePg(dbUrl);

// function getUser(id) {
//   const q = `SELECT *
//   FROM users
//   WHERE id = $1`
//   ;
//   return db.query(q, [id]).then(function( results) {
//     return results.rows[0];
//   }).catch(function(err){
//     console.log(err);
//
//   });
//
// }
function insertImg(imgurl, id){
  const q = `UPDATE users
  SET imgurl = $1
  WHERE id = $2
  RETURNING imgurl;`
  ;
  const params = [
    imgurl,
    id
  ];
  return db.query(q, params).then(function (results) {
    return results.rows[0];
  }).catch(function(err){
    console.log(err);
  });
}
function insertComment(commented_id, user_id, comments){
  const q = `INSERT INTO comments
  (commentedid, userid, comments)
  VALUES ($1, $2, $3)`
  ;
  const params = [commented_id, user_id, comments];

  return db.query(q, params).then(function(results){
    console.log(results);
    return results.rows[0];
  }).catch(function(err){
    console.log(err);
    throw err;
  });
}
function getComments(commentedId){
  const q = `SELECT users.id, users.username, users.imgurl, comments.comments
  FROM users
  JOIN comments
  ON users.id = comments.userid WHERE comments.commentedid = $1`
  ;
  return db.query(q, [commentedId]).then(function (results) {
    return results.rows;
  }).catch(function (err) {
    console.log(err);
    throw err;
  });
}

exports.insertComment = insertComment;
exports.getComments = getComments;
// exports.getUser = getUser;
exports.insertImg = insertImg;
