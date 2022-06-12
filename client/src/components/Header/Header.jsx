import React from 'react';
import logo from '../../assets/logo.png'
import style from './Header.module.css'
import {NavLink} from "react-router-dom";
import {
    ACCOUNTS_ROUTE,
    ANALYTICS_ROUTE,
    DASHBOARD_ROUTE,
    LOGIN_ROUTE,
    RECORDS_ROUTE,
    SETTINGS_ROUTE,
    AUTH_ROUTE
} from "../../utils/const";
import profile from '../../assets/user.png'
import Profile from './Profile/Profile';

const Header = () => {
    return (
        <div className={style.header}>

            <ul className={style.ul}>
                <li className={style.li}>
                    <NavLink to={DASHBOARD_ROUTE} className={style.navLink}> <img src={logo} alt="" className={style.logo}/> </NavLink>
                </li>
                <li className={style.li}>
                    <NavLink to={DASHBOARD_ROUTE} className={style.navLink}>Обзор </NavLink>
                </li>
                <li className={style.li}>
                    <NavLink to={ACCOUNTS_ROUTE} className={style.navLink}>Счета </NavLink>
                </li>
                <li className={style.li}>
                    <NavLink to={RECORDS_ROUTE} className={style.navLink}>Записи </NavLink>
                </li>
                <li className={style.li}>
                    <NavLink to={ANALYTICS_ROUTE} className={style.navLink}>Аналитика</NavLink>
                </li>
            </ul>
          <div className={style.right}>
            <button className={style.addPost}>+ Запись</button>
            <Profile/>
          </div>

            <div className={style.line}/>
        </div>

    );
};

export default Header;