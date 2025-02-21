# API REST

## Description
Cette API permet de gérer une base de données de Pokémons avec les opérations CRUD.

## Prérequis
- Node.js
- npm ou yarn
- Sequelize (ORM pour la gestion de la base de données)

## Installation
```sh
# Cloner le dépôt
git clone https://github.com/Blackholeisoka/Api.git
cd Api

# Installer les dépendances
npm install
```

## Configuration
Créez un fichier `.env` et ajoutez-y les variables d'environnement nécessaires :
```
PORT=3000
```

## Démarrage
```sh
# Démarrer le serveur
npm start
```

## Structure du projet
```
Api/
├── src/
│   ├── db/
│   │   ├── mock-pokemon.js  # Données fictives de Pokémons
│   │   ├── sequelize.js  # Configuration de Sequelize
│   ├── models/
│   │   ├── pokemon.js  # Modèle de données des Pokémons
│   ├── routes/
│   │   ├── createPokemon.js  # Route pour créer un Pokémon
│   │   ├── deletePokemon.js  # Route pour supprimer un Pokémon
│   │   ├── findAllPokemons.js  # Route pour récupérer tous les Pokémons
│   │   ├── findPokemonByPk.js  # Route pour trouver un Pokémon par son ID
│   │   ├── updatePokemon.js  # Route pour mettre à jour un Pokémon
├── index.js  # Point d'entrée principal
├── package.json  # Dépendances et scripts
├── .env  # Variables d'environnement
├── .gitignore  # Fichiers à ignorer par Git
```

## Endpoints

### Pokémons
- `POST /pokemons` : Créer un nouveau Pokémon
- `GET /pokemons` : Récupérer tous les Pokémons
- `GET /pokemons/:id` : Récupérer un Pokémon par ID
- `PUT /pokemons/:id` : Mettre à jour un Pokémon
- `DELETE /pokemons/:id` : Supprimer un Pokémon

## Tests
```sh
# Exécuter les tests
npm test
```

## Déploiement
- Déploiement sur une plateforme cloud (ex. Heroku, Vercel, Render)
- Utilisation de Docker pour une exécution conteneurisée

## Contribution
Les contributions sont les bienvenues. Merci de suivre les règles de contribution et de soumettre une pull request.

## Licence
MIT