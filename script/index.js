"use strict";
let mainCity = document.getElementById("mainCity");
let mainDeg = document.getElementById("mainDeg");
let mainTime = document.getElementById("time");
let visibilityValue = document.getElementById("visibilityValue");
let humidityValue = document.getElementById("humidityValue");
let windValue = document.getElementById("windValue");
let pressureValue = document.getElementById("pressureValue");
let mainIcon = document.getElementById("mainIcon");
const weatherApi = {
  key: "6e1d40cc3a896e82cdbc90ce68419cc6",
  baseUrl: `https://api.openweathermap.org/data/2.5/weather`,
};

let cityValue = document.getElementById("searchCity");

cityValue.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    let cityName = cityValue.value;
    weatherInfo(cityName);
  }
});

function weatherInfo(city) {
  fetch(
    `${weatherApi.baseUrl}?&q=${city}&units=metric&lang=ru&appid=${weatherApi.key}`
  )
    .then((response) => {
      return response.json();
    })
    .then((weather) => {
      collectingInformation(weather);
      changeImg(weather);
      console.log(weather);
    })
    .catch(() => {});
}

function collectingInformation(weather) {
  mainCity.textContent = weather.name;
  mainDeg.innerHTML = `${Math.round(weather.main.temp)}${"&deg;"}`;
  visibilityValue.textContent = `${weather.visibility / 1000} km`;
  windValue.textContent = `${weather.wind.speed} m/s`;
  humidityValue.textContent = `${weather.main.humidity}%`;
  pressureValue.textContent = `${weather.main.pressure}`;
  // const date = new Date(weather.dt * 1000);
  // const hours = date.getUTCHours();
  // const minutes = date.getUTCMinutes();

  // mainTime.textContent = `${hours}:${minutes}`;
}

function changeImg(weather) {
  if (weather.weather[0]["main"] === "Clouds") {
    mainIcon.innerHTML = `<img src="./img/cloud.svg" alt="icon-weather" width="170px" height="170px"/>`;
  }
  if (weather.weather[0]["main"] === "Rain") {
    mainIcon.innerHTML = `<img src="./img/rain.svg" alt="icon-weather" width="170px" height="170px"/>`;
  }
  if (weather.weather[0]["main"] === "Snow") {
    mainIcon.innerHTML = `<img src="./img/snow.svg" alt="icon-weather" width="170px" height="170px"/>`;
  }
  if (weather.weather[0]["main"] === "Thunderstorm") {
    mainIcon.innerHTML = `<img src="./img/thunderstorm.svg" alt="icon-weather" width="170px" height="170px"/>`;
  }
  if (weather.weather[0]["main"] === "Clear") {
    mainIcon.innerHTML = `<img src="./img/sunny.svg" alt="icon-weather" width="170px" height="170px"/>`;
  }
  if (weather.weather[0]["main"] === "Mist") {
    mainIcon.innerHTML = `<img src="./img/fog.svg" alt="icon-weather" width="170px" height="170px"/>`;
  }
}
