"use strict";
let mainCity = document.getElementById("mainCity");
let mainDeg = document.getElementById("mainDeg");
let mainData = document.getElementById("data");
let visibilityValue = document.getElementById("visibilityValue");
let humidityValue = document.getElementById("humidityValue");
let windValue = document.getElementById("windValue");
let pressureValue = document.getElementById("pressureValue");
let mainIcon = document.getElementById("mainIcon");
const weatherApi = {
  key: "6e1d40cc3a896e82cdbc90ce68419cc6",
  baseUrl: `https://api.openweathermap.org/data/2.5/weather`,
};

const days = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

const mounth = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

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
  const date = new Date(weather.dt * 1000);
  let numDate = date.getDate();
  let month = mounth[date.getMonth()];
  let day = days[date.getDay()];
  mainData.textContent = `${numDate} ${month} (${day})`;
}

function changeImg(weather) {
  let weatherType = weather.weather[0]["main"];
  if (weatherType === "Clouds") {
    mainIcon.innerHTML = `<img src="./img/cloud.svg" alt="icon-weather" width="170px" height="170px"/>`;
  }
  if (weatherType === "Rain") {
    mainIcon.innerHTML = `<img src="./img/rain.svg" alt="icon-weather" width="170px" height="170px"/>`;
  }
  if (weatherType === "Snow") {
    mainIcon.innerHTML = `<img src="./img/snow.svg" alt="icon-weather" width="170px" height="170px"/>`;
  }
  if (weatherType === "Thunderstorm") {
    mainIcon.innerHTML = `<img src="./img/thunderstorm.svg" alt="icon-weather" width="170px" height="170px"/>`;
  }
  if (weatherType === "Clear") {
    mainIcon.innerHTML = `<img src="./img/sunny.svg" alt="icon-weather" width="170px" height="170px"/>`;
  }
  if (weatherType === "Mist") {
    mainIcon.innerHTML = `<img src="./img/fog.svg" alt="icon-weather" width="170px" height="170px"/>`;
  }
}
