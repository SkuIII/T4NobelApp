'use strict';

console.log('app.js is alive!')

const req = new XMLHttpRequest();
req.open('GET', 'data');
req.responseType = 'json';
req.send();

req.onload = () => {
    const data = req.response;

    console.log(data);

    const img = document.createElement('img');
    const h1 = document.createElement('h1');

    img.src = data[0].record.fields.Nominerad1Bild[0].url;

    h1.textContent = data[0].record.fields.Nominerad1;

    document.getElementById('main').appendChild(h1);
    document.getElementById('main').appendChild(img);

};