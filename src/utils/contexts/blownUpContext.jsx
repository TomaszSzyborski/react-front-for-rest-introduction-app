import React, {createContext, useContext, useEffect, useState} from "react";
import {playAudio, loopAudio, mute} from "../audioHandler"
import geiger from '../../assets/sounds/geiger.mp3'
import alarm from '../../assets/sounds/alarm.mp3'
const geigerSound = new Audio(geiger)
const alarmSound = new Audio(alarm)


const BlownUpContext = createContext({
        blownUp: false,
        setBlownUp: () => null
    }
)

export const useBlownUp = () => useContext(BlownUpContext);

export const BlownUpContextProvider = ({children}) => {
    const [blownUp, setBlownUp] = useState(false);

    useEffect(() => {
        if (blownUp) {
            localStorage.setItem('blownUp', 'true');
            playAudio(alarmSound)
            loopAudio(geigerSound)
        }
        else {
            mute(alarmSound)
            mute(geigerSound)
        }
    },
    [blownUp])
    return (
        <BlownUpContext.Provider value={{blownUp, setBlownUp}}>
            {children}
        </BlownUpContext.Provider>
    )
}