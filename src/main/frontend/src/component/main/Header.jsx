import React, {useEffect, useState} from "react";
import '../css/index.css'
import axios from "axios";
import {HashRouter, BrowserRouter, Routes, Route, Link, Router, useParams} from 'react-router-dom';


export default function Header(props){
// props.location.search
    // 로그인 회원정보 가지고오기
    const[login, setLogin]=useState(false);
    const[mname ,setMname]=useState(null); // 회원명 넣을 변수
    const[mno ,setMno]=useState(null); // 회원번호 넣을 변수

    // params

    //useEffect로 안하고 useState써서 가지고 오니까 계속 contollrer들어가서 콘솔 난리남
    useEffect(()=>{
        axios.get("/member/getmemberMno").then(res=>{
            console.log(res.data)
            if(res.data!==""){
                setLogin(true);
                setMname(res.data.mname)
                setMno(res.data.mno)
            }
        })
            .catch(err=>{alert(err)})
    },[])


    // 여기서 회원번호를 가져와서 링크에 변수로 넣어줘야겠음!!!

    return (
        <div className="headerContent">
                {
                    login===true ? (
                        <div className="menuContent">
                            <div className="menuCenter">
                                <ul className="ulist">
                                    <li><a href={`/page/letterbox/${mno}`}>{mname}님 연하장</a></li>
                                    <li><a href="/customer/cmainpage">문의사항</a></li>
                                </ul>
                            </div>
                            <div className="logout-box">
                                <a href="/member/logout">로그아웃</a>
                            </div>
                        </div>
                    ):(
                    <ul className="login-box ulist">
                        <li><a href="/member/login" className="login-link">로그인</a></li>
                        <li><a href="/customer/cmainpage">문의사항</a></li>
                    </ul>
                    )
                }
        </div>
    ); //return end
}// component end
