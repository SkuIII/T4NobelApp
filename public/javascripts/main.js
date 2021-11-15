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

    console.log(NominatedInfo);
    console.log(CategoryInfo);
    console.log(StudentInfo);

    // Looping through nominated people by category
    CategoryInfo.forEach(Category => {
        console.log(Category.record.fields.Category);

        NominatedInfo.forEach(Nominated => {
            if (Nominated.record.fields.Category == Category.record.fields.Category)
                console.log(Nominated.record.fields.Nominated);
        });
    });
};