import React, {useState, useEffect} from "react";
import Header from '../main/Header'
import Footer from "../main/Footer";
import '../css/letterbox.css';
import Backimg from '../../img/back-img1.jpg'
import axios from "axios";
import LetterSheet from "./LetterSheet";
import {useParams} from "react-router-dom";
import rabbit1 from "../../img/rabbit1.png"
import rabbit2 from "../../img/rabbit2.png"
import parmtree1 from "../../img/소나무_오른쪽.png"
import parmtree2 from "../../img/소나무_왼쪽.png"
import moon from "../../img/달.png"
import s1 from "../../img/별1.png"
import s2 from "../../img/별2.png"
import s3 from "../../img/별3-1.png"
import s4 from "../../img/별4.png"
import s5 from "../../img/별5.png"
export default function Letterbox(props){

    // 별 이미지 배열
    const starimg=[s1,s2,s3,s4,s5];

    // 편지지 열리게
    const [letter, setLetteropen]=useState(false);
    const [letterlist , setLetterlist]=useState([]);

/*    // 토끼 이미지
    const [rabbitImg, setRabbitImg]=useState("")
    const [rabbiTrue, setRabbitTrue]=useState(true)*/
    //받은 편지 목록 가져오기
    // mno에 해당하는 편지목록 가져오면 될듯
    const param=useParams().mno;
    let array=[] // 편지지 리스트 담을 배열
    const getLetterList=()=>{
        axios.get("/letterbox/getLetterList", {params : {mno : param}})
            .then(res=>{
                console.log(res.data)
                setLetterlist(res.data)


            })
            .catch(err=>{console.log(err)})
    }

    // 페이지 생성될때 받은 편지지 목록 출력시켜야함
    useEffect(getLetterList, [])


    return(
        <div className="wrap">
            <div className="letterbox-content">
                <img className="parmtree1" src={parmtree1}/>
                <img className="parmtree2" src={parmtree2}/>
                <img className="moon" src={moon}/>
                <div className="rabbit"></div>

{/*                <button type="button" onClick={()=>setLetteropen(!letter)}>
                    {letter && <img className="rabbit" src={rabbit1} />}{!letter && <img className="rabbit" src={rabbit2} />}
                </button>*/}
                <p>토끼를 눌러주세요!</p>
                <div className="letterstar">
                    {
                        letterlist.map((c)=>{
                            // 1부터 5까지 랜덤 수 발동시켜서 src 넣어주기 랜덤을 별뽑힐 수 있게 위치는 일단 ...
                            let rand=Math.floor((Math.random()*5)+1)
                            let topnum=Math.floor((Math.random()*700)+100)
                            let rigthnum=Math.floor((Math.random()*1400)+200)
                            let width=Math.floor((Math.random()*4)+2)
                            return(
                                <div>
                                    <p>{c.sendp}</p>
                                    <img className="randStar" src={starimg[rand-1]} style={{top: topnum, right: rigthnum , width: width+"%"} }/>
                                </div>

                            );
                        })
                    }


                </div>
            </div>
            <div>
            </div>
            <div className="letter-content">
                {letter && <LetterSheet/>}
            </div>
        </div>

    );
}


/*

*/
