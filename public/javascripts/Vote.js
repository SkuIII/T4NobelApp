// 'use strict';

let vote = [];

console.log('Vote.js is alive!');

// Save the Users vote 
let divVoteClick = (event) => {
    let id = event.target.id;

    console.log(VoteStatus);

    let temp = id.split(',');

    let Category = temp[0];
    let Nominated = temp[1];

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

    // Shows users vote above send button
    vote.forEach(Vote => {

        let h1 = document.createElement('h1');

        if (Vote.CheckVotes == 1) {
            counter++;

            if (counter == CategoryInfo.length) {
                document.getElementById('votedfor').innerHTML = null;

                vote.forEach(element => {
                    let votedFor = document.createElement('h6');
                    votedFor.textContent = 'Du har röstat på ' + element.NominatedVoted + ' i ' + element.CategoryVoted;
                    votedFor.className = 'text-secondary m-0 fw-bold';
                    document.getElementById('votedfor').appendChild(votedFor);
                    document.getElementById('votedfor').appendChild(acceptDiv);

                    let confirmBtn = document.getElementById('confirm-btn');
                    confirmBtn.classList.remove('btn-secondary');
                    confirmBtn.classList.add('btn-success');

                });
                document.getElementById('warning').style.display = "block";
                document.getElementById('warning2').style.display = "block";
            }
        }
    })

    // Maces the vote button for grean for the one that is voted fore
    let btns = document.getElementsByClassName(Category);
    for (let i = 0; i < btns.length; i++) {
        let element = btns[i];
        element.classList.remove('btn-success');
    }
    event.target.classList.add('btn-success');
}

// Funktion for checbox to confirm votes before sending
let acceptingChoice = () => {
    let agree = document.getElementById('agree');

    if (agree.checked) {
        document.getElementById('confirm-btn').className = 'btn btn-success fw-bold btn-lg mb-5 p-3 justify-content-center w-100';
    } else {
        document.getElementById('confirm-btn').className = ' disabled btn btn-success fw-bold btn-lg mb-5 p-3 justify-content-center w-100';
    }
}

// Sends the vote to the server.
let btnConfirmClick = () => {
    let url = document.URL.split('/');
    let urlSend = `${url[0]}//${url[2]}/Vote`;

    console.log('{"email":"' + email + '", "vote":' + JSON.stringify(vote) + '}');

    fetch(urlSend, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc
        headers: {
            'Content-Type': 'application/json'
        },
        body: '{"email":"' + email + '", "vote":' + JSON.stringify(vote) + '}' // body data type must match "Content-Type" header 
    });
    document.getElementById('confirm-btn').className = 'btn btn-primary disabled fw-bold btn-lg mb-5 p-3 justify-content-center w-100';
    document.getElementById('confirm-btn').textContent = 'Tack för din röst';
    setInterval(() => {
        window.scrollTo(0, 0);
        logoutIndication();
    }, 3000);
}

// Alert for if user is not in database
let alertClose = document.createElement('button');
alertClose.className = 'btn-close';
alertClose.type = 'button';
alertClose.setAttribute('data-bs-dismiss', 'alert');

let NotInDataBase = () => {
    let NotInDataBase = document.createElement('div');
    NotInDataBase.textContent = 'Din edu mail finnns inte i systemet, gå till Te4 eller kontakta Carina Envall';
    NotInDataBase.className = 'alert alert-danger alert-dismissible text-center h4 fade show';
    document.getElementById('Header').appendChild(NotInDataBase);
    NotInDataBase.appendChild(alertClose);
}

// Enables all voting buttons if votestatus is corect
let enableBtn = () => {
    let showBtn = document.getElementsByClassName('vote');
    if (VoteStatus == 'ToVote') {
        // let aboutVote = document.createElement('div');
        // aboutVote.textContent = 'Du måste rösta på alla kategorier för att skicka rösten';
        // aboutVote.className = 'alert alert-success alert-dismissible text-center h4 fade show';
        // document.getElementById('Header').appendChild(aboutVote);
        // aboutVote.appendChild(alertClose);
        try {
            // console.log(showBtn);
            for (let i = 0; i < showBtn.length; i++) {
                showBtn[i].classList.add('btn-primary');
                showBtn[i].classList.remove('btn-secondary');
                showBtn[i].classList.remove('disabled');
                showBtn[i].textContent = 'Rösta';
            }
        } catch (error) {
            //console.log(error)
        }
        let confirmBtn = document.getElementById('confirm-btn');
        confirmBtn.textContent = 'Bekräfta röstning';

    } else {
        // let alreadyVoted = document.createElement('div');
        // alreadyVoted.textContent = 'Du har redan röstat!';
        // alreadyVoted.className = 'alert alert-warning alert-dismissible text-center h4 fade show';
        // document.getElementById('Header').appendChild(alreadyVoted);
        // alreadyVoted.appendChild(alertClose);

        if (VoteStatus == 'Voted') {
            document.getElementById('popupText').textContent = 'Du har redan röstat!';
        }
    }
};