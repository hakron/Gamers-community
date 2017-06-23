var spicePg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = process.env.DATABASE_URL ||`postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/gamerscommunity`;
var db = spicePg(dbUrl);

function getUserOP(id) {

  const q = `SELECT *
  FROM users
  WHERE id = $1`
  ;
  return db.query(q, [id]).then(function(results) {

    return results.rows[0];
  }).catch(function(err){
    console.log(err);
    throw err;
  });

}
exports.getUserOP = getUserOP;
