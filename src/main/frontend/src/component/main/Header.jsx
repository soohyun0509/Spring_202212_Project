import React, {useEffect, useState} from "react";
import '../css/index.css'
import axios from "axios";

import logo from '../../img/logo_transparent.png'
import {HashRouter, BrowserRouter , Routes , Route , Link, Router} from 'react-router-dom';


export default function Header(props){

    // 로그인 회원정보 가지고오기
    const[login, setLogin]=useState(false);
    const[mname ,setMname]=useState(null); // 회원명 넣을 변수
    const[mno ,setMno]=useState(null); // 회원번호 넣을 변수

    //useEffect로 안하고 useState써서 가지고 오니까 계속 contollrer들어가서 콘솔 난리남
    useEffect(()=>{
        setLogin(!login);
        axios.get("/member/getmemberMno").then(res=>{
            setMname(res.data.mname)
            setMno(res.data.mno)
        })
            .catch(err=>{alert(err)})
    },[])




    // 여기서 회원번호를 가져와서 링크에 변수로 넣어줘야겠음!!!

    return (
        <div className="headerContent">
            <div className="headerLogo">
                <img src={logo} alt="로고" className="index-logo"/>
            </div>

            <div className="menuCenter">
                <ul>
                    <li><Link to="/">소개</Link></li>
                    <li><Link to="/page/letterbox?{mno}">연하장</Link></li>
                    <li><Link to="/page/diary">1년뒤 개봉</Link></li>
                </ul>
            </div>
            <div className="menuRight">
                <div>
                    {login && <span>{mname}님 환영합니다.</span>}
                </div>
                <div className="login-box">
                  <Link to="/member/login" className="login-link">Login</Link>
                </div>
            </div>

        </div>
    ); //return end
}// component end
