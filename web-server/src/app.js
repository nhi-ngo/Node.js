const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  // render a view template
  res.render('index', {
    title: 'My New Post',
    body: 'This is my first post!',
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
  res.send('Your weather')
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
