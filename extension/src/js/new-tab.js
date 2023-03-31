// TODO: Fetch the background image from the server to let user choose the image.
// TODO: Add a way to change the background image and the shortcuts on the ui.
// TODO: Fetched the weather from the server.
// TODO: Create a scroll view without the scrollbar to add news and calendar section.

// Shortcuts
function fetchAndDisplayShortcuts() {
  let username = localStorage.getItem("username");
  let server = localStorage.getItem("server");
  let apikey = localStorage.getItem("apikey");
  $.ajax({
    url: `${server}/shortcuts?username=${username}&apikey=${apikey}`,
    dataType: "json",
    success: (data) => {
      console.log("[Shortcuts] Fetched from the server");
      if (
        localStorage.getItem("shortcuts") !== JSON.stringify(data) &&
        JSON.stringify(data)[0]
      ) {
        localStorage.setItem("shortcuts", JSON.stringify(data));
        displayStorageShortcuts();
        notify("Shortcuts synchronized with the server", "info");
      } else {
        console.log("[Shortcuts] Fetched with the server but nothing changed");
      }
    },
    error: function (error) {
      console.error("There was a problem with the fetch operation:", error);
    },
  });
}
function displayStorageShortcuts() {
  // $(".right-pan").empty();
  JSON.parse(localStorage.getItem("shortcuts")).forEach((section) => {
    toAddSection = "<section>";
    section.forEach((shortcut) => {
      let server = localStorage.getItem("server");
      toAddSection +=
        `<a href="` +
        (shortcut.target === "window"
          ? server + "/mynoise?url=" + encodeURIComponent(shortcut.link)
          : shortcut.target === "_blank"
          ? shortcut.link + `" target="_blank"`
          : shortcut.link) +
        `">` +
        shortcut.image +
        `<p>` +
        shortcut.name +
        `</p>` +
        (shortcut.target === "window"
          ? " <span class='material-symbols-outlined'> new_window </span>"
          : "") +
        `</a>`;
    });
    $(".right-pan").append(toAddSection + "</section>");
  });
  console.log("[Shortcuts] Displayed");
}

// Discord
function fetchAndDisplayDiscord() {
  let username = localStorage.getItem("username");
  let server = localStorage.getItem("server");
  let apikey = localStorage.getItem("apikey");
  $.ajax({
    url: `${server}/discord?username=${username}&apikey=${apikey}`,
    dataType: "json",
    success: (data) => {
      console.log("[Discord] Fetched from the server");
      if (localStorage.getItem("discord") !== JSON.stringify(data)) {
        localStorage.setItem("discord", JSON.stringify(data));
        displayStorageDiscord();
      } else {
        console.log("[Discord] Fetched with the server but nothing changed");
      }
    },
    error: (error) => {
      console.error("There was a problem with the fetch operation:", error);
    },
  });
}

function displayStorageDiscord() {
  $(".discord-card-body").empty();
  JSON.parse(localStorage.getItem("discord")).forEach((member) => {
    let toAddSection = "<section>";
    toAddSection +=
      `<img src="` +
      member["avatar"] +
      `"/><div class="status"><h3>` +
      member["username"] +
      `</h3><div class="` +
      (member["game"] !== null ? "game" : "") +
      `"><div class="` +
      (member["status"] === "online" ? "green-dot" : "yellow-dot") +
      `"></div>` +
      (member["game"] !== null
        ? member["game"]
        : member["status"] === "online"
        ? "Online"
        : "Idle") +
      `</div></div>`;
    $(".discord-card-body").append(toAddSection + "</section>");
  });
  console.log("[Discord] Displayed");
}

// Settings
function resetSettings() {
  $("#server-input").val(localStorage.getItem("server"));
  $("#username-input").val(localStorage.getItem("username"));
  $("#apikey-input").val(localStorage.getItem("apikey"));
}
function saveSettings() {
  localStorage.setItem("username", $("#username-input").val());
  localStorage.setItem("server", $("#server-input").val());
  localStorage.setItem("apikey", $("#apikey-input").val());
  $(".settings-bg").css("display", "none");
  notify("Settings saved", "info");
}

// Clock
const monthArray = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
function updateTime() {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  hours = hours === 0 ? "00" : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  $(".clock").text(`${hours}:${minutes}:${seconds}`);
  $(".date").text(
    `${currentTime.getDate()} ${
      monthArray[currentTime.getMonth()]
    } ${currentTime.getFullYear()}`
  );
}

// Notification
function notify(text, status) {
  // Update in jQuery
  let notificationElement = document.createElement("div");
  notificationElement.className = "notification notification-" + status;
  notificationElement.textContent = text;
  notificationElement.style.animation = "slideinout 5s";
  document.querySelector(".notification-pan").appendChild(notificationElement);
  notificationElement.addEventListener("animationend", () => {
    notificationElement.remove();
  });
}

// On page load
document.addEventListener("DOMContentLoaded", function () {
  // Username
  if (
    !localStorage.getItem(
      "username" ||
        localStorage.getItem("username") === "null" ||
        localStorage.getItem("username") === "undefined"
    )
  ) {
    localStorage.setItem("username", prompt("What's your username?"));
  }

  // Server
  if (
    !localStorage.getItem("server") ||
    localStorage.getItem("server") === "null" ||
    localStorage.getItem("server") === "undefined"
  ) {
    localStorage.setItem("server", prompt("What's your server url?"));
  }

  // Apikey
  if (
    !localStorage.getItem("apikey") ||
    localStorage.getItem("apikey") === "null" ||
    localStorage.getItem("apikey") === "undefined"
  ) {
    localStorage.setItem("apikey", prompt("What's your apikey?"));
  }

  // Shortcuts
  localStorageShortcuts = localStorage.getItem("shortcuts");
  if (!localStorageShortcuts && localStorageShortcuts !== "undefined") {
    console.log(
      "[Shortcuts] Test result: the shortcuts aren't in the localstorage"
    );
    fetchAndDisplayShortcuts();
  } else {
    console.log(
      "[Shortcuts] Test result: the shortcuts are already in the localstorage, they will be refetch in 10sec."
    );
    displayStorageShortcuts();
  }
  setInterval(fetchAndDisplayShortcuts, 10000);

  // Discord
  localStorageDiscord = localStorage.getItem("discord");
  if (!localStorageDiscord || localStorageDiscord === "undefined") {
    console.log(
      "[Discord] Test result: the discord aren't in the localstorage"
    );
    fetchAndDisplayDiscord();
  } else {
    console.log(
      "[Discord] Test result: the discord are already in the localstorage, they will be refetch every 2sec."
    );
    displayStorageDiscord();
  }
  setInterval(fetchAndDisplayDiscord, 5000);

  // Clock
  updateTime();
  setInterval(updateTime, 1000);

  // Settings Button
  $(".settings-open-button").click(function () {
    $(".settings-bg").css("display", "flex");
    resetSettings();
  });
  $(".settings-close-button").click(function () {
    $(".settings-bg").hide();
  });
  $(".settings-reset-button").click(function () {
    resetSettings();
  });
  $(".settings-save-button").click(function () {
    saveSettings();
  });
});
window.addEventListener("scroll", function () {
  console.log(window.scrollY);
});
