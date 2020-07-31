const fetchWeather = (query) => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=d749dfc45240492d820122453203007&q=${query}`)
        .then(response => response.json().then(weatherForecastHandler))
        .catch(err => console.log('Not able to fetch weather forecast!!', err));
}

const weatherForecastHandler = data => {
    document.getElementById('city').style.display = 'flex';
    document.getElementById('city-name-label').innerHTML = data.location.name + ', ' + data.location.country;
    document.getElementById('city-temp-label').innerHTML = data.current.temp_c;
    document.getElementById('city-temp-metric-label').innerHTML = "&deg;C";
    document.getElementById('city-icon-link').src = data.current.condition.icon;
    document.getElementById('city-weather-condition').innerHTML = data.current.condition.text;
};

const searchHandler = e => {
    if (e.key === 'Enter') {
        fetchWeather(e.target.value.trim());
    }
};

document.getElementById("search").addEventListener("keypress", searchHandler);