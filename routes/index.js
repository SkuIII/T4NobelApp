var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'TE4NobelApp' });
});

router.post('/', function(req, res, next) {
    res.render('index');
});

router.get('/anka', function(req, res, next) { //Added route for wirju
    res.render('workingFolder/loginVote');
});
router.get('/pelikan', function(req, res, next) {
    res.render('workingFolder/loginLeader');
});

router.get('/LoggedIn', function(req, res, next) {
    res.render('Login');
});

router.post('/LoggedIn', function(req, res, next) {
    // console.log(res);
    res.render('Login');
});

router.get('/Vote', function(req, res, next) {
    res.render('Vote', { title: 'TE4NobelApp' });
});

router.post('/Vote', function(req, res, next) {

    console.log(req.body);
    console.log(req.body.key);
    console.log('VotePost is alive!');

    const fs = require('fs');

    fs.writeFile('./data/Students.json', JSON.stringify(req.body), function(err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });

    res.send();
});

module.exports = router;