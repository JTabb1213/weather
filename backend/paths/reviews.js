const reviewService = require('../services/reviews');
function queryReviews(req, res, next) {
    reviewService.queryReviews(req.query.city, req.query.term, req.query.limit).then(result => {
        res.json(result);
    }).catch(next);
}

module.exports = {
    queryReviews: queryReviews
}