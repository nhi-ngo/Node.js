const axios = require('axios')

/* Weather Stack API */

// const API_KEY = '0427ecfafd6792a67b2137eea8932d5b'
// const BASE_URL = `http://api.weatherstack.com/current?access_key=${API_KEY}`
// const params = {
//   query: '40.714,-74.006',
//   units: 'f',
// }

// axios.get(BASE_URL, { params }).then((res) => {
//   const { temperature, feelslike } = res.data.current

//   console.log(
//     `It is currently ${temperature} degrees out but it feels like ${feelslike} degrees out.`
//   )
// })

/* Address -> Lat/Long -> Weather */
/* Mapbox API */

// const GEOCODE_API_KEY =
//   'pk.eyJ1IjoibmhpbmdvMDEiLCJhIjoiY2toMmVoamJqMGIzZzJzbXp1ajA3d204aSJ9.lpw2Onflg32FyeY-tKXVWw'
// const GEOCODE_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=${GEOCODE_API_KEY}`

// axios
//   .get(GEOCODE_URL)
//   .then((res) => {
//     const lat = res.data.features[0].center[1]
//     const long = res.data.features[0].center[0]
//     console.log({ lat, long })
//   })
// .catch((error) => {
//   if (error.response) {
//     console.log('Unable to find location. Try another search')
//   } else if (error.request) {
//     console.log('Unable to connect to location service!')
//   } else {
//     console.log('Error:', error.message)
//   }
// })

const geocode = (address, callback) => {
  const GEOCODE_API_KEY =
    'pk.eyJ1IjoibmhpbmdvMDEiLCJhIjoiY2toMmVoamJqMGIzZzJzbXp1ajA3d204aSJ9.lpw2Onflg32FyeY-tKXVWw'
  const GEOCODE_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${GEOCODE_API_KEY}`

  axios
    .get(GEOCODE_URL)
    .then((res) => {
      const lat = res.data.features[0].center[1]
      const long = res.data.features[0].center[0]

      callback(undefined, { lat, long, location: res.data.features[0].place_name })
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

geocode('philadelphia', (error, data) => {
  console.log('Error:', error)
  console.log('Data:', data)
})
