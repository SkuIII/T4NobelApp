// const fetchNominatedInfo = fetch(
//     '/data/Nominated'
// ).then((res) => res.json());

// const fetchCategoryInfo = fetch(
//     '/data/Categories'
// ).then((res) => res.json());

// const fetchParticipantsVotingInfo = fetch(
//     '/data/ParticipantsVotingInfo'
// ).then((res) => res.json());

// const fetchQr = fetch(
//     '/data/qr'
// ).then((res) => res.json());

// const allData = Promise.all([fetchSkit]); //Fetch

// allData.then((res) => Load(res));

// var phase = 2;

const fetchPhase = fetch(
    '/data/Countdowns'
).then((res) => res.json());

// let phase = 3;

// const data = Promise(fetchPhase);

fetchPhase.then((res) => phaseLoad(res));

let phase = [];

const phaseLoad = (res) => {
    phase = res;
    console.log(res.Phase);
}

// console.log(phase);

const loginLeader = () => {

    // const loginLeaderData = Promise.all([fetchNominatedInfo, fetchCategoryInfo, fetchParticipantsVotingInfo]);

    // loginLeaderData.then((res) => LoadLoginLeader(res));

    if(phase == 0 || phase == 3){

        console.log('Phase 1 SUCESSFULL');
        // var googleLogin = document.getElementById('login');
        document.getElementById('login').hidden = true;

    }else if(phase == 2){

        console.log('Phase 2 SUCESSFULL');

        // var script1 = document.createElement('script');
        // var script2 = document.createElement('script');
        
        // script1.src = 'javascripts/LogIn.js';
        // // script2.src = 'https://accounts.google.com/gsi/client';
        // // script2.async;
        // // script2.defer;
        
        // document.getElementsByTagName('head')[0].appendChild(script1);
        // // document.getElementsByTagName('head')[0].appendChild(script2);

    }else if(phase == 1){
        document.getElementById('login').hidden = true;
        document.getElementById('headline').textContent = 'Rösterna räknas!';
    }

}

const leaderboardBig = () => {
    if(phase == 1){
    
    }else if(phase == 2){
    
    }else if(phase == 3){
    
    }
}

const winner = () => {
    if(phase == 1){
    
    }else if(phase == 2){
    
    }else if(phase == 3){
    
    }
}

const pugUrl = document.URL.split('/');
const urlPage = `${pugUrl[0]}//${pugUrl[2]}/${pugUrl[3]}`;

if(pugUrl[3] == ''){
    console.log('INDEX');
    loginLeader();
} else if (pugUrl[3] == 'leaderboard'){
    console.log('LEADERBOARD');
    leaderboardBig();
} else if (pugUrl[3] == 'winner'){
    console.log('WINNER');
    winner();
}