import React, {useEffect, useState} from "react";
import '../css/customer.css'
import axios from "axios";
import Pagination from 'react-js-pagination'
import MediaQuery from "react-responsive";
export default function Customer(props){

    // 글 카테고리 출력하기
    const[category, setCategory]=useState([]);
    useEffect(()=>{
        axios.get("/customer/getCategory")
            .then(res=>setCategory(res.data))
            .catch(e=>console.log(e));
    },[])



    // 페이징처리
    const[pageInfo, setPageInfo]=useState({bcno : 0 , page : 1, key : "" , keyword : ""})

    // 글 목록 출력하기
    const[boardlist, setBoardlist]=useState({list : []});
    const getboardlist=()=>{
        axios.post("/customer/getBoardList" , pageInfo)
            .then(res=>{
                console.log(res.data)
                setBoardlist(res.data);
            })
            .catch(e=>console.log(e))
    }
    useEffect(getboardlist, [pageInfo]);

    // 카테고리 선택별 목록 출력
    const viewCategory=(bcno)=>{setPageInfo({bcno: bcno , page : 1, key: "" , keyword: ""});}
    // page 넘기기
    const onPage=(page)=>{
        setPageInfo({bcno: pageInfo.bcno , page : page, key: pageInfo.key , keyword: pageInfo.keyword});
    }

    // 검색
    const onSearch=(()=>{
        setPageInfo({
            bcno : pageInfo.bcno , page : 1,
            key : document.querySelector(".key").value,
            keyword: document.querySelector(".keyword").value
        })
    })

    // 상세페이지 이동
    const selectBoard=(bno)=>{
        window.location.href="/customer/viewSelect/"+bno;
    }



    return(
        <div className="wrap">
            <MediaQuery minWidth={1250}>
            <div className="customer-wrap">
                <div className="cTitle">
                    <h1>문의사항 및 공지</h1>
                </div>
                <div className="category-content">
                    <button type="button" onClick={ ()=> viewCategory(0)} >전체보기</button>
                    {
                        category.map((c)=>{
                            return(
                                <button type="button" onClick={ ()=> viewCategory(c.bcno)}>{c.bctitle}</button>
                            )
                        })
                    }
                </div>
                <div className="customer-content">
                    <table>
                        <tr>
                            <th className="c-bno">번호</th><th className="c-btitle">제목</th>
                            <th className="c-bwriter">작성자</th><th className="c-bview">조회수</th><th className="c-bdate">작성 날짜</th>
                        </tr>
                        {
                            boardlist.list.map((b)=>{
                                return(
                                  <tr>
                                        <th>{b.bno}</th><th className="c-btitle-content" onClick={()=>{selectBoard(b.bno)}}>{b.btitle}</th>
                                        <th>{b.bwriter}</th><th>{b.bview}</th><th>{b.bdate}</th>
                                  </tr>
                                );
                            })
                        }
                    </table>
                    <div className="pagination">
                        <Pagination
                            activePage={pageInfo.page}
                            itemsCountPerPage={5}
                            totalItemsCount={boardlist.totalBoards}
                            pageRangeDisplayed={5}
                            onChange={onPage}
                        />
                    </div>
                </div>
                <div className="searchBox">
                    <select className="key">
                        <option value="btitle">제목</option><option value="bcontent">내용</option>
                    </select>
                    <input type="text" className="keyword"/>
                    <button type="button" className="searchBtn" onClick={onSearch}>검색</button>
                </div>
                <div className="customer-bottom">
                    <a href="/customer/writeQpage"><button>작성하기</button></a>
                </div>
            </div>
            </MediaQuery>
            <MediaQuery maxWidth={1249}>
                <div className="onlyWeb">
                    웹 환경에서만 이용 가능해요😥
                </div>
            </MediaQuery>

        </div>
    );
}