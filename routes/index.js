var express = require('express');
var router = express.Router();
const Airtable = require('airtable');

const base = new Airtable({
    apiKey: 'keyt0M8PAWLcKo6Na'
}).base('app4x1UwZKFrNZnBU');

router.get('/', function(req, res, next) { // Huvudsidan
    res.render('workingFolder/loginLeader', {
        title: 'T4NobelApp'
    });
});

router.get('/leaderboard', function(req, res, next) { // Routen för stora skärmen 
    res.render('workingFolder/leaderboardBig');
});

router.post('/VoteLogin', function(req, res, next) { // Receives user, returns vote status
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

router.get('/Vote', function(req, res, next) { // To test voting system
    res.render('Vote', {
        title: 'T4NobelApp'
    });
});

router.post('/Vote', function(req, res, next) { // Receives the vote and sends it to Airtable
    const response = JSON.stringify(req.body);
    const Votes = JSON.parse(response);

    let NominatedArray = [];
    let NominatedVotesArray = [];
    let CategoryArray = [];
    // let WinnerCategoryArray = [];

    base('Nominated').select().eachPage(function page(records, fetchNextPage) {
        records.forEach(record => {
            Votes.vote.forEach(vote => {
                if (record.fields.Nominated == vote.NominatedVoted) {
                    NominatedArray.push(record.id);
                }
            })
            NominatedVotesArray.push({
                "Nominated": record.fields.Nominated,
                amountVotes: record.fields.AmountVotes
            })
        });
        fetchNextPage();

    }, function done(err) {
        AmountVotesNominated();
        UpdateVote();
        if (err) {
            console.error(err);
            return;
        }
    });

    const AmountVotesNominated = () => {

        NominatedVotesArray.forEach(NominatedVote => {

            Votes.vote.forEach(Vote => {

                if (NominatedVote.Nominated == Vote.NominatedVoted) {
                    NominatedVote.amountVotes++;

                    const UpdateVotesNominated = () => {

                        base('Nominated').select().eachPage(function page(records, fetchNextPage) {
                            records.forEach(record => {

                                if (record.fields.Nominated == NominatedVote.Nominated) {
                                    base('Nominated').update([{
                                        "id": record.id,
                                        "fields": {
                                            "AmountVotes": NominatedVote.amountVotes,
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

                        }, function done(err) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    }
                    UpdateVotesNominated();
                }
            });
        })
    }

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
                                        if (recordVotingInfo.fields.Name == 'AmountStudentsVotedYear' + (recordVotingInfoCounter - 2)) {
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
                CreateCategoryArray();
                if (err) {
                    console.error(err);
                    return;
                }
            });

    }

    CreateCategoryArray = () => {
        base('categories').select().eachPage(function page(records, fetchNextPage) {
            records.forEach(record => {
                CategoryArray.push({ "Category": record.fields.Category })
            });
            fetchNextPage();

        }, function done(err) {
            UpdateWinner();
            if (err) {
                console.error(err);
                return;
            }
        });
    }

    const UpdateWinner = () => {

        CategoryArray.forEach(Category => {
            let WinnerCategoryArray = [];

            base('Nominated').select().eachPage(function page(records, fetchNextPage) {
                records.forEach(record => {

                    if (record.fields.Category == Category.Category) {
                        WinnerCategoryArray.push({ "Nominated": record.fields.Nominated, "Category": record.fields.Category, "AmountVotes": record.fields.AmountVotes })
                    }
                });
                fetchNextPage();

            }, function done(err) {
                WinnerCategoryArray.sort((firstItem, secondItem) => secondItem.AmountVotes - firstItem.AmountVotes);

                UpdateWinnerCategory(WinnerCategoryArray);
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });

        const UpdateWinnerCategory = (WinnerCategoryArray) => {

            base('Categories').select().eachPage(function page(records, fetchNextPage) {
                records.forEach(record => {

                    if (record.fields.Category == WinnerCategoryArray[0].Category) {

                        base('Categories').update([{
                            "id": record.id,
                            "fields": {
                                "Winner": WinnerCategoryArray[0].Nominated,
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

            }, function done(err) {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        }
    }

    res.send();
});

router.get('/admin', function(req, res, next) { // Used for admin controls
    res.render('admin');
});

router.post('/admin', function(req, res, next) { // When button on admin apge is pressed
    // YearsArray will hold which years correspond to which grade
    let YearsArray = [];

    let YearOne;
    let YearTwo;
    let YearThree;

    // AmountStudentsYearX starts at -1 because Airtable has an extra record per year
    let AmountStudentsYear1 = -1;
    let AmountStudentsYear2 = -1;
    let AmountStudentsYear3 = -1;

    // This is to find out which year corresponds to which grade
    // The first three records in Students table are used to find this out
    base('Students').select().eachPage(function page(records, fetchNextPage) {
            records.forEach(record => {
                if (record.fields.Name.includes('1')) {
                    YearsArray.push(
                        record.fields.Class
                    )
                } else
                if (record.fields.Name.includes('2')) {
                    YearsArray.push(
                        record.fields.Class
                    )

                } else
                if (record.fields.Name.includes('3')) {
                    YearsArray.push(
                        record.fields.Class
                    )
                }
            });
            fetchNextPage();
        },
        function done(err) {
            YearsArray.sort();

            // The highest number in the array always corresponds to the first grade, so on
            YearOne = YearsArray[2]
            YearTwo = YearsArray[1]
            YearThree = YearsArray[0]

            updateYear();

            if (err) {
                console.error(err);
                return;
            }
        });

    // updateYear updates Students table to list all students with correct year
    const updateYear = () => {
        base('Students').select().eachPage(function page(records, fetchNextPage) {
                records.forEach(record => {
                    if (record.fields.Class.includes(YearThree)) {
                        AmountStudentsYear3++;
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
                    }
                    if (record.fields.Class.includes(YearTwo)) {
                        AmountStudentsYear2++;
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
                    }
                    if (record.fields.Class.includes(YearOne)) {
                        AmountStudentsYear1++;
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
                    }
                });
                fetchNextPage();

            },
            function done(err) {
                let AmountStudentsArray = [AmountStudentsYear1, AmountStudentsYear2, AmountStudentsYear3];
                WriteYear(AmountStudentsArray);

                if (err) {
                    console.error(err);
                    return;
                }
            });

        // WriteYear updates VotingInfo table with correct amount of students in each year
        const WriteYear = (AmountStudentsArray) => {
            base('VotingInfo').select().eachPage(function page(records, fetchNextPage) {
                    records.forEach((recordVotingInfo, recordVotingInfoCounter) => {
                        if (recordVotingInfo.fields.Name == 'AmountStudentsYear' + (recordVotingInfoCounter + 1)) {
                            base('VotingInfo').update([{
                                "id": recordVotingInfo.id,
                                "fields": {
                                    'Number': AmountStudentsArray[recordVotingInfoCounter]
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