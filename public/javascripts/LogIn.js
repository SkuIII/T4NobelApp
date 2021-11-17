'use strict';

console.log('LogIn.js is alive!')

let email;

window.onload = function() {
    google.accounts.id.initialize({
        client_id: "623398996009-sh4vrk42s5ri02ji4g9mokh8maiaroe4.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });
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

    // if (responsePayload.email.includes('edu.huddinge.se')) {
    //     email = responsePayload.email;
    // } else {
    //     // Frontend måste skapa en indikation i detta fall för att informera använadren om felaktig email
    // }

    // const url = document.URL + 'Login';

    // console.log('{"email":"' + email + '"}');

    // fetch(url, {
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: '{"email":"' + email + '"}' // body data type must match "Content-Type" header
    // }).then((test) => console.log(test))
}

function decodeJwtResponse(token) {
    // Decodes JWT

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};