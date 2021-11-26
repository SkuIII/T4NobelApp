console.log('ProgressBar.js is alive and well!');

//Converting to JSON with json() method
const fetchParticipantsVotingInfo = fetch(
    '/data/ParticipantsVotingInfo'
).then((res) => res.json());

fetchParticipantsVotingInfo.then(res => participantsVotingInfoLoaded(res));

//Creates the progressbars from AirTable data
const participantsVotingInfoLoaded = (res) => {
    // All data recieved from VotingInfo
    const VotingInfo = res;

    console.log(VotingInfo);

    //Rounding function for percentage
    round = (value, decimals) => {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    // //Arrays for number of students in each years and number of students who had voted in each years
    // let maxVotesYears = [];
    let progressBarColor = ['', 'bg-danger', 'bg-warning', 'bg-success', 'bg-info', 'bg-secondary', '', '', '', ''];
    let temp;
    VotingInfo.forEach((vote, counter) => {
        if (counter % 2 == 0){
            temp = counter;
            //Creates a new progress row if the created progressbars number is even(if there is 2 progressbars, create a new row to fit the third)
            let rowName = document.createElement('div');
            rowName.id = 'row' + temp;
            rowName.className = 'row align-items-start';
            document.getElementById('progressBarContainer').appendChild(rowName);
        }

        // const rowTemp = 'row' + isEven;
        // const rowTemp2 = JSON.stringify(rowTemp);
        // console.log(rowTemp)
        // console.log(JSON.stringify(rowTemp))
        // console.log(rowTemp2)
        //Votes vote.record.fields.Voted
        //Max vote.record.fields.Amount
        let fullPercent = (vote.record.fields.Voted / vote.record.fields.Amount) * 100;
        let roundedPercentage = round(fullPercent, 1);

        // //Creates the progress Row
        // let rowName = document.createElement('div');
        // rowName.className = 'row';
        // document.getElementById('progressBarContainer').appendChild(rowName);

        //Creates the colummn where the progressbar will reside
        let colProgress = document.createElement('div');
        colProgress.className = 'col-sm p-2 pt-0';
        document.getElementById('row' + temp).appendChild(colProgress);
        //Creates the progress bar headline
        let classYear = document.createElement('label');
        classYear.className = 'col-12 fw-bold fs-4 p-2 pb-0';
        classYear.textContent = vote.record.fields.Headline;
        colProgress.appendChild(classYear);

        

        //Creates the progressbar (the gray area that shows how long the progress is)
        let progress = document.createElement('div');
        progress.className = 'progress';
        progress.style.height = '50px';
        progress.style.width = '100%';
        colProgress.appendChild(progress);

        //Creates the actual progress inside the progressbar and gives it a color depending on the Year
        let progressBar = document.createElement('div');
        progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated fw-bold fs-5 text ' + progressBarColor[counter];
        progressBar.style.width = `${roundedPercentage}%`;
        progress.appendChild(progressBar);

        //Adds the percent-text inside the progress
        progressBar.innerHTML = roundedPercentage + '%';
        
    });

}