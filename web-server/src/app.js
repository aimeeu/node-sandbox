//core modules
const path = require('path');
//third-party modules
const express = require('express');
const hbs = require('hbs');
//app modules
const geocode = require('./utils/geocode');
const weather = require('./utils/weather.js');

//init express
const app = express();

// template engine setup
app.set('view engine', 'hbs');
// customize to serve up static pages in public directory
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));
//hbs expects templates in a 'views' dir, so if you change name, tell app the location
const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);
// partials path
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);


// routes
// app.com
// app.com/help
// app.com/about
// app.com/weather

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'aimee'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'aimee'
    });
});

app.get('/help', (req, res) => {
    faqs = ['this the first item', 'second', 'third'];
    res.render('help', {
        title: 'Help',
        FAQs: faqs,
        name: 'aimee'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.statusCode(503).send( {
            error: "Must provide an address"
        });
    }

    //let address = '12130 W Wren Court, Milwaukee, Wisconsin';
    let address = req.query.address;
    geocode.fetchGeocode(address, (errorMessage, {latitude, longitude, location} = {} ) => {
        if (errorMessage) {
            console.log(`Fetch geocode error ${errorMessage}`);
            return res.status(503).send( {
                errorMessage
            });
        }
        //console.log(JSON.stringify(results, undefined, 2));
        console.log(`Address: ${location}`);
        console.log(`Lat: ${latitude}  Lng: ${longitude}`);
        weather.fetchWeather(latitude, longitude, (errorMsg, forecastData) => {
            if (errorMessage) {
                console.log(`Fetch weather error ${errorMessage}`);
                res.status(400).send( {
                    errorMessage
                });
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



// must be listed last; this matches anything that isn't listed above
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'aimee',
        errorMessage: 'Danger Will Robinson!'
    })
});


//start server
app.listen(3000, () => {
    console.log('server started on port 3000');
});