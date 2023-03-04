const request = require('postman-request')

const geocode = (address, callback) => {
    const urlGeocode = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYmFiYWxlc2h3YXJrZWRhciIsImEiOiJja3BmZTB5eGEyNWszMnpvZ25lZjZwN29uIn0.Kr2swYBrS5en7r5-yLKoNQ&limit=1`

    request({ url: urlGeocode, json: true }, (error, response) => {

        const { body } = response

        //console.log(body.features[0].center[1])
        //console.log(body.features[0].center[0])
        //console.log(body.features[0].place_name)

        if (error) {
            callback('Unable to connect to weather services!', undefined)
        }
        else if (body.error) {
            callback("Unable to find location", undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }       
    })
}

module.exports = geocode