// TODO
//  Lawe kan inte logga in
//  *** Bara edu mail på klienten, Om inte edu redirect till en speciell sida
//  *** (Om inte en del av skolan ska ändå kunna rösta)
//  *** Räkna röster per årskurs
//  Om man har redan röstat ska man inte kunna rösta igen, titta på null i vote arrayen
//  Tänka på säkerheten

'use strict';

let vote = [];

console.log('VoteTest.js is alive!')

// 3 fetch requests, 3 different endpoints/paths
// Converting to JSON using the json() method
const fetchNominatedInfo = fetch(
    '/data/NominatedInfo'
).then((res) => res.json());

const fetchCategoryInfo = fetch(
    '/data/Categories'
).then((res) => res.json());

// Promise.all() does several fetch requests parallel
const allData = Promise.all([fetchNominatedInfo, fetchCategoryInfo]);

allData.then((res) => Load(res));

const Load = (res) => {
    // All data recieved from each base
    const NominatedInfo = res[0];
    const CategoryInfo = res[1];

    console.log(NominatedInfo);
    console.log(CategoryInfo);

    // Looping through nominated people by category
    CategoryInfo.forEach((Category, counterCategory) => {

        let h2Category = document.createElement('h2')
        let divCategory = document.createElement('div')
        divCategory.id = counterCategory;

        h2Category.textContent = Category.record.fields.Category;

        vote.push({ CategoryVoted: 'Category' + (counterCategory + 1), NominatedVoted: null });

        document.getElementById('mainVote').appendChild(h2Category)
        document.getElementById('mainVote').appendChild(divCategory)

        NominatedInfo.forEach(Nominated => {
            if (Nominated.record.fields.Category == Category.record.fields.Category) {

                const divNominated = document.createElement('div');
                divNominated.id = 'Category' + (counterCategory + 1) + "," + Nominated.record.fields.Nominated;

                divNominated.style.backgroundColor = 'black';
                divNominated.style.height = '400px';
                divNominated.style.width = '400px';
                divNominated.style.border = 'thick solid #0000FF';
                divNominated.addEventListener('click', divVoteClick)
                document.getElementById(counterCategory).appendChild(divNominated)
            }
        });
    });

    const btnConfirm = document.createElement('button');

    btnConfirm.textContent = 'Bekräfta';

    btnConfirm.style.width = "80px"
    btnConfirm.style.height = "80px"

    btnConfirm.addEventListener('click', btnConfirmClick)
    document.getElementById('mainVote').prepend(btnConfirm);
};


const divVoteClick = (event, res) => {
    const id = event.target.id;

    let temp = id.split(',');

    const Category = temp[0];
    const Nominated = temp[1];

    vote.forEach(element => {
        if (element.CategoryVoted == Category) {
            element.NominatedVoted = Nominated;
        }
    })
}

const btnConfirmClick = () => {
    const url = document.URL;

    console.log('{"email":"' + email + '", "vote":' + JSON.stringify(vote) + '}');

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc
        headers: {
            'Content-Type': 'application/json'
        },
        body: '{"email":"' + email + '", "vote":' + JSON.stringify(vote) + '}' // body data type must match "Content-Type" header 
    });
}