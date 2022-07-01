import axios from "axios";
import {useState} from "react";
import maleBabble from '../assets/sounds/maleBabble.mp3'
import React, {useEffect} from 'react'
import Typewriter from 'react-ts-typewriter';

const debug = true;


const consoleFlagHandler = () => {
    console.table([{flag: "${curious_console_observer}"}])
};

const initialFlags = 6

export default function Information() {
    const [text, setText] = useState("")
    const [slams, setSlams] = useState(0)
    const [callCounter, setCallCounter] = useState(0)
    const [flagsAmount] = useState(initialFlags)
    const [visibility, setVisibility] = useState("vanished")
    const [talking, setTalking] = useState(null)

    const resetText = async () => setText("")

    const getReactorInfo = async () => {
        setSlams(0)
        await resetText()
        const primaryResponse = () =>
            axios.get("http://0.0.0.0:9011/challenge/reactor/information", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'for-frontend': "only"
                }
            })
                .then(response => {
                    return response.data.message +
                        `\n There are ${response.data.flagsToFind + flagsAmount} flags to find.`
                })
        ;

        const phoneResponses = [
            {message: await primaryResponse(), audio: new Audio(maleBabble)}
            // "Proceed with the reactor test procedure!",
            // "Well... Switch to auxiliary cooling system to get things running...",
            // "Don't fail me Comrade!!!",
            // "Listen here... It's the end of the month! All factories are pushing their limits, so - no postponing.",
            // "Oh, and you better complete it before 1st of May, the Labour Day Parade is waiting for you.",
            // "If you fail me, don't even dream of Order of Lenin - a man, who's name gives nobility of OUR power plant!",
            // "... I dare you... I double dare you! Call me again and you'll see yourself in Ural mountains personally digging Uranium with your bare hands!",
            // "General Secretary's Personal Assistant - Masha, speaking... I have something for you Comrade.... ${angry_general_secretary}"
        ]
        if (callCounter > phoneResponses.length - 1) {
            setText(
                "You want me to get you through this AGAIN?!</br>Fine...</br>"
            )
            localStorage.setItem("desperate-sigh", "${you're_deaf_or_just_dumb?}")
            setCallCounter(0)
        } else {
            setText(phoneResponses[callCounter].message)
            setTalking(phoneResponses[callCounter].audio)
            setCallCounter(prevState => prevState + 1)
        }
    }


    const eraseCall = () => {
        setText("")
        setSlams(prevSlams => prevSlams + 1)
        if (slams > 5) {
            alert("You've broken the phone... General Secretary won't be proud.\n" +
                "You earned something however...\n" +
                "${emotional_reaction_get_it?_reaction...}")
        }
    }

    return (
        <main style={{padding: "1rem 0"}}>
            <div>
                <div>Good day Comrade, call the General Secretary to receive mission debrief.</div>
                <button onClick={eraseCall}>Slam the phone</button>
                <button onClick={getReactorInfo}>Call</button>
            </div>

            {text ?
                <Typewriter
                    text={text}
                    loop={false}
                    cursor={false}
                    onStart={()=> {
                        talking.currentTime = 0;
                        setVisibility("cursor")
                        // talking.loop = true;
                        talking.play();
                    }}
                    onFinished={()=> {
                        talking.currentTime = 0;
                        setVisibility("vanished")
                        talking.loop = false
                    }}
                />
                : null
            }
            <span className={visibility}>...</span>

            <img alt={""} onError={consoleFlagHandler} src={""}></img>

        </main>
    );
}