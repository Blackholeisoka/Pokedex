import { useEffect, useState } from "react";
import "./style.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [name, setName] = useState([]);
  const [token, setToken] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [pokemonId, setPokemonId] = useState(null);  
  const [id, setId] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: "pikachu", password: "pikachu" })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Login Data :", data);
        if (data.token) {
          setToken(data.token); // Sauvegarder le token
          fetchPokemonlist(data.token);
        } else {
          console.error("Token not received!");
        }
      })
      .catch((error) => console.error("Error during login:", error));
  }, []);

  const fetchPokemonlist = (token) => {
    fetch("http://localhost:3000/api/pokemons", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Pokémon data received:", data);
        setPokemons(data.data.slice(0, 5));
      })
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  };

  const handleInput = (e) => {
    const inputElement = e.target;
    const input = inputElement.value.toLowerCase();
    const url = `http://localhost:3000/api/pokemons`;

    if (token && input) {
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((response) => response.json())
      .then((data) => {
        const filteredPokemons = data.data.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(input)
        );
        setName(filteredPokemons.slice(0, 5));
        setShowSuggestions(filteredPokemons.length > 0);
      });
    } else {
      setShowSuggestions(false);
    }
  };

  const handleListClick = (e, n) => {
    const inputElement = e.target.closest("form").querySelector("input");
    inputElement.value = n.name;
    setName([]);
    setShowSuggestions(false);
    setId(n.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:3000/api/pokemons/${id}`;

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setPokemonId(data.data); 
    });
  };

  return (
    <div className="app">
      <h1>Pokémon List 📜</h1>
      <form className="container-form" onSubmit={(e) => handleSubmit(e, { id: pokemonId?.id })}>
        <input
          onInput={handleInput}
          name="input"
          type="text"
          placeholder="Your pokemon name here..."
          required
          autoComplete="off"
        />
        <ul style={{ display: showSuggestions ? "block" : "none" }}>
          {name.map((n) => (
            <li onClick={(e) => handleListClick(e, n)} key={n.id}>🧙‍♂️ {n.name}</li>
          ))}
        </ul>
        <button type="submit">Search 🔎</button>
      </form>

      <div className="pokemon-container">
        {pokemonId ? (
          <div>
            <div className="container-back">
                <button className="btn-back" onClick={() => window.location.reload()}> 👈  Back up</button>
            </div>
            <div className="card" key={pokemonId.id}>
              <img className="pokemon-image" src={pokemonId.picture} alt={pokemonId.name} />
              <h2> {pokemonId.name}</h2>
              <p><strong>🪪 ID:</strong>🪪 {pokemonId.id}</p>
              <p><strong>🪄 Type:</strong> {pokemonId.types?.join(", ") || "Unknown"}</p>
              <p><strong>❤️ HP:</strong> {pokemonId.hp}</p>
              <p><strong>🔥 CP:</strong> {pokemonId.cp}</p>
              <p><strong>⌚ Creation Date:</strong> {pokemonId.created ? new Date(pokemonId.created).toLocaleString() : "Unknown"}</p>
            </div>
          </div>
        ) : (
          pokemons.map((pokemon) => (
            <div className="card" key={pokemon.id}>
              <img className="pokemon-image" src={pokemon.picture} alt={pokemon.name} />
              <h2>{pokemon.name}</h2>
              <p><strong>🪪 ID:</strong> {pokemon.id}</p>
              <p><strong>🪄  Type:</strong>{pokemon.types?.join(", ") || "Unknown"}</p>
              <p><strong>❤️ HP:</strong> {pokemon.hp}</p>
              <p><strong>🔥 CP:</strong> {pokemon.cp}</p>
              <p><strong>⌚ Creation Date:</strong> {pokemon.created ? new Date(pokemon.created).toLocaleString() : "Unknown"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;