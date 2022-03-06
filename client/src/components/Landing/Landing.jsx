import React from "react";
import pikachu from '../../img/pikachu.gif'
import { NavLink } from 'react-router-dom'
import style from './Landing.module.css'
function Landing() {
    return (
        <div className={style.imagen}>
            <div>
                <img src={pikachu} alt="" className={style.pikachu} />
            </div>
            <div className={style.boton}>
                <NavLink to='/home'>
                    <button className={style.btn}>HOME</button>
                </NavLink>
            </div>

        </div>
    )
}

export default Landing;