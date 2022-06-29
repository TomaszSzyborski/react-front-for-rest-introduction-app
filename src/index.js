import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Information from "./routes/information";
import Reception from "./routes/reception";
import ControlRoom from "./routes/controlroom";
import Resetprogress from "./routes/resetprogress";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="/information" element={<Information />} />
        <Route path="/reception" element={<Reception />} />
        <Route path="/controlroom" element={<ControlRoom />} />
        <Route path="/resetprogress" element={<Resetprogress />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
