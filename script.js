const API_KEY = 'f85a59dc629c082d9fbe8dcea06a2930';

const form = document.getElementById("city-form");
const input = document.getElementById("city-input");

form.addEventListener("submit", function(event)
{
    event.preventDefault();
    const city = input.value.trim();
    fetchweather(city);
});

async function fetchweather(city)
{
    const statusMessage = document.querySelector('#status-message');
    statusMessage.textContent = '....';
    statusMessage.className = 'loading';

    try
    {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok)
        {
            throw new Error(`Město "${city}" nenalezeno! (${response.status})`);
        }

        const data = await response.json();
        statusMessage.textContent = '';

        // display
        const container = document.getElementById("weather-result");

        const mesto = data.name;
        const country = data.sys.country;
        const temp = Math.trunc(data.main.temp);
        const feelsLike = Math.trunc(data.main.feels_like);
        const description = data.weather[0].description;
        const wind = data.wind.speed;
      
        container.innerHTML = 
        `<h2>🌍 ${mesto}, ${country}</h2>
          <p>🌡️ Temperature: ${temp}°C</p>
          <p>🤔 Feels like: ${feelsLike}°C</p>
          <p>☁️ Condition: ${description}</p>
          <p>💨 Wind: ${wind} m/s</p>`;
    }
    catch (error)
    {
        statusMessage.textContent = error.message;
        statusMessage.className = 'error';
    }
}