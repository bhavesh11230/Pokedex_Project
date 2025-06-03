import './pokedex.css';
import Search from '../search/search';
import PokemonList from '../PokemonList/pokemonlist';
function Pokedex(){
    return(
        <div className='pokedex-wrapper'>
            <h1 id="pokedex-heading">Pokedex</h1>
            <Search/>
            <PokemonList/>
        </div>
    )
}

export default Pokedex;