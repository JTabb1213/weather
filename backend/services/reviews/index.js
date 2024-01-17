const config = require('config');
let _delegate;
const provider = config.get("providers.reviews");
_delegate = require(`./providers/${provider}`);
console.log(`Using ${provider} as the review provider`);
async function queryReviews(city) {
    return _delegate.queryReviews.apply(_delegate, arguments);
}

module.exports = {
    queryReviews: queryReviews
}