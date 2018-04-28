var express = require('express');
var router = express.Router();
const usersCtl = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  usersCtl.getUsers(req, res, next);
  //res.send('get users ');
});

router.post('/',function(req,res,next){
  usersCtl.postUsers(req, res, next);
  //res.send('post users ');
});


router.put('/',function(req,res,next){
  //res.send('put users ');
  usersCtl.putUsers(req, res, next);
});


router.delete('/:id',function(req,res,next){
  //res.send('delete users ');
  usersCtl.deleteUsers(req, res, next);
});
module.exports = router;
