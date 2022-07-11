import ReactorResetHandle from "../resetProgressParts/ReactorResetHandle";
import ReactorResetUnlockHandle from "../resetProgressParts/ReactorResetUnlockHandle";
import MessageModal from "../resetProgressParts/MessageModal";
import ComradeStorageCleaner from "../resetProgressParts/ComradeStorageCleaner";
import {KeyContextProvider} from "../utils/contexts/keyContext";
import {ModalContextProvider} from "../utils/contexts/modalContext";
import {HandleContextProvider} from "../utils/contexts/reactorReset/resetReactorHandleContext";



export default function ResetProgress() {

    return (
        <main style={{padding: "1rem 0"}}>
            <KeyContextProvider>
                <ModalContextProvider>
                    <HandleContextProvider>
                        <ReactorResetUnlockHandle/>
                        <div className={"spacer-one-tenth-height"}></div>
                        <div className={"columns"}>
                            <div className={"column is-four-fifths"}>
                                <ReactorResetHandle/>
                            </div>
                            <div className={"column"}>
                                <ComradeStorageCleaner/>
                            </div>
                        </div>
                        {<MessageModal/>}
                    </HandleContextProvider>
                </ModalContextProvider>
            </KeyContextProvider>
        </main>
    )
}