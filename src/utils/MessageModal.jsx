import {useEffect} from "react";
import {useModal} from "../utils/contexts/modalContext";
import { Switch, FormControlLabel, Grid, Button, Typography, Box, Dialog, DialogContent} from '@mui/material';

export default function MessageModal() {
    const {message, setMessage} = useModal();

    useEffect(() =>{
        return () => {
            setMessage("")
        }
    }, [])

    return ( <Dialog
                  sx={{bgcolor: "black"}}
                  className={"reactor-modal"}
                  open={Boolean(message)}
                  onClick={() => setMessage("")}>
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