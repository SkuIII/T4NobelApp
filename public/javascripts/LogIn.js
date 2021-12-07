'use strict';

console.log('LogIn.js is alive!')

// Global variables to store data in
let email;
let VoteStatus;
let Categories;

let vote = [];

// Customize array to store votes
const fetchCategory = fetch(
    '/data/Categories'
).then(res => res.json()).then(Categories => {

    Categories.forEach(element => {

        vote.push({ CategoryVoted: element.record.fields.Category, NominatedVoted: null, CheckVotes: 0 });
    });
});

// The log out function
const logoutIndication = () => {
    location.reload();
}

// Creates the profile picture with log out function
const AddProfileImg = () => {
    const imgProfile = document.createElement('img');

    imgProfile.id = 'profile';
    imgProfile.classList.add('pointer');
    imgProfile.style.borderRadius = '50%';
    imgProfile.style.height = '100px';
    imgProfile.classList.add('p-3');
    imgProfile.setAttribute('type', 'button');
    imgProfile.setAttribute('data-bs-toggle', 'dropdown');
    imgProfile.setAttribute('aria-expanded', 'false');
    document.getElementById('btnloggout').addEventListener('click', logoutIndication);

    document.getElementById('logout').prepend(imgProfile);
    document.getElementById('logout').hidden = true;
}

// Sending client id and a function to Google
window.onload = () => {
    google.accounts.id.initialize({
        client_id: "623398996009-sh4vrk42s5ri02ji4g9mokh8maiaroe4.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
    AddProfileImg();
}

// Handels the response from google
function handleCredentialResponse(response) {

    // Sending the encoded JWT to decodeJwtResponse and storing answer in responsePayload
    const responsePayload = decodeJwtResponse(response.credential);

    // responePayload contains the information from the decoded JWT
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    console.log(document.cookie)

    // Checks if it is an edu mail
    // Exception made for m@herkommer.co.uk for testing purposes
    if (responsePayload.email.includes('@edu.') || responsePayload.email == 'm@herkommer.co.uk') {

        email = responsePayload.email;

        // Sets users profile picture instead of login with Google button
        loginIndication(responsePayload.picture);

        // Send request to the server to se if user have Voted
        const url = document.URL.split('/');
        const urlSend = `${url[0]}//${url[2]}/VoteLogin`;
        fetch(urlSend, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc
            headers: {
                'Content-Type': 'application/json'
            },
            body: '{"email":"' + email + '"}' // Body data type must match "Content-Type" header
        }).then(response => response.json()).then(data => {
            VoteStatus = data;
            if (VoteStatus == 'Empty') { // Gives user an alert if uou are not in the data base
                NotInDataBase();
            } else { // Sends informational popup and enables buttons
                showPopup();
                enableBtn();
            }
        });

    } else { // Alert that user need to use a edu mail
        showPopup();
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

// The funktion that sets the profile picture. 
const loginIndication = (picture) => {
    document.getElementById('login').hidden = true;
    document.getElementById('logout').hidden = false;
    document.getElementById('profile').src = picture;
}