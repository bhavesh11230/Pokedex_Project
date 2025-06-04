import { useEffect, useState } from "react";
import axios from "axios";
import './pokemonList.css';
import Pokemon from "../pokemon/pokemon";
function PokemonList(){

    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemons(){
        setIsLoading(true); // setting loading to true before downloading pokemons
        const response = await axios.get(pokedexUrl); // downloads list of 20 pokemons from the API
        const pokemonResults = response.data.results;
        console.log(response.data); // we are getting the data property of the response which contains the list of pokemons
        

        setNextUrl(response.data.next); // setting the next url to get the next 20 pokemons
        setPrevUrl(response.data.previous); 


        // iterating over array of pokemon and using the url to create array of promises that will download those pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url)); 
        

        // passing the array of promises to axios.all
        const pokemonData = await axios.all(pokemonResultPromise) 
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

    },[pokedexUrl]);


    return(
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                {(isLoading)?'Loading...':
                    pokemonList.map((p)=><Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)
                }
            </div>
            <div className="controls">
                <button disabled={prevUrl == null} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled={nextUrl == null} onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
            </div>
                
        </div>
    )
}

export default PokemonList;