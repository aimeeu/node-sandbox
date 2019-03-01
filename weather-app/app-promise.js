const yargs = require('yargs');
const axios = require('axios');

const mapquestApiKey = 'SKeP3szrL5xhAmoFus492tZe0sNuoYU6';
const forecastApiKey = '06c735da55af935f11a33b4d0ea33c0f';

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'address in single quotes',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

//var encodedAddr = encodeURIComponent(argv.a);
const mapquestUrl = 'http://www.mapquestapi.com/geocoding/v1/address';

axios.get(mapquestUrl
    , {
    params: {
        key: mapquestApiKey,
        location: argv.a
    }
}
).then((response) => {
    if (response.status !== 200) {
        throw new Error('Unable to find that location');
    }
    //console.log('mapquest response data', JSON.stringify(response.data));
    var lat = response.data.results[0].locations[0].displayLatLng.lat;
    var lng = response.data.results[0].locations[0].displayLatLng.lng;
    var forecastUrl = `https://api.darksky.net/forecast/${forecastApiKey}/${lat},${lng}`;

    console.log('Address: ', response.data.results[0].locations[0].street + ', ' + response.data.results[0].locations[0].adminArea5 + ', ' + response.data.results[0].locations[0].adminArea3 + '  ' + response.data.results[0].locations[0].postalCode);
    console.log('forecastUrl', forecastUrl);
    return axios.get(forecastUrl);
}).then((response) => {
    //process call to get weather
    //console.log('forecast response data', JSON.stringify(response.data));
    console.log(`Temp: ${response.data.currently.temperature}`);
    console.log(`Feels like: ${response.data.currently.apparentTemperature}`);
    console.log(`Forecast: ${response.data.daily.summary}`);
}).catch((e) => {
    console.log('Unable to fetch weather', e);
});
