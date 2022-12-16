import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import sheet1 from '../../img/sheet1.png'
import sheet2 from '../../img/sheet2.png'
import sheet3 from '../../img/sheet3.png'
// 편지지 컴포넌트 생성
export default function LetterSheet(props){
    // 편지지 배열
    const sheets=[
        {
            Img : '../../img/sheet1.png',
            sno : 1
        },
        {
            Img : '../../img/sheet2.png',
            sno : 2
        },
        {
            Img : '../../img/sheet3.png',
            sno : 3
        },
    ]
    // 편지 받는 사람 이름 가져오기
    // 이거 letterbox에서 props로 해결할 수 있을것같기도 하고...아닌것같기도하고...
    const [mname, setMname] =useState("");
    // 아 mno을 먼저 갖고와서 해결해야겠다 db에 저장이 안돼
    // 연결되는 링크에 변수를 같이 전달해야되는것같은데.........

    const param=useParams().mno; // url에서 회원번호 가져오기
    // 편지지에 출력시킬 mname 가져오기
    // 링크에서 mno뽑아가지고 mname 가져오면 될듯!
    const getMname=()=>{
        axios.get("/member/getMname" , {params : {mno : param}})
            .then(res=>{
                console.log(res.data);
                if(res.data!=""){ // null이 아니면 이름이랑 넣어주기
                    setMname("To . "+res.data)
                }
            })
            .catch(err=>{console.log(err)})
    }
    useEffect(getMname,[]);

// {mname}

    // 편지 내용 백엔드 전송
    const sendbtn=()=>{
        let info={
            mno : param,
            sendt : document.querySelector(".sendt").value,
            sendp : document.querySelector(".sendp").value
        }
        axios
            .post("/letterbox/sendletter", info)
            .then(res=>{
                let result=res.data
                if(result){
                    window.location.href="/page/letterbox/"+param;
                }else{
                    alert("db저장 실패")
                }
            })
            .catch(err=>{alert(err)})
    }

    return(
        <div>
            <div className="lettersheet">
                <div className="sheetContentWrap">
                    <div className="sheetContent">
                        <div className="takep-content">
                            <input type="text" className="takep" placeholder={mname} disabled="disabled"/>
                        </div>
                        <div className="sendt-content">
                            <textarea className="sendt" placeholder="내용 작성 부분"/>
                        </div>
                        <div className="sendp-content">
                            <input type="text" className="sendp" placeholder="이름을 남겨주세요"/>
                        </div>
                        <div className="sentbtnlist">
                            <button type="button" onClick={sendbtn}>작성 완료</button>
                            <button type="button" onClick={props.letterClose}>작성 취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

