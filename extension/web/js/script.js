document.addEventListener("DOMContentLoaded", function () {
  function updateTime() {
    var monthArray = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    var currentTime = new Date();
    var day = currentTime.getDate();
    var month = currentTime.getMonth();
    var year = currentTime.getFullYear();
    var hours = currentTime.getHours();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    if (hours === 0) {
      hours = 12;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    document.querySelector(".clock").innerText = hours + ":" + minutes + ":" + seconds;
    document.querySelector(".date").innerText = day + " " + monthArray[month] + " " + year;
  }

  updateTime();
  setInterval(updateTime, 1000);
});
