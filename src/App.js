import './App.css';
import {BrowserRouter, Link, Redirect, Route, Outlet, StaticRouter} from "react-router-dom";

import radioActiveIcon from './assets/images/radioactiveBasic.png'
import Home from "./routes/home";
import Office from "./routes/office";
import ControlRoom from "./routes/controlroom";
import ResetProgress from "./routes/resetprogress";
import Reception from "./routes/reception";
import uuid from 'react-uuid'
import {useEffect, useMemo, useState} from "react";
import {keyLocalStorageItemName, toggleActive, trayOpeningsLocalStorageItemObject} from "./utils/constants";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import ListItem from '@mui/material/ListItem';
import {Tabs, Tab} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { useNavigate, useParams } from "react-router-dom";
import MuiMenuItem from "@mui/material/MenuItem";
import { withStyles } from "@mui/material/styles";
import Drawer from '@mui/material/Drawer';

import drawerImage from "./assets/images/quickTray.png";
import { styled } from '@mui/material/styles';
const drawerWidth = "25vw";

const RustyDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    height: "100vh",
    backgroundImage: `url(${drawerImage})`,
    color: "white",
    backgroundColor: 'transparent',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    boxShadow: 'none',
        justifyContent: 'center !important',
        verticalAlign: "middle !important",
        alignItems: "center",
        textWrap: "normal",
        wordWrap: "anywhere",
  },
});

const navigationOptions = [
    {link: "/home", name: "При́пʼять"},
    {link: "/office", name: "Office"},
    {link: "/reception", name: "Reception"},
    {link: "/controlroom", name: "Control Room"},
    {link: "/resetprogress", name: "[REDACTED]"},
]

function App() {
    const [numberOfTrayOpenings, setNumberOfTrayOpenings] = useState(
        Number(localStorage.getItem(trayOpeningsLocalStorageItemObject.key)) || 0
    )
    const [trayText, setTrayText] = useState(0)
    const [whereAmI, setWhereAmI] = useState("Navigate");
    const [isShown, setIsShown] = useState(false);

    useMemo(() => {
        setWhereAmI(navigationOptions.find((it) =>
            it.link === window.location.pathname)?.link || "/home")
    }, [whereAmI]);

    useEffect(() => {
        if (Number(localStorage.getItem(trayOpeningsLocalStorageItemObject.key)) || numberOfTrayOpenings !== 0) {
            localStorage.setItem(trayOpeningsLocalStorageItemObject.key, numberOfTrayOpenings.toString())
        }

        const data = {
            1: "You've found my secret stash... ${random_scrap_discovery}\n",
            17: "You're really pertinacious, you know that? ${stubborn_as_a_donkey}\n"
        }

        let keyMessage = ""
        if(localStorage.getItem(keyLocalStorageItemName)){
            keyMessage = `Here's your key:\n ${localStorage.getItem(keyLocalStorageItemName)}`
        }
        const messageInStash = ((data[numberOfTrayOpenings] || "")
            + (keyMessage || "")) || "I thought I have had something here..."
        setTrayText(messageInStash)
    }, [numberOfTrayOpenings])

  const [selectedOption, setSelectedOption] = useState('');
  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = (event) => {
    setNumberOfTrayOpenings(numberOfTrayOpenings+1)
    setDrawerState(true);
  };

   let navigate = useNavigate();
   const handleChange = (event) => {
    navigate(event.target.value)
   };
    return (
        <AppBar id={"top-bar-component"}  position="sticky" className="has-transparent-background">
            <Toolbar disableGutters={false}>
                <IconButton
                max-height
                 href={"/"}
                 className={"radiation-hazard extra-big-hazard"} size="large"/>
                 <FormControl
                  sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                 >
                    <InputLabel id="navigation-label-id" className="retro-text">Navigate</InputLabel>
                    <Select
                        sx={{border:0, borderShadow:"none"}}
                            labelId="navigation-label-id"
                            label="Navigate"
                            className="navigation-option-button retro-text"
                            onChange={handleChange}
                            defaultValue={whereAmI}
                    >
                        {navigationOptions.map((option) => (
                        <MenuItem
                        //TODO wyjebać wpizdu szarości na rzecz transparentności joł
                            key={uuid()}
                            value={option.link}
                            name={option.name}
                            className="navigation-option-button retro-text has-text-vertically-centered"
                            >
                            {option.name}
                        </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                <IconButton
                 sx={{marginLeft:"auto", cursor:"unset"}}
                 onClick={toggleDrawer}
                 className={"radiation-hazard extra-big-hazard"}/>
            </Toolbar>
                <RustyDrawer
                    anchor='right'
                    open={drawerState}
                    onClick={()=>setDrawerState(false)}
                    >
                          <Typography
                          sx={{marginLeft:"5vw", cursor:""}}
                          className="retro-text"
                          variant="h2" component="h2">
                            {trayText}
                          </Typography>
                </RustyDrawer>
        </AppBar>
    )
        ;
}

export default App;
