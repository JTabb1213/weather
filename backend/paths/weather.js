const weatherService = require('../services/weather');
const {StatusCodes, ReasonPhrases} = require('http-status-codes');
function queryWeather(req, res, next) {
    const city = req.query.city;
    const units = req.query.units;
    weatherService.queryWeather(city, units).then(result => {
        if (!result) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "City not found" });
        } else {
            res.json(result);
        }
    }).catch(next);
}

function getWeather(req, res, next) {
    const id = req.params.id;
    weatherService.getWeather(id).then(result => {
        if (!result) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "no results found" });
        } else {
            res.json(result);
        }
    }).catch(next);
}

function createWeather(req, res, next) {
    const cityData = req.body;
    weatherService.createCity(cityData).then(result => {
        if (!result) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "City not added" });
        } else {
            res.status(StatusCodes.CREATED).json(result.dataValues);
        }
    }).catch(next);
}

function updateWeather(req, res, next) {
    const id = req.params.id;
    const cityData = req.body;
    weatherService.updateWeather(id, cityData).then(result => {
        if (!result) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "city was not found for update" });
        } else {
            weatherService.getWeather(id).then(result => {
                res.json(result.dataValues);
            }).catch(next);

        }
    }).catch(next)
}

function deleteWeather(req, res, next) {
    const id = req.params.id;
    weatherService.deleteWeather(id).then(result => {
        res.sendStatus(StatusCodes.NO_CONTENT);
    }).catch(next);
}

function patchWeather(req, res, next) {
    const id = req.params.id;
    const cityData = req.body;
    weatherService.patchWeather(id, cityData).then(result => {
        if (!result) {
            res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND });
        } else {
            weatherService.getWeather(id).then(result => {
                res.json(result.dataValues);
            }).catch(next);
        }
    }).catch(next);
}

module.exports = {
    queryWeather: queryWeather,
    getWeather: getWeather,
    createWeather: createWeather,
    updateWeather: updateWeather,
    deleteWeather: deleteWeather,
    patchWeather: patchWeather
}