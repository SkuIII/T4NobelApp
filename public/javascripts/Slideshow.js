'use strict'

console.log('the big screen site is online'); //testing if the site is online

const fetchNominatedInfo = fetch(
    '/data/NominatedInfo'
).then((res) => res.json());

fetchNominatedInfo.then((res) => LoadNominatedInfo(res));

const LoadNominatedInfo = (res) => {

    // const ol = document.createElement('ol');
    // ol.id = 'ol';
    // document.getElementById('my-slider').appendChild(ol);
    
    const NominatedInfo = res;
    // console.log(NominatedInfo);
    // console.log(NominatedInfo[0].record.fields.Nominated);
    // console.log(NominatedInfo[0].record.fields.Picture[0].url);

    NominatedInfo.forEach(Nominee => {                  //Makes a new slide for every nominee in the airtable
        console.log(Nominee.record.fields.Nominated);       //fetch nominees name from airtable
        console.log(Nominee.record.fields.Picture[0].url);  //fetch nominees picture from airtable

        let li = document.createElement('li');           
        li.id = Nominee.record.fields.Nominated;        //makes every slide with different id. 
        document.getElementById('ol').appendChild(li);

        let img = document.createElement('img');
        img.src = Nominee.record.fields.Picture[0].url;  //makes every slide with different picture
        document.getElementById(Nominee.record.fields.Nominated).appendChild(img);

        let h1 = document.createElement('h1');
        h1.className = 'ism-caption ism-caption-0';
        document.getElementById(Nominee.record.fields.Nominated).appendChild(h1);
        
    });

    const slide = document.createElement('script');         //Makes the javascript to read in after
    slide.src = 'javascripts/ism-2.2.min.js';                //the javascript for html and airtable info is collected       
    document.getElementById('content').appendChild(slide);          
    
}