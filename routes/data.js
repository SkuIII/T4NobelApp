var express = require('express');
var router = express.Router();
const Airtable = require('airtable');

const base = new Airtable({
    apiKey: 'keyt0M8PAWLcKo6Na'
}).base('app4x1UwZKFrNZnBU');

router.get('/NominatedInfo', function(req, res, next) {
    let recordArr = [];

    base('nominated').select().eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            recordArr.push({
                "record": record._rawJson
            });
        });
        fetchNextPage();

    }, function done(err) {
        res.send(recordArr);

        if (err) {
            console.error(err);
            return;
        }
    });
});

router.get('/Categories', function(req, res, next) {
    let recordArr = [];

    base('categories').select().eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            recordArr.push({
                "record": record._rawJson
            });
        });
        fetchNextPage();

    }, function done(err) {
        res.send(recordArr);

        if (err) {
            console.error(err);
            return;
        }
    });
});

router.get('/Students', function(req, res, next) {
    let recordArr = [];

    base('students').select().eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            recordArr.push({
                "record": record._rawJson
            });
        });
        fetchNextPage();

    }, function done(err) {
        res.send(recordArr);

        if (err) {
            console.error(err);
            return;
        }
    });
});

router.get('/StudentsTest', function(req, res, next) {
    var data = require('../data/Students.json')
    res.send(data)
});

module.exports = router;