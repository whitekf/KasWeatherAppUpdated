// Open Weather API Key
let apiKey = "15ed5d92f7b4157fdab57b1053c46052";
let city = "Los Angeles";
let units = "imperial";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
let celsiusTemp = null;
let fahrenTemp = null;
// let fahrenTempHigh = null;
// let fahrenTempLow = null;
let celsTempHigh = null;
let celsTempLow = null;
let fTempMin = [];
let fTempMax = [];

// let fTempMaxCur = null;
// let fTempMinCur = null;
// let cTempMaxCur = null;
// let cTempMinCur = null;
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
let lastRequest = "D"; // D = Default, SC = SearchedCity, GCP = GetCurrentPosition

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
function displayDefaultWeatherCondition(response) {
  lastRequest = "D";
  console.log("1 - dispalyCurWeatherCondition ARGHAAADHFHREJHGKHSDFKJSEA");
  let defaultCity = document.querySelector("h4.city");
  city = defaultCity.value;
  fahrenTemp = response.data.main.temp;
  let iconElement = document.querySelector("#currentIcon");
  document.querySelector("h4.city").innerHTML = city;
  document.querySelector("span.currentTemp").innerHTML = Math.round(fahrenTemp);
  document.querySelector("span.currentDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("span.currentHumidity").innerHTML =
    response.data.main.humidity + "%";
  document.querySelector("span.currentWind").innerHTML =
    Math.round(response.data.wind.speed) + windUnits;
  let iconData = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconData}@2x.png`
  );
  getForecast(response.data.coord);
}

// display current weather details
function displayCurWeatherCondition(response) {
  lastRequest = "GCP";
  console.log("1 - dispalyCurWeatherCondition ARGHAAADHFHREJHGKHSDFKJSEA");
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
    Math.round(response.data.wind.speed) + windUnits;
  let iconData = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconData}@2x.png`
  );
  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}
