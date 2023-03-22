import axios from "axios";
import {useState} from "react";
import maleBabble from '../assets/sounds/maleBabble.mp3'
import femaleBabble from '../assets/sounds/femaleBabble.mp3'
import phoneRing from '../assets/sounds/phoneRing.mp3'
import phonePickUp from '../assets/sounds/phonePickUp.mp3'
import phoneSignalLost from '../assets/sounds/phoneSignalLost.mp3'
import phoneHangUp from '../assets/sounds/phoneHangUp.mp3'
import phoneDestruction from '../assets/sounds/phoneDestruction.mp3'
import React, {useEffect} from 'react'
import Typewriter from 'react-ts-typewriter';
import {frontendFlagsAmount} from "../utils/constants";

const consoleFlagHandler = () => {
    console.table([{flag: "${curious_console_observer}"}])
};

const ringing = new Audio(phoneRing)
const pickingUp = new Audio(phonePickUp)
const signalLost = new Audio(phoneSignalLost)

export default function Office() {

    const defaultPhoneCallButtonClasses = "button is-large is-primary"

    const [text, setText] = useState("")
    const [slams, setSlams] = useState(0)
    const [callCounter, setCallCounter] = useState(0)
    const [talking, setTalking] = useState(new Audio())
    const [phoneCallClasses, setPhoneCallClasses] = useState(defaultPhoneCallButtonClasses)
    const [phoneDestroyed, setPhoneDestroyed] = useState(false)
    const [slamButtonDisabled, setSlamButtonDisabled] = useState(false)
    const [callButtonDisabled, setCallButtonDisabled] = useState(false)


    useEffect(() => {
        if (phoneDestroyed || Boolean(localStorage.getItem("is-phone-destroyed"))) {
            setCallButtonDisabled(true)
            setSlamButtonDisabled(true)
            localStorage.setItem("is-phone-destroyed", true.toString())
        }
    }, [phoneDestroyed])
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
        await setSlamButtonDisabled(true)
        await setPhoneCallClasses(prevState => prevState + " is-loading")
        await setSlams(0)

        await resetText()
        await playAudioAndWait(ringing)
        await playAudioAndWait(pickingUp)
        await setSlamButtonDisabled(false)

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
                        `\n There are ${response.data.flagsToFind + frontendFlagsAmount} flags to find.`
                })
        ;

        const phoneResponses = [
            {
                message: await primaryResponse(),
                audio: new Audio(maleBabble)
            },
            {
                message: "Proceed with the reactor test procedure!",
                audio: new Audio(maleBabble)
            },
            {
                message: "Well... Switch to auxiliary cooling system to get things running...",
                audio: new Audio(maleBabble)
            },
            {
                message: "Don't fail me Comrade!!!",
                audio: new Audio(maleBabble)
            },
            {
                message: "Listen here... It's the end of the month! All factories are pushing their limits, so - no postponing.",
                audio: new Audio(maleBabble)
            },
            {
                message: "Oh, and you better complete it before 1st of May, the Labour Day Parade is waiting for you.",
                audio: new Audio(maleBabble)
            },
            {
                message: "If you fail me, don't even dream of Medal of Lenin - a man, who's name gives nobility of OUR power plant!",
                audio: new Audio(maleBabble)
            },
            {
                message: "... I dare you... I double dare you! Call me again and you'll see yourself in Ural mountains personally digging Uranium with your bare hands!",
                audio: new Audio(maleBabble)
            },
            {
                message: "General Secretary's Personal Assistant - Masha, speaking... I have something for you Comrade.... ${angry_general_secretary}",
                audio: new Audio(femaleBabble)
            }
        ]
        if (callCounter > phoneResponses.length - 1) {
            setText("You want me to get you through this AGAIN?! Fine...")
            sessionStorage.setItem("desperate-sigh", "${you're_deaf_or_just_dumb?}")
            setCallCounter(0)
        } else {
            setText(phoneResponses[callCounter].message)
            setTalking(phoneResponses[callCounter].audio)
            setCallCounter(prevState => prevState + 1)
        }
    }


    const slamThePhone = async () => {
        setPhoneCallClasses(defaultPhoneCallButtonClasses)
        mute()
        mute(signalLost)
        setCallCounter(prevCalls => prevCalls - 1 < 0 ? 0 : prevCalls - 1)
        setText("")
        setSlams(prevSlams => prevSlams + 1)
        if (slams > 5) {
            setPhoneDestroyed(true)
            alert("You've broken the phone... General Secretary won't be proud.\n" +
                "You earned something however...\n" +
                "${emotional_reaction_get_it?_reaction...}")
            await playAudioAndWait(new Audio(phoneDestruction))
        } else {
            await playAudioAndWait(new Audio(phoneHangUp))
        }
        mute(phoneHangUp)
    }


    return (
        <main className={"office-background"}>
            <div className={"columns is-fullheight"}>
                <div className={"column"}></div>
                <div className={"phone column"}>

                    <button
                        id={"phoneCallButton"}
                        className={`${phoneCallClasses} `}
                        onClick={talkToGeneralSecretary}
                        disabled={callButtonDisabled}
                    >Call
                    </button>
                    <button
                        id={"slamPhoneButton"}
                        className={"button is-large is-danger"}
                        onClick={slamThePhone}
                        disabled={slamButtonDisabled}
                    >Slam the phone
                    </button>
                </div>
                <div className={"column"}></div>

                <div className={"column is-half"}>
                    <span id={"cathodeDisplay"}>
                    <div className={"cathodeText"}>
                        {text ?
                            <Typewriter
                                text={text}
                                loop={false}
                                cursor={true}
                                speed={75}
                                onStart={() => {
                                    talking.loop = true;
                                    talking.play();
                                }}
                                onFinished={async () => {
                                    await mute()
                                    await mute(phoneHangUp)
                                    await setPhoneCallClasses(defaultPhoneCallButtonClasses)
                                    await playAudioAndWait(signalLost)
                                }
                                }
                            /> : null
                        }
                    </div>

                    </span>
                </div>
            </div>
            <img alt={""} onError={consoleFlagHandler} src={""}></img>

        </main>
    );
}