var spicePg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = process.env.DATABASE_URL ||`postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/gamerscommunity`;
var db = spicePg(dbUrl);

function getAllFriends(id){
  const q = `SELECT users.id, users.firstname, users.lastname, users.username, users.country, users.city, users.imgurl, friends.recipientid, friends.senderid, friends.status
  FROM users JOIN friends
  ON (users.id = friends.recipientid AND friends.recipientid <> $1)
  OR (users.id = friends.senderid AND friends.senderid <> $1)
  WHERE (friends.recipientid = $1 OR friends.senderid = $1)
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
  const q = `SELECT users.id, friends.recipientid, friends.senderid, friends.status, users.firstname, users.lastname, users.username, users.country, users.city, users.imgurl
  FROM friends JOIN users ON friends.senderid = users.id
  WHERE (friends.recipientid = $1) AND (friends.status = 'pending');`;
  const params = [ id ];
  return db.query(q, params).then(function(results) {
    return results.rows;
  }).catch(function(err) {
    throw err;
  });
}//querys for the FriendsButton
function getFrienshipStatus(id, user_id) {
  const q = `SELECT recipientid, senderid, status
  FROM friends
  WHERE (recipientid = $1 OR senderid = $1)
  AND (recipientid = $2 OR senderid = $2);`
  ;
  const params = [id, user_id];
  return db.query(q, params).then(function(results){
    return results.rows[0] || null;

  }).catch(function(err){
    console.log(err);
    throw err;
  });
}
function insertFriend(id, userId) {
  const q = `INSERT INTO friends
  (senderid, recipientid,  status)
  VALUES ($1, $2, $3)
  RETURNING status;`
  ;
  const params=[id, userId, "pending"];
  return db.query(q, params).then(function (results) {
    return results.rows[0];
  }).catch(function (err) {
    console.log(err);
    throw err;
  })
}

function acceptFriendRequest(id, userId) {
  const q = `UPDATE friends
  SET status = $3, updated_at = CURRENT_TIMESTAMP
  WHERE (recipientid= $2 OR senderid= $1)
  RETURNING status;`
  ;

  const params =[id, userId, "accepted"];
  return db.query(q, params).then(function(results){
    return results.rows[0];
  }).catch(function(err){
    console.log(err);
    throw err;
  });
}

function cancelFriendRequest(id, userId) {
  const q = `UPDATE friends
  SET status =$3
  WHERE (recipientid= $1 OR senderid= $2)
  RETURNING status;`
  ;
  const params = [id, userId, "cancelled"];
  return db.query(q, params).then(function(results){
    return results.rows[0];
  }).catch(function(err){
    console.log(err);
    throw err;
  });
}
function eliminateFriend(id, userId){
  const q =`UPDATE friend_requests
  SET status = $3, updated_at = CURRENT_TIMESTAMP
  WHERE (recipientid = $2 AND senderid = $1)
  RETURNING status;`
  ;
  const params =[id, userId, "terminated"];
  return db.query(q, params).then(function (results) {
    return results.rows[0];
  }).catch(function (err) {
    console.log(err);
    throw err;
  });
}

exports.getAllFriends= getAllFriends;
exports.getPendingRequests = getPendingRequests;
exports.getFrienshipStatus = getFrienshipStatus;
exports.insertFriend = insertFriend;
exports.acceptFriendRequest = acceptFriendRequest;
exports.cancelFriendRequest = cancelFriendRequest;
exports.eliminateFriend = eliminateFriend;
