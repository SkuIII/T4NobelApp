// 'use strict';
let express = require('express');
let router = express.Router();
const Airtable = require('airtable');
const { render } = require('pug');
const enviorment = require('dotenv').config();

// Connection to Airtable (APIKEY hidden with .env)
const base = new Airtable({
    apiKey: process.env.API_KEY
}).base('app4x1UwZKFrNZnBU'); // ID for main base (T4NobelApp) in airtable

// Main Page
router.get('/', (req, res, next) => {

    const CountdownsArray = [];
    const CurrentTime = new Date();

    // gets the pheses form Airtable
    const getPhases = (callback) => {
        base('Countdowns').select().eachPage(page = (records, fetchNextPage) => {
                records.forEach(record => {
                    CountdownsArray.push({
                        "Name": record.fields.Name,
                        "Date": new Date(record.fields.Date),
                    })
                });

                try {
                    fetchNextPage();

                } catch (error) {
                    // console.log(error)
                }
            },
            function done(err) {
                callback();

                if (err) {
                    console.error(err);
                    return;
                }
            });
    }

    // Sends voting site or winner site depending on phase
    const Countdowns = () => {

        if (CountdownsArray[0].Date.getTime() < CurrentTime.getTime()) {
            res.render('workingFolder/winner', {
                title: 'TE4NobelApp'
            });
        } else {
            res.render('workingFolder/loginLeader', {
                title: 'TE4NobelApp'
            });
        }
    }

    getPhases(Countdowns);
});

router.get('/winner', (req, res, next) => {
    res.render('workingFolder/winner', {
        title: 'TE4NobelApp'
    });
});

// Route for showcase page
router.get('/leaderboard', (req, res, next) => {

    const CountdownsArray = [];
    const CurrentTime = new Date();

    // gets the pheses form Airtable
    const getPhases = (callback) => {
        base('Countdowns').select().eachPage(page = (records, fetchNextPage) => {
                records.forEach(record => {
                    CountdownsArray.push({
                        "Name": record.fields.Name,
                        "Date": new Date(record.fields.Date),
                    })
                });

                try {
                    fetchNextPage();

                } catch (error) {
                    // console.log(error)
                }
            },
            function done(err) {
                callback();

                if (err) {
                    console.error(err);
                    return;
                }
            });
    }
    
    // Sends voting site or winner site depending on phase
    const Countdowns = () => {

        if (CountdownsArray[0].Date.getTime() < CurrentTime.getTime()) {
            res.render('workingFolder/winner', {
                title: 'TE4NobelApp'
            });
        } else {
            res.render('workingFolder/leaderboardBig', {
                title: 'TE4NobelApp'
            });
        }
    }

    getPhases(Countdowns);
});

router.post('/VoteLogin', (req, res, next) => { // Receives user, returns vote status
    let VoteStatus = 'Empty';

    // req.body contains the email of the logged in user in JSON format
    const User = req.body;

    // Accessing Participants table in Airtable
    base('Participants').select().eachPage(page = (records, fetchNextPage) => {
            records.forEach(record => {
                if (User.email == record.fields.Email) { // If the users email exists in Airtable
                    if (record.fields.VoteStatus == 'ToVote') { // If the user hasn't voted yet
                        VoteStatus = 'ToVote';
                    } else {
                        VoteStatus = 'Voted';
                    }
                }
            });
            try {
                fetchNextPage();

            } catch (error) {
                console.log(error)
            }
        },
        done = (err) => {
            console.log(VoteStatus);
            res.send(JSON.stringify(VoteStatus));

            if (err) {
                console.error(err);
                return;
            }
        });
});

