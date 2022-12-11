import React from "react";
import '../css/index.css'
import star from "../../img/별3.png"
export default function Mainpage(props){

    console.log("dfdfd")

    return (
      <div className="fadein">
          <p className="text1">여러분들의</p>
          <p className="text2">소중한 마음을 전해보세요</p>
          <img className="star" src={star} />
      </div>
    );
}