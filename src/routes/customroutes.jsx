import {Routes, Route} from 'react-router-dom';
import Pokedex from '../components/pokedex/pokedex';
import PokemonDetails from '../components/PokemonDetails/pokemondetails';
function CustomRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} /> // here id means the id of the pokemon i.e. it url will be /pokemon/1 for first pokemon
        </Routes>
    )
}
export default CustomRoutes;