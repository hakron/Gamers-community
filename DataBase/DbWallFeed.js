var spicePg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = process.env.DATABASE_URL ||`postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/gamerscommunity`;
var db = spicePg(dbUrl);

function insertComment(commentedId, userId, comments){
  const q = `INSERT INTO comments
  (commentedid, userid, comments)
  VALUES ($1, $2, $3)`
  ;
  const params = [commentedId, userId, comments];
  return db.query(q, params).then(function(results){
    // return results.rows[0];
    return {success: true};
  }).catch(function(err){
    console.log(err);
    throw err;
  });
}
function getComments(commentedId){
  const q = `SELECT users.id, users.username, users.city, users.country, users.info, users.imgurl, comments.comments, comments.created_at
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
