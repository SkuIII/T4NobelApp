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
        if (VoteStatus == 'ToVote' && Category == element.CategoryVoted) {
            element.NominatedVoted = Nominated;
            element.CheckVotes = 1;
            console.log('Du har nu röstat på ' + element.NominatedVoted + ' i ' + element.CategoryVoted)
        }
        if (VoteStatus == 'Voted') {
            console.log('Du har redan röstat i ' + element.CategoryVoted)
        }
    });

    let counter = 0;

    vote.forEach(Vote => {
        if (Vote.CheckVotes == 1) {
            counter++
            if (counter == CategoryInfo.length) {
                document.getElementById('confirm-btn').className = 'btn btn-success fw-bold btn-lg mb-5 p-3 justify-content-center w-100';
            }
        }
    })
}

const btnConfirmClick = () => {
    const url = document.URL.split('/');
    const urlSend = `${url[0]}//${url[2]}/Vote`;

    console.log('{"email":"' + email + '", "vote":' + JSON.stringify(vote) + '}');

    fetch(urlSend, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc
        headers: {
            'Content-Type': 'application/json'
        },
        body: '{"email":"' + email + '", "vote":' + JSON.stringify(vote) + '}' // body data type must match "Content-Type" header 
    });
}
    
const enableBtn = () => {
    let showBtn = document.getElementsByClassName('btn btn-primary disabled');
    try {
        do {
        showBtn[0].className = 'btn btn-primary';
    } while (typeof showBtn !== 'undefined' );

    } catch (error) {
      //  console.log(error)
    }
};