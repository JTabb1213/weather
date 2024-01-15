const cityInfoService = require('../services/cityInfo');
async function getCityInfo(req, res, next) {
    const { city } = req.query
    return cityInfoService.getCityInfo(city).then(result => {
        res.json(result);
    }).catch(next);
}

module.exports = {
    getCityInfo: getCityInfo
}