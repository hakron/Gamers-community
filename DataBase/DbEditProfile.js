var spicePg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = process.env.DATABASE_URL ||`postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/gamerscommunity`;
var db = spicePg(dbUrl);
function updateProfile(firstname, lastname, country, city, age, id) {
  const q = `UPDATE users
  SET (firstname, lastname, country, city, age) =  ($1, $2, $3, $4, $5)
  WHERE id = $6;`
  const params = [firstname, lastname, country, city, age,id];
  return db.query(q, params).then(function (results) {
    return results;
  }).catch(function(err){
    console.log(err);
    throw err;
  });
}

exports.updateProfile = updateProfile;
