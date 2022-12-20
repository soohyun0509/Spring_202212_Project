import React ,{useRef, useState}from "react";
import "../css/openletter.css"
import parmtree1 from "../../img/소나무_오른쪽.png";
import parmtree2 from "../../img/소나무_왼쪽.png";
import moon from "../../img/달.png";
import {useParams, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import sheet1 from "../../img/sheet1.png";
import sheet2 from "../../img/sheet2.png";
import sheet3 from "../../img/sheet3.png";
import sheet4 from "../../img/sheet4.png"
import sheet5 from "../../img/sheet5.png"
export default function OpenLetter(props){
    // 편지지 배열
    const sheets=[
        {Img : sheet1,sno : 1},
        {Img : sheet2,sno : 2},
        {Img : sheet3,sno : 3},
        {Img : sheet4,sno : 4},
        {Img : sheet5,sno : 5},

    ];
    // letterbox에서 편지리스트 전달받음
    const location=useLocation();
    console.log(location.state.letterlist)

    //letterbox에서 전달받기
    let list=[]
    location.state.letterlist.forEach((l)=>{
        let content={
            sendp : l.sendp,
            sendt : l.sendt,
            sno : l.sno,
            bdate : l.bdate
        }
        list.push(content)
    })
    console.log(list)
    const [count, setCount]=useState(0);

    const back=useRef();

    const clickRight=()=>{
        if(count<list.length-1){
            setCount(count +1);
            back.current.style.backgroundImage= `url(${sheets[(list[count].sno)-1].Img})`;
        }else{
            setCount(0);
            back.current.style.backgroundImage= `url(${sheets[(list[count].sno)-1].Img})`;
        }
    }
    const clickLeft=()=>{
        if(count>0 && count<list.length){
            setCount(count -1);
            back.current.style.backgroundImage= `url(${sheets[(list[count].sno)-1].Img})`;
        }else{
            setCount(list.length-1);
            back.current.style.backgroundImage= `url(${sheets[(list[count].sno)-1].Img})`;
        }
    }


    return(
      <div className="wrap">
          <div className="letterbox-content">
              <img className="parmtree1" src={parmtree1}/>
              <img className="parmtree2" src={parmtree2}/>
              <img className="moon" src={moon}/>
              <div className="rabbit"></div>
              <div className="takeLetterSheet" ref={back} style={{backgroundImage : `url(${sheets[(list[count].sno)-1].Img})`}}>
                  <FontAwesomeIcon icon={faArrowRight} className="arrowRight" onClick={clickRight}/>
                  <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" onClick={clickLeft}/>
                  <FontAwesomeIcon icon={faXmark} className="xmark" onClick={()=>{window.location.href="/"}}/>
                  <div>
                      <div dangerouslySetInnerHTML={{__html :"FROM. "+list[count].sendp}} className="sendpBox"></div>
                      <div dangerouslySetInnerHTML={{__html :list[count].sendt}} className="sendtBox"></div>
                      <div dangerouslySetInnerHTML={{__html :list[count].bdate}} className="senddateBox"></div>
                  </div>

              </div>

          </div>
      </div>
    );
}



