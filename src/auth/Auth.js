const jwt = require('jsonwebtoken');
const {privateKey} = require('../auth/privateKey')

module.exports = (req, res, next) =>{
const authorization = req.headers.authorization;

if(!authorization){
    return res.status(401).send({message: "Le token est manquant, rajouter-le dans l'en-tête de votre requête"});
}

const token = authorization.split(' ')[1];
const decodedToken = jwt.verify(token, privateKey, (err, decodedToken) =>{
    if(err){
    return res.status(401).send({message: "L'utilisateur ne peut pas accéder à ces ressources"});
    }
});

const userId = decodedToken.userId;
if(req.body.userId && req.body.userId !== userId){
    return res.status(401).send({message: "L'identifiant de l'utilisateur est invalide"});
} else {
    next();
}
};