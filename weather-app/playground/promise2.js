const mapquestApiKey = 'SKeP3szrL5xhAmoFus492tZe0sNuoYU6';
const mapquestUrl = 'http://www.mapquestapi.com/geocoding/v1/address';
// ?key=SKeP3szrL5xhAmoFus492tZe0sNuoYU6&location=1301%20Lombard%20Street%20Philadelphia

const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var queryStr = {
            key: mapquestApiKey,
            location: address
        };
        request({
            method: 'GET',
            url: mapquestUrl,
            qs: queryStr,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve({
                    address: body.results[0].locations[0].street + ', ' + body.results[0].locations[0].adminArea5 + ', ' + body.results[0].locations[0].adminArea3 + '  ' + body.results[0].locations[0].postalCode,
                    lat: body.results[0].locations[0].displayLatLng.lat,
                    lng: body.results[0].locations[0].displayLatLng.lng
                });
            } else {
                reject('Unable to connect to MapQuest');
            }
        });

    });
};

geocodeAddress('0000').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});