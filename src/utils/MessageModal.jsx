import {useEffect} from "react";
import {useModal} from "../utils/contexts/modalContext";
import { Switch, FormControlLabel, Grid, Button, Typography, Box, Dialog, DialogContent} from '@mui/material';

export default function MessageModal(props) {
    const {message, setMessage} = useModal();

    const sxToBeSet = {bgcolor:'black'}
    if(props.backgroundImage) {
        sxToBeSet.backgroundImage = `url(${props.backgroundImage})`;
        sxToBeSet.backgroundSize = 'cover';
    }
    useEffect(() =>{
        return () => {
            setMessage("")
        }
    }, [])

    return ( <Dialog
                  sx={sxToBeSet}
                  hideBackdrop={props.backgroundImage? true : false}
                  className={"reactor-modal"}
                  open={Boolean(message)}
                  onClick={() => {
                    if (props.onClick){
                        props.onClick()
                    }
                    setMessage("")
                  }}>
                  <DialogContent
                      sx={{bgcolor: "black"}}
                  >
                    <Typography
                        className="retro-text"
                        variant="body1"
                        style={{ whiteSpace: 'pre-wrap!important', overflowWrap: 'break-word' }}
                        sx={{bgcolor: "black"}}
                    >
                      {message}
                    </Typography>
                  </DialogContent>
                </Dialog>
    )
}