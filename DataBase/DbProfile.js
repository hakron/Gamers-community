function getUser(id) {
  const q = `SELECT *
  FROM users
  WHERE id = $1`
  ;
  return db.query(q, [id]).then(function( results) {
    return results.rows[0];
  }).catch(function(err){
    console.log(err);

  });

}

exports.getUser = getUser;
