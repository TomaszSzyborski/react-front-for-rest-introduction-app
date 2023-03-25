import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import AsyncSelect from "react-select/async";
import {useKey} from "../../utils/contexts/keyContext";
import {useModal} from "../../utils/contexts/modalContext";
import { Switch, FormControlLabel, Grid} from '@mui/material';

function RodSwitch(props) {
  const [isOn, setIsOn] = useState(props.isOn);
  const {key} = useKey()

  const handleToggle = () => {
    setIsOn(!isOn);
    const methodUsed = isOn ? 'DELETE' : 'PUT';
    axios({
        method: methodUsed,
        url: `http://0.0.0.0:9011/challenge/reactor/${key}/control_room/${props.rodType}_rods/${props.index}`
        }
    )
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }

  return (
  <FormControlLabel
      className="retro-text"
      control={
          <Switch
            sx={{transform: "rotate(90deg)"}}
            id={`switch-${props.rodType}-${props.index}`}
            color={props.rodType === 'fuel'? 'primary' : 'warning'}
            checked={isOn}
            onChange={handleToggle}
          />
       }
       labelPlacement="top"
       label={`${props.rodType} rod ${props.index}`}
  />
  );
}


export default function Rods(props) {
    const {key} = useKey()
//     const [fuelRods, setFuelRods] = useState([]);
//     const [controlRods, setControlRods] = useState([]);

//     const getRodsData = async () => {
//         await axios.get(`http://localhost:9011/challenge/reactor/${key}/control_room`)
//                     .then( response => {
//                         console.log(response.data)
//                         console.log(response.data['reactor data']['_ReactorCore__fuel_rods'])
//                         setFuelRods(response.data['reactor data']['_ReactorCore__fuel_rods'])
//                         setControlRods(response.data['reactor data']['_ReactorCore__control_rods'])
//                     }).catch(error => console.error(error))
//         await console.log(fuelRods)
//         }
//     useEffect(() => {
//     console.log('mounted');
//        getRodsData()
//       return () => console.log('unmounting...');
//     }, [])
        let fuelRods = ["","asd","",""]
        let controlRods = ["","asd","",""]
      return (
        <Grid
        container direction="row" alignItems="center">
            <Grid item xs={2}/>
            <Grid xs={6} >
                <Grid item>
                {fuelRods.map((rod, index) => (
                      <RodSwitch id={`FuelRod${index}`} index={index} isOn={rod? true: false} rodType="fuel"/>
                ))}
                </Grid>
            </Grid>
            <Grid item xs={2} >
                <Grid item>
                {controlRods.map((rod, index) => (
                      <RodSwitch id={`ControlRod${index}`} index={index} isOn={rod? true: false} rodType="control"/>
                ))}
                </Grid>
            <Grid item xs={2}/>
            </Grid>
         </Grid>
      );
    }