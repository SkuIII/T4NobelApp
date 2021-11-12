'use strict';

console.log('main.js is alive!')

fetch('/data/NominatedInfo')
    .then(response => {
        return response.json();
    })
    .then(resNominatedInfo => {
        const NominatedInfo = resNominatedInfo;
        Load(NominatedInfo);
    });

const Load = (NominatedInfo) => {
    console.log(NominatedInfo);

    const img = document.createElement('img');
    const h1 = document.createElement('h1');

    img.src = NominatedInfo[0].record.fields.Nominerad1Bild[0].url;

    h1.textContent = NominatedInfo[0].record.fields.Nominerad1;

    document.getElementById('main').appendChild(h1);
    document.getElementById('main').appendChild(img);
};