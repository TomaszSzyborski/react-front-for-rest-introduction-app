import axios from "axios";
import {useState} from "react";
import maleBabble from '../assets/sounds/maleBabble.mp3'
import femaleBabble from '../assets/sounds/femaleBabble.mp3'
import phoneRing from '../assets/sounds/phoneRing.mp3'
import phonePickUp from '../assets/sounds/phonePickUp.mp3'
import phoneSignalLost from '../assets/sounds/phoneSignalLost.mp3'
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
    const [talking, setTalking] = useState(new Audio())
    const [disabled, setDisabled] = useState(false)
    const defaultPhoneCallButtonClasses = "button is-large is-primary"
    const [phoneCallClasses, setPhoneCallClasses] = useState(defaultPhoneCallButtonClasses)

    const ringing = new Audio(phoneRing)
    const pickingUp = new Audio(phonePickUp)
    const signalLost = new Audio(phoneSignalLost)

    useEffect(() => {
        if (!text) {
            setDisabled(false)
        }
    }, [text])

    const resetText = async () => setText("")

    const mute = (audio = talking) => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
    const playAudioAndWait = async (audio) => {
        await new Promise(res => {
            audio.play()
            audio.onended = res
        })
    }

    const talkToGeneralSecretary = async () => {
        await playAudioAndWait(ringing)
        await playAudioAndWait(pickingUp)
        setPhoneCallClasses(prevState => prevState + " is-loading")
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

        //TODO create pre phone ring and pickup,
        // and loop lost signal after slamming the phone if the call was made

        const phoneResponses = [
            // {
            //     message: await primaryResponse(),
            //     audio: new Audio(maleBabble)
            // },
            // "Proceed with the reactor test procedure!",
            // "Well... Switch to auxiliary cooling system to get things running...",
            // "Don't fail me Comrade!!!",
            // "Listen here... It's the end of the month! All factories are pushing their limits, so - no postponing.",
            // "Oh, and you better complete it before 1st of May, the Labour Day Parade is waiting for you.",
            // "If you fail me, don't even dream of Order of Lenin - a man, who's name gives nobility of OUR power plant!",
            // "... I dare you... I double dare you! Call me again and you'll see yourself in Ural mountains personally digging Uranium with your bare hands!",
            {
                message: "General Secretary's Personal Assistant - Masha, speaking... I have something for you Comrade.... ${angry_general_secretary}",
                audio: new Audio(femaleBabble)
            }
        ]
        if (callCounter > phoneResponses.length - 1) {
            setText(
                "You want me to get you through this AGAIN?! Fine..."
            )
            localStorage.setItem("desperate-sigh", "${you're_deaf_or_just_dumb?}")
            setCallCounter(0)
        } else {
            setText(phoneResponses[callCounter].message)
            setTalking(phoneResponses[callCounter].audio)
            setCallCounter(prevState => prevState + 1)
        }
    }


    const slamThePhone = () => {
        setPhoneCallClasses(defaultPhoneCallButtonClasses)
        mute()
        setVisibility("vanished")
        setCallCounter(prevCalls => prevCalls - 1 < 0 ? 0 : prevCalls - 1)
        setText("")
        setSlams(prevSlams => prevSlams + 1)
        if (slams > 5) {
            alert("You've broken the phone... General Secretary won't be proud.\n" +
                "You earned something however...\n" +
                "${emotional_reaction_get_it?_reaction...}")
        }
    }


    return (
        // <main style={{padding: "1rem 0"}}>
        <main>
                <div >
                    <div className={"retro-text"}>
                        Good day Comrade, call the General Secretary to receive mission
                        debrief.
                    </div>
                    <button
                        id={"phoneCallButton"}
                        className={phoneCallClasses}
                        onClick={talkToGeneralSecretary}
                        disabled={disabled}
                    >Call
                    </button>

                    <button
                        id={"slamPhoneButton"}
                        className={"button is-large is-danger"}
                        onClick={slamThePhone}
                    >Slam the phone
                    </button>
                </div>

                <div >
                    <span id={"cathodeDisplay"}></span>
                    <div id={"callBox"}>
                        {/*<span id={"cursor"} className={visibility}>...</span>*/}
                        <div id={"text"}>
                            {text ?
                                <Typewriter
                                    text={text}
                                    loop={false}
                                    cursor={true}
                                    speed={75}
                                    onStart={() => {
                                        setDisabled(true)
                                        setVisibility("cursor")
                                        talking.loop = true;
                                        talking.play();
                                    }}
                                    onFinished={() => {
                                        setVisibility("vanished")
                                        setDisabled(false)
                                        mute()
                                        setPhoneCallClasses(defaultPhoneCallButtonClasses)
                                    }
                                    }
                                /> : null
                            }
                        </div>
                    </div>
            </div>
            <img alt={""} onError={consoleFlagHandler} src={""}></img>

        </main>
    );
}