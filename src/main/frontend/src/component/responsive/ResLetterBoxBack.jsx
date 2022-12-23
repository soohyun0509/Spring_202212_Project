import React from "react";
import moon from "../../img/달.png";

export default function ResLetterBoxBack(props){
    return(
        <div className="wrap">
            <div className="letterbox-content">
                <img className="moon" src={moon}/>
                {
                    !props.letteropen &&
                    <div className="letterstar">
                        {
                            props.letterlist.map((c)=>{
                                let rand=Math.floor((Math.random()*5)+1)
                                let topnum=Math.floor((Math.random()*80)+(-1))
                                let leftnum=Math.floor((Math.random()*70)+20)
                                let width=(Math.random()*4)+3
                                return(
                                    <div className="starBox" style={{top: topnum+"%", left: leftnum+"%"} }>
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