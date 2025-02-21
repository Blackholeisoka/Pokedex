const { Pokemon } = require('../db/sequelize');

module.exports = (app) =>{
    app.delete('/api/pokemon/:id', (req, res) =>{
        Pokemon.findByPk(req.params.id).then(_ => {
            const pokemonDelete = pokemon;
            Pokemon.destroy({
                where: {id: pokemon.id}
            }).then(_ =>{
                const message = `Le pokemon ${pokemonDelete.name} à bien été supprimer`;
                res.json({message, data: pokemonDelete});
            }).catch(err =>{
                const message = "Le pokemon n'a pas pu être supprimer"
                res.status(500).json({message, data: err});
            });
        });
    });
};