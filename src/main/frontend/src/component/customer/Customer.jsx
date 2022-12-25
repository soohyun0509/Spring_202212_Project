import React, {useEffect, useState} from "react";
import '../css/customer.css'
import axios from "axios";
export default function Customer(props){


    // 글 카테고리 출력하기
    const[boardlist, setBoardlist]=useState([]);
    useEffect(()=>{
        axios.get("/customer/getBoardList")
            .then(res=>{
                console.log(res.data)
            })
            .catch(e=>console.log(e))
    },[])

    return(
        <div className="wrap">
            <div className="customer-wrap">
                <div className="cTitle">
                    <h1>문의사항 및 공지</h1>
                </div>
                <div className="customer-content">
                    <table>
                        <tr>
                            <th>번호</th><th>제목</th><th>글쓴이</th><th>조회수</th><th>작성날짜</th>
                        </tr>
                        {

                        }
                    </table>
                </div>
                <div className="customer-bottom">
                    <a href="/customer/writeQpage"><button>작성하기</button></a>
                </div>
            </div>


        </div>
    );
}