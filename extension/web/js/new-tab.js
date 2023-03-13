document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("username") == null) {
    localStorage.setItem("username", prompt("What's your username?"));
  };
  if (localStorage.getItem("server") == null) {
    localStorage.setItem("server", prompt("What's your server url?"));
  };
  if (localStorage.getItem("apikey") == null) {
    localStorage.setItem("apikey", prompt("What's your apikey?"));
  };
  if (localStorage.getItem("shortcuts") == null) {
    let username = localStorage.getItem("username");
    let apikey = localStorage.getItem("apikey");
    let server = localStorage.getItem("server");

    if (!username || !apikey) {
      console.error("Missing username or apikey in session storage");
    } else {
      fetch(`${server}/shortcuts?username=${username}&apikey=${apikey}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(shortcuts => {
          console.log(shortcuts);
          // faire quelque chose avec les raccourcis
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    };
  };
  const monthArray = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  function updateTime() {
    var currentTime = new Date();
    var day = currentTime.getDate();
    var month = currentTime.getMonth();
    var year = currentTime.getFullYear();
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
