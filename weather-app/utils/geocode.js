const axios = require('axios')

/* Address -> Lat/Long -> Weather */
/* Mapbox API */

const geocode = (address, callback) => {
  const GEOCODE_API_KEY =
    'pk.eyJ1IjoibmhpbmdvMDEiLCJhIjoiY2toMmVoamJqMGIzZzJzbXp1ajA3d204aSJ9.lpw2Onflg32FyeY-tKXVWw'
  const GEOCODE_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${GEOCODE_API_KEY}`

  axios
    .get(GEOCODE_URL)
    .then((res) => {
      callback(undefined, {
        lat: res.data.features[0].center[1],
        long: res.data.features[0].center[0],
        location: res.data.features[0].place_name,
      })
    })
    .catch((error) => {
      if (error.response) {
        callback('Unable to find location. Try another search')
      } else if (error.request) {
        callback('Unable to connect to location service!')
      } else {
        callback(error.message)
      }
    })
}

module.exports = geocode
