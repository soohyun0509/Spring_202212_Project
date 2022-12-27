import React, {useEffect, useState} from "react";
import "../css/viewselect.css"
import {useParams} from "react-router-dom";
import axios from "axios";

export default function ViewSelect(props){

    // bno 맞는 글 가져오기
    const bParam=useParams().bno;
    const [board, setBoard]=useState({});

    useEffect(()=>{
        axios.get("/customer/getViewSelect", {params : {bno : bParam}})
            .then(res=>{
                console.log(res.data);
                setBoard(res.data);
            })
            .catch(e=>console.log(e))

    },[])
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
                        <button>수정</button><button>삭제</button>
                    </div>
                </div>
                <div className="comment-wrap">
                    <h2>댓글</h2>
                    <div className="comment-content">
                        댓글 반복문 돌려서 뽑아내기
                    </div>
                    <div className="comment-input">
                        <input type="text"/>
                        <button type="button">댓글달기</button>
                    </div>
                </div>
            </div>

        </div>
    );
}