const request = require('request')

const geocode = (address, callback) => {
    address = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZ29uZXJlbmciLCJhIjoiY2p5aGIzN2l6MDkyejNubnNjeXB5endyYSJ9.wgzLa_KTUj_bknyA4wXkuA&limit=1`

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback(
                'Unable to find location. Please redefine your search',
                undefined
            )
        } else {
            const { place_name: location, center } = body.features[0]
            callback(undefined, {
                location,
                longitude: center[0],
                latitude: center[1],
            })
        }
    })
}

module.exports = geocode
