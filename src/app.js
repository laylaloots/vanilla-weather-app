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

function showCityAndTemperature(response) {
  console.log(response);

  let name = document.querySelector("#display-city-name");
  name.innerHTML = response.data.name;

  let tempChange = document.querySelector("#main-temp");
  tempChange.innerHTML = Math.round(response.data.main.temp);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;

  let feelsLikeTemp = document.querySelector("#feels-like-temp");
  feelsLikeTemp.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )} °C`;

  let windspeed = document.querySelector("#windspeed");
  windspeed.innerHTML = `Windspeed: ${Math.round(
    response.data.wind.speed
  )} km/hour`;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function temperatureDisplay(cityName) {
  let apiKey = "bc8fe9a48540e9a4e0671cbdd1073710";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityAndTemperature);
}

function changeFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#main-temp");
  fahrenheitTemp.innerHTML = `57`;
}

function changeCelsuisTemp(event) {
  event.preventDefault();
  let celciusTemp = document.querySelector("#main-temp");
  celciusTemp.innerHTML = `26`;
}

let search = document.querySelector("#city-search-form");
search.addEventListener("submit", changeCityName);

let fahrenheit = document.querySelector("#fahrenheit-temp");
fahrenheit.addEventListener("click", changeFahrenheitTemp);

let celcius = document.querySelector("#celsuis-temp");
celcius.addEventListener("click", changeCelsuisTemp);

temperatureDisplay("Wellington");
