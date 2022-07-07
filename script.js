// Open Weather API Key
let apiKey = "15ed5d92f7b4157fdab57b1053c46052";
let city = "Los Angeles";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
let celsiusTemp = null;
let fahrenTemp = null;
let celsTempHigh = null;
let celsTempLow = null;
let fTempMin = [];
let fTempMax = [];
let cTempMin = null;
let cTempMax = null;
let defaultTemp = "F";
let windUnits = "mph";
let windUnitDisplay = document.querySelector("span.currentWindUnits");
windUnitDisplay = "mph";
let CorFBut = document.querySelector(".CorF");
let CorFLet = document.querySelector("span.CorFLetter");
CorFLet.innerHTML = "°F";
let curLocButton = document.querySelector("button.currentButton");
let tempToCorF = document.querySelector("button.CorF");

// Date and Time BELOW ----- - - - - - - - - - - - - - - - - - - - - - - - - -
let dateTime = document.querySelector(".dateAndTime");
let fullDate = document.querySelector("#fullDate");
let fullDay = document.querySelector("#fullDay");
let fullTime = document.querySelector("#fullTime");

function displayDate() {
  let now = new Date();
  let dayOfMon = new Date().getDate();
  let day = now.getDay();
  let month = now.getMonth();
  let year = now.getFullYear();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let ampm = now.getHours() >= 12 ? "pm" : "am";
  hour = hour % 12;
  if (hour === 0) {
    hour = 12;
  }

  let dayOfWk = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let wkDay = dayOfWk[day];

  let monthNames = [
    "Jan",
    "feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let mon = monthNames[month];
  fullDate.innerHTML = mon + " " + dayOfMon + ", " + year;
  fullDay.innerHTML = wkDay;
  fullTime.innerHTML = hour + ":" + minutes + ampm;
}

// on LOAD, the date and time refreshes
if (dateTime) {
  dateTime.addEventListener("load", displayDate());
}
// Date and Time ABOVE ----- - - - - - - - - - - - - - - - - - - - - - - - - -

// display current weather details
function displayWeatherCondition(response) {
  city = response.data.name;
  fahrenTemp = response.data.main.temp;
  let iconElement = document.querySelector("#currentIcon");
  document.querySelector("h4.city").innerHTML = city;
  document.querySelector("span.currentTemp").innerHTML = Math.round(fahrenTemp);
  document.querySelector("span.currentDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("span.currentHumidity").innerHTML =
    response.data.main.humidity + "%";
  document.querySelector("span.currentWind").innerHTML =
    response.data.wind.speed + " " + windUnits;
  let iconData = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconData}@2x.png`
  );

  // Testing to see if can update the background based on the weather description
  // let curBackground = document.querySelector("h3.current");
  // let newBackground = document.querySelector("h3.current");
  // let curDescip = response.data.weather[0].description;
  // if (curDescip.split(" ").includes("clear")) {
  //   newBackground.innerHTML = `<div class="clearSky">
  //     </div>`;
  // }

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

// OTHER DAY FORECAST - Write code once and duplicate in JS
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row weatherRow">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `
        <div class="col-2 weather-forecast">
          <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
          <img class="weather-icon"
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="56"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temp-max"> ${Math.round(
              forecastDay.temp.max
            )}° </span>
            <span> | </span>
            <span class="weather-forecast-temp-min"> ${Math.round(
              forecastDay.temp.min
            )}° </span>
          </div>
          <div class="forecastMain"> ${forecastDay.weather[0].main} </div>
        </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Update city based on search input BELOW ------
function displaySearchedCity(event) {
  event.preventDefault();

  // uses the city name that the user enters
  let searchIn = document.querySelector("#search-text-input");
  let cityInput = document.querySelector("h4.city");
  cityInput.innerHTML = searchIn.value;
  // make an API call to OpenWeather API & once response rcvd, display city name & temp
  // if (searchIn.value === " ") {
  //   cityInput.innerHTML = "Please enter a city.";
  // }
  searchIn.value.trim();
  if (searchIn.value === " ") {
    cityInput.innerHTML = "Please enter a city.";
  }
  if (searchIn.value) {
    let apiKey = "15ed5d92f7b4157fdab57b1053c46052";
    let city = searchIn.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
  } else {
    cityInput.innerHTML = "Please enter a city.";
  }
}

// function used when user clicks "Current Location" button to show city/temp
function searchCurrentCity(position) {
  let apiKey = "15ed5d92f7b4157fdab57b1053c46052";
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function convertUnits(event) {
  let cityEntered = document.querySelector("h4.city");
  cityEntered.innerHTML = city;
  switch (defaultTemp) {
    case "F":
      units = "metric";
      CorFLet.innerHTML = "°C";
      CorFBut.innerHTML = " [°C] or °F ";
      defaultTemp = "C";
      windUnits = "km/h";
      windUnitDisplay = "km/h";
      windUnitDisplay.innerHTML = "km/h";
      break;
    case "C":
      units = "imperial";
      CorFLet.innerHTML = "°F";
      CorFBut.innerHTML = " °C or [°F] ";
      defaultTemp = "F";
      windUnits = "mph";
      windUnitDisplay = "mph";
      windUnitDisplay.innerHTML = "mph";
      break;
    default:
  }

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios
    .get(`${apiUrl}&appid=${apiKey}&units=${units}`)
    .then(displayWeatherCondition);
}

let cityEntered = document.querySelector("h4.city");
cityEntered.innerHTML = city;
axios
  .get(`${apiUrl}&appid=${apiKey}&units=${units}`)
  .then(displayWeatherCondition);

// Function to show CURRENT location information AND calls to display city
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `15ed5d92f7b4157fdab57b1053c46052`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
  navigator.geolocation.getCurrentPosition(searchCurrentCity);
}

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = `15ed5d92f7b4157fdab57b1053c46052`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function clearForm(searchedItem) {
  if (searchedItem.value != null) {
    searchedItem.value = "";
  }
}

// calls showPosition
function getCurrentPosition() {
  let searchIn = document.querySelector("#search-text-input");
  clearForm(searchIn);
  navigator.geolocation.getCurrentPosition(showPosition);
}

tempToCorF.addEventListener("click", convertUnits);

// when user clicks "current location" button
curLocButton.addEventListener("click", getCurrentPosition);

// Calls display city function when user submits from search bar
let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", displaySearchedCity);

// Calls display city function when user submits from search bar
let searchButton = document.querySelector("input.inputButton");
searchButton.addEventListener("click", displaySearchedCity);
