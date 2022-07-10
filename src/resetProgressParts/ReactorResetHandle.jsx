import Slider from "rc-slider";
import hazardStripes from "../assets/images/hazardStripes.jpeg";
import {useContext, useEffect, useState} from "react";
import {HandleContext, KeyContext, ModalContext, useHandle, useKey, useKeyUpdate, useModal} from "../utils/contexts";
import axios from "axios";

const baseStyle = {
    paddingLeft: "350%",
    marginLeft: "15vw",
    boxShadow: "20px 0 10px #000000, 0px 0px 5px #0d0d0d",
    background: "linear-gradient(270deg, darkblue 0%, black 100%)"

}

const trackStyle = {
    ...baseStyle,
    background: "linear-gradient(270deg, darkblue 0%, black 100%)"
}

const railStyle = {
    ...baseStyle,
    background: "linear-gradient(270deg, darkslategray 0%, black 100%)"
}

const handleStyle = {
    boxShadow: "20px 10px 20px #000000, 0px 0px 5px #0d0d0d",
    marginLeft: "-33.33%",
    marginRight: "-33.33%",
    height: "15vh",
    width: "33.3vw",
    display: "flex",
    color: "transparent",
    backgroundColor: "transparent",
    backgroundImage: `url(${hazardStripes})`,
    borderColor: "black",
    opacity: "100%",
    backgroundSize: "105%",
    backgroundPosition: "center center",
    borderRadius: "100px"
}

function Overlay() {
    const {handleDisabled} = useContext(HandleContext);
    return (
        <div
            className={`modal is-active is-clipped`}
            style={{
                display: `${handleDisabled ? "block" : "none"}`
            }}
            id={"handle-overlay"}
            onClick={() => {
                alert(`Comrade Soldiers! Unauthorized personnel is meddling with classified device!\n`
                    + "Get him now!\n"
                    + "${[REDACTED]_of_[CLASSIFIED]_experimental_machine}")
            }}
        >
            <div className="modal-background"></div>
        </div>
    )
}

export default function ReactorResetHandle() {
    // const [key, setKey] = useState("");
    const {key} = useKey()
    // const setKey = useKeyUpdate()
    // const {setMessage, setIsOpen} = useContext(ModalContext);
    const {setMessage, setIsOpen} = useModal();
    const [sliderMessage, setSliderMessage] = useState("");
    const [sliderValue, setSliderValue] = useState(0);
    // const {handleDisabled} = useContext(HandleContext);
    const {handleDisabled} = useHandle();


    const triggerReactorReset = async () => {
        await axios.get(`http://localhost:9011/challenge/reactor/${key}/reset_progress`)
            .then(response => {
                    console.log(response.data.message)
                    setMessage(response.data.message)
                }
            )
            .catch(error =>
                setMessage(`${error.response.data.message}\n${error.response.data.flag}`)
            ).finally(() => {
                    setIsOpen(true)
                }
            )
    }

    useEffect(() => {

        let currentSwitchLevel = `\nCurrent level is: ${sliderValue}`
        let messageToSet = ""
        if (sliderValue < 50) {
            messageToSet = `Pull... Harder... Comrade${currentSwitchLevel}`
        } else if (sliderValue === 50) {
            messageToSet = "${perfectly balanced as everything should be}"
        } else if (sliderValue < 100) {
            messageToSet = `Just... Bit... MOAR!${currentSwitchLevel}`
        } else {
            messageToSet = `Simulation Reboot Initiated${currentSwitchLevel}`
            triggerReactorReset()
        }
        setSliderMessage(messageToSet)
    }, [sliderValue]);

    return (
        <main>
            <div className={"columns is-fullheight"}>
                <div className={"column"}>
                    <div className={"columns is-fullheight"}>
                        <div className={"column"}></div>
                        <div
                            className={"column has-retro-text is-four-fifths new-line has-text-centered has-text-vertically-centered"}>
                            {sliderMessage.split(" ").join("\n")}
                        </div>
                        <div className={"column"}></div>
                    </div>
                </div>
                <div className={"column"}>
                    <div className={"is-maxed-within"}>
                        <Overlay/>
                        <Slider
                            disabled={handleDisabled}
                            trackStyle={trackStyle}
                            railStyle={railStyle}
                            vertical={true}
                            reverse={true}
                            startPoint={0}
                            onChange={(number) => setSliderValue(number)}
                            handleStyle={handleStyle}
                            step={1}
                            min={0}
                            max={100}/>
                    </div>
                </div>
                <div className={"column"}></div>
            </div>
        </main>

    )
        ;
}
