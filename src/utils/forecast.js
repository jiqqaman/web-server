const request = require('request')

const forecast = (lat, long, callback) => {
    const url = String('https://api.darksky.net/forecast/1d2110258e785f591241956af2040922/'+ lat +','+ long + '')

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +' degrees out. There is a '+ body.currently.precipProbability +'% chance of rain with a high of ' + body.daily.data[0].temperatureHigh + ' degrees and a low of ' + body.daily.data[0].temperatureLow + ' degrees.' 
            )
        }
    })
}

module.exports = forecast