// Receives the vote and sends it to Airtable
router.post('/Vote', (req, res, next) => {

    // Votes contains email of user and who has been voted for in each category in JSON format
    const Votes = req.body;

    let NominatedArray = [];
    let NominatedVotesArray = [];
    let CategoryArray = [];

    // Accessing Nominated table in Airtable
    base('Nominated').select().eachPage(page = (records, fetchNextPage) => {
        records.forEach(record => {
            // Votes.vote is exclusively who has been voted for
            Votes.vote.forEach(vote => {
                    // If who has been voted for matches a nominated in Nominated
                    if (vote.NominatedVoted == record.fields.Nominated) {
                        // Pushes the id of the nominee's record into NominatedArray 
                        NominatedArray.push(record.id);
                    }
                })
                // Counting amount of votes each nominee has
            NominatedVotesArray.push({
                "Nominated": record.fields.Nominated,
                "AmountVotes": record.fields.AmountVotes
            })
        });
        try {
            fetchNextPage();

        } catch (error) {
            console.log(error)
        }

    }, done = (err) => {
        AmountVotesNominated();
        UpdateVote();

        if (err) {
            console.error(err);
            return;
        }
    });

    // AmountVotesNominated updates the amount of votes each nominee has
    const AmountVotesNominated = () => {

        NominatedVotesArray.forEach(NominatedVote => {

            Votes.vote.forEach(Vote => {

                if (NominatedVote.Nominated == Vote.NominatedVoted) {
                    NominatedVote.AmountVotes++;

                    const UpdateVotesNominated = () => {

                        base('Nominated').select().eachPage(page = (records, fetchNextPage) => {
                            records.forEach(record => {

                                if (record.fields.Nominated == NominatedVote.Nominated) {
                                    base('Nominated').update([{
                                        "id": record.id,
                                        "fields": {
                                            "AmountVotes": NominatedVote.AmountVotes,
                                        }
                                    }], (err, records) => {

                                        if (err) {
                                            console.error(err);
                                            return;
                                        }
                                    });
                                }

                            });
                            try {
                                fetchNextPage();

                            } catch (error) {
                                console.log(error)
                            }

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

    // Updates Airtable base
    const UpdateVote = () => {

        // Accessing Participants table in Airtable
        base('Participants').select().eachPage(page = (records, fetchNextPage) => {
                records.forEach(record => {

                    // If the users email exists in airtable
                    if (record.fields.Email == Votes.email) {

                        // Update VoteStatus and who has been voted for
                        base('Participants').update([{
                            "id": record.id,
                            "fields": {
                                "VoteStatus": "Voted",
                                "VotedFor": NominatedArray,
                                "WhenVoted": new Date().getTime()
                            }

                        }], (err, records) => {

                            if (err) {
                                console.error(err);
                                return;
                            }
                        });

                        // Accessing ParticipantsVotingInfo table in Airtable
                        base('ParticipantsVotingInfo').select().eachPage(page = (records, fetchNextPage) => {
                                records.forEach(recordVotingInfo => {

                                    // If the year the user belongs to is in ParticipantsVotingInfo
                                    if (recordVotingInfo.fields.Name.includes(record.fields.Year)) {

                                        // CounterVoted contains how many has voted in the same year as the user
                                        let CounterVoted = recordVotingInfo.fields.Voted;
                                        CounterVoted++;

                                        // Updates Voted in ParticipantsVotingInfo to account for the new vote
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
                                try {
                                    fetchNextPage();

                                } catch (error) {
                                    console.log(error)
                                }
                            },
                            done = (err) => {

                                if (err) {
                                    console.error(err);
                                    return;
                                }
                            });
                    }
                });
                try {
                    fetchNextPage();

                } catch (error) {
                    console.log(error)
                }
            },
            done = (err) => {
                CreateCategoryArray();

                if (err) {
                    console.error(err);
                    return;
                }
            });

    }

    // CreateCategoryArray creates an array with all the categories in Categories base
    CreateCategoryArray = () => {

        base('Categories').select().eachPage(page = (records, fetchNextPage) => {
            records.forEach(record => {
                // Pushes the name of the category to CategoryArray
                CategoryArray.push({
                    "Category": record.fields.Category
                })
            });
            try {
                fetchNextPage();

            } catch (error) {
                console.log(error)
            }

        }, done = (err) => {
            UpdateWinner();

            if (err) {
                console.error(err);
                return;
            }
        });
    }

    // Updates which nominee has the most votes in each category
    const UpdateWinner = () => {

        CategoryArray.forEach(Category => {
            // WinnerCategoryArray is created inside foreach because it will contain only those nominated for each category
            let WinnerCategoryArray = [];

            // Accessing Nominated table in Airtable
            base('Nominated').select().eachPage(page = (records, fetchNextPage) => {
                records.forEach(record => {

                    // If the category of the nominee matches the category in CategoryArray
                    if (record.fields.Category == Category.Category) {
                        // Pushes nominated name, category for the nominated and amount of votes for the nominated
                        WinnerCategoryArray.push({
                            "Nominated": record.fields.Nominated,
                            "Category": record.fields.Category,
                            "AmountVotes": record.fields.AmountVotes,
                            "Bio": record.fields.Bio
                        })
                    }
                });
                try {
                    fetchNextPage();

                } catch (error) {
                    console.log(error)
                }

            }, done = (err) => {
                // Sorting the array based on amount of votes

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

                    // If the Category of the nominees matches a category in Categories base
                    // Since all of the categories are the same "0" can be used
                    if (record.fields.Category == WinnerCategoryArray[0].Category) {

                        const BioArray = WinnerCategoryArray[0].Bio.split('\n\n');

                        // Updates Categories with thhe name of the nominee with the most votes 
                        base('Categories').update([{
                            "id": record.id,
                            "fields": {
                                "Winner": WinnerCategoryArray[0].Nominated,
                                "WinnerBio": BioArray[2]
                            }

                        }], (err, records) => {

                            if (err) {
                                console.error(err);
                                return;
                            }
                        });
                    }
                });
                try {
                    fetchNextPage();

                } catch (error) {
                    console.log(error)
                }

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
    let ParticipantArray = [];

    const GetParticipants = () => {

        base('ParticipantGroups').select().eachPage(page = (records, fetchNextPage) => {
            records.forEach(record => {

                // Pushes all important info of each particpant group to ParticipantArray
                ParticipantArray.push({
                    "Name": record.fields.Name,
                    "Class": record.fields.Class,
                    "Year": record.fields.Year,
                    "Amount": 0
                })
            });
            try {
                fetchNextPage();

            } catch (error) {
                console.log(error)
            }

        }, done = (err) => {
            UpdateYear(WriteYear)

            res.send('<h1>Alla elever är nu sorterade i korrekt årskurs</h1>');

            if (err) {
                console.error(err);
                return;
            }
        });
    }

    // Updates Year field in Participants table and counts the amount of participants in each Year
    let UpdateYear = (callback) => {

        ParticipantArray.forEach((element, counter) => {

            base('Participants').select().eachPage(page = (records, fetchNextPage) => {
                records.forEach((record, counter2) => {

                    // If the Class field of the record matches Class field from ParticipantArray
                    if (record.fields.Class.includes(element.Class)) {
                        // Amount increases for each participant in that year
                        element.Amount++;

                        // Updates Year field in Participants table
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
                try {
                    fetchNextPage();

                } catch (error) {
                    console.log(error)
                }

            }, done = (err) => {
                callback();

                if (err) {
                    console.error(err);
                    return;
                }
            });
        })

    }

    // Writes in ParticipantsVotingInfo the amount of participants in each year
    let WriteYear = () => {

        ParticipantArray.forEach(element => {

            base('ParticipantsVotingInfo').select().eachPage(page = (records, fetchNextPage) => {
                records.forEach(record => {

                    if (record.fields.Name.includes(element.Name)) {

                        // Updates ParticipantsVotingInfo with the amount of participants in that year
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
                try {
                    fetchNextPage();

                } catch (error) {
                    console.log(error)
                }

            }, done = (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        })
    }

    GetParticipants();
});

module.exports = router;