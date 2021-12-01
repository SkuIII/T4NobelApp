'use strict';

let vote = [];

console.log('Vote.js is alive!');

const divVoteClick = (event) => {
    const id = event.target.id;

    console.log(VoteStatus)

    let temp = id.split(',');

    const Category = temp[0];
    const Nominated = temp[1];
    console.log(vote);
    vote.forEach((element, elementCounter) => {
        console.log(elementCounter + '--------------------------------------------------');
        if (VoteStatus == 'ToVote' && Category == element.CategoryVoted) {
            element.NominatedVoted = Nominated;
            element.CheckVotes = 1;
            console.log('Du har nu röstat på ' + element.NominatedVoted + ' i ' + element.CategoryVoted)
        }
    });

    let counter = 0;

    vote.forEach(Vote => {

        if (Vote.CheckVotes == 1) {
            counter++

            if (counter == CategoryInfo.length) {
                document.getElementById('votedFor').innerHTML = null;

                vote.forEach(element => {
                    const votedFor = document.createElement('h6');
                    votedFor.textContent = 'Du har röstat på ' + element.NominatedVoted + ' i ' + element.CategoryVoted;
                    votedFor.className = 'text-secondary m-0 fw-bold';
                    document.getElementById('votedFor').appendChild(votedFor);
                    document.getElementById('votedFor').appendChild(acceptDiv);

                });
                document.getElementById('warning').style.display = "block";
                document.getElementById('warning2').style.display = "block";
            }
        }
    })

    let btns = document.getElementsByClassName(Category);
    for (let i = 0; i < btns.length; i++) {
        const element = btns[i];
        element.classList.remove('btn-success');
    }
    event.target.classList.add('btn-success');
}

const acceptingChoice = () => {
    const agree = document.getElementById('agree');

    if (agree.checked) {
        document.getElementById('confirm-btn').className = 'btn btn-success fw-bold btn-lg mb-5 p-3 justify-content-center w-100';
    } else {
        document.getElementById('confirm-btn').className = ' disabled btn btn-success fw-bold btn-lg mb-5 p-3 justify-content-center w-100';
    }
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
    document.getElementById('confirm-btn').className = 'btn btn-primary fw-bold btn-lg mb-5 p-3 justify-content-center w-100';
    document.getElementById('confirm-btn').textContent = 'Tack för din röst';
    setInterval(() => {
        window.scrollTo(0, 0);
        logoutIndication();
    }, 3000);
}

const alertClose = document.createElement('button');
alertClose.className = 'btn-close';
alertClose.type = 'button';
alertClose.setAttribute('data-bs-dismiss', 'alert');


const NotInDataBase = () => {
    const NotInDataBase = document.createElement('div');
    NotInDataBase.textContent = 'Din edu mail finnns inte i systemet, gå till Te4 eller kontakta Carina Envall';
    NotInDataBase.className = 'alert alert-danger alert-dismissible text-center h4 fade show';
    document.getElementById('Header').appendChild(NotInDataBase);
    NotInDataBase.appendChild(alertClose);
}

const enableBtn = () => {
    let showBtn = document.getElementsByClassName('vote');
    if (VoteStatus == 'ToVote') {
        const aboutVote = document.createElement('div');
        aboutVote.textContent = 'Du måste rösta på alla kategorier för att skicka rösten';
        aboutVote.className = 'alert alert-success alert-dismissible text-center h4 fade show';
        document.getElementById('Header').appendChild(aboutVote);
        aboutVote.appendChild(alertClose);
        try {
            console.log(showBtn);
            for (let i = 0; i < showBtn.length; i++) {
                showBtn[i].classList.add('btn-primary');
                showBtn[i].classList.remove('btn-secondary');
                showBtn[i].classList.remove('disabled');
                showBtn[i].textContent = 'Rösta';
            }
        } catch (error) {
            //console.log(error)
        }
    } else {
        const alreadyVoted = document.createElement('div');
        alreadyVoted.textContent = 'Du har redan röstat!';
        alreadyVoted.className = 'alert alert-warning alert-dismissible text-center h4 fade show';
        document.getElementById('Header').appendChild(alreadyVoted);
        alreadyVoted.appendChild(alertClose);
    }
};