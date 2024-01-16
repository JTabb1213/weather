const config = require('config');
const { FunctionNotImplementedError } = require("../../errors");
let _delegate;

const provider = config.get("providers.weather");

// Check to see if the provider is openweathermap, if not default to weatherapi

_delegate = require(`./providers/${provider}`)

console.log(`Using ${provider} as the weather service provider`);
async function queryWeather(city, units) {
    return _delegate.queryWeather.apply(_delegate, arguments);
}

async function createCity(cityData) {
    if (_delegate.createCity) {
        return _delegate.createCity.apply(_delegate, arguments);
    } else {
        throw new FunctionNotImplementedError('createCity');
    }

}

async function getWeather(id) {
    if (_delegate.getWeather) {
        return _delegate.getWeather.apply(_delegate, arguments)
    } else {
        throw new FunctionNotImplementedError('getWeather');
    }
}

async function deleteWeather(id) {
    if (_delegate.deleteWeather) {
        console.log("delete availabe");
        return _delegate.deleteWeather.apply(_delegate, arguments)
    } else {
        throw new FunctionNotImplementedError('deleteWeather');
    }
}

async function updateWeather(id, cityInfo) {
    if (_delegate.updateWeather) {
        return _delegate.updateWeather.apply(_delegate, arguments)
    } else {
        throw new FunctionNotImplementedError('updateWeather');
    }
}

async function patchWeather(id, cityInfo) {
    if (_delegate.patchWeather) {
        return _delegate.patchWeather.apply(_delegate, arguments)
    } else {
        throw new FunctionNotImplementedError('patchWeather');
    }
}
module.exports = {
    queryWeather: queryWeather,
    createCity: createCity,
    getWeather: getWeather,
    deleteWeather: deleteWeather,
    updateWeather: updateWeather,
    patchWeather: patchWeather
}