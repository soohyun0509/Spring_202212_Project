import React from "react";
import Header from '../main/Header'
import Footer from "../main/Footer";
import '../css/letterbox.css';

export default function Letterbox(props){
    return(
        <div className="wrap">
            <div className="letterbox-content">
                <div className="letterbox-title">
                    <h3>Letterbox</h3>
                </div>
                <div>
                    <button type="button" className="letterbox-writebtn"/>편지 작성
                    {/*편지 작성 버튼 누르면 편지지 열리게 여기서 설정하기!! 컨트롤러까지 가지말고 js에서 해결하기!!*/}
                </div>
            </div>
        </div>
    );
}