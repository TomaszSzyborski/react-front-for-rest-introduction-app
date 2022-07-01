import axios from "axios";
import {useState} from "react";

import React, {useEffect} from 'react'
import Typewriter from 'react-ts-typewriter';

const debug = true;


const consoleFlagHandler = () => {
    console.table([{flag: "${curious_console_observer}"}])
};

const initialFlags = 5

export default function Information() {
    const [text, setText] = useState("")
    const [slams, setSlams] = useState(0)
    const [callCounter, setCallCounter] = useState(0)
    const [flagsAmount, setFlagsAmount] = useState(initialFlags)

    const getReactorInfo = () => {
        setSlams(0)
        setText("")
        const primaryResponse = () => axios.get("http://0.0.0.0:9011/challenge/reactor/information", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'for-frontend': "only"
                }
            })
                .then(response => {
                    console.log(response.data)
                    console.log(response.data.flagsToFind)
                        setFlagsAmount(prevState => prevState + response.data.flagsToFind)
                        setText(response.data.message + `\n There are ${flagsAmount} to find`)
                    }
                )
        ;

        const phoneResponses = [primaryResponse]
        if (callCounter > phoneResponses.length - 1) {
            setText(
                "You want me to get you through this AGAIN?!\nFine...\n" +
                "${angry_general_secretary}"
            )
            setCallCounter(0)
        } else {
            phoneResponses[callCounter]()
            setCallCounter(prevState => prevState + 1)
        }

    }


    const eraseCall = () => {
        setText("")
        setSlams(prevSlams => prevSlams + 1)
        console.log(slams)
        if (slams > 5) {
            alert("You've broken the phone... General Secretary won't be proud.\n" +
                "You earned something however...\n" +
                "${emotional_reaction_get_it?_reaction...}")
        }
    }

    return (
        <main style={{padding: "1rem 0"}}>
            <div>
                {/*<img alt="corridor" src={corridor} className="bg"/>*/}
                <div>Good day Comrade, call the General Secretary to receive mission debrief.</div>
                <button onClick={eraseCall}>Slam the phone</button>
                <button onClick={getReactorInfo}>Call</button>
            </div>

            {text ?
                <Typewriter
                    text={text}
                    loop={false}
                    cursor={false}
                />
                : null
            }
            <span className={"cursor"}>...</span>

            <img alt={""} onError={consoleFlagHandler} src={""}></img>

        </main>
    );
}