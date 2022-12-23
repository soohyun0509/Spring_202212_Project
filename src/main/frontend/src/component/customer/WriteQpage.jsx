import React from 'react';
import '../css/writepage.css'
import axios from "axios";
export default function WriteQpage(props){

      // 글 작성
      const setCustomer=()=>{

          let writeForm=document.querySelector(".write-content");
          let formdata=new FormData(writeForm);

          axios.post("/customer/setCustomer" , formdata ,{headers : {'Content-Type' : 'multipart/form-data'}})
              .then(res=>{
                  alert(res.data)
              })
              .catch(e=>alert(e))
      }

    return(
        <div className="wrap">
            <div className="write-container">
                <div className="write-title">
                    <h3>글 쓰기 페이지</h3>
                </div>
                <form className="write-content">
                    카테고리 선택 // 카테고리 리스트 출력시키기<br/>
                    제목 : <input type="text" name="btitle" className="btitle"/><br/>
                    내용 <input type="text" name="bcontent"  className="bcontent"/><br/>
                    작성자 : <input type="text"  name="bwriter" className="bwriter"/><br/>
                    첨부파일 <input type="file" name="bfile"  className="bfile"/><br/>
                    비밀번호 : <input type="password" name="bpassword"  className="bpassword"/><br/>
                </form>
                <div className="write-btn">
                    <button type="button" onClick={setCustomer}>작성하기</button>
                </div>
            </div>

        </div>
    );
}