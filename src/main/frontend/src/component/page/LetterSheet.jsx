import React, {useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
// 편지지 컴포넌트 생성
export default function LetterSheet(props){
    const [letter, setLetteropen] =useState(true);

    console.log()

    // 아 편지지 카테고리도 보내야돼

    // 아 mno을 먼저 갖고와서 해결해야겠다 db에 저장이 안돼
    // 연결되는 링크에 변수를 같이 전달해야되는것같은데.........

    const mno=useParams().mno; // url에서 회원번호 가져오기

    // mno갖고가서 mname 갖고와야돼...

    // 편지 내용 백엔드 전송
    const sendbtn=()=>{
        let info={
            mno : mno,
            sendt : document.querySelector(".sendt").value,
            sendp : document.querySelector(".sendp").value,
            cno : 1 // 편지지 카테고리 보내기 ...일단 1로 하고 이거 어떻게 하지...
        }
        axios
            .post("/letterbox/sendletter", info)
            .then(res=>{
                let result=res.data
                if(result){
                    alert("db저장 성공")
                }else{
                    alert("db저장 실패")
                }
            })
            .catch(err=>{alert(err)})
    }

    return(
        <div className="lettersheet">
            <div className="takep-content">
                <input type="text" className="takep" placeholder="받는 사람 표시 부분"/>
            </div>
            <div className="sendt-content">
                <input type="text" className="sendt" placeholder="내용 작성 부분"/>
            </div>
            <div className="sendp-content">
                <input type="text" className="sendp" placeholder="보내는 사람 작성 부분"/>
            </div>
            <div className="sentbtnlist">
                <button type="button" onClick={sendbtn}>작성 완료</button>
            </div>
        </div>
    );
}

