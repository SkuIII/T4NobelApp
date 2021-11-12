'use strict';

console.log('Loggin.js is alive!')

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