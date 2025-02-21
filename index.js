// Importation de modules interne et externe
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const sequelize = require('./src/db/sequelize.js');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

sequelize.initDb();

// Middleware
app
    .use(favicon(path.join(__dirname, 'favicon.png')))
    .use(morgan('dev'))
    .use(bodyParser.json()); 

require('./src/routes/findAllpokemons.js')(app);
require('./src/routes/findPokemonsByPk.js')(app);
require('./src/routes/createPokemon.js')(app);
require('./src/routes/updatePokemon.js')(app);
require('./src/routes/deletePokemon.js')(app);

app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message});
}); 

// Ecoute et lançement du serveur
app.listen(port, () =>{
    console.log(`Server start in : http://localhost:${port}`);
});