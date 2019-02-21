const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather.js');

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

console.log(argv);
if (!argv.a) {
    console.log('missing address; aborting');
} else {
    geocode.fetchGeocode(argv.a, (errorMessage, results) => {
        if (errorMessage) {
            console.log(`Fetch geocode error ${errorMessage}`);
        } else {
            //console.log(JSON.stringify(results, undefined, 2));
            console.log(`Address: ${results.address}`);
            console.log(`Lat: ${results.lat}  Lng: ${results.lng}`);
            weather.fetchWeather(results.lat, results.lng, (errorMsg, weatherResults) => {
                if (errorMessage) {
                    console.log(`Fetch weather error ${errorMessage}`);
                } else {
                    console.log(`Temp: ${weatherResults.temperature}`);
                    console.log(`Feels like: ${weatherResults.apparentTemperature}`);
                }
            });
        }
    });
}




