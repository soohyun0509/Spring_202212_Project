import React, {useState, useEffect} from "react";
import '../css/letterbox.css';
import {useParams , useNavigate} from 'react-router-dom'
import axios from "axios";
import LetterSheet from "./LetterSheet";
import OpenLetter from "./OpenLetter";
import parmtree1 from "../../img/소나무_오른쪽.png"
import parmtree2 from "../../img/소나무_왼쪽.png"
import moon from "../../img/달.png"
import s1 from "../../img/별1.png"
import s2 from "../../img/별2.png"
import s3 from "../../img/별3-1.png"
import s4 from "../../img/별4.png"
import s5 from "../../img/별5.png"
import letterBtn from "../../img/letterBtn.png"

export default function Letterbox(props){
    // 별 이미지 배열
    const starimg=[s1,s2,s3,s4,s5];

    // 편지지 열리게
    const [letter, setLetteropen]=useState(false);
    const [letterlist , setLetterlist]=useState([]);

    const navigate=useNavigate();

    //받은 편지 목록 가져오기
    // mno에 해당하는 편지목록 가져오면 될듯
    const param=useParams().mno;
    let array=[] // 편지지 리스트 담을 배열
    // 페이지 생성될때 받은 편지지 목록 출력시켜야함
    const getLetterList=()=>{
        axios.get("/letterbox/getLetterList", {params : {mno : param}})
            .then(res=>{
                console.log(res.data)
                setLetterlist(res.data)
            })
            .catch(err=>{console.log(err)})
    }



    useEffect(getLetterList, []);


    // 로그인한 해당 사람이면 편지작성버튼 안뜨게 설정해야함

    // 받은 편지 오픈
    const [takeLetter, setTakeLetter]= useState(false);


    return(
        <div className="wrap">
            <div className="letterbox-content">
                <img className="parmtree1" src={parmtree1}/>
                <img className="parmtree2" src={parmtree2}/>
                <img className="moon" src={moon}/>
                <div className="rabbit"></div>
                <div className="letterstar">
                    {
                        letterlist.map((c)=>{
                            // 1부터 5까지 랜덤 수 발동시켜서 src 넣어주기 랜덤을 별뽑힐 수 있게 위치는 일단 ...
                            let rand=Math.floor((Math.random()*5)+1)
                            let topnum=Math.floor((Math.random()*700)+100)
                            let rigthnum=Math.floor((Math.random()*1400)+200)
                            let width=Math.floor((Math.random()*35)+20)
                            return(
                                <div className="starBox" style={{top: topnum, right: rigthnum} }>
                                    <p>{c.sendp}</p>
                                    <img className="randStar" src={starimg[rand-1]} style={{width: width+"%"}} onClick={()=>{
                                        navigate("/page/openletter/"+param, {state : {letterlist : letterlist} })
                                        }}
                                    />
                                </div>

                            );
                        })
                    }
                </div>
                <div className="btnBox">
                    <p>편지작성</p>
                    <img className="letterBtn" src={letterBtn} onClick={()=>{setLetteropen(true)}}/>
                </div>

            </div>
            <div>
            </div>
            <div className="component-connect">
                {letter && <LetterSheet letterClose={()=>{setLetteropen(false)}}/>}
            </div>

        </div>

    );
}


/*

*/
