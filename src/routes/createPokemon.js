const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.post('/api/pokemons', auth, (req, res) => {

      // SQL: ```INSERT INTO POKEMONS (name, hp, cp, picture, types) VALUES (?, ?, ?, ?, ?)```
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `The Pokémon ${req.body.name} has been successfully created.`
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: 'The username is already taken.', data: error });
        }
        const message = `The Pokémon could not be added. Please try again in a few moments.`
        res.status(500).json({ message, data: error })
      })
  })
}