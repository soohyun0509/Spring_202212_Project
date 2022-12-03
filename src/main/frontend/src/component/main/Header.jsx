import React from "react";
import '../css/index.css'

import logo from '../../img/logo_transparent.png'
import {HashRouter, BrowserRouter , Routes , Route , Link, Router} from 'react-router-dom';


export default function Header(props){
    return (
        <div className="headerContent">
            <div className="headerLogo">
                <img src={logo} alt="로고" className="index-logo"/>
            </div>

            <div className="menuCenter">
                <ul>
                    <li><Link to="/">소개</Link></li>
                    <li><Link to="/page/letterbox">연하장</Link></li>
                    <li><Link to="/page/diary">1년뒤 개봉</Link></li>
                </ul>
            </div>
            <div className="menuRight">
                <div className="login-box">
                  <Link to="/member/login" className="login-link">Login</Link>
                </div>
            </div>

        </div>
    ); //return end
}// component end
