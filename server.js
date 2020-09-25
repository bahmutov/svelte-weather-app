if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const express = require('express')
const path = require('path')

const getWeather = require('./api/get-weather')
const getCountries = require('./api/get-countries')
const port = process.env.PORT || 5000

const app = express()

app.get('/api/countries', getCountries)
app.get('/api/weather', getWeather)

app.use(express.static('public'))

app.get('*', (req, res) => res.sendFile(path.resolve('public/index.html')))

app.listen(port)
console.log('server listening on port ', port)

