'use strict';

let vote = [];

console.log('Vote.js is alive!');

const divVoteClick = (event) => {
    const id = event.target.id;
    
    let temp = id.split(',');

    const Category = temp[0];
    const Nominated = temp[1];

    vote.forEach((element, elementCounter) => {
        console.log(elementCounter + '--------------------------------------------------')
        if (element.CategoryVoted == Category && UserVoteData[elementCounter] == 'Empty') {
            element.NominatedVoted = Nominated;
            console.log('Du har nu röstat på ' + element.NominatedVoted + ' i ' + element.CategoryVoted)
        } else
        if (element.CategoryVoted == Category && UserVoteData[elementCounter] != 'Empty') {
            console.log('Du har redan röstat i ' + element.CategoryVoted)
            console.log(UserVoteData[elementCounter])
        }
    })
}

const btnConfirmClick = () => {
    const url = 'https://shrouded-wave-16183.herokuapp.com/Vote';

    console.log('{"email":"' + email + '", "vote":' + JSON.stringify(vote) + '}');

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc
        headers: {
            'Content-Type': 'application/json'
        },
        body: '{"email":"' + email + '", "vote":' + JSON.stringify(vote) + '}' // body data type must match "Content-Type" header 
    });
}
    
const enableBtn = () => {
    let showBtn = document.getElementsByClassName('btn btn-primary disabled');
    console.log(taljoxe);
    do {
        showBtn[0].className = 'btn btn-primary';
    } while (typeof showBtn !== 'undefined' );


};