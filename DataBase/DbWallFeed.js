var spicePg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = process.env.DATABASE_URL ||`postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/gamerscommunity`;
var db = spicePg(dbUrl);

function insertComment(commented_id, user_id, comments){
  const q = `INSERT INTO comments
  (commented_id, user_id, comments)
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
  ON users.id = comments.user_id WHERE comments.commented_id = $1`
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
