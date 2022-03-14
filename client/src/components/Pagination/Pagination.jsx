import React from 'react'
import s from './Pagination.module.css'
function Pagination({ allPokemons, pokemonsPerPage, pagination }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className={s.container}>
            <ul className={s.ul}>
                {pageNumbers && pageNumbers?.map((i) => (
                    <li key={i} className={s.li}>
                        <button className={s.button} onClick={() => pagination(i)}>{i}</button>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}


export default Pagination;