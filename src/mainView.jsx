import {useEffect, useMemo, useState} from 'react';
import './index.css';
import App from './App';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Office from "./routes/office";
import Reception from "./routes/reception";
import ControlRoom from "./routes/controlroom";
import ResetProgress from "./routes/resetprogress";
import Home from "./routes/home";
import Preload from "./utils/Preload";
import {BlownUpContextProvider} from "./utils/contexts/blownUpContext";

function isInMobileView(windowWidth, windowHeight){
        const smallViewportWidthList = [480, 800, 1280, 390, 360, 428, 214, 375, 600, 411, 414]
        const smallViewportHeightList = [736, 640, 740, 960, 844, 780, 812, 823, 850, 853, 731, 379, 667, 926]
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        const isInMobileView = smallViewportWidthList.includes(windowWidth)
                            || smallViewportHeightList.includes(windowHeight)
        const isDownscaled = windowWidth < 1300 || windowHeight < 750
        return ([isMobile, isDownscaled].some(it => it))
}
export default function MainView() {
    const [mobileViewport, setMobileViewport] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.outerWidth);
    const [windowHeight, setWindowHeight] = useState(window.outerHeight);

//     const smallViewportWidthList = [1024, 768, 480, 800, 1280, 390, 360, 428, 214, 375, 600, 411, 414]
    const message = "In 1986 we hadn't had mobile electronic devices like that! ${flag_back_to_the_future}"

    useEffect(() => {
        function handleResize() {
          setWindowWidth(window.outerWidth);
          setWindowHeight(window.outerHeight);
        }
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect( () => {
        if(isInMobileView(windowWidth, windowHeight)){
            setMobileViewport(true)
        }
        return () => setMobileViewport(false)
    },[windowWidth, windowHeight])

    return <>{
    (
        mobileViewport && <h1 className="phone">{message}</h1>) || (
    <>
    <Preload/>
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
    </>)
    }</>
}