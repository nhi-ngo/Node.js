const http = require('http')

const API_KEY = '0427ecfafd6792a67b2137eea8932d5b'
const URL = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=45,-75&units=f`

const request = http.request(URL, (response) => {
  response.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`)
  })

  response.on('end', () => {
    console.log('No more data in response')
  })
})

request.on('error', (e) => {
  console.error(`problem with request: ${e.message}`)
})

request.end()
