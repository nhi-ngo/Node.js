const axios = require('axios')

const forecast = (lat, long, callback) => {
  const API_KEY = '0427ecfafd6792a67b2137eea8932d5b'
  const URL = `http://api.weatherstack.com/current?access_key=${API_KEY}`

  const params = {
    query: `${lat},${long}`,
    units: 'f',
  }

  const arrayToString = (dataArray) => {
    const array = []
    let resultString

    if (dataArray !== undefined) {
      dataArray.forEach((item) => array.push(item))
    }

    resultString = array.join(', ')

    return resultString
  }

  axios
    .get(URL, { params })
    .then((res) => {
      const { region, country } = res.data.location
      const { temperature, feelslike } = res.data.current
      const descriptions = arrayToString(res.data.current.weather_descriptions)

      callback(
        undefined,
        `It is ${descriptions} in ${region} - ${country}. The temperature is ${temperature} degrees but feels like ${feelslike} degrees.`
      )
    })
    .catch((error) => {
      if (error.response) {
        callback('Unable to find location. Try another search')
      } else if (error.request) {
        callback('Unable to connect to weather service!')
      } else {
        callback(error.message)
      }
    })
}

module.exports = forecast
