var spicePg = require('spiced-pg');
var secrets = require('./secrets.json');
var dbUrl = process.env.DATABASE_URL ||`postgres:${secrets.dbUser}:${secrets.password}@localhost:5432/gamerscommunity`;
var db = spicePg(dbUrl);

function insertImg(imgurl, id){
  const q = `UPDATE users
  SET imgurl = $1
  WHERE id = $2
  RETURNING imgurl;`
  ;

  const newImgUrl = "/Uploads/" + imgurl;
  const params = [
    newImgUrl,
    id
  ];
  return db.query(q, params).then(function (results) {
    return results.rows[0];
  }).catch(function(err){
    console.log(err);
  });
}
exports.insertImg = insertImg;
