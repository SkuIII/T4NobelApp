var express = require('express');
var router = express.Router();

router.get('/NominatedInfo', function(req, res, next) {

    // Calling to Airtable module
    const Airtable = require('airtable');

    // CHANGE API KEY AND BASE
    const base = new Airtable({
        apiKey: 'keyt0M8PAWLcKo6Na'
    }).base('app4x1UwZKFrNZnBU');

    // Creating array here to be used later
    let recordArr = [];

    // This function page will get called for each page of records
    // Calls for Desgin projects which is a table inside base() which is an application in Airtable
    base('nominated').select({}).eachPage(function page(records, fetchNextPage) {


        records.forEach(function(record) {
            // push() adds a new item to the array
            recordArr.push({
                "record": record._rawJson
            });
        });

        // To fetch the next page of records, call fetchNextPage
        // If there are more records, page will get called again
        // If there are no more records, done will get called
        fetchNextPage();

    }, function done(err) {
        // Enabling recordList to be called in other files
        res.send(recordArr);

        if (err) {
            console.error(err);
            return;
        }
    });
});
router.get('/Categories', function(req, res, next) {

    // Calling to Airtable module
    const Airtable = require('airtable');

    // CHANGE API KEY AND BASE
    const base = new Airtable({
        apiKey: 'keyt0M8PAWLcKo6Na'
    }).base('app4x1UwZKFrNZnBU');

    // Creating array here to be used later
    let recordArr = [];

    // This function page will get called for each page of records
    // Calls for Desgin projects which is a table inside base() which is an application in Airtable
    base('categories').select({}).eachPage(function page(records, fetchNextPage) {


        records.forEach(function(record) {
            // push() adds a new item to the array
            recordArr.push({
                "record": record._rawJson
            });
        });

        // To fetch the next page of records, call fetchNextPage
        // If there are more records, page will get called again
        // If there are no more records, done will get called
        fetchNextPage();

    }, function done(err) {
        // Enabling recordList to be called in other files
        res.send(recordArr);

        if (err) {
            console.error(err);
            return;
        }
    });
});
router.get('/Students', function(req, res, next) {

    // Calling to Airtable module
    const Airtable = require('airtable');

    // CHANGE API KEY AND BASE
    const base = new Airtable({
        apiKey: 'keyt0M8PAWLcKo6Na'
    }).base('app4x1UwZKFrNZnBU');

    // Creating array here to be used later
    let recordArr = [];

    // This function page will get called for each page of records
    // Calls for Desgin projects which is a table inside base() which is an application in Airtable
    base('students').select({}).eachPage(function page(records, fetchNextPage) {


        records.forEach(function(record) {
            // push() adds a new item to the array
            recordArr.push({
                "record": record._rawJson
            });
        });

        // To fetch the next page of records, call fetchNextPage
        // If there are more records, page will get called again
        // If there are no more records, done will get called
        fetchNextPage();

    }, function done(err) {
        // Enabling recordList to be called in other files
        res.send(recordArr);

        if (err) {
            console.error(err);
            return;
        }
    });
});
module.exports = router;