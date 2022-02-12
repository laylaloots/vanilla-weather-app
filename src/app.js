let currentDate = new Date();

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekDay = weekDays[currentDate.getDay()];

let hour = addHourZero(currentDate.getHours());

let minutes = addMinutesZero(currentDate.getMinutes());

let displayDateTime = document.querySelector("#current-weather-date");
displayDateTime.innerHTML = `${weekDay} ${hour}:${minutes}`;

function addHourZero(hour) {
  if (hour < 10) {
    hour = "0" + hour;
  }
  return hour;
}

function addMinutesZero(minutes) {
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return minutes;
}

function changeCityName(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name-input").value;
  temperatureDisplay(cityName);
}

function formatDay (timestamp) {
let date = new Date(timestamp *1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
    if  (index < 5) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="50"
        />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span> |
           <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
        </div>
       </div>`;
    }
  });
 
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "bc8fe9a48540e9a4e0671cbdd1073710";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCityAndTemperature(response) {
  let name = document.querySelector("#display-city-name");
  name.innerHTML = response.data.name;

  celciusTemperature = response.data.main.temp;

  let tempChange = document.querySelector("#main-temp");
  tempChange.innerHTML = Math.round(celciusTemperature);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;

  let feelsLikeTemp = document.querySelector("#feels-like-temp");
  feelsLikeTemp.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )} °C`;

  let windspeed = document.querySelector("#windspeed");
  windspeed.innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function temperatureDisplay(cityName) {
  let apiKey = "bc8fe9a48540e9a4e0671cbdd1073710";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityAndTemperature);
}

let search = document.querySelector("#city-search-form");
search.addEventListener("submit", changeCityName);


temperatureDisplay("Wellington");
