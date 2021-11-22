'use strict';

console.log('main.js is alive!')
let vote = [];


// 3 fetch requests, 3 different endpoints/paths
// Converting to JSON using the json() method
const fetchNominatedInfo = fetch(
    '/data/NominatedInfo'
).then((res) => res.json());

const fetchCategoryInfo = fetch(
    '/data/Categories'
).then((res) => res.json());

const fetchVotingInfo = fetch(
    '/data/VotingInfo'
).then((res) => res.json());


// const fetchStudentInfo = fetch(
//     '/data/Students'
// ).then((res) => res.json());


// Promise.all() does several fetch requests parallel
const allData = Promise.all([fetchNominatedInfo, fetchCategoryInfo, fetchVotingInfo]);

allData.then((res) => Load(res));

const Load = (res) => {

    
    // All data recieved from each base
    const NominatedInfo = res[0];
    const CategoryInfo = res[1];
    const VotingInfo = res[2];
    // const StudentInfo = res[2];

    //Number of students that have voted
    console.log(VotingInfo);
    console.log(VotingInfo[3].record.fields.Number);
    console.log(VotingInfo[4].record.fields.Number);
    console.log(VotingInfo[5].record.fields.Number);

    //Max student
    console.log(VotingInfo[0].record.fields.Number);
    console.log(VotingInfo[1].record.fields.Number);
    console.log(VotingInfo[2].record.fields.Number);

    const rowDefault = 'row p-0 border-phat justify-content-center mb-4 mx-0 shadow-lg p-4 mb-4 row-hover';
    const rowSelected = 'row p-0 border-phat justify-content-center mb-4 mx-0 shadow-lg p-4 mb-4 row-hover row-selected';
    const rowHome = 'row p-0 justify-content-center mb-4 mx-0 rowCSS'

    //Javascript for votingPage
    const votePage = () => {
        //BS5 classes for th
        
        // Looping through nominated people by category
        CategoryInfo.forEach((Category, counterCategory) => {

        console.log(Category.record.fields.Category);

        //Creates headline
        const content = document.getElementById('content');

        var h1 = document.createElement('h1');
        h1.textContent = Category.record.fields.Category;
        h1.className = 'text-center pt-5';
        content.appendChild(h1);

        //rows
        var row = document.createElement('div');
        row.className = 'row justify-content-center'
        row.id = Category.record.fields.Category + '.Row';
        content.appendChild(row);


        NominatedInfo.forEach(Nominated => {
            if (Nominated.record.fields.Category == Category.record.fields.Category){
                // console.log(Nominated.record.fields.Picture[0].url);

                console.log('Category' + (counterCategory + 1) + "," + Nominated.record.fields.Nominated);

                
                var rowNominated = document.createElement('div');
                rowNominated.className = rowDefault;
                rowNominated.id = 'Category' + (counterCategory + 1) + ',' + Nominated.record.fields.Nominated;
                rowNominated.addEventListener('click', divVoteClick);
                row.appendChild(rowNominated);

                var img = document.createElement('img');
                img.className = 'col-auto p-0 rounded-3 img-size align-self-center';
                img.src =  Nominated.record.fields.Picture[0].url;
                rowNominated.appendChild(img);

                var info = document.createElement('div');
                info.className = 'col-9 text-center m-0';
                info.id = Nominated.record.fields.Nominated + '.Info';
                rowNominated.appendChild(info);

                var name = document.createElement('h3');
                name.className = 'text-center';
                name.textContent = Nominated.record.fields.Nominated;
                info.appendChild(name);
                
                var bio = document.createElement('p');
                bio.className = 'text-start';
                bio.textContent = Nominated.record.fields.Bio;
                info.appendChild(bio);
            }
        });

       

        });
    }
    
    const homePage = () => {

        //Rounding function for percentage
        function round(value, decimals) {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        }
        
        //Arrays for number of students in each years and number of students who had voted in each years
        var maxVotesYears = [VotingInfo[0].record.fields.Number, VotingInfo[1].record.fields.Number, VotingInfo[2].record.fields.Number];
        var voteYears = [VotingInfo[3].record.fields.Number, VotingInfo[4].record.fields.Number, VotingInfo[5].record.fields.Number];
        var progressBarColor = ['', 'bg-danger', 'bg-warning'];
      
        
        //Selected nominee function
        for (let i = 0; i < 3; i++) {
            var fullPercent = (voteYears[i]/maxVotesYears[i]) * 100;
            var roundedPercentage = round(fullPercent, 1);

            var rowProgress = document.createElement('div');
            rowProgress.className = 'row mt-5';
            document.getElementById('progressBarContainer').appendChild(rowProgress);

            var classYear = document.createElement('label');
            classYear.className = 'fw-bold fs-4 p-2 pb-0';
            classYear.textContent = 'Åk ' + (i+1);
            rowProgress.appendChild(classYear);

            var colProgress = document.createElement('div');
            colProgress.className = 'col-12 p-2 pt-0';
            rowProgress.appendChild(colProgress);

            var progress = document.createElement('div');
            progress.className = 'progress';
            progress.style.height = '50px';
            progress.style.width = '100%';
            colProgress.appendChild(progress);

            var progressBar = document.createElement('div');
            progressBar.className = 'progress-bar progress-bar-striped progress-bar-animated fw-bold fs-5 text '  + progressBarColor[i];
            progressBar.style.width = `${roundedPercentage}%`;
            progress.appendChild(progressBar);
            
            progressBar.innerHTML = roundedPercentage  + '%';
            // var barPercent = roundedPercentage  + '%';
            // barPercent.className = 'fw-bold';
            // progressBar.innerHTML = barPercent;
            
            


            
        }

        //HÄR JOHAN
        CategoryInfo.forEach((Category, counterCategory) => {

            console.log(Category.record.fields.Category);
    
            //Creates headline
            const content = document.getElementById('content');
    
            var h1 = document.createElement('h1');
            h1.textContent = Category.record.fields.Category;
            h1.className = 'text-center pt-5';
            content.appendChild(h1);
    
            //rows
            var row = document.createElement('div');
            row.className =  rowHome;
            row.id = Category.record.fields.Category + '.Row';
            content.appendChild(row);
    
    
            NominatedInfo.forEach((Nominated, counterNominated) => {
                if (Nominated.record.fields.Category == Category.record.fields.Category){
                    // console.log(Nominated.record.fields.Picture[0].url);
    
                    console.log('Category' + (counterCategory + 1) + "-" + Nominated.record.fields.Nominated);
    
                    
                    // var rowNominated = document.createElement('div');
                    // rowNominated.className = rowHome;
                    // rowNominated.id = 'Category' + (counterCategory + 1) + ',' + Nominated.record.fields.Nominated;
                    // row.appendChild(rowNominated);

                    var newCol = document.createElement('div');
                    newCol.className = 'col-sm-3 border-phatHome mx-3 p-0';
                    newCol.id = counterCategory + '+' + counterNominated;
                    row.appendChild(newCol);
    
                    var img = document.createElement('img');
                    img.className = ' p-0 rounded-3 img-size img-fluid align-content-self';
                    img.src =  Nominated.record.fields.Picture[0].url;
                    newCol.appendChild(img);
    
                    var info = document.createElement('div');
                    info.className = 'text-center m-0';
                    info.id = Nominated.record.fields.Nominated + '.Info';
                    newCol.appendChild(info);
    
                    var name = document.createElement('h3');
                    name.className = 'text-center';
                    name.textContent = Nominated.record.fields.Nominated;
                    info.appendChild(name);

                    const ClickMe = document.createElement('p');
                    ClickMe.className = 'ClickMeCss'
                    ClickMe.textContent = 'Show more';
                    ClickMe.name = counterCategory + '+' + counterNominated;
                    ClickMe.addEventListener('click', showBio);
                    name.appendChild(ClickMe);
                    
                    var bio = document.createElement('p');
                    bio.className = 'text-start bio-Overflow ';
                    bio.textContent = Nominated.record.fields.Bio;
                    info.appendChild(bio);

                    const btnVote = document.createElement('button');
                    btnVote.textContent = 'Rösta';
                    btnVote.addEventListener('click', divVoteClick);
                    btnVote.id = 'Category' + (counterCategory + 1) + "," + Nominated.record.fields.Nominated
                    newCol.appendChild(btnVote);
                }
            });
        });
        
    };
    if(document.getElementById('headline').textContent == 'Rösta'){
        votePage();
    }else if(document.getElementById('headline').textContent == 'ÖSTRAS ALTERNATIVA NOBEL PRIS'){
        homePage();
    };

    document.getElementById('confirm-btn').addEventListener('click', btnConfirmClick);

}
const showBio = (sender) =>{
    const ID = sender.target.name;
    const anka = document.getElementById(ID);
    if (anka.className == 'col-sm-3 border-phatHome mx-3 p-0') {
        anka.className = 'col-sm-3 border-phatHome-hover mx-3 p-0';
        sender.target.textContent = 'Show less';
    }
    else if(anka.className == 'col-sm-3 border-phatHome-hover mx-3 p-0'){ 
        anka.className = 'col-sm-3 border-phatHome mx-3 p-0';
        sender.target.textContent = 'Show more';
    }

   
}

const divVoteClick = (event) => {
    const id = event.target.id;
    
    let temp = id.split(',');

    const Category = temp[0];
    const Nominated = temp[1];

    vote.forEach((element, elementCounter) => {
        console.log(elementCounter + '--------------------------------------------------')
        if (element.CategoryVoted == Category && UserVoteData[elementCounter] == 'Empty') {
            element.NominatedVoted = Nominated;
            console.log('Du har nu röstat på ' + element.NominatedVoted + ' i ' + element.CategoryVoted)
        } else
        if (element.CategoryVoted == Category && UserVoteData[elementCounter] != 'Empty') {
            console.log('Du har redan röstat i ' + element.CategoryVoted)
            console.log(UserVoteData[elementCounter])
        }
    })
}

const btnConfirmClick = () => {
    const url = 'https://shrouded-wave-16183.herokuapp.com/Vote';

    console.log('{"email":"' + email + '", "vote":' + JSON.stringify(vote) + '}');

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc
        headers: {
            'Content-Type': 'application/json'
        },
        body: '{"email":"' + email + '", "vote":' + JSON.stringify(vote) + '}' // body data type must match "Content-Type" header 
    });
}