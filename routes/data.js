var express = require('express');
var router = express.Router();

router.get('/NominatedInfo', function(req, res, next) {
    const Airtable = require('airtable');

    const base = new Airtable({
        apiKey: 'keyt0M8PAWLcKo6Na'
    }).base('app4x1UwZKFrNZnBU');

    let recordArr = [];

    base('nominated').select({}).eachPage(function page(records, fetchNextPage) {


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

    const Airtable = require('airtable');

    const base = new Airtable({
        apiKey: 'keyt0M8PAWLcKo6Na'
    }).base('app4x1UwZKFrNZnBU');

    let recordArr = [];

    base('categories').select({}).eachPage(function page(records, fetchNextPage) {


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

    const Airtable = require('airtable');

    const base = new Airtable({
        apiKey: 'keyt0M8PAWLcKo6Na'
    }).base('app4x1UwZKFrNZnBU');

    let recordArr = [];

    base('students').select({}).eachPage(function page(records, fetchNextPage) {


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
module.exports = router;