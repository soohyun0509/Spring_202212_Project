import React from "react";
import logo from "../../img/logo3.png";

export default function SmallMainPage(props){
    return(
      <div className="tooSmall">
           너무 작은 화면에선<br/> 출력이 안돼요😥


              <div className="footer-center">
                  <img src={logo} />
                  <p>별똥별</p>
              </div>



      </div>
    );
}