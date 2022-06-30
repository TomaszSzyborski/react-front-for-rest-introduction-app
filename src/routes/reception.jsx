import axios from "axios";
import {useEffect, useRef, useState} from "react";
import React from "react";




export default function Reception() {
    const [getText, setText] = useState("")
    const [getName, setName] = useState("");
    const [getKey, setKey] = useState("");

    const registerAtDesk = (event) => {
        event.preventDefault();
        setText("")
        setKey("")
        if(getName === ""){
           setText("Write your name in the form down there, Comrade...")
        }
        else {
            axios.post(
                "http://0.0.0.0:9011/challenge/reactor/desk",
                {"name": getName},
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': `application/json`
                    },
                })
                .then(response => {
                     setText(`Get your key from the tray, Commander ${getName}`)
                        setKey(response.data.key)
                    }
                ).catch(error =>
                    setText(error.response.data.message)
            )
        }
    }
      return (
            <main style={{padding: "1rem 0"}}>
                <div>
                    Evening, Comrade!
                    <br/>
                    Let me fetch the keys, while you write your name in the workbook
                </div>
                <form onSubmit={registerAtDesk}>
                    <label>Registration at the desk</label>
                    <input type="text" value={getName}
                           onChange={e => setName(e.target.value)}
                           name="Commander name"/>
                    <button type="submit" name="Register">Write in registrar book</button>
                </form>
                <div id={"message"}>{getText}</div>
                <div id={"tray"}>{getKey}</div>
            </main>
        );
}