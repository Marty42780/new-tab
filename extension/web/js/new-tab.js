// Shortcuts
function fetchAndDisplayShortcuts() {
  let username = localStorage.getItem("username");
  let server = localStorage.getItem("server");
  let apikey = localStorage.getItem("apikey");
  const getShortcuts = async () => {
    try {
      const response = await fetch(`${server}/shortcuts?username=${username}&apikey=${apikey}`);
      console.log("[Shortcuts] Fetched from the server");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  getShortcuts().then(data => {
    if (localStorage.getItem("shortcuts") !== JSON.stringify(data)) {
      localStorage.setItem("shortcuts", JSON.stringify(data));
      displayStorageShortcuts();
      notify("Shortcuts synchronized with the server", "info");
    } else {
      console.log("[Shortcuts] Fetched with the server but nothing changed");
    }
  });
};
function displayStorageShortcuts() {
  let rightpan = document.querySelector('.right-pan');
  rightpan.innerHTML = "";
  JSON.parse(localStorage.getItem("shortcuts")).forEach(section => {
    toAddSection = "<section>";
    section.forEach(shortcut => {
      if (shortcut.target === "window") {
        let server = localStorage.getItem("server");
        toAddSection += `<a class="blur-bg" href="` + server + "/mynoise?url=" + encodeURIComponent(shortcut.link) + `"><img src="` + shortcut.image + `"/><p>` + shortcut.name + `</p><span class="material-symbols-outlined"> new_window </span></a>`;
      } else if (shortcut.target === "_blank") {
        toAddSection += `<a class="blur-bg" href="` + shortcut.link + `" target="_blank"><img src="` + shortcut.image + `"/><p>` + shortcut.name + `</p><span class="material-symbols-outlined"> open_in_new </span></a>`;
      } else {
        toAddSection += `<a class="blur-bg" href="` + shortcut.link + `"><img src="` + shortcut.image + `"/><p>` + shortcut.name + `</p></a>`;
      }
    });
    rightpan.innerHTML += toAddSection + "</section>";
  })
  console.log("[Shortcuts] Displayed");
};

// Discord
function fetchAndDisplayDiscord() {
  let server = localStorage.getItem("server");
  let apikey = localStorage.getItem("apikey");
  const getDiscord = async () => {
    try {
      const response = await fetch(`${server}/discord?apikey=${apikey}`);
      // console.log("[Discord] Fetched from the server");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  getDiscord().then(data => {
    if (localStorage.getItem("discord") !== JSON.stringify(data)) {
      localStorage.setItem("discord", JSON.stringify(data));
      displayStorageDiscord();
      console.log("[Discord] Discord synchronized with the server");
    } else {
      // console.log("[Discord] Fetched with the server but nothing changed");
    }
  });
};
function displayStorageDiscord() {
  let discordpan = document.querySelector('.discord-card-body');
  discordpan.innerHTML = "";
  JSON.parse(localStorage.getItem("discord"))["members"].forEach(member => {
    toAddSection = "<section>";
    if (member["status"] === "online") {
      toAddSection += `<img src="` + member["avatar_url"] + `"/><div class="status"><h3>` + member["username"] + `</h3><div><div class="green-dot"></div>Online</div></div>`;
    } else {
      toAddSection += `<img src="` + member["avatar_url"] + `"/><div class="status"><h3>` + member["username"] + `</h3><div><div class="yellow-dot"></div>Idle</div></div>`;
    }
    discordpan.innerHTML += toAddSection + "</section>";
  })
  console.log("[Discord] Displayed");
};

// Settings
function resetSettings() {
  let username = localStorage.getItem("username");
  let server = localStorage.getItem("server");
  let apikey = localStorage.getItem("apikey");
  document.getElementById("server-input").value = server;
  document.getElementById("username-input").value = username;
  document.getElementById("apikey-input").value = apikey;
};
function saveSettings() {
  let username = document.getElementById("username-input").value;
  let server = document.getElementById("server-input").value;
  let apikey = document.getElementById("apikey-input").value;
  localStorage.setItem("username", username);
  localStorage.setItem("server", server);
  localStorage.setItem("apikey", apikey);
  document.querySelector(".settings-bg").style.display = "none";
  notify("Settings saved", "info");
};

// Clock
const monthArray = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
function updateTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  if (hours === 0) {
    hours = 00;
  };
  if (minutes < 10) {
    minutes = "0" + minutes;
  };
  if (seconds < 10) {
    seconds = "0" + seconds;
  };
  document.querySelector(".clock").innerText = hours + ":" + minutes + ":" + seconds;
  document.querySelector(".date").innerText = currentTime.getDate() + " " + monthArray[currentTime.getMonth()] + " " + currentTime.getFullYear();
};

// Notification
function notify(text, status) {
  let notificationElement = document.createElement('div');
  notificationElement.className = 'notification notification-' + status;
  notificationElement.textContent = text;
  notificationElement.style.animation = 'slideinout 5s';
  document.querySelector('.notification-pan').appendChild(notificationElement);
  notificationElement.addEventListener('animationend', () => {
    notificationElement.remove();
  });
}

// On page load
document.addEventListener("DOMContentLoaded", function () {
  // Username
  if (!localStorage.getItem("username")) {
    localStorage.setItem("username", prompt("What's your username?"));
  };

  // Server
  if (!localStorage.getItem("server")) {
    localStorage.setItem("server", prompt("What's your server url?"));
  };

  // Apikey
  if (!localStorage.getItem("apikey")) {
    localStorage.setItem("apikey", prompt("What's your apikey?"));
  };

  // Shortcuts
  localStorageShortcuts = localStorage.getItem("shortcuts");
  if (!localStorageShortcuts || localStorageShortcuts === "undefined") {
    console.log("[Shortcuts] Test result: the shortcuts aren't in the localstorage");
    fetchAndDisplayShortcuts();
  } else {
    console.log("[Shortcuts] Test result: the shortcuts are already in the localstorage, they will be refetch in 10sec.");
    displayStorageShortcuts();
    setTimeout(fetchAndDisplayShortcuts, 5000);
  };

  // Discord
  localStorageDiscord = localStorage.getItem("discord");
  if (!localStorageDiscord || localStorageDiscord === "undefined") {
    console.log("[Discord] Test result: the discord aren't in the localstorage");
    fetchAndDisplayDiscord();
  } else {
    console.log("[Discord] Test result: the discord are already in the localstorage, they will be refetch every 2sec.");
    displayStorageDiscord();
  };
  setInterval(fetchAndDisplayDiscord, 2000);
  
  // Clock
  updateTime();
  setInterval(updateTime, 1000);

  // Settings Button
  document.querySelector('.settings-open-button').addEventListener('click', () => {
    document.querySelector('.settings-bg').style.display = 'flex';
    resetSettings();
  });
  document.querySelector('.settings-close-button').addEventListener('click', () => {
    document.querySelector('.settings-bg').style.display = 'none';
  });
  document.querySelector('.settings-reset-button').addEventListener('click', () => {
    resetSettings();
  });
  document.querySelector('.settings-save-button').addEventListener('click', () => {
    saveSettings();
  });
});
