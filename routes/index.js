var express = require('express');
var router = express.Router();
const Airtable = require('airtable');

const base = new Airtable({
    apiKey: 'keyt0M8PAWLcKo6Na'
}).base('app4x1UwZKFrNZnBU');

const test = (record) => {
    base('Students').update([{
            "id": 'rec0ahnHAVt5rvAKl',
            "fields": {
                "VoteStatus": "ToVote",
                "VotedFor": 'None'
            }
        },
        {
            "id": 'recGWOvLl0m4Bjy7B',
            "fields": {
                "VoteStatus": "ToVote",
                "VotedFor": "None"
            }
        }
    ], function(err, records) {
        if (err) {
            console.error(err);
            return;
        }
    });
}


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

    // console.log(req.body);
    // console.log(req.body.key);
    // console.log('VotePost is alive!');

    // const fs = require('fs');

    // fs.readFile('./data/Students.json', (err, data) => {
    //     let swan = JSON.parse(data);
    //     // console.log(data);
    //     console.log(swan);

    //     const find = (duck) => {
    //         return duck.name == req.body.email;
    //     }

    //     let id = swan.elev.findIndex(find);

    //     swan.elev[id].vote = req.body.key;

    //     fs.writeFile('./data/Students.json', swan, function(err) {
    //         if (err) throw err;
    //         console.log('File is created successfully.');
    //     });
    // });

    test();

    res.render('Vote', { title: 'TE4NobelApp' });
});

module.exports = router;