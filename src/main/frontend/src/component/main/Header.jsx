import React from "react";
import '../reset.css';
import './index.css'

import logo from '../../img/해다리.png'

function Header(props){
    return (
        <div className="headerContent">
            <div className="headerLogo">
                <img src={logo} alt="로고" className="logo"/>
            </div>
            <div className="menu">
                <div className="menuCenter">
                    <ul>
                        <li><a href="#">소개</a></li>
                        <li><a href="#">연하장</a></li>
                        <li><a href="#">1년뒤 개봉</a></li>
                    </ul>
                </div>
                <div className="menuRight">
                    <ul>
                        <li>Login</li>
                    </ul>
                </div>
            </div>
        </div>
    ); //return end
}// component end

export default Header