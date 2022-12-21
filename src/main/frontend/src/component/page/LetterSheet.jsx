import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import sheet1 from '../../img/sheet1.png'
import sheet2 from '../../img/sheet2.png'
import sheet3 from '../../img/sheet3.png'
import sheet4 from "../../img/sheet4.png"
import sheet5 from "../../img/sheet5.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
// 편지지 컴포넌트 생성
export default function LetterSheet(props){
    // 편지지 배열
    const sheets=[
        {Img : sheet1,sno : 1},
        {Img : sheet2,sno : 2},
        {Img : sheet3,sno : 3},
        {Img : sheet4,sno : 4},
        {Img : sheet5,sno : 5}
    ];
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

    // 편지 내용 백엔드 전송
    const sendbtn=()=>{
        let info={
            mno : param,
            sendt : document.querySelector(".sendt").value,
            sendp : document.querySelector(".sendp").value,
            sno : sno
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

    const back=useRef(null); // div 스타일 변경해주기 위해 설정!
    const [sno, setSno]=useState(1); // 1번이 기본이미지의 sno
    const [count, setCount]=useState(0); // 0번이 기본이미지
    // 오른쪽 버튼 이벤트
    const clickRight=()=>{
        if(count<sheets.length-1){
            // 카운트 수 변경해주고 그거에 맞춰서 배경이미지 변경해주기
            setCount(count + 1);
            back.current.style.backgroundImage=`url(${sheets[count].Img})`;
        }else{
            setCount(0);
            back.current.style.backgroundImage= `url(${sheets[count].Img})`;
        }
    }
    // 왼쪽 버튼 이벤트
    const clickLeft=()=>{
        if(count<sheets.length && count>0){
            setCount(count - 1);
            back.current.style.backgroundImage=`url(${sheets[count].Img})`;
        }else{
            setCount(sheets.length-1);
            back.current.style.backgroundImage= `url(${sheets[count].Img})`;
        }
    }
    // 카운트 숫자 바뀔때마다 sno 변경해주기
    useEffect(()=>{setSno(sheets[count].sno)}, [count]);

    // 글자 수 제한 & 작성한 글자 알려주기
    //onChange 써서 해야하나
    const writeText=useRef(null);
    const textCheck=useRef(null)
    const [text , setText]=useState(0);

    const textLimit=()=>{
        // onchange 될때마다 이거 불러서 계속 확인하게 해야겠다.

        setText(writeText.current.value.length)
        if(writeText.current.value.length>=280) {
            textCheck.current.style.color='red';
            // 글자 수 줄어들면 다시 색깔바꿔주기
        }else{textCheck.current.style.color='black';}
    }

    return(
        <div className="lettersheetbox">
            <div className="lettersheet" ref={back} style={{backgroundImage : `url(${sheets[count].Img})`}}>
                <div className="sheetContentWrap">
                    <FontAwesomeIcon icon={faArrowRight} className="arrowRight" onClick={clickRight}/>
                    <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" onClick={clickLeft}/>

                    <div className="takep-content">
                        <input type="text" className="takep" placeholder={mname} disabled="disabled"/>
                    </div>
                    <div className="sendt-content">
                        <textarea maxLength="279" ref={writeText} className="sendt" placeholder="전하실 내용을 적어주세요" onChange={textLimit}/>
                        <p ref={textCheck} className="textCheck">{text}/280</p>
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
    );
}

