// Global imports
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = process.env.PORT || 3000

// Express Middleware
app
.use(favicon(__dirname + '/favicon.png'))
.use(bodyParser.json())
.use(cors())

sequelize.initDb() // Initialize database

app.get('/', (req, res) => {
  res.json('Hello, Heroku! 👋')
})

// Add express routes
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

app.use(({res}) => { // 404 status
  const message = 'Unable to find the requested resource! You can try another URL.'
  res.status(404).json({message});
});

app.listen(port, () => console.log(`Our Node application is running at: http://localhost:${port}`))