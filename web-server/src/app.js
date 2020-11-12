const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and view location
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
app.set('views', viewsPath)

// set up static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  // render a view template
  res.render('index', {
    title: 'Weather',
    body: 'Use this site to get your weather!',
    name: 'Nhi Ngo',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    body: 'Accountant turned web developer',
    name: 'Nhi Ngo',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    })
  }

  // destructuring empty object by default
  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        location,
        forecast: forecastData,
        address: req.query.address,
      })
    })
  })
})

app.get('/weather/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Nhi Ngo',
    errorMessage: 'Weather article not found',
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    })
  }

  res.send({
    products: [],
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Nhi Ngo',
    errorMessage: 'Page not found.',
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
