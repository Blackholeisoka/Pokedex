Pokémon API

This API allows you to manage a Pokémon database using CRUD operations (Create, Read, Update, Delete). It is built with Node.js, Sequelize (ORM), and a simple database setup.

Prerequisites

<<<<<<< HEAD
Node.js
=======
````Node.js````
>>>>>>> 21b4e6ca6b0ec46ef29beed06d40537d7cc2506d

npm or yarn

Sequelize (ORM for managing the database)

Installation

Clone the repository and install the dependencies.
<<<<<<< HEAD

=======
````
>>>>>>> 21b4e6ca6b0ec46ef29beed06d40537d7cc2506d
# Clone the repository
git clone https://github.com/Blackholeisoka/Api.git
cd Api

# Install dependencies
npm install
<<<<<<< HEAD

Configuration

Create a .env file at the root of the project and add the necessary environment variables:

PORT=3000

Starting the Server
=======
````
Configuration

Create a ````.env file```` at the root of the project and add the necessary environment variables:

````PORT=3000````

Starting the Server 
>>>>>>> 21b4e6ca6b0ec46ef29beed06d40537d7cc2506d

To start the server, run the following command:

# Start the server
npm start
<<<<<<< HEAD

The server will be available at http://localhost:3000.

Project Structure

=======
````
The server will be available at http://localhost:3000.
````
Project Structure
````
>>>>>>> 21b4e6ca6b0ec46ef29beed06d40537d7cc2506d
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
<<<<<<< HEAD

Endpoints

Pokémon Routes

=======
````
Endpoints

Pokémon Routes
````
>>>>>>> 21b4e6ca6b0ec46ef29beed06d40537d7cc2506d
POST /pokemons: Create a new Pokémon

GET /pokemons: Retrieve all Pokémon

GET /pokemons/:id: Retrieve a Pokémon by ID

PUT /pokemons/:id: Update a Pokémon by ID

DELETE /pokemons/:id: Delete a Pokémon by ID
<<<<<<< HEAD

=======
````
>>>>>>> 21b4e6ca6b0ec46ef29beed06d40537d7cc2506d
Tests

To run the tests, use the following command:

# Run the tests
<<<<<<< HEAD
npm test
=======
````npm test````
>>>>>>> 21b4e6ca6b0ec46ef29beed06d40537d7cc2506d

Deployment

Deploy to a cloud platform such as Heroku, Vercel, or Render.

Use Docker for containerized execution.

<<<<<<< HEAD
=======
Contribution

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

License

This project is licensed under the ````MIT License.````

This updated README now provides a complete overview of the project, from installation to usage and deployment.
Deployment on a cloud platform (e.g., Heroku, Vercel, Render)
Use Docker for a containerized execution
>>>>>>> 21b4e6ca6b0ec46ef29beed06d40537d7cc2506d
Contribution

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

License
<<<<<<< HEAD

This project is licensed under the MIT License.

This updated README now provides a complete overview of the project, from installation to usage and deployment.
=======
````MIT````
>>>>>>> 21b4e6ca6b0ec46ef29beed06d40537d7cc2506d
