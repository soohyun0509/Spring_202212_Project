import React, {useRef} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";

export default function CustomerUpdate(props){

    const location=useLocation();

    const board=location.state.board;


    // 수정 메소드
    const upBoard=()=>{

        let boardform=document.querySelector(".write-content");
        let formdata=new FormData(boardform);
        formdata.set("bno" , board.bno)

        axios.put("/customer/upBoard", formdata, {headers : {'Content-Type': 'multipart/form-data'}})
            .then(res=>{
                console.log(res.data);
                if(res.data===true){
                    alert("수정완료했습니다.");
                    window.location.href="/customer/viewSelect/"+board.bno;
                }else{
                    alert("수정실패, 관리자에게 문의해주세요")
                }
            })
            .catch(e=>console.log(e))
    }




    return(
        <div className="wrap">
            <div className="write-container">
                <div className="write-title">
                    <h2>게시글 수정</h2>
                </div>
                <form className="write-content">
                    <table className="formTable">
                        <tr>
                            <th className="boardTitle">제목</th><td><input type="text" name="btitle" className="btitle" defaultValue={board.btitle}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><textarea name="bcontent" className="bcontent"  defaultValue={board.bcontent}/></td>
                        </tr>
                        <tr>
                            <th className="boardTitle">첨부파일</th><td><input type="file" name="bfile"  className="bfile"/></td>
                        </tr>
                    </table>

                </form>
                <div className="write-btn">
                    <button type="button" onClick={upBoard}>수정하기</button>
                </div>
            </div>

        </div>
    );
}