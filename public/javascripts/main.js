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
fetch('/data/Categories')
    .then(response => {
        return response.json();
    })
    .then(resCategoriesInfo => {
        const CategoriesInfo = resCategoriesInfo;
        Load(CategoriesInfo);
    });
fetch('/data/Students')
    .then(response => {
        return response.json();
    })
    .then(resStudentsInfo => {
        const StudentsInfo = resStudentsInfo;
        Load(StudentsInfo);
    });

const Load = (NominatedInfo, CategoriesInfo, StudentsInfo) => {
    console.log(NominatedInfo);
    console.log(CategoriesInfo);
    console.log(StudentsInfo);

    const img = document.createElement('img');
    const h1 = document.createElement('h1');

    img.src = NominatedInfo[0].record.fields.Picture[0].url;

    h1.textContent = NominatedInfo[0].record.fields.Nominated;

    document.getElementById('main').appendChild(h1);
    document.getElementById('main').appendChild(img);
};