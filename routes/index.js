var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/loggIn', function(req, res, next) {
    res.render('Login');
});

module.exports = router;