// Global imports
import { useEffect, useState } from "react";
import "./style.css";

const App = () => {

  // UseState
  const [pokemons, setPokemons] = useState([]); // Pokemons list data fetched from the API
  const [suggestions, setSuggestions] = useState([]); // filtered Pokémon suggestions autocompletion of <li>
  const [token, setToken] = useState(""); // Jwt token value after login
  const [showSuggestions, setShowSuggestions] = useState(false); // Display / visibility of autocompletion
  const [pokemonId, setPokemonId] = useState(null); //selected Pokémon (after search by ID)
  const [id, setId] = useState(0); // For personal id pokemon request

  // Login / Jwt
  useEffect(() => {
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "pikachu", password: "pikachu" })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          fetchPokemonList(data.token);
        } else {
          console.error("Token not received!");
        }
      })
      .catch((error) => console.error("Error during login:", error));
  }, []);

  // Get all pokemons
  const fetchPokemonList = (token) => {
    fetch("http://localhost:3000/api/pokemons", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` } // Token validation
    })
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.data.slice(0, 5));
      })
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  };

  // Get all pokemons for <li> autocompletion
  const handleInput = (e) => {
    const input = e.target.value.toLowerCase();
    if (token && input) {
      fetch("http://localhost:3000/api/pokemons", {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` } // Token validation
      })
      .then((res) => res.json())
      .then((data) => {
        const filteredPokemons = data.data.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(input)
        );
        setSuggestions(filteredPokemons.slice(0, 5));
        setShowSuggestions(filteredPokemons.length > 0);
      })
      .catch((error) => console.error("Error filtering Pokémon:", error));
    } else {
      setShowSuggestions(false);
    }
  };

  // Add suggestion of pokemons name in input
  const handleListClick = (e, n) => {
    e.target.closest("form").querySelector("input").value = n.name;
    setSuggestions([]);
    setShowSuggestions(false);
    setId(n.id);
  };
  
  // Search pokemon by id
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      console.error("No Pokémon ID selected!");
      return;
    }

    fetch(`http://localhost:3000/api/pokemons/${id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => res.json())
    .then((data) => {
      setPokemonId(data.data);
    })
    .catch((error) => console.error("Error fetching Pokémon:", error));
  };

  return (
    <div className="app">
      <h1>Pokémon List 📜</h1>

      {/*Search Form*/}
      <form className="container-form" onSubmit={handleSubmit}>
        <input
          onInput={handleInput}
          name="input"
          type="text"
          placeholder="Your Pokémon name here..."
          required
          autoComplete="off"
        />
        <ul style={{ display: showSuggestions ? "block" : "none" }}>
          {suggestions.map((n) => (
            <li onClick={(e) => handleListClick(e, n)} key={n.id}>🧙‍♂️ {n.name}</li>
          ))}
        </ul>
        <button type="submit">Search 🔎</button>
      </form>

      <div className="pokemon-container">
        {pokemonId /*If not null*/ ? (

          // Get one pokemon after search by Id
          <div>
            <div className="container-back">
              <button className="btn-back" onClick={() => window.location.reload()}> 👈 Back up</button>
            </div>
            <div className="card" key={pokemonId.id}>
              <img className="pokemon-image" src={pokemonId.picture} alt={pokemonId.name} />
              <h2>{pokemonId.name}</h2>
              <p><strong>🪪 ID:</strong> {pokemonId.id}</p>
              <p><strong>
                {pokemonId.types?.includes("Fire") ? '🔥' :
                 pokemonId.types?.includes("Water") ? '💧' :
                 pokemonId.types?.includes("Electric") ? '⚡' :
                 pokemonId.types?.includes("Grass") || pokemonId.types?.includes("Poison") ? '🟩' :
                 pokemonId.types?.includes("Fairy") ? '🍭' :
                 pokemonId.types?.includes("Flying") ? '🪽' :
                 '😁'}
                Type:</strong> {pokemonId.types?.join(", ") || "Unknown"}
              </p>
              <p><strong>{pokemonId.hp < 10 ? '❤️' : pokemonId.hp > 25 ? '❤️❤️❤️' : '❤️❤️'} HP:</strong> {pokemonId.hp}</p>
              <p><strong>{pokemonId.cp < 5 ? '🔥' : pokemonId.cp > 10 ? '🔥🔥🔥' : '🔥🔥'} CP:</strong> {pokemonId.cp}</p>
              <p><strong>⌚ Creation Date:</strong> {pokemonId.created ? new Date(pokemonId.created).toLocaleString() : "Unknown"}</p>
            </div>
          </div>
        ) : (

          // Get All pokemons 
          pokemons.map((pokemon) => (
            <div className="card" key={pokemon.id}>
              <img className="pokemon-image" src={pokemon.picture} alt={pokemon.name} />
              <h2>{pokemon.name}</h2>
              <p><strong>🪪 ID:</strong> {pokemon.id}</p>
              <p><strong>
                {pokemon.types?.includes("Fire") ? '🔥' :
                 pokemon.types?.includes("Water") ? '💧' :
                 pokemon.types?.includes("Electric") ? '⚡' :
                 pokemon.types?.includes("Grass") || pokemon.types?.includes("Poison") ? '🟩' :
                 pokemon.types?.includes("Fairy") ? '🍭' :
                 pokemon.types?.includes("Flying") ? '🪽' :
                 '😁'}
                Type:</strong> {pokemon.types?.join(", ") || "Unknown"}
              </p>
              <p><strong>{pokemon.hp < 10 ? '❤️' : pokemon.hp > 25 ? '❤️❤️❤️' : '❤️❤️'} HP:</strong> {pokemon.hp}</p>
              <p><strong>{pokemon.cp < 5 ? '🔥' : pokemon.cp > 10 ? '🔥🔥🔥' : '🔥🔥'} CP:</strong> {pokemon.cp}</p>
              <p><strong>⌚ Creation Date:</strong> {pokemon.created ? new Date(pokemon.created).toLocaleString() : "Unknown"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;