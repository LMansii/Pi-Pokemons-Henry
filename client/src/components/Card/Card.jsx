import { React } from 'react';
import { Link } from 'react-router-dom'
import s from './Card.module.css'
function Card({ img, name, type, id }) {
    var key = 1;
    return (
        <div className={s.card}>
            <div className={s.card__content}>
                <Link to={`/home/detail/${id}`}>
                    <img className={s.img} src={img} alt="" />
                    <h1 className={s.name}>{name[0].toUpperCase()+name.slice(1)}</h1>
                </Link>
                <div className={s.type}>
                    <h3>TYPES</h3>
                    {type?.map((t) => (
                        <h5 key={++key}>{t}</h5>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Card;