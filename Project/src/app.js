let date = document.querySelector("#date");
console.log(date);

let currentDate = new Date();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function formatDate() {
  let dayName = days[currentDate.getDay()];
  let month = months[currentDate.getMonth()];
  let dayNumber = currentDate.getDate();
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  return `${dayName}, ${month} ${dayNumber} ${year} ${hours}:${minutes}`;
}

date.innerHTML = formatDate();
console.log(date.innerHTML);

var temp = "";
var temperature = document.querySelector("#temp");
var percip = document.querySelector("#percip");
var humidity = document.querySelector("#humidity");
var wind = document.querySelector("#wind");
var icon = document.querySelector("#icon");
var apiKey = "dbec88a6d2d425ce902660bf47e59907";
function submitForm(event) {
  event.preventDefault();
  var newCity = searchBox.value;
  let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(endpoint).then(reportTemp);
}
function reportTemp(response) {
  console.log(response.data);
  temp = Math.round(response.data.main.temp);
  temperature.innerHTML = temp;
  cityName.innerHTML = response.data.name;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  icon.innerHTML = response.data.weather.icon;
}

let submitButton = document.querySelector("#submit-button");
let searchBox = document.querySelector("#search-box");
let cityName = document.querySelector("#city-name");
submitButton.addEventListener("click", submitForm);

let degCButton = document.querySelector("#C");
let degFButton = document.querySelector("#F");

function setDegC(event) {
  event.preventDefault();
  temperature.innerHTML = temp;
}

function setDegF(event) {
  event.preventDefault();
  let degF = Math.round(temp * 1.8 + 32);
  temperature.innerHTML = degF;
  console.log(degF);
}

degCButton.addEventListener("click", setDegC);
degFButton.addEventListener("click", setDegF);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", useCurrentLocation);
navigator.geolocation.getCurrentPosition(useCurrentLocation);

function useCurrentLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let endpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let url = `${endpoint}lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  console.log(url);
  axios.get(url).then(reportTemp);
}
