let container = document.querySelector(".container");
let inputPart = document.querySelector(".input-part");
let infoTxt = document.querySelector(".info-text");
let inputField = document.querySelector("input");
let locationBtn = document.querySelector("button");
let wIcon = document.querySelector(".weather-part img");
let arrowIcon = document.querySelector("header i");
let api;

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation api");
  }
});

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData();
}

let apiKey = `0679046e15d3a40e0373256dae5751f2`;

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}

function fetchData() {
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
  infoTxt.classList.replace("pending", "error");
  if (info.cod == "404") {
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;

    if (id == 800) {
      wIcon.src = "assets/icons/clear.svg";
    } else if (id >= 200 && id <= 232) {
      wIcon.src = "assets/icons/strom.svg";
    } else if (id >= 600 && id <= 622) {
      wIcon.src = "assets/icons/snow.svg";
    } else if (id >= 701 && id <= 781) {
      wIcon.src = "assets/icons/haze.svg";
    } else if (id >= 801 && id <= 804) {
      wIcon.src = "assets/icons/cloud.svg";
    } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
      wIcon.src = "assets/icons/rain.svg";
    }

    container.querySelector(".temp .numb").innerText = Math.floor(temp);
    container.querySelector(".weather").innerText = description;
    container.querySelector(".location span").innerText = `${city}, ${country}`;
    container.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
    container.querySelector(".humidity span").innerText = `${humidity}%`;

    infoTxt.classList.remove("pending", "error");
    container.classList.add("active");
  }
}

arrowIcon.addEventListener('click', () => {
    container.classList.remove('active')
})
