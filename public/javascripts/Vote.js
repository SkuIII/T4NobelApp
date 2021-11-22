'use strict';

let vote = [];

console.log('Vote.js is alive!');

const divVoteClick = (event) => {
    const id = event.target.id;

    let temp = id.split(',');

    const Category = temp[0];
    const Nominated = temp[1];

    console.log(vote);

    vote.forEach((element, elementCounter) => {
        console.log(elementCounter + '--------------------------------------------------')
        if (VoteStatus == 'ToVote' && Category == element.CategoryVoted) {
            element.NominatedVoted = Nominated;
            element.testing = 1;
            console.log('Du har nu röstat på ' + element.NominatedVoted + ' i ' + element.CategoryVoted)
        }
        if (VoteStatus == 'Voted') {
            console.log('Du har redan röstat i ' + element.CategoryVoted)
        }
    });

    let counter = 0;

    vote.forEach(Vote => {
        if (Vote.testing == 1) {
            counter++
            if (counter == 3) {
                document.getElementById('confirm-btn').disabled = false;
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
    
    do {
        showBtn[0].className = 'btn btn-primary';
    } while (typeof showBtn !== 'undefined' );


};