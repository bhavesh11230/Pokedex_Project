import './pokedex.css';
import Search from '../search/search';
import PokemonList from '../PokemonList/pokemonlist';
function Pokedex(){
    return(
        <div className='pokedex-wrapper'>
            <Search/>
            <PokemonList/>
        </div>
    )
}

export default Pokedex;