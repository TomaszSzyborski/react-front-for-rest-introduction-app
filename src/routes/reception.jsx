import axios from "axios";
import {useEffect, useRef, useState} from "react";
import React from "react";

const greeting = "Evening, Comrade!\n" +
    "Let me fetch the keys, while you write your name in the workbook"

const alreadyAtWork = "Akimov, Aleksandr Fyodorovich\n" +
    "Baranov, Anatoly Ivanovich\n" +
    "Sitnikov, Anatoly Andreyevich\n" +
    "Toptunov, Leonid Fedorovych\n"

export default function Reception() {
    const [getText, setText] = useState(greeting)
    const [getName, setName] = useState("");
    const [getKey, setKey] = useState("");

    const registerAtDesk = (event) => {
        event.preventDefault();
        setText("")
        setKey("")
        if (!getName) {
            setText("Write your name in the Registrar Book down there, Comrade...")
        } else {
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
            <div className={"columns has-retro-text"}>
                <div className={"column"}></div>
                <div className={"column is-two-thirds"}>
                    <div className={"columns"}>
                        <div className={"column"}></div>

                        <div className={"column is-two-thirds"}>
                            <div id={"message"} className={"has-text-centered"}>{getText}</div>
                            <div className={"spacer-one-twentieth-height"}></div>
                            <form onSubmit={registerAtDesk}>
                                <div className="field">
                                   <textarea
                                       className={"textarea is-fullwidth is-large"}
                                       placeholder={alreadyAtWork}
                                       value={getName}
                                       onChange={e => setName(e.target.value)}
                                   />
                                </div>
                                <div className={"spacer-one-twentieth-height"}></div>
                                <div className={"columns"}>
                                    <div className={"column"}></div>
                                    <button className={"button column is-two-thirds is-primary is-large"}
                                            type="submit"
                                            name="Register">Write in registrar book
                                    </button>
                                    <div className={"column"}></div>
                                </div>
                            </form>
                            <div id={"tray"}>{getKey}</div>
                        </div>
                        <div className={"column"}></div>
                    </div>
                </div>
                <div className={"column"}></div>
            </div>
        </main>
    )
        ;
}