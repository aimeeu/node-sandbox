// forecast.io key 06c735da55af935f11a33b4d0ea33c0f
// api endpoint:  https://api.darksky.net/forecast/[key]/[latitude],[longitude]

const request = require('request');
const apiKey = '06c735da55af935f11a33b4d0ea33c0f';

var fetchWeather = (lat, long, callback) => {
    var forecastUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${long}`;
    console.log(forecastUrl);
    request({
        method: 'GET',
        url: forecastUrl,
        json: true
    }, (error, response, body) => {
        console.log(JSON.stringify(body, undefined, 2));
        if (! error && response.statusCode === 200) {
            //the structure of the callback is defined in app.js
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to connect to Forecast.io servers');
        }
    });
};


module.exports = {
    fetchWeather
};
