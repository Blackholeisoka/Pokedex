const {User} = require('../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {privateKey} = require('../auth/privateKey')

module.exports = (app) =>{
    app.post('/api/login', (req, res) =>{
        User.findOne({
            where: {
                username : req.body.username
            }
        }).then((user) =>{
            bcrypt.compare(req.body.password, user.password).then((isPasswordValid) =>{
                if(isPasswordValid){
                    const message = `L'utilisateur ${user.username} à bien été connecté avec succées`;
                    const token = jwt.sign({ userId: user.id }, privateKey, { algorithm: 'HS256', expiresIn: '10h' });
                    return res.json({message, data: user, token: token});
                } else{
                    return res.status(404).json({message: `Utilisateur: ${user.username}  non trouvé`})
                }
            }).catch(err =>{
                return res.status(401).json({message: 'Mot de passe incorrect', data: err})
            })
        });
    });
}