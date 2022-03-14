import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons, getTypes } from '../../actions'
import { Link, useHistory } from 'react-router-dom'
import { postPokemon } from '../../actions';
import s from './Form.module.css'


function validate(newPokemon) {
    let errors = { valido: true };
    //INPUT NAME
    if (newPokemon.name === '') {
        errors.name = 'Name is required'
        errors.valido = false
    } else if (!/^[a-zA]{2,20}$/.test(newPokemon.name)) {
        errors.name = 'Must have minimum 2 characters!'
        errors.valido = false
    }
    //INPUT IMAGE
    if (newPokemon.img === '') {
        errors.img = 'Image is required'
        errors.valido = false
    }

    if (newPokemon.life === '') {
        errors.life = 'Life is required'
        errors.valido = false
    } else if (newPokemon.life <= 0) {
        errors.life = 'Life must be greater than 0'
        errors.valido = false
    }

    if (newPokemon.attack === '') {
        errors.attack = 'Attack is required'
        errors.valido = false
    } else if (newPokemon.attack <= 0) {
        errors.attack = 'Attack must be greater than 0'
        errors.valido = false
    }

    if (newPokemon.defense === '') {
        errors.defense = 'Defense is required'
        errors.valido = false
    } else if (newPokemon.defense <= 0) {
        errors.defense = 'Defense must be greater than 0'
        errors.valido = false
    }

    if (newPokemon.speed === '') {
        errors.speed = 'Speed is required'
        errors.valido = false
    } else if (newPokemon.speed <= 0) {
        errors.speed = 'Speed must be greater than 0'
        errors.valido = false
    }

    if (newPokemon.height === '') {
        errors.height = 'Height is required'
        errors.valido = false
    } else if (newPokemon.height <= 0) {
        errors.height = 'Height must be greater than 0'
        errors.valido = false
    }

    if (newPokemon.weight === '') {
        errors.weight = 'Weight is required'
        errors.valido = false
    } else if (newPokemon.weight <= 0) {
        errors.weight = 'Weight must be greater than 0'
        errors.valido = false
    }

    if(newPokemon.type.length === ''){
        errors.valido = false
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
            {/* <div>
                <img src={newPokemon.img} alt="IMG NOT FOUND" />
            </div> */}
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
                            {errors.name && <p className={s.errors}>{errors.name}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Imagen: </label><br />
                            <input
                                name='img'
                                type="url"
                                value={newPokemon.img}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.img && <p className={s.errors}>{errors.img}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Vida: </label><br />
                            <input
                                name='life'
                                type="number"
                                min="1"
                                value={newPokemon.life}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.life && <p className={s.errors}>{errors.life}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Fuerza: </label><br />
                            <input
                                name='attack'
                                type="number"
                                value={newPokemon.attack}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.attack && <p className={s.errors}>{errors.attack}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Defensa: </label><br />
                            <input
                                name='defense'
                                type="number"
                                value={newPokemon.defense}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.defense && <p className={s.errors}>{errors.defense}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Velocidad: </label><br />
                            <input
                                name='speed'
                                type="number"
                                value={newPokemon.speed}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.speed && <p className={s.errors}>{errors.speed}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Altura: </label><br />
                            <input
                                name='height'
                                type="number"
                                value={newPokemon.height}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.height && <p className={s.errors}>{errors.height}</p>}
                        </div>

                        <div>
                            <label className={s.label}>Peso: </label><br />
                            <input
                                name='weight'
                                type="number"
                                value={newPokemon.weight}
                                className={s.input}
                                onChange={((e) => handleInputChange(e))} />
                            {errors.weight && <p className={s.errors}>{errors.weight}</p>}
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
                                    className={s.inputCheck}
                                    type="checkbox"
                                    name={type.id}
                                    value={type.name}
                                    onChange={((e) => handleChangeType(e))} />
                            </div>
                            
                        </div>
                    ))
                    }
                </div>
                {errors.type && <p className={s.errorsType}>{errors.type}</p>}
                <div className={s.btns}>
                    <Link to='/home'>
                        <button className={s.goBack}>
                            Go Back!
                        </button>
                    </Link>

                    <button type='submit' disabled={!errors.valido} className={s.btnCreate}>
                        Create
                    </button>
                </div>

            </form>
        </div>
    )
}
export default Formulario