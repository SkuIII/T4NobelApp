'use strict';

console.log('main.js is alive!')

// 3 fetch requests, 3 different endpoints/paths
// Converting to JSON using the json() method
const fetchNominatedInfo = fetch(
    '/data/NominatedInfo'
).then((res) => res.json());

const fetchCategoryInfo = fetch(
    '/data/Categories'
).then((res) => res.json());

const fetchStudentInfo = fetch(
    '/data/Students'
).then((res) => res.json());

// Promise.all() does several fetch requests parallel
const allData = Promise.all([fetchNominatedInfo, fetchCategoryInfo, fetchStudentInfo]);

allData.then((res) => Load(res));

const Load = (res) => {
    // All data recieved from each base
    const NominatedInfo = res[0];
    const CategoryInfo = res[1];
    const StudentInfo = res[2];

    // console.log(NominatedInfo);
    // console.log(CategoryInfo);
    // console.log(StudentInfo);

    //JavaScript code to generate HTML for loginVote
    const Rubrik = document.createElement('h1');
    const längk = document.createElement('p');
    Rubrik.textContent = 'hejsan';
    längk.textContent = 'he';
    Rubrik.appendChild(längk);
    document.getElementById('anka').appendChild(Rubrik);
    const pic1 = document.getElementById('picture1');
    pic1.src = 'https://dl.airtable.com/.attachments/36014f6e2f08fa506ead8fa7b55c02b5/05d16d37/bild_2021-11-12_100959.png';
    

    // Looping through nominated people by category
    CategoryInfo.forEach((Category, counterCategory) => {
        
        // console.log(Category.record.fields.Category);

        NominatedInfo.forEach(Nominated => {
            if (Nominated.record.fields.Category == Category.record.fields.Category){
                // console.log(Nominated.record.fields.Picture[0].url);

                console.log('Category' + (counterCategory + 1) + "," + Nominated.record.fields.Nominated);
                //Nominated, bio, name and Url


                // const b = document.createElement('h1');
                // b.textContent = 'HEJ JAG ÄR FETT SEG';
                // document.getElementById('anka').appendChild(b);
            
                // console.log("Hej---------------" + NominatedInfo[0].record.fields.Picture[0].url);
                // console.log("Hej---------------" + NominatedInfo[3].record.fields.Picture[0].url);

                // Image url NominatedInfo[0].record.fields.Picture[0].url

            
            
        }});    
   
    });
};