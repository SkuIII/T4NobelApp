var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'TE4NobelApp' });
});

router.post('/', function(req, res, next) {
    res.render('index');
});

router.get('/anka', function(req, res, next) {
    res.render('workingFolder/loginVote');
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
    // för att komma åt body gör req.body



    // base('Students').update([{
    //         "id": "rec0ahnHAVt5rvAKl",
    //         "fields": {
    //             "VoteStatus": "ToVote",
    //             "VotedFor": "None"
    //         }
    //     },
    //     {
    //         "id": "recGWOvLl0m4Bjy7B",
    //         "fields": {
    //             "VoteStatus": "ToVote",
    //             "VotedFor": "None"
    //         }
    //     }
    // ], function(err, records) {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     records.forEach(function(record) {
    //         console.log(record.get('VoteStatus'));
    //     });
    // });

    console.log(req.body);
    res.send();
});

module.exports = router;