'use strict'
console.log('the big screen site is online'); //testing if the site is online

const fetchNominatedInfo = fetch(
    '/data/Nominated'
).then((res) => res.json());

const fetchqr = fetch(
    '/data/qr'
).then((res) => res.json());


const allData = Promise.all([fetchNominatedInfo, fetchqr]);

allData.then((res) => LoadNominatedInfo(res));

const LoadNominatedInfo = (res) => {
    
    var RefreshAmount = 0; // has to start at 0
    
    const NominatedInfo = res[0];
    const qr = res[1];
    console.log(qr[0].record.fields.Picture[0].url)

    let img = document.createElement('img');
    img.src = qr[0].record.fields.Picture[0].url; //makes every slide with different picture
    document.getElementById('test').appendChild(img);


    NominatedInfo.forEach(Nominee => { //Makes a new slide for every nominee in the airtable
        console.log(Nominee.record.fields.Nominated); //fetch nominees name from airtable
        console.log(Nominee.record.fields.Picture[0].url);
        console.log(Nominee.record.fields.Intro);

        let li = document.createElement('li');
        li.id = Nominee.record.fields.Nominated; //makes every slide with different id. 
        document.getElementById('ol').appendChild(li);

        let img = document.createElement('img');
        img.src = Nominee.record.fields.Picture[0].url; //makes every slide with different picture
        document.getElementById(Nominee.record.fields.Nominated).appendChild(img);

        let h1 = document.createElement('h1');
        h1.className = 'ism-caption ism-caption-0';
        h1.textContent = Nominee.record.fields.Nominated;
        document.getElementById(Nominee.record.fields.Nominated).appendChild(h1);

        RefreshAmount = RefreshAmount + 5; //adds 5 seconds for each slide
    });
    

    const refresh = document.createElement('meta');
    refresh.httpEquiv = 'refresh';
    refresh.content = RefreshAmount;
    console.log(RefreshAmount);
    document.getElementById('refresh').appendChild(refresh);

    const slide = document.createElement('script'); //Makes the javascript to read in after
    slide.src = 'javascripts/ism-2.2.min.js'; //the javascript for html and airtable info is collected       
    document.getElementById('content').appendChild(slide);

};