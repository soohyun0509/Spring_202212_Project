import React from "react";
import Header from './Header'
import Footer from './Footer'

import Login from "../member/Login";
import Letterbox from "../page/Letterbox";
import {HashRouter, BrowserRouter , Routes , Route , Link, Router} from 'react-router-dom';
import Diary from "../page/Diary";

export default function Index(props){
    return(

        <div>
            <HashRouter>
                <Header/>
                    <div className="mainContainer">
                    </div>
                <Footer/>
                <Routes>
                    <Route path="/"></Route>
                    <Route path="/member/login" element={<Login/>}></Route>
                    <Route path="/page/letterbox" element={<Letterbox/>}></Route>
                    <Route path="/page/diary" element={<Diary/>}></Route>
                </Routes>
            </HashRouter>
        </div>


    ); // return end
}// c end

