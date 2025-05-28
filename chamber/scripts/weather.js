const apiKey = 'e26e0ec294d742be1524f90e43a67cdd'; 
const lat = 23.7369; // Latitude for Tamaulipas
const lon = -99.1411; // Longitude for Tamaulipas
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// Current Weather
fetch(weatherUrl)
  .then(response => response.json())
  .then(data => {
    document.getElementById("current-temp").textContent = `Temp: ${data.main.temp.toFixed(1)}°C`;
    document.getElementById("weather-desc").textContent = `Conditions: ${data.weather[0].description}`;
  })
  .catch(error => console.error("Error fetching current weather:", error));

// 3-Day Forecast at 12:00 PM
fetch(forecastUrl)
  .then(response => response.json())
  .then(data => {
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = ""; 

    const forecastDays = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    forecastDays.forEach(day => {
      const tempDiv = document.createElement("div");
      tempDiv.className = "temp";
      const date = new Date(day.dt_txt);
      tempDiv.innerHTML = `<strong>${date.toLocaleDateString(undefined, { weekday: 'short' })}</strong>: ${day.main.temp.toFixed(1)}°C`;
      forecastDiv.appendChild(tempDiv);
    });
  })
  .catch(error => console.error("Error fetching forecast:", error));