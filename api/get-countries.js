const countries = require('../data/countries.json')

module.exports = (req, res) => {
	res.send(countries)
}
