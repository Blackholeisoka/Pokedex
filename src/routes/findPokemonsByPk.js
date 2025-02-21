const {Pokemon} = require('../db/sequelize');

module.exports = (app) =>{
    app.get('/api/pokemons/:id', (req, res) =>{
        Pokemon.findByPk(req.params.id)
            .then((pokemon) =>{
                const message = `Le pokemon ${pokemon.name} à bien été trouvé`;
                res.json({message, data: pokemon});
            }).catch(err =>{
                const message = "Le pokemon n'a pas pu être trouvé"
                res.status(500).json({message, data: err});
            });
    });
};