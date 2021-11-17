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

router.get('/pelikan', function(req, res, next) {
    res.render('workingFolder/loginLeader');
});

router.get('/LoggedIn', function(req, res, next) {
    res.render('Login');
});

router.post('/LoggedIn', function(req, res, next) {
    res.render('Login');
});

// router.post('/VoteLogin', function(req, res, next) {
//     console.log(req.body);

//     let UserCategories = [];

//     const response = JSON.stringify(req.body);
//     const User = JSON.parse(response);
//     console.log(User);

//     base('students').select().eachPage(function page(records, fetchNextPage) {
//             records.forEach(record => {
//                 if (User.email == record.fields.Email) {
//                     const Category1 = record.fields.Category1;
//                     const Category2 = record.fields.Category2;
//                     const Category3 = record.fields.Category3;

//                     UserCategories = [Category1, Category2, Category3];
//                 }
//             });
//             fetchNextPage();

//         },
//         function done(err) {
//             res.send(UserCategories);
//             console.log(UserCategories);
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//         });
// });

// router.get('/VoteLogin', function(req, res, next) {
//     res.send(UserCategories);
// });

router.get('/Vote', function(req, res, next) {
    res.render('Vote', { title: 'T4NobelApp' });
});

router.post('/Vote', function(req, res, next) {

    console.log(req.body);

    const response = JSON.stringify(req.body);
    const Votes = JSON.parse(response);

    base('students').select().eachPage(function page(records, fetchNextPage) {
            records.forEach(record => {
                Votes.vote.forEach(element => {
                    if (record.fields.Email == Votes.email) {

                        console.log('------------------' + Votes.email + " " + element.CategoryVoted + " " + element.NominatedVoted + '------------------')

                        base('Students').update([{
                            "id": record.id,
                            "fields": {
                                "VoteStatus": "ToVote",
                                [element.CategoryVoted]: element.NominatedVoted,
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