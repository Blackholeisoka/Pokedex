Pokémon API

This API allows you to manage a Pokémon database using CRUD operations (Create, Read, Update, Delete). It is built with Node.js, Sequelize (ORM), and a simple database setup.

Prerequisites

Node.js

npm or yarn

Sequelize (ORM for managing the database)

Installation

Clone the repository and install the dependencies.

# Clone the repository
git clone https://github.com/Blackholeisoka/Api.git
cd Api

# Install dependencies
npm install

Configuration

Create a .env file at the root of the project and add the necessary environment variables:

PORT=3000

Starting the Server

To start the server, run the following command:

# Start the server
npm start

The server will be available at http://localhost:3000.

Project Structure

Api/
├── src/
│   ├── db/
│   │   ├── mock-pokemon.js  # Mock Pokémon data
│   │   ├── sequelize.js     # Sequelize configuration
│   ├── models/
│   │   ├── pokemon.js       # Pokémon data model
│   ├── routes/
│   │   ├── createPokemon.js # Route to create a new Pokémon
│   │   ├── deletePokemon.js # Route to delete a Pokémon
│   │   ├── findAllPokemons.js # Route to retrieve all Pokémon
│   │   ├── findPokemonByPk.js # Route to find a Pokémon by ID
│   │   ├── updatePokemon.js # Route to update a Pokémon
├── index.js                 # Main entry point
├── package.json             # Dependencies and scripts
├── .env                     # Environment variables
├── .gitignore               # Files to ignore by Git

Endpoints

Pokémon Routes

POST /pokemons: Create a new Pokémon

GET /pokemons: Retrieve all Pokémon

GET /pokemons/:id: Retrieve a Pokémon by ID

PUT /pokemons/:id: Update a Pokémon by ID

DELETE /pokemons/:id: Delete a Pokémon by ID

Tests

To run the tests, use the following command:

# Run the tests
npm test

Deployment

Deploy to a cloud platform such as Heroku, Vercel, or Render.

Use Docker for containerized execution.

Contribution

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

License

This project is licensed under the MIT License.

This updated README now provides a complete overview of the project, from installation to usage and deployment.