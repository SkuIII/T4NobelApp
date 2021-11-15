'use strict';

console.log('VoteTest.js is alive!')

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
const fetchStudentInfoTest = fetch(
    '/data/StudentsTest'
).then((res) => res.json());

// Promise.all() does several fetch requests parallel
const allData = Promise.all([fetchNominatedInfo, fetchCategoryInfo, fetchStudentInfo, fetchStudentInfoTest]);

allData.then((res) => Load(res));

const Load = (res) => {
    // All data recieved from each base
    const NominatedInfo = res[0];
    const CategoryInfo = res[1];
    const StudentInfo = res[2];
    const StudentInfoTest = res[3];

    console.log(NominatedInfo);
    console.log(CategoryInfo);
    console.log(StudentInfo);
    console.log(StudentInfoTest);

    // Looping through nominated people by category
    CategoryInfo.forEach((Category, x) => {

        let h2Category = document.createElement('h2')
        let divCategory = document.createElement('div')
        divCategory.id = x;

        h2Category.textContent = Category.record.fields.Category;

        document.getElementById('mainVote').appendChild(h2Category)
        document.getElementById('mainVote').appendChild(divCategory)

        NominatedInfo.forEach(Nominated => {
            if (Nominated.record.fields.Category == Category.record.fields.Category) {

                const imgNominated = document.createElement('img')

                imgNominated.src = Nominated.record.fields.Picture[0].url;

                document.getElementById(x).appendChild(imgNominated)

                const btnVote = document.createElement('button');
                btnVote.textContent = "Rösta";
                btnVote.style.width = "80px"
                btnVote.style.height = "80px"
                btnVote.id = Category.record.fields.Category + "," + Nominated.record.fields.Nominated;
                btnVote.className = 'btnVoteClass';

                btnVote.addEventListener('click', btnVoteClick)

                document.getElementById(x).appendChild(btnVote);
            }
        });
    });
};

const btnVoteClick = (event) => {

    const id = event.target.id;
    const className = event.target.className;

    console.log(id + " " + className);
}

const sendVote = () => {
    const url = document.URL;

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: '{"key":"value", "email":"' + email + '"}' // body data type must match "Content-Type" header
    }).then(() => console.log('Received'));
};