// forecast.io key 06c735da55af935f11a33b4d0ea33c0f
// api endpoint:  https://api.darksky.net/forecast/[key]/[latitude],[longitude]

const request = require('request');
const apiKey = '06c735da55af935f11a33b4d0ea33c0f';

const fetchWeather = (lat, long, callback) => {
    var forecastUrl = `https://api.darksky.net/forecast/${apiKey}/${lat},${long}`;
    console.log(forecastUrl);
    request({
        method: 'GET',
        url: forecastUrl,
        json: true
    }, (error, {body}) => {
        if (error){
            callback('Unable to connect to Forecast.io servers', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined,
                ' Temp: ' + body.currently.temperature + '; Feels like: ' + body.currently.apparentTemperature + '; Forecast: ' + body.daily.summary
            );
        }
    });
};


module.exports = {
    fetchWeather
};
