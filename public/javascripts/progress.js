'use strict';


function progress() {
  if (true) {

    var elem = document.getElementById("myBar");
    var width = 0;

    var id = setInterval( frame, 10);

    elem.style.width = width + "%";
    elem.innerHTML = width  + "%";

    function frame() {
     if (width >= 50) {
    clearInterval(id);
    // i = 0;
    } else {
    width++;
    elem.style.width = width + "%";
    elem.innerHTML = width  + "%";
    }
    console.log('All good with the progress')
    }
  }
};