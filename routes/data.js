const express = require('express');
const router = express.Router();
const Airtable = require('airtable');
const enviorment = require('dotenv').config();

// Connection to Airtable (APIKEY hidden with .env)
const base = new Airtable({
    apiKey: process.env.API_KEY
}).base('app4x1UwZKFrNZnBU'); // ID for main base (T4NobelApp) in airtable

router.get('/Nominated', (req, res, next) => {

    if (typeof req.headers.referer != 'undefined') {

        let recordArray = [];

        // Accessing Nominated table in Airtable
        base('Nominated').select().eachPage(page = (records, fetchNextPage) => {
            records.forEach(record => {
                // Pushing record data into recordArray
                recordArray.push({
                    "record": record._rawJson
                });
            });
            fetchNextPage();

        }, done = (err) => {
            // Once all records have been fetched
            res.send(recordArray);

            // If error occurs while fetching
            if (err) {
                console.error(err);
                return;
            }
        });

    } else {
        res.send('<h1>Unathourized Access</h1>')
    }
});

router.get('/Categories', (req, res, next) => {

    if (typeof req.headers.referer != 'undefined') {

        let recordArray = [];

        // Accessing Categories table in Airtable
        base('categories').select().eachPage(page = (records, fetchNextPage) => {
            records.forEach(record => {
                recordArray.push({
                    "record": record._rawJson
                });
            });
            fetchNextPage();

        }, done = (err) => {
            res.send(recordArray);

            if (err) {
                console.error(err);
                return;
            }
        });

    } else {
        res.send('<h1>Unathourized Access</h1>')
    }
});

router.get('/ParticipantsVotingInfo', (req, res, next) => {


    if (typeof req.headers.referer != 'undefined') {

        let recordArray = [];

        // Accessing Categories table in Airtable
        base('ParticipantsVotingInfo').select().eachPage(page = (records, fetchNextPage) => {
            records.forEach(record => {
                recordArray.push({
                    "record": record._rawJson
                });
            });
            fetchNextPage();

        }, done = (err) => {
            res.send(recordArray);

            if (err) {
                console.error(err);
                return;
            }
        });

    } else {
        res.send('<h1>Unathourized Access</h1>')
    }
});

router.get('/QR', (req, res, next) => {

    if (typeof req.headers.referer != 'undefined') {

        let recordArray = [];

        // Accessing Nominated table in Airtable
        base('QRKod').select().eachPage(page = (records, fetchNextPage) => {
            records.forEach(record => {
                // Pushing record data into recordArray
                recordArray.push({
                    "record": record._rawJson
                });
            });
            fetchNextPage();

        }, done = (err) => {
            // Once all records have been fetched
            res.send(recordArray);

            // If error occurs while fetching
            if (err) {
                console.error(err);
                return;
            }
        });
    } else {
        res.send('<h1>Unathourized Access</h1>')
    }
});

router.get('/Favicon', (req, res, next) => {

    if (typeof req.headers.referer != 'undefined') {

        let recordArray = [];

        // Accessing Favicon table in Airtable
        base('Favicon').select().eachPage(page = (records, fetchNextPage) => {
            records.forEach(record => {
                // Pushing record data into recordArray
                recordArray.push({
                    "record": record._rawJson
                });
            });
            fetchNextPage();

        }, done = (err) => {
            // Once all records have been fetched
            res.send(recordArray);

            // If error occurs while fetching
            if (err) {
                console.error(err);
                return;
            }
        });
    } else {
        res.send('<h1>Unathourized Access</h1>')
    }
});


router.get('/Countdowns', (req, res, next) => {

    if (typeof req.headers.referer != 'undefined') {

        const CountdownsArray = [];
        let CurrentPhase;
        const CurrentTime = new Date();

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
                        console.log(error)
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

        const Countdowns = () => {

            if (CountdownsArray[0].Date.getTime() < CurrentTime.getTime()) {
                CurrentPhase = {
                    "Name": "",
                    "Date": "",
                    "Phase": 0
                };
                res.send(CurrentPhase)

            } else if (CountdownsArray[1].Date.getTime() < CurrentTime.getTime()) {

                CurrentPhase = {
                    "Name": CountdownsArray[0].Name,
                    "Date": CountdownsArray[0].Date,
                    "Phase": 1
                };
                res.send(CurrentPhase)

            } else
            if (CountdownsArray[2].Date.getTime() < CurrentTime.getTime()) {

                CurrentPhase = {
                    "Name": CountdownsArray[1].Name,
                    "Date": CountdownsArray[1].Date,
                    "Phase": 2
                };
                res.send(CurrentPhase)

            } else {

                CurrentPhase = {
                    "Name": CountdownsArray[2].Name,
                    "Date": CountdownsArray[2].Date,
                    "Phase": 3
                };
                res.send(CurrentPhase)
            }
        }

        getPhases(Countdowns);

    } else {
        res.send('<h1>Unathourized Access</h1>')
    }
});


module.exports = router;