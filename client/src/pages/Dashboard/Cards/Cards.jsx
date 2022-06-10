import React from 'react';
import style from "./Cards.module.css"

const Cards = ({icon, name, cash}) => {
    return (
        <div className={style.banknotes}>
            <img src={icon} alt="" className={style.logo}/>
            <div className={style.text}>
                <div>{name}</div>
                <div>{cash} ₽</div>
            </div>

        </div>


    )

};

export default Cards;