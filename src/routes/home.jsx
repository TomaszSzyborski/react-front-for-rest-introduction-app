import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import radioActiveIcon from "../assets/images/radioactiveBasic.png";
import {useBlownUp} from "../utils/contexts/blownUpContext";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


export default function Home() {
        const {blownUp} = useBlownUp();
        const bridgeOfDeath = "${flag_bridge_of_death}"

        const catastrophy = localStorage.getItem("blownUp")

        return (
        <main id={"panorama-container"}>
            {!catastrophy && <div id={"panorama"}></div>}
            {catastrophy &&
                <div id={"catastrophy"}>
                    <Grid container spacing={2} alignItems="flex-end" justifyContent="center" sx={{height: "90%"}}>
                      <Grid item xs={12} maxHeight>
                        <Typography className="retro-text">
                           {bridgeOfDeath}
                        </Typography>
                      </Grid>
                    </Grid>
                </div>}
        </main>
    );
}