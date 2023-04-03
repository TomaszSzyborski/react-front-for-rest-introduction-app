import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Office from "./routes/office";
import Reception from "./routes/reception";
import ControlRoom from "./routes/controlroom";
import ResetProgress from "./routes/resetprogress";
import Home from "./routes/home";
import {BlownUpContextProvider} from "./utils/contexts/blownUpContext";

const root = ReactDOM.createRoot(
        document.getElementById("root"),
    );

const message = "In 1986 we hadn't had mobile phones, ${flag_back_to_the_future}"

root.render(
    <>{
    (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) &&
    <h1 className="phone">{message}</h1>) ||
    <BrowserRouter forceRefresh={true}>
        <App/>
            <BlownUpContextProvider>
                <Routes>
                    <Route path="*" element={<Navigate to="/home" replace/>}/>
                    <Route exact path="/office" element={<Office/>}/>
                    <Route exact path="/reception" element={<Reception/>}/>
                    <Route exact path="/controlroom" element={<ControlRoom/>}/>
                    <Route exact path="/resetprogress" element={<ResetProgress/>}/>
                    <Route exact path="/home" element={<Home/>}/>
                </Routes>
            </BlownUpContextProvider>
    </BrowserRouter>
    }</>
);
reportWebVitals();
