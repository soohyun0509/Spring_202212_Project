import React from "react";
import "../css/openletter.css"
import parmtree1 from "../../img/소나무_오른쪽.png";
import parmtree2 from "../../img/소나무_왼쪽.png";
import moon from "../../img/달.png";
import {useParams, useLocation} from "react-router-dom";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function OpenLetter(props){

    // letterbox에서 편지리스트 전달받음
    const location=useLocation();
    console.log(location.state.letterlist)

    // 요기에 편지지이미지랑, 등등 추가해서 넣고싶다
    let list=[]
    location.state.letterlist.forEach((l)=>{
        let content={
            sendp : location.state.letterlist.sendp,
            sendt : location.state.letterlist.sendt
        }
        list.push(content)
    })
    console.log(list)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode : false,
        centerPadding : 0
    };

    return(
      <div className="wrap">
          <div className="letterbox-content">
              <img className="parmtree1" src={parmtree1}/>
              <img className="parmtree2" src={parmtree2}/>
              <img className="moon" src={moon}/>
              <div className="rabbit"></div>
              <div className="takeLetterSheet">
                  <Slider {...settings}>
                    {
                          location.state.letterlist.map((l=>{
                              return(
                                  <div>
                                      <div className="sendtBox">{l.sendt}</div>
                                      <div className="sendpBox">{l.sendp}</div>
                                  </div>
                              );
                          }))
                      }
                  </Slider>
              </div>

          </div>
      </div>
    );
}