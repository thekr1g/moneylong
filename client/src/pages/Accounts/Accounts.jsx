import React from 'react';
import style from "./Accounts.module.css";

const Accounts = () => {
    return (
        <div className={style.bg}>
            <div className={style.banknotes}>
                <div className={style.text}>Счета</div>
                <li className={style.li}>
                    <button className={style.add}>Добавить</button>
                </li>
            </div>
        </div>
    );
};

export default Accounts;