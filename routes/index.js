var express = require('express');
var router = express.Router();
const Airtable = require('airtable');

const base = new Airtable({
    apiKey: 'keyt0M8PAWLcKo6Na'
}).base('app4x1UwZKFrNZnBU');

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'T4NobelApp'
    });
});

router.post('/', function(req, res, next) {
    res.render('index');
});

router.get('/anka', function(req, res, next) {
    res.render('workingFolder/loginVote');
});

router.get('/leaderboard', function(req, res, next) {
    res.render('workingFolder/leaderboardBig');
});

router.get('/test1', function(req, res, next) {
    res.render('workingFolder/sliderTest');
});

router.get('/pelikan', function(req, res, next) {
    res.render('workingFolder/loginLeader');
});

router.post('/VoteLogin', function(req, res, next) { // reseves user   Returns vote status
    let VoteStatus;
    const response = JSON.stringify(req.body);
    const User = JSON.parse(response);

    base('Students').select().eachPage(function page(records, fetchNextPage) {
            records.forEach(record => {
                if (User.email == record.fields.Email) {
                    if (record.fields.VoteStatus == 'ToVote') {
                        VoteStatus = 'ToVote';
                    } else {
                        VoteStatus = 'Voted';
                    }
                }
            });
            fetchNextPage();
        },
        function done(err) {
            res.send(JSON.stringify(VoteStatus));
            if (err) {
                console.error(err);
                return;
            }
        });
});

router.get('/Vote', function(req, res, next) {
    res.render('Vote', {
        title: 'T4NobelApp'
    });
});

router.post('/Vote', function(req, res, next) { // Reseves The vote
    const response = JSON.stringify(req.body);
    const Votes = JSON.parse(response);

    let NominatedArray = [];

    base('Nominated').select().eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            Votes.vote.forEach(element => {
                if (record.fields.Nominated == element.NominatedVoted) {
                    NominatedArray.push(record.id);
                }
            })
        });
        fetchNextPage();

    }, function done(err) {

        UpdateVote();
        if (err) {
            console.error(err);
            return;
        }
    });


    const UpdateVote = () => {
        base('Students').select().eachPage(function page(records, fetchNextPage) {
                records.forEach(record => {
                    Votes.vote.forEach(element => {
                        if (record.fields.Email == Votes.email) {
                            base('Students').update([{
                                "id": record.id,
                                "fields": {
                                    "VoteStatus": "Voted",
                                    "VotedFor": NominatedArray
                                }
                            }], function(err, records) {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                            });
                            base('votinginfo').select().eachPage(function page(records, fetchNextPage) {
                                    records.forEach((recordVotingInfo, recordVotingInfoCounter) => {
                                        if (recordVotingInfo.fields.Name == 'CounterVotedYear' + (recordVotingInfoCounter - 2)) {
                                            let CounterVoted = recordVotingInfo.fields.Number;
                                            CounterVoted++;
                                            if (record.fields.Year == (recordVotingInfoCounter - 2)) {
                                                base('VotingInfo').update([{
                                                    "id": recordVotingInfo.id,
                                                    "fields": {
                                                        "Number": CounterVoted,
                                                    }
                                                }], function(err, records) {
                                                    if (err) {
                                                        console.error(err);
                                                        return;
                                                    }
                                                });
                                            }
                                        }
                                    });
                                    fetchNextPage();
                                },
                                function done(err) {
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
    }

    res.render('Vote', {
        title: 'T4NobelApp'
    });
});

router.get('/admin', function(req, res, next) {
    res.render('admin');
});

// CounterYearX starts at -1 because airtable has an extra record per year
let CounterYear1 = -1;
let CounterYear2 = -1;
let CounterYear3 = -1;
let CounterVotedYear1 = 0;
let CounterVotedYear2 = 0;
let CounterVotedYear3 = 0;

router.post('/admin', function(req, res, next) {
    let ArrayCounter = [];

    let YearOne;
    let YearTwo;
    let YearThree;

    // CounterYearX starta at -1 because airtable has an extra record per year


    base('Students').select().eachPage(function page(records, fetchNextPage) {
            records.forEach(record => {
                if (record.fields.Name.includes('1')) {
                    ArrayCounter.push(
                        record.fields.Class
                    )
                } else
                if (record.fields.Name.includes('2')) {
                    ArrayCounter.push(
                        record.fields.Class
                    )

                } else
                if (record.fields.Name.includes('3')) {
                    ArrayCounter.push(
                        record.fields.Class
                    )
                }
            });
            fetchNextPage();
        },
        function done(err) {
            ArrayCounter.sort();

            YearOne = ArrayCounter[2]
            YearTwo = ArrayCounter[1]
            YearThree = ArrayCounter[0]

            updateYear();

            if (err) {
                console.error(err);
                return;
            }
        });

    const updateYear = () => {
        base('Students').select().eachPage(function page(records, fetchNextPage) {
                records.forEach(record => {
                    if (record.fields.Class.includes(YearThree)) {
                        CounterYear3++;
                        base('Students').update([{
                            "id": record.id,
                            "fields": {
                                "Year": 3,
                            }
                        }], function(err, records) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                        if (record.fields.VoteStatus == 'Voted') {
                            CounterVotedYear3++;
                        }
                    }
                    if (record.fields.Class.includes(YearTwo)) {
                        CounterYear2++;
                        base('Students').update([{
                            "id": record.id,
                            "fields": {
                                "Year": 2,
                            }
                        }], function(err, records) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                        if (record.fields.VoteStatus == 'Voted') {
                            CounterVotedYear2++;
                        }
                    }
                    if (record.fields.Class.includes(YearOne)) {
                        CounterYear1++;
                        base('Students').update([{
                            "id": record.id,
                            "fields": {
                                "Year": 1,
                            }
                        }], function(err, records) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                        if (record.fields.VoteStatus == 'Voted') {
                            CounterVotedYear1++;
                        }
                    }
                });
                fetchNextPage();

            },
            function done(err) {
                console.log(`Yearone=${CounterYear1} Yeartwo=${CounterYear2} Yearthree=${CounterYear3} YearVotedone=${CounterVotedYear1} YearVotedtwo=${CounterVotedYear2} YearVotedthree=${CounterVotedYear3}`)
                let CounterYears = [CounterYear1, CounterYear2, CounterYear3];
                WriteYear(CounterYears);
                if (err) {
                    console.error(err);
                    return;
                }
            });

        const WriteYear = (CounterYears) => {
            base('votinginfo').select().eachPage(function page(records, fetchNextPage) {
                    records.forEach((recordVotingInfo, recordVotingInfoCounter) => {
                        if (recordVotingInfo.fields.Name == 'CounterYear' + (recordVotingInfoCounter + 1)) {
                            base('VotingInfo').update([{
                                "id": recordVotingInfo.id,
                                "fields": {
                                    'Number': CounterYears[recordVotingInfoCounter]
                                }
                            }], function(err, records) {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                            });
                        }
                    });
                    fetchNextPage();
                },
                function done(err) {
                    res.send('<h1>Alla elever är nu sorterade i korrekt årskurs</h1>');
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
        }
    }
});

module.exports = router;