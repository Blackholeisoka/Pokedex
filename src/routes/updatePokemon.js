const { Pokemon } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.put('/api/pokemons/:id', auth, (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {

      // SQL: ```UPDATE POKEMONS SET (?) = (?) WHERE ID = (?);```
      return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon === null) {
          const message = `The requested Pokémon does not exist. Please try again with another ID.`
          return res.status(404).json({ message })
        }

        const message = `The Pokémon ${pokemon.name} has been successfully updated.`
        res.json({ message, data: pokemon })
      })
    })
    .catch(error => {
      if(error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if(error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: 'The Pokémon name is already taken.', data: error });
      }
      const message = `The Pokémon could not be updated. Please try again in a few moments.`
      res.status(500).json({ message, data: error })
    })
  })
}