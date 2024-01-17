const axios = require("axios");
const API_KEY = 'cc6af3ddc3889911b9d0f06a9ce2734a';
const moment = require('moment-timezone');
async function queryWeather(city, units) {

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=${city}&appId=${API_KEY}`);
    const data = response.data;
    return {
        name: data.name,
        tempActual: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        tempFeelsLike: data.main.feels_like,
        skies: data.weather[0].main,
        pressure: Math.round(data.main.pressure / 30),
        localTime: moment().utcOffset(Math.round(data.timezone / 60 )).utc(true).toISOString(true)
    }
}

module.exports = {
    queryWeather: queryWeather
}