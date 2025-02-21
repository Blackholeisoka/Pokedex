const {Pokemon} = require('../db/sequelize');
const {Op} = require('sequelize');
const {auth} = require('../auth/Auth');

module.exports = auth, (app) =>{
    app.get('/api/pokemons', (req, res) =>{
        if(req.query.param) {
            const name = req.query.name;
            if(name.length < 2){
                const message = `Le terme de recherche doit contenir au minimum 2 caractères, pas ${name.length}`;
                return res.status(400).json({message});
            }
            const limit = parseInt(req.query.limit) || 5;
            return Pokemon.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                order: ['name'],
                limit: limit 
            }).then((count, rows) =>{
                const message = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name}`;
                res.json({message, data: rows});
            })
        } else{ 
            Pokemon.findAll({order: ['name']})
                .then((p) =>{
                    const message = 'La liste de tout les pokemons on bien été récupérer';
                    res.json({message, data: p});
                }).catch(err =>{
                    const message = "La listes des pokemons n'a pas pu être trouvée"
                    res.status(500).json({message, data: err});    
            });
        }
    });
};