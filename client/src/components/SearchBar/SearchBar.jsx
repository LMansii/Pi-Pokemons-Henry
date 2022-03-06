import {React, useState} from "react";
import {useDispatch} from 'react-redux'
import {searchByName} from '../../actions/index'

function SearchBar() {
    const dispatch = useDispatch()
    const [pokemon, setPokemon] = useState('');
    
    function handleChange(e){
        e.preventDefault();
        setPokemon(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchByName(pokemon))
        //dispatch(nameSearchBar(pokemon))
    }
    
    return (
        <div>
            <input type="text" placeholder="Search pokemon.." onChange={(e) => handleChange(e)}/>
            <button type="sumbit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}

export default SearchBar;