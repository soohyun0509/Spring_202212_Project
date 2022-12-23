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


import LetterBoxBack from "./LetterBoxBack";
import ResLetterBoxBack from "../responsive/ResLetterBoxBack";
import ResLetterSheet from "../responsive/ResLetterSheet"
import MediaQuery, {useMediaQuery} from "react-responsive";
import sheet1 from "../../img/sheet1.png";
import sheet2 from "../../img/sheet2.png";
import sheet3 from "../../img/sheet3.png";
import sheet4 from "../../img/sheet4.png";
import sheet5 from "../../img/sheet5.png";

export default function Letterbox(props){
    // 편지지 배열
    const sheets=[
        {Img : sheet1,sno : 1},
        {Img : sheet2,sno : 2},
        {Img : sheet3,sno : 3},
        {Img : sheet4,sno : 4},
        {Img : sheet5,sno : 5}
    ];
    //미디어 쿼리
    const onlyLetter=useMediaQuery({query : '(maxWidth : 1070px)'})

    // 리스트 같이 이동시키기 위한 훅
    const navigate=useNavigate();
    // 별 이미지 배열
    const starimg=[s1,s2,s3,s4,s5];

    const param=useParams().mno;
    console.log(param+ " : param")
    // 로그인한 사람이랑 url의 mno이 똑같은지 파악
    // 편지지 열리게
    const [letteropen, setLetteropen]=useState(false);
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

    // 편지 받는 사람 이름 가져오기
    // 이거 letterbox에서 props로 해결할 수 있을것같기도 하고...아닌것같기도하고...
    const [mname, setMname] =useState("");
    // 편지지에 출력시킬 mname 가져오기
    // 링크에서 mno뽑아가지고 mname 가져오면 될듯!
    const getMname=()=>{
        axios.get("/member/getMname" , {params : {mno : param}})
            .then(res=>{
                console.log(res.data);
                if(res.data!=""){ // null이 아니면 이름이랑 넣어주기
                    setMname("To . "+res.data)
                }
            })
            .catch(err=>{console.log(err)})
    }
    useEffect(getMname,[]);
    // 받은 편지 리스트로 이동하는 메서드
    // 본인 아니면 눌러도 변동 없게 설정해야함
    const moveLetterlist=()=>{

        // 내가 설정한 날 아니면 열어볼 수 없게 설정하기
        // 시간 설정을 어떻게 해야되지
        // 서버시간가져와서 같은지 아닌지 체크하고 넘기면 될듯
        // 근데 그날인지 아닌지 체크하는게 아니라 그날 이후면 다되는건데...
        // 아 년도만 가져오면 되겠다 년도 이상이면 다 열려야되니까
        let today=new Date();
        let year=today.getFullYear()
        // 본인 아니면 알림창 뜨고 안열리게 조건
        // 로그인 정보 가져와야될듯
        if(!checkMno){
            alert("편지는 본인만 열어볼 수 있습니다.");
        }else{
            if(year=="2022"){ // 나중에 2023으로 바꾸기!!!!!!!!!!!!
                navigate("/page/openletter/"+param, {state : {letterlist : letterlist} })
            }else{
                alert("2023년을 기다려주세요!");
            }
        }


    }

    ///////////////////////////// 링크 복사 !!! //////////////////////////////////////////
    const copy=()=>{
        window.navigator.clipboard.writeText("http://localhost:8080/page/letterbox/"+param)
            .then(()=>{alert("URL이 복사됐습니다.")})
            .catch((e)=>{alert(e)})
    }



    return(
        <div className="wrap">

            <div className="letterbox-content">
                <MediaQuery minWidth={1070}>
                    <LetterBoxBack letteropen={letteropen} letterlist={letterlist} starImgList={starimg} moveLetterlist={moveLetterlist}/>

                </MediaQuery>
                <MediaQuery maxWidth={1069}>
                    <ResLetterBoxBack letteropen={letteropen} letterlist={letterlist} starImgList={starimg} moveLetterlist={moveLetterlist}/>
                </MediaQuery>
            { !checkMno ?
                (<div className="btnBox">
                    <p>편지작성</p>
                    <img className="letterBtn" src={letterBtn} onClick={() => { setLetteropen(true)  }}/>
                 </div>) :
                (
                    <div className="btnBox">
                        <div className="copybtn" onClick={copy}>링크 복사하기🐰</div>
                    </div>
                )
            }
                <div className="component-connect">
                    {letteropen &&
                        <MediaQuery minWidth={916}>
                            <LetterSheet param={param} sheets={sheets} mname={mname} letterClose={()=>{setLetteropen(false)}}/>
                        </MediaQuery>
                     }
                    {letteropen &&
                        <MediaQuery maxWidth={915}>
                            <ResLetterSheet param={param} sheets={sheets} mname={mname} letterClose={()=>{setLetteropen(false)}}  />
                        </MediaQuery>
                    }
                </div>

            </div>

        </div>

    );
}
