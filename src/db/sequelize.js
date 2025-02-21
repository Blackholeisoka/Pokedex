const {Sequelize, DataTypes} = require('sequelize');
let pokemons = require('./mock-pokemon.js');
const PokemonModel = require('../models/pokemon.js');
const UserModel = require('../models/user.js');
const bcrypt = require('bcrypt');
require('dotenv').config()

// Base de données
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    { 
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging : false
    }
)

// Connection à la base de données
sequelize.authenticate()
    .then(_ => console.log('Connection à la base de données avec succées'))
    .catch(error => console.log('Impossible de ce connecter à la base de données', error))

// Models 
const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

// Syncronisation avec la base de données
const initDb = async () =>{

    return sequelize.sync({ force: true })
    .then(() => {
        console.log('La base de données pokedex a bien été synchronisée');
        pokemons.map((p) =>{
            Pokemon.create({
                name: p.name,
                hp: p.hp,
                cp: p.cp,
                picture: p.picture,
                types: p.types,
            }).then(name => console.log(name.toJSON()));
        });
        
        bcrypt.hash('pikachu', 10)
            .then(hash => 
                User.create({
                    username: 'pikachu',
                    password: hash,
                }).then(user => console.log(user.toJSON()))
        )
    });
}

    module.exports = {
        initDb, Pokemon, User
    }