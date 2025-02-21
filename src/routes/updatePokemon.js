const {Pokemon} = require('../db/sequelize');
const {auth} = require('../auth/Auth');

module.exports = auth, (app) =>{
    app.put('/api/pokemon/:id', (req, res) =>{
        const id = req.params.id;
        Pokemon.update(req.body, {
            where: {id: id},
        }).then(_ =>{
           return  Pokemon.findByPk(id).then((pokemon) =>{
                if(!pokemon){
                    const message = `Le pokemon ${pokemon.name} n'existe pas`;
                    res.status(404).json({message});
                }
                const message = `Le pokemon ${pokemon.name} à bien été modifier`;
                res.json({message, data: pokemon});
            }).catch(err =>{
                const message = "Le pokemon n'a pas pu être modifier"
                res.status(500).json({message, data: err});
            });
        });
    });
};