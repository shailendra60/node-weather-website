const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2d3e8bec8740f3dfdc82de51de6cb7a6/' + latitude +',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast










 






// const request = require('request')
// const forecast =  (latitude, longitude, callback) => {
// const url = 'https://api.darksky.net/forecast/2d3e8bec8740f3dfdc82de51de6cb7a6/' + latitude +',' + longitude

// request({ url: url, json: true }, (error, response) => {
//     if(error)
//     {
//         console.log('Unable to connect to weather services')
//     } else if (response.body.error) {
//         console.group('Unable to find location')
//     } else {
//         console.log('It is currently '+response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')

//     }
   
  
//   })
// }
// module.exports = forecast