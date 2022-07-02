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
                <div className={"column"}>
                    <div className={"columns"}>
                        <div className={"column is-one-third"}></div>
                        <div className={"column is-two-thirds has-text-centered"}>
                            Evening, Comrade!
                            <br/>
                            Let me fetch the keys, while you write your name in the workbook
                        </div>
                    </div>
                </div>
                <div className={"column"}>
                    <form onSubmit={registerAtDesk}>
                        <div className="field">
                            <div className={"column is-two-thirds"}>
                            <textarea
                                className={"textarea is-large"}
                                placeholder={"Akimov, Aleksandr Fyodorovich\n" +
                                    "Baranov, Anatoly Ivanovich\n" +
                                    "Sitnikov, Anatoly Andreyevich\n" +
                                    "Toptunov, Leonid Fedorovych\n"
                                }
                                value={getName}
                                onChange={e => setName(e.target.value)}
                            />
                            </div>
                            <button className={"button is-primary is-large column is-two-thirds"}
                                    type="submit"
                                    name="Register">Write in registrar book
                            </button>
                        </div>
                    </form>
                    <div className={"column is-two-thirds"}>
                        <div id={"message"}>{getText}</div>
                        <div id={"tray"}>{getKey}</div>
                    </div>
                </div>
            </div>
        </main>
    )
        ;
}