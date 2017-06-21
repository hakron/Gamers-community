var spicePg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = process.env.DATABASE_URL ||`postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/gamerscommunity`;
var db = spicePg(dbUrl);

function editUserBio(info, id) {
  const q = `UPDATE users
  SET info = $1
  WHERE id = $2
  RETURNING info;`
  ;
  const params = [
    info,
    id
  ];
  return db.query(q, params).then(function (results) {
    return results;
  }).catch(function(err){
    console.log(err);
    throw err;
  });
}
function editUsername(username, id) {
  const q = `UPDATE users
  SET username = $1
  WHERE id =$2
  RETURNING username;`
  const params = [username, id];
  return db.query(q, params).then(function(results){
    return results
  }).catch(function(err){
    console.log(err);
    throw err;
  });
}
exports.editUserBio = editUserBio;
exports.editUsername = editUsername;
