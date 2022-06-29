import axios from "axios";
import corridor from "../assets/images/corridor.jpg"
import {useState} from "react";
// import {ReactTypingEffect} from 'react-typing-effect';
import { Typewriter } from 'react-simple-typewriter'


const getReactorInfo = (setData) => {
    axios.get("http://0.0.0.0:9011/challenge/reactor/information", {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }})
    .then(r =>
        setData(r.data.message)
    );
}
const eraseCall = (setData) => {
    setData("")
}
export default function Information() {
        const [getText, setText] = useState()


  return (
    <main style={{ padding: "1rem 0" }}>
       <div>
           {/*<img alt="corridor" src={corridor} className="bg"/>*/}
           <div>Good day Comrade, call the General Secretary to receive mission debrief.</div>
           <button onClick={()=>eraseCall(setText)}>Slam the phone</button>
           <button onClick={()=>getReactorInfo(setText)}>Call</button>
           {/*<div className="vanished">{getText}</div>*/}
           <div>{getText}</div>
       </div>

    </main>
  );
}