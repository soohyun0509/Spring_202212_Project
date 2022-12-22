import React from "react";
import Header from './Header'
import Footer from './Footer'
import Login from "../member/Login";
import Letterbox from "../page/Letterbox";
import {HashRouter, BrowserRouter , Routes , Route , Link, Router} from 'react-router-dom';
import Diary from "../page/Diary";
import Mainpage from "./Mainpage";
import OpenLetter from "../page/OpenLetter";
import MediaQuery, {useMediaQuery} from "react-responsive";
export default function Index(props){

    return(
        <div className="index-wrap">
            <BrowserRouter>
                <MediaQuery minWidth={340}>
                    <Header/>
                    <div className="page-wrap">
                        <Routes>
                            <Route path="/" element={<Mainpage/>}></Route>
                            <Route path="/member/login" element={<Login/>}></Route>
                            <Route path="/page/letterbox/:mno" element={<Letterbox/>}></Route>
                            <Route path="/page/openletter/:mno" element={<OpenLetter/>}></Route>
                        </Routes>
                    </div>
                </MediaQuery>
                <MediaQuery maxWidth={340}>
                    <div className="tooSmall">
                        너무 작은 화면에선<br/> 출력이 안돼요😥
                    </div>
                </MediaQuery>
                <Footer/>
            </BrowserRouter>
        </div>



    ); // return end
}// c end

