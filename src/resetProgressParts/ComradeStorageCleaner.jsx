import {createElement, useContext} from "react";
import {HandleContext, KeyContext, ModalContext, useModal} from "../utils/contexts";
import axios from "axios";


export default function ComradeStorageCleaner() {
    const {setMessage, setIsOpen} = useModal();


    const buttonLabel = "Reset progress for information gathering".split(" ").join(" \n")

    return (
        <button className={"button is-warning is-large resetProgressButton new-line"}
                onClick={() => {
                    localStorage.clear()
                    sessionStorage.clear()
                    // setIsOpen(true)
                    console.log(buttonLabel)
                    setMessage("Time Variance Branching\nmerged and reset\nto 18:17:24 25-04-1986")
                }}>
            {buttonLabel}
        </button>
    );
}
