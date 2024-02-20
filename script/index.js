"use strict";
let mainCity = document.querySelector("#mainCity");
let mainDeg = document.querySelector("#mainDeg");
let mainData = document.querySelector("#data");
let visibilityValue = document.querySelector("#visibilityValue");
let humidityValue = document.querySelector("#humidityValue");
let windValue = document.querySelector("#windValue");
let pressureValue = document.querySelector("#pressureValue");
let mainIcon = document.querySelector("#mainIcon");
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

let cityValue = document.querySelector("#searchCity");

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
    .catch((error) => {
      openModalError(error);
      resetInput(error);
    });
}

function openModalError() {
  let modal = document.querySelector(".modal");
  modal.style.display = "flex";
  setTimeout(() => {
    modal.style.display = "none";
  }, 3000);
}

function resetInput() {
  cityValue.value = "";
}

function collectingInformation(weather) {
  mainCity.textContent = weather.name;
  mainDeg.innerHTML = `${Math.round(weather.main.temp)}${"&deg;"}`;
  visibilityValue.textContent = `${weather.visibility / 1000} km`;
  windValue.textContent = `${weather.wind.speed} m/s`;
  humidityValue.textContent = `${weather.main.humidity}%`;
  pressureValue.textContent = `${weather.main.pressure}`;
  const date = new Date(weather.dt * 1000);
  const numDate = date.getDate();
  const month = mounth[date.getMonth()];
  const day = days[date.getDay()];
  mainData.textContent = `${numDate} ${month} (${day})`;
  const cityCod = weather.cod;

  if (cityCod == "404") {
    openModalError();
  }
}

function changeImg(weather) {
  let weatherType = weather.weather[0]["main"];
  switch (weatherType) {
    case "Clouds":
      mainIcon.innerHTML = `<img src="./img/cloud.svg" alt="icon-weather" width="170px" height="170px"/>`;
      break;
    case "Rain":
      mainIcon.innerHTML = `<img src="./img/rain.svg" alt="icon-weather" width="170px" height="170px"/>`;
      break;
    case "Snow":
      mainIcon.innerHTML = `<img src="./img/snow.svg" alt="icon-weather" width="170px" height="170px"/>`;
      break;
    case "Thunderstorm":
      mainIcon.innerHTML = `<img src="./img/thunderstorm.svg" alt="icon-weather" width="170px" height="170px"/>`;
      break;
    case "Clear":
      mainIcon.innerHTML = `<img src="./img/sunny.svg" alt="icon-weather" width="170px" height="170px"/>;`;
      break;
    case "Mist":
      mainIcon.innerHTML = `<img src="./img/fog.svg" alt="icon-weather" width="170px" height="170px"/>`;
      break;
  }
}
