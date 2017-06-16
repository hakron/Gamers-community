var spicePg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = process.env.DATABASE_URL ||`postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/gamerscommunity`;
var db = spicePg(dbUrl);
// use several files depending on the constructor
function insertUser(name, last_name, country, city, age, email, hash){
  const q = `INSERT INTO users
  (firstname, lastname, country, city, age, email, hashpassword)
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;`
  ;
  const params = [
    name,
    last_name,
    country,
    city,
    age,
    email,
    hash
  ];
  return db.query(q, params).then(function (results) {
    return results.rows[0];

  }).catch(function (err) {
    console.log("there was an error", err);
    throw err;
  });
}
function checkIfEmailExists(email) {
  const q = `SELECT email
  FROM users
  WHERE email = $1`
  ;
  return db.query(q,[email]).then(function(results){
    var exists = false;
    var data =  results.rows;
    for (var i = 0; i < data.length; i++) {
      if (data[i].email === email) {
        exists = true;
      }
    }
    return exists;
  }).catch(function (err) {
    console.log(err);
  });
}
function getPassword(email) {
  const q = `SELECT hashpassword FROM users WHERE email = '${email}'`;
  return db.query(q, []).then(function(results){
    return results.rows[0].hashpassword;
  }).catch(function (e) {
    console.log("there was an error", e);
  });
}

// <======= fn to get the require user data to build req.session.user =========>
function getUser(email) {
  const q = `SELECT *
  FROM users
  WHERE email = $1`
  ;
  return db.query(q, [email]).then(function( results) {
    return results.rows[0];
  }).catch(function(err){
    console.log(err);

  });

}

exports.insertUser = insertUser;
exports.checkIfEmailExists = checkIfEmailExists;
exports.getPassword = getPassword;
exports.getUser = getUser;
