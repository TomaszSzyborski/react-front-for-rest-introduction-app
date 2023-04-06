import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MainView from "mainView";

const root = ReactDOM.createRoot(
        document.getElementById("root"),
    );

root.render(
    <MainView/>
);
reportWebVitals();
