const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=099af8905628aa3beefc660743b9cd5d&query=${lat},${long}&units=m`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const {
                weather_descriptions: descriptions,
                temperature,
                feelslike,
            } = body.current
            callback(
                undefined,
                `${descriptions[0]}. It is currently ${temperature} degres outside. It feels like ${feelslike} degrees`
            )
        }
    })
}

module.exports = forecast
