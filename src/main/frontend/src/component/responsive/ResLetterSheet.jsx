import React, {useRef, useState} from "react";
import axios from "axios";

export default function ResLetterSheet(props){

    // 편지지 클릭시 편지번호 담고 있기
    const[sno, setSno]=useState("");
    const selectSheet=(i)=>{
        setSno(i);
        console.log(i)
    }
    // 편지쓰는 창 띄우기 위한 state
    const[writePage, setWritePage]=useState(false);

    const moveWrite=()=>{
        setWritePage(true)
    }
    // 글자 수 제한 & 작성한 글자 알려주기
    //onChange 써서 해야하나
    const writeText=useRef(null);
    const textCheck=useRef(null)
    const [text , setText]=useState(0);

    const textLimit=()=>{
        // onchange 될때마다 이거 불러서 계속 확인하게 해야겠다.

        setText(writeText.current.value.length)
        if(writeText.current.value.length>350) {
            textCheck.current.style.color='red';
            // 글자 수 줄어들면 다시 색깔바꿔주기
        }else{textCheck.current.style.color='black';}
    }
    // 편지 내용 백엔드 전송
    const sendbtn=()=>{
        let info={
            mno : props.param,
            sendt : document.querySelector(".sendt").value,
            sendp : document.querySelector(".sendp").value,
            sno : sno
        }
        axios
            .post("/letterbox/sendletter", info)
            .then(res=>{
                let result=res.data
                if(result){
                    window.location.href="/page/letterbox/"+props.param;
                }else{
                    alert("db저장 실패")
                }
            })
            .catch(err=>{alert(err)})
    }


    return(
      <div className="resLetterSheetContent">
          {
              !writePage &&
              <div className="imgContainer">
                  <div className="sheetInfo">
                      <p>편지지를 선택해주세요</p>
                  </div>
                  {
                      props.sheets.map((i)=>{
                          return(
                              <div className={"imgList"+i.sno}>
                                  <img className="sheetImg" src={i.Img} onClick={()=>{selectSheet(i.sno)}}/>
                              </div>
                          )
                      })
                  }
                  <div className="selectNext">
                      <button onClick={moveWrite}>다음</button>
                  </div>

              </div>
          }
          {
              writePage &&
              <div className="imgContainer">
                  <div className="sheetInfo">
                      <p>😀편지를 작성해주세요😀</p>
                  </div>
                  <div>
                      <div className="takep-content resTakepC">
                          <input type="text" className="takep resTakep" placeholder={props.mname} disabled="disabled"/>
                      </div>
                      <div className="sendt-content resSendtC">
                          <textarea maxLength="350" ref={writeText} className="sendt resSendt" placeholder="전하실 내용을 적어주세요" onChange={textLimit}/>
                          <p ref={textCheck} className="textCheck">{text}/350</p>
                      </div>
                      <div className="sendp-content resSendpC">
                          <input type="text" className="sendp resSendp" placeholder="이름을 남겨주세요"/>
                      </div>
                      <div className="sentbtnlist resBtnList ">
                          <button type="button" onClick={sendbtn}>작성 완료</button>
                          <button type="button" onClick={props.letterClose}>작성 취소</button>
                      </div>
                  </div>

              </div>
          }

      </div>
    );
}
