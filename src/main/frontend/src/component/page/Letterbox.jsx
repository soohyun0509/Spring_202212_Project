import React, {useState, useEffect} from "react";
import Header from '../main/Header'
import Footer from "../main/Footer";
import '../css/letterbox.css';
import Backimg from '../../img/back-img1.jpg'
import axios from "axios";
import LetterSheet from "./LetterSheet";

export default function Letterbox(props){
    //mno을 가져와야돼

    const [letter, setLetteropen]=useState(false);

    return(
        <div className="wrap">
            <div className="letterbox-content">
            </div>
            <div>
                <button type="button" className="letterbox-writebtn btn-8" onClick={()=>setLetteropen(!letter)}>
                    {letter && <span>그만두기</span>}{!letter && <span>작성하기</span>}
                </button>
            </div>
            <div className="letter-content">
                {letter && <LetterSheet/>}
            </div>
        </div>

    );
}


/*

*/
