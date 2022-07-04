import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import radioActiveIcon from "../assets/images/radioactiveBasic.png";

export default function Home() {
    return (
        <main id={"panorama-container"}>
            <div id={"panorama"}></div>
        </main>
    );
}