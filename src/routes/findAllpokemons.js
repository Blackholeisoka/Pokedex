const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

const capitalize = (str) => str.charAt(0).toUpperCase() + str.substring(1)

module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if(req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5

      if(name.length < 2) {
        const message = `The search term must contain at least 2 characters.`
        return res.status(400).json({ message })        
      }

      return Pokemon.findAndCountAll({ 
        where: { 
          name: {
            [Op.or]: {
              [Op.like]: `%${name}%`,
              [Op.startsWith]: capitalize(name)
            }
          }
        },
        order: ['name'],
        limit: limit
      })
      .then(({count, rows}) => {
        const message = `There are ${count} Pokémon matching the search term ${name}.`
        return res.json({ message, data: rows })
      })
    } 
    else {
      Pokemon.findAll({ order: ['name'] })
      .then(pokemons => {
        const message = 'The Pokémon list has been successfully retrieved.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `The Pokémon list could not be retrieved. Please try again in a few moments.`
        res.status(500).json({ message, data: error })
      })
    }
  })
}