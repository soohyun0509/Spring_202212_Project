import React from "react";
import '../css/index.css'

import logo from '../../img/해다리.png'
import {HashRouter, BrowserRouter , Routes , Route , Link, Router} from 'react-router-dom';


export default function Header(props){
    return (
        <div className="headerContent">
            <div className="headerLogo">
                <img src={logo} alt="로고" className="indexlogo"/>
            </div>

            <div className="menuCenter">
                <ul>
                    <li><Link to="/">소개</Link></li>
                    <li><Link to="/page/letterbox">연하장</Link></li>
                    <li><Link to="/page/diary">1년뒤 개봉</Link></li>
                </ul>
            </div>
            <div className="menuRight">
                <ul>
                    <li><Link to="/member/login">Login</Link></li>
                </ul>
            </div>

        </div>
    ); //return end
}// component end
