import axios from "axios";
import {useEffect, useRef, useState} from "react";

import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import Switch from "react-switch";
import powerDownSound from '../assets/sounds/powerDown.mp3'
import alertSound from '../assets/sounds/mgsAlert.mp3'
import wrongSound from '../assets/sounds/wrong.mp3'
import {useDrag} from 'react-dnd'
import {useDrop} from 'react-dnd'

const ItemTypes = {
    HANDLE: 'handle',
}

//TODO change it to be slider 1-100 think of something else for drag and drop handler

export default function ResetProgressOLD() {
    const [key, setKey] = useState("")
    const [handleState, setHandleState] = useState(false)
    const [message, setMessage] = useState("")
    const [modalActive, setModalActive] = useState(false)
    const activeModalClasses = "is-active is-clipped"

    const HandlePlacement = () => {
        const [{canDrop, isOver}, drop] = useDrop(() => ({
            accept: ItemTypes.HANDLE,
            drop: () => ({name: 'Handle Placement'}),
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }))
        const isActive = canDrop && isOver
        let backgroundColor = '#222'
        if (isActive) {
            backgroundColor = 'darkgreen'
        } else if (canDrop) {
            backgroundColor = 'darkkhaki'
        }
        return (
            <div ref={drop} style={{backgroundColor, opacity: "50%", fontSize: "2rem"}}
                 className={"handle-box has-retro-text has-text-centered has-text-vertically-centered"}>
                {isActive ? 'Release to drop' : 'Move handle here to reset the timeline'}
            </div>
        )
    }

    const Handle = ({name}) => {
        const [{isDragging}, drag] = useDrag(() => ({
            type: ItemTypes.HANDLE,
            item: {name},
            end: async (item, monitor) => {
                const dropResult = monitor.getDropResult()
                if (item && dropResult && handleState) {
                    await new Audio(powerDownSound).play()
                    axios.get(`http://localhost:9011/challenge/reactor/${key}/reset_progress`)
                        .then(response =>
                            setMessage(response.data.message)
                        )
                        .catch(response =>
                            setMessage(response.data.flag)
                        ).finally(() => {
                            setModalActive(activeModalClasses)
                        }
                    )
                    alert(`You dropped ${item.name} into ${dropResult.name}!`)
                } else if (!key) {
                    await new Audio(wrongSound).play()
                } else if (item && dropResult) {
                    await new Audio(alertSound).play()
                    alert(`Comrade Soldiers! Unauthorized personnel is meddling with classified device!\n`
                        + "Get him now!\n"
                        + "${[REDACTED]_of_[CLASSIFIED]_experimental_machine}")
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                handlerId: monitor.getHandlerId(),
            }),
        }))
        const opacity = isDragging ? 0.4 : 1
        return (
            <div ref={drag} style={{opacity}} className={"handle"}/>
        )
    }

    const Container = () => {
        return (
            <div style={{position: 'absolute'}}>
                <div style={{overflow: 'hidden', clear: 'both'}}>
                    <Handle name={key}/>
                </div>
                <div className={"spacer"}>
                    <span className={"vertical-line"} style={{left: '32.5vw'}}></span>
                    <span className={"vertical-line"} style={{left: '42.5vw'}}></span>
                    <span className={"vertical-line"} style={{left: '52.5vw'}}></span>
                </div>
                <div style={{overflow: 'hidden', clear: 'both'}}>
                    <HandlePlacement/>
                </div>
            </div>
        )
    }

    const unlockHandle = async () => {
        if (key) {
            axios.get(`http://localhost:9011/challenge/reactor/check_key/${key}`)
                .then(response => {
                    setHandleState(true)
                    setMessage(`${response.data.message} ${response.data.flag}` )
                }).catch(response => {
                setHandleState(false)
                setMessage(response.response.data.message)
            })
        } else {
            setHandleState(false)
            setModalActive(activeModalClasses)
            setMessage("You have to unlock the handle first... With... you know... They key?")
        }
    }

    return (

        <main style={{padding: "1rem 0"}}>
            <form className={"field has-addons"} style={{
                margin: "0 auto",
                width: "50%",
                padding: "1rem"
            }}>
                <div className={"control"} style={{width: "30vw"}}>
                    <input className="input" type="text" placeholder="Put your key here, Comrade..."
                           value={key}
                           onChange={e => setKey(e.target.value)}/>
                </div>
                <div className={"control"}>
                    <a className={"button is-info"} onClick={unlockHandle}>
                        Unlock Timeline Lever
                    </a>
                </div>
            </form>

            <div className={"columns"}>
                <div className={"column is-four-fifths"}>
                    <DndProvider backend={HTML5Backend}>
                        <Container/>
                    </DndProvider>
                </div>
                <div className={"column"}>
                    <button className={"button is-warning is-large resetProgressButton"}
                            onClick={() => {
                                localStorage.clear()
                                sessionStorage.clear()
                                setMessage("Time Variance Branching merged and reset to 18:17:24 25-04-1986")
                                setModalActive(activeModalClasses)
                            }}>
                        Reset<br/>Progress<br/>for<br/>Information<br/>Gathering
                    </button>
                </div>

            </div>

            <div className={`modal ${modalActive}`}
                onClick={(event)=> event.currentTarget.classList.toggle("is-active")}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <p className="modal-card-body has-text-centered has-big-retro-dark-text is-size-1">
                        {message}
                    </p>
                </div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
        </main>
    )
}