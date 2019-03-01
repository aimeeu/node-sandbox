//core modules
const path = require('path');
//third-party modules
const express = require('express');
//app modules
const geocode = require('./utils/geocode');
const weather = require('./utils/weather.js');

//init express
const app = express();

// customize to serve up static pages in public directory
app.use(express.static(path.join(__dirname, '../public')));

// static routes served from public dir:
// app.com
// app.com/help
// app.com/about

// dynamic routes:
// app.com/weather

app.get('/weather', (req, res) => {
    let address = '12130 W Wren Court, Milwaukee, Wisconsin';
    geocode.fetchGeocode(address, (errorMessage, {latitude, longitude, location}) => {
        if (errorMessage) {
            console.log(`Fetch geocode error ${errorMessage}`);
            res.status(503).send(`Error fetching location: ${errorMessage}`);
            return;
        }
        //console.log(JSON.stringify(results, undefined, 2));
        console.log(`Address: ${location}`);
        console.log(`Lat: ${latitude}  Lng: ${longitude}`);
        weather.fetchWeather(latitude, longitude, (errorMsg, forecastData) => {
            if (errorMessage) {
                console.log(`Fetch weather error ${errorMessage}`);
                res.status(503).send(`Fetch weather error: ${errorMessage}`);
            } else {
                console.log(forecastData);
                body = {
                    address,
                    currentTemp: forecastData.currentTemp,
                    feelsLikeTemp: forecastData.feelsLikeTemp,
                    forecast: forecastData.forecast
                };
                res.status(200).send(body);
            }
        });

    });
});


//start server
app.listen(3000, () => {
    console.log('server started on port 3000');
});