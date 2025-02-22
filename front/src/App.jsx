import { useEffect, useState } from "react";
import "./style.css";  

const App = () => {
  const [pokemons, setPokemons] = useState([]);

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

  return (
    <div className="app">
      <h1>Pokémon List</h1>
      <div className="pokemon-container">
        {pokemons.map((pokemon) => (
          <div className="card" key={pokemon.id}>
            <img className="pokemon-image" src={pokemon.picture} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <p><strong>ID:</strong> {pokemon.id}</p>
            <p><strong>Type:</strong> {pokemon.types?.join(", ") || "Unknown"}</p>
            <p><strong>HP:</strong> {pokemon.hp}</p>
            <p><strong>CP:</strong> {pokemon.cp}</p>
            <p><strong>Creation Date:</strong> {pokemon.created ? new Date(pokemon.created).toLocaleString() : "Unknown"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;