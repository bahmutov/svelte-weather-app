const fetch = require('node-fetch')

const API_KEY = process.env.WEATHER_KEY

const defaults = {
	city: 'charleston,sc',
	country: 'us'
}

module.exports = (req, res) => {
	const qs = {...defaults, city: req.query.city, country: req.query.country }
  fetch(`https://api.weatherbit.io/v2.0/current?city=${qs.city}&country=${qs.country}&key=${API_KEY}`)
	  .then(res => res.json())
		.then(result => result.count === 1 ? result.data[0] : {message: 'no data'} )
    .then(res.send.bind(res))

	//res.send({ temp: '74' })
}
