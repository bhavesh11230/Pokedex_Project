import { useEffect, useState } from "react";
import axios from "axios";
import './pokemonList.css';
import Pokemon from "../pokemon/pokemon";
function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const POKEDEX_URL = 'https://pokeapi.co/api/v2/pokemon';

    async function downloadPokemons(){
        const response = await axios.get(POKEDEX_URL); // downloads list of 20 pokemons from the API
        const pokemonResults = response.data.results;

        // iterating over array of pokemon and using the url to create array of promises that will download those pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url)); // we are getting the url of each pokemon and making a request to get the data of each pokemon
        

        // passing the array of promises to axios.all
        const pokemonData = await axios.all(pokemonResultPromise) // this will return an array of responses after all promises are resolved or array we get from the API
        console.log(pokemonData); // we are getting an array of responses from the API, each response contains data of a pokemon


        // iterate on data of each pokemon and return an object with id, name, image and types
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data; // we are getting the data property of each pokemon

            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other)?pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
                types: pokemon.types
            };
        }); // we are mapping the pokemonData to get the data property of each pokemon

        console.log(pokeListResult);
        
        setPokemonList(pokeListResult);
        setIsLoading(false);

    }

    useEffect( ()=>{
        downloadPokemons();

    },[])

    
    return(
        <div className="pokemon-list-wrapper">
            <div>Pokemon List</div>
            {(isLoading)?'Loading...':
                pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id}/>)
            }
        </div>
    )
}

export default PokemonList;