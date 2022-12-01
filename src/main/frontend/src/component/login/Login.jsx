import React from "react";
import './login.css'
import '../reset.css'

//이미지
import kakao from '../../img/kakaotalk_sharing_btn_small.png'


function Login(props){
    return(
        <div className="container">
            <div className="loginContent">
                <div className="welcometext">
                    로그인할 계정 선택
                </div>
                <div className="snslist">
                    <div className="kakaologin">
                        <img src={kakao} className="logo"/>
                        <div className="loginText">
                            <a href="/oauth2/authorization/kakao">카카오계정으로 시작하기</a>
                        </div>
                    </div>
                    <div className="kakaologin">
                        <img src={kakao} className="logo"/>
                        <div className="loginText">
                            <a href="/oauth2/authorization/kakao">카카오계정으로 시작하기</a>
                        </div>
                    </div>
                    <div className="kakaologin">
                        <img src={kakao} className="logo"/>
                        <div className="loginText">
                            <a href="/oauth2/authorization/kakao">카카오계정으로 시작하기</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    ); // return end


}// c end

export default Login;

