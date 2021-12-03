'use strict';

console.log('Controller.js is alive')

const fetchPhase = fetch(
    '/data/Countdowns'
).then((res) => res.json());

const fetchQRController = fetch(
    '/data/qr'
).then((res) => res.json());

const allDataController = Promise.all([fetchPhase, fetchQRController]);

allDataController.then((res) => phaseLoad(res));

let phase;
let date;
let phaseText;
let infoText;
let infoText2;

const phaseLoad = (res) => {
    phase = res[0].Phase;
    date = res[0].Date;
    phaseText = res[0].Name;

    infoText = res[1][0].record.fields.infoText;
    infoText2 = res[1][1].record.fields.infoText;

    console.log(phase);

    countdownFunc(date, phaseText);
    ControllerFunc();
}

const loginLeader = () => {

    if (phase == 3) {
        document.getElementById('login').hidden = true;
        document.getElementById('progressBarContainer').hidden = true;
        document.getElementById('confirm-btn').hidden = true;

    } else
    if (phase == 2) {
        let ShowMoreText = document.getElementsByClassName('ClickMeCss');
        for (let i = 0; i < ShowMoreText.length; i++) {

            ShowMoreText[i].textContent = 'VISA MER / RÖSTA';
        }
        let VoteBtn = document.getElementsByClassName('voteButton');

        for (let i = 0; i < VoteBtn.length; i++) {
            VoteBtn[i].hidden = false;
        }
        document.getElementById('login').hidden = false;

        console.log('Phase 2 SUCESSFULL');
    } else
    if (phase == 1) {

        document.getElementById('confirm-btn').hidden = true;
        document.getElementById('progressBarContainer').hidden = true;
        document.getElementById('headline').hidden = true;
    }
}

const leaderboardBig = () => {
    if (phase == 3) {

        document.getElementById('progressBarContainer').hidden = true;
        document.getElementById('countRow').className = 'row justify-content-center text-center display-1';
        document.getElementById('headline2').innerHTML = infoText;

    } else
    if (phase == 2) {
        document.getElementById('headline2').textContent = 'Valdeltagande';

    } else
    if (phase == 1) {
        document.getElementById('headline2').innerHTML = infoText2;
    }
}

const ControllerFunc = () => {
    const pugUrl = document.URL.split('/');
    const urlPage = `${pugUrl[0]}//${pugUrl[2]}/${pugUrl[3]}`;

    if (pugUrl[3] == '') {
        console.log('INDEX');
        loginLeader();
    } else if (pugUrl[3] == 'leaderboard') {
        console.log('LEADERBOARD');
        leaderboardBig();
    } else if (pugUrl[3] == 'winner') {
        console.log('WINNER');
    }
}