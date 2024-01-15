const mapService = require('../services/map');
const {StatusCodes} = require('http-status-codes');
function getMapUrl(req, res, next) {
    const { city } = req.query
    mapService.getMapUrl(city).then(result => {
        if (!result) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'City not found, or there were more than 1 candidates' });
        }
        res.json(result);
    }).catch(next);
}

module.exports = {
    getMapUrl: getMapUrl
}