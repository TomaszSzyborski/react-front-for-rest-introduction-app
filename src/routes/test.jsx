import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import radioActiveIcon from "../assets/images/radioactiveBasic.png";
import Switch from "react-switch";
import Slider from "rc-slider";
import hazardStripes from "../assets/images/hazardStripes.jpeg"


export default function Test() {
    const [updateValue, setUpdateValue] = useState(0);
    return (
        <div className={"is-maxed-within"}>
            <input id="sliderWithValue"
                   className="slider is-danger has-output is-fullwidth"
                   min="0"
                   max="100"
                   step="1"
                   defaultValue={0}
                   value={updateValue}
                   onChange={(e) => setUpdateValue(e.target.value)}
                   type="range"/>
            <output htmlFor="sliderWithValue">50</output>

            <div className="field is-dark">
                <input id="switchColorDefault" type="checkbox" name="switchColorDefault" className="switch"
                       onChange={(e) => e.target.classList.toggle("checked")}
                ></input>
                <label htmlFor="switchColorDefault">Switch default</label>
            </div>
            <div>


                <form>
                    <input className="switch is-danger" id="s" type="checkbox" name="s"

                           onChange={(e) => e.target.classList.toggle("checked")}/>
                    <label htmlFor={"s"}> Switch danger</label>

                </form>
            </div>
            {/*prawie dobrze ale chuj*/}
            {/*<input className="slider is-maxed-within is-vertically-inverted"*/}
            {/*       step="1"*/}
            {/*       min="0"*/}
            {/*       max="100"*/}
            {/*       type="range"*/}
            {/*       defaultValue={0}*/}

            {/*       value={updateValue}*/}
            {/*       onChange={(e) => setUpdateValue(e.target.value)}*/}
            {/*       orient="vertical"/>*/}
            <div className={"columns is-maxed"}>
                <div className={"column"}></div>
                <div className={"column"}>
                    <div className={"is-centered is-maxed-within"}>
                        <Slider
                            trackStyle={{
                                paddingLeft: "350%",
                                marginLeft: "15vw",
                                boxShadow: "20px 0 10px #000000, 0px 0px 5px #0d0d0d",
                                background: "linear-gradient(270deg, darkblue 0%, black 100%)"

                            }}
                            railStyle={{
                                paddingLeft: "350%",
                                marginLeft: "15vw",
                                boxShadow: "10px 0 10px #000000, 0px 0px 5px #0d0d0d",
                                background: "linear-gradient(270deg, darkslategray 0%, black 100%)"

                            }}
                            vertical={true}
                            reverse={true}
                            startPoint={0}
                            handleStyle={
                                {
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
                            }
                            step={1}
                            min={0}
                            max={100}/>
                    </div>

                </div>
                <div className={"column"}></div>
            </div>
        </div>

    );
}