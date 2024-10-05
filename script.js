const apiKey = "YOUR_API_KEY"; // Replace with your API key
const cityInput = document.getElementById("cityInput");
const weatherContainer = document.querySelector(".weather-container");
const   
 cityElement = document.getElementById("city");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");   

const weatherIconElement = document.getElementById("weather-icon");   


function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;   


    fetch(apiUrl)
        .then(response => response.json())
        .then(data   
 => {
            cityElement.textContent = data.name;
            temperatureElement.textContent = `${data.main.temp} °C`;
            descriptionElement.textContent   
 = data.weather[0].description;
            weatherIconElement.src   
 = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        })
        .catch(error => {
            console.error(error);
            weatherContainer.innerHTML = "Error fetching weather data.";
        });
}

cityInput.addEventListener("input", () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    } else {
        weatherContainer.innerHTML = "";
    }
});
