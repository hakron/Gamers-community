var spicePg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = process.env.DATABASE_URL ||`postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/gamerscommunity`;
var db = spicePg(dbUrl);

function getAllFriends(id){
  const q = `SELECT users.id, users.firstname, users.lastname, users.imgurl, friends.recipient_id, friends.sender_id, friends.status
  FROM users JOIN friends
  ON (users.id = friends.recipient_id AND friends.recipient_id <> $1)
  OR (users.id = friends.sender_id AND friends.sender_id <> $1)
  WHERE (friends.recipient_id = $1 OR friends.sender_id = $1)
  AND (friends.status = 'accepted');`
  ;
  const params = [ id ];
  return db.query(q, params).then(function(results){
    return results.rows;
  }).catch(function(err){
    console.log(err);
    throw err;
  });
}
function getPendingRequests(id) {
  const q = `SELECT users.id, friends.recipient_id, friends.sender_id, friends.status, users.firstname, users.lastname, users.imgurl
  FROM friends JOIN users ON friends.sender_id = users.id
  WHERE (friends.recipient_id = $1) AND (friends.status = 'pending');`;
  const params = [ id ];
  return db.query(q, params).then(function(results) {
    return results.rows;
  }).catch(function(err) {
    throw err;
  });
}
exports.getAllFriends= getAllFriends;
exports.getPendingRequests = getPendingRequests;
