const countdownFunc = (date, nameName) => {
    // Set the date we're counting down to
    let countDownDate = new Date(date).getTime();

    // Update the count down every 1 second
    let x = setInterval(function() {

        // Get today's date and time
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"

        let countContainer = document.createElement('div');
        countContainer.className = 'container-fluid';
        countContainer.id = 'countContainer';
        document.getElementById('countdown').appendChild(countContainer);

        let countRow = document.createElement('div');
        countRow.id = 'countRow';
        countRow.className = 'row justify-content-center';
        document.getElementById('countContainer').appendChild(countRow);

        let countDown = document.createElement('div');
        countDown.id = 'count'
        document.getElementById('countRow').appendChild(countDown);

        document.getElementById("count").innerHTML = nameName + days + "d " + hours + "t " +
            minutes + "m " + seconds + "s ";
        document.getElementById('count').className = 'col-auto h2';
    }, 1000);
}