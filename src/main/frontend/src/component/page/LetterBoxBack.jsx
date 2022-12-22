import React from "react";
import parmtree1 from "../../img/소나무_오른쪽.png";
import parmtree2 from "../../img/소나무_왼쪽.png";
import moon from "../../img/달.png";

export default function LetterBoxBack(props){
    //props.letterlist -> 편지 배열 받아오기
    // props.starImgList -> 편지 이미지리스트 받아온거
    return(
      <div className="wrap">
          <div className="letterbox-content">
              <img className="parmtree1" src={parmtree1}/>
              <img className="parmtree2" src={parmtree2}/>
              <div className="rabbit"></div>
              <img className="moon" src={moon}/>
              {
                  !props.letteropen &&

                  <div className="letterstar">
                      {
                          props.letterlist.map((c)=>{
                              // 1부터 5까지 랜덤 수 발동시켜서 src 넣어주기 랜덤으로 별뽑힐 수 있게 위치는 일단 ...
                              let rand=Math.floor((Math.random()*5)+1)
                              let topnum=Math.floor((Math.random()*70)+10)
                              let rigthnum=Math.floor((Math.random()*70)+10)
                              let width=(Math.random()*2)+1
                              console.log(width);
                              return(
                                  <div className="starBox" style={{top: topnum+"%", right: rigthnum+"%"} }>
                                      <p>{c.sendp}</p>
                                      <img className="randStar" src={props.starImgList[rand-1]} style={{width: width+"vw"}} onClick={props.moveLetterlist}/>
                                  </div>

                              );
                          })
                      }
                  </div>
              }
          </div>

      </div>
    );
}
