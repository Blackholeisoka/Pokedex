const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons/:id', auth, (req, res) => {

      // SQL: ```SELECT * FROM POKEMONS WHERE ID = (?)```
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null) {
          const message = `The requested Pokémon does not exist. Please try again with another ID.`
          return res.status(404).json({ message })
        }

        const message = 'A Pokémon has been found successfully.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = `The Pokémon could not be retrieved. Please try again in a few moments.`
        res.status(500).json({ message, data: error })
      })
  })
}