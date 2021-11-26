var express = require('express');
var router = express.Router();
const Airtable = require('airtable');

const base = new Airtable({
    apiKey: 'keyAlLLzNbI6dhsd1'
}).base('app4x1UwZKFrNZnBU');

router.get('/Nominated', (req, res, next) => {
    let recordArray = [];

    base('Nominated').select().eachPage(page = (records, fetchNextPage) => {
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
});

router.get('/Categories', (req, res, next) => {
    let recordArray = [];

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
});

router.get('/Participants', (req, res, next) => {
    let recordArray = [];

    base('Participants').select().eachPage(page = (records, fetchNextPage) => {
        records.forEach((record) => {
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
});

router.get('/ParticipantsVotingInfo', (req, res, next) => {
    let recordArray = [];

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
});

module.exports = router;