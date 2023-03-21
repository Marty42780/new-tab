const express = require("express");
const fs = require("fs");

// Get the env variables
const discord_api_url = JSON.parse(
  fs.readFileSync("storage/info.json", "utf8")
)["discord_api_url"];
const weather_api_key = JSON.parse(
  fs.readFileSync("storage/info.json", "utf8")
)["weather_api_key"];

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/mynoise", (req, res) => {
  // TODO: Add the user and apikey parameters to the request
  const url = req.query.url;
  console.log(url);
  res.send(
    `<script>
			window.open("` +
      url +
      `", "_blank", "width=500,height=400");
			window.close();
    </script>
		`
  );
});

app.get("/shortcuts", (req, res) => {
  // TODO: Add the user and apikey parameters to the request
  const userdata = JSON.parse(fs.readFileSync("storage/userdata.json", "utf8"));
  const username = req.query.username;
  const apikey = req.query.apikey;
  if (!userdata[username]) {
    res.status(404).send("User not found");
  } else if (apikey !== userdata[username].apikey) {
    res.status(401).send("Invalid API key");
  } else {
    res.send(userdata[username].shortcuts);
  }
});

// TODO: Add requests to edit shortcuts

app.get("/discord", (req, res) => {
  // TODO: Add the user and apikey parameters to the request
  fetch(discord_api_url)
    .then((response) => response.json())
    .then((data) => res.send(data))
    .catch((error) => console.error(error));
});

// TODO: Add a request to get the members the user wants to see

app.get("/weather", (req, res) => {
  // TODO: Add a cache system to avoid too many requests and minimize the delay
  // TODO: Add the user and apikey parameters to the request
  let currentWeather;
  let forecastWeather;

  const fetchCurrentWeather = fetch(
    "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=fr" +
      "&q=" +
      req.query.city +
      "&appid=" +
      weather_api_key
  )
    .then((response) => response.json())
    .then((data) => {
      currentWeather = {
        weather: data.weather[0].main,
        description: data.weather[0].description,
        temp: data.main.temp,
        subtemp: data.main.feels_like,
        humidity: data.main.humidity,
      };
    })
    .catch((error) => console.error(error));

  const fetchForecastWeather = fetch(
    "https://api.openweathermap.org/data/2.5/forecast/daily?lang=fr&units=metric" +
      "&q=" +
      req.query.city +
      "&appid=" +
      weather_api_key
  )
    .then((response) => response.json())
    .then((data) => {
      forecastWeather = data.list.slice(0, 2).map((item) => ({
        day: new Date(item.dt_txt).toLocaleDateString("en-US", {
          weekday: "long",
        }),
        weather: item.weather[0].main,
        description: item.weather[0].description,
        temp: item.main.temp,
        subtemp: item.main.feels_like,
        humidity: item.main.humidity,
      }));
    })
    .catch((error) => console.error(error));

  Promise.all([fetchCurrentWeather, fetchForecastWeather])
    .then(() => {
      res.json({
        current: currentWeather,
        forecast: forecastWeather,
      });
    })
    .catch((error) => console.error(error));
});

// TODO: Add a request to get the user weather city and return him if the city has been found

app.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});
