var express = require('express');
var router = express.Router();
const Airtable = require('airtable');

const base = new Airtable({
    apiKey: 'keyAlLLzNbI6dhsd1'
}).base('app4x1UwZKFrNZnBU');

router.get('/', (req, res, next) => { // Huvudsidan
    res.render('workingFolder/loginLeader', {
        title: 'T4NobelApp'
    });
});

router.get('/leaderboard', (req, res, next) => { // Routen för stora skärmen 
    res.render('workingFolder/leaderboardBig');
});

router.post('/VoteLogin', (req, res, next) => { // Receives user, returns vote status
    let VoteStatus;
    const response = JSON.stringify(req.body);
    const User = JSON.parse(response);

    base('Participants').select().eachPage(page = (records, fetchNextPage) => {
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
        done = (err) => {
            res.send(JSON.stringify(VoteStatus));
            if (err) {
                console.error(err);
                return;
            }
        });
});

router.get('/Vote', (req, res, next) => { // To test voting system
    res.render('Vote', {
        title: 'T4NobelApp'
    });
});

router.post('/Vote', (req, res, next) => { // Receives the vote and sends it to Airtable
    const response = JSON.stringify(req.body);
    const Votes = JSON.parse(response);

    let NominatedArray = [];
    let NominatedVotesArray = [];
    let CategoryArray = [];
    // let WinnerCategoryArray = [];

    base('Nominated').select().eachPage(page = (records, fetchNextPage) => {
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

    }, done = (err) => {
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

                        base('Nominated').select().eachPage(page = (records, fetchNextPage) => {
                            records.forEach(record => {

                                if (record.fields.Nominated == NominatedVote.Nominated) {
                                    base('Nominated').update([{
                                        "id": record.id,
                                        "fields": {
                                            "AmountVotes": NominatedVote.amountVotes,
                                        }
                                    }], (err, records) => {
                                        if (err) {
                                            console.error(err);
                                            return;
                                        }
                                    });
                                }

                            });
                            fetchNextPage();

                        }, done = (err) => {
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
        base('Participants').select().eachPage(page = (records, fetchNextPage) => {
                records.forEach(record => {
                    Votes.vote.forEach(element => {
                        if (record.fields.Email == Votes.email) {
                            base('Participants').update([{
                                "id": record.id,
                                "fields": {
                                    "VoteStatus": "Voted",
                                    "VotedFor": NominatedArray
                                }
                            }], (err, records) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                            });
                            base('ParticipantsVotingInfo').select().eachPage(page = (records, fetchNextPage) => {
                                    records.forEach((recordVotingInfo, recordVotingInfoCounter) => {

                                        if (recordVotingInfo.fields.Name.includes(record.fields.Year)) {

                                            let CounterVoted = recordVotingInfo.fields.Voted;
                                            CounterVoted++;

                                            base('ParticipantsVotingInfo').update([{
                                                "id": recordVotingInfo.id,
                                                "fields": {
                                                    "Voted": CounterVoted,
                                                }
                                            }], (err, records) => {
                                                if (err) {
                                                    console.error(err);
                                                    return;
                                                }
                                            });

                                        }
                                    });
                                    fetchNextPage();
                                },
                                done = (err) => {
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
            done = (err) => {
                CreateCategoryArray();
                if (err) {
                    console.error(err);
                    return;
                }
            });

    }

    CreateCategoryArray = () => {
        base('categories').select().eachPage(page = (records, fetchNextPage) => {
            records.forEach(record => {
                CategoryArray.push({
                    "Category": record.fields.Category
                })
            });
            fetchNextPage();

        }, done = (err) => {
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

            base('Nominated').select().eachPage(page = (records, fetchNextPage) => {
                records.forEach(record => {

                    if (record.fields.Category == Category.Category) {
                        WinnerCategoryArray.push({
                            "Nominated": record.fields.Nominated,
                            "Category": record.fields.Category,
                            "AmountVotes": record.fields.AmountVotes
                        })
                    }
                });
                fetchNextPage();

            }, done = (err) => {
                WinnerCategoryArray.sort((firstItem, secondItem) => secondItem.AmountVotes - firstItem.AmountVotes);

                UpdateWinnerCategory(WinnerCategoryArray);
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });

        const UpdateWinnerCategory = (WinnerCategoryArray) => {

            base('Categories').select().eachPage(page = (records, fetchNextPage) => {
                records.forEach(record => {

                    if (record.fields.Category == WinnerCategoryArray[0].Category) {

                        base('Categories').update([{
                            "id": record.id,
                            "fields": {
                                "Winner": WinnerCategoryArray[0].Nominated,
                            }
                        }], (err, records) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    }
                });
                fetchNextPage();

            }, done = (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        }
    }

    res.send();
});

router.get('/admin', (req, res, next) => { // Used for admin controls
    res.render('admin');
});

router.post('/admin', (req, res, next) => { // When button on admin page is pressed
    // YearsArray will hold which years correspond to which grade
    let ParticipantArray = [];


    base('Participants').select().eachPage(page = (records, fetchNextPage) => {
        records.forEach(record => {
            ParticipantArray.push({
                "Name": record.fields.Name,
                "Class": record.fields.Class,
                "Year": record.fields.Year,
                "Amount": 0
            })

        });
        fetchNextPage();

    }, done = (err) => {
        console.log(ParticipantArray)
        UpdateYear()

        if (err) {
            console.error(err);
            return;
        }
    });

    let UpdateYear = async() => {
        ParticipantArray.forEach(element => {
            base('Participants').select().eachPage(page = (records, fetchNextPage) => {
                records.forEach(record => {
                    if (record.fields.Class.includes(element.Class)) {
                        element.Amount++;
                        base('Participants').update([{
                            "id": record.id,
                            "fields": {
                                "Year": element.Year,
                            }
                        }], (err, records) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    }
                });
                fetchNextPage();

            }, done = (err) => {
                WriteYear();
                if (err) {
                    console.error(err);
                    return;
                }
            });
        })
    }

    let WriteYear = async() => {
        ParticipantArray.forEach(element => {
            base('ParticipantsVotingInfo').select().eachPage(page = (records, fetchNextPage) => {
                records.forEach(record => {
                    if (record.fields.Name.includes(element.Name)) {
                        base('ParticipantsVotingInfo').update([{
                            "id": record.id,
                            "fields": {
                                "Amount": element.Amount,
                            }
                        }], (err, records) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    }
                });
                fetchNextPage();

            }, done = (err) => {
                console.log(ParticipantArray)
                if (err) {
                    console.error(err);
                    return;
                }
            });
        })
    }
    res.send('<h1>Alla elever är nu sorterade i korrekt årskurs</h1>');

});

module.exports = router;