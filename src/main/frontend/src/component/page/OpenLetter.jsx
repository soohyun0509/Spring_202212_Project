import React ,{useRef, useState}from "react";
import "../css/openletter.css"
import parmtree1 from "../../img/소나무_오른쪽.png";
import parmtree2 from "../../img/소나무_왼쪽.png";
import moon from "../../img/달.png";
import {useParams, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import sheet1 from "../../img/sheet1.png";
import sheet2 from "../../img/sheet2.png";
import sheet3 from "../../img/sheet3.png";
export default function OpenLetter(props){
    // 편지지 배열
    const sheets=[
        {Img : sheet1,sno : 1},
        {Img : sheet2,sno : 2},
        {Img : sheet3,sno : 3}
    ];
    // letterbox에서 편지리스트 전달받음
    const location=useLocation();
    console.log(location.state.letterlist)

    // 요기에 편지지이미지랑, 등등 추가해서 넣고싶다
    let list=[]
    location.state.letterlist.forEach((l)=>{
        let content={
            sendp : l.sendp,
            sendt : l.sendt,
            sno : l.sno
        }
        list.push(content)
    })
    console.log(list)

    const [count, setCount]=useState(0);

    const back=useRef();

    const clickRight=()=>{
        if(count<list.length-1){
            setCount(count +1);
      /*      back.current.style.backgroundImage: `url(${list[count].sno})`*/
        }
    }


    return(
      <div className="wrap">
          <div className="letterbox-content">
              <img className="parmtree1" src={parmtree1}/>
              <img className="parmtree2" src={parmtree2}/>
              <img className="moon" src={moon}/>
              <div className="rabbit"></div>
              <div className="takeLetterSheet" ref={back} style={{backgroundImage : `url(${sheets[(list[18].sno)-1].Img})`}}>
                  <FontAwesomeIcon icon={faArrowRight} className="arrowRight"/>
                  <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft"/>
                  <div>
                      <div className="sendtBox" >{list[0].sendt}</div>
                      <div className="sendpBox" >{list[0].sendp}</div>
                  </div>

              </div>

          </div>
      </div>
    );
}



