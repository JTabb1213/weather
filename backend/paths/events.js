const eventService = require('../services/events');
function queryEvents(req, res, next) {
    eventService.queryEvents(req.query.city).then(result => {
        res.json(result);
    }).catch(next);
}

module.exports = {
    queryEvents: queryEvents
}