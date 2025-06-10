import { useEffect, useState } from "react";
import axios from "axios";
import './pokemonList.css';
import Pokemon from "../pokemon/pokemon";

function PokemonList() {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''
    });

    async function downloadPokemons() {
        setPokemonListState(prevState => ({ ...prevState, isLoading: true })); // Use functional update
        try {
            const response = await axios.get(pokemonListState.pokedexUrl);
            const pokemonResults = response.data.results;

            console.log("API Response Data:", response.data);
            console.log("Pokemon Results (before map):", pokemonResults);

            // Defensive check for pokemonResults before mapping
            if (!pokemonResults || !Array.isArray(pokemonResults)) {
                console.error("Error: 'results' is not an array or is undefined in API response.", response.data);
                setPokemonListState(prevState => ({ ...prevState, isLoading: false }));
                return; // Exit the function if data is invalid
            }

            setPokemonListState(prevState => ({
                ...prevState,
                nextUrl: response.data.next,
                prevUrl: response.data.previous
            }));

            // Create promises for individual pokemon data
            const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

            // Resolve all promises to get detailed pokemon data
            const pokemonData = await axios.all(pokemonResultPromise);
            console.log("Individual Pokemon Data:", pokemonData);

            // Process the detailed pokemon data
            const pokeListResult = pokemonData.map((pokeData) => {
                const pokemon = pokeData.data;

                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: (pokemon.sprites.other && pokemon.sprites.other.dream_world.front_default)
                        ? pokemon.sprites.other.dream_world.front_default
                        : pokemon.sprites.front_shiny, // Fallback if dream_world is not available
                    types: pokemon.types
                };
            });

            console.log("Formatted Pokemon List:", pokeListResult);

            // Update state with the new pokemon list and set loading to false
            setPokemonListState(prevState => ({
                ...prevState,
                pokemonList: pokeListResult,
                isLoading: false
            }));

        } catch (error) {
            console.error("Error downloading Pokemons:", error);
            // Set loading to false and clear pokemon list on error
            setPokemonListState(prevState => ({
                ...prevState,
                pokemonList: [], // Clear list on error or keep previous?
                isLoading: false
            }));
            // Optionally, you might want to show an error message to the user here
        }
    }

    // useEffect hook to call downloadPokemons when pokedexUrl changes
    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl]); // Dependency array: re-run effect when pokedexUrl changes

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {pokemonListState.isLoading ? (
                    'Loading...'
                ) : (
                    // Render Pokemon components if not loading
                    pokemonListState.pokemonList.map((p) => (
                        <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
                    ))
                )}
            </div>
            <div className="controls">
                <button
                    disabled={pokemonListState.prevUrl === null} // Disable if no previous URL
                    onClick={() => setPokemonListState(prevState => ({ ...prevState, pokedexUrl: prevState.prevUrl }))}
                >
                    Prev
                </button>
                <button
                    disabled={pokemonListState.nextUrl === null} // Disable if no next URL
                    onClick={() => setPokemonListState(prevState => ({ ...prevState, pokedexUrl: prevState.nextUrl }))}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default PokemonList;