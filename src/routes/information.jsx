import axios from "axios";
import corridor from "../assets/images/corridor.jpg"
import {useState} from "react";

import React, {useEffect} from 'react'
// import Typewriter from 'typewriter-effect';
import {useTypewriter} from 'react-simple-typewriter'

const getReactorInfo = (setData) => {
    axios.get("http://0.0.0.0:9011/challenge/reactor/information", {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'for-frontend': "only"
        }
    })
        .then(response => {
            //TODO count flags on frontend only
                // console.log(response.data.message)
                setData(response.data.message)
            }
        )
    ;
}
const eraseCall = (setData, setSlams, getSlams) => {
    setData("")
    setSlams(getSlams + 1)
    if (getSlams > 5) {
        alert("You've broken the phone... General Secretary won't be proud.\n" +
            "You earned something however...\n" +
            "${emotional_reaction_get_it?_reaction...}")
    }
}

const handler = () => {
    console.table([{flag: "${curious_console_observer}"}])
};


export default function Information() {
    const [getText, setText] = useState("")
    const [getSlams, setSlams] = useState(0)
    // const {message} = useTypewriter({
    //         words: [getText],
    //         loop:1,
    //         typeSpeed: 70,
    //     deleteSpeed:0, delaySpeed:100
    // })
        return (
            <main style={{padding: "1rem 0"}}>
                <div>
                    {/*<img alt="corridor" src={corridor} className="bg"/>*/}
                    <div>Good day Comrade, call the General Secretary to receive mission debrief.</div>
                    <button onClick={() => eraseCall(setText, setSlams, getSlams)}>Slam the phone</button>
                    <button onClick={() => getReactorInfo(setText)}>Call</button>
                    <div>{getText}</div>
                </div>
                {/*<Typewriter*/}
                {/*    options={{*/}
                {/*        strings: [getText],*/}
                {/*        autoStart: true,*/}
                {/*        loop: false,*/}
                {/*        delay: 50*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<div>*/}
                {/*{message}<span className="cursor">...</span>*/}
                {/*</div>*/}

                <img alt={""} onError={handler} src={""}></img>

            </main>
        );
    }