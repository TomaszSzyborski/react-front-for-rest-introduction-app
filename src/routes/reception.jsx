import axios from "axios";
import {useEffect, useMemo, useRef, useState} from "react";
import React from "react";
import {bulmaQuickview} from 'bulma-extensions';
import {faker} from '@faker-js/faker';
import {keyLocalStorageItemName} from "../utils/constants";

const greeting = "Evening, Comrade!\n" +
    "Let me fetch the keys, while you write your name in the workbook"

const alreadyAtWork = "Akimov, Aleksandr Fyodorovich\n" +
    "Baranov, Anatoly Ivanovich\n" +
    "Sitnikov, Anatoly Andreyevich\n" +
    "Toptunov, Leonid Fedorovych\n"

const fakeNames = () => {
    faker.setLocale('uk');
    let people;
    people = Array(12).fill("")
        .map(() => {
                return `${faker.name.findName()}`
            }
        ).join("\n")
    return people
}

export default function Reception() {
    const [text, setText] = useState(greeting)
    const [name, setName] = useState("");
    const [key, setKey] = useState("");
    const [multitudeOfFakeSovietNames] = useState(fakeNames())
    useMemo(()=>{
        localStorage.setItem(keyLocalStorageItemName, key)
    },[key])
    const registerAtDesk = (event) => {
        event.preventDefault();
        setKey("")
        if (!name) {
            setText("Write your name in the Registrar Book down there, Comrade...")
        } else {
            axios.post(
                "http://0.0.0.0:9011/challenge/reactor/desk",
                {"name": name},
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': `application/json`
                    },
                })
                .then(response => {
                        setText(`Get your key from the tray, Commander ${name}...`)
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
                            <div id={"message"} className={"has-text-centered is-size-2 container"}>
                                {text}
                            </div>
                            <div>
                                <div className="columns"
                                     id={"registrar"}>
                                    <div className={"column"}></div>
                                    <div className={"column is-three-fifths"}>
                                        <div className={"spacer-one-twentieth-height"}></div>
                                        <div className={"columns registrar-pages"}>
                                            <div className={"column is-size-6 is-dark"}>
                                                <div>Day Shift</div>
                                                <textarea className={"textarea signature-area is-fullwidth readonly"}
                                                          defaultValue={multitudeOfFakeSovietNames}>
                                                </textarea>
                                            </div>

                                            <div className={"column is-size-6"}>
                                                <div>Night Shift</div>
                                                <textarea
                                                    className={"textarea signature-area is-fullwidth"}
                                                    placeholder={alreadyAtWork}
                                                    value={name}
                                                    onChange={e => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"column"}></div>
                                </div>
                                <div className={"spacer-one-twentieth-height"}></div>
                                <div className={"columns"}>
                                    <div className={"column"}></div>
                                    <button className={"button column is-two-thirds is-primary is-large"}
                                            onClick={registerAtDesk}
                                            name="Register">Write in registrar book
                                    </button>
                                    <div className={"column"}>
                                    </div>
                                </div>
                                <div id={"tray"} className={"has-text-centered is-size-4"}>
                                    {key ?
                                        <div>
                                            <span>Pick it up</span>
                                            <br/>
                                            <span
                                                className={"has-background-info is-size-2"}>
                                                {key}
                                            </span>
                                            <br/>
                                            <span>Keep it safe, and always wih you.</span>
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                        <div className={"column"}>
                        </div>
                    </div>
                </div>
                <div className={"column"}>

                </div>
            </div>
        </main>
    )
        ;
}