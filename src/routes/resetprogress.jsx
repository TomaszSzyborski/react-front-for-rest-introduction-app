import axios from "axios";
import {useEffect, useRef, useState} from "react";

import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import Switch from "react-switch";
import {memo} from 'react'

import {useDrag} from 'react-dnd'
import {useDrop} from 'react-dnd'

const ItemTypes = {
    HANDLE: 'handle',
}


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
        <div ref={drop} style={{backgroundColor}} className={"handle-box has-retro-text"}>
            {isActive ? 'Release to drop' : 'Move handle here to reset timeline'}
        </div>
    )
}

const Handle = ({name}) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.HANDLE,
        item: {name},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
                //TODO create rest action and implement key input
                // and create tray for response display
                // axios.get("")
                alert(`You dropped ${item.name} into ${dropResult.name}!`)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))
    const opacity = isDragging ? 0.4 : 1
    return (
        <div ref={drag} style={{opacity}} className={"handle"}>
            {name}
        </div>
    )
}

const Container = () => {
    return (
        <div style={{position: 'absolute'}}>
            <div style={{overflow: 'hidden', clear: 'both'}}>
                <Handle name="Glass"/>
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

export default function ResetProgress() {
    return (
        <main style={{padding: "1rem 0"}}>
            <div className={"columns"}>
                <div className={"column is-four-fifths"}>
                    <DndProvider backend={HTML5Backend}>
                        <Container/>
                    </DndProvider>
                </div>
                <div className={"column"}>
                    <button className={"button is-warning is-large resetProgressButton"}
                            onClick={() => localStorage.clear()}>
                        Reset<br/>Progress<br/>for<br/>Information<br/>Gathering
                    </button>
                </div>

            </div>
        </main>
    )
}