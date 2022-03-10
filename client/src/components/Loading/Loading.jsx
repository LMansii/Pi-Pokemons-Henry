import React from 'react';
import imageLoading from '../../img/pokemoGIFLoading.gif'
import { reinicioState} from "../../actions";
import {useDispatch} from 'react-redux'
function Loading(){
    const dispatch = useDispatch()
    function handleReset(e){
        e.preventDefault();
        dispatch(reinicioState())
    }
    return (
        <div>
            <img src={imageLoading} alt="Loading..." srcSet={`${imageLoading}-1.5x.png 1.5x, ${imageLoading}-2x.png 2x`}/>
            <button onClick={(e)=> {handleReset(e)}}>Volver</button>
        </div>
    )
}


export default Loading