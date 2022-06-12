import React, {useEffect, useState} from 'react';
import style from './Cards.module.css'
import {useSelector} from 'react-redux';

const Cards = ({accountData}) => {
  const [currentType, setCurrentType] = useState('')
  const types = useSelector(state => state.accountType.accountTypes)

  useEffect(() => {
    types.map(t => {
      if (t.id === accountData.accountTypeId) {
        setCurrentType(t)
      }
    })
  }, [])

  return (
    <div className={style.banknotes} style={{backgroundColor: accountData.color}}>
      {currentType === '' ? null :
        <div className={style.icon}>
          <span className="material-icons-round">{currentType.icon}</span>
        </div>
      }

      <div className={style.text}>
        <div className={style.name}>{accountData.name}</div>
        <div className={style.money}>{accountData.money} ₽</div>
      </div>
      <div className={style.edit}>
        <span className="material-icons-round">edit</span>
      </div>
    </div>


  )

};

export default Cards;