const config = require('config');
let _delegate;

const provider = config.get("providers.events");

_delegate = require(`./providers/${provider}`)

console.log(`Using ${provider} as the event service provider`);

async function queryEvents(city) {
    return _delegate.queryEvents.apply(_delegate, arguments);
}

module.exports = {
    queryEvents: queryEvents
}