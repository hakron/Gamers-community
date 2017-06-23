var spicePg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = process.env.DATABASE_URL ||`postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/gamerscommunity`;
var db = spicePg(dbUrl);

function getOnlineFriends(onlineUsers){
  var newArray = [];
  onlineUsers.forEach(function(currentValue, index){
    newArray.push(currentValue["userId"]);
  });
  const q = `SELECT users.id, users.username, users.imgurl, friends.status
  FROM users JOIN friends ON users.id = friends.senderid
  WHERE users.id = ANY ($1) AND friends.status = 'accepted';`
  ;
  const params = [newArray];
    return db.query(q, params).then(function(results){
      return results.rows;
    }).catch(function(err){
      console.log("there was an error in getOnlineFriends", err);
      throw err;
    });
}
exports.getOnlineFriends = getOnlineFriends;
