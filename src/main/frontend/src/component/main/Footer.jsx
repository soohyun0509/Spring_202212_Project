import React from "react";
import {defaults} from "axios";
import Git from '../../img/github.png'
import logo from'../../img/logo3.png'


export default function Footer(props){
    return(
        <div className="footer-content">
            <div className="footer-left">
                Copyright SoohyunPark. All Rights Reserved.
            </div>
            <div className="footer-center">
                <img src={logo} />
                <p>별똥별</p>
            </div>
            <div className="footer-right">
                <a href="https://github.com/soohyun0509/Spring_202212_Project"><img src={Git} className="footer-gitlogo" /></a>
            </div>
        </div>
    );// return end
}// c end
