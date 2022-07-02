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
reportWebVitals();
