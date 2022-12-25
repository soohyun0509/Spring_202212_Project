import React, {useEffect, useState} from 'react';
import '../css/writepage.css'
import axios from "axios";
export default function WriteQpage(props){




    const[categoryList, setCategoryList]= useState([]);
    const[selectCate, setSelectCate]=useState("2"); // 기본 카테고리 자유게시판

      // 글 작성
      const setCustomer=()=>{

          let writeForm=document.querySelector(".write-content");
          let formdata=new FormData(writeForm);
          formdata.set("bcno" , selectCate);
          axios.post("/customer/setCustomer" , formdata ,{headers : {'Content-Type' : 'multipart/form-data'}})
              .then(res=>{
                  alert(res.data)
              })
              .catch(e=>alert(e))
      }

      //카테고리 리스트 가져오기
    useEffect(()=>{
        axios.get("/customer/getCategory")
            .then(res=>{setCategoryList(res.data)})
            .catch(e=>console.log(e))
    },[])


    return(
        <div className="wrap">
            <div className="write-container">
                <div className="write-title">
                    <h2>Q&A</h2>
                </div>
                <div className="category">
                {
                    categoryList.map((c)=>{
                        return(
                            <button type="button" onClick={()=>{setSelectCate(c.bcno); alert(c.bctitle+" 카테고리 선택")}}>{c.bctitle}</button>
                        );
                    })
                }
                </div>
                <form className="write-content">
                    <table className="formTable">
                        <tr>
                            <th className="boardTitle">제목</th><td><input type="text" name="btitle" className="btitle"/></td>
                        </tr>
                        <tr>
                            <th className="boardTitle">작성자</th><td><input type="text"  name="bwriter" className="bwriter"/></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><textarea name="bcontent" className="bcontent"/></td>
                        </tr>
                        <tr>
                            <th className="boardTitle">첨부파일</th><td><input type="file" name="bfile"  className="bfile"/></td>
                        </tr>
                        <tr>
                            <th className="boardTitle">비밀번호</th><td><input type="password" name="bpassword"  className="bpassword"/></td>
                        </tr>
                    </table>

                </form>
                <div className="write-btn">
                    <button type="button" onClick={setCustomer}>작성하기</button>
                </div>
            </div>

        </div>
    );
}