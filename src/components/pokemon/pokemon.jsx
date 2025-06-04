import "./pokemon.css";
import { Link } from "react-router-dom"; // we use link component from react-router-dom to navigate between pages without reloading the page
function pokemon({name, image, id}){
    return(
        <div className="pokemon">
            <Link to={`/pokemon/${id}`}>
            <div className="pokemon-name">{name}</div>
            <div>
                <img className="pokemon-image" src={image}/>
            </div>
            </Link>
        </div>
    )
}

export default pokemon;


// we dont use anchor tag here, because it requires a full page reload, instead we use link component from react-router-dom