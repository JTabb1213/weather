const axios = require('axios');
const apiKey = "AIzaSyB9_CPPqRsSpVZGYiEm-8iOskyYfp50O1E";
const location = require('../../location');

async function getMapUrl(city) {
    const geocode = await location.getCoordinates(city);
    return {
        mapUrl: geocode && `https://maps.googleapis.com/maps/api/staticmap?center=${geocode.location.lat},${geocode.location.lng}&key=${apiKey}&size=600x600&zoom=15`
    };
}

module.exports = {
    getMapUrl: getMapUrl
}
