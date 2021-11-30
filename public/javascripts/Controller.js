'use strict';

const fetchPhase = fetch(
    '/data/Countdowns'
).then((res) => res.json());

fetchPhase.then((res) => phaseLoad(res));

let phase;

const phaseLoad = (res) => {
    phase = res.Phase;
    console.log(res.Phase);
    loginLeader();
}

const loginLeader = () => {

    // const loginLeaderData = Promise.all([fetchNominatedInfo, fetchCategoryInfo, fetchParticipantsVotingInfo]);

    // loginLeaderData.then((res) => LoadLoginLeader(res));

    if(phase == 0 || phase == 3){

        console.log('Phase 1 SUCESSFULL');
        // var googleLogin = document.getElementById('login');
        // document.getElementById('login').hidden = true;

    }else if(phase == 2){

        // console.log('Phase 2 SUCESSFULL');
        document.getElementById('login').hidden = false;

    }else if(phase == 1){
        document.getElementById('headline').textContent = 'Rösterna räknas!';
    }

}

// const leaderboardBig = () => {
//     if(phase == 1){
    
//     }else if(phase == 2){
    
//     }else if(phase == 3){
    
//     }
// }

// const winner = () => {
//     if(phase == 1){
    
//     }else if(phase == 2){
    
//     }else if(phase == 3){
    
//     }
// }

// const pugUrl = document.URL.split('/');
// const urlPage = `${pugUrl[0]}//${pugUrl[2]}/${pugUrl[3]}`;

// if(pugUrl[3] == ''){
//     console.log('INDEX');
//     loginLeader();
// } else if (pugUrl[3] == 'leaderboard'){
//     console.log('LEADERBOARD');
//     leaderboardBig();
// } else if (pugUrl[3] == 'winner'){
//     console.log('WINNER');
//     winner();
// }