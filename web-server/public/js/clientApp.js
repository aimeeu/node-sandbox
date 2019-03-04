// client side javascript that runs in the browser
console.log('client js file loaded');

const weatherForm = document.querySelector('#formWeather');
const inputLocation = document.querySelector('#inputLocation');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');
const msg3 = document.querySelector('#message-3');
const msg4 = document.querySelector('#message-4');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = inputLocation.value;
    const url = 'http://localhost:3000/weather?address=' + location;
    console.log(location);
    msg1.textContent = 'Fetching weather...';
    msg2.textContent = '';
    msg3.textContent = '';
    msg4.textContent = '';


    fetch(url).then(function (response) {
        console.log('response.status', response.status);
        return response.json();
    }).then(function (data) {
        console.log('json body', data);
        if (data.errorMessage) {
            msg1.textContent = 'Error fetching weather: ' + data.errorMessage;
        } else {
            msg1.textContent = 'Address: ' + data.address;
            msg2.textContent = 'Temp: ' + data.currentTemp;
            msg3.textContent = 'Feels Like: ' + data.feelsLikeTemp;
            msg4.textContent = 'Forecast: ' + data.forecast;
        }
    }).catch(function (err) {
        console.log('Fetch problem: ' + err.message);
        msg3.textContent = err.message;
    });

    // fetch().then((response) => {
    //
    //     return response.text()
    // }).then((text) {
    //
    // });
    //     if (response.status === 503){
    //         msg1.textContent = "Error fetching weather";
    //         msg2.textContent = "Please check to make sure you have entered a valid location.";
    //     }
    //     response.json().then((data) => {
    //         if (data.error) {
    //             console.log(data.error);
    //             msg1.textContent = data.error;
    //         } else {
    //             msg1.textContent = 'Address: ' + data.address;
    //             msg2.textContent = 'Temp: ' + data.currentTemp;
    //             msg3.textContent = 'Feels Like: ' + data.feelsLikeTemp;
    //             msg4.textContent = 'Forecast: ' + data.forecast;
    //         }
    //     })
    // });
});

// address,
//     currentTemp: forecastData.currentTemp,
//     feelsLikeTemp: forecastData.feelsLikeTemp,
//     forecast: forecastData.forecast