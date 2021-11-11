var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/data', function(req, res, next) {
    const Airtable = require('airtable');
    // Calling to Airtable module

    const base = new Airtable({
        apiKey: 'keyt0M8PAWLcKo6Na'
    }).base('app4x1UwZKFrNZnBU');

    let recordArr = [];
    // Creating array here to be used later

    base('nobel').select({}).eachPage(function page(records, fetchNextPage) {
        // This function page will get called for each page of records
        // Calls for Desgin projects which is a table inside base() which is an application in Airtable

        records.forEach(function(record) {
            recordArr.push({
                "record": record._rawJson
            });
            // push() adds a new item to the array

        });

        // To fetch the next page of records, call fetchNextPage
        // If there are more records, page will get called again
        // If there are no more records, done will get called

        fetchNextPage();

    }, function done(err) {
        res.send(recordArr);
        // Enabling recordList to be called by XHR in other files

        if (err) {

            console.error(err);
            return;
        }
    });
});

module.exports = router;