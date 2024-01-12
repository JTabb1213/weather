const axios = require("axios");
const API_KEY = 'cc6af3ddc3889911b9d0f06a9ce2734a';



async function queryWeather(city, units) {
    
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?&units=${units}&q=${city}&appId=${API_KEY}`);
    const data = response.data;
    return {
        name: data.name,
        tempActual: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        tempFeelsLike: data.main.feels_like,
        skies: data.weather[0].description
    }
}

module.exports = {
    queryWeather: queryWeather
}