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
    // 편지지 열리게
    const [letter, setLetteropen]=useState(false);

    //받은 편지 목록 가져오기
    // mno에 해당하는 편지목록 가져오면 될듯
    const mno=useParams().mno;
    console.log(mno);
    const getLetterList=()=>{
        axios.get("/letterbox/getLetterList", {params : {mno : mno}})
            .then(res=>{console.log(res.data)})
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
                <img className="s1" src={s1}/>
                <img className="s2" src={s2}/>
                <img className="s3" src={s3}/>
                <img className="s4" src={s4}/>
                <img className="s5" src={s5}/>
                <button type="button" onClick={()=>setLetteropen(!letter)}>
                    {letter && <img className="rabbit" src={rabbit1} />}{!letter && <img className="rabbit" src={rabbit2} />}
                </button>
                <p>토끼를 눌러주세요!</p>
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
