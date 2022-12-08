import React from "react";
import Header from './Header'
import Footer from './Footer'

import Login from "../member/Login";
import Letterbox from "../page/Letterbox";
import {HashRouter, BrowserRouter , Routes , Route , Link, Router} from 'react-router-dom';
import Diary from "../page/Diary";

export default function Index(props){
    return(
        <div className="index-wrap">
            <BrowserRouter>
                <Header/>
                <div className="page-wrap">
                    <Routes>
                        <Route path="/"></Route>
                        <Route path="/member/login" element={<Login/>}></Route>
                        <Route path="/page/letterbox/:mno" element={<Letterbox/>}></Route>
                        <Route path="/page/diary" element={<Diary/>}></Route>
                    </Routes>
                </div>
                <Footer/>
            </BrowserRouter>
        </div>


    ); // return end
}// c end

