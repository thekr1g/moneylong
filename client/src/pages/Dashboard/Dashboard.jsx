import React from 'react';
import Cards from "./Cards/Cards";
import logo from "../../assets/banknotes.png";
import logo2 from "../../assets/credit-cards.png";
import logoadd from "../../assets/plus.png";
import style from './Dashboard.module.css'
import Panel from "./Panel/Panel";

const Dashboard = () => {
    return (
        <div className={style.fon}>

            <div className={style.flex}>
                <Cards icon={logo} cash={'100'} name={'Наличные'}/>
                <Cards icon={logo2} cash={'200'} name={'Black'}/>
                <button className={style.button}>Добавить счет </button>
             </div>
            <div className={style.flex}>
                <Panel name={'Тенденция баланса'}/>
                <Panel name={'Движение средств'}/>
                <Panel name={'Структура расходов'}/>

            </div>

        </div>

)
    ;
};

export default Dashboard;