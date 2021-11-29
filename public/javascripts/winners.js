'use strict';

const fetchParticipantsVotingInfo = fetch(
    '/data/ParticipantsVotingInfo'
).then((res) => res.json());

const fetchCategories = fetch(
    '/data/Categories'
).then((res) => res.json());

const allData = Promise.all([fetchParticipantsVotingInfo, fetchCategories]);

allData.then((res) => Load(res));

const Load = (res) => {
    const participantsVotingInfo = res[0];
    const Category = res[1];

    Category.forEach(winner => {
        const content = document.getElementById('content')

        var h1 = document.createElement('h1');
        h1.textContent = winner.record.fields.Winner;
        h1.className = 'text-center pt-5';
        content.appendChild(h1);
    
        //rows
        var row = document.createElement('div');
        row.className = 'row p-0 mb-4 mx-0 justify-content-center';
        
        content.appendChild(row);
    
        // Creates Cols
        const newCol = document.createElement('div');
        newCol.className = 'col-sm-3 border-phatHome mx-3 my-2 p-0 text-center';
        row.appendChild(newCol);
    
        //Adding img of nominee
        // var img = document.createElement('img');
        // img.className = ' p-0 rounded-3 img-size img-fluid mx-auto d-block';
        // img.src = Nominated.record.fields.Picture[0].url;
        // newCol.appendChild(img);
    });



};