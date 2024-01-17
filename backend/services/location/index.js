const config = require('config');
let _delegate;

const provider = config.get("providers.location");
_delegate = require(`./providers/${provider}`);
console.log(`Using ${provider} as the location provider`);
async function getCoordinates(city) {
    return _delegate.getCoordinates.apply(_delegate, arguments);
}

module.exports = {
    getCoordinates: getCoordinates
}