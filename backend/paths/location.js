const locationService = require('../services/location');

function getCoordinates(req, res, next) {
    const city = req.query.city;
    locationService.getCoordinates(city).then(result => {
        res.json(result);
    }).catch(next);
}

module.exports = {
    getCoordinates: getCoordinates
}