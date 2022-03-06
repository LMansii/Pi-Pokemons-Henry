import { React } from 'react';
import {Link} from 'react-router-dom'
import s from './Card.module.css'
function Card({ img, name, type,id }) {
    var key = 1
    return (
        <div className={s.div}>
            <Link to={`/home/detail/${id}`}>
            <div>
            <img className={s.img} src={img} alt="" />
            </div>
            <div>
                
            </div>
            <h1 className={s.name}>{name}</h1>
            </Link>
            <div>
                <h3>TYPES</h3>
                {type.map((t) => (
                    <h5 key={++key}>{t}</h5>
                ))
                }
            </div>
        </div>
    )
}

export default Card;