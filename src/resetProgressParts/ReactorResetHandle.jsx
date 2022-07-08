import Slider from "rc-slider";
import hazardStripes from "../assets/images/hazardStripes.jpeg";

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

export default function ReactorResetHandle() {

    return (
        <div className={"columns is-maxed"}>
            <div className={"column"}></div>
            <div className={"column"}>
                <div className={"is-centered is-maxed-within"}>
                    <Slider
                        trackStyle={trackStyle}
                        railStyle={railStyle}
                        vertical={true}
                        reverse={true}
                        startPoint={0}
                        handleStyle={handleStyle}
                        step={1}
                        min={0}
                        max={100}/>
                </div>
            </div>
            <div className={"column"}></div>
        </div>
    );
}
