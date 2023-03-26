import ReactorResetHandle from "../resetProgressParts/ReactorResetHandle";
import ReactorResetUnlockHandle from "../resetProgressParts/ReactorResetUnlockHandle";
import MessageModal from "../utils/MessageModal";
import ComradeStorageCleaner from "../resetProgressParts/ComradeStorageCleaner";
import {KeyContextProvider} from "../utils/contexts/keyContext";
import {ModalContextProvider} from "../utils/contexts/modalContext";
import {HandleContextProvider} from "../utils/contexts/reactorReset/resetReactorHandleContext";
import {Grid} from '@mui/material';



export default function ResetProgress() {

    return (
        <main style={{padding: "1rem 0"}}>
            <KeyContextProvider>
                <ModalContextProvider>
                    <HandleContextProvider>
                        <ReactorResetUnlockHandle/>
                        <Grid direction="row">
                                <Grid item>
                                    <ReactorResetHandle/>
                                </Grid>
                                <Grid item>
                                    <ComradeStorageCleaner/>
                                </Grid>
                        </Grid>
                        {<MessageModal/>}
                    </HandleContextProvider>
                </ModalContextProvider>
            </KeyContextProvider>
        </main>
    )
}