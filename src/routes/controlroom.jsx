import {KeyContextProvider} from "../utils/contexts/keyContext";
import {ModalContextProvider} from "../utils/contexts/modalContext";
import {BlownUpContextProvider} from "../utils/contexts/blownUpContext";
import ControlRoomMainView from "../controlRoomViews/ControlRoomMainView";
import {SubViewContextProvider} from "../utils/contexts/controlRoom/subViewContext";
import ControlRoomSubView from "../controlRoomViews/ControlRoomSubView";
import Az5 from "../controlRoomViews/subViews/az5";
import Rods from "../controlRoomViews/subViews/rods";
import Analysis from "../controlRoomViews/subViews/analysis";
import Core from "../controlRoomViews/subViews/core";
import MessageModal from "../utils/MessageModal";


export default function ControlRoom() {

    return (
        <main style={{padding: "1rem 0"}}>
            <KeyContextProvider>
                <ModalContextProvider>
                    <SubViewContextProvider>
                        <ControlRoomMainView/>
                        <ControlRoomSubView/>
                    </SubViewContextProvider>
                </ModalContextProvider>
            </KeyContextProvider>
        </main>
    )
        ;
}