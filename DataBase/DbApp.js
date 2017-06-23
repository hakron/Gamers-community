var spicePg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = process.env.DATABASE_URL ||`postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/gamerscommunity`;
var db = spicePg(dbUrl);
function getUser(email) {
  const q = `SELECT *
  FROM users
  WHERE email = $1`
  ;
  return db.query(q, [email]).then(function( results) {
    return results.rows[0];
  }).catch(function(err){
    console.log("there was an error in getUser", err);

  });

}
// function getUsersNames() {
//   const q = `SELECT username, imgurl
//   FROM users;`
//   ;
//   return db.query(q, []).then(function( results ){
//     return results;
//   }).catch(function(err){
//     console.log(err);
//     throw err;
//   });
// }
exports.getUser = getUser;
// exports.getUsersNames = getUsersNames;
