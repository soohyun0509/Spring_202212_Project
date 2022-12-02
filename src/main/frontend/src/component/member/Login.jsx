import React from "react";
import '../css/login.css'


//이미지
import kakao from '../../img/kakaotalk_sharing_btn_small.png'

function Login(props){
    return(
        <div className="login-wrap">
            <div className="loginContent">
                <div className="welcometext">
                    로그인할 계정 선택
                </div>
                <div className="sns-login">
                    <div className="loginContainer">
                        <div className="kakaologin">
                            <button type="button" className="loginText kakao">
                                <a href="/oauth2/authorization/kakao">카카오계정으로 시작하기</a>
                            </button>
                        </div>
                    </div>
                    <div className="loginContainer">
                        <div className="naverlogin">
                            <button type="button" className="loginText naver">
                                <a href="/oauth2/authorization/kakao">네이버계정으로 시작하기</a>
                            </button>
                        </div>
                    </div>
                    <div className="loginContainer">
                        <div className="googlelogin">
                            <button type="button" className="loginText google">
                                <a href="/oauth2/authorization/kakao">구글계정으로 시작하기</a>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    ); // return end


}// c end

export default Login;

