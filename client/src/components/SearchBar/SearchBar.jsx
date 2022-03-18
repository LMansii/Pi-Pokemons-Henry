import { React, useState } from "react";
import { useDispatch } from 'react-redux'
import { searchByName } from '../../actions/index'
import s from './SearchBar.module.css'
function check(data) {
    let errors = { valido: true }
    if (data.name === '') {
        errors.name = 'Porfavor ingrese un nombre para buscar'
        errors.valido = false
    } else if (!/^[a-zA-Z0-9\_\-\' ']{2,20}$/.test(data.name)) { // eslint-disable-line
        errors.name = 'El nombre a buscar debe de tener mas 2 caracteres!';
        errors.valido = false
    }
    return errors
}
function SearchBar() {
    const dispatch = useDispatch()
    const [pokemon, setPokemon] = useState('');
    const [errors, setError] = useState({})
    function handleChange(e) {
        e.preventDefault();
        setPokemon(e.target.value)
        setError(check({
            ...pokemon,
            [e.target.name]: e.target.value
        }))
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchByName(pokemon))
        setPokemon('')
    }

    return (
        <div>
            <div>
                <input className={s.input} name='name' type="text" placeholder="Search pokemon.." onChange={(e) => handleChange(e)} />
                <button className={s.btn} type="sumbit" disabled={!errors.valido} onClick={(e) => handleSubmit(e)}>Search</button><br />
            </div>
            {errors.name ? <span className={s.error}>{errors.name}</span> : null}
        </div>
    )
}

export default SearchBar;