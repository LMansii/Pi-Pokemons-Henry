import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons, getTypes } from '../../actions'
import { Link, useHistory } from 'react-router-dom'
import { postPokemon } from '../../actions';


function validate(newPokemon) {
    let errors = {};
    if (!newPokemon.name) {
        errors.name = 'Name is required'
    } else if (!newPokemon.life || isNaN(newPokemon.life)) {
        errors.life = 'Life is required'
    } else if (!newPokemon.attack || isNaN(newPokemon.attack)) {
        errors.attack = 'Attack is required'
    } else if (!newPokemon.speed || isNaN(newPokemon.speed)) {
        errors.speed = 'Speed is required'
    } else if (!newPokemon.defense || isNaN(newPokemon.defense)) {
        errors.defense = 'Defense is required'
    } else if (!newPokemon.height || isNaN(newPokemon.height)) {
        errors.height = 'Height  is required'
    } else if (!newPokemon.weight || isNaN(newPokemon.weight)) {
        errors.weight = 'Weight  is required'
    }else if(!/^[1-9][0-9]?$|^100$/g.test(newPokemon.life)){
        errors.life = 'Life is required and must be in a range from 1 - 100'
    } else if (!newPokemon.type) {
        errors.type = 'Type is required';
    }
    return errors;
}

// function deleteSelect(poke, selec) {
//     if (poke.includes(selec)) {
//         const arr = poke.filter((n) => n !== selec);
//         return arr
//     } else {
//         const arr2 = poke.concat(selec);
//         return arr2
//     }
// }


function Formulario() {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const history = useHistory()
    const [errors, setErrors] = useState({})
    const [newPokemon, setNewPokemon] = useState({
        name: "",
        img: '',
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        type: []
    })
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    function handleInputChange(e) {
        e.preventDefault()
        setNewPokemon({
            ...newPokemon,
            [e.target.name]: e.target.value.toLowerCase(),
            [e.target.type]: e.target.value,
            [e.target.life]: e.target.value,
            [e.target.attack]: e.target.value,
            [e.target.defense]: e.target.value,
            [e.target.speed]: e.target.value,
            [e.target.height]: e.target.value,
            [e.target.weight]: e.target.value,
            [e.target.img]: e.target.value,
        });
        setErrors(validate({ ...newPokemon, [e.target.name]: e.target.value }));
    }

    function handleChangeType(e) {
        e.preventDefault()
        // setNewPokemon({ ...newPokemon, type: deleteSelect(newPokemon.type, e.target.value) })
        let arrTypes = newPokemon.type;
        if(arrTypes.includes(e.target.value)){
            arrTypes = arrTypes.filter((id) => id !== e.target.value)
        }else{
            arrTypes.push(e.target.value)
        }
        console.log('TIPOS ACA',arrTypes)
        setNewPokemon({
            ...newPokemon,
            type: arrTypes
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(newPokemon, 'CREADO')
        dispatch(postPokemon(newPokemon))
        dispatch(getAllPokemons())
        alert('Pokemon creado con Exito!')
        setNewPokemon({
            name: "",
            img: '',
            life: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            type: []
        });
        history.push('/home')
    }
    return (
        <div>
            <form onSubmit={((e) => handleSubmit(e))}>
                <div>
                    <div>
                        <h1>Create NEW Pokemon</h1>
                    </div>
                    <div>
                        <label>Nombre: </label>
                        <input
                            name='name'
                            type="text"
                            value={newPokemon.name}
                            onChange={((e) => handleInputChange(e))} />
                        {errors.name && <p color='red'>{errors.name}</p>}
                    </div>

                    <div>
                        <label>Imagen: </label>
                        <input
                            name='img'
                            type="url"
                            value={newPokemon.img}
                            onChange={((e) => handleInputChange(e))} />
                    </div>

                    <div>
                        <label>Vida: </label>
                        <input
                            name='life'
                            type="number"
                            value={newPokemon.life}
                            onChange={((e) => handleInputChange(e))} />
                        {errors.life && <p color='red'>{errors.life}</p>}
                    </div>

                    <div>
                        <label>Fuerza: </label>
                        <input
                            name='attack'
                            type="number"
                            value={newPokemon.attack}
                            onChange={((e) => handleInputChange(e))} />
                        {errors.attack && <p color='red'>{errors.attack}</p>}
                    </div>

                    <div>
                        <label>Defensa: </label>
                        <input
                            name='defense'
                            type="number"
                            value={newPokemon.defense}
                            onChange={((e) => handleInputChange(e))} />
                        {errors.defense && <p color='red'>{errors.defense}</p>}
                    </div>

                    <div>
                        <label>Velocidad: </label>
                        <input
                            name='speed'
                            type="number"
                            value={newPokemon.speed}
                            onChange={((e) => handleInputChange(e))} />
                        {errors.speed && <p color='red'>{errors.speed}</p>}
                    </div>

                    <div>
                        <label>Altura: </label>
                        <input
                            name='height'
                            type="number"
                            value={newPokemon.height}
                            onChange={((e) => handleInputChange(e))} />
                        {errors.height && <p color='red'>{errors.height}</p>}
                    </div>

                    <div>
                        <label>Peso: </label>
                        <input
                            name='weight'
                            type="number"
                            value={newPokemon.weight}
                            onChange={((e) => handleInputChange(e))} />
                        {errors.weight && <p color='red'>{errors.weight}</p>}
                    </div>
                </div>

                <div>
                    {types?.map((type, index) => (
                        <div key={index}>
                            <div>
                                <label>{type.name}</label>
                                <input
                                    type="checkbox"
                                    name={type.id}
                                    value={type.name}
                                    onChange={((e) => handleChangeType(e))} />
                            </div>
                        </div>
                    ))
                    }
                </div>

                <div>
                    <button type='submit'>
                        create
                    </button>

                    <div>
                        <Link to='/home'>
                            <button>
                                Go Back!
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Formulario