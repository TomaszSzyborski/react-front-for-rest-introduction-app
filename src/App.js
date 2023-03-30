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
import {Tabs, Tab, Grid} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
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

const home = {link: "/home", name: "При́пʼять"}
const navigationOptions = [
    home,
    {link: "/office", name: "Office"},
    {link: "/reception", name: "Reception"},
    {link: "/controlroom", name: "Control Room"},
    {link: "/resetprogress", name: "[REDACTED]"},
]

function App() {
    const [numberOfTrayOpenings, setNumberOfTrayOpenings] = useState(
        Number(localStorage.getItem(trayOpeningsLocalStorageItemObject.key)) || 0
    )
    const [trayText, setTrayText] = useState("")
    const [whereAmI, setWhereAmI] = useState();
    const [isShown, setIsShown] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickMenuOption = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

    useMemo(() => {
        setWhereAmI(navigationOptions.find((it) =>
            it.link === window.location.pathname)?.name)
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
            keyMessage = `\nHere's your key:\n\n ${localStorage.getItem(keyLocalStorageItemName)}`
        }
        const messageInStash = ((data[numberOfTrayOpenings] || "")
            + (keyMessage || "")) || "I thought I have had something here..."
        setTrayText(messageInStash)
    }, [numberOfTrayOpenings])

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
            <Toolbar disableGutters={false}
            >
                <IconButton
                 onClick={() =>{
                    navigate(home.link)
                    setWhereAmI(home.name)
                    const homeVisitsCount = Number(localStorage.getItem("homeVisits"))
                    localStorage.setItem("homeVisits",  homeVisitsCount + 1)
                    }
                 }
                 className={"radiation-hazard extra-big-hazard"} size="large"/>
                      <Button className="navigation-option-button retro-text"
                        onClick={handleClickMenuOption}>
                        Navigate
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        onClick={() => setAnchorEl(!anchorEl)}
                        onBackdropClick={handleCloseMenu}
                        open={Boolean(anchorEl)}
                        >
                        {navigationOptions
                            .filter((option) => !["/home", window.location.pathname].includes(option.link))
                            .map((option) => (
                        <MenuItem
                            key={uuid()}
                            value={option.link}
                            name={option.name}
                            onClick={() => {
                                setWhereAmI(option.name)
                                navigate(option.link)
                                handleCloseMenu()
                            }}
                            className="navigation-option-button retro-text"
                            >
                            {option.name}
                        </MenuItem>
                        ))}
                    </Menu>
                    <Box className="navigation-option-button"
                         alignItems="center"
                         display="flex">
                        <Typography className="retro-text">
                            {whereAmI}
                        </Typography>
                     </Box>
                <IconButton
                 sx={{marginLeft:"auto", cursor:"unset"}}
                 onClick={toggleDrawer}
                 className={"radiation-hazard extra-big-hazard"}/>
            </Toolbar>
                <RustyDrawer
                    anchor='right'
                    open={drawerState}
                    onBackdropClick={ ()=> setDrawerState(false)}
                    >
                      <Typography
                      sx={{marginLeft:"5em"}}
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
