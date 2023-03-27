import ReactorResetHandle from "../resetProgressParts/ReactorResetHandle";
import ReactorResetUnlockHandle from "../resetProgressParts/ReactorResetUnlockHandle";
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
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <ReactorResetUnlockHandle/>
                        </Grid>
                    </Grid>
                    <Grid container direction="column">
                        <ReactorResetHandle/>
                    </Grid>
                    </HandleContextProvider>
                </ModalContextProvider>
            </KeyContextProvider>
        </main>
    )
}