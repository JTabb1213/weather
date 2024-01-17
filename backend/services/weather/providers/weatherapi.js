const API_KEY = '833ddf324d9242eda33142516231812';

const axios = require("axios");
const moment = require('moment');

const SKIES_MAP = {
    Sunny : 'Clear',
    Overcast : 'Clouds',
    'Moderate or heavy rain with thunder' : 'Thunderstorm',
    'Light rain' : 'Rain'
}

async function queryWeather(city, units) {
    console.log(`Fetching weather from weatherapi`);
    return axios.get(`http://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}&aqi=no`).then(result => {
        // Transform the response to our data contract, which is technically the openweathermap response
        const location = result.data.location;
        const current = result.data.current;
        return {
            name: location.name,
            tempActual: current.temp_f,
            humidity: current.humidity,
            tempFeelsLike: current.feelslike_f,
            windSpeed: current.wind_mph,
            skies: SKIES_MAP[current.condition.text] || current.condition.text,
            pressure: current.pressure_in,
            localTime: moment(location.localtime, 'YYYY-MM-DD HH:mm').utc(true).toISOString(true)
        }
    });
}

module.exports = {
    queryWeather: queryWeather
}