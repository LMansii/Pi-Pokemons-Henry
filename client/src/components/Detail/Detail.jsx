import React, { useEffect } from 'react';
import { getDetailBack } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import logo from '../../img/pokeball_PNG.png'
import s from './Detail.module.css'
import Loading from '../Loading/Loading';
function Detail() {
    const { id } = useParams()
    const detail = useSelector((state) => state.detail)
    console.log(detail)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetailBack(id))
    }, [dispatch, id])
    var divKey = Math.floor(100000 + Math.random() * 900000)
    return (
        <div>
            <h1>DETAIL</h1>
            {detail.length ? (
                <div>
                    <img src={detail[0].img} alt="" />
                    <h1>{detail[0].name[0].toUpperCase()+detail[0].name.slice(1)}</h1>
                    <h6>ID: {detail[0].id}</h6>
                    <h5>Life: {detail[0].life}</h5>
                    <h5>Attack: {detail[0].attack}</h5>
                    <h5>Defense: {detail[0].defense}</h5>
                    <h5>Speed: {detail[0].speed}</h5>
                    <div>
                        {detail[0].inDB
                            ? detail[0].types.map((t) => <div key={++divKey}>{t.name[0].toUpperCase()+ t.name.slice(1)}</div>)
                            : detail[0].types.map((t) => <div key={++divKey}>{t[0].toUpperCase()+t.slice(1)}</div>)
                        }
                    </div>
                    <NavLink to='/home'>
                        <img src={logo} className={s.logo} alt="" srcSet={`${logo}-1.5x.png 1.5x, ${logo}-2x.png 2x`} />
                    </NavLink>
                </div>
            ) : (
                <div>
                    <Loading/>
                </div>
            )
            }
        </div >
    )

}


export default Detail