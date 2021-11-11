'use strict';

console.log('app.js is alive!')

const req = new XMLHttpRequest();
req.open('GET', 'data');
req.responseType = 'json';
req.send();

req.onload = () => {
    const data = req.response;

    console.log(data[0]);

    const img = document.createElement('img');

    // img.src = data[0].record.fields.

};