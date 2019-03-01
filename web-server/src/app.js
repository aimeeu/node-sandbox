const express = require('express');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather.js');

const app = express();

// routes:
// app.com
// app.com/help
// app.com/about
// app.com/weather

app.get('', (req, res) => {
    res.send('<h1>Hello Express!</h1>');
});


app.get('/help', (req, res) => {
    let body = [
        {
            name: 'aimee',
            age: 51
        },
        {
            name: 'bubba',
            age: 4
        }
    ];
    res.status(200).send(body);
});


app.get('/about', (req, res) => {
    res.send('<h1>About Us</h1>');
});

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