'use strict';

console.log('main.js is alive!');

let NominatedInfo = [];
let CategoryInfo = [];

// 3 fetch requests, 3 different endpoints/paths
// Converting to JSON using the json() method
const fetchNominatedInfo = fetch(
    '/data/Nominated'
).then((res) => res.json());

const fetchCategoryInfo = fetch(
    '/data/Categories'
).then((res) => res.json());

const fetchFavicon = fetch(
    '/data/Favicon'
).then((res) => res.json());


// Promise.all() does several fetch requests parallel
const allData = Promise.all([fetchNominatedInfo, fetchCategoryInfo, fetchFavicon]);

allData.then((res) => Load(res));

const Load = (res) => {
        // All data recieved from each base
        NominatedInfo = res[0];
        CategoryInfo = res[1];
        const Favicon = res[2];

        // function setFavicons(favImg) {
        //     let headTitle = document.querySelector('head');
        //     let setFavicon = document.createElement('link');
        //     setFavicon.setAttribute('rel', 'shortcut icon');
        //     setFavicon.setAttribute('href', favImg);
        //     headTitle.appendChild(setFavicon);
        // }
        // setFavicons(Favicon[0].record.fields.Attachments[0].url)

        // (function() {
        //     var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        //     link.type = 'image/x-icon';
        //     link.rel = 'shortcut icon';
        //     link.href = Favicon[0].record.fields.Attachments[0].url;
        //     document.getElementsByTagName('head')[0].appendChild(link);
        // })();

        function setFavicons(favImg) {
            let headTitle = document.querySelector('head');

            let favIcons = [
                { rel: 'apple-touch-icon' },
                { rel: 'apple-touch-startup-image' },
                { rel: 'shortcut icon' }
            ]

            favIcons.forEach(function(favIcon) {
                let setFavicon = document.createElement('link');
                setFavicon.setAttribute('rel', favIcon.rel);
                setFavicon.setAttribute('href', favImg);
                headTitle.appendChild(setFavicon);
            });
        }
        setFavicons(Favicon[0].record.fields.Attachments[0].url);

        function setAppleFavicons() {
            let headTitle = document.querySelector('head');

            let appleFavIcons = [
                { sizes: '152x152', href: '../touch-icon-ipad.png' },
                { sizes: '180x180', href: '../touch-icon-iphone-retina.png' },
                { sizes: '167x167', href: '../touch-icon-ipad-retina.png' }
            ]

            appleFavIcons.forEach(function(appleFavIcon) {
                let setAFavicon = document.createElement('link');
                setAFavicon.setAttribute('rel', 'apple-touch-icon');
                setAFavicon.setAttribute('sizes', appleFavIcon.sizes);
                setAFavicon.setAttribute('href', appleFavIcon.href);
                headTitle.appendChild(setAFavicon);
            });
        }
        setAppleFavicons(Favicon[0].record.fields.Attachments[0].url);

        const rowHome = 'row p-0 mb-4 mx-0 justify-content-center'

        CategoryInfo.forEach((Category, counterCategory) => {

            //Creates headline
            const content = document.getElementById('content');

            var h1 = document.createElement('h1');
            h1.textContent = Category.record.fields.Category;
            h1.className = 'text-center pt-5';
            content.appendChild(h1);

            //rows
            var row = document.createElement('div');
            row.className = rowHome;
            row.id = Category.record.fields.Category + '.Row';
            content.appendChild(row);

            NominatedInfo.forEach((Nominated, counterNominated) => {
                if (Nominated.record.fields.Category == Category.record.fields.Category) {

                    // Creates Cols
                    const newCol = document.createElement('div');
                    newCol.className = 'col-sm-3 border-phatHome mx-3 my-2 p-0 text-center';
                    newCol.id = counterCategory + '+' + counterNominated;
                    row.appendChild(newCol);

                    //Adding img of nominee
                    var img = document.createElement('img');
                    img.className = ' p-0 rounded-3 img-size img-fluid mx-auto d-block';
                    img.src = Nominated.record.fields.Picture[1].url;
                    newCol.appendChild(img);

                    //Adding info to the cols
                    var info = document.createElement('div');
                    info.className = 'text-center m-0 p-2';
                    info.id = Nominated.record.fields.Nominated + '.Info';
                    newCol.appendChild(info);

                    //Adding the nominee name
                    var name = document.createElement('h3');
                    name.className = 'text-center';
                    name.textContent = Nominated.record.fields.Nominated;
                    info.appendChild(name);

                    //Adds a click funtion to the show more text
                    const ClickMe = document.createElement('p');
                    ClickMe.className = 'ClickMeCss pointer';
                    ClickMe.textContent = 'VISA MERA / RÖSTA';
                    ClickMe.name = counterCategory + '+' + counterNominated;
                    ClickMe.addEventListener('click', showBio);
                    name.appendChild(ClickMe);

                    //Adding the bio 
                    let bio = document.createElement('p');
                    bio.className = 'text-start';
                    const BioArray = Nominated.record.fields.Bio.split('\n\n');

                    BioArray.forEach(element => {
                        bio.innerHTML += element;

                        info.appendChild(bio);
                        const break1 = document.createElement('br');
                        const break2 = document.createElement('br');
                        bio.appendChild(break1);
                        bio.appendChild(break2);
                    });

                    //The vote btn in the col
                    const btnVote = document.createElement('button');
                    btnVote.textContent = 'Logga in för att rösta';
                    btnVote.className = 'vote btn btn-secondary disabled voteButton ' + Category.record.fields.Category;
                    btnVote.addEventListener('click', divVoteClick);
                    btnVote.id = Category.record.fields.Category + "," + Nominated.record.fields.Nominated;
                    newCol.appendChild(btnVote);
                }
            });
        });

        document.getElementById('confirm-btn').addEventListener('click', btnConfirmClick);

    }
    // Creates a div for checkbox
const acceptDiv = document.createElement('div');
//checkbox text
let acceptingText = document.createElement('p');
acceptingText.textContent = 'Accepterar du dina val?';
acceptDiv.appendChild(acceptingText);
//Checkbox
let acceptChoice = document.createElement('input');
acceptChoice.type = 'checkbox';
acceptChoice.id = 'agree';
acceptChoice.className = 'form-check-input';
acceptChoice.addEventListener('change', acceptingChoice);
acceptingText.appendChild(acceptChoice);

const showBio = (sender) => {
    const ID = sender.target.name;
    const anka = document.getElementById(ID);
    if (anka.className == 'col-sm-3 border-phatHome mx-3 my-2 p-0 text-center') {
        anka.className = 'col-sm-3 border-phatHome-hover mx-3 my-2 p-0 text-center';
        sender.target.textContent = 'VISA MINDRE';
    } else if (anka.className == 'col-sm-3 border-phatHome-hover mx-3 my-2 p-0 text-center') {
        anka.className = 'col-sm-3 border-phatHome mx-3 my-2 p-0 text-center';
        if (phase == 2) {
            sender.target.textContent = 'VISA MERA / RÖSTA';
        } else {
            sender.target.textContent = 'VISA MERA';
        }

    }
}