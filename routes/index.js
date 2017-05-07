var express = require('express');
var router = express.Router();
var api = require('../utilities/api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', other: 'Bitch', palabra: 'calvario' });
});

router.get('/saludo', function(req, res, next) {
  api.get('/test', function(data){
    res.render('saludo', { title: 'bitch', uri: 'https://ccafeueb-s.herokuapp.com/test', objeto: JSON.stringify(data) });
  },
  function(er){
    res.render('saludo', { title: 'bitch', uri: 'https://ccafeueb-s.herokuapp.com/test', objeto: JSON.stringify(er) });
  });
});

module.exports = router;
