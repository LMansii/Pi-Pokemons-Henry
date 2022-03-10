import { React, useEffect, useState } from "react";
import { getAllPokemons, ordenamientoALPHA, goBackDetail, getTypes, filterType, reinicioState,filterOrigin} from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import s from './Home.module.css'
import {NavLink} from 'react-router-dom'
function Home() {
    const allPokemons = useSelector((state) => state.pokemons)
    const types = useSelector((state) => state.types)
    const dispatch = useDispatch();
    var keyTypes = 1;
    // eslint-disable-next-line no-unused-vars
    const [ordenamiento, setOrdenamiento] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [filterTypes, setFilterTypes] = useState('')

    useEffect(() => {
        if(allPokemons.length > 0){
            return 1
        }else{
            dispatch(getAllPokemons())
            dispatch(getTypes())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    useEffect(() => {
        dispatch(goBackDetail())
    }, [dispatch])
    //---------------- ORDENAMIENTO ---------------- 
    function handleOrdenamiento(e) {
        e.preventDefault();
       // if (e.target.value === 'default') {
           // dispatch(goBackDetail())
            //dispatch(getAllPokemons())
           // setOrdenamiento(`ordenado ${e.target.value}`)
       // } else {
            dispatch(ordenamientoALPHA(e.target.value));
            setOrdenamiento(`ordenado ${e.target.value}`)
        //}
    }
    //---------------- FILTRO POR TIPOS ---------------- 
    function handleFilterTypes(e){
        e.preventDefault();
        setFilterTypes(e.target.value)
        dispatch(filterType(e.target.value))
    }

    //---------------- Reinicio de state.pokemons ---------------- 
    function handleReinicio(e){
        e.preventDefault();
        dispatch(reinicioState())
        dispatch(getAllPokemons())
    }
    //---------------- ORIGEN API - DB ---------------- 
    function handlefilterOrigin(e){
        e.preventDefault()
        dispatch(filterOrigin(e.target.value))
    }

    return (
        <div>
            <h1>HOMEEEEEEEE</h1>
            {console.log('ACA ESTAMOS',allPokemons)}
            {allPokemons.length === 0
                ? (
                    <div>
                        <Loading/>
                    </div>
                ) : (
                    <div>
                        <button onClick={(e) => {handleReinicio(e)}}>Reinico</button>
                        <div>
                            <SearchBar />
                        </div>
                        <div>
                            <NavLink to='/create'>
                            <h1>FORMULARIO</h1>
                            </NavLink>
                        </div>
                        {/* ----------- ORDENAMIENTO AZ - ZA // TOP ATTACK - LOW ATTACK ----------- */}
                        <div>
                            <label> Ordenamientos: </label>
                            <select defaultValue='Ordenamiento' onChange={(e) => { handleOrdenamiento(e) }}>
                                <option value="Ordenamiento"  disabled>---Ordenamiento---</option>
                                <option value="default">Default</option>
                                <option value="az">A-Z</option>
                                <option value="za">Z-A</option>
                                <option value="attack">Top Attack</option>
                                <option value="lowattack">Low Attack</option>
                                <option value="defense">Top Defense</option>
                                <option value="lowdefense">Low Defense</option>

                            </select>
                        </div>
                        {/* ----------- TIPOS DE POKEMONS ----------- */}
                        <div>
                            <label> Types: </label>
                            <select defaultValue='Types' onChange={(e)=> {handleFilterTypes(e)}}>
                                <option value="Types" disabled>---Types---</option>
                                {
                                    types?.map((t) => (
                                        <option key={++keyTypes} value={t.name}>{t.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* ----------- ORIGEN DE POKEMONS ----------- */}
                        <div>
                            <label> Origen: </label>
                            <select defaultValue={'Origen'} onChange={(e) => { handlefilterOrigin(e) }}>
                                <option value="Origen"  disabled>---Origen---</option>
                                <option value="all">All</option>
                                <option value="api">Api</option>
                                <option value="db">BD</option>
                            </select>
                        </div>

                        <div className={s.contenedorcard}>
                            {allPokemons?.map((p) => {
                                return (
                                    <Card
                                        id={p.id}
                                        key={p.id}
                                        name={p.name}
                                        img={p.img}
                                        type={
                                            p.inDB ? p.types?.map((t) => t.name) : p.types?.map((t) => t)
                                        }
                                    />
                                )
                            })
                            }
                        </div>
                    </div>
                )
            }



        </div>
    )
}

export default Home;