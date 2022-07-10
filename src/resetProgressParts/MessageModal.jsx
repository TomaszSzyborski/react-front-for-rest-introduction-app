import {useContext, useEffect} from "react";
import {useModal} from "../utils/contexts";

export default function MessageModal() {
    const {message, isOpen, setIsOpen, setMessage} = useModal();

    useEffect(()=>{
        if(message){
            setIsOpen(true)
        }
    }, [message])

    return (
        <div className={`modal ${isOpen ? "is-active" : ""} is-clipped`}
             onClick={() => {
                 setIsOpen(false)
                 setMessage("")
             }}>
            <div className="modal-background"></div>
            <div className="modal-content"
                 style={{
                     display: "flex",
                     width: "50vw"
                 }}
            >
                <p className="modal-card-body has-text-centered has-big-retro-dark-text is-size-1 new-line">
                    {message}
                </p>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
        </div>
    )
}