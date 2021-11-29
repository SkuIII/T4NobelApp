const express = require('express');
const router = express.Router();
const Airtable = require('airtable');
const enviorment = require('dotenv').config();

// Connection to Airtable (APIKEY hidden with .env)
const base = new Airtable({
    apiKey: process.env.API_KEY
}).base('app4x1UwZKFrNZnBU'); // ID for main base (T4NobelApp) in airtable

router.get('/Nominated', (req, res, next) => {
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
});

router.get('/Categories', (req, res, next) => {
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
});

router.get('/ParticipantsVotingInfo', (req, res, next) => {
    let recordArray = [];

    // Accessing ParticipantsVotingInfo table in Airtable
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

router.get('/qr', (req, res, next) => {
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
});


module.exports = router;