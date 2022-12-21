import React from "react";
import '../css/login.css'


export default function Login(props){
    return(
        <div className="wrap">
            <div className="loginContent">
                <div className="welcometext">
                    <p className="text1">반갑습니다!</p>
                    <p className="text2">로그인할 계정을 선택해주세요</p>
                </div>
                <div className="sns-login">
                    <div className="loginContainer">
                        <div className="kakaologin">
                            <a href="/oauth2/authorization/kakao">
                                <button type="button" className="loginText kakao">
                                    Kakao 계정으로 시작하기
                                </button>
                            </a>

                        </div>
                    </div>
                    <div className="loginContainer">
                        <div className="naverlogin">
                            <a href="/oauth2/authorization/naver">
                                <button type="button" className="loginText naver">
                                    Naver 계정으로 시작하기
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className="loginContainer">
                        <div className="googlelogin">
                            <a href="/oauth2/authorization/google">
                                <button type="button" className="loginText google">
                                    Google 계정으로 시작하기
                                </button>
                            </a>
                        </div>
                    </div>

                    <div className="loginContainer">
                        <div className="googlelogin">
                            <a href="/oauth2/authorization/github">
                                <button type="button" className="loginText github">
                                    Git 계정으로 시작하기
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    ); // return end


}// c end

