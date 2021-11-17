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

// const fetchStudentInfo = fetch(
//     '/data/Students'
// ).then((res) => res.json());

// Promise.all() does several fetch requests parallel
const allData = Promise.all([fetchNominatedInfo, fetchCategoryInfo]);

allData.then((res) => Load(res));

const Load = (res) => {
    // All data recieved from each base
    const NominatedInfo = res[0];
    const CategoryInfo = res[1];
    // const StudentInfo = res[2];

    console.log(NominatedInfo);
    // console.log(CategoryInfo);
    // console.log(StudentInfo);

    //JavaScript code to generate HTML for loginVote
    
    // const Rubrik = document.createElement('h1');
    // const längk = document.createElement('p');
    // Rubrik.textContent = 'hejsan';
    // längk.textContent = 'he';
    // Rubrik.appendChild(längk);
    // document.getElementById('anka').appendChild(Rubrik);

    // const pic1 = document.createElement('img');
    // pic1.src = 'https://dl.airtable.com/.attachments/36014f6e2f08fa506ead8fa7b55c02b5/05d16d37/bild_2021-11-12_100959.png';
    // document.getElementById('test').appendChild(pic1);
    

    // Looping through nominated people by category
    CategoryInfo.forEach((Category, counterCategory) => {
        
        console.log(Category.record.fields.Category);

        //Creates headline
        const content = document.getElementById('content');
        var h1 = document.createElement('h1');
        h1.textContent = Category.record.fields.Category;
        h1.className = 'text-center pt-5';
        content.appendChild(h1);
        
        //rows
        var row = document.createElement('div');
        row.className = 'row justify-content-center'
        row.id = Category.record.fields.Category + '.Row';
        content.appendChild(row);
        

        NominatedInfo.forEach(Nominated => {
            if (Nominated.record.fields.Category == Category.record.fields.Category){
                // console.log(Nominated.record.fields.Picture[0].url);

                console.log('Category' + (counterCategory + 1) + "," + Nominated.record.fields.Nominated);

                
                var rowNominated = document.createElement('div');
                rowNominated.className = 'row p-0 border-phat justify-content-center mb-4 mx-0';
                rowNominated.id = 'Category' + (counterCategory + 1) + ',' + Nominated.record.fields.Nominated;
                row.appendChild(rowNominated);

                var img = document.createElement('img');
                img.className = 'col-auto p-0 rounded-3 img-size align-self-center';
                img.src =  Nominated.record.fields.Picture[0].url;
                rowNominated.appendChild(img);

                var info = document.createElement('div');
                info.className = 'col-9 text-center m-0';
                info.id = Nominated.record.fields.Nominated + '.Info';
                rowNominated.appendChild(info);

                var name = document.createElement('h3');
                name.className = 'text-center';
                name.textContent = Nominated.record.fields.Nominated;
                info.appendChild(name);
                
                var bio = document.createElement('p');
                bio.className = "text-start";
                bio.textContent = Nominated.record.fields.Bio;
                info.appendChild(bio);

                //Nominated, bio, name and Url


                // const b = document.createElement('h1');
                // b.textContent = 'HEJ JAG ÄR FETT SEG';
                // document.getElementById('anka').appendChild(b);
            
                // console.log("Hej---------------" + NominatedInfo[0].record.fields.Picture[0].url);
                // console.log("Hej---------------" + NominatedInfo[3].record.fields.Picture[0].url);

                // Image url NominatedInfo[0].record.fields.Picture[0].url

            
            
        }});
        
        var Button = document.createElement('div');
        Button.className = 'col'
        Button.id = Category.record.fields.Category + '.Row';
        content.appendChild(row);
   
    });
};