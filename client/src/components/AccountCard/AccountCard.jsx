import React from 'react';
import {useSelector} from 'react-redux';
import style from './AccountCard.module.css'

const AccountCard = ({account}) => {
  const types = useSelector(state => state.accountType.accountTypes)
  return (
    <div className={style.card}>
      {types.map(t => {
        if (t.id === account.accountTypeId) {
          return (
            <div style={{display: 'flex'}} key={t.id}>
              <div className={style.icon} style={{backgroundColor: account.color}}>
                <span className="material-icons-round">{t.icon}</span>
              </div>
              <div className={style.category}>{account.name}</div>
              <div className={style.account}>
                <div className={style.name}>{t.name}</div>
              </div>
              <div className={style.money} style={{color: '#282c34'}}>{account.money} ₽</div>
            </div>
          )
        }
      })
      }</div>
  );
};

export default AccountCard;