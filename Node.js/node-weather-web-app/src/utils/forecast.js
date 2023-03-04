const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const urlWeather = `http://api.weatherstack.com/current?access_key=58075a74a626726df78188ef0bf104ce&query=${latitude},${longitude}&units=m`;

    request({ url: urlWeather, json: true }, (error, response) => {
        console.log(response.body)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (response.body.error) {
            callback("Unable to find location", undefined)
        }
        else {
            callback(undefined, {
                currentTemperature : response.body.current.temperature,
                chanceOfRain: response.body.current.precip,
                image: response.body.current.weather_icons[0],
                weatherDescriptions: response.body.current.weather_descriptions[0],
                time: response.body.current.observation_time
            })
        }       
    })
}

module.exports = forecast