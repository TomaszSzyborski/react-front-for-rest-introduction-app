import {KeyContextProvider} from "../utils/contexts/keyContext";
import {ModalContextProvider} from "../utils/contexts/modalContext";
import ControlRoomMainView from "../controlRoomViews/ControlRoomMainView";
import {SubViewContextProvider} from "../utils/contexts/controlRoom/subViewContext";
import ControlRoomSubView from "../controlRoomViews/ControlRoomSubView";
import MessageModal from "../utils/MessageModal";


export default function ControlRoom() {

    return (
        <main style={{padding: "1rem 0"}}>
            <KeyContextProvider>
                <ModalContextProvider>
                    <SubViewContextProvider>
                        <ControlRoomMainView>
                            {<MessageModal/>}
                        </ControlRoomMainView>
                        <ControlRoomSubView>
                            {<MessageModal/>}
                        </ControlRoomSubView>
                    </SubViewContextProvider>
                </ModalContextProvider>
            </KeyContextProvider>
        </main>
    )
        ;
}