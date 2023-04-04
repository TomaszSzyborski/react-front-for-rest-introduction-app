import {useState, useEffect, context} from "react";
import {CircularProgress, Grid, Typography } from '@mui/material'
import {reactorBackend} from "client"

export default function Preload() {
    const [visible, setVisible] = useState(true);

    const preLoad = async () => {
        await Promise.all([
            new Promise(r => setTimeout(r, 2000)),
            reactorBackend.client.get("/challenge/reactor/information")

            ]).then(res => setVisible(false))
    }

    function importAll(r) {
     let images = {};
      r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
     return Object.values(images);
    }
    const images = importAll(require.context('../assets/images', true, /\.(png|jpe?g|svg|gif)$/));

    useEffect(() =>{
        preLoad()
        return () => {
            setVisible(false)
        }
    })

    return (<> {visible &&
                <Grid container
                      alignItems="center"
                      justifyContent='center'
                      className="background"
                      sx={{zIndex:10000, height: "100vh",
                            width: "100vw", backgroundColor: "#000000",
                             position: "absolute", }}
                >
                    <Grid item className="centered-on-screen">
                        <CircularProgress size={500}/>
                    </Grid>
                    <Typography className="retro-text centered-on-screen">
                        Preparing to load 25 April 1986 - Chernobyl...
                    </Typography>
                        <Grid item
                        >
                            {images.map(image =>
                                <Grid item sx={{backgroundImage: `url(${image})`}}/>
                            )}
                        </Grid>
                </Grid>
              }
              </> );
}