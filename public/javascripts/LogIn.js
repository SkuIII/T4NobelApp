'use strict';

console.log('LogIn.js is alive!')

let email;
let VoteStatus;
let Categories;

const fetchCategory = fetch(
    '/data/Categories'
).then(res => res.json()).then(Categories => {
    Categories.forEach((element, elementCounter) => {
        vote.push({ CategoryVoted: CategoryInfo[elementCounter].record.fields.Category, NominatedVoted: null, CheckVotes: 0 });
    });
});

const logoutIndication = () => {
    location.reload();
}

const Anka = () => {
    const you = document.createElement('img');
    you.id = 'profile';
    you.classList.add('pointer');
    you.style.borderRadius = '50%';
    you.style.height = '100px';
    you.classList.add('p-3');
    you.setAttribute('type', 'button');
    you.setAttribute('data-bs-toggle', 'dropdown');
    you.setAttribute('aria-expanded', 'false');
    document.getElementById('btnloggout').addEventListener('click', logoutIndication);
    document.getElementById('logout').prepend(you);
    document.getElementById('logout').hidden = true;
}

window.onload = () => {
    google.accounts.id.initialize({
        client_id: "623398996009-sh4vrk42s5ri02ji4g9mokh8maiaroe4.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    Anka();
}

function handleCredentialResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);

    // Sending the encoded JWT to decodeJwtResponse and storing answer in responsePayload
    const responsePayload = decodeJwtResponse(response.credential);
    // responsePayload = verify(response.credential);

    // responePayload contains the information from the decoded JWT
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    console.log(document.cookie)

    // let popup = document.getElementById("myPopup");

    if (responsePayload.email.includes('edu.huddinge.se')) {

        email = responsePayload.email;
        // popup.style.display = "none";
        loginIndication(responsePayload.picture);

        const url = document.URL.split('/');
        const urlSend = `${url[0]}//${url[2]}/VoteLogin`;

        fetch(urlSend, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc
            headers: {
                'Content-Type': 'application/json'
            },
            body: '{"email":"' + email + '"}' // body data type must match "Content-Type" header
        }).then(response => response.json()).then(data => {
            VoteStatus = data;
            if (VoteStatus == 'Empty') {
                NotInDataBase();
            } else {        
                showPopup();
                enableBtn();
            }
        });

    } else {
        const alreadyVoted = document.createElement('div');
        alreadyVoted.textContent = 'Välj din edu mail för att delta i röstningen.';
        alreadyVoted.className = 'alert alert-warning alert-dismissible text-center h4 fade show';
        document.getElementById('Header').appendChild(alreadyVoted);

        const alertClose = document.createElement('button');
        alertClose.className = 'btn-close';
        alertClose.type = 'button';
        alertClose.setAttribute('data-bs-dismiss', 'alert');
        alreadyVoted.appendChild(alertClose);
    }
}

// Decodes JWT
const decodeJwtResponse = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};

const loginIndication = (picture) => {
    document.getElementById('login').hidden = true;
    document.getElementById('logout').hidden = false;
    document.getElementById('profile').src = picture;
}