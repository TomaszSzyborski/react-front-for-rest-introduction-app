import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Information from "./routes/information";
import Reception from "./routes/reception";
import ControlRoom from "./routes/controlroom";
import ResetProgress from "./routes/resetprogress";
import Home from "./routes/home";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <BrowserRouter forceRefresh={true}>
        <App/>
        <Routes>
            <Route path="*" element={<Navigate to="/home" replace />}/>
            <Route exact path="/information" element={<Information/>}/>
            <Route exact path="/reception" element={<Reception/>}/>
            <Route exact path="/controlroom" element={<ControlRoom/>}/>
            <Route exact path="/resetprogress" element={<ResetProgress/>}/>
            <Route exact path="/home" element={<Home/>}/>
        </Routes>
    </BrowserRouter>
);
reportWebVitals();
