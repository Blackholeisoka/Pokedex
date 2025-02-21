const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.delete('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {        
        if(pokemon === null) {
          const message = `The requested Pokémon does not exist. Please try again with another ID.`
          return res.status(404).json({ message })
        }

        return Pokemon.destroy({ where: { id: pokemon.id } })
        .then(_ => {
          const message = `The Pokémon with ID ${pokemon.id} has been successfully deleted.`
          res.json({ message, data: pokemon })
        })
      })
      .catch(error => {
        const message = `The Pokémon could not be deleted. Please try again in a few moments.`
        res.status(500).json({ message, data: error })
      })
  })
}