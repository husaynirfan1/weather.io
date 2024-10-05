const apiKey = "8d9594679432c1dbaf091acd9a3f139e"; // Replace with your One Call API key
const geocodingApiKey = "8d9594679432c1dbaf091acd9a3f139e"; // Replace with your Geocoding API key
const cityInput = document.getElementById("cityInput");
const weatherContainer = document.querySelector(".weather-container");
const   
 cityElement = document.getElementById("city");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");   

const weatherIconElement = document.getElementById("weather-icon");   


function showLoading() {
  temperatureElement.textContent = "Loading...";
  descriptionElement.textContent = "";
  weatherIconElement.src = "";
}

function showError(error) {
  console.error(error);
  weatherContainer.innerHTML = "Error: " + error.message;
}

function getWeatherDataByCity(city) {
  showLoading();

  // Geocoding API call to get lat and lon
  const geocodingUrl = `http://api.openweathermap.org/geo/1.1/q=${city}&appid=${geocodingApiKey}`;

  fetch(geocodingUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        showError(new Error("City not found"));
        return;
      }

      const lat = data.results[0].lat;
      const lon = data.results[0].lon;

      // Use lat and lon in One Call API call
      const apiUrl = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${Math.floor(Date.now() / 1000)}&appid=${apiKey}`; // Assuming current time

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Update UI with weather data
          cityElement.textContent = data.name;
          temperatureElement.textContent = `${data.main.temp} °C`;
          descriptionElement.textContent = data.weather[0].description;   

          weatherIconElement.src   
 = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        })
        .catch(error => showError(error));
    })
    .catch(error => showError(error));
}

cityInput.addEventListener("input", () => {
  const city = cityInput.value;
  if (city) {
    getWeatherDataByCity(city);
  } else {
    weatherContainer.innerHTML = "";
  }
});
