import handleImage from "../assets/images/leatherTexture.png";
import {useContext, useEffect, useState} from "react";
import {useKey} from "../utils/contexts/keyContext";
import {useModal} from "../utils/contexts/modalContext";
import {useHandle} from "../utils/contexts/reactorReset/resetReactorHandleContext";
import {Grid, Button, Modal, Box, Typography, Dialog, Slider} from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import powerDown from '../assets/sounds/powerDown.mp3'
import {useBlownUp} from "../utils/contexts/blownUpContext";
import {reactorBackend} from "client";

const powerDownSound = new Audio(powerDown)


export default function ReactorResetHandle() {
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }
    const {key} = useKey()
    const {setMessage, setIsOpen} = useModal();
    const [sliderMessage, setSliderMessage] = useState("");
    const [sliderValue, setSliderValue] = useState(0);
    const {handleDisabled, setHandleDisabled} = useHandle();
    const {setBlownUp} = useBlownUp();

    const playAudioAndWait = async (audio) => {
        await new Promise(res => {
            audio.play()
            audio.onended = res
        })
    }

    const triggerReactorReset = async () => {
        await reactorBackend.client.get(`/challenge/reactor/${key}/reset_progress`)
            .then(response => {
                    playAudioAndWait(powerDownSound)
                    setBlownUp(false)
                    localStorage.removeItem("blownUp")
                    setMessage(`Time Variance Branching merged and reset to 18:17:24 25-04-1986 ${response.data.message}`)
                }
            )
            .catch(error =>
                setMessage(`${error.response.data.message}\n${error.response.data.flag}`)
            ).finally(() => {
                    setHandleDisabled(true)
                    setSliderValue(0)
                }
            )
    }

    useEffect(() => {
        let currentSwitchLevel = `\nCurrent level is: ${sliderValue}`
        let messageToSet = ""
        if (sliderValue < 50) {
            messageToSet = `Pull... Harder... Comrade ${currentSwitchLevel}`
        } else if (sliderValue === 50) {
            messageToSet = "${flag_perfectly_balanced_as_everything_should_be}"
        } else if (sliderValue < 100) {
            messageToSet = `Just... Bit... MOAR! ${currentSwitchLevel}`
        } else {
            messageToSet = `Simulation Reboot Initiated`
            setTimeout( async () =>
                {
                    await triggerReactorReset()
                }, 1000)

        }
        setSliderMessage(messageToSet)
    }, [sliderValue]);

    return (<>
    {handleDisabled && <div id="rustyDoor" className="background"  onClick={() => {
                                                      alert(`Comrade Soldiers! Unauthorized personnel is meddling with classified device!\n`
                                                          + "Get him now!\n"
                                                          + "${flag_[REDACTED]_of_[CLASSIFIED]_experimental_machine}")
                                                  }}/>}
        {!handleDisabled &&
        <Grid
        id="timeMachineBox"
        sx={{
            flexFlow: "column",
            display: 'flex',
            flexDirection: 'column',
            height: '50vh',
            alignItems: "center",
            flexGrow: "1",
        }}>
            <Grid
                id="timeMachine"
                container
                maxWidth
                maxHeight
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={{ xs: 2, md: 6, }} columns={{ xs: 4, sm: 8, md: 12 }}
            >

                    <Grid item />
                    <Grid item />
                    <Grid item>
                            <Box sx={{ height: "20rem" }}>
                                <Slider
                                sx={{
                                        '& input': {
                                           WebkitAppearance: 'slider-vertical',
                                        },
                                        '& .MuiSlider-rail':{
                                            width: "1rem",
                                            color: "darkgray",
                                        },
                                        '& .MuiSlider-track': {
                                            width: "1rem",
                                            color: "lightgrey",
                                        },
                                        '& .MuiSlider-thumb': {
                                          borderRadius: '10px',
                                          width:"20rem",
                                          height:"5rem",
                                          backgroundImage: `url(${handleImage})`,
                                          backgroundRepeat: "no-repeat",
                                          backgroundPosition: "center",
                                          backgroundSize: "cover",
                                        }
                                    }}
                                    disabled={handleDisabled}
                                    defaultValue={0}
                                    step={1}
                                    min={0}
                                    max={100}
                                    orientation="vertical"
                                    onChange={(event, newValue) => setSliderValue(newValue)}
                                    value={sliderValue}
                                    onKeyDown={preventHorizontalKeyboardNavigation}
                                    reverse="true"
                                 />
                            </Box>
                    </Grid>
                  <Grid item/>
                  <Grid item className="retro-text" justifyContent>
                             {sliderMessage}
                  </Grid>
            </Grid>
        </Grid>
    }</>);
}
