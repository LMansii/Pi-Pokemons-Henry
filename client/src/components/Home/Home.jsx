import { React, useEffect, useState } from "react";
import { getAllPokemons, ordenamientoALPHA, goBackDetail, getTypes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import imageLoading from '../../img/pokemoGIFLoading.gif'
import s from './Home.module.css'
function Home() {
    const allPokemons = useSelector((state) => state.pokemons)
    const types = useSelector((state) => state.types)
    const dispatch = useDispatch();
    var keyTypes = 1;
    // eslint-disable-next-line no-unused-vars
    const [ordenamiento, setOrdenamiento] = useState('')

    useEffect(() => {
        dispatch(getAllPokemons())
        dispatch(getTypes())
    }, [dispatch])

    useEffect(() => {
        dispatch(goBackDetail())
    }, [dispatch])

    function handleOrdenamiento(e) {
        e.preventDefault();
        if (e.target.value === 'default') {
            dispatch(goBackDetail())
            dispatch(getAllPokemons())
            setOrdenamiento(`ordenado ${e.target.value}`)
        } else {
            dispatch(ordenamientoALPHA(e.target.value));
            setOrdenamiento(`ordenado ${e.target.value}`)
        }
    }

    function handleFilterTypes(e){
        e.preventDefault();
    }
    return (
        <div>
            {allPokemons.length === 0
                ? (
                    <div>
                        <img src={imageLoading} alt="Loading..." srcset="" />
                    </div>
                ) : (
                    <div>

                        <h1>HOME!</h1>
                        <div>
                            <SearchBar />
                        </div>
                        {/* ----------- ORDENAMIENTO AZ - ZA // TOP ATTACK - LOW ATTACK ----------- */}
                        <div>
                            <label> Ordenamientos: </label>
                            <select onChange={(e) => { handleOrdenamiento(e) }}>
                                <option value="default" disabled>---Ordenamiento---</option>
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
                            <select onChange={(e)=> {handleFilterTypes(e)}}>
                                <option value="default" disabled>---Types---</option>
                                <option value="default">Default</option>
                                {
                                    types?.map((t) => (
                                        <option key={++keyTypes} value={t.name}>{t.name}</option>
                                    ))
                                }
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
                                            p.inDB ? p.types.map((t) => t.name) : p.types.map((t) => t)
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