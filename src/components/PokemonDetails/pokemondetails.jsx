import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./pokemondetails.css"; 

function PokemonDetails(){
    const {id} = useParams(); // extracting the id from the url using useParams hook from react-router-dom
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemons(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`); // downloading the pokemon details using the id from the url
        
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name) // mapping the types to get the name of each type
        })
    }

    useEffect(()=>{
        downloadPokemons(); // calling the function to download the pokemon details
    },[]); // useEffect will run when the id changes, i.e. when the user navigates to a different pokemon details page
    
    return(
       <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={pokemon.image} alt={pokemon.name} />
            <div className="pokemon-details-name"> <span>{pokemon.name}</span> </div>
            <div className="pokemon-details-name">Height: {pokemon.height}</div>
            <div className="pokemon-details-name">Weight: {pokemon.weight}</div>
            <div className="pokemon-details-types">
                { pokemon.types && pokemon.types.map((t)=><div key={t}>{t}</div>)}
            </div>
       </div>
    )
}
export default PokemonDetails;