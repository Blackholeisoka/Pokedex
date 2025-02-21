const {Pokemon} = require('../db/sequelize');

module.exports = (app) =>{
    app.get('/api/pokemons', (req, res) =>{
        Pokemon.findAll()
            .then((p) =>{
                const message = 'La liste de tout les pokemons on bien été récupérer';
                res.json({message, data: p});
            }).catch(err =>{
                const message = "La listes des pokemons n'a pas pu être trouvée"
                res.status(500).json({message, data: err});
            });
    });
};