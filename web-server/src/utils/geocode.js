const request = require('request')

/* Address -> Lat/Long -> Weather */
/* Mapbox API */

const geocode = (address, callback) => {
  const GEOCODE_API_KEY =
    'pk.eyJ1IjoibmhpbmdvMDEiLCJhIjoiY2toMmVoamJqMGIzZzJzbXp1ajA3d204aSJ9.lpw2Onflg32FyeY-tKXVWw'
  const GEOCODE_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${GEOCODE_API_KEY}`

  request({ url: GEOCODE_URL, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (response.body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      })
    }
  })
}

module.exports = geocode
