function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = ` <img src ="${response.data.condition.icon_url}" class = "weather-app-icon"/>`;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "31e1da1f6cb1baab369236fo43tc0e60";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#weather-app-city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()]
}

function getForecast(city) {
    let apiKey = "31e1da1f6cb1baab369236fo43tc0e60";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric `;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Mon","Tue", "Wed", "Thurs", "Fri", "Sat", "Fri"];
  let forecastHtml = " ";

 response.data.daily.forEach(function (day, index) {
   if (index < 5) {
     forecastHtml =
     forecastHtml +
     `
        <div class="weatherForecastDay">
        <div class="weatherDate"> ${formatDay(day.time)} </div>
        <div class="weatherIcon"> <img src = "${day.condition.icon_url}" /> </div>
        <div class="weatherTemperatures">
            <div class="weatherTemperature">
                <strong> ${Math.round(day.temperature.maximum)}°</strong>
            </div>
            <div class="weatherTemperature"> ${Math.round(day.temperature.minimum)}°</div>
        </div>
     `;
   }
  });

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;

}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");

