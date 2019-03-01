const mapquestApiKey = 'SKeP3szrL5xhAmoFus492tZe0sNuoYU6';
const mapquestUrl = 'http://www.mapquestapi.com/geocoding/v1/address';
// ?key=SKeP3szrL5xhAmoFus492tZe0sNuoYU6&location=1301%20Lombard%20Street%20Philadelphia


const request = require('request');

const fetchGeocode = (address, callback) => {
    // using the qs parm in request encodes the query string, so do not do it here!
    var queryStr = {
        key: mapquestApiKey,
        //location: encodeURIComponent(argv.a)
        location: address
    };
    //console.log(queryStr);

    request({
        method: 'GET',
        url: mapquestUrl,
        qs: queryStr,
        json: true
    }, (error, response ) => {
        //console.log(JSON.stringify(response, undefined, 2));
        if (!error && response.statusCode === 200) {
            let body = response.body;
            callback(undefined, {
                location: response.body.results[0].locations[0].street + ', ' + body.results[0].locations[0].adminArea5 + ', ' + body.results[0].locations[0].adminArea3 + '  ' + body.results[0].locations[0].postalCode,
                latitude: response.body.results[0].locations[0].displayLatLng.lat,
                longitude: response.body.results[0].locations[0].displayLatLng.lng
            })

        } else {
            callback('Unable to connect to MapQuest');
        }
    });
};


module.exports = {
    fetchGeocode
};
