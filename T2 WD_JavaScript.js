const apiKey = '371038337d484d80a92172204241706';

const weatherIconMap = {
    1000: 'fa-sun', // Sunny
    1003: 'fa-cloud-sun', // Partly cloudy
    1006: 'fa-cloud', // Cloudy
    1009: 'fa-cloud', // Overcast
    1030: 'fa-smog', // Mist
    1063: 'fa-cloud-showers-heavy', // Patchy rain possible
    1066: 'fa-snowflake', // Patchy snow possible
    1069: 'fa-cloud-sleet', // Patchy sleet possible
    1072: 'fa-cloud-showers-heavy', // Patchy freezing drizzle possible
    1087: 'fa-bolt', // Thundery outbreaks possible
    1114: 'fa-snowflake', // Blowing snow
    1117: 'fa-snowflake', // Blizzard
    1135: 'fa-smog', // Fog
    1147: 'fa-smog', // Freezing fog
    1150: 'fa-cloud-showers-heavy', // Patchy light drizzle
    1153: 'fa-cloud-showers-heavy', // Light drizzle
    1168: 'fa-cloud-showers-heavy', // Freezing drizzle
    1171: 'fa-cloud-showers-heavy', // Heavy freezing drizzle
    1180: 'fa-cloud-showers-heavy', // Patchy light rain
    1183: 'fa-cloud-showers-heavy', // Light rain
    1186: 'fa-cloud-showers-heavy', // Moderate rain at times
    1189: 'fa-cloud-showers-heavy', // Moderate rain
    1192: 'fa-cloud-showers-heavy', // Heavy rain at times
    1195: 'fa-cloud-showers-heavy', // Heavy rain
    1198: 'fa-cloud-showers-heavy', // Light freezing rain
    1201: 'fa-cloud-showers-heavy', // Moderate or heavy freezing rain
    1204: 'fa-cloud-sleet', // Light sleet
    1207: 'fa-cloud-sleet', // Moderate or heavy sleet
    1210: 'fa-snowflake', // Patchy light snow
    1213: 'fa-snowflake', // Light snow
    1216: 'fa-snowflake', // Patchy moderate snow
    1219: 'fa-snowflake', // Moderate snow
    1222: 'fa-snowflake', // Patchy heavy snow
    1225: 'fa-snowflake', // Heavy snow
    1237: 'fa-snowflake', // Ice pellets
    1240: 'fa-cloud-showers-heavy', // Light rain shower
    1243: 'fa-cloud-showers-heavy', // Moderate or heavy rain shower
    1246: 'fa-cloud-showers-heavy', // Torrential rain shower
    1249: 'fa-cloud-sleet', // Light sleet showers
    1252: 'fa-cloud-sleet', // Moderate or heavy sleet showers
    1255: 'fa-snowflake', // Light snow showers
    1258: 'fa-snowflake', // Moderate or heavy snow showers
    1261: 'fa-snowflake', // Light showers of ice pellets
    1264: 'fa-snowflake', // Moderate or heavy showers of ice pellets
    1273: 'fa-bolt', // Patchy light rain with thunder
    1276: 'fa-bolt', // Moderate or heavy rain with thunder
    1279: 'fa-bolt', // Patchy light snow with thunder
    1282: 'fa-bolt' // Moderate or heavy snow with thunder
};

document.getElementById('search-btn').addEventListener('click', () => {
    const location = document.getElementById('location').value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a valid location');
    }
});

async function fetchWeather(location) {
    try {
        showLoading(true);
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        updateCurrentWeather(data.location, data.current);
        updateForecast(data.forecast.forecastday);
        showLoading(false);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
        showLoading(false);
    }
}

function updateCurrentWeather(location, current) {
    const currentWeatherEl = document.getElementById('current-weather');
    currentWeatherEl.classList.remove('hidden');

    document.getElementById('location-info').innerHTML = `
        <h3>${location.name}, ${location.region}, ${location.country}</h3>
        <p>Local Time: ${location.localtime}</p>
    `;

    const iconClass = weatherIconMap[current.condition.code] || 'fa-question';
    document.getElementById('current-icon').innerHTML = `<i class="fas ${iconClass}"></i>`;
    document.getElementById('current-details').innerHTML = `
        <p>Temperature: ${current.temp_c}°C</p>
        <p>Condition: ${current.condition.text}</p>
        <p>Humidity: ${current.humidity}%</p>
        <p>Wind: ${current.wind_kph} kph</p>
    `;
}

function updateForecast(forecast) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = ''; // Clear previous forecast
    const forecastEl = document.getElementById('forecast');
    forecastEl.classList.remove('hidden');
    forecast.forEach(day => {
        const iconClass = weatherIconMap[day.day.condition.code] || 'fa-question';
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <h3>${new Date(day.date).toLocaleDateString()}</h3>
            <div class="forecast-icon"><i class="fas ${iconClass}"></i></div>
            <p>Max: ${day.day.maxtemp_c}°C</p>
            <p>Min: ${day.day.mintemp_c}°C</p>
            <p>${day.day.condition.text}</p>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

function showLoading(isLoading) {
    const loadingEl = document.getElementById('loading');
    const currentWeatherEl = document.getElementById('current-weather');
    const forecastEl = document.getElementById('forecast');
    if (isLoading) {
        loadingEl.classList.remove('hidden');
        currentWeatherEl.classList.add('hidden');
        forecastEl.classList.add('hidden');
    } else {
        loadingEl.classList.add('hidden');
    }
}
