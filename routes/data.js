var express = require('express');
var router = express.Router();
const Airtable = require('airtable');

const base = new Airtable({
    apiKey: 'keyt0M8PAWLcKo6Na'
}).base('app4x1UwZKFrNZnBU');

router.get('/NominatedInfo', function(req, res, next) {
    let recordArray = [];

    base('nominated').select().eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            recordArray.push({
                "record": record._rawJson
            });
        });
        fetchNextPage();

    }, function done(err) {
        res.send(recordArray);

        if (err) {
            console.error(err);
            return;
        }
    });
});

router.get('/Categories', function(req, res, next) {
    let recordArray = [];

    base('categories').select().eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            recordArray.push({
                "record": record._rawJson
            });
        });
        fetchNextPage();

    }, function done(err) {
        res.send(recordArray);

        if (err) {
            console.error(err);
            return;
        }
    });
});

router.get('/Students', function(req, res, next) {
    let recordArray = [];

    base('Students').select().eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            recordArray.push({
                "record": record._rawJson
            });
        });
        fetchNextPage();

    }, function done(err) {
        res.send(recordArray);

        if (err) {
            console.error(err);
            return;
        }
    });
});

router.get('/VotingInfo', function(req, res, next) {
    let recordArray = [];

    base('VotingInfo').select().eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            recordArray.push({
                "record": record._rawJson
            });
        });
        fetchNextPage();

    }, function done(err) {
        res.send(recordArray);

        if (err) {
            console.error(err);
            return;
        }
    });
});

module.exports = router;