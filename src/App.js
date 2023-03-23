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

const navigationOptions = [
    {link: "/home", name: "Prypiat"},
    {link: "/office", name: "Office"},
    {link: "/reception", name: "Reception"},
    {link: "/controlroom", name: "Control Room"},
    {link: "/resetprogress", name: "[REDACTED]"},
    {link: "/test", name: "[test]"},
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
            it.link === window.location.pathname)?.name || "Prypiat")
    }, [whereAmI]);

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

    useEffect(() => {
        //TODO fix number of tray openings in state
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
        const messageInStash = (data[numberOfTrayOpenings] || "")
            + (keyMessage || "")
        setTrayText(messageInStash)
    }, [numberOfTrayOpenings])

  const [selectedOption, setSelectedOption] = useState('');

   let navigate = useNavigate();
   const handleChange = (event) =>   {
    navigate(event.target.value)
   };
    return (
        <AppBar id={"top-bar-component"}  position="sticky"
        className="has-transparent-background"
         max-width="true">
            <Toolbar disableGutters={false}
            className="is-transparent"
             max-width>
                <IconButton
                max-height
                 href={"/"}
                 className={"radiation-hazard extra-big-hazard"} size="large"/>
                 <FormControl
                            fullWidth
                            sx={{ m: 1, minWidth: 120 }}
                            >
                    <InputLabel id="navigation-label-id" className="retro-text">Navigate</InputLabel>
                    <Select
                            sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                            labelId="navigation-label-id"
                            label="Navigate"
                            className="navigation-option-button retro-text"
                            onChange={handleChange}
                            defaultValue="/home"

                    >
                        {navigationOptions.map((option) => (
                        <MenuItem
                            key={uuid()}
                            value={option.link}
                            name={option.name}
                            className="navigation-option-button retro-text">
                            {option.name}
                        </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                <IconButton
                 sx={{marginLeft:"auto", display:"flex", justifyContent:"space-between", alignItems:"center"}}
                 onClick={()=> navigate("/home")}
                 className={"radiation-hazard extra-big-hazard"}/>
            </Toolbar>

        </AppBar>
    )
        ;
}

export default App;
