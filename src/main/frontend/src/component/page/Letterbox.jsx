import React, {useState} from "react";
import Header from '../main/Header'
import Footer from "../main/Footer";
import '../css/letterbox.css';
import Backimg from '../../img/back-img1.jpg'
import axios from "axios";

export default function Letterbox(props){

    //mno을 가져와야돼


    const [letter, setLetteropen] =useState("");

    // 이거 모달창 뜨게 해야돼...
    const letteropen=()=>{

        let html='    <div class="lettersheet">' + // 여기 전체 백그라운드로 이미지 넣기
            '        <div class="takep-content">' +// 받는 사람 표시해주기 mno으로 가져오던가 해야될듯!
            '            <input type="text" class="takep" placeholder="받는 사람 표시 부분" />' +
            '        </div>' +
            '        <div class="sendt-content">' + // 편지 내용
            '            <input type="text" class="sendt" placeholder="내용 작성 부분" />' +
            '        </div>' +// 보내는 사람도 따로 입력하게
            '        <div class="sendp-content">' +// 보내는 사람도 따로 입력하게
            '            <input type="text" class="sendp" placeholder="보내는 사람 작성 부분" />' +
            '        </div>' +
            '        <div class="sentbtnlist">' +
            '            <button type="button" className="sendbtn">작성 완료</button>' +
            '            <button type="button" onClick={}>그만두기</button>' +
            '        </div>' +
            '    </div>'

        document.querySelector(".letter").innerHTML=html;
    }

    let sendbtn=document.querySelector(".sendbtn");

/*
    sendbtn.addEventListener(()=>{
        let info={
            takep : document.querySelector(".takep").value, // mno 가져오면 그냥 mno으로 바꿔주기
            sendt : document.querySelector(".sendt").value,
            sendp : document.querySelector(".sendp").value,
        }

        axios
            .post("/letterbox/sendletter", info)
            .then(res=>{alert("얍얍")})

    })

*/



    return(
        <div className="wrap">
            <div className="letterbox-content">
                <div className="letterbox-title">
                    LetterBox
                </div>
                <div>
                    <button type="button" className="letterbox-writebtn" onClick={setLetteropen}>편지 작성</button>
                    <div className="letter">

                    </div>
                    {/*편지 작성 버튼 누르면 편지지 열리게 여기서 설정하기!! 컨트롤러까지 가지말고 js에서 해결하기!!*/}
                </div>
            </div>
        </div>
    );
}