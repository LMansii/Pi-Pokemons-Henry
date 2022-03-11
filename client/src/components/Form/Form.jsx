import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons, getTypes } from '../../actions'
import { Link, useHistory } from 'react-router-dom'
import { postPokemon } from '../../actions';
import s from './Form.module.css'


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
    } else if (!/^[1-9][0-9]?$|^100$/g.test(newPokemon.life)) {
        errors.life = 'Life is required and must be in a range from 1 - 100'
    } else if (!newPokemon.type) {
        errors.type = 'Type is required';
    }
    return errors;
}

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
        //e.preventDefault()
        // setNewPokemon({ ...newPokemon, type: deleteSelect(newPokemon.type, e.target.value) })
        let arrTypes = newPokemon.type;
        if (arrTypes.includes(e.target.value)) {
            arrTypes = arrTypes.filter((id) => id !== e.target.value)
        } else {
            arrTypes.push(e.target.value)
        }
        console.log('TIPOS ACA', arrTypes)
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
        <div className={s.container}>
            <form onSubmit={((e) => handleSubmit(e))}>
                <div>
                    <div className={s.title}>
                        <h1>Create NEW Pokemon</h1>
                    </div>
                    <div className={s.todosInputs}>
                        <div>
                            <label className={s.label} >Nombre: </label> <br />
                            <input
                                name='name'
                                type="text"
                                value={newPokemon.name}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.name && <p color='red'>{errors.name}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Imagen: </label><br />
                            <input
                                name='img'
                                type="url"
                                value={newPokemon.img}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                        </div>

                        <div>
                            <label className={s.label}>Vida: </label><br />
                            <input
                                name='life'
                                type="number"
                                value={newPokemon.life}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.life && <p color='red'>{errors.life}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Fuerza: </label><br />
                            <input
                                name='attack'
                                type="number"
                                value={newPokemon.attack}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.attack && <p color='red'>{errors.attack}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Defensa: </label><br />
                            <input
                                name='defense'
                                type="number"
                                value={newPokemon.defense}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.defense && <p color='red'>{errors.defense}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Velocidad: </label><br />
                            <input
                                name='speed'
                                type="number"
                                value={newPokemon.speed}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.speed && <p color='red'>{errors.speed}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Altura: </label><br />
                            <input
                                name='height'
                                type="number"
                                value={newPokemon.height}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.height && <p color='red'>{errors.height}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Peso: </label><br />
                            <input
                                name='weight'
                                type="number"
                                value={newPokemon.weight}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.weight && <p color='red'>{errors.weight}</p>}
                        </div>
                    </div>
                </div>
                <br />
                <div className={s.divTypes}>
                    {types?.map((type, index) => (
                        <div className={s.hijoDivTypes} key={index}>
                            <div className={s.divTypemap}>
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
                <div className={s.btns}>
                    <div>
                        <button type='submit' className={s.btnCreate}>
                            Create
                        </button>

                        <div>
                            <Link to='/home'>
                                <button className={s.goBack}>
                                    Go Back!
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Formulario