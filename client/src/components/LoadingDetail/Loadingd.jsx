import React from 'react';
import imageLoading from '../../img/pokemoGIFLoading2.gif'
import { reinicioState} from "../../actions";
import {useDispatch} from 'react-redux'
import s from './Loadingd.module.css'
//import {NavLink} from 'react-router-dom'
function Loadingd(){
    const dispatch = useDispatch()
    function handleReset(e){
        e.preventDefault();
        dispatch(reinicioState())
    }
    return (
        <div className={s.container}>
            <img className={s.img} src={imageLoading} alt="Loading..." srcSet={`${imageLoading}-1.5x.png 1.5x, ${imageLoading}-2x.png 2x`}/>
            <button className={s.button} onClick={(e)=> {handleReset(e)}}>Volver</button>
        </div>
    )
}


export default Loadingd