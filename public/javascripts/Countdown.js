'use strict';

console.log('Countdown.js is alive')

const countdownFunc = (date, nameName) => {
    // Set the date we're counting down to
    let countDownDate = new Date(date).getTime();

    let countContainer = document.createElement('div');
    countContainer.className = 'container-fluid';
    countContainer.id = 'countContainer';
    document.getElementById('countdown').appendChild(countContainer);

    let countRow = document.createElement('div');
    countRow.id = 'countRow';
    countRow.className = 'row justify-content-center text-center';
    document.getElementById('countContainer').appendChild(countRow);

    let countDown = document.createElement('div');
    countDown.id = 'count'
    document.getElementById('countRow').appendChild(countDown);

    // Update the count down every 1 second
    let x = setInterval(function() {
        document.getElementById("count").innerHTML = null;
        document.getElementById("count").innerHTML = nameName + "<br> ";

        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        let CountdownArray = [{
            "Days": Math.floor(distance / (1000 * 60 * 60 * 24)),
            "Hours": Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            "Minutes": Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            "Seconds": Math.floor((distance % (1000 * 60)) / 1000)
        }]

        if (CountdownArray[0].Days != 0) {
            document.getElementById("count").innerHTML += CountdownArray[0].Days + "d ";
        }
        if (CountdownArray[0].Hours != 0) {
            document.getElementById("count").innerHTML += CountdownArray[0].Hours + "t ";
        }
        if (CountdownArray[0].Minutes != 0) {
            document.getElementById("count").innerHTML += CountdownArray[0].Minutes + "m ";
        }
        if (CountdownArray[0].Seconds != 0) {
            document.getElementById("count").innerHTML += CountdownArray[0].Seconds + "s ";
        }

        const pugUrl = document.URL.split('/');

        const urlPage = `${pugUrl[0]}//${pugUrl[2]}/${pugUrl[3]}`;

        if (pugUrl[3] == 'leaderboard') {
            // console.log('Seconds');
            document.getElementById('count').className = 'col-auto display-1 fw-bold';
        } else if (pugUrl[3] == '') {
            document.getElementById('count').className = 'col-auto display-6 fw-bold pt-5';
        }

        if (distance < 0) {
            location.reload();
        }

    }, 1000);
}