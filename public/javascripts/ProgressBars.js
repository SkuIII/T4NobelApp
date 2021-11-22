console.log('ProgressBar.js is alive and well!');

//Converting to JSON with json() method
const fetchVotingInfo = fetch(
    '/data/VotingInfo'
).then((res) => res.json());

fetchVotingInfo.then((res) => VotingInfoLoaded(res));

//Creates the progressbars from AirTable data
const VotingInfoLoaded = (res) => {
    // All data recieved from VotingInfo
    const VotingInfo = res;

    //Rounding function for percentage
    function round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
    
    //Arrays for number of students in each years and number of students who had voted in each years
    var maxVotesYears = [VotingInfo[0].record.fields.Number, VotingInfo[1].record.fields.Number, VotingInfo[2].record.fields.Number];
    var voteYears = [VotingInfo[3].record.fields.Number, VotingInfo[4].record.fields.Number, VotingInfo[5].record.fields.Number];
    var progressBarColor = ['', 'bg-danger', 'bg-warning'];
    
    
    //Creates progressbar row, headline (ex. Åk 2), the actual progress in the bar and lastly the percentage shown in the progress
    for (let i = 0; i < 3; i++) {
        var fullPercent = (voteYears[i]/maxVotesYears[i]) * 100;
        var roundedPercentage = round(fullPercent, 1);

        //Creates the progress Row
        var rowProgress = document.createElement('div');
        rowProgress.className = 'row';
        document.getElementById('progressBarContainer').appendChild(rowProgress);

        //Creates the progress bar headline
        var classYear = document.createElement('label');
        classYear.className = 'fw-bold fs-4 p-2 pb-0';
        classYear.textContent = 'Åk ' + (i+1);
        rowProgress.appendChild(classYear);

        //Creates the colummn where the progressbar will reside
        var colProgress = document.createElement('div');
        colProgress.className = 'col-12 p-2 pt-0';
        rowProgress.appendChild(colProgress);

        //Creates the progressbar (the gray area that shows how long the progress is)
        var progress = document.createElement('div');
        progress.className = 'progress';
        progress.style.height = '50px';
        progress.style.width = '100%';
        colProgress.appendChild(progress);

        //Creates the actual progress inside the progressbar and gives it a color depending on the Year
        var progressBar = document.createElement('div');
        progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated fw-bold fs-5 text '  + progressBarColor[i];
        progressBar.style.width = `${roundedPercentage}%`;
        progress.appendChild(progressBar);
        
        //Adds the percent-text inside the progress
        progressBar.innerHTML = roundedPercentage  + '%';
    }

}