const axios  = require('axios');
const API_KEY = process.env.YELP_API_KEY || "none"
const _ = require('lodash');
const moment = require('moment');
async function queryReviews(city, term, limit) {
    return axios.get(`https://api.yelp.com/v3/businesses/search` , {
        params: {
            location: city,
            term: term,
            sort_by: 'best_match',
            limit: limit || '10'
        },
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    }).then(result => {
        return result.data.businesses.map(item=>{
            return {
                name: item.name,
                imageUrl: item.image_url,
                categories: item.categories.map(cat => {
                    return cat.title
                }),
                price: item.price,
                address: item.display_address,
                rating: item.rating,
                reviewCount: item.review_count
            };
        });
    });
}

module.exports = {
    queryReviews: queryReviews
}