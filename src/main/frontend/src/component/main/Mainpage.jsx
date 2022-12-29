import React, {useEffect, useState} from "react";
import '../css/index.css'
import star from "../../img/별3.png"
import axios from "axios";
export default function Mainpage(props){


    const[mno ,setMno]=useState(null); // 회원번호 넣을 변수

    useEffect(()=>{
        axios.get("/member/getmemberMno").then(res=>{
            console.log(res.data)
            if(res.data!==""){
                setMno(res.data.mno)
            }
        })
            .catch(err=>{alert(err)})
    },[])

    return (
      <div>
            <div className="fadein">
                  <p className="text1">여러분들의</p>
                  <p className="text2">소중한 마음을 전해보세요</p>
                  <img className="star" src={star} onClick={()=>{
                      if(mno==null){
                          window.location.href=`/member/login`
                      }else{
                          window.location.href=`/page/letterbox/${mno}`
                      }
                  }}/>
            </div>
      </div>
    );
}