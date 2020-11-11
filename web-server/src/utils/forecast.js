const request = require('request')

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

  request({ url: URL, json: true, qs: params }, (error, response) => {
    const { region, country } = response.body.location
    const { temperature, feelslike } = response.body.current
    const descriptions = arrayToString(response.body.current.weather_descriptions)

    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (response.body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(
        undefined,
        `It is ${descriptions} in ${region} - ${country}. The temperature is ${temperature} degrees but feels like ${feelslike} degrees.`
      )
    }
  })
}

module.exports = forecast
