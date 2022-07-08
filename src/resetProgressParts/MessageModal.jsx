import {useContext} from "react";
import {ModalContext} from "../routes/resetprogress";

export default function MessageModal() {
    const {modalActive, message} = useContext(ModalContext);

    return (
        <div className={`modal ${modalActive}`}
             onClick={(event) => event.currentTarget.classList.toggle("is-active")}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <p className="modal-card-body has-text-centered has-big-retro-dark-text is-size-1">
                    {message}
                </p>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
        </div>
    )
}