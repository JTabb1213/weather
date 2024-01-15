const weatherService = require('./weather');
const mapService = require('./map');
const eventsService = require('./events');
const async = require('async');
/**
 * This serves as an aggregation service to collect all pieces of information about a city
 * @param city
 * @returns {Promise<void>}
 */

async function getCityInfo(city) {
    return Promise.all([weatherService.queryWeather(city), mapService.getMapUrl(city), eventsService.queryEvents(city)]).then(result => {
       return {
           weather: result[0],
           map: result[1],
           events: result[2]
       }
    });
}

module.exports = {
    getCityInfo: getCityInfo
}