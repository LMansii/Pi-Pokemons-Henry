import React from 'react';
import imageLoading from '../../img/pokemoGIFLoading2.gif'
import s from './Loading.module.css'
function Loading(){
    //COMPONENTE DE CARGA DE DETALLES
    return (
        <div className={s.container}>
            <img className={s.img} src={imageLoading} alt="Loading..." srcSet={`${imageLoading}-1.5x.png 1.5x, ${imageLoading}-2x.png 2x`}/>
            <p>Loading details...</p>
        </div>
    )
}


export default Loading