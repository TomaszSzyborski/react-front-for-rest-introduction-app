import {useModal} from "../utils/contexts/modalContext";
import MessageModal from "../utils/MessageModal";
import {Button, Grid} from '@mui/material';



export default function ComradeStorageCleaner() {
    const {setMessage} = useModal();
    const buttonLabel = "Erase memories";

    return (
    <>
            <Button
                    variant="contained" color="error"
                    className="retro-text"
                    onClick={() => {
                        localStorage.clear()
                        sessionStorage.clear()
                        setMessage("Who am I? What happened? ${flag_trauma_induced_dementia}");
                    }}>
                {buttonLabel}
            </Button>
            <MessageModal/>
    </>
    );
}
