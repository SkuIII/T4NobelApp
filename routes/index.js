var express = require('express');
var router = express.Router();
const Airtable = require('airtable');

const base = new Airtable({
    apiKey: 'keyt0M8PAWLcKo6Na'
}).base('app4x1UwZKFrNZnBU');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'T4NobelApp' });
});

router.post('/', function(req, res, next) {
    res.render('index');
});

router.get('/anka', function(req, res, next) { //Added route for wirju
    res.render('workingFolder/loginVote');
});

router.get('/leaderboard', function(req, res, next) { //Added route for wirju
    res.render('workingFolder/leaderboardBig');
});

router.get('/test1', function(req, res, next) { //Added route for wirju
    res.render('workingFolder/sliderTest');
});

router.get('/pelikan', function(req, res, next) {
    res.render('workingFolder/loginLeader');
});

router.get('/LoggedIn', function(req, res, next) {
    res.render('Login');
});

router.post('/LoggedIn', function(req, res, next) {
    res.render('Login');
});

router.get('/Vote', function(req, res, next) {
    res.render('Vote', { title: 'T4NobelApp' });
});

router.post('/Vote', function(req, res, next) {

    console.log(req.body);

    const response = JSON.stringify(req.body);
    const object = JSON.parse(response);
    const nominated = object.vote[0].Nom;
    console.log(JSON.stringify(nominated));

    base('students').select().eachPage(function page(records, fetchNextPage) {
            records.forEach(record => {
                object.vote.forEach(element => {
                    if (record.fields.Email == object.email) {

                        console.log('------------------' + object.email + " " + element.Cat + " " + element.Nom + '------------------')

                        base('Students').update([{
                            "id": record.id,
                            "fields": {
                                "VoteStatus": "ToVote",
                                [element.Cat]: element.Nom,
                            }
                        }], function(err, records) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    }
                })

            });
            fetchNextPage();

        },
        function done(err) {

            if (err) {
                console.error(err);
                return;
            }
        });

    res.render('Vote', { title: 'T4NobelApp' });
});

module.exports = router;