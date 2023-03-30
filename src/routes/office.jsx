import axios from "axios";
import {useState, useRef,forwardRef, render, useLayoutEffect} from "react";
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
import { Button, Grid, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles';
import {playAudio, loopAudio, mute} from "../utils/audioHandler"

const consoleFlagHandler = () => {
    console.table([{flag: "${curious_console_observer}"}])
};

const PhoneButton = styled(Button)({
    height: "3em!important",
    width: '100%',
    fontSize: '2.5rem',
    '&:hover': {
        opacity:0.8
    },
      '&:disabled': {
        opacity: 0.8,
        backgroundColor: "gray"
      },
});

function useUnmount(callback) {
  useEffect(() => {
    return () => {
      callback();
    };
  }, [callback]);
}

const ringing = new Audio(phoneRing)
const pickingUp = new Audio(phonePickUp)
const signalLost = new Audio(phoneSignalLost)

export default function Office() {
    const [playedSignalLost, setPlayedSignalLost] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState("")
    const [slams, setSlams] = useState(0)
    const [callCounter, setCallCounter] = useState(0)
    const [talking, setTalking] = useState(new Audio())
    const [phoneDestroyed, setPhoneDestroyed] = useState(false)
    const [slamButtonDisabled, setSlamButtonDisabled] = useState(false)
    const [callButtonDisabled, setCallButtonDisabled] = useState(false)

    //TODO create ScrollingTypewriter component
  const ref = useRef();
  useEffect(() => {
      const interval = setInterval(() => {
           if (ref.current.childElementCount > 0 && isLoading){
           console.log("scrolling")
                    ref.current.scrollBy(0, 100)
           }
          }, 500);
       return () => interval && clearInterval(interval);
    }, [ref, isLoading])

    useEffect(() => {
        if (phoneDestroyed || Boolean(localStorage.getItem("is-phone-destroyed"))) {
            setCallButtonDisabled(true)
            setSlamButtonDisabled(true)
            localStorage.setItem("is-phone-destroyed", true.toString())
        }
    }, [phoneDestroyed])
    const resetText = async () => setText("")

      useUnmount(() => {
        mute(talking)
      });
    const talkToGeneralSecretary = async () => {
        await setSlamButtonDisabled(true)
        await setSlams(0)

        await resetText()
        await playAudio(ringing)
        await playAudio(pickingUp)
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
        setCallButtonDisabled(false)
        setIsLoading(false)
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
            await playAudio(new Audio(phoneDestruction))
        } else {
            await playAudio(new Audio(phoneHangUp))
        }
        mute(phoneHangUp)
    }


    return (
        <main id={"office"}>
        <div id="office-background"></div>
            <Grid container spacing={2}
                  flexDirection="row"
                  justifyContent='center'
                  alignItems='center'
                  sx={{height: "100%"}}
                  >
                <Grid item xs={4}>
                    <Grid container flexDirection="column" justifyContent='center'>
                        <Grid item>
                            <PhoneButton
                                variant="contained"
                                className="retro-text"
                                color="success"
                                id={"phoneCallButton"}
                                onClick={()=>{
                                    setCallButtonDisabled(true)
                                    setIsLoading(true)
                                    talkToGeneralSecretary()
                                    }}
                                disabled={callButtonDisabled}
                            >
                              {isLoading && (<CircularProgress size={90}/>)}
                              {!isLoading && "Call"}

                            </PhoneButton>
                            </Grid>
                            <Grid item>
                            <PhoneButton
                                className="retro-text"
                                variant="contained"
                                color="error"
                                size="large"
                                id={"slamPhoneButton"}
                                onClick={slamThePhone}
                                disabled={slamButtonDisabled}
                            >Slam the phone
                            </PhoneButton>
                            </Grid>
                            <Grid item>
                              {phoneDestroyed && (
                                <PhoneButton
                                    variant="contained"
                                    color="error"
                                    size="large"
                                    className="retro-text"
                                    onClick={(e)=> {
                                        setPhoneDestroyed(false)
                                        localStorage.removeItem("is-phone-destroyed")
                                        window.location.reload(false)
                                    }}
                                >
                                    Bring me another phone!
                                </PhoneButton>
                                )}
                                </Grid>
                            </Grid>
                   </Grid>
                <Grid item xs={6} sx={{height: "100%"}}>
                    <Grid container
                        justifyContent='center'
                        alignItems='center'
                        sx={{height: "100%"}}>
                    <Grid item id={"cathodeDisplay"}>
                        <Grid container
                            justifyContent='center'
                            alignItems='center'
                            sx={{height: "100%"}}>
                        <Grid item className={"cathodeText"} ref={ref}>
                            {text ?
                                <Typewriter
                                    id="babble"
                                    text={text}
                                    loop={false}
                                    cursor={true}
                                    speed={75}
                                    onStart={() => {
                                        talking.loop = true;
                                        talking.play();
                                    }}
                                    onFinished={ async() => {
                                        await mute()
                                        await setIsLoading(false)
                                        await setCallButtonDisabled(false)
                                    }}
                                /> : null
                            }
                        </Grid>
                        </Grid>
                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
            <img alt={""} onError={consoleFlagHandler} src={""}></img>
        </main>
    );
}