const mapquestApiKey = 'SKeP3szrL5xhAmoFus492tZe0sNuoYU6';
const mapquestUrl = 'http://www.mapquestapi.com/geocoding/v1/address';
// ?key=SKeP3szrL5xhAmoFus492tZe0sNuoYU6&location=1301%20Lombard%20Street%20Philadelphia


const request = require('request');
const _ = require('lodash');
const yargs = require('yargs');

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
    return;
}

// using the qs parm in request encodes the query string, so do not do it here!
const queryStr = {
    key: mapquestApiKey,
    //location: encodeURIComponent(argv.a)
    location: argv.a
};
console.log(queryStr);

request({
    method: 'GET',
    url: mapquestUrl,
    qs: queryStr,
    json: true
}, (error, response, body) => {
    console.log(JSON.stringify(body, undefined, 2));
    if (error) {
        console.log('Unable to connect to MapQuest');
    } else if (!body) {
        console.log('MapQuest returned zero results');
    } else {
        console.log(`Address: ${body.results[0].locations[0].street}`);
        console.log(`City: ${body.results[0].locations[0].adminArea5}`);
        console.log(`County: ${body.results[0].locations[0].adminArea4}`);
        console.log(`State: ${body.results[0].locations[0].adminArea3}`);
        console.log(`Zip Code: ${body.results[0].locations[0].postalCode}`);
        console.log(`Country: ${body.results[0].locations[0].adminArea1}`);
        console.log(`Latitude: ${body.results[0].locations[0].displayLatLng.lat}`);
        console.log(`Longitude: ${body.results[0].locations[0].displayLatLng.lng}`);
    }
});