'use strict';

const fetchParticipantsVotingInfo = fetch(
    '/data/ParticipantsVotingInfo'
).then((res) => res.json());

const fetchCategories = fetch(
    '/data/Categories'
).then((res) => res.json());

const fetchNominatedInfo = fetch(
    '/data/Nominated'
).then((res) => res.json());

const allData = Promise.all([fetchParticipantsVotingInfo, fetchCategories, fetchNominatedInfo]);

allData.then((res) => Load(res));

const Load = (res) => {
    const participantsVotingInfo = res[0];
    const Category = res[1];
    const nominatedInfo = res[2];

    const content = document.getElementById('content')

    var h11 = document.createElement('h1');
    h11.textContent = 'Östras Alternativa Nobelprisvinnare';
    h11.className = 'text-center p-3';
    content.appendChild(h11);

    var row = document.createElement('div');
    row.className = 'row p-0 mb-4 mx-0 justify-content-center';
    content.appendChild(row);

    Category.forEach(winner => {

        nominatedInfo.forEach(nominated => {
            if (winner.record.fields.Winner == nominated.record.fields.Nominated) {

                // Creates Cols for each winner
                const newCol = document.createElement('div');
                newCol.className = 'col-sm-3 mx-3 my-2 p-0 text-center';
                const categoryHeadline = document.createElement('h4');
                categoryHeadline.textContent = winner.record.fields.Category;
                categoryHeadline.className = 'display-5 fw-bold'
                newCol.appendChild(categoryHeadline);
                row.appendChild(newCol);

                const divBorder = document.createElement('div');
                divBorder.className = 'border-phatHome';
                newCol.appendChild(divBorder);

                //Adds image of each winner
                var img = document.createElement('img');
                img.className = ' p-0 rounded-3 img-size img-fluid mx-auto d-block';
                img.src = nominated.record.fields.Picture[0].url;
                divBorder.appendChild(img);

                //Adds the name of each winner
                var h1 = document.createElement('h3');
                h1.innerHTML = winner.record.fields.Winner;
                h1.className = 'text-center pt-0';
                divBorder.appendChild(h1);

                var p = document.createElement('p');
                p.innerHTML = winner.record.fields.WinnerBio;
                p.className = 'text-center pt-0';
                divBorder.appendChild(p);
            }
        });
    });
};