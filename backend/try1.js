//import pkg from 'pg';
const axios  = require('axios');


axios.get('https://app.ticketmaster.com/discovery/v2/events?city=Chicago&apikey=1AN7L3M4BCM3AMiuIT2SMW4lS1XxnuW7' , {

}).then(result => {
        console.log('Result: ', result);
})