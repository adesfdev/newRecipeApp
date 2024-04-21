var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const users = [
    { name: 'john', age: 30 },
    { name: 'jane', age: 25 },
    { name: 'jack', age: 32 }
  ]
  res.send(users);
});
module.exports = router;
