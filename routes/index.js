var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'TE4NobelApp' }); 
});

router.post('/', function(req, res, next) {
    res.render('index');
});

<<<<<<< HEAD
router.get('/anka', function(req, res, next) {
    res.render('login');
=======
router.get('/LoggedIn', function(req, res, next) {
    res.render('Login');
});

router.post('/LoggedIn', function(req, res, next) {
    console.log(res);
    res.render('Login');
>>>>>>> 22597141545dd4dcbb5b6ad359ea9f9cd1ebcaa2
});

module.exports = router;