// OTHER DAY FORECAST - Write code once and duplicate in JS
function displayForecast(response) {
  console.log("3 - displayForecast KASSSIEeE - ARGHAAADHFHREJHGKHSDFKJSEA");
  // let apiKey = "15ed5d92f7b4157fdab57b1053c46052";
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  // axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCurWeatherCondition);
  let forecast = response.data.daily;
  // console.log("forecast is " + forecast);
  // let tempToCorF = document.querySelector("button.CorF");
  // tempToCorF.addEventListener("click", convertUnits);
  // SHOULD THIS BE PULLING FROM WHATEVER CITY IS LISTED IN THE CITY FIELD??? HOW DOES THAT WORK WITH PARAMETER?
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row weatherRow">`;
  forecast.forEach(function (forecastDay, index) {
    // if (index < 1) {
    //   fTempMaxCur = forecastDay.temp.max;
    //   fTempMinCur = forecastDay.temp.min;
    //   cTempMaxCur = (fTempMaxCur - 32) / 1.8;
    //   cTempMinCur = (fTempMinCur - 32) / 1.8;
    //   ////////
    // }
    if (index < 5) {
      // fTempMin[index] = forecastDay.temp.min;
      // //  console.log(fTempMin[index]);
      // fTempMax[index] = forecastDay.temp.max;
      // //  console.log(fTempMax[index]);
      // ////////
      // // cTempMaxCur = (fTempMax[index] - 32) / 1.8;
      // // cTempMinCur = (fTempMin[index] - 32) / 1.8;
      // ////////
      // cTempMax = (fTempMax[index] - 32) / 1.8;
      // cTempMin = (fTempMin[index] - 32) / 1.8;
      // ////////
      forecastHTML += `
        <div class="col-2 weather-forecast">
          <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
          <img class="weather-icon"
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
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
  if (searchIn.value) {
    lastRequest = "SC";
    let apiKey = "15ed5d92f7b4157fdab57b1053c46052";
    // let city = document.querySelector("h4.city").value;
    let city = searchIn.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCurWeatherCondition);
  } else {
    cityInput.innerHTML = "Please enter a city.";
  }
}

// function used when user clicks "CorF" on default city...?
function searchDefaultCity(position) {
  lastRequest = "D";
  // KASSIE COME BACK NEED TO FIGURE OUT WHY THIS ISN'T REMOVING TEXT IN SEARCH FIELD
  let defaultCity = document.querySelector("h4.city");
  city = defaultCity.value;
  let apiKey = "15ed5d92f7b4157fdab57b1053c46052";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCurWeatherCondition);
  // axios.get(`${apiUrl}&appid=${apiKey}`).then(displayOthWeatherCondition);
}

// function used when user clicks "Current Location" button to show city/temp
function searchCurrentCity(position) {
  lastRequest = "GCP";

  let apiKey = "15ed5d92f7b4157fdab57b1053c46052";
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCurWeatherCondition);
}

// Calls display city function when user submits from search bar
let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", displaySearchedCity);
// #0 // function to convert units
// function convertUnits(event) {
//   switch (defaultTemp) {
//     case "F":
//       units = "metric";
//       CorFLet.innerHTML = "°C";
//       CorFBut.innerHTML = " [°C] or °F ";
//       defaultTemp = "C";
//       console.log("Hit switch for F - converting to metric ");
//       console.log(units);
//       break;
//     case "C":
//       units = "imperial";
//       CorFLet.innerHTML = "°F";
//       CorFBut.innerHTML = " °C or [°F] ";
//       defaultTemp = "F";
//       console.log("Hit switch for C - converting to imperial ");
//       console.log(units);
//       break;
//     default:
//       console.log("Neither switch hit!");
//   }
//   let curLocButton = document.querySelector("button.currentButton");
//   curLocButton.addEventListener("click", getCurrentPosition);
//   // Calls display city function when user submits from search bar
//   let formInput = document.querySelector("#search-form");
//   formInput.addEventListener("submit", displaySearchedCity);
//   // If user selects the C or F button, calls convertUnits function
//   let tempToCorF = document.querySelector("button.CorF");
//   tempToCorF.addEventListener("click", convertUnits);
// }

// // // #1 - getCurrentPosition / showPosition / searchCurrentCity /
// // // displayCurWeather -- function to convert units
// function convertUnitsGCP(event) {
//   switch (defaultTemp) {
//     case "F":
//       units = "metric";
//       CorFLet.innerHTML = "°C";
//       CorFBut.innerHTML = " [°C] or °F ";
//       defaultTemp = "C";
//       windUnits = "kph";
//       windUnitDisplay = "kph";
//       windUnitDisplay.innerHTML = "kph";
//       console.log("Hit switch for F - converting to metric ");
//       console.log(units);
//       navigator.geolocation.getCurrentPosition(showPosition);
//       break;
//     case "C":
//       units = "imperial";
//       CorFLet.innerHTML = "°F";
//       CorFBut.innerHTML = " °C or [°F] ";
//       defaultTemp = "F";
//       windUnits = "mph";
//       windUnitDisplay = "mph";
//       windUnitDisplay.innerHTML = "mph";
//       console.log("Hit switch for C - converting to imperial ");
//       console.log(units);
//       navigator.geolocation.getCurrentPosition(showPosition);
//       break;
//     default:
//       console.log("Neither switch hit!");
//       //navigator.geolocation.getCurrentPosition(showPosition);
//       break;
//   }
//   navigator.geolocation.getCurrentPosition(showPosition);
// }

// // // #2 - searchedCity.....displaySearchedCity /
// // // getForecast / displayForecast /  function to convert units
// function convertUnitsDSC(event) {
//   switch (defaultTemp) {
//     case "F":
//       units = "metric";
//       CorFLet.innerHTML = "°C";
//       CorFBut.innerHTML = " [°C] or °F ";
//       defaultTemp = "C";
//       console.log("Hit switch for F - converting to metric ");
//       console.log(units);
//       // Calls display city function when user submits from search bar
//       displaySearchedCity(event);
//       break;
//     case "C":
//       units = "imperial";
//       CorFLet.innerHTML = "°F";
//       CorFBut.innerHTML = " °C or [°F] ";
//       defaultTemp = "F";
//       console.log("Hit switch for C - converting to imperial ");
//       console.log(units);
//       // Calls display city function when user submits from search bar
//       displaySearchedCity(event);
//       break;
//     default:
//       console.log("Neither switch hit = PROBLEM");
//       // displaySearchedCity(event);
//       break;
//   }
//   // // Calls display city function when user submits from search bar
//   // displaySearchedCity(event);
// }

// #3 - if CorF button clicked - function to convert units
function convertUnits(event) {
  // // make an API call to OpenWeather API & once response rcvd, display city name & temp
  // let defaultCity = document.querySelector("h4.city");
  // city = defaultCity.value;

  let cityEntered = document.querySelector("h4.city");
  cityEntered.innerHTML = city;

  // let apiKey = "15ed5d92f7b4157fdab57b1053c46052";
  // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  switch (defaultTemp) {
    case "F":
      units = "metric";
      CorFLet.innerHTML = "°C";
      CorFBut.innerHTML = " [°C] or °F ";
      defaultTemp = "C";
      windUnits = "kph";
      windUnitDisplay = "kph";
      windUnitDisplay.innerHTML = "kph";
      console.log("Hit switch for F - converting to metric ");
      console.log(units);
      break;
    case "C":
      units = "imperial";
      CorFLet.innerHTML = "°F";
      CorFBut.innerHTML = " °C or [°F] ";
      defaultTemp = "F";
      windUnits = "mph";
      windUnitDisplay = "mph";
      windUnitDisplay.innerHTML = "mph";
      console.log("Hit switch for C - converting to imperial ");
      console.log(units);
      break;
    default:
      console.log("PROBLEM -- Neither switch was hit!");
  }
  console.log("KASSIE IS TESTING THIS 0 AND FINGERS AND TOES ARE CROSSED ISH!");
  if (lastRequest === "D" || lastRequest === "GCP" || lastRequest === "SC") {
    // let apiKey = "15ed5d92f7b4157fdab57b1053c46052";
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios
      .get(`${apiUrl}&appid=${apiKey}&units=${units}`)
      .then(displayCurWeatherCondition);
  }
  // make an API call to OpenWeather API & once response rcvd, display city name & temp
  //axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCurWeatherCondition);
  //   // If user selects the C or F button, calls convertUnits function
  //   tempToCorF.addEventListener("click", convertUnits);
}

let cityEntered = document.querySelector("h4.city");
cityEntered.innerHTML = city;
axios
  .get(`${apiUrl}&appid=${apiKey}&units=${units}`)
  .then(displayCurWeatherCondition);
// // If user selects the C or F button, calls calcTemp function
// let tempToCorF = document.querySelector("button.CorF");
// tempToCorF.addEventListener("click", convertUnits);

// Function to show CURRENT location information AND calls to display city
function showPosition(position) {
  lastRequest = "GCP";
  console.log("showPosition hit - and is " + position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `15ed5d92f7b4157fdab57b1053c46052`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCurWeatherCondition);
  navigator.geolocation.getCurrentPosition(searchCurrentCity);
  //  curLocButton.addEventListener("click", getCurrentPosition);
  // If user selects the C or F button, calls convertUnits function
  // tempToCorF.addEventListener("click", convertUnitsGCP);
}

function getForecast(coordinates) {
  console.log("2 - getForecast ZZZZZZARGHAAADHFHREJHGKHSDFKJSEA");
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = `15ed5d92f7b4157fdab57b1053c46052`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
  //axios.get(apiUrl).then(otherDaysInRows);
}

function clearForm(searchedItem) {
  if (searchedItem.value != null) {
    searchedItem.value = "";
  }
}

// calls showPosition
function getCurrentPosition() {
  lastRequest = "GCP";
  // KASSIE COME BACK NEED TO FIGURE OUT WHY THIS ISN'T REMOVING TEXT IN SEARCH FIELD
  let searchIn = document.querySelector("#search-text-input");
  clearForm(searchIn);
  navigator.geolocation.getCurrentPosition(showPosition);
  // // If user selects the C or F button, calls convertUnits function
  // tempToCorF.addEventListener("click", convertUnitsGCP);
}

tempToCorF.addEventListener("click", convertUnits);

// when user clicks "current location" button
curLocButton.addEventListener("click", getCurrentPosition);
