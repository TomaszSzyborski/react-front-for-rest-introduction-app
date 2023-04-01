import {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import AsyncSelect from "react-select/async";
import {useKey} from "../../utils/contexts/keyContext";
import {useModal} from "../../utils/contexts/modalContext";
import { Switch, FormControlLabel, Grid, Button} from '@mui/material';
import vacuumTube0 from '../../assets/images/vacuumTubes/vacuumTube0.png';
import vacuumTube1 from '../../assets/images/vacuumTubes/vacuumTube1.png';
import vacuumTube2 from '../../assets/images/vacuumTubes/vacuumTube2.png';
import vacuumTube3 from '../../assets/images/vacuumTubes/vacuumTube3.png';
import vacuumTube4 from '../../assets/images/vacuumTubes/vacuumTube4.png';
import vacuumTube5 from '../../assets/images/vacuumTubes/vacuumTube5.png';
import vacuumTube6 from '../../assets/images/vacuumTubes/vacuumTube6.png';
import vacuumTube7 from '../../assets/images/vacuumTubes/vacuumTube7.png';
import vacuumTube8 from '../../assets/images/vacuumTubes/vacuumTube8.png';
import vacuumTube9 from '../../assets/images/vacuumTubes/vacuumTube9.png';
import client from "client";

function RodSwitch(props) {
  const [isOn, setIsOn] = useState(props.isOn);
  const [isDisabled, setIsDisabled] = useState(false);
  const {key} = useKey()


  const handleToggle = async () => {
    await setIsDisabled(true)
    const methodUsed = isOn ? 'DELETE' : 'PUT';
    await client.apiClient({
        method: methodUsed,
        url: `/challenge/reactor/${key}/control_room/${props.rodType}_rods/${props.index}`
        }
    )
      .then(response => {
        //console.log(response)
       })
      .catch(error => console.error(error));
      await setIsDisabled(false)
      await setIsOn(!isOn);
  }

  return (
  <FormControlLabel
      sx={{width: "4rem"}}
      className="retro-text"
      control={
          <Switch
            sx={{
                transform: "rotate(90deg)",
                    "& .MuiSwitch-switchBase.Mui-checked": {
                         color: props.rodType == "fuel" ? '#ccff33' : "#ff6633"
                    },
                    "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
                         backgroundColor: props.rodType == "fuel" ? '#ccff33' : "#ff6633"
                    }
            }}
            disabled={isDisabled}
            id={`switch-${props.rodType}-${props.index}`}
            checked={isOn}
            onChange={async() => {
                    await handleToggle()
                    await props.onChange()
                }
            }
          />
       }
       labelPlacement="top"
       label={`${props.rodType} ${props.index}`}
  />
  );
}


export default function Rods(props) {
    const {key} = useKey();
    const [fuelRods, setFuelRods] = useState([]);
    const [controlRods, setControlRods] = useState([]);
    const [reactorPower, setReactorPower] = useState("");
    const [reactorState, setReactorState] = useState("");
    const [reactorDescription, setReactorDescription] = useState("");

    const vacuumTubeList = [vacuumTube0,vacuumTube1,vacuumTube2,
                            vacuumTube3,vacuumTube4,vacuumTube5,
                            vacuumTube6,vacuumTube7,vacuumTube8,
                            vacuumTube9]
    const getRodsData = async () => {
        await client.apiClient.get(`/challenge/reactor/${key}/control_room`,
                            {
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': `application/json`
                            }})
                    .then( response => {
                        setFuelRods(response.data['reactor data']['_ReactorCore__fuel_rods'])
                        setControlRods(response.data['reactor data']['_ReactorCore__control_rods'])
                        setReactorPower(response.data['reactor data']['_ReactorCore__power'] + "")
                        setReactorState(response.data['reactor data']["_ReactorCore__state"])
                        setReactorDescription(response.data['reactor data']["_ReactorCore__description"])
                    }).catch(error => console.error(error))
        }

        useEffect(() => {
            getRodsData()
        }, [])

      return (
        <>
          <Grid className="retro-text">
            <Grid>
                    {(reactorPower.padStart(5, '0')).split('').map((number) =>
                    <img src={vacuumTubeList[number]}/>)}
            </Grid>
          </Grid>
        <Grid
            container direction="row">
            <Grid item xs={2}/>
            <Grid item xs={6} >
            <Grid item>
                {fuelRods.map((rod, index) => (
                      <RodSwitch id={`FuelRod${index}`} index={index} isOn={rod? true: false} rodType="fuel"
                      onChange={getRodsData}
                      />
                ))}
            </Grid>
            </Grid>
            <Grid item xs={2} >
            <Grid item>
                {controlRods.map((rod, index) => (
                      <RodSwitch id={`ControlRod${index}`} index={index} isOn={rod? true: false} rodType="control"
                      onChange={getRodsData}
                      />
                ))}
                </Grid>
            <Grid item xs={2}/>
            </Grid>
            <Grid item>
            </Grid>
         </Grid>
         </>
      );
    }