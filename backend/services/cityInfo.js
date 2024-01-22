const weatherService = require('./weather');
const mapService = require('./map');
const eventsService = require('./events');
const reviewService = require('./reviews');
const async = require('async');

/**
 * This serves as an aggregation service to collect all pieces of information about a city
 * @param city
 * @returns {Promise<void>}
 */

function extractResultFromPromise(promise) {
    return promise.status === 'fulfilled'
        ? promise.value
        : promise.status === 'rejected'
            ? {error: {message: promise.reason?.message || 'Unknown error occurred'}} : null;
}

async function getCityInfo(city) {
    const tasks = [
        weatherService.queryWeather(city),
        mapService.getMapUrl(city),
        eventsService.queryEvents(city),
        reviewService.queryReviews(city, 'restaurants')];
    // Using all settled to account for partial success
    // Promise.all is an all or nothing approach
    return Promise.allSettled(tasks).then(results => {
        const normalized = results.map(extractResultFromPromise);
        return {
            weather: normalized[0],
            map: normalized[1],
            events: normalized[2],
            food: normalized[3]
        }
    });
}

module.exports = {
    getCityInfo: getCityInfo
}