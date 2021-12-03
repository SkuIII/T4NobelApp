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

const fetchFavicon = fetch(
    '/data/Favicon'
).then((res) => res.json());

const fetchQrWinner = fetch(
    '/data/QR'
).then((res) => res.json());

const allData = Promise.all([fetchParticipantsVotingInfo, fetchCategories, fetchNominatedInfo, fetchFavicon, fetchQrWinner]);

allData.then((res) => Load(res));

const Load = (res) => {
    const participantsVotingInfo = res[0];
    const Category = res[1];
    const nominatedInfo = res[2];
    const Favicon = res[3];

    function setFavicons(favImg) {
        let headTitle = document.querySelector('head');

        let favIcons = [  
            // Makes favicons append in mobile browsers                 
            { rel: 'apple-touch-icon' },  
            { rel: 'apple-touch-startup-image' },
            { rel: 'shortcut icon' }
        ]

        favIcons.forEach(function(favIcon) {
            // Creates favicon element
            let setFavicon = document.createElement('link');
            setFavicon.setAttribute('rel', favIcon.rel);
            setFavicon.setAttribute('href', favImg);
            headTitle.appendChild(setFavicon);
        });
    }
    setFavicons(Favicon[0].record.fields.Attachments[0].url);

    const content = document.getElementById('content')

    let h1 = document.createElement('h1');
    h1.textContent = 'Östras Alternativa Nobelprisvinnare';
    h1.className = 'text-center p-3';
    content.appendChild(h1);

    let row = document.createElement('div');
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
                let img = document.createElement('img');
                img.className = ' p-0 rounded-3 img-size img-fluid mx-auto d-block';
                img.src = nominated.record.fields.Picture[0].url;
                divBorder.appendChild(img);

                //Adds the name of each winner
                let h12 = document.createElement('h3');
                h12.innerHTML = winner.record.fields.Winner;
                h12.className = 'text-center pt-0';
                divBorder.appendChild(h12);

                let p = document.createElement('p');
                p.innerHTML = winner.record.fields.WinnerBio;
                p.className = 'text-center pt-0';
                divBorder.appendChild(p);
            }
        });
    });
    let row2 = document.createElement('div');
    row2.className = 'row p-0 mb-4 mx-0 justify-content-center';
    content.appendChild(row2);

    let h3 = document.createElement('h3');
    h3.textContent = res[4][1].record.fields.infoText;
    h3.className = 'text-center p-3';
    row2.appendChild(h3);
};