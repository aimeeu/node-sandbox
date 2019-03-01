const yargs = require('yargs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather.js');

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

//console.log(argv);
if (!argv.a) {
    console.log('missing address; aborting');
} else {
    geocode.fetchGeocode(argv.a, (errorMessage, {latitude, longitude, location}) => {
        if (errorMessage) {
            return console.log(`Fetch geocode error ${errorMessage}`);
        }
        //console.log(JSON.stringify(results, undefined, 2));
        console.log(`Address: ${location}`);
        console.log(`Lat: ${latitude}  Lng: ${longitude}`);
        weather.fetchWeather(latitude, longitude, (errorMsg, forecastData) => {
            if (errorMessage) {
                console.log(`Fetch weather error ${errorMessage}`);
            } else {
                console.log(forecastData);
            }
        });

    });
}




