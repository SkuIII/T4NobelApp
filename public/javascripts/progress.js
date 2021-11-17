'use strict';

var i = 1;
function progress() {
  if (i == 1) {
    i = 2;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval( frame, 100);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width  + "%";
      }
    }
  }
};