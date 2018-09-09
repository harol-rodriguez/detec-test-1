const { Router } = require('express');
// var mysql      = require('mysql');
// var db = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'db_inv_detec'
// });
// db.connect();

const router = Router();

router.post('/login', (req, res) => {
  if (req.body.username === 'admin@test.com' && req.body.password === 'detec') {
    req.session.authUser = { username: 'Detec Root' };
    return res.json( { username: 'nuxt' } );
  }
  return res.status(401).json({message: 'Credenciales incorrectas'});
  console.log(req.body)
  // db.query('select * from `users` where `email`=?', req.body.username, function(err, rows, fields) {
  //   if (err) throw err;
  //   if(rows.length == 0 ) {
  //     return res.status(401).json({message: 'Credenciales incorrectas'});
  //   } else {
  //     req.session.authUser = { username: 'nuxt' };
  //     console.log(rows)
  //     return res.json( { username: 'nuxt' } );
  //   }
  // });
});

router.post('/logout', (req, res) => {
  delete req.session.authUser;
  return res.json({ ok: true });
});

module.exports = router;
