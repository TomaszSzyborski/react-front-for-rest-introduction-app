import axios from "axios";
import {useEffect, useRef, useState} from "react";
import Select from 'react-select'
import AsyncSelect from "react-select/async";
import {useKey} from "../../utils/contexts/keyContext";
import {useModal} from "../../utils/contexts/modalContext";
import 'bulma/css/bulma.min.css'; // import Bulma CSS

function Switch(props) {
  const [isOn, setIsOn] = useState(props.isOn);
  const {key} = useKey()

  const handleToggle = () => {
    setIsOn(!isOn);
    const methodUsed = isOn ? 'DELETE' : 'PUT';
    axios({
        method: methodUsed,
        url: `http://0.0.0.0:9011/challenge/reactor/${key}/control_room/control_rods/${props.id}`
        }
    )
      .then(response => console.log(response))
      .catch(error => console.error(error));
  }

  return (
    <div className="field">
      <input
        id={`switch-${props.id}`}
        type="checkbox"
        className="switch is-small is-rounded is-vertical"
        checked={isOn}
        onChange={handleToggle}
      />
      <label htmlFor={`switch-${props.id}`}> {isOn ? 'On' : 'Off'}</label>
    </div>
  );
}


export default function Rods(props) {
     const switches = [
        { id: 0, name: '0', isOn: false },
        { id: 1, name: '1', isOn: true},
        { id: 2, name: '2', isOn: false},
      ];

      return (
        <div className="container">
          <div className="columns is-multiline">
            {switches.map(s => (
              <div key={s.id} className="column is-one-third">
                <div className="box">
                  <h4 className="title is-4">{s.name}</h4>
                  <Switch id={s.id} isOn={s.isOn}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }