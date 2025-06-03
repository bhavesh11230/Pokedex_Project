import './search.css';
function Search(){
    return(
        <div className='search-wrapper'>
            <input 
            id= "pokemon-name-search"
            type="text" 
            placeholder="pokedex name"/>
        </div>
    )
}
export default Search;