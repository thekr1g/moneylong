import React, {useEffect, useState} from 'react';
import style from "./Cards.module.css"

const Cards = ({icon, name, cash, color}) => {
  const [currentColor, setCurrentColor] = useState('')

    useEffect(() => {
      if (color === 'red') {
        setCurrentColor('#FF1744')
      } else if (color === 'blue') {
        setCurrentColor('#0D47A1')
      }
    }, [])

    return (
        <div className={style.banknotes} style={{backgroundColor: currentColor}}>
            <img src={icon} alt="" className={style.logo}/>
            <div className={style.text}>
                <div>{name}</div>
                <div>{cash} ₽</div>
            </div>

        </div>


    )

};

export default Cards;