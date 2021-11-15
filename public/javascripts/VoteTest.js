'use strict';

console.log('VoteTest.js is alive!')

// 3 fetch requests, 3 different endpoints/paths
// Converting to JSON using the json() method
const fetchNominatedInfo = fetch(
    '/vote/NominatedInfo'
).then((res) => res.json());

const fetchCategoryInfo = fetch(
    '/vote/Categories'
).then((res) => res.json());

const fetchStudentInfo = fetch(
    '/vote/Students'
).then((res) => res.json());

// Promise.all() does several fetch requests parallel
const allData = Promise.all([fetchNominatedInfo, fetchCategoryInfo, fetchStudentInfo]);

allData.then((res) => Load(res));

const Load = (res) => {
    // All data recieved from each base
    const NominatedInfo = res[0];
    const CategoryInfo = res[1];
    const StudentInfo = res[2];

    console.log(NominatedInfo);
    console.log(CategoryInfo);
    console.log(StudentInfo);

    // Looping through nominated people by category
    CategoryInfo.forEach((Category, x) => {
        console.log(x);
        console.log(Category.record.fields.Category);
        let h2Category = document.createElement('h2')
        let divCategory = document.createElement('div')
        divCategory.id = x;

        h2Category.textContent = Category.record.fields.Category;

        document.getElementById('mainVote').appendChild(h2Category)
        document.getElementById('mainVote').appendChild(divCategory)

        NominatedInfo.forEach(Nominated => {
            if (Nominated.record.fields.Category == Category.record.fields.Category) {
                console.log(Nominated.record.fields.Picture[0].url);

                const imgNominated = document.createElement('img')

                imgNominated.src = Nominated.record.fields.Picture[0].url;

                document.getElementById(x).appendChild(imgNominated)
            }
        });
    });
};