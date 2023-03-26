import {useEffect} from "react";
import {useModal} from "../utils/contexts/modalContext";
import { Switch, FormControlLabel, Grid, Button, Typography, Box, Dialog} from '@mui/material';

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
                  <Box>
                    <Typography className="retro-text"
                        sx={{bgcolor: "black"}}
                    >
                      {message}
                    </Typography>
                  </Box>
                </Dialog>
    )
}