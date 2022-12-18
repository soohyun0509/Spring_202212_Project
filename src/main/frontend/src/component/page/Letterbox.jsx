import React, {useState, useEffect, useRef} from "react";
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
    // 리스트 같이 이동시키기 위한 훅
    const navigate=useNavigate();
    // 별 이미지 배열
    const starimg=[s1,s2,s3,s4,s5];
    const param=useParams().mno;
    // 로그인한 사람이랑 url의 mno이 똑같은지 파악
    // 편지지 열리게
    const [letter, setLetteropen]=useState(false);
    const [letterlist , setLetterlist]=useState([]);

    // 현재 로그인한 사람과 링크의 mno이 같은 사람인지
    const[checkMno, setCheckMno]=useState(false);

    // 별 움직임 변동 useRef에 넣어보기
    // 이거로 안될것같은데... 위치 정하는게 4개나 있었네...

    //받은 편지 목록 가져오기
    // mno에 해당하는 편지목록 가져오면 될듯
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

    // 로그인정보 출력 메서드
    // url에 있는 mno이랑 지금 mno이 같은지 아닌지를 판단해서 편지오픈이랑 편지작성 설정하기
    useEffect(()=>{
        axios.get("/member/getmemberMno")
            .then(res=>{
                if(res.data.mno==param){
                    setCheckMno(true)// true 반환이면 현재 로그인한 사람과 링크의 mno이 같은 사람
                }else{
                    setCheckMno(false)
                }
            })
            .catch(err=>{console.log(err)})
    },[])

    // 받은 편지 리스트로 이동하는 메서드
    // 본인 아니면 눌러도 변동 없게 설정해야함
    const moveLetterlist=()=>{
        // 본인 아니면 알림창 뜨고 안열리게 조건
        // 로그인 정보 가져와야될듯
        if(checkMno){
            // 이동
            navigate("/page/openletter/"+param, {state : {letterlist : letterlist} })
        }else{
            alert("편지는 본인만 열어볼 수 있습니다.");
        }
    }
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
                                    <img className="randStar" src={starimg[rand-1]} style={{width: width+"%"}} onClick={moveLetterlist}/>
                                </div>

                            );
                        })
                    }
                </div>

                { !checkMno &&
                    <div className="btnBox">
                    <p>편지작성</p>
                    <img className="letterBtn" src={letterBtn} onClick={() => {
                        setLetteropen(true)
                    }}/>
                </div>
                }
                <div className="component-connect">
                    {letter && <LetterSheet letterClose={()=>{setLetteropen(false)}}/>}
                </div>
            </div>
            <div>
            </div>


        </div>

    );
}


/*

*/
