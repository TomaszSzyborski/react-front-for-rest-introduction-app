import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import radioActiveIcon from "../assets/images/radioactiveBasic.png";
import {useBlownUp} from "../utils/contexts/blownUpContext";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const HomeFlagContainer = (props) => <Grid container spacing={2} alignItems="flex-end" justifyContent="center" sx={{height: "90%"}}>
                                  <Grid item xs={12} maxHeight>
                                    <Typography className="retro-text">
                                       {props.flag}
                                    </Typography>
                                  </Grid>
                                </Grid>
export default function Home() {
        const {blownUp} = useBlownUp();
        const bridgeOfDeath = "${flag_bridge_of_death}" // flag obtainable when the reactor is blownup and Home button is clicked
        const homeSweetHome = "${flag_home_sweet_home}" // flag obtained by navigating elsewhere (when reactor is not blown up), then clicking home button when homeVists in localstorage equals 1
        const catastrophy = localStorage.getItem("blownUp")

        return (
        <main id={"panorama-container"}>
            {!catastrophy && <div id={"panorama"}>
                                {Number(localStorage.getItem("homeVisits")) == 1 && <HomeFlagContainer flag={homeSweetHome} />}
                            </div>}
            {catastrophy &&
                <div id={"catastrophy"}>
                    <HomeFlagContainer flag={bridgeOfDeath}/>
                </div>}
        </main>
    );
}