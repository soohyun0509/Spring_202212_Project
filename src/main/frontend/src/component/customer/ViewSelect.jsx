import React, {useEffect, useState} from "react";
import "../css/viewselect.css"
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export default function ViewSelect(props){

    // bno 맞는 글 가져오기
    const bParam=useParams().bno;
    const [board, setBoard]=useState({});
    useEffect(()=>{
        axios.get("/customer/getViewSelect", {params : {bno : bParam}})
            .then(res=>{
                console.log(res.data)
                setBoard(res.data);
            })
            .catch(e=>console.log(e))

    },[])
/*    // 게시물 조회수 올리기
    const [viewcount, setViewcount]=useState(board.bview);*/

    useEffect(()=>{
        axios.get("/customer/upViewCount", {params : {bno : bParam}})
            .then(res=>{console.log(res.data)})
            .catch(e=>console.log(e))
    },[])



    // 댓글 등록
    // bno 이랑 댓글 내용 전달하기
    const [commentRe, setCommentRe]=useState(false) // 값 변경될때마다 댓글 새로고침할 수 있게
    const setComment=()=>{
        let data={
            bno: bParam,
            comment : document.querySelector(".comment").value
        }
        axios.post("/customer/setcomment" , data)
            .then(res=>{
                console.log(res.data)
                if(res.data===true){
                    setCommentRe(!commentRe)
                    document.querySelector(".comment").value="";
                }else{alert("댓글 등록 실패, 관리자에게 문의해주세요")}
            })
            .catch(e=>console.log(e))
    }

    // 해당 게시물 댓글 출력
    // 페이지 열렸을때 , 댓글 달렸을때 갱신 해야함
    const[commentList, setCommentList]=useState([]);
    const getCommentList=()=>{
        axios.get("/customer/getcommentlist", {params : {bno : bParam}})
            .then(res=>{
                console.log(res.data);
                setCommentList(res.data);
            })
            .catch(e=>console.log(e))
    }
    useEffect(getCommentList,[commentRe])

    // 수정, 삭제
    // 비밀번호 확인 받아야돼
    // 비밀번호 체크창
    const[pwCheck, setPwCheck]=useState(false)
    const [upDel, setUpDel]=useState("");

    const navigate=useNavigate();
    // 비밀번호 일치여부 확인
    const onDelete=(bno)=>{
        if(upDel=="2"){
            axios.delete("/customer/onDelete", {params : {bno : bno , bpassword : document.querySelector(".delinput").value}})
                .then(res=>{
                    console.log(res.data)
                    if(res.data===3){
                        alert("삭제 실패, 관리자에게 문의해주세요");
                        setPwCheck(false);
                    }else if(res.data===2){
                        alert("비밀번호가 다릅니다.")
                        setPwCheck(false);
                    }else{
                        alert("삭제 완료됐습니다.")
                        window.location.href="/customer/cmainpage"
                    }
                })
                .catch(e=>console.log(e))
        }else if(upDel=="1"){
            // 수정이면 비밀번호 맞는지 확인하고 페이지 이동시켜주기
            axios.get("/customer/onUpdate", {params : {type : 1, bno : bno , bpassword : document.querySelector(".delinput").value}})
                .then(res=>{
                    console.log(res.data);
                    if(res.data===4){
                        navigate("/customer/customerUpdate", {state :{board : board}})
                    }else{
                        alert("비밀번호가 다릅니다.");
                        setPwCheck(false);
                    }

                })
                .catch(e=>console.log(e))
        }


    }

    return(
        <div className="wrap">
            <div className="view-wrap">
                <div className="vTitle">
                    <h1>개별 글 출력</h1>
                </div>
                <div className="view-content">
                    <table className="view-table">
                        <tr>
                            <th className="table-cell">제목</th><td className="table-btitle">{board.btitle}</td>
                        </tr>
                        <tr>
                            <th className="table-cell">작성자</th><td className="table-bwriter">{board.bwriter}</td>
                        </tr>
                        <tr>
                            <th className="table-cell">내용</th><td className="table-bcontent">{board.bcontent}</td>
                        </tr>
                        <tr>
                            <th className="table-cell">첨부파일</th><td>첨부파일 넣어야돼</td>
                        </tr>

                    </table>
                    <div className="table-btnlist">
                        {
                            !pwCheck &&
                            <div><button className="upBtn" onClick={()=>{setPwCheck(true); setUpDel("1")}}>수정</button><button className="delBtn" onClick={()=>{setPwCheck(true);  setUpDel("2")}}>삭제</button> </div>
                        }
                        {
                            pwCheck &&
                            <div>
                               <input className="delinput" type="password" placeholder="비밀번호를 입력해주세요"/>
                                <button type="button" className="checkBtn" onClick={()=>onDelete(board.bno)}>입력</button>
                            </div>
                        }

                    </div>
                </div>
                <div className="comment-wrap">
                    <h2>댓글</h2>
                    <div className="comment-content">
                        {
                            commentList.map((c)=>{
                                return(
                                    <div>{c.comment}</div>
                                )
                            })
                        }
                    </div>
                    <div className="comment-input">
                        <input type="text" className="comment"/>
                        <button type="button" onClick={setComment}>댓글달기</button>
                    </div>
                </div>
            </div>

        </div>
    );